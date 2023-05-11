import { combineReducers } from "@reduxjs/toolkit";
import setting from "~/core/slices/setting";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  setting: persistReducer({ key: "account", storage: storage }, setting),
});

export default reducers;
