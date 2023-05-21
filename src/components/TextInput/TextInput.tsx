import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
type props = {
  name: string;
  label: string;
  control: any;
  [key: string]: unknown;
};

export const TextInput = ({ name, label, control, ...prop }: props) => {
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