import {combineReducers} from "redux"
import errorReducer from "./errorReducer";
import projectTaskReducer from "./projectTaskReducer";
import securityReducer from "./securityReducer";

export default combineReducers({

    errors: errorReducer,
    project_task: projectTaskReducer,
    security: securityReducer
});