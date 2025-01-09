import { api } from "@/lib/axios";
import { User } from "@/types/auth/user";
import { LoginType } from "@/validators/auth/login-validator";

interface LoginResponse {
  token: string;
  user: User;
}

export const loginApiHandler = async (
  body: LoginType
): Promise<LoginResponse> => {
  const { data } = await api.post("/login", body);
  const { token, user } = data.data;

  return { token, user };
};
