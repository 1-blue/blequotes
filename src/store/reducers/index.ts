import { combineReducers } from "@reduxjs/toolkit";

// reducers
import countReducer from "./countReducer";
import userReducer from "./userReducer";

// root reducer
const rootReducer = combineReducers({
  count: countReducer,
  user: userReducer,
});

export default rootReducer;
