import axios from "axios";
import React from "react";

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
    </div>
  );
};

export default Form;
