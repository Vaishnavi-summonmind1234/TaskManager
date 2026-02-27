"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function TaskComonents() {
  const router = useRouter();
  const tasks = [
    {
      name: "Dashboard UI creations creations creations creations",
      owner: "Pankaj",
      status: "doing",
      startDate: "12 Jan 2026",
      endDate: "15 Jan 2026",
      estimatedTime: 10,
      completionPercentage: 40,
      priority: "High",
    },
    {
      name: "Dashboard UI",
      owner: "Pankaj",
      status: "testing",
      startDate: "12 Jan 2026",
      endDate: "15 Jan 2026",
      estimatedTime: 10,
      completionPercentage: 40,
      priority: "Medium",
    },
    {
      name: "Dashboard UI",
      owner: "Pankaj",
      status: "Completed",
      startDate: "12 Jan 2026",
      endDate: "15 Jan 2026",
      estimatedTime: 10,
      completionPercentage: 40,
      priority: "Low",
    },
    {
      name: "Dashboard UI",
      owner: "Pankaj",
      status: "Pending",
      startDate: "12 Jan 2026",
      endDate: "15 Jan 2026",
      estimatedTime: 10,
      completionPercentage: 40,
      priority: "High",
    },
    {
      name: "Dashboard UI",
      owner: "Pankaj",
      status: "Pending",
      startDate: "12 Jan 2026",
      endDate: "15 Jan 2026",
      estimatedTime: 10,
      completionPercentage: 40,
      priority: "High",
    },
    {
      name: "Dashboard UI",
      owner: "Pankaj",
      status: "Pending",
      startDate: "12 Jan 2026",
      endDate: "15 Jan 2026",
      estimatedTime: 10,
      completionPercentage: 40,
      priority: "High",
    },
    {
      name: "Dashboard UI",
      owner: "Pankaj",
      status: "Pending",
      startDate: "12 Jan 2026",
      endDate: "15 Jan 2026",
      estimatedTime: 10,
      completionPercentage: 40,
      priority: "High",
    },
    {
      name: "Dashboard UI",
      owner: "Pankaj",
      status: "Pending",
      startDate: "12 Jan 2026",
      endDate: "15 Jan 2026",
      estimatedTime: 10,
      completionPercentage: 40,
      priority: "High",
    },
    {
      name: "Dashboard UI",
      owner: "Pankaj",
      status: "Pending",
      startDate: "12 Jan 2026",
      endDate: "15 Jan 2026",
      estimatedTime: 10,
      completionPercentage: 40,
      priority: "High",
    },
    {
      name: "Dashboard UI",
      owner: "Pankaj",
      status: "Pending",
      startDate: "12 Jan 2026",
      endDate: "15 Jan 2026",
      estimatedTime: 10,
      completionPercentage: 40,
      priority: "High",
    },
    {
      name: "Dashboard UI",
      owner: "Pankaj",
      status: "Pending",
      startDate: "12 Jan 2026",
      endDate: "15 Jan 2026",
      estimatedTime: 10,
      completionPercentage: 40,
      priority: "High",
    },
    {
      name: "Dashboard UI",
      owner: "Pankaj",
      status: "Pending",
      startDate: "12 Jan 2026",
      endDate: "15 Jan 2026",
      estimatedTime: 10,
      completionPercentage: 40,
      priority: "High",
    },
    {
      name: "API Integration",
      owner: "Rahul",
      status: "Completed",
      startDate: "10 Jan 2026",
      endDate: "12 Jan 2026",
      estimatedTime: 6,
      completionPercentage: 100,
      priority: "Medium",
    },
  ];

  return (
    <div className="flex flex-col bg-gray-800 mt-5 rounded-xl ">
      <h1 className="text-xl sm:text-2xl text-white font-semibold my-3 ml-3">
        New Tasks
      </h1>

      <div className="flex flex-wrap gap-3 mx-3 mb-2">
        <button
          className="px-4 py-2 text-sm  bg-indigo-500 rounded-xl text-white
      shadow-lg hover:scale-105 hover:bg-indigo-600
      transition-all duration-300"
        >
          Completed
        </button>

        <button
          className="px-4 py-2 text-sm bg-pink-500 rounded-xl text-white
      shadow-lg hover:scale-105 hover:bg-pink-600
      transition-all duration-300"
        >
          Testing
        </button>

        <button
          className="px-4 py-2 text-sm bg-yellow-500 rounded-xl text-white
      shadow-lg hover:scale-105 hover:bg-yellow-600
      transition-all duration-300"
        >
          Pending
        </button>
      </div>

      <div className="mt-2 bg-gray-800 rounded-xl border border-gray-700">
        {/* Scroll Container */}
        <div className="max-h-112 overflow-auto">
          <table className="min-w-full text-sm text-left text-gray-300">
            {/* Table Head */}
            <thead className="bg-gray-900 text-gray-400 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3">Task Name</th>
                <th className="px-6 py-3">Owner</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Start Date</th>
                <th className="px-6 py-3">End Date</th>
                <th className="px-6 py-3">Estimated Time</th>
                <th className="px-6 py-3">Completion %</th>
                <th className="px-6 py-3">Priority</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-700">
              {tasks.map((task, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-700 transition duration-200"
                  onClick={() => router.push("/screens/employee/task")}
                >
                  <td className="px-6 py-4">{task.name}</td>
                  <td className="px-6 py-4">{task.owner}</td>

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

                  <td className="px-6 py-4">{task.startDate}</td>
                  <td className="px-6 py-4">{task.endDate}</td>
                  <td className="px-6 py-4">{task.estimatedTime} hrs</td>
                  <td className="px-6 py-4">{task.completionPercentage}%</td>

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

      {/* <button
      onClick={() => router.push("/screens/task")}
      className="w-full mt-5 bg-gray-700 rounded-xl p-4 sm:p-5 
      hover:bg-gray-600 transition duration-300 text-left"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
    
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <h1 className="text-white text-lg sm:text-xl font-bold">
            Task Manager Dashboard
          </h1>
          <h1 className="text-sm text-orange-400 font-medium">
            Priority: Medium
          </h1>
        </div>
        <div className="flex sm:items-center">
          <h2 className="text-gray-300 text-sm">
            02:20 AM, 12 Jan
          </h2>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-white text-sm self-start pl-1">
          Assigned By - Pankaj Bagauli
        </h2>
        <div className="w-fit px-4 py-2 bg-yellow-500 rounded-xl text-white shadow-lg">
          Pending
        </div>

      </div>
    </button>

  <button
      onClick={() => router.push("screens/task")}
      className="w-full mt-5 bg-gray-700 rounded-xl p-4 sm:p-5 
      hover:bg-gray-600 transition duration-300 text-left"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
    
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <h1 className="text-white text-lg sm:text-xl font-bold">
            Task Manager Dashboard
          </h1>
          <h1 className="text-sm text-green-400 font-medium">
            Priority: Easy
          </h1>
        </div>
        <div className="flex sm:items-center">
          <h2 className="text-gray-300 text-sm">
            02:20 AM, 12 Jan
          </h2>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-white text-sm self-start pl-1">
          Assigned By - Pankaj Bagauli
        </h2>
        <div className="w-fit px-4 py-2 bg-indigo-500 rounded-xl text-white shadow-lg">
          Completed
        </div>

      </div>
    </button>

  <button
      onClick={() => router.push("screens/task")}
      className="w-full mt-5 bg-gray-700 rounded-xl p-4 sm:p-5 
      hover:bg-gray-600 transition duration-300 text-left"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
    
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <h1 className="text-white text-lg sm:text-xl font-bold">
            Task Manager Dashboard
          </h1>
          <h1 className="text-sm text-red-400 font-medium">
            Priority: High
          </h1>
        </div>
        <div className="flex sm:items-center">
          <h2 className="text-gray-300 text-sm">
            02:20 AM, 12 Jan
          </h2>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-white text-sm self-start pl-1">
          Assigned By - Pankaj Bagauli
        </h2>
        <div className="w-fit px-4 py-2 bg-pink-500 rounded-xl text-white shadow-lg">
          Testing
        </div>

      </div>
    </button> */}
    </div>
  );
}
