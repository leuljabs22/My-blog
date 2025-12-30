// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { Heart } from "lucide-react";

// interface Blog {
//   _id: string;
//   title: string;
//   content: string;
//   author: {
//     email: string;
//     firstName?: string;
//   };
//   createdAt: string;
//   likes: string[];
// }

// const BlogDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BASE_URL}/blogs/${id}`);
//         const data = await res.json();
//         setBlog(data);
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchBlog();
//   }, [id]);

//   if (loading) return <p className="p-10">Loading blog...</p>;
//   if (!blog) return <p className="p-10">Blog not found.</p>;

//   return (
//     <div className="min-h-screen bg-amber-100 p-10 flex flex-col items-center">
//       {/* <Link to="/" className="mb-4 text-blue-600 underline">
//         ← Back to all blogs
//       </Link> */}

// <Link 
//   to="/" 
//   className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors mb-6"
// >
//   <span className="text-amber-500 mr-1">/</span> 
//   Back to all blogs
// </Link>
//       <div className="w-full max-w-3xl">
//         <div className="bg-white p-6 rounded shadow-md">
//           <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
//           <p className="text-sm text-gray-600 mb-4">
//             By {blog.author?.firstName || blog.author?.email} |{" "}
//             {new Date(blog.createdAt).toLocaleDateString()}
//           </p>
//           <p className="mb-4">{blog.content}</p>
//           <div className="flex items-center gap-2 text-red-700">
//             <Heart /> {blog.likes?.length || 0} likes
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogDetails;






import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Calendar, User, ChevronLeft, Share2 } from "lucide-react";
import BlogCard from "../components/BlogCard"; // Assuming you have this component

interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: {
    _id:string;
    email: string;
    firstName?: string;
  };
  createdAt: string;
  likes: string[];
}

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [similarBlogs, setSimilarBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch current blog
        const blogRes = await fetch(`${import.meta.env.VITE_BASE_URL}/blogs/${id}`);
        const blogData = await blogRes.json();
        setBlog(blogData);

        // 2. Fetch all blogs to filter for "Similar" (limit to 4 to filter out current)
        const allRes = await fetch(`${import.meta.env.VITE_BASE_URL}/blogs?limit=4`);
        const allData = await allRes.json();
        
        // Filter out the current blog from the list
        const filtered = allData.blogs?.filter((b: Blog) => b._id !== id).slice(0, 3);
        setSimilarBlogs(filtered || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
    window.scrollTo(0, 0); // Reset scroll position when ID changes
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (!blog) return <p className="p-10 text-center">Blog not found.</p>;

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-amber-100">
      {/* Navigation Header */}
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-amber-600 transition-all group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Feed
        </Link>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        <article className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
          {/* Article Header */}
          <div className="p-8 md:p-16 pb-0">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
              Published Article
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-6 leading-tight tracking-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mt-10 pb-10 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <User size={18} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Written By</p>
                  <p className="text-sm font-bold text-slate-900">{blog.author?.firstName || blog.author?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <Calendar size={18} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Date</p>
                  <p className="text-sm font-bold text-slate-900">{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-8 md:p-16 pt-10">
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-serif whitespace-pre-line">
              {blog.content}
            </p>
          </div>

          {/* Article Footer Actions */}
          <div className="px-8 md:px-16 py-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:border-red-500 hover:text-red-500 transition-all">
                <Heart size={20} className={blog.likes?.length > 0 ? "fill-red-500 text-red-500" : ""} />
                <span className="font-bold text-sm">{blog.likes?.length || 0}</span>
              </button>
              <button 
  type="button" // Fixes the missing type attribute error
  onClick={() => {
    // Optional: Add basic share functionality
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  }}
  className="p-2.5 bg-white border border-slate-200 rounded-full hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 text-slate-500 transition-all active:scale-90 shadow-sm"
  title="Share this blog"
>
  <Share2 size={20} />
</button>
            </div>
            <p className="text-xs font-bold text-slate-400 italic">Thank you for reading.</p>
          </div>
        </article>
      </main>

      {/* 🧩 Similar Blogs Section */}
      <section className="bg-white border-t border-slate-100 pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-amber-500 font-black text-xs uppercase tracking-[0.3em]">Discovery</span>
              <h2 className="text-3xl font-black text-slate-900 mt-2">Recommended Stories</h2>
            </div>
            <Link to="/" className="text-sm font-bold text-slate-400 hover:text-amber-600 flex items-center gap-2">
              View Feed <ChevronLeft size={16} className="rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {similarBlogs.length > 0 ? (
              similarBlogs.map((sBlog) => (
                <BlogCard key={sBlog._id} blog={sBlog} />
              ))
            ) : (
              <p className="text-slate-400 italic">No similar stories found at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetails;