"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg flex">
        {/* Image Section */}
        <div className="w-1/2 flex items-center justify-center">
          <DotLottieReact src="/svg/login.lottie" loop autoplay />
        </div>

        {/* Login Section */}
        <div className="w-1/2 flex flex-col items-center justify-center px-8">
          {/* Header */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6">LOG IN</h1>

          {/* Form */}
          <form className="w-full">
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-600"
                htmlFor="username"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 text-right">
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              SUBMIT
            </button>
          </form>

          {/* Create Account */}
          <div className="mt-4">
           
             <Link href={"signup"}  className="text-sm text-gray-600 hover:underline">Create an Account</Link>
       
          </div>

          {/* Alternative Login */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm mb-4">Or</p>
            <div className="flex justify-center gap-4">
              {/* Google Button */}
              <div className="p-2 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-100">
                <Image
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z' fill='%234285F4'/%3E%3C/svg%3E"
                  alt="Google login"
                  className="h-6 w-6"
                  width={20}
                  height={20}
                />
              </div>
              {/* Facebook Button */}
              <div className="p-2 border border-gray-300 rounded-full cursor-pointer hover:bg-gray-100">
                <Image
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.226C18.307,21.153,22,17.013,22,12C22,6.477,17.523,2,12,2z' fill='%231877F2'/%3E%3C/svg%3E"
                  alt="Facebook login"
                  className="h-6 w-6"
                  width={20}
                  height={20}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
