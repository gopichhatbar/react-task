// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { Provider } from "react-redux";
// import { store } from "./app/store";
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </StrictMode>,
// )
import React from "react";
import './index.css'
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./app/store";
import App from "./App";

// Fallback UI while persistor rehydrates
const LoadingUI = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
    Loading your app...
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<LoadingUI />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
