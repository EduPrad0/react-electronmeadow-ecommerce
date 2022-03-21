import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#fff",
    },
    primary: {
      main: "#121214",
    },
    secondary: {
      main: "#FFF",
    },
  },
  typography: {
    fontFamily: [
      "League Gothic",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

export default theme;
