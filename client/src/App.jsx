import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./components/mainComp/mainLayout";
import Home from "./components/pages/homePage/Home";
import NotFound from "./components/mainComp/NotFound";
import Auth from "./components/pages/authPage/Auth";
import SignUp from "./components/pages/authPage/SignUp";
import LogIn from "./components/pages/authPage/LogIn";

import Authenticated from "./components/mainComp/Authenticated";
import ChatPage from "./components/pages/chatPage/ChatPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "auth",
          element: <Auth />,
          children: [
            { index: true, element: <LogIn /> },
            { path: "sign-up", element: <SignUp /> },
          ],
        },
        {
          element: <Authenticated />,
          children: [{ path: "chat-page", element: <ChatPage /> }],
        },

        { path: "contact", element: <div>Contact</div> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
