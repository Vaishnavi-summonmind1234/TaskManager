import axiosinstance from "./api";

export const addTask=async(data:
    {
  title: string,
  description: string,
  status: string,
  priority: string,
  assigned_by:number,
  start_date: string,
  end_date: string,
  estimate_time: number,
  approach: string
})=>{
    console.log("task data:", data);
    const res = await axiosinstance.post("/task/add-tasks", data);
  return res.data;
}
    
export const showTask=async()=>{
    const res=await axiosinstance.get('/task/show-tasks')
    return res.data
}
export const get_taskby_id=async(id:number)=>{
    const res=await axiosinstance.get(`/task/taskby/${id}`)
    return res.data
    
}
export const delete_task= async(id:number)=>{
    const res = await axiosinstance.delete(`/task/delete_task/${id}`)
    return res.data
}

export const task_update=async(id:number,data:{
        
  title: string,
  description: string,
  status: string,
  priority: string,
  assigned_by: number,
  start_date: string,
  end_date: string,
  estimate_time: number,
  approach: string

})=>{
    console.log("values in update service",id,data);
const updateTask=await axiosinstance.put(`task/update/${id}`,data)
   return updateTask.data

}
export const status_update=async(id:number,data:{
    status:string
})=>{
    const res=await axiosinstance.patch(`/task/${id}/status`,data)
    return res.data

}
export const priority_update =async(id:number,data:{
    priority:string
})=>{
    const res =await axiosinstance.put(`/task/${id}/priority`,data)
    return res.data
}