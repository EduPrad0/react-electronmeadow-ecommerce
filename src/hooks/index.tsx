import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { QueryClientProvider } from "react-query";

import theme from "../assets/styles/theme";
import { queryClient } from "../services/queryClient";

interface IProvider {
  children: React.ReactNode
}

export function Providers({children}: IProvider) {
  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </QueryClientProvider>
  );
}

export default Providers;
