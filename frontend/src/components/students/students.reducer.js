import { GET_STUDENTS, CREATE_STUDENT, CREATE_FEEDBACKS, GET_SUBJECTS, GET_FEEDBACKS } from "../../redux/types";
const initialState = {
  student: null,
  students: null,
  feedbacks: null,
  subjects: null,
  createStudentAuth: false,
};
const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case GET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
      };
    case GET_FEEDBACKS:
      return {
        ...state,
        feedbacks: action.payload,
      };
    case CREATE_STUDENT:
      return {
        ...state,
        student: action.payload,
        createStudentAuth: true,
      };
    case CREATE_FEEDBACKS:
      return {
        ...state,
        feedback: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default clientReducer;
