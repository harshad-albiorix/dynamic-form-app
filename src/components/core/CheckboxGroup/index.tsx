import React from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormControl,
  FormLabel,
} from "@mui/material";

interface CheckboxGroupProps {
  label: string;
  name: string;
  options?: { label: string; value: string }[]; // Only for multiple checkboxes
  formik: any;
  single?: boolean; // Flag to toggle between single or multiple checkboxes
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  name,
  options,
  formik,
  single,
}) => {
  const { errors, touched, values } = formik;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    if (single) {
      formik.setFieldValue(name, value);
    } else {
      const optionValue = event.target.value;
      if (value) {
        formik.setFieldValue(name, [...(values[name] || []), optionValue]);
      } else {
        formik.setFieldValue(
          name,
          (values[name] || []).filter((val: string) => val !== optionValue)
        );
      }
    }
  };

  return (
    <FormControl error={Boolean(errors[name] && touched[name])}>
      <FormGroup>
        {single ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={values[name] || false}
                onChange={handleChange}
              />
            }
            label={label}
          />
        ) : (
          options?.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  value={option.value}
                  checked={(values[name] || []).includes(option.value)}
                  onChange={handleChange}
                />
              }
              label={option.label}
            />
          ))
        )}
      </FormGroup>
      {errors[name] && touched[name] && (
        <FormHelperText>{errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
};
