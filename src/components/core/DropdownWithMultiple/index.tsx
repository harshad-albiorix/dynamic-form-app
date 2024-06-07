import {
  BaseSelectProps,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

interface DropdownWithMultipleProps extends BaseSelectProps {
  formik: any;
  options: string[];
}

export const DropdownWithMultiple: FC<DropdownWithMultipleProps> = (props) => {
  const { formik, name, options, ...rest } = props;

  const { errors, touched, values } = formik;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    formik.setFieldValue(
      name,
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Select
      sx={{ width: "100%" }}
      value={values[name!]}
      onChange={handleChange}
      error={errors[name!] && touched[name!] ? errors[name!] : ""}
      renderValue={(selected) => selected.join(", ")}
      MenuProps={MenuProps}
      multiple
      {...rest}
    >
      {options?.map((option, index) => (
        <MenuItem key={index} value={option}>
          <Checkbox checked={values[name!]?.indexOf(option) > -1} />
          <ListItemText primary={option} />
        </MenuItem>
      ))}
    </Select>
  );
};
