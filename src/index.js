import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import FileIO from "./pages/FileIO/FileIO";
// import Navbar from "./components/Navbar/Navbar";
// import Blog from "./pages/Blog/Blog";
// import Footer from "./components/Footer/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FileIO></FileIO>
    {/* <Navbar></Navbar> */}
    {/* <Blog></Blog> */}
    {/* <div
      style={{
        height: "300px",
        backgroundColor: "rgb(40, 40, 40)",
        width: "100%",
        color: "#fff",
      }}
      id="header"
    >
      Welcome
    </div>
    <div style={{ height: "1000px" }}></div>
    <IDCard></IDCard> */}
    {/* <Footer></Footer> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
