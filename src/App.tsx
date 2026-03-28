import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import { routes } from "./routes";

function App() {
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}

export default App;
