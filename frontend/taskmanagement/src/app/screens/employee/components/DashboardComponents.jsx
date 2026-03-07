"use client"
import React,{useEffect,useState} from "react"
import { useRouter } from "next/navigation";
import {Check,ClipboardClock,Bug,NotebookPen,View } from "lucide-react"
import { userAllTasks } from "@/services/task_services";
import { useUser } from "@/app/contexts/userContext"
import { ActivityTimeLines } from "@/app/components/ActivityTimeLines"
import TopLoader from "@/app/components/loader";
export default function DashboardComonents(){
    const {userDetailContext} = useUser();
    const id = userDetailContext.id
    const [tasks,setTasks] = useState([]);
    const [loading ,setLoading] = useState(false)
    const [taskStatus, setTaskStatus] = useState({
  todo: 0,
  doing: 0,
  testing: 0,
  managerReview: 0,
  completed: 0,
});

    const router = useRouter();
    
    console.log(userDetailContext);

    
useEffect(() => {
  const fetchTask = async () => {
    try {
      setLoading(true);
      const response = await userAllTasks(id);
      setTasks(response);

      const statusCount = {
        todo: 0,
        doing: 0,
        testing: 0,
        managerReview: 0,
        completed: 0,
      };

      response.forEach((task) => {
        if (task.status === "todo") statusCount.todo++;
        if (task.status === "doing") statusCount.doing++;
        if (task.status === "testing") statusCount.testing++;
        if (task.status === "manager_review") statusCount.managerReview++;
        if (task.status === "done") statusCount.completed++;
      });

      setTaskStatus(statusCount);

      console.log("Tasks in employee dashboard:", response);

      setLoading(false);
    } catch (error) {
      console.log("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  fetchTask();
}, [userDetailContext]);
    return(
        <div className="mt-5 flex flex-col gap-5">
          {loading && <TopLoader/>}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Completed */}
          <button className="flex flex-col justify-center w-full h-36 bg-indigo-500 rounded-2xl shadow-lg hover:scale-105 hover:bg-indigo-600 transition-all duration-300 text-white p-4">
            <Check
              className="w-8 h-8 mb-3 bg-white rounded-lg p-1"
              color="green"
              strokeWidth={2}
            />
            <h2 className="text-3xl font-bold leading-none">{taskStatus.completed}</h2>
            <p className="text-sm mt-1 text-indigo-100">Completed</p>
          </button>
  
          {/* Pending */}
          <button className="flex flex-col justify-center w-full h-36 bg-yellow-500 rounded-2xl shadow-lg hover:scale-105 hover:bg-yellow-600 transition-all duration-300 text-white p-4">
            <ClipboardClock
              className="w-8 h-8 mb-3 bg-white rounded-lg p-1"
              color="orange"
              strokeWidth={2}
            />
            <h2 className="text-3xl font-bold leading-none">{taskStatus.doing}</h2>
            <p className="text-sm mt-1 text-yellow-100">Pending</p>
          </button>       
  
          {/* Testing */}
          <button className="flex flex-col justify-center w-full h-36 bg-pink-500 rounded-2xl shadow-lg hover:scale-105 hover:bg-pink-600 transition-all duration-300 text-white p-4">
            <Bug
              className="w-8 h-8 mb-3 bg-white rounded-lg p-1"
              color="red"
              strokeWidth={2}
            />
            <h2 className="text-3xl font-bold leading-none">{taskStatus.testing}</h2>
            <p className="text-sm mt-1 text-pink-100">Testing</p>
          </button>
  
          {/* manager Review */}
        <button className="flex flex-col justify-center w-full h-36 bg-orange-500 rounded-2xl shadow-lg hover:scale-105 hover:bg-orange-600 transition-all duration-300 text-white p-4">
            <View
              className="w-8 h-8 mb-3 bg-white rounded-lg p-1"
              color="blue"
              strokeWidth={2}
            />
            <h2 className="text-3xl font-bold leading-none">{taskStatus.managerReview}</h2>
            <p className="text-sm mt-1 text-yellow-100">Manager Review</p>
          </button>
  
          <button className="flex flex-col justify-center w-full h-36 bg-red-500 rounded-2xl shadow-lg hover:scale-105 hover:bg-red-600 transition-all duration-300 text-white p-4">
            <NotebookPen 
              className="w-8 h-8 mb-3 bg-white rounded-lg p-1"
              color="red"
              strokeWidth={2}
            />
            <h2 className="text-3xl font-bold leading-none">{taskStatus.todo}</h2>
            <p className="text-sm mt-1 text-yellow-100">Todo</p>
          </button>
  
        </div>

  <div className="sm:flex flex-col lg:flex-row gap-4 items-start ">
          {/* Recent Tasks */}
  
          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg flex-1 min-w-0 ">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-white text-xl font-semibold">Recent Tasks</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-700/60 backdrop-blur rounded-2xl p-3 hover:bg-gray-700 transition-all duration-300 border border-gray-600/40 h-full"
                  onClick={() => router.push(`/screens/employee/task/${task.id}`)}
                >
                  {/* Top Section */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-yellow-500/90 text-xs text-white px-3 py-1 rounded-full">
                    {task.estimate_time} {"Hour Left"}
                  </span>
  
                    <span className="px-3 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
                      {task.priority}
                    </span>
                  </div>
  
                  {/* Title */}
                  <h2 className="text-white text-sm font-semibold mb-2 leading-snug">
                    {task.title}
                  </h2>                
  
                  {/* Progress */}
                  <div>
                  {/* <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Progress</span>
                    <span className="text-gray-200 font-medium">{task.completion_percentage}{"%"}</span>
                  </div> */}
  
                  <div className="mb-3">
    <div className="flex justify-between text-xs text-gray-400 mb-2">
      <span>Progress</span>
      <span className="text-gray-200 font-medium">
        {task.completion_percentage}%
      </span>
    </div>
  
    <div className="w-full bg-gray-800 rounded-full h-2">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${task.completion_percentage}%` }}
      ></div>
    </div>
  </div>
                </div>
                {/* Assigned */}
                  <div className="flex items-center text-sm text-gray-400 mb-1">
                    <span>Assigned By:</span>
                    <span className="ml-2 text-gray-200 font-medium">
                      {task.assigned_by_name}
                    </span>
                  </div>
                </div>
              ))}
              {/* Grid */}
  
              {/* Task Card */}
              
            </div>
          </div>
  
          <div className=" not-xl:my-4 bg-gray-800 rounded-xl p-4 shadow-lg w-full lg:w-1/3 max-h-100 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent ">
            <ActivityTimeLines />
          </div>
        </div>
  

</div>

    )
}