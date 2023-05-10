import Api from "./api";

const baseUrl = "/auth";

async function login(email: string, password: string): Promise<string> {
  return Api.post(baseUrl, { email, password }).then((res) => res.data.token);
}

export const authService = { login };
