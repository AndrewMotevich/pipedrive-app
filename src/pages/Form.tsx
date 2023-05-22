import React from "react";
import axios from "axios";
import { closeActivityModal, getCustomUISDK } from "../shared/sdk";
import { FieldValues, useForm } from "react-hook-form";
import { TextInput } from "../components/FormComponents/TextInput/TextInput";
import DateInput from "../components/FormComponents/DateInput/DateInput";
import TimeInput from "../components/FormComponents/TimeInput/TimeInput";
import SelectInput from "../components/FormComponents/SelectInput/SelectInput";

const addDeal = async (data: FieldValues) => {
  await axios.post("https://pipedrive-app.vercel.app/api/deals", data);
};

const Form = () => {
  const methods = useForm();
  const { handleSubmit, reset, control } = methods;

  async function close() {
    const sdk = await getCustomUISDK();
    if (sdk !== undefined) {
      await closeActivityModal(sdk);
    }
  }

  const onSubmit = (data: FieldValues) => {
    const dataObject = { ...data };
    dataObject.startDate = data.startDate.format("YYYY-MM-DD");
    dataObject.startTime = data.startTime.format("HH:mm:00");
    dataObject.endTime = data.endTime.format("HH:mm:00");
    addDeal(dataObject);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-wrapper">
          <div className="micro-form">
            <h2>Client details</h2>
            <div className="two-col-layout">
              <TextInput name="firstName" label="First name" control={control} />
              <TextInput name="lastName" label="Last name" control={control} />
            </div>
            <TextInput name="tel" type="tel" label="Phone" control={control} />
            <TextInput
              name="email"
              type="email"
              label="email"
              control={control}
            />
          </div>

          <div className="micro-form">
            <h2>Job details</h2>
            <div className="two-col-layout">
              <SelectInput name="jobType" label="Job type" control={control} />
              <SelectInput
                name="jobSource"
                label="Job source"
                control={control}
              />
            </div>
            <TextInput
              name="jobDescription"
              label="Job description (optional)"
              control={control}
              multiline
              rows={4}
            />
          </div>

          <div className="micro-form">
            <h2>Service location</h2>
            <TextInput name="address" label="Address" control={control} />
            <TextInput name="city" label="City" control={control} />
            <TextInput name="state" label="State" control={control} />
            <div className="two-col-layout">
              <TextInput
                name="zipCode"
                type="number"
                label="Zip code"
                control={control}
              />
              <SelectInput name="area" label="Area" control={control} />
            </div>
          </div>

          <div className="micro-form">
            <h2>Scheduled</h2>
            <DateInput name="startDate" label="Start date" control={control} />
            <div className="two-col-layout">
              <TimeInput name="startTime" label="Start time" control={control} />
              <TimeInput name="endTime" label="End time" control={control} />
            </div>
            <SelectInput
              name="testSelect"
              label="Test select"
              control={control}
            />
          </div>
        </div>
        <div className="buttons-wrapper">
          <button type="submit">Submit</button>
          <button onClick={() => close()}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
