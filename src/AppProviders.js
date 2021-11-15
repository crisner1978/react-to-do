import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

export default function AppProviders({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Toaster position="bottom-center" />
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}
