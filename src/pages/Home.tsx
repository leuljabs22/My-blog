import { useQuery } from "@tanstack/react-query";
import { getAllBlogs, type GetAllBlogsResponse } from "../api/blogs";
import { useState } from "react";
import { Button } from "../components/ui/button";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, isError, error } = useQuery<GetAllBlogsResponse>({
    queryFn: () => getAllBlogs({ page, limit }),
    queryKey: ["all-blogs", page],
  });

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? (
          <p>Loading blogs...</p>
        ) : data?.blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          data?.blogs.map((blog) => <BlogCard blog={blog} key={blog._id} />)
        )}
      </main>
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2  mt-10 flex items-center gap-4 justify-center">
        <Button
          disabled={!data?.hasPrevPage}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </Button>
        <span>
          {page} of {data?.totalPages}
        </span>
        <Button
          disabled={!data?.hasNextPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Home;
