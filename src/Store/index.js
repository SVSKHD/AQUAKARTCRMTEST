import { combineReducers } from "redux";
//reducers
import { authDialogReducer } from "./reducers/authDialogReducer";

const rootReducer = combineReducers({
  authDialog: authDialogReducer,
});

export default rootReducer;
