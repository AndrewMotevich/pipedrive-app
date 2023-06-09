import React from "react";
import { Controller } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";
import { FormPropsType } from "../../../models/formProps.model";

const SelectInput = ({ name, label, control, ...prop }: FormPropsType) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          select
          fullWidth
          {...prop}
          onChange={onChange}
          value={value}
          label={label}
        >
          <MenuItem value={label + " 1"}>{label + " 1"}</MenuItem>
          <MenuItem value={label + " 2"}>{label + " 2"}</MenuItem>
          <MenuItem value={label + " 3"}>{label + " 3"}</MenuItem>
        </TextField>
      )}
    />
  );
};

export default SelectInput;
