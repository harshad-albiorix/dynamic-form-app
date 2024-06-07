import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ICreateFormType } from "../../types/createFormType";
import { useDispatch } from "react-redux";
import { removeForm } from "../../redux/MainSlice";
import { useNavigate } from "react-router-dom";

interface IFormListItemProps {
  data: Partial<ICreateFormType>;
}

export const FormListItem: FC<IFormListItemProps> = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    if (id) {
      dispatch(removeForm(id));
    }
  };

  return (
    <Paper elevation={3} sx={{ paddingBlock: 2, paddingInline: 2 }}>
      <Stack spacing={2}>
        <Typography variant="subtitle1" fontWeight={600}>
          {data?.formName}
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => navigate(`/edit-form-control/${data?.id}`)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDelete(data?.id!)}
          >
            Delete
          </Button>
          <Button size="small" variant="contained">
            Preview
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};
