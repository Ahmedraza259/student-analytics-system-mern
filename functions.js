const { DirectoryLoader } = require("langchain/document_loaders/fs/directory");
const { TextLoader } = require("langchain/document_loaders/fs/text");
const { JSONLoader } = require("langchain/document_loaders/fs/json");
const { OpenAI } = require("langchain/llms/openai");
const { RetrievalQAChain, loadQARefineChain } = require("langchain/chains");
const { HNSWLib } = require("langchain/vectorstores/hnswlib");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const fs = require('fs');
require('dotenv').config();

// 5. Load local files such as .json and .txt from ./docs
const loader = new DirectoryLoader("./docs", {
    ".json": (path) => new JSONLoader(path),
    ".txt": (path) => new TextLoader(path)
})

// 6. Define a function to normalize the content of the documents
const normalizeDocuments = (docs) => {
    return docs.map((doc) => {
        if (typeof doc.pageContent === "string") {
            return doc.pageContent;
        } else if (Array.isArray(doc.pageContent)) {
            return doc.pageContent.join("\n");
        }
    });
}

const VECTOR_STORE_PATH = "Documents.index";

// 7. Define the main function to run the entire process
const run = async (prompt) => {
    
    console.log('Prompt:', prompt)

    console.log("Loading docs...")
    const docs = await loader.load();

    console.log('Processing...   ')
    const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

    let vectorStore;

    console.log('Creating new vector store...')
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
    });
    const normalizedDocs = normalizeDocuments(docs);
    const splitDocs = await textSplitter.createDocuments(normalizedDocs);

    // 8. Generate the vector store from the documents
    vectorStore = await HNSWLib.fromDocuments(
        splitDocs,
        new OpenAIEmbeddings()
    );

    await vectorStore.save(VECTOR_STORE_PATH);
    console.log("Vector store created.")

    console.log("Creating retrieval chain...")
    // 9. Query the retrieval chain with the specified question
    // const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever())

    const chain = new RetrievalQAChain({
        combineDocumentsChain: loadQARefineChain(model),
        retriever: vectorStore.asRetriever(),
    });

    console.log("Querying chain...")
    const res = await chain.call({ query: prompt })
    console.log({ res })
    return res
    
}
module.exports = run