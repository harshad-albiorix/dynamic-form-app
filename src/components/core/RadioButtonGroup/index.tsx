import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

interface RadioButtonGroupProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  formik: any;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  label,
  name,
  options,
  formik,
}) => {
  const { errors, touched, values } = formik;

  return (
    <FormControl error={Boolean(errors[name] && touched[name])}>
      <FormLabel id={`${name}-label`}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={`${name}-label`}
        name={name}
        value={values[name]}
        onChange={(e) => formik.setFieldValue(name, e.target.value)}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {errors[name] && touched[name] && (
        <div style={{ color: "red", fontSize: "12px" }}>{errors[name]}</div>
      )}
    </FormControl>
  );
};
