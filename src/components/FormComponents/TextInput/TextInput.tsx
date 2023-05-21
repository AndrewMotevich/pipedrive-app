import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { FormPropsType } from "../../../models/formProps.model";

export const TextInput = ({ name, label, control, ...prop }: FormPropsType) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField {...prop} onChange={onChange} value={value} label={label} />
      )}
    />
  );
};
