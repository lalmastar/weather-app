import { configureStore } from "@reduxjs/toolkit";
import favReducer from "../reducer/fav";
import weatherReducer from "../reducer/reducer";

const store = configureStore({
  reducer: {
    favReducer: favReducer,
    weatherReducer: weatherReducer,
  },
});
export default store;
