import {
  BaseSelectProps,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

interface DropdownProps extends BaseSelectProps {
  formik: any;
  options: any[];
}

export const Dropdown: FC<DropdownProps> = (props) => {
  const { formik, name, options, ...rest } = props;

  const { errors, touched, values } = formik;

  const handleChange = (event: SelectChangeEvent) => {
    formik.setFieldValue(name, event.target.value);
  };

  return (
    <Select
      sx={{ width: "100%" }}
      value={values[name!]}
      onChange={handleChange}
      error={errors[name!] && touched[name!] ? errors[name!] : ""}
      {...rest}
    >
      {options?.map((option, index) => (
        <MenuItem value={option} key={index}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};
