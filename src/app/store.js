
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { userApi } from "../features/users/userApi";
import userReducer from "../features/users/userSlice";

const persistConfig = {
  key: "usersStore",       
  storage,            
  whitelist: ["localUsers"], 
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer, 
    users: persistedUserReducer,           
  },
  middleware: (getDefault) =>
    getDefault().concat(userApi.middleware), 
});


export const persistor = persistStore(store);
