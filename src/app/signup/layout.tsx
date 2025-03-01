import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sign Up",
  description: "User Sign Up",
};

export default function SignUpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg flex">
        {children}
    </div>
    </div>
  );
}
