import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";



export default function AppProviders({ children }) {
    const queryClient = new QueryClient();
   

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" />
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}
