import { combineReducers } from "@reduxjs/toolkit";

// reducers
import movieReducer from "./movieReducer";
import dramaReducer from "./dramaReducer";
import bookReducer from "./bookReducer";
import postReducer from "./postReducer";

// root reducer
const rootReducer = combineReducers({
  movie: movieReducer,
  drama: dramaReducer,
  book: bookReducer,
  post: postReducer,
});

export default rootReducer;
