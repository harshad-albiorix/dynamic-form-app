import { DateFieldProps, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { FC } from "react";

interface DateInputFieldProps extends DateFieldProps<any, any> {
  formik: any;
  name: string;
}

export const DateInputField: FC<DateInputFieldProps> = (props) => {
  const { formik, name, label, ...rest } = props;

  const { errors, touched, values } = formik;

  const handleChange = (value: any) => {
    const formateDate = dayjs(value).format("YYYY-MM-DD");
    formik.setFieldValue(name, formateDate);
  };

  return (
    <DatePicker
      value={dayjs(values[name])}
      sx={{ width: "100%" }}
      name={name ? name : ""}
      onChange={handleChange}
      label={label}
      slotProps={{
        textField: {
          variant: "standard",
          error: errors[name!] && touched[name!] ? errors[name!] : "",
          helperText: errors[name!] && touched[name!] ? errors[name!] : "",
        },
      }}
      {...rest}
    />
  );
};
