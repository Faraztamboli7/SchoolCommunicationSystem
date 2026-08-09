import api from "../services/api";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Please fix the highlighted fields");
    return;
  }

  try {
    setLoading(true);

    const response = await api.post("/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    const { token, user } = response.data;

    // Store JWT
    localStorage.setItem(
      "educonnect_token",
      token
    );

    // Store user through AuthContext
    login(user);

    toast.success("Welcome back, " + user.name + "!");

    navigate("/dashboard");

  } catch (error) {

    console.error("Login failed:", error);

    const message =
      error.response?.data?.message ||
      "Unable to login. Please try again.";

    toast.error(message);

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-950 flex">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950" />

        {/* Decorative circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between p-14 text-white w-full">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
              <GraduationCap size={27} />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                EduConnect
              </h1>

              <p className="text-sm text-blue-100">
                School Communication Platform
              </p>
            </div>

          </div>

          {/* Main message */}
          <div className="max-w-lg">

            <p className="text-blue-200 font-medium mb-4">
              SCHOOL COMMUNICATION, SIMPLIFIED
            </p>

            <h2 className="text-5xl font-bold leading-tight">
              Connect your school
              <span className="text-blue-200">
                {" "}with everyone.
              </span>
            </h2>

            <p className="text-blue-100/80 mt-6 text-lg leading-relaxed">
              Create, publish and track important school
              communications from one powerful platform.
            </p>

          </div>

          {/* Footer */}
          <div className="text-sm text-blue-200/70">
            © 2026 EduConnect. School Communication System.
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 bg-slate-50 flex items-center justify-center p-6">

        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">

            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <GraduationCap size={24} />
            </div>

            <div>
              <h1 className="font-bold text-lg">
                EduConnect
              </h1>

              <p className="text-xs text-slate-500">
                School Communication
              </p>
            </div>

          </div>

          {/* Heading */}
          <div className="mb-8">

            <h2 className="text-3xl font-bold text-slate-900">
              Welcome back 👋
            </h2>

            <p className="text-slate-500 mt-2">
              Sign in to manage your school communications.
            </p>

          </div>

          {/* Login card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@school.com"
                    className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition ${
                      errors.email
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    }`}
                  />

                </div>

                {errors.email && (
                  <p className="text-xs text-red-500 mt-2">
                    {errors.email}
                  </p>
                )}

              </div>

              {/* Password */}
              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-12 text-sm outline-none transition ${
                      errors.password
                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

                {errors.password && (
                  <p className="text-xs text-red-500 mt-2">
                    {errors.password}
                  </p>
                )}

              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between">

                <label className="flex items-center gap-2 text-sm text-slate-600">

                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-600"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20"
              >

                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} />
                  </>
                )}

              </button>

            </form>

          </div>

          {/* Demo information */}
          <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-100">

            <p className="text-xs font-semibold text-blue-700">
              Development Login
            </p>

            <p className="text-xs text-blue-600 mt-1">
              admin@school.com / admin123
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}