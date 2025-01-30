import { BaseTextFieldProps, TextField } from "@mui/material";
import { FC } from "react";

interface InputProps extends BaseTextFieldProps {
  formik?: any;
  onChange?: (e: any) => void;
}

export const Input: FC<InputProps> = (props) => {
  const { formik, name, value, onChange, error, helperText, ...rest } = props;

  const isFormik = formik && name;

  const fieldValue = isFormik ? formik.values[name!] : value ?? "";
  const fieldError = isFormik ? formik.errors[name!] : error;
  const fieldTouched = isFormik ? formik.touched[name!] : false;
  const fieldHelperText =
    isFormik && fieldError && fieldTouched ? fieldError : helperText;

  return (
    <TextField
      sx={{ width: "100%" }}
      name={name}
      value={fieldValue}
      onChange={isFormik ? formik.handleChange : onChange}
      error={Boolean(fieldError && fieldTouched)}
      helperText={fieldHelperText}
      {...rest}
    />
  );
};
