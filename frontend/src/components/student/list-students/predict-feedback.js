import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFeedback } from "../../students/students.action";
const PredictFeedback = () => {
    const dispatch = useDispatch()
    const feedback = useSelector((state) => state?.student?.feedback)
    
    const [message, setMessage] = useState("")
    const onChangeFeedback = (event) => {
        setMessage(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const studentData = { message: message };
        dispatch(createFeedback(studentData))
        setMessage("")
    }
    return (
        <>
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
                <button type="submit" onClick={handleSubmit}>Submit</button>
                <p>***********{feedback}**********</p>
            </div>
        </>
    );
};

export default PredictFeedback;
