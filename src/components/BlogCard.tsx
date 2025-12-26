// import { toggleLike, type Blog } from "../api/blogs";
// import { Heart } from "lucide-react";

// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../components/ui/card";
// import { Link } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import { queryClient } from "../main";
// import { useAuthStore } from "../store/AuthStore";

// const BlogCard = ({ blog }: { blog: Blog }) => {
//   const { token, user } = useAuthStore();
//   const toggleLikeBlog = useMutation({
//     mutationFn: toggleLike,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["my-blogs"] });
//       queryClient.invalidateQueries({ queryKey: ["all-blogs"] });
//     },
//   });
//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <Link to={`/blogs/${blog._id}`}>
//           <CardTitle>{blog.title}</CardTitle>
//         </Link>
//         <CardDescription>
//           By {blog.author?.firstName || blog.author?.email}
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="flex-1">
//         <p>{blog.content}</p>
//       </CardContent>

//       <CardFooter className="flex justify-between items-center">
//         <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
//         <CardAction
//           onClick={() => {
//             if (!token || !user) return;

//             const hasLikedBlog = blog.likes.includes(user.id);

//             toggleLikeBlog.mutate({
//               blogId: blog._id,
//               token,
//               hasLiked: hasLikedBlog,
//             });
//           }}
//           className="flex items-center gap-1"
//         >
//           <Heart
//             fill={
//               user && Array.isArray(blog.likes) && blog.likes.includes(user?.id)
//                 ? "red"
//                 : "gray"
//             }
//             className="text-red-700"
//           />{" "}
//           {blog.likes?.length || 0}
//         </CardAction>
//       </CardFooter>
//     </Card>
//   );
// };

// export default BlogCard;




import { toggleLike, type Blog } from "../api/blogs";
import { Heart, Calendar, User, ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import { useAuthStore } from "../store/AuthStore";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const { token, user } = useAuthStore();
  
  const toggleLikeBlog = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["all-blogs"] });
    },
  });

  const isLiked = user && Array.isArray(blog.likes) && blog.likes.includes(user.id);

  return (
    <Card className="group flex flex-col h-full bg-white border-slate-200 rounded-[24px] overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="space-y-4 pb-4">
        {/* Category Badge - Aesthetic only or can be dynamic */}
        <div className="flex justify-between items-start">
          <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-wider rounded-full">
            Article
          </span>
        </div>

        <Link to={`/blogs/${blog._id}`} className="block">
          <CardTitle className="text-xl font-black text-slate-800 leading-tight group-hover:text-amber-600 transition-colors line-clamp-2">
            {blog.title}
          </CardTitle>
        </Link>

        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
            <User size={12} />
          </div>
          <span>By {blog.author?.firstName || blog.author?.email.split('@')[0]}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-6">
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
          {blog.content}
        </p>
      </CardContent>

      <div className="px-6">
        <div className="h-px bg-slate-100 w-full" />
      </div>

      <CardFooter className="flex justify-between items-center py-4 px-6 bg-slate-50/50">
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold">
          <Calendar size={14} />
          <span>{new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            if (!token || !user) return;
            toggleLikeBlog.mutate({
              blogId: blog._id,
              token,
              hasLiked: !!isLiked,
            });
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all active:scale-90 ${
            isLiked 
            ? "bg-red-50 text-red-600 shadow-sm shadow-red-100" 
            : "bg-white text-slate-400 hover:text-slate-600 border border-slate-100"
          }`}
        >
          <Heart
            size={16}
            fill={isLiked ? "currentColor" : "none"}
            className={isLiked ? "animate-bounce-short" : ""}
          />
          <span className="text-xs font-black">{blog.likes?.length || 0}</span>
        </button>
      </CardFooter>
      
      {/* Hidden "Read More" that appears on hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Link to={`/blogs/${blog._id}`} className="p-2 bg-slate-900 text-white rounded-full shadow-xl">
           <ArrowRight size={14} />
        </Link>
      </div>
    </Card>
  );
};

export default BlogCard;