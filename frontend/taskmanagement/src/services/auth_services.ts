import axiosinstance from "./api";

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  role_id: number;
}) => {
  console.log("Data sent to register API:", data);
  const res = await axiosinstance.post("/auth/register", data);
  return res.data;
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const res = await axiosinstance.post("/auth/login", data);

 
  localStorage.setItem("access_token", res.data.access_token);

  return res.data;
};

export const getProfile = async () => {
  const res = await axiosinstance.get("/auth/me");
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
};