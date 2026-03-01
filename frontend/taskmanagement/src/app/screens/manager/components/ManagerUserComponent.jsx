"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
// import CreateTask from "@/app/components/AddTasks";
import { AddUserForm } from "@/app/components/AddUserForm";
import { userDetails } from "@/services/user_detail_services";
import TopLoader from "@/app/components/loader";

export default function ManagerUser() {
  const router = useRouter();
  const [addUser, setAdduser] = useState(false);
  const [refreshUser,setRefreshUser] = useState(0) 
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [loading,setLoading] = useState(false)

  const handleRefreshPage = () => {
    setRefreshUser(prev => prev + 1)
  } 
  const returnFalse = () => {
    setAdduser(false);
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const displayuser = await userDetails();
        console.log("userdetails:", displayuser);
        setUsers(displayuser);
        console.log("users:", users);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchUser();
  }, [refreshUser]);

  const handleSearchUser = (e) => {
    e.preventDefault();

    console.log("Searching for:", searchUser);

    // Example: filter users here
  };

  return (
    <div className="flex flex-col bg-gray-800 mt-5 rounded-xl relative">
      {loading && <TopLoader />}
      <h1 className="text-xl sm:text-2xl text-white font-semibold my-3 ml-3">
        Users
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2 px-4 ">
        {/* Add User Button */}
        <button
          onClick={() => setAdduser(true)}
          className="flex w-fit items-center justify-center gap-2
    px-3 py-2 text-sm font-medium
    bg-indigo-600 rounded-xl text-white
    shadow-md hover:bg-indigo-700
    transition-all duration-300"
        >
          Add User
          <Plus size={18} />
        </button>

        {/* Search Section */}
        <form
          onSubmit={handleSearchUser}
          className="flex w-full sm:w-auto gap-3"
        >
          <input
            type="text"
            placeholder="Search any user..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="flex-1 sm:w-64 px-2 py-2 rounded-xl
      border border-gray-700 bg-gray-900
      text-white placeholder-gray-500
      outline-none focus:ring-2 focus:ring-purple-500 text-sm placeholder:text-sm "
          />

          <button
            type="submit"
            className="flex items-center h-10 justify-center gap-2
    px-4 text-sm font-medium
    bg-indigo-600 rounded-xl text-white
    shadow-md hover:bg-indigo-700
    transition-all duration-300"
          >
            Search
            <Search size={17} />
          </button>
        </form>
      </div>

      <div className="mt-2 bg-gray-800 rounded-xl border border-gray-700">
        {addUser ? (
          // <AddUser returnFalse={returnFalse} />
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl sm:text-2xl text-white font-semibold">
                  {/* {edit ? "Edit User Detail" : "Add New User"} */}
                  Add New User
                </h1>
              </div>
              {addUser &&
              <AddUserForm
                role={1}
                cancel={true}
                returnFalse={returnFalse}
                edit={false}
                handleRefreshPage={handleRefreshPage}
              />
}
            </div>
          </div>
        ) : null}

        {/* Scroll Container */}
        <div className="max-h-112 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <table className="min-w-full text-sm text-left text-gray-300">
            {/* Table Head */}
            <thead className="bg-gray-900 text-gray-400 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3">Employee Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Created At</th>
                {/* <th className="px-6 py-3">Priority</th> */}
                {/* <th className="px-6 py-3">Estimated Time</th>
          <th className="px-6 py-3">Completion %</th>
          <th className="px-6 py-3">Priority</th> */}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-700">
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-700 transition duration-200"
                  onClick={() =>
                    router.push(`/screens/manager/user/${user.id}`)
                  }
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  user.role_id === 1
                    ? "bg-green-500/20 text-green-400"
                    : user.role_id === 2
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-purple-500/20 text-purple-400"
                }`}
                    >
                      {user.role_id === 1 ? "Admin" : "Employee"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {/* {user.id} */}
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "N/A"}
                  </td>
                  {/* <td className="px-6 py-4">{task.priority}</td> */}
                  {/* <td className="px-6 py-4">{task.estimatedTime} hrs</td>
            <td className="px-6 py-4">{task.completionPercentage}%</td> */}

                  {/* <td className="px-6 py-4">
              <span className={`px-3 py-1 rounded-full text-xs
                ${
                  task.priority === "High"
                    ? "bg-red-500/20 text-red-400"
                    : task.priority === "Medium"
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}>
                {task.priority}
              </span>
            </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
