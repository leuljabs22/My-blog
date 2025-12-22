import { toggleLike, type Blog } from "../api/blogs";
import { Heart } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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
  return (
    <Card className="w-full">
      <CardHeader>
        <Link to={`/blogs/${blog._id}`}>
          <CardTitle>{blog.title}</CardTitle>
        </Link>
        <CardDescription>
          By {blog.author?.firstName || blog.author?.email}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <p>{blog.content}</p>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        <CardAction
          onClick={() => {
            if (!token || !user) return;

            const hasLikedBlog = blog.likes.includes(user.id);

            toggleLikeBlog.mutate({
              blogId: blog._id,
              token,
              hasLiked: hasLikedBlog,
            });
          }}
          className="flex items-center gap-1"
        >
          <Heart
            fill={
              user && Array.isArray(blog.likes) && blog.likes.includes(user?.id)
                ? "red"
                : "gray"
            }
            className="text-red-700"
          />{" "}
          {blog.likes?.length || 0}
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
