"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "../../contexts/userContext";
import {
  CircleUserRound,
  Bell,
  LayoutDashboard,
  ClipboardPlus,
  Settings,
  LogOut,
  UserRoundPen,
  Menu,
  Sidebar,
} from "lucide-react";
import DashboardComonents from "./components/DashboardComponents";
import TaskComonents from "./components/TaskComponents";
import SettingComponent from "./components/SettingComponents";

import { useRouter } from "next/navigation";
import ManagerUser from "./components/ManagerUserComponent";
import { getProfile } from "@/services/auth_services";

export default function DashboardPage() {
  const { userDetailContext,setUserdetailContext } = useUser();
  const [currentUser, setCurrentUser] = useState({});
  const [openSidebar, setOpensidebar] = useState(true);
  const router = useRouter();
  const [activeTab, setActivetab] = useState("dashboard");
  const handleSidebar = () => {
    setOpensidebar(!openSidebar);
  };
  // const [users, setCurrentUser] = useState([]);

  console.log("user detail from context to dashboard ",userDetailContext);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      {openSidebar && (
        <div
          className={`w-60 m-3 p-5 flex flex-col bg-gray-800 rounded-xl text-white
    md:translate-x-0`}
        >
          {/* Logo */}
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-10">{userDetailContext.role_id === 1 ? "Admin" : userDetailContext.role_id === 2 ? "Employee" : ""}</h1>
            <button className="self-start p-2" onClick={() => handleSidebar()}>
              <Menu />
            </button>
          </div>

          {/* Menu Buttons */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setActivetab("dashboard")}
              className={` flex  items-center  w-full py-3 text-xs font-medium rounded-lg hover:bg-purple-700 transition-all uppercase ${activeTab === "dashboard" ? "bg-purple-700" : null}`}
            >
              <LayoutDashboard className="ml-3 mr-3" height={16} width={16} />
              Dashboard
            </button>

            <button
              onClick={() => setActivetab("tasks")}
              className={` flex  items-center  w-full py-3 text-xs font-medium rounded-lg hover:bg-purple-700 transition-all uppercase ${activeTab === "tasks" ? "bg-purple-700" : null}`}
            >
              <ClipboardPlus className="ml-3 mr-3" height={16} width={16} />
              Create Tasks
            </button>

            <button
              onClick={() => setActivetab("manageUser")}
              className={` flex  items-center  w-full py-3 text-xs font-medium rounded-lg hover:bg-purple-700 transition-all uppercase ${activeTab === "manageUser" ? "bg-purple-700" : null}`}
            >
              <UserRoundPen className="ml-3 mr-3" height={16} width={16} />
              Manage User
            </button>

            <button
              onClick={() => setActivetab("setting")}
              className={` flex  items-center w-full py-3 text-xs font-medium rounded-lg hover:bg-purple-700 transition-all uppercase ${activeTab === "setting" ? "bg-purple-700" : null}`}
            >
              <Settings className="ml-3 mr-3" height={16} width={16} />
              Setting
            </button>
          </div>

          {/* Logout at Bottom */}
          <div className="mt-auto pt-6">
            <button
              onClick={() => router.push("/screens/signin")}
              className="flex justify-center items-center w-full py-3 text-xs font-medium rounded-lg bg-red-600 hover:bg-red-700 transition-all uppercase"
            >
              <LogOut className="ml-3 mr-3" height={16} width={16} />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 m-3 rounded-xl">
        {/* Top Navbar */}
        <div className="h-16 w-full flex justify-between items-center px-6 border-b border-gray-700">
          <div className="flex justify-center">
            {!openSidebar && (
              <button className="mr-3" onClick={() => handleSidebar()}>
                <Menu color="white" />
              </button>
            )}
            <h1 className="text-xl font-bold text-white">Hi, {userDetailContext.name}</h1>
          </div>

          <div className="flex items-center gap-10 text-gray-300">
            <button className="cursor-pointer hover:text-white transition">
              <Bell height={20} weight={20} />
            </button>
            <button
              onClick={() => setActivetab("setting")}
              className="cursor-pointer hover:text-white transition"
            >
              <CircleUserRound height={20} weight={20} />
            </button>
          </div>
        </div>

        {activeTab === "dashboard" ? <DashboardComonents /> : null}
        {activeTab === "tasks" ? <TaskComonents /> : null}
        {activeTab === "manageUser" ? <ManagerUser /> : null}
        {activeTab === "setting" ? <SettingComponent /> : null}
      </div>
    </div>
  );
}
