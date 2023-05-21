import React from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
type props = {
  name: string;
  label: string;
  control: any;
  [key: string]: unknown;
};

const DateInput = ({ name, label, control, ...prop }: props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <DatePicker {...prop} onChange={onChange} value={value} label={label} />
      )}
    />
  );
};

export default DateInput;
