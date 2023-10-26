import { combineReducers } from "redux";
import studentReducer from "../components/students/students.reducer"
export default combineReducers({
 student:studentReducer
});
