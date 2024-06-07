import { Add } from "@mui/icons-material";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetFormData } from "../../redux/FormSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigateToCreateForm = () => {
    dispatch(resetFormData());
    navigate("/create-form-control");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Dynamic Form
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              startIcon={<Add />}
              color="inherit"
              variant="outlined"
              onClick={handleNavigateToCreateForm}
            >
              Create
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav></nav>
    </Box>
  );
};
