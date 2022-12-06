import { combineReducers } from "@reduxjs/toolkit";

// reducers
import movieReducer from "./movieReducer";

// root reducer
const rootReducer = combineReducers({
  movie: movieReducer,
});

export default rootReducer;
