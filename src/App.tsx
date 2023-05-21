import "./App.scss";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import About from "./pages/About";
import Form from "./pages/Form";
import { useEffect } from "react";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={"/main"}>Main</Link>
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
        <Route path="/main" element={<Main />} />
        <Route path="/form" element={<Form />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Navigate to="/main" />} />
      </Routes>
    </div>
  );
}

export default App;
