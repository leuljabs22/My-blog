import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createBlog, getMyBlogs, type Blog } from "../api/blogs";
import { Button } from "../components/ui/button";
import { queryClient } from "../main";
import BlogCard from "../components/BlogCard";
import { useAuthStore } from "../store/AuthStore";
import { AxiosError } from "axios";
import { PlusCircle, BookOpen, Layout, Hash } from "lucide-react";

const MyBlogs = () => {
  const { token } = useAuthStore();

  // 1. All necessary states
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General"); // Fixed: Category state added

  // 2. Fetching User's Blogs
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getMyBlogs(token!),
    queryKey: ["my-blogs"],
    enabled: !!token,
  });

  // 3. Mutation with proper error handling and state reset
  const addBlog = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      setTitle("");
      setContent("");
      setCategory("General");
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-10 bg-white rounded-3xl shadow-xl border border-red-100">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-black text-gray-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-500 mb-6">{error.message}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* --- DASHBOARD HEADER --- */}
      <header className="bg-white border-b border-slate-100 px-4 md:px-16 py-6 mb-12 sticky top-0 z-50 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
              <Layout size={20} strokeWidth={3} />
            </div>
            <div>
              <h1 className="font-black text-slate-900 text-lg leading-none">
                Creator Studio
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Manage your content
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">
                Verified Author
              </p>
              <p className="text-sm font-black text-slate-900">Dashboard</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-white shadow-sm overflow-hidden p-0.5">
              <img
                src={`https://ui-avatars.com/api/?name=User&background=f59e0b&color=fff&bold=true`}
                alt="avatar"
                className="rounded-xl w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* --- LEFT SIDE: CREATE BLOG FORM --- */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 sticky top-28">
              <div className="flex items-center gap-2 mb-6">
                <PlusCircle className="text-amber-500" size={24} />
                <h2 className="text-2xl font-black text-slate-900">
                  New Story
                </h2>
              </div>

              <div className="space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1"
                  >
                    Blog Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Capture attention..."
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-amber-500 transition-all outline-none font-bold text-slate-700 placeholder:text-slate-300"
                  />
                </div>

                {/* Category Select */}
                <div className="relative space-y-2">
                  <label
                    htmlFor="blog-category"
                    className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1"
                  >
                    Select Category
                  </label>
                  <div className="relative">
                    <Hash
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500"
                      size={16}
                    />
                    <select
                      id="blog-category"
                      aria-label="Blog Category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full pl-11 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-amber-500 transition-all outline-none appearance-none font-bold text-slate-700 cursor-pointer"
                    >
                      //<option value="Technology">Technology</option>
                      <option value="Lifestyle">Lifestyle</option>
                      // <option value="Business">Education</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>

                {/* Content Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="content"
                    className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your Blog"
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-amber-500 transition-all outline-none resize-none font-medium text-slate-600 leading-relaxed"
                  />
                </div>

                <Button
                  className="w-full py-7 rounded-2xl bg-slate-900 hover:bg-amber-600 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                  disabled={addBlog.isPending || !title || !content}
                  onClick={() => {
                    if (!token) return;
                    addBlog.mutate({
                      payload: { title, content, category }, // Fixed: Includes category now
                      token,
                    });
                  }}
                >
                  {addBlog.isPending ? "Publishing..." : "Publish Blog"}
                </Button>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: PUBLISHED LIST --- */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <BookOpen className="text-slate-400" />
                <h3 className="text-xl font-black text-slate-900">
                  Your Archive
                </h3>
              </div>
              <span className="bg-white border border-slate-200 text-slate-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-sm">
                {data?.length || 0} Total Posts
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {isLoading ? (
                [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-72 bg-white border border-slate-100 rounded-[32px] p-6 space-y-4 animate-pulse"
                  >
                    <div className="w-1/3 h-4 bg-slate-100 rounded-full" />
                    <div className="w-full h-8 bg-slate-200 rounded-xl" />
                    <div className="w-full h-24 bg-slate-50 rounded-2xl" />
                  </div>
                ))
              ) : data?.length === 0 ? (
                <div className="col-span-full py-32 text-center bg-white rounded-[40px] border-4 border-dashed border-slate-100 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                    <PlusCircle size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Your library is empty
                  </h4>
                  <p className="text-slate-400 text-sm mt-1">
                    Start writing your first masterpiece.
                  </p>
                </div>
              ) : (
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
