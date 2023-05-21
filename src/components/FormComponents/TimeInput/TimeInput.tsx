import { TimePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";
import React from "react";
import { FormPropsType } from "../../../models/formProps.model";

const TimeInput = ({ name, label, control, ...prop }: FormPropsType) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TimePicker {...prop} onChange={onChange} value={value} label={label} />
      )}
    />
  );
};

export default TimeInput;
