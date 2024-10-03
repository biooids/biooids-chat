import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  actionStart,
  actionSuccess,
  actionFailure,
} from "../../../app/features/user/userSlice.js";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function LogIn() {
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(actionStart());
      const res = await fetch("/api/auth/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(actionFailure(data.message));
      } else {
        dispatch(actionSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(actionFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="card  w-full max-w-sm shrink-0 shadow-2xl m-auto bg-base-100">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              id="userName"
              type="text"
              placeholder="Enter username"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
            <div className="mt-3">
              {showPassword ? (
                <FaRegEye onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} />
              )}
            </div>
          </div>

          <div className="mt-3">
            <button type="submit" className="btn w-full">
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
        {error && (
          <div className="alert alert-error mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>{error}</span>
            <button
              type="button"
              className="btn btn-sm ml-2"
              onClick={() => dispatch(actionFailure(null))}
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LogIn;
