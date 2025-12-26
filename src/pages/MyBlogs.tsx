// import { useState } from "react";

// import { useMutation, useQuery } from "@tanstack/react-query";
// import { createBlog, getMyBlogs } from "../api/blogs";
// import { Button } from "../components/ui/button";
// import { queryClient } from "../main";
// import BlogCard from "../components/BlogCard";
// import { useAuthStore } from "../store/AuthStore";

// const MyBlogs = () => {
//   const { token } =  useAuthStore();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const { data, isLoading, isError, error } = useQuery({
//     queryFn: () => getMyBlogs(token!),
//     queryKey: ["my-blogs"],
//   });

//   const addBlog = useMutation({
//     mutationFn: createBlog,
//     onSuccess: () => {
//       setTitle("");
//       setContent("");
//       queryClient.invalidateQueries({ queryKey: ["my-blogs"] });
//     },
//   });

//   if (isError) {
//     return <div>{error.message}</div>;
//   }
//   return (
//     <div>
//       <div className="bg-gray-100 p-4 my-4 max-w-2xl space-y-4 ">
//         <h3>Create a blog</h3>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Enter title"
//           className="bg-white w-1/2 px-4 py-2 rounder-sm "
//         />{" "}
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Enter Content"
//           className="bg-white w-full  mt-2 block px-4 py-2 rounder-sm "
//         />
//         <Button
//           onClick={() => {
//             if (!token) return;

//             addBlog.mutate({
//               payload: {
//                 title,
//                 content,
//               },
//               token,
//             });
//           }}
//         >
//           Create
//         </Button>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {isLoading ? (
//           <p>Loading your blogs...</p>
//         ) : data?.length === 0 ? (
//           <p>You haven't created any Blogs yet.</p>
//         ) : (
//           data?.map((blog) => <BlogCard blog={blog} key={blog._id} />)
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyBlogs;

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createBlog, getMyBlogs, type Blog } from "../api/blogs";
import { Button } from "../components/ui/button";
import { queryClient } from "../main";
import BlogCard from "../components/BlogCard";
import { useAuthStore } from "../store/AuthStore";
import { AxiosError } from "axios";
const MyBlogs = () => {
  const { token } = useAuthStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getMyBlogs(token!),
    queryKey: ["my-blogs"],
    enabled: !!token,
  });

  const addBlog = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      setTitle("");
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["my-blogs"] });
      alert("🎉 Blog published successfully!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Publish Error:", error);
      const serverMessage = error.response?.data?.message || error.message;
      alert(`Publishing Failed: ${serverMessage}`);
    },
  });

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        <p className="font-bold">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <header className="bg-white border-b border-gray-100 px-4 md:px-16 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white text-lg">
              🥘
            </div>
            <span className="font-black text-gray-900 tracking-tight">
              MyBlogs
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-gray-400 uppercase">
                Author Dashboard
              </p>
              <p className="text-sm font-bold text-gray-900">Your Blog</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-white shadow-sm overflow-hidden">
              <img
                src="https://ui-avatars.com/api/?name=User&background=f59e0b&color=fff"
                alt="avatar"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* 2. Create Blog Section (Left/Top) */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                New Blog
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Share your latest Blogs with the world.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Grandma's Secret Pasta"
                    className="w-full mt-1 px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                    Blog Content
                  </label>
                  <textarea
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="e.g. Your original ideas as a content..."
                    className="w-full mt-1 px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 transition-all outline-none resize-none"
                  />
                </div>
              


<div className="relative pt-3">
  <span className="absolute -top-1 left-4 px-2 bg-white text-[10px] font-black uppercase tracking-widest text-amber-600 z-10">
    Category
  </span>
  <select 
    id="blog-category"
    aria-label="Category"
    className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-amber-500 transition-colors outline-none"
 
  >
    <option value="Technology">Technology</option>
      <option value="Lifestyle">Lifestyle</option>
      <option value="Business">Business</option>
      <option value="General">General</option>
  </select>
</div>

                <Button
                  className="w-full py-6 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-lg shadow-amber-200 transition-all active:scale-95"
                  disabled={addBlog.isPending || !title || !content}
                  onClick={() => {
                    if (!token) return;
                    addBlog.mutate({
                      payload: { title, content },
                      token,
                    });
                  }}
                >
                  {addBlog.isPending ? "Publishing..." : "Publish Blog"}
                </Button>
              </div>
            </div>
          </div>

          {/* 3. My Blogs List Section (Right/Bottom) */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Your Published Works
              </h3>
              <span className="bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">
                {data?.length || 0} Posts
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {isLoading ? (
                [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 bg-gray-200 animate-pulse rounded-3xl"
                  />
                ))
              ) : data?.length === 0 ? (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-400 font-medium">
                    No Blogs yet. Start Writing!
                  </p>
                </div>
              ) : (
                data &&
                data?.map((blog: Blog) => (
                  <BlogCard blog={blog} key={blog._id} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyBlogs;
