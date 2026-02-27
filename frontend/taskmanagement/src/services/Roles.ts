import axiosinstance from "./api";

export const createRole=async (data:{role:string})=>{
    const res=await axiosinstance.post('/role/create-role',data)
    return res.data
}
export const display_role=async()=>{
    const res=await axiosinstance.get('/role/role-list')
    return res.data
}
