import { GET_STUDENTS, CREATE_STUDENT ,CREATE_FEEDBACKS, GET_SUBJECTS, GET_FEEDBACKS } from "../../redux/types";
// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";

export const getStudents = () => (dispatch) => {
  const url = `http://localhost:5000/api/student/all-students`;
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: GET_STUDENTS,
          payload: {
            students: data.data,
          },
        });
      } else {
        toast.error(data.message);
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.message) toast.error(data.message);
      }
    });
};

export const createStudent = (StudentData) => (dispatch) => {
  const url = `http://localhost:5000/api/student/add-student`;
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(StudentData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: CREATE_STUDENT,
          payload: data.data,
        });
      } 
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.message) toast.error(data.message);
      }
    });
};

export const createFeedback = (StudentData) => (dispatch) => {
  const url = `http://localhost:5000/api/student/get-predictions`;
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(StudentData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: CREATE_FEEDBACKS,
          payload: data.data,
        });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.message) toast.error(data.message);
      }
    });
};

export const getSubjectAverages = () => (dispatch) => {
  
  const url = `http://localhost:5000/api/student/all-subjects`;
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: GET_SUBJECTS,
          payload: {
            subjects: data.data,
          },
        });
      } else {
        toast.error(data.message);
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.message) toast.error(data.message);
      }
    });
};

export const getFeedbacks = () => (dispatch) => {
  const url = `http://localhost:5000/api/student/all-feedbacks`;
  fetch(url, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: GET_FEEDBACKS,
          payload: {
            feedbacks: data.data,
          },
        });
      } else {
        toast.error(data.message);
      }
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.message) toast.error(data.message);
      }
    });
};