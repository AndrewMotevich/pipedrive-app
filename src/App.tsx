import { Fragment, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Main from "./pages/Main";
import About from "./pages/About";
import Form from "./pages/Form";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Main</Link>
          </li>
          <li>
            <Link to={"/form"}>Form</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/form" element={<Form />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
