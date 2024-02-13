import { combineReducers } from "redux";
//reducers
import { authDialogReducer } from "./reducers/authDialogReducer";
import { userReducer } from "./reducers/userReducer";
import { DrawerReducer } from "./reducers/drawerReducer";
import { userSignupReducer } from "./reducers/signupStatus";

const rootReducer = combineReducers({
  authDialog: authDialogReducer,
  user: userReducer,
  Drawer: DrawerReducer,
  userSignupStatus: userSignupReducer,
});

export default rootReducer;
