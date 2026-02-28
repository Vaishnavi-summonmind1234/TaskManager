"use client";

import { useEffect, useState } from "react";
import AddForm from "@/app/components/AddForm";
import { Menu } from "lucide-react";
import { showTask, get_taskby_id,delete_task } from "@/services/task_services";
import { useParams } from "next/navigation";
import { status_update } from "@/services/task_services";
import { useRouter } from "next/navigation";
import TopLoader from "@/app/components/loader";
import toast from "react-hot-toast";

export default function TaskPage() {
  const params = useParams();
  const taskId = params.id;
  console.log("taskId:", taskId);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [openSidebar, setOpensidebar] = useState(true);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    estimatedTime: "",
    completionPercentage: "",
    attachments: [],
    approach: "",
  });
  const [allTask, setAllTask] = useState([]);
  const [individualTask, setIndividualTask] = useState({});
  const [assignToList , setAssignToList] = useState([]);
  const [markAsCompleted, setMarkAsCompleted] = useState(false);
  const [responseMessage,setResponseMessage] = useState("")

  const [content, setContent] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [allTask, singleTask] = await Promise.all([
          showTask(),
          get_taskby_id(taskId),
        ]);

        setAllTask(allTask);
        console.log("allTasks:", allTask);
        const formattedTask = {
          id: singleTask[0],
          title: singleTask[1],
          description: singleTask[2],
          status: singleTask[3],
          priority: singleTask[4],
          assigned_by: singleTask[5],
          start_date: singleTask[6],
          end_date: singleTask[7],
          estimate_time: singleTask[8],
          approach: singleTask[9],
          created_at: singleTask[10],
          updated_at: singleTask[11],
          deleted_at: singleTask[12],
        };
        setIndividualTask(formattedTask);
        console.log("formattedTask:", formattedTask);
        console.log("individualTask:", individualTask);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Failed to fetch data", error);
      }
    }

    if (taskId) {
      fetchData();
    }
  }, [taskId,responseMessage]);

  const handleAddComment = () => {
    if (!commentInput.trim()) return;

    const newComment = {
      id: Date.now(),
      text: commentInput,
      author: "Pankaj Bagauli", // later from logged-in user
      date: new Date().toLocaleString(),
    };

    setComments([newComment, ...comments]);
    setCommentInput("");
  };

  const handleSidebar = () => {
    setOpensidebar(!openSidebar);
  };

  const handleCompleteTask = () => {
    setMarkAsCompleted(true);
    console.log("marking task as completed with ID:", taskId);
    try {
      const response = status_update(taskId, { status: "done" });
      console.log("Status update response:", response);
      setResponseMessage("Task Completed")
      toast.success ("Task Deleted Sucesssfully");
    } catch (error) {
      console.log("Error updating status:", error);
    }  
    // Here you would also make an API call to update the task status in the backend
  };

  const handleDeleteTask = () => {
    console.log("deleting task id ",taskId )
    try{
      setLoading(true);
      const response = delete_task(taskId)
      console.log(response)
      router.replace("/screens/manager")
      setLoading(false)
      setResponseMessage("Task Deleted Sucesssfully")
      toast.success ("Task Deleted Sucesssfully");
    }catch(error){
      setLoading(false);
      console.log('error while deleting task : ',error)
      toast.error('failed to delete Task');
    }
  }
  console.log("individualtask outside function: ",individualTask);

  function handleSubmit(e) {
    console.log(formData);
    e.preventDefault();
    console.log("hello world");
  }
  return (
    <>
      {/* <div className="min-h-screen flex bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-2 sm:p-2"> */}

      {/* <div> */}
      <div className="h-screen flex bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
        {loading && <TopLoader />}
        {/* LEFT SIDE - TASK LIST */}
        {openSidebar && (
          <div className="h-screen w-[320px] border-r border-gray-700 bg-gray-900 flex flex-col">
            <div className="flex justify-between p-3 border-b border-gray-700">
              <h2 className="text-white text-lg font-semibold">Task List</h2>
              <button className=" p-2" onClick={() => handleSidebar()}>
                <Menu color="white" />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {allTask.map((item) => (
                <button
                  key={item.id}
                  className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:bg-gray-700 transition cursor-pointer w-full text-left "
                  onClick={() =>
                    router.push(`/screens/manager/task/${item.id}`)
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
                    Assigned by: {item.assigned_by}
                  </p>

                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>50%</span>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full w-[50%]"></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RIGHT SIDE - TASK DETAILS */}
        <div className="flex-1 overflow-y-auto">
          <div>
            <div className=" flex p-4.5 border-b border-gray-700">
              {!openSidebar && (
                <button className="mr-3" onClick={() => handleSidebar()}>
                  <Menu color="white" />
                </button>
              )}
              <h2 className="text-white text-lg font-semibold">Task Detail</h2>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg shadow-2xl p-5 sm:p-8 border border-gray-700">
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                <div>
                  <h1 className="text-white text-lg sm:text-lg font-semibold">
                    {individualTask.title}
                  </h1>

                  <div className="mt-2 flex items-center gap-4 flex-wrap">
                    <span className="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded-full border border-red-500">
                      {individualTask.priority}
                    </span>

                    <span className="text-gray-400 text-xs">
                      {individualTask.created_at}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-gray-300 font-sm mb-2">{individualTask.status}</h2>
                <h2 className="text-gray-300 font-sm mb-2">Description</h2>
                <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
                  {individualTask.description}
                </p>
              </div>

              <div className="border-t border-gray-700 my-6"></div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
                <div className="bg-gray-900/60 p-4 rounded-xl flex-1 border border-gray-700 flex">
                  <h2 className="text-white text-sm mb-2">Assigned To :</h2>
                  <p className="text-gray-300 text-sm ml-1">
                    {" "}
                    {individualTask.assigned_by}
                  </p>
                  {/* <p className="text-gray-400 text-xs">Frontend Developer</p> */}
                </div>

                <div className="bg-gray-900/60 p-4 rounded-xl flex-1 border border-gray-700 flex">
                  <h2 className="text-gray-300 text-sm mb-2">Attachments : </h2>
                  <p className="text-indigo-400 text-sm cursor-pointer hover:underline ml-1">
                    {individualTask.attachments &&
                    individualTask.attachments.length > 0
                      ? individualTask.attachments.join(", ")
                      : "No attachments"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {individualTask.status !== "done" ?  
                <button
                  className="flex-1  bg-indigo-600 hover:bg-indigo-700 text-white p-2 w-fit rounded-xl font-medium transition duration-300 shadow-lg"
                  onClick={() => handleCompleteTask()}
                >
                  Mark as Completed
                </button>
              : 
                 <div
                  className="flex-1 text-center  bg-green-600 hover:bg-green-700 text-white p-2 w-fit rounded-xl font-medium transition duration-300 shadow-lg"
                >
                  Completed 
                </div>  
              }


                <button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white p-2 w-fit rounded-xl font-medium transition duration-300 shadow-lg"
                  onClick={() => handleDeleteTask()}
                >
                  Delete Task
                </button>

                  {individualTask.status !== "done" ? 
                  <button
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white p-2 w-fit rounded-xl font-medium transition duration-300 shadow-lg "
                    onClick={() => setUpdateStatus(true)}
                  >
                    Edit Tasks
                  </button>  
                :null}
              </div>
            </div>
            {updateStatus && (
              <div className="mt-6 bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-6 sm:p-6 border border-gray-700 shadow-2xl">
                <h2 className="text-white text-lg font-semibold mb-6">
                  Edit Task
                </h2>

                {/* <AddUser /> */}
                <AddForm
                  id={individualTask.id}
                  editing={true}
                  role={1}
                  cancel={false}
                />
                {/* <Form /> */}
              </div>
            )}
          </div>
        </div>

        {/* </div> */}

        {/* </div> */}
      </div>
    </>
  );
}
