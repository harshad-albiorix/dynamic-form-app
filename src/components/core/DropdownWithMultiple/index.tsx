import {
  BaseSelectProps,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

interface DropdownWithMultipleProps extends BaseSelectProps {
  formik: any;
  options: string[];
  name: string;
}

export const DropdownWithMultiple: FC<DropdownWithMultipleProps> = (props) => {
  const { formik, name, options, label, ...rest } = props;

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

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const {
      target: { value },
    } = event;

    formik.setFieldValue(name, Array.isArray(value) ? value : [value]);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        label={label}
        sx={{ width: "100%" }}
        value={Array.isArray(values[name!]) ? values[name!] : []}
        onChange={handleChange}
        error={errors[name!] && touched[name!] ? errors[name!] : ""}
        renderValue={(selected) => (selected as string[]).join(", ")}
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
    </FormControl>
  );
};
