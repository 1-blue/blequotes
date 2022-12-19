import { combineReducers } from "@reduxjs/toolkit";

// reducers
import movieReducer from "./movieReducer";
import dramaReducer from "./dramaReducer";
import bookReducer from "./bookReducer";

// root reducer
const rootReducer = combineReducers({
  movie: movieReducer,
  drama: dramaReducer,
  book: bookReducer,
});

export default rootReducer;
