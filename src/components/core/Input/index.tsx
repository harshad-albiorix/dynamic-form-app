import { BaseTextFieldProps, TextField } from "@mui/material";
import { FC } from "react";

interface InputProps extends BaseTextFieldProps {
  formik: any;
}

export const Input: FC<InputProps> = (props) => {
  const { formik, name, ...rest } = props;

  const { handleChange, errors, touched, values } = formik;

  return (
    <TextField
      sx={{ width: "100%" }}
      name={name ? name : ""}
      value={name ? values[name] : ""}
      onChange={handleChange}
      error={errors[name!] && touched[name!] ? errors[name!] : ""}
      helperText={errors[name!] && touched[name!] ? errors[name!] : ""}
      {...rest}
    />
  );
};
