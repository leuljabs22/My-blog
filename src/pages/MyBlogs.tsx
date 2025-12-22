import { useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { createBlog, getMyBlogs } from "../api/blogs";
import { Button } from "../components/ui/button";
import { queryClient } from "../main";
import BlogCard from "../components/BlogCard";
import { useAuthStore } from "../store/AuthStore";

const MyBlogs = () => {
  const { token } =  useAuthStore();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getMyBlogs(token!),
    queryKey: ["my-blogs"],
  });

  const addBlog = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      setTitle("");
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["my-blogs"] });
    },
  });

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <div>
      <div className="bg-gray-100 p-4 my-4 max-w-2xl space-y-4 ">
        <h3>Create a blog</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="bg-white w-1/2 px-4 py-2 rounder-sm "
        />{" "}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter Content"
          className="bg-white w-full  mt-2 block px-4 py-2 rounder-sm "
        />
        <Button
          onClick={() => {
            if (!token) return;

            addBlog.mutate({
              payload: {
                title,
                content,
              },
              token,
            });
          }}
        >
          Create
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? (
          <p>Loading your blogs...</p>
        ) : data?.length === 0 ? (
          <p>You haven't created any Blogs yet.</p>
        ) : (
          data?.map((blog) => <BlogCard blog={blog} key={blog._id} />)
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
