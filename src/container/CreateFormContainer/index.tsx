import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  AddFormName,
  Dropdown,
  DropdownWithMultiple,
  Input,
  Modal,
  QuestionCard,
} from "../../components";
import { useDisclosure } from "../../hooks";
import { Fragment, useEffect } from "react";
import { questionType, validationType } from "../../constant/data";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCreateForm } from "../../hooks/useCreateForm";
import { useParams } from "react-router-dom";

export const CreateFormContainer = () => {
  const params = useParams();
  const editId = params?.id;
  const [opened, handler] = useDisclosure();
  const formData = useSelector((state: RootState) => state.form.formData);
  const { formik, edit, formikRef, setEdit, handleSaveForm, handleBackToList } =
    useCreateForm();

  useEffect(() => {
    if (!formData?.formName && !editId) {
      handler.open();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData?.formName, editId]);

  useEffect(() => {
    if (edit) {
      formikRef.current.setValues(edit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  return (
    <Fragment>
      <Modal children={<AddFormName onClose={handler.close} />} open={opened} />
      <Container
        sx={{
          paddingBlock: "42px",
        }}
      >
        <Stack spacing={4}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
            }}
          >
            <form onSubmit={formik.handleSubmit} style={{ flex: 2 }}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 2,
                  padding: 4,
                  gap: 4,
                  borderRadius: 4,
                }}
              >
                <Typography variant="h5" align="center">
                  Add Question
                </Typography>

                <Box display="flex">
                  <Input
                    label="Question"
                    name="question"
                    type="text"
                    formik={formik}
                    placeholder="Enter Question"
                  />
                  <FormControl fullWidth>
                    <InputLabel id="type">Question Type</InputLabel>
                    <Dropdown
                      labelId="type"
                      label="Question Type"
                      name="type"
                      options={questionType}
                      formik={formik}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="validation">Validation</InputLabel>
                    <DropdownWithMultiple
                      labelId="validation"
                      label="Validation"
                      name="validation"
                      options={validationType}
                      formik={formik}
                    />
                  </FormControl>
                </Box>
                <Button type="submit" variant="contained">
                  {edit ? "Edit Question" : "Add Question"}
                </Button>
              </Paper>
            </form>
            <Paper
              elevation={3}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: 4,
                gap: 2,
                borderRadius: 4,
              }}
            >
              {formData?.formQuestions?.map((question, index) => (
                <QuestionCard
                  key={index}
                  question={question}
                  setEdit={setEdit}
                />
              ))}
            </Paper>
          </Box>
          <Box display="flex" gap={2}>
            <Button
              disabled={!formData?.formQuestions?.length}
              variant="contained"
              onClick={handleSaveForm}
            >
              {editId ? "Edit Form" : "Save Form"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBackToList}
            >
              Back to List
            </Button>
          </Box>
        </Stack>
      </Container>
    </Fragment>
  );
};
