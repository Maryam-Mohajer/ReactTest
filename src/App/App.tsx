import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useUserAuth } from "../core/utils/context/AuthenticationContext";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnAuthenticatedApp } from "./UnAuthenticatedApp";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const App: React.FC = () => {
  const { token } = useUserAuth();

  // alert(JSON.stringify(token))

  return (
    <QueryClientProvider client={queryClient}>
      {token ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </QueryClientProvider>
  );
};
export { App };
