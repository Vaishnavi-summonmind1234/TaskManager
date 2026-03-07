"use client";

import { useState,useEffect } from "react";
import RichTextEditor from "@/app/components/RichTextEditer";
import AddForm from "@/app/components/AddForm";
import { useParams } from "next/navigation";
import { Menu } from "lucide-react";
import { useUser } from "@/app/contexts/userContext";
import { useRouter } from "next/navigation";
import { userAllTasks,get_taskby_id } from "@/services/task_services";
import { getAttachment } from "@/services/attachment_services";
import { status_update } from "@/services/task_services";
import { getassignees } from "@/services/assignServices";
import TopLoader from "@/app/components/loader";
export default function TaskPage(){
  const router = useRouter();
  const params = useParams();
  const taskId = Number(params.id);
  const {userDetailContext} = useUser();
  const [loading, setLoading] = useState(true);  
  const id = userDetailContext.id
  console.log("user id:",id)
  console.log("task_id:",taskId)
  const [updateStatus,setUpdateStatus] = useState(false)
  const [openSidebar , setOpensidebar] = useState(true)
  const [refreshPage, setRefreshPage] = useState(0);

const [status, setStatus] = useState("");
const [errors, setErrors] = useState({});
const [attachments, setAttachments] = useState([]);
const [allTask, setAllTask] = useState([]);
const [individualTask, setIndividualTask] = useState({});
// const [taskAssigment,setTaskAssignment] = useState([])
const [content, setContent] = useState("");
const [commentInput, setCommentInput] = useState("");
const [comments, setComments] = useState([]);

const handleRefreshPage = () => {
    setRefreshPage((prev) => prev + 1);
  };

useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [allTask, singleTask] = await Promise.all([
          userAllTasks(id),
          get_taskby_id(taskId),
        ]);

        setAllTask(allTask);
        const formattedTask = {
          id: singleTask[0],
          title: singleTask[1],
          description: singleTask[2],
          status: singleTask[3],
          priority: singleTask[4],
          assigned_by: singleTask[5],
          assigned_by_name:singleTask[14],
          assigned_To_name:singleTask[15],
          start_date: singleTask[6],
          end_date: singleTask[7],
          estimate_time: singleTask[8],
          approach: singleTask[9],
          created_at: singleTask[10],
          updated_at: singleTask[11],
          deleted_at: singleTask[12],
          completion_percentage:singleTask[13]
        };
        // console.log("formated task ", formattedTask);
        setIndividualTask(formattedTask);

        // const response = await getassignees(taskId);
        // console.log("responseL:", response);
        // setTaskAssignment(response);
        // const assignedToIds = response.map((user) => user.user_id);
        // setAssignToList(assignedToIds);
        // console.log("assign this task to : ", assignedToIds);
        console.log("all tasks ", allTask);
        console.log("individual tasks",formattedTask)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Failed to fetch data", error);
      }
    }

    if (taskId) {
      console.log("taskid inside if:",taskId)
      fetchData();
    }
  }, [taskId,id,refreshPage]);

  useEffect(() => {
      async function fetchAttachament() {
        try {
          const response = await getAttachment(taskId);
          setAttachments(response);
          console.log("attachment response:", response);
        } catch (error) {
          console.log("error while geting attachament", error);
        }
      }
      fetchAttachament();
    }, [taskId, refreshPage]);

  const handleSidebar = () => {
      setOpensidebar(!openSidebar)
    }

  const handleCompleteTask = async () => {
      // console.log("marking task as completed with ID:", taskId);
      try {
        const response = await status_update(taskId, { status: "done" });
        console.log("Status update response:", response);
        handleRefreshPage();
        toast.success("Task Completed");
      } catch (error) {
        console.log("Error updating status:", error);
      }
      // Here you would also make an API call to update the task status in the backend
    };

    const handleAddComment = () => {
  if (!commentInput.trim()) return;


  const newComment = {
    id: Date.now(),
    text: commentInput,
    author: "Pankaj Bagauli", // later from logged-in user
    date: new Date().toLocaleString()
  };

  setComments([newComment, ...comments]);
  setCommentInput("");
};

    return(
    <>
        {/* <div className="min-h-screen flex bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-2 sm:p-2"> */}
    
    {/* <div> */}
      <div className="h-screen flex bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      {loading && <TopLoader />}
  {/* LEFT SIDE - TASK LIST */}
  {openSidebar && 
    <div className="h-screen w-[320px] border-r border-gray-700 bg-gray-900 flex flex-col">

      <div className=" flex justify-between p-3 border-b border-gray-700">
        <h2 className="text-white text-lg font-semibold">
          Task List
        </h2>
        <button className=" p-2"
          onClick={() => handleSidebar()}
          >
            <Menu color="white"/>
          </button>
      </div>

      <div className="flex-1 p-4 space-y-4 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {allTask.map((item) => (
                <button
                  key={item.id}
                  className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:bg-gray-700 transition cursor-pointer w-full text-left "
                  onClick={() =>
                    router.push(`/screens/employee/task/${item.id}`)
                  }
                >
                  <div className="flex justify-between items-start mb-3">
                    <h1 className="text-white text-lg font-semibold">
                      {item.title}
                    </h1>
                    

                    <span className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-400 rounded-full">
                      {item.status}
                    </span>
                  </div>

                  <div className="mb-3">
                    <span className="px-3 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
                      {item.priority}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-2">
                    Assigned By: {item.assigned_by_name}
                  </p>

                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{item.completion_percentage}{"%"}</span>
                    </div>

                    <div className="w-full bg-gray-900 rounded-full h-2">
      <div
        className="bg-green-500 h-2 rounded-full transition-all duration-300"
        style={{ width: `${item.completion_percentage}%` }}
      ></div>
    </div>
                  </div>
                </button>
              ))}
            </div>
    </div>
  }

  {/* RIGHT SIDE - TASK DETAILS */}
  <div className="flex-1 overflow-y-auto">

    <div>
    <div className="flex p-4.5 border-b border-gray-700">
      {!openSidebar && 
                <button className="mr-3"
                onClick={() => handleSidebar()}
                >
                  <Menu color="white"/>
                </button>
              }
      <h2 className="text-white text-lg font-semibold">
        Task Detail
      </h2>
    </div>
  <div className="bg-gray-800/80 backdrop-blur-lg shadow-2xl p-5 sm:p-8 border border-gray-700">

    <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

      <div>
                  <div className=" ">
                    <h1 className="text-white text-xl sm:text-xl font-semibold ">
                      {individualTask.title}
                    </h1>
                    <h1 className="text-gray-300 text-xs ">
                      {/* By : {taskAssigment[0]?.assignedBy_name}{" "} */}
                      {new Date(individualTask.created_at).toLocaleDateString()}
                    </h1>
                  </div>

                  <div className="flex gap-4 mt-3 items-center ">
                    <h1 className="text-white text-sm font-semibold ">
                      Priority :{" "}
                    </h1>
                    <span className="px-3 py-1 text-sm text-red-400  ">
                      {individualTask.priority}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-3 items-center ">
                    <h1 className="text-white text-sm font-semibold">
                      Start Date :{" "}
                    </h1>
                    <span className="px-3 py-1 text-sm text-white">
                      {individualTask.start_date}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-3 items-center ">
                    <h1 className="text-white text-sm font-semibold">
                      End Date :
                    </h1>
                    <span className="px-3 py-1 text-sm text-white">
                      {individualTask.end_date}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-3 items-center ">
                    <h1 className="text-white text-sm font-semibold">
                      Estimated Time :{" "}
                    </h1>
                    <span className="px-3 py-1 text-sm text-white">
                      {individualTask.estimate_time} Hour
                    </span>
                  </div>

                  <div className="flex gap-4 mt-3 items-center ">
                    <h1 className="text-white text-sm font-semibold">
                      Status :{" "}
                    </h1>
                    <span className="px-3 py-1 text-sm text-white">
                      {individualTask.status}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-3 items-center ">
                    <h1 className="text-white text-sm font-semibold">
                      Completion Percentage :{" "}
                    </h1>
                    <span className="px-3 py-1 text-sm text-white">
                      {individualTask.completion_percentage}{"%"}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-3 items-center ">
                    <h1 className="text-white text-sm font-semibold">
                      Descriptions :{" "}
                    </h1>
                    <span className="px-3 py-1 text-sm text-white">
                      {individualTask.description}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-3 items-center ">
                    <h1 className="text-white text-sm font-semibold">
                      Approach :{" "}
                    </h1>
                    <span className="px-3 py-1 text-sm text-white">
                      {individualTask.approach}
                    </span>
                  </div>
                </div>

    </div>
 

    <div className="border-t border-gray-700 my-6"></div>

    <div className="flex flex-col sm:flex-row sm:justify-between gap-6">

      <div className="bg-gray-900/60 p-4 rounded-xl flex-1 border border-gray-700">
      <div className="flex">
          <h2 className="text-white text-sm mb-2">Owner : </h2>
          <p className="text-gray-300 text-sm ml-1"> {individualTask.assigned_by_name}</p>
      </div>
      <div className="flex">
          <h2 className="text-white text-sm mb-2">Assigned To : </h2>
          <p className="text-gray-300 text-sm ml-1">  {individualTask.assigned_To_name}</p>
      </div>
        {/* <p className="text-gray-400 text-xs">Frontend Developer</p> */}
      </div>

      <div className="bg-gray-900/60 p-4 rounded-xl flex-1 border border-gray-700">
        <h2 className="text-gray-300 text-sm mb-2">Attachments</h2>
        {attachments.length > 0 ? (
                    attachments.map((item) => (
                      <p
                        key={item.id}
                        className="text-indigo-400 text-sm cursor-pointer hover:underline"
                      >
                        <a
                          href={`http://127.0.0.1:8000${item.file_url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.file_name}
                        </a>
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No attachments</p>
                  )}
      </div>

    </div>

    {/* Action Buttons */}
    <div className="mt-8 flex flex-col sm:flex-row gap-4">

      <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white p-2 w-fit rounded-xl font-medium transition duration-300 shadow-lg"
      onClick={() => handleCompleteTask()}
      >

        Mark as Completed
      </button>

      <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white p-2 w-fit rounded-xl font-medium transition duration-300 shadow-lg" onClick={() => setUpdateStatus(true)}>
        Update Status
      </button>

    </div>

  </div>
        {updateStatus && (
  <div className="mt-6 bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-6 border border-gray-700 shadow-2xl">

    <h2 className="text-white text-lg font-semibold mb-6">
      Update Task Status
    </h2>

    <AddForm 
    id = {individualTask.id}
    role={2} 
    editing={true} 
    handleRefreshPage={handleRefreshPage}
    individualTask={individualTask}
    />

  </div>
)}</div>

  </div>

{/* </div> */}



    {/* </div> */}
  
  

  </div>

    </>    
    )
}