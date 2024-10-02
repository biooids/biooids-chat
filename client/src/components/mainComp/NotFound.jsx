import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex justify-center flex-col items-center  min-h-screen">
      <h2 className="text-9xl">404</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="bg-slate-700 p-1 rounded-lg">
        Home
      </Link>
    </div>
  );
}

export default NotFound;
