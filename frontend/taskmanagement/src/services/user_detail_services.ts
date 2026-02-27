import axiosinstance from "./api";


export const userDetails = async () => {
  const res = await axiosinstance.get("/user/user-details/");
  return res.data;
};


export const userById = async (id: number) => {
  console.log("id in service", id);
  const res = await axiosinstance.get(`/user/userby/${id}`);
  return res.data;
};


export const addUser = async (data: {
  name: string;
  email: string;
  password: string;
  role_id: number;
}) => {
  const res = await axiosinstance.post("/user/add_user", data);
  return res.data;
};


export const updateUser = async (
  id: number,
  data: {
    name: string;
    email: string;
  }
) => {
  console.log("Updating user in service with ID:", id, "and data:", data);
  const res = await axiosinstance.put(`/user/update/${id}`, data);
  return res.data;
};
export const deleteUser = async (id: number) => {
  console.log("Deleting user in service with ID:", id);
  const res = await axiosinstance.delete(`/user/delete_user/${id}`);
  return res.data;
};