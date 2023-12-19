import "./App.css";
import React from "react";
import Store from "./store/store";
import { Provider } from "react-redux";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Provider store={Store}>
      <>
        <MainPage />
      </>
    </Provider>
  );
}

export default App;
