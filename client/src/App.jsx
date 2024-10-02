import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/mainComp/mainLayout";
import Home from "./components/pages/homePage/Home";
import NotFound from "./components/mainComp/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <div>About</div> },
        { path: "contact", element: <div>Contact</div> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
