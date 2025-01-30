import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
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
import React, { Fragment, useEffect, useState } from "react";
import { questionType, validationType } from "../../constant/data";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useCreateForm } from "../../hooks/useCreateForm";
import { useParams } from "react-router-dom";
import { IFormQuestions, IOption } from "../../types/createFormType";
import { Delete } from "@mui/icons-material";

interface IAddOptionsProps {
  setOptions: React.Dispatch<React.SetStateAction<IOption[]>>;
  data: IFormQuestions;
}

const AddOptions: React.FC<IAddOptionsProps> = ({ setOptions, data }) => {
  const [optionText, setOptionText] = useState<IOption>({
    value: "",
    label: "",
    field: "",
  });

  const handleAddOption = () => {
    if (!optionText.value.trim()) return;
    setOptions((prev) => [...prev, { ...optionText, field: data.question }]);
    setOptionText({ value: "", label: "", field: "" });
  };

  return (
    <Box display="flex" gap={2}>
      <Input
        label="Option Name"
        name="optionText"
        type="text"
        onChange={(e) =>
          setOptionText((prev) => ({
            ...prev,
            ...{ value: e.target.value, label: e.target.value },
          }))
        }
        placeholder="Enter Option"
        value={optionText.value}
      />
      <Button variant="contained" type="button" onClick={handleAddOption}>
        Add Option
      </Button>
    </Box>
  );
};

const DisplayAddedOption = ({
  option,
  setOptions,
}: {
  option: IOption;
  setOptions: React.Dispatch<React.SetStateAction<IOption[]>>;
}) => {
  const handleDelete = (value: string) => {
    setOptions((prev) => prev.filter((item) => item.value !== value));
  };

  return (
    <Box
      sx={{ borderRadius: 4, border: "1px solid #ccc" }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
    >
      <span>{option.label}</span>
      <Box display="flex">
        <IconButton onClick={() => handleDelete(option?.value)}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};

export const CreateFormContainer = () => {
  const params = useParams();
  const editId = params?.id;
  const [opened, handler] = useDisclosure();
  const formData = useSelector((state: RootState) => state.form.formData);

  const {
    formik,
    edit,
    formikRef,
    setEdit,
    setOptions,
    options,
    handleSaveForm,
    handleBackToList,
  } = useCreateForm();

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

  // if edit is true then option will be set to state from edit
  useEffect(() => {
    if (edit) {
      setOptions(edit?.options || []);
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

                  <Dropdown
                    labelId="type"
                    label="Question Type"
                    name="type"
                    options={questionType}
                    formik={formik}
                  />

                  <DropdownWithMultiple
                    labelId="validation"
                    label="Validation"
                    name="validation"
                    options={validationType}
                    formik={formik}
                  />
                </Box>
                {(formik.values.type === "dropdown" ||
                  formik.values.type === "multi-select" ||
                  formik.values.type === "radio") && (
                  <Stack spacing={2}>
                    <AddOptions setOptions={setOptions} data={formik.values} />
                    {!!options?.length && (
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        sx={{
                          backgroundColor: "ButtonFace",
                          borderRadius: 4,
                          padding: 2,
                        }}
                      >
                        {options?.map((option: IOption, index) => (
                          <DisplayAddedOption
                            key={index}
                            option={option}
                            setOptions={setOptions}
                          />
                        ))}
                      </Box>
                    )}
                  </Stack>
                )}

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
              {formData?.formQuestions?.map(
                (question: IFormQuestions, index: number) => (
                  <QuestionCard
                    key={index}
                    question={question}
                    setEdit={setEdit}
                  />
                )
              )}
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
