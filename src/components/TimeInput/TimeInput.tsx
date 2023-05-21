import { TimePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";
import React from "react";
type props = {
  name: string;
  label: string;
  control: any;
  [key: string]: unknown;
};

const TimeInput = ({ name, label, control, ...prop }: props) => {
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
