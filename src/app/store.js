
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { userApi } from "../features/users/userApi";
import userReducer from "../features/users/userSlice";

const persistConfig = {
  key: "usersStore",       
  storage,             // storage type (localStorage)
  whitelist: ["localUsers"], // only persist this slice
};

// 2. wrap the userReducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// 3. configure store
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer, // RTK Query reducer (no need to persist)
    users: persistedUserReducer,           // persisted slice
  },
  middleware: (getDefault) =>
    getDefault().concat(userApi.middleware), // include RTK Query middleware
});

// 4. create persistor
export const persistor = persistStore(store);
