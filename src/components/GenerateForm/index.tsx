import React from "react";
import { IFormQuestions } from "../../types/createFormType";
import {
  CheckboxGroup,
  DateInputField,
  Dropdown,
  DropdownWithMultiple,
  Input,
  RadioButtonGroup,
} from "../core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Stack } from "@mui/material";

interface IGenerateFormProps {
  data: IFormQuestions[];
}

export const GenerateForm: React.FC<IGenerateFormProps> = ({ data }) => {
  const initialValues = data.reduce((values: { [key: string]: any }, field) => {
    values[field.question] = ""; // Use question as the field name
    return values;
  }, {});

  // Creating validationSchema dynamically
  const validationSchema = data.reduce(
    (schema: { [key: string]: Yup.MixedSchema }, field) => {
      let fieldValidation: Yup.MixedSchema;

      if (field.type === "date") {
        fieldValidation = Yup.date() as Yup.MixedSchema;
      } else if (field.type === "number") {
        fieldValidation = Yup.number() as Yup.MixedSchema;
      } else if (field.type === "text") {
        fieldValidation = Yup.string() as Yup.MixedSchema;
      } else if (field.type === "email") {
        fieldValidation = Yup.string().email(
          "Invalid email format"
        ) as Yup.MixedSchema;
      } else {
        fieldValidation = Yup.mixed(); // Default fallback
      }

      // Apply required validation only if "required" exists in validation array
      if (field.validation?.includes("required")) {
        fieldValidation = fieldValidation.required(
          `${field.question} is required`
        );
      }

      schema[field.question] = fieldValidation;
      return schema;
    },
    {}
  );
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values: any) => {
    console.log(values);
    // Your submit logic here
  };

  return (
    <Box>
      <form onSubmit={formik.handleSubmit} style={{ flex: 2 }}>
        <Stack spacing={4}>
          {data.map((item, index) => {
            const fieldName = item.question; // Field name based on question

            if (item.type === "date") {
              return (
                <div key={index}>
                  <DateInputField formik={formik} name={fieldName} />
                </div>
              );
            }

            if (item.type === "text") {
              return (
                <div key={index}>
                  <Input
                    formik={formik}
                    label={fieldName}
                    name={fieldName}
                    placeholder={item.question}
                    type={item.type}
                  />
                </div>
              );
            }

            if (item.type === "email") {
              return (
                <div key={index}>
                  <Input
                    formik={formik}
                    label={fieldName}
                    name={fieldName}
                    placeholder={item.question}
                    type={item.type}
                  />
                </div>
              );
            }

            if (item.type === "number") {
              return (
                <div key={index}>
                  <Input
                    formik={formik}
                    label={fieldName}
                    name={fieldName}
                    placeholder={item.question}
                    type={item.type}
                  />
                </div>
              );
            }

            if (item.type === "textarea") {
              return (
                <div key={index}>
                  <Input
                    formik={formik}
                    label={fieldName}
                    name={fieldName}
                    placeholder={item.question}
                  />
                </div>
              );
            }

            if (item.type === "dropdown") {
              return (
                <div key={index}>
                  <Dropdown
                    formik={formik}
                    label={fieldName}
                    name={fieldName}
                    options={item.options?.map((x) => x.value)}
                  />
                </div>
              );
            }

            if (item.type === "radio") {
              return (
                <div key={index}>
                  <RadioButtonGroup
                    label={fieldName}
                    name={fieldName}
                    options={item.options}
                    formik={formik}
                  />
                </div>
              );
            }

            if (item.type === "multi-select") {
              return (
                <div key={index}>
                  <DropdownWithMultiple
                    formik={formik}
                    label={fieldName}
                    name={fieldName}
                    options={item.options?.map((x) => x.value)}
                  />
                </div>
              );
            }

            if (item.type === "checkbox") {
              return (
                <div key={index}>
                  <CheckboxGroup
                    label={fieldName}
                    name={fieldName}
                    formik={formik}
                    single={true}
                  />
                </div>
              );
            }

            return null;
          })}

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
