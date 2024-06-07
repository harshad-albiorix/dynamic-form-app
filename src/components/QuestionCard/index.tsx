import React, { FC } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { IFormQuestions } from "../../types/createFormType";
import { useDispatch } from "react-redux";
import { deleteQuestion } from "../../redux/FormSlice";

interface IQuestionsCardProps {
  question: IFormQuestions;
  setEdit: React.Dispatch<React.SetStateAction<IFormQuestions | undefined>>;
}

export const QuestionCard: FC<IQuestionsCardProps> = ({
  question,
  setEdit,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    console.log(id);
    if (id) {
      dispatch(deleteQuestion(id));
    }
  };

  return (
    <Box
      sx={{ backgroundColor: "ButtonFace", borderRadius: 4 }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
    >
      <span>{question.question}</span>
      <Box display="flex">
        <IconButton onClick={() => setEdit(question)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDelete(question?.id!)}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};
