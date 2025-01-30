import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Routes } from "./Routes";
import { Provider } from "react-redux";
import store, { pstore } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Header } from "./components";
import { Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={pstore}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BrowserRouter basename="/">
            <Header />
            <Box component="main" sx={{ paddingTop: 8 }}>
              <Routes />
            </Box>
          </BrowserRouter>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
