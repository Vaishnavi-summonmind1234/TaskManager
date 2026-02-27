"use client"
import React from "react"
import {Check,ClipboardClock,Bug} from "lucide-react"
import { useUser } from "@/app/contexts/userContext"
import { ActivityTimeLines } from "@/app/components/ActivityTimeLines"

export default function DashboardComonents(){
    const {userDetail} = useUser();
    console.log(userDetail);
    return(
        <div className="mt-5 flex flex-col gap-5">

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

    {/* Completed */}
    <button
      className="flex flex-col justify-center w-full h-36 bg-indigo-500 rounded-2xl shadow-lg hover:scale-105 hover:bg-indigo-600 transition-all duration-300 text-white p-4"
    >
      <Check
        className="w-8 h-8 mb-3 bg-white rounded-lg p-1"
        color="green"
        strokeWidth={2}
      />
      <h2 className="text-3xl font-bold leading-none">20</h2>
      <p className="text-sm mt-1 text-indigo-100">Completed</p>
    </button>

    {/* Pending */}
    <button
      className="flex flex-col justify-center w-full h-36 bg-yellow-500 rounded-2xl shadow-lg hover:scale-105 hover:bg-yellow-600 transition-all duration-300 text-white p-4"
    >
      <ClipboardClock
        className="w-8 h-8 mb-3 bg-white rounded-lg p-1"
        color="orange"
        strokeWidth={2}
      />
      <h2 className="text-3xl font-bold leading-none">5</h2>
      <p className="text-sm mt-1 text-yellow-100">Pending</p>
    </button>

    {/* Testing */}
    <button
      className="flex flex-col justify-center w-full h-36 bg-pink-500 rounded-2xl shadow-lg hover:scale-105 hover:bg-pink-600 transition-all duration-300 text-white p-4"
    >
      <Bug
        className="w-8 h-8 mb-3 bg-white rounded-lg p-1"
        color="red"
        strokeWidth={2}
      />
      <h2 className="text-3xl font-bold leading-none">3</h2>
      <p className="text-sm mt-1 text-pink-100">Testing</p>
    </button>

  </div>

  <div className="flex flex-col lg:flex-row gap-4 items-start">

    <div className="bg-gray-800 rounded-2xl p-6 shadow-lg flex-1 min-w-0">

  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <h1 className="text-white text-xl font-semibold">
      Recent Tasks
    </h1>
  </div>

  {/* Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

    {/* Task Card */}
    <div className="bg-gray-700/60 backdrop-blur rounded-2xl p-3 hover:bg-gray-700 transition-all duration-300 border border-gray-600/40">

      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        <span className="bg-yellow-500/90 text-xs text-white px-3 py-1 rounded-full">
          2 Days Left
        </span>

        <span className="px-3 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
          High
        </span>
      </div>

      {/* Title */}
      <h2 className="text-white text-lg font-semibold mb-3 leading-snug">
        Task Manager Dashboard
      </h2>

      {/* Assigned */}
      <div className="flex items-center text-sm text-gray-400 mb-4">
        <span>Assigned to:</span>
        <span className="ml-2 text-gray-200 font-medium">
          Pankaj Bagauli
        </span>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Progress</span>
          <span className="text-gray-200 font-medium">50%</span>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
          <div className="bg-purple-600 h-2 rounded-full transition-all duration-500 w-[50%]"></div>
        </div>
      </div>

    </div>
    {/* Task Card */}
    <div className="bg-gray-700/60 backdrop-blur rounded-2xl p-3 hover:bg-gray-700 transition-all duration-300 border border-gray-600/40">

      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        <span className="bg-yellow-500/90 text-xs text-white px-3 py-1 rounded-full">
          2 Days Left
        </span>

        <span className="px-3 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
          High
        </span>
      </div>

      {/* Title */}
      <h2 className="text-white text-lg font-semibold mb-3 leading-snug">
        Task Manager Dashboard
      </h2>

      {/* Assigned */}
      <div className="flex items-center text-sm text-gray-400 mb-4">
        <span>Assigned to:</span>
        <span className="ml-2 text-gray-200 font-medium">
          Pankaj Bagauli
        </span>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Progress</span>
          <span className="text-gray-200 font-medium">50%</span>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
          <div className="bg-purple-600 h-2 rounded-full transition-all duration-500 w-[50%]"></div>
        </div>
      </div>

    </div>
    {/* Task Card */}
    <div className="bg-gray-700/60 backdrop-blur rounded-2xl p-3 hover:bg-gray-700 transition-all duration-300 border border-gray-600/40">

      {/* Top Section */}
      <div className="flex items-center justify-between mb-4">
        <span className="bg-yellow-500/90 text-xs text-white px-3 py-1 rounded-full">
          2 Days Left
        </span>

        <span className="px-3 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full">
          High
        </span>
      </div>

      {/* Title */}
      <h2 className="text-white text-lg font-semibold mb-3 leading-snug">
        Task Manager Dashboard
      </h2>

      {/* Assigned */}
      <div className="flex items-center text-sm text-gray-400 mb-4">
        <span>Assigned to:</span>
        <span className="ml-2 text-gray-200 font-medium">
          Pankaj Bagauli
        </span>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Progress</span>
          <span className="text-gray-200 font-medium">50%</span>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
          <div className="bg-purple-600 h-2 rounded-full transition-all duration-500 w-[50%]"></div>
        </div>
      </div>

    </div>

  </div>
</div>
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg w-full lg:w-1/3 max-h-100 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
    <ActivityTimeLines />
  </div>

  </div>
  

</div>

    )
}