import React from "react";
import axios from "axios";
import { closeActivityModal, getCustomUISDK } from "../components/sdk";
import { FieldValues, useForm } from "react-hook-form";
import { TextInput } from "../components/TextInput/TextInput";

const addDeal = async (data: FieldValues) => {
  await axios.post("https://pipedrive-app.vercel.app/api/deals", data);
};

const Form = () => {
  const methods = useForm();
  const { handleSubmit, reset, control } = methods;

  async function close() {
    const sdk = await getCustomUISDK();
    if (sdk !== undefined) {
      console.log("Close modal");
      await closeActivityModal(sdk);
    }
  }

  const onSubmit = (data: FieldValues) => {
    addDeal(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="micro-form">
          <h2>Client details</h2>
          <div className="two-col-layout">
            <TextInput name="firstName" label="First name" control={control} />
            <TextInput name="lastName" label="Last name" control={control} />
          </div>
          <TextInput name="tel" label="Phone" control={control} />
          <TextInput name="email" label="email" control={control} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => close()}>Close</button>
    </div>
  );
};

export default Form;
