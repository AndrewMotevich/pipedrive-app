import React from "react";
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormPropsType } from "../../../models/formProps.model";

const DateInput = ({ name, label, control, ...prop }: FormPropsType) => {
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
