// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SignUpPage = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Sign up failed");

//       navigate("/login");
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("An unknown error occurred");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-amber-100">
//       <form
//         className="bg-white p-6 rounded shadow-md w-full max-w-sm"
//         onSubmit={handleSubmit}
//       >
//         <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
//         {error && <p className="text-red-500 mb-2">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-2 mb-2 w-full"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-2 mb-4 w-full"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button
//           type="submit"
//           className="bg-amber-500 text-white p-2 w-full rounded"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignUpPage;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Sign up failed");

      navigate("/login");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white font-sans">
      {/* 1. Left Side: Decorative Section (Visible on MD screens and up) */}
      <div className="hidden lg:flex lg:w-1/2 bg-amber-500 relative overflow-hidden items-center justify-center p-12">
        <div className="relative z-10 text-white max-w-md">
          <div className="mb-8 flex justify-center lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl shadow-amber-200">
                🥘
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  Premium
                </p>
                <p className="text-xl font-black text-gray-900">BLogApp</p>
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Master the Art of Blogs.
          </h1>
          <p className="text-amber-100 text-lg">
            Join thousands of BLogs sharings.
          </p>
        </div>
        {/* Decorative background shape */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-amber-400 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-64 h-64 bg-orange-600 rounded-full blur-3xl opacity-30"></div>
      </div>

      {/* 2. Right Side: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-amber-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-gray-600">
              Start your BLogs viewing journey with us today.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                  placeholder="blogger@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-amber-200 transition-all active:scale-95 transform"
            >
              Get Started
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-amber-600 hover:text-amber-700"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
