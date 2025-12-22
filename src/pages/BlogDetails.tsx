import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    email: string;
    firstName?: string;
  };
  createdAt: string;
  likes: string[];
}

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/blogs/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) return <p className="p-10">Loading blog...</p>;
  if (!blog) return <p className="p-10">Blog not found.</p>;

  return (
    <div className="min-h-screen bg-amber-100 p-10 flex flex-col items-center">
      <Link to="/" className="mb-4 text-blue-600 underline">
        ← Back to all blogs
      </Link>

      <div className="w-full max-w-3xl">
        <div className="bg-white p-6 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <p className="text-sm text-gray-600 mb-4">
            By {blog.author?.firstName || blog.author?.email} |{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <p className="mb-4">{blog.content}</p>
          <div className="flex items-center gap-2 text-red-700">
            <Heart /> {blog.likes?.length || 0} likes
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
