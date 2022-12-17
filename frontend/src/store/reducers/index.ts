import { combineReducers } from "@reduxjs/toolkit";

// reducers
import movieReducer from "./movieReducer";
import dramaReducer from "./dramaReducer";

// root reducer
const rootReducer = combineReducers({
  movie: movieReducer,
  drama: dramaReducer,
});

export default rootReducer;
