import { combineReducers } from "redux";
import { modalReducer } from "./modalReducer.js";
import { userReducer } from "./userReducer.js";

const rootReducer = combineReducers({
  modal: modalReducer,
  user: userReducer
});
export default rootReducer;
