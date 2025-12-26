// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import { loginUser, type LoginResponse } from "../api/auth";
// import { useAuthStore } from "../store/AuthStore";

// const LoginPage = () => {
//   const { login } = useAuthStore();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const mutation = useMutation({
//     mutationFn: () => loginUser({ email, password }),
//     onSuccess: (data: LoginResponse) => {
//       login(data.user, data.accessToken);
//       navigate("/my-blogs");
//     },
//     onError: (err: unknown) => {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("An unknown error occurred");
//       }
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     mutation.mutate();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-amber-100">
//       <form
//         className="bg-white p-6 rounded shadow-md w-full max-w-sm"
//         onSubmit={handleSubmit}
//       >
//         <h1 className="text-2xl font-bold mb-4">Login</h1>
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
//           disabled={mutation.isPending}
//           className="bg-amber-500 text-white p-2 w-full rounded"
//         >
//           {mutation.isPending ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser, type LoginResponse } from "../api/auth";
import { useAuthStore } from "../store/AuthStore";

const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: () => loginUser({ email, password }),
    onSuccess: (data: LoginResponse) => {
      login(data.user, data.accessToken);
      navigate("/my-blogs");
    },
    onError: (err: unknown) => {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    mutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white font-sans">
      {/* 1. Left Side: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-amber-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
<div className="mb-8 flex justify-center lg:justify-start">
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl shadow-amber-200">
      🥘
    </div>
    <div className="hidden sm:block">
      <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Premium</p>
      <p className="text-xl font-black text-gray-900">BLogApp</p>
    </div>
  </div>
</div>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Welcome Back!</h2>
            <p className="mt-3 text-gray-600"> You missed many Blogs. Log in to start looking for blogs and publish yours.</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-center gap-2 animate-pulse">
                <span className="font-bold">!</span> {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none bg-white"
                  placeholder="blogger@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-semibold text-gray-700">Password</label>
                  <a href="#" className="text-xs text-amber-600 hover:underline">Forgot password?</a>
                </div>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none bg-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className={`w-full flex justify-center items-center gap-2 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all transform active:scale-95 ${
                mutation.isPending ? "bg-amber-400 cursor-wait" : "bg-amber-600 hover:bg-amber-700 shadow-amber-200"
              }`}
            >
              {mutation.isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "LogIn"
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              New to the community?{" "}
              <Link to="/signup" className="font-bold text-amber-600 hover:text-amber-700 underline-offset-4 hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* 2. Right Side: Brand Imagery */}
      <div className="hidden lg:flex lg:w-1/2 bg-amber-600 relative overflow-hidden items-center justify-center p-12">
        <div className="relative z-10 text-center text-white">
          <div className="mb-8 flex justify-center">
             {/* Replace with your logo/icon */}
             <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl">
                <span className="text-6xl">🥘</span>
             </div>
          </div>
          <h1 className="text-5xl font-black mb-4">Blogs Await.</h1>
          <p className="text-amber-100 text-xl max-w-sm mx-auto">
            Log in to access your saved blogs, shared secrets, and personalized pantry.
          </p>
        </div>
        
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;