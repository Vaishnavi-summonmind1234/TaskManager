import axios, {  AxiosInstance } from "axios"


const Base_api_url = process.env.NEXT_PUBLIC_API_URL

const axiosinstance:AxiosInstance=axios.create({
    baseURL:Base_api_url,
    // headers:{
    //     'content-type':"application/json"
    // }
})

axiosinstance.interceptors.request.use(
  (config)=>{
    const token =localStorage.getItem("access_token")
    if (token){
        config.headers.Authorization=`Bearer ${token}`
    }return config

  }
);

export default axiosinstance;