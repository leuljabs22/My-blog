// import { useQuery } from "@tanstack/react-query";
// import { getAllBlogs } from "../api/blogs";
// import { useState } from "react";
// import BlogCard from "../components/BlogCard";
// const Home = () => {
//   const [page, setPage] = useState(1);
//   const limit = 5;
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["all-blogs", page],
//     queryFn: () => getAllBlogs({ page, limit }),
//   });
//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-semibold animate-pulse text-gray-500">
//           Loading blogs...
//         </p>
//       </div>
//     );
//   if (isError)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-semibold text-red-600">
//           Error loading blogs: {error.message}
//         </p>
//       </div>
//     );
//   return (
//     <main className="px-4 md:px-8 lg:px-16 py-8">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {data?.blogs.length === 0 ? (
//           <p className="text-center text-gray-500 col-span-full">
//             No blogs found.
//           </p>
//         ) : (
//           data?.blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
//         )}
//       </div>
//       <div className="flex items-center justify-center mt-10 gap-4">
//         <button
//           className={`px-4 py-2 bg-black text-white rounded-2xl ${
//             data?.hasPrevPage ? "bg-black" : "bg-black/30 cursor-not-allowed"
//           }`}
//           onClick={() => setPage((prev) => prev - 1)}
//           disabled={!data?.hasPrevPage}
//         >
//           Previous
//         </button>
//         <span>
//           Page {page} of {data?.totalPages}
//         </span>
//         <button
//           className={`px-4 py-2 bg-black text-white rounded-2xl ${
//             data?.hasNextPage ? "bg-black" : "bg-black/30 cursor-not-allowed"
//           }`}
//           onClick={() => setPage((prev) => prev + 1)}
//           disabled={!data?.hasNextPage}
//         >
//           Next
//         </button>
//       </div>
//     </main>
//   );
// };
// export default Home;


import { useQuery } from "@tanstack/react-query";
import { getAllBlogs } from "../api/blogs";
import { useState } from "react";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [page, setPage] = useState(1);
  const limit = 6; // Changed to 6 for better grid symmetry (2x3 or 3x2)

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["all-blogs", page],
    queryFn: () => getAllBlogs({ page, limit }),
  });

  // 1. Better Loading State (Skeleton Effect)
  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="h-10 w-48 bg-gray-200 rounded-full animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-100 rounded-3xl animate-pulse" />
        ))}
      </div>
    </div>
  );

  if (isError) return (
    <div className="flex flex-col justify-center items-center h-[60vh] text-center px-4">
      <div className="bg-red-50 p-6 rounded-full mb-4">⚠️</div>
      <h2 className="text-xl font-bold text-gray-800">Oops! Something went wrong</h2>
      <p className="text-gray-500 max-w-xs mt-2">{error.message}</p>
      <button onClick={() => window.location.reload()} className="mt-6 text-amber-600 font-bold underline">Try Again</button>
    </div>
  );

  return (

    
    <main className="min-h-screen bg-white">
      {/* 2. Hero Section */}

      <header className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-6 flex justify-between items-center">
  <div className="flex items-center gap-2">
    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg shadow-amber-200">
      🥘 
    </div>
    <span className="text-xl font-black text-gray-900 tracking-tight">BLOGS<span className="text-amber-500">APP</span></span>
  </div>
  
  {/* Profile Link/Avatar */}
  <Link to="/my-blogs" className="w-10 h-10 rounded-full border-2 border-amber-100 p-0.5 hover:border-amber-500 transition-all">
    <img 
      src="https://ui-avatars.com/api/?name=User&background=f59e0b&color=fff" 
      alt="Profile" 
      className="rounded-full"
    />
  </Link>
</header>
      <section className="bg-amber-50 py-16 px-4 md:px-8 lg:px-16 mb-12">
        <div className="max-w-7xl mx-auto">
          <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">Community Favorites</span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-4">
            Discover & Share <br /> <span className="text-amber-500">Delicious Stories.</span>
          </h1>
          <p className="text-gray-600 max-w-lg text-lg">
            Explore the latest blogs, Life hacks, and Lifestyle adventures from our community.
          </p>
        </div>
      </section>

      {/* 3. Blogs Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Latest Blogs</h2>
          <div className="h-1 w-12 bg-amber-500 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data?.blogs.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-2xl text-gray-300 font-bold">No Blog found yet.</p>
              <p className="text-gray-400">Be the first to share your Blogs!</p>
            </div>
          ) : (
            data?.blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          )}
        </div>

        {/* 4. Styled Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-center mt-20 gap-6">
            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                data?.hasPrevPage 
                ? "bg-white border-2 border-gray-200 text-gray-700 hover:border-amber-500 hover:text-amber-500" 
                : "text-gray-300 border-2 border-gray-100 cursor-not-allowed"
              }`}
              onClick={() => { setPage((p) => p - 1); window.scrollTo(0, 0); }}
              disabled={!data?.hasPrevPage}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="h-8 w-8 flex items-center justify-center bg-amber-500 text-white rounded-lg font-bold shadow-lg shadow-amber-200">
                {page}
              </span>
              <span className="text-gray-400 font-medium">of {data?.totalPages}</span>
            </div>

            <button
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                data?.hasNextPage 
                ? "bg-gray-900 text-white hover:bg-amber-600 shadow-xl shadow-gray-200" 
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
              onClick={() => { setPage((p) => p + 1); window.scrollTo(0, 0); }}
              disabled={!data?.hasNextPage}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;