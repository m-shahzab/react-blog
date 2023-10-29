import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./";
import { login as authLogin } from "../reducer/slice/authSlice";
import { uploadPost } from "../reducer/slice/postSlice";
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/config";
import { PulseLoader } from "react-spinners";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        const posts = await appwriteService.getPosts();
        if (userData && posts.documents.length !== 0) {
          posts.documents.map((post) => {
            dispatch(uploadPost(post));
          });
          dispatch(authLogin(userData));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  // flex items-center justify-center
  return (
    <div id="login" className=" w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
              })}
            />
            <Button type="submit" className="w-full ">
              {loading ? (
                <PulseLoader color="cadetblue" loading={loading} />
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
