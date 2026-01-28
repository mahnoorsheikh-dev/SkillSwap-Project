import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const schema = yup.object().shape({
    ...(isLogin ? {} : { name: yup.string().required("Name is required") }),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    ...(isLogin
      ? {}
      : {
          confirmPassword: yup
            .string()
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const endpoint = isLogin
          ? `${API_URL}/api/auth/login`
          : `${API_URL}/api/auth/signup`;
      const userData = { ...data };
      if (!isLogin) delete userData.confirmPassword;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (res.ok) {
        if (result.user && result.user._id) localStorage.setItem("userId", result.user._id);
        if (result.user && result.user.name) localStorage.setItem("userName", result.user.name);
        if (result.token) localStorage.setItem("token", result.token);

        window.dispatchEvent(new Event("storage"));

        setMessage(isLogin ? "Login successful!" : "Signup successful!");

        navigate("/dashboard");
      } else {
        setMessage(result.message || result.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server connection failed!");
    }

    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-[#212529]">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-[#1D3557] text-center mb-6">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {isLogin
            ? "Login to continue to SkillSwap"
            : "Sign up to start your SkillSwap journey"}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-mb-10 mt-5 mb-10">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#457B9D] transition"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#457B9D] transition"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#457B9D] transition"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#457B9D] transition"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#457B9D] hover:bg-[#1D3557] text-white font-semibold py-3 rounded-lg transition mt-5"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {message && <p className="text-center mt-4 text-sm font-medium text-gray-700">{message}</p>}

        <p className="text-center text-gray-500 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-[#457B9D] font-semibold cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
