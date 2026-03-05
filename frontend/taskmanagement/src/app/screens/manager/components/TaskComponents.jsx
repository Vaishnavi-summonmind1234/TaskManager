"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import CreateTask from "@/app/components/AddTasks";
import { showTask } from "@/services/task_services";
import TopLoader from "@/app/components/loader";

export default function TaskComonents() {
  const [loading, setLoading] = useState(false);
  const [refreshUser, setRefreshUser] = useState(0);
  const router = useRouter();
  const [addTask, setAddTask] = useState(false);
  // const
  const [tasks, setTasks] = useState([]);
  const returnFalse = () => {
    setAddTask(false);
  };
  const handleRefreshPage = () => {
    setRefreshUser((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await showTask();
        setTasks(response);
        console.log("Tasks:", response);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching tasks:", error);
        setLoading(false);
      }
    };
    fetchTask();
  }, [refreshUser]);

  return (
    <div className="flex flex-col bg-gray-800 mt-5 rounded-xl relative">
      {loading && <TopLoader />}
      <h1 className="text-xl sm:text-2xl text-white font-semibold my-3 ml-3">
        New Task
      </h1>

      <div className="flex flex-wrap gap-3 mx-3 mb-2">
        <button
          onClick={() => setAddTask(true)}
          className="px-4 py-2 text-sm  bg-indigo-600 rounded-xl text-white shadow-lg hover:scale-105 hover:bg-indigo-700
      transition-all duration-300 flex gap-2
      "
        >
          Add Tasks
          <Plus height={20} width={20} />
        </button>
      </div>

      <div className="mt-2 bg-gray-800 rounded-xl border border-gray-700">
        {addTask ? (
          <CreateTask
            returnFalse={returnFalse}
            handleRefreshPage={handleRefreshPage}
          />
        ) : null}

        {/* Scroll Container */}
        <div className="max-h-112 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <table className="min-w-full text-sm text-left text-gray-300">
            {/* Table Head */}
            <thead className="bg-gray-900 text-gray-400 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3">Task Name</th>
                <th className="px-6 py-3">Assigen To</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Created At</th>
                <th className="px-6 py-3">Priority</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-700">
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-gray-700 transition duration-200"
                  onClick={() =>
                    router.push(`/screens/manager/task/${task.id}`)
                  }
                >
                  <td className="px-6 py-4">{task.title}</td>
                  <td className="px-6 py-4">{task.assigned_by}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  task.status === "Completed"
                    ? "bg-green-500/20 text-green-400"
                    : task.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-purple-500/20 text-purple-400"
                }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  {/* <td className="px-6 py-4"></td> */}
                  <td className="px-6 py-4">
                    {new Date(task.created_at).toLocaleDateString()}
                  </td>
                  {/* <td className="px-6 py-4">{task.estimatedTime} hrs</td>
            <td className="px-6 py-4">{task.completionPercentage}%</td> */}

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs
                ${
                  task.priority === "High"
                    ? "bg-red-500/20 text-red-400"
                    : task.priority === "Medium"
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-blue-500/20 text-blue-400"
                }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
