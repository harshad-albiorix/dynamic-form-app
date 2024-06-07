import { Box, Button, Typography } from "@mui/material";
import { Input } from "../core";
import { useFormik } from "formik";
import { IAddFormName } from "../../constant/types";
import { addFomNameSchema } from "../../constant/schema";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { generateUniqueRandomNumber } from "../../utils/func";
import { useDispatch } from "react-redux";
import { setFormData } from "../../redux/FormSlice";

interface IAddFormNameProps {
  onClose: () => void;
}

export const AddFormName: FC<IAddFormNameProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik<IAddFormName>({
    initialValues: { formName: "" },
    validationSchema: addFomNameSchema,
    onSubmit: (value: IAddFormName) => handleSubmit(value),
  });

  const handleSubmit = (value: IAddFormName) => {
    if (value) {
      const id = generateUniqueRandomNumber();
      dispatch(setFormData({ formName: value.formName, id }));
      formik.resetForm();
      onClose();
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          background: "white",
          minWidth: 400,

          border: "none",
        }}
        display="flex"
        flexDirection="column"
        gap={2}
        p={4}
      >
        <Typography variant="h4" align="center">
          Add Form
        </Typography>
        <Input formik={formik} name="formName" placeholder="Enter form name" />
        <Box display="flex" gap={2} justifyContent={"center"}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => navigate("/")}
          >
            Back to list
          </Button>
          <Button type="submit" variant="contained">
            Add Question
          </Button>
        </Box>
      </Box>
    </form>
  );
};
