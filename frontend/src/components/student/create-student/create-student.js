import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { getFeedbacks, createStudent, getSubjectAverages } from "../../students/students.action";
import { formValidations } from "./validation";
const CreateStudent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const createStudentAuth = useSelector(
    (state) => state?.student?.createStudentAuth
  );
  const [studentForm, setStudentForm] = useState({
    studentName: "",
    studentSubject: "",
    totalScore: "",
    studentScore: "",
    studentFeedback: "",
  });
  useEffect(() => {

    dispatch(getSubjectAverages())
    dispatch(getFeedbacks());
  }, [dispatch]);

  const handleChange = (e) => {
    setStudentForm({ ...studentForm, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formValidations(studentForm)
    dispatch(createStudent(studentForm));
    setStudentForm({
      studentName: "",
      studentSubject: "",
      totalScore: "",
      studentScore: "",
      studentFeedback: "",
    });
  };
  navigate("/all-students")

  return (
    <>
      <section className="form-area">
        <div className="overlay"></div>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12">
              <h1 className="text-center">Add Student </h1>
            </div>
            <div className="col-lg-6">
              <form onSubmit={handleSubmit}>
                <label htmlFor="studentName">
                  Student Name <em>&#x2a;</em>
                </label>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  placeholder="Jhon doe"
                  value={studentForm?.studentName}
                  onChange={handleChange}
                />
                <label htmlFor="studentSubject">
                  Student Subject<em>&#x2a;</em>
                </label>
                <input
                  id="studentSubject"
                  name="studentSubject"
                  type="text"
                  placeholder="Chemistry"
                  value={studentForm.studentSubject}
                  onChange={handleChange}
                />
                <label htmlFor="totalScore">
                  Total Score<em>&#x2a;</em>
                </label>
                <input
                  id="totalScore"
                  name="totalScore"
                  placeholder="100"
                  type="number"
                  value={studentForm.totalScore}
                  onChange={handleChange}
                />
                <label htmlFor="studentScore">
                  Student Score<em>&#x2a;</em>
                </label>
                <input
                  id="studentScore"
                  name="studentScore"
                  placeholder="90"
                  type="number"
                  value={studentForm.studentScore}
                  onChange={handleChange}
                />

                <label htmlFor="studentFeedback">
                  Student Feedback<em>&#x2a;</em>
                </label>
                <input
                  id="studentFeedback"
                  name="studentFeedback"
                  placeholder="Student is average"
                  type="text"
                  value={studentForm.studentFeedback}
                  onChange={handleChange}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CreateStudent;
