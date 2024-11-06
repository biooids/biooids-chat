import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/home/Home";
import PageNotFound from "./components/pages/404/PageNotFound";
import GeneralRoom from "./components/pages/generalRoom/GeneralRoom";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home />, errorElement: <PageNotFound /> },
    {
      path: "/general-room",
      element: <GeneralRoom />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
