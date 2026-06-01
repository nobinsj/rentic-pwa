import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { routes } from "./routes";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Slide, ToastContainer } from "react-toastify"


function App() {
  const router = createBrowserRouter(routes);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          autoClose={1500}
          hideProgressBar
          position="top-center"
          transition={Slide}
          closeButton={false}
        />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
