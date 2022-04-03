import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { QueryClientProvider } from "react-query";

import { ToastContainer } from 'react-toastify';
import theme from "../assets/styles/theme";
import 'react-toastify/dist/ReactToastify.css';
import { queryClient } from "../services/queryClient";
import OrderProvider from "./useOrder";
import { AuthProvider } from "./useAuth";

interface IProvider {
  children: React.ReactNode
}

export function Providers({ children }: IProvider) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer />
        <OrderProvider>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        </OrderProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default Providers;
