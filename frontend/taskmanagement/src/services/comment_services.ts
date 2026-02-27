import axiosinstance from "./api";

export const addComment=async( id:number,data:{
    
  comment: string,
  parent_id: number
})=>{
    const res=await axiosinstance.post(`/comment/tasks/${id}/comment`,data)
    return res.data
}
export const getAllComment=async(id:number)=>{
    const res=await axiosinstance.get(`/comment/task/${id}/getallcoment`)
    return res.data
}

export const updadeComments= async (id:number,data:{comment:string})=>{
    const res=await axiosinstance.put(`/comment/updatecomments/${id}`,data)
    return res.data

}
export const deleteComments=async(id:number)=>{
    const res=await axiosinstance.delete(`/comment/delete-comment/${id}`)
    return res.data
}