import { api } from "../lib/axios";

export interface Blog {
  _id: string;
  title: string;
  content: string;
  category: string;
  author: {
    _id: string;
    email: string;
    firstName?: string;
  };
  createdAt: string;
  likes: string[];
}

export interface GetAllBlogsResponse {
  blogs: Blog[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
interface GetAllBlogsParams {
  page: number;
  limit: number;
}

export const getAllBlogs = async ({ page, limit }: GetAllBlogsParams) => {
  const res = await api.get<GetAllBlogsResponse>(`/blogs`, {
    params: { page, limit },
  });
  return res.data;
};

export const getMyBlogs = async (token: string) => {
  const res = await api.get<Blog[]>(`/blogs/my-blogs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
interface CreateBlogPayload {
  payload: { title: string; content: string; category: string};
  token: string;
}

interface CreateBlogResponse {
  message: string;
  blog: Blog;
}

export const createBlog = async ({
  payload,
  token,
}: CreateBlogPayload): Promise<CreateBlogResponse> => {
  const res = await api.post<CreateBlogResponse>("/blogs", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
interface LikeBlogPayload {
  blogId: string;
  token: string;
  hasLiked: boolean;
}

interface LikeBlogResponse {
  message: string;
  blog: Blog;
}

export const toggleLike = async ({
  blogId,
  token,
  hasLiked,
}: LikeBlogPayload): Promise<LikeBlogResponse> => {
  const endpoint = hasLiked
    ? `/blogs/${blogId}/unlike`
    : `/blogs/${blogId}/like`;

  const res = await api.post<LikeBlogResponse>(endpoint, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
