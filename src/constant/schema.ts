import * as Yup from "yup";

export const addFomNameSchema = Yup.object().shape({
  formName: Yup.string().required("Form name is required."),
});
