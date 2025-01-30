import { Box, Container, Paper, Typography } from "@mui/material";
import { GenerateForm } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { ICreateFormType } from "../../types/createFormType";

export const Preview = () => {
  const params = useParams();
  const forms = useSelector((state: RootState) => state.main.data);
  const id = params?.id;

  const currentForm: ICreateFormType = (forms.find(
    (item) => item.id === Number(id)
  ) as ICreateFormType) || { id: 0, formName: "", formQuestions: [] };

  return (
    <Container
      sx={{
        paddingBlock: "42px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
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
            {currentForm?.formName}
          </Typography>

          <GenerateForm data={currentForm?.formQuestions} />
        </Paper>
      </Box>
    </Container>
  );
};
