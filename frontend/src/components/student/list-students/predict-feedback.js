import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFeedback } from "../../students/students.action";
import Spinner from "./spinner";
import toast from "react-hot-toast";
const PredictFeedback = () => {
    const dispatch = useDispatch()
    const feedback = useSelector((state) => state?.student?.feedback)
    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("")
    const onChangeFeedback = (event) => {
        setMessage(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!message) {
            toast.error("Please enter a message to predict");
            return;
        }
        setLoader(true);
        const studentData = { message: message };
        dispatch(createFeedback(studentData));
        setLoader(false);
        setMessage("");
    };
    return (

        <div className="col-lg-6">
            <label >
                Genrate student Feedback<em>&#x2a;</em>
            </label>
            <  input
                id="studentFeedback"
                name="studentFeedback"
                placeholder="Student is average"
                type="text"
                value={message}
                onChange={onChangeFeedback}
            />
            <button type="submit" onClick={handleSubmit} >{loader ? <Spinner /> : "Submit"}</button>
            <p>***********{feedback}**********</p>

        </div>

    );
};

export default PredictFeedback;
