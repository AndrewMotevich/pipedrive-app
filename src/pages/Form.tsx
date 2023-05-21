import axios from "axios";
import React from "react";
import { closeActivityModal, getCustomUISDK } from "../components/sdk";

const addDeal = async () => {
  await axios
    .post("https://pipedrive-app.vercel.app/api/deals", {
      title: "deal from api",
    })
    .then((res) => {
      if (res.data.data) {
        console.log(res);
      }
    });
};

const Form = () => {
  async function close() {
    const sdk = await getCustomUISDK();
    if (sdk !== undefined) {
      console.log("Close modal");
      await closeActivityModal(sdk);
    }
  }
  return (
    <div>
      <input type="text" />
      <input type="password" />
      <button
        onClick={() => {
          addDeal();
        }}
      >
        add new deal
      </button>
      <button
        onClick={async () => {
          await close();
        }}
      >
        Close
      </button>
    </div>
  );
};

export default Form;
