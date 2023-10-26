import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbacks, getSubjectAverages } from "../../students/students.action";
import BarChart from "./bar-chart";
import PredictFeedback from "./predict-feedback";
const ListStudent = () => {
  const dispatch = useDispatch()
  const feedbacks = useSelector((state) => state?.student?.feedbacks);
  useEffect(() => {
    dispatch(getFeedbacks())
    dispatch(getSubjectAverages())
  }, [dispatch])
  return (
    <section className="form-table">
      <div className="overlay"></div>
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-12">
            <h1 className="text-center">Student Data</h1>
          </div>
          <div className="col-lg-12">
            <div className="table-form">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks?.feedbacks?.map((feedback, index) => (
                      <tr key={index}>
                        <th scope="row"></th>
                        <td>{index + 1}</td>
                        <td>{feedback?._id}</td>
                        <td>
                          <ul>
                            {feedback.studentFeedback.map((feedback, index) => (
                              <li key={index}>{feedback}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <BarChart />
        <PredictFeedback />
      </div>
    </section>
  );
};

export default ListStudent;
