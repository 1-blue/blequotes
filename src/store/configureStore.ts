import { configureStore } from "@reduxjs/toolkit";

// root reduecer
import rootReducer from "./reducers";

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([]),
    devTools: process.env.NODE_ENV === "development",
  });

  return store;
};

const store = createStore();

export default store;
