import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { orange, red, pink } from "@mui/material/colors";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
const theme = createTheme({
  palette: {
    primary: {
      main: "#ccc",
    },
    secondary: {
      main: pink[400],
    },
    mycustomcolor: {
      main: red[500],
      superDark: red[500],
      superLight: red[500],
    },
    typography: {
      myVariant: {
        fontSize: "1rem",
        color: orange[500],
      },
    },
    spacing: 1,
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
