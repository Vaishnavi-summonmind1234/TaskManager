import axiosinstance from "./api";

export const addAttachment = async(data:{id:number,file:File})=>{
        console.log("Adding attachment for task ID:", data);
        const formData = new FormData()
        formData.append('task_id',data.id.toString())
        formData.append('file',data.file)
        const res =await axiosinstance.post(`/attachment/tasks/${data.id}/attachment`,formData)
        return  res.data
}
export const getAttachment =async(id:number)=>{
    const res=await axiosinstance.get(`/attachment/tasks/${id}/get_all_attach`)
    return  res.data
}
export const deleteAttachment=async(id:number)=>{
    const res=await axiosinstance.delete(`/attachment/tasks/${id}/delete-attach`)
    return res.data
}