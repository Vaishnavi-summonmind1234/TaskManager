import axiosinstance from "./api";


export const assign = async (
  taskId: number,
  userIds: number[]
) => {
  const res = await axiosinstance.post(
    `/task/${taskId}/assign`,
    { user_ids: userIds }   // 👈 this must match backend schema
  );
  return res.data;
};

export const getassignees=async(id:number)=>{
    const res=await axiosinstance.get(`/task/${id}/assignees`)
    return res.data
}
export const delete_assigne=async(user_id:number,task_id:number)=>{
    const res=await axiosinstance.delete(`/task/${task_id}/assigned/${user_id}`)
    return res
}