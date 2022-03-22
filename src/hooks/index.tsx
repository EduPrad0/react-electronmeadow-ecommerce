import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { QueryClientProvider } from "react-query";

import theme from "../assets/styles/theme";
import { queryClient } from "../services/queryClient";
import OrderProvider from "./useOrder";

interface IProvider {
  children: React.ReactNode
}

export function Providers({children}: IProvider) {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
      </OrderProvider>
    </QueryClientProvider>
  );
}

export default Providers;
