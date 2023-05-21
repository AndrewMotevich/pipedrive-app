import "./App.scss";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import About from "./pages/About";
import Form from "./pages/Form";
import { getCustomUISDK } from "./components/sdk";
import AppExtensionsSDK from "@pipedrive/app-extensions-sdk";

function App() {
  async function close() {
    const sdk = await getCustomUISDK();
    if (sdk !== undefined) {
      console.log("Close modal");
      await closeActivityModal(sdk);
    }
  }

  return (
    <div>
      <nav className="nav-wrapper">
        <ul className="ul-wrapper">
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
        <button
          onClick={() => {
            close();
          }}
        >
          &#9587;
        </button>
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
function closeActivityModal(sdk: AppExtensionsSDK) {
  throw new Error("Function not implemented.");
}
