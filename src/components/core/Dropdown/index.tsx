import {
  BaseSelectProps,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, ReactNode } from "react";

interface DropdownProps extends BaseSelectProps {
  formik: any;
  options: any[];
}

export const Dropdown: FC<DropdownProps> = (props) => {
  const { formik, name, options, label, ...rest } = props;

  const { errors, touched, values } = formik;
  const handleChange = (
    event: SelectChangeEvent<unknown>,
    child: ReactNode
  ) => {
    formik.setFieldValue(name, event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        label={label}
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
    </FormControl>
  );
};
