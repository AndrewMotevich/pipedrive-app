import React from "react";
import { Link } from "react-router-dom";
import { closeActivityModal, getCustomUISDK } from "../../shared/sdk";

const Navigation = () => {
  async function close() {
    const sdk = await getCustomUISDK();
    if (sdk !== undefined) {
      await closeActivityModal(sdk);
    }
  }

  return (
    <nav className="nav-wrapper">
      <ul className="ul-wrapper">
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
      <button
        onClick={() => {
          close();
        }}
      >
        &#9587;
      </button>
    </nav>
  );
};

export default Navigation;
