import { combineReducers } from "redux";
//reducers
import { authDialogReducer } from "./reducers/authDialogReducer";
import {userReducer} from "./reducers/userReducer"
import {DrawerReducer} from "./reducers/drawerReducer"

const rootReducer = combineReducers({
  authDialog: authDialogReducer,
  user:userReducer,
  Drawer:DrawerReducer
});

export default rootReducer;
