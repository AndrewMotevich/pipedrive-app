import React from "react";
import { Control, Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
type props = {
  name: string;
  label: string;
  control: any;
};

export const TextInput = ({ name, label, control }: props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField onChange={onChange} value={value} label={label} />
      )}
    />
  );
};
