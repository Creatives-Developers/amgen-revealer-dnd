import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles/main.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const backend = "ontouchstart" in window ? TouchBackend : HTML5Backend;
root.render(
  <DndProvider backend={backend} options={{ enableMouseEvents: true }}>
    {/*  <React.StrictMode>*/}
    <App />
    {/* </React.StrictMode>*/}
  </DndProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
