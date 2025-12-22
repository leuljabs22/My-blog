import { api } from "../lib/axios";

interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
  accessToken: string;
  message?: string;
}

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/signin", payload);
  return res.data;
};
