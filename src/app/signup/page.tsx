"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // For tutor or student
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.role) {
      setError("Please select if you are a tutor or student.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong!");
        setLoading(false);
        return;
      }

      const { token } = await response.json();

      // Save token to local storage or cookies
      localStorage.setItem("token", token);

      // Redirect to the next page
      router.push("/addcity");
    } catch (err) {
      setError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
       <>
        <div className="w-1/2 flex items-center justify-center">
          <DotLottieReact src="/svg/login.lottie" loop autoplay />
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center px-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h1>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-red-500 text-sm font-medium">
              {error}
            </div>
          )}

          <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
              <span className="block text-sm font-medium text-gray-600 mb-2">
                Are you a tutor or student?
              </span>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="tutor"
                    checked={formData.role === "tutor"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Tutor
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Student
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Radio Buttons for Role */}
            

            <button
              type="submit"
              className={`w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : "SUBMIT"}
            </button>
          </form>

          <div className="mt-4">
            <Link href="login" className="text-sm text-gray-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
        </>
  );
};

export default SignUp;
