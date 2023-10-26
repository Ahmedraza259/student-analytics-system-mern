import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateStudent from "./components/student/create-student/create-student";
import ListStudents from "./components/student/list-students/list-students";

function App() {
  return (
    <div id="wrapper">
      <Toaster />
      <main id="main">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CreateStudent />} />
            <Route path="/list-students" element={<ListStudents />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
