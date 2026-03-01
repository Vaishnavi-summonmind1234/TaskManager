"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AddUserForm } from "@/app/components/AddUserForm";
import { Menu } from "lucide-react";
import {
  deleteUser,
  userById,
  userDetails,
} from "@/services/user_detail_services";
import { useParams } from "next/navigation";
import TopLoader from "@/app/components/loader";
import toast from "react-hot-toast";

export default function TaskPage() {
  const params = useParams();
  const id = params.id;
  console.log("userId:", id);
  const [loading, setLoading] = useState(true);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [openSidebar, setOpensidebar] = useState(true);
  const [users, setUsers] = useState([]);
  const [individualUser, setIndividualUser] = useState({});
  const [refreshPage, setRefreshPage] = useState(0);

  const router = useRouter();
  const handleSidebar = () => {
    setOpensidebar(!openSidebar);
  };

  const handleRefreshPage = () => {
    setRefreshPage(prev => prev + 1)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [allUsers, singleUser] = await Promise.all([
          userDetails(),
          userById(id),
        ]);

        setUsers(allUsers);
        const formatedUser = {
          id: singleUser[0],
          name: singleUser[1],
          email: singleUser[2],
          password: singleUser[3],
          role_id: singleUser[4],
          created_at: singleUser[5],
          updated_at: singleUser[6],
          deleted_at: singleUser[7],
        };
        setIndividualUser(formatedUser);
        console.log("formattedUser:", formatedUser);
        console.log("singleUser:", singleUser);
        console.log("allUsers:", allUsers);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Failed to fetch data", error);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id,refreshPage]);

  const returnFalse = () => {
    setUpdateStatus(false);
  };

  async function handleDeleteUser(userId) {
    console.log("tring to Deleteing user with ID:", userId);
    try {
      const response = await deleteUser(userId);
      console.log("User deleted successfully:", response);
      toast.success("User Deleted Sucessfully");
      router.replace("/screens/manager");
    } catch (error) {
      console.log("Failed to delete user", error);
      toast.error("Failed To Delete user");
    }
  }

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
              <h2 className="text-white text-lg font-semibold">Users List</h2>
              <button className=" p-2" onClick={() => handleSidebar()}>
                <Menu color="white" />
              </button>
            </div>

            <div className="flex-1 p-4 space-y-4 overflow-hidden hover:overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent ">
              {users.map((user) => (
                <button
                  key={user.id}
                  className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:bg-gray-700 transition cursor-pointer w-full text-left"
                  onClick={() =>
                    router.push(`/screens/manager/user/${user.id}`)
                  }
                >
                  {/* <div className="flex justify-between items-start mb-3"> */}
                  <h1 className="text-white text-lg font-semibold">
                    {user.name}
                  </h1>

                  <h1 className="text-sm my-2  font-medium text-white">
                    {user.email}
                  </h1>
                  {/* </div> */}

                  <div className="mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  user.role_id === 1
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
                    >
                      {user.role_id === 1 ? "Admin" : "Employee"}
                    </span>
                  </div>

                  {/* <p className="text-gray-400 text-sm mb-2">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p> */}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RIGHT SIDE - TASK DETAILS */}
        <div className="flex-1 overflow-y-auto">
          <div>
            <div className="flex p-4.5 border-b border-gray-700">
              {!openSidebar && (
                <button className="mr-3" onClick={() => handleSidebar()}>
                  <Menu color="white" />
                </button>
              )}
              <h2 className="text-white text-lg font-semibold">User Detail</h2>
            </div>
            <div className="bg-gray-800/80 backdrop-blur-lg shadow-2xl p-5 sm:p-8 border border-gray-700">
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                <div>
                  <h1 className="text-white text-lg sm:text-lg font-semibold">
                    {individualUser.name}
                  </h1>

                  <div className="flex gap-4 mt-3 items-center ">
                    <h1 className="text-white text-sm font-semibold">Email :  </h1>
                   <span className="px-3 py-1 text-sm text-white">
                    {individualUser.email}
                  </span>
                  </div>

                   <div className="flex gap-4 mt-3 items-center ">
                    <h1 className="text-white text-sm font-semibold">Role :  </h1>
                   <span
                      className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  individualUser.role === "manager"
                    ? "bg-green-500/20 text-green-400"
                    : individualUser.role === "employee"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-purple-500/20 text-purple-400"
                }`}
                    >
                      {individualUser.role === 1 ? "Admin" : "Employee"}
                    </span>
                  </div>
                 

                     <div className="flex gap-4 mt-3 items-center ">
                    <h1 className="text-white text-sm font-semibold">Created At </h1>
                   <span className="px-3 py-1 text-sm text-white">
                    {new Date(individualUser.created_at).toLocaleDateString()}
                  </span>
                  </div>
                </div>
              </div>

              <div className="mt-6"></div>

              <div className="border-t border-gray-700 my-6"></div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition duration-300 shadow-lg"
                  onClick={() => {
                    handleDeleteUser(individualUser.id);
                  }}
                >
                  Delete User
                </button>

                <button
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-medium transition duration-300 shadow-lg"
                  onClick={() => setUpdateStatus(true)}
                >
                  Edit User
                </button>
              </div>
            </div>
            {updateStatus && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-gray-800 rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl sm:text-2xl text-white font-semibold">
                      {/* {edit ? "Edit User Detail" : "Add New User"} */}
                      Edit User
                    </h1>

                    <button
                      onClick={returnFalse}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      ✕
                    </button>
                  </div>
                  <AddUserForm
                    role={1}
                    cancel={true}
                    returnFalse={returnFalse}
                    edit={true}
                    id={individualUser.id}
                    handleRefreshPage={handleRefreshPage}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="max-h-112 overflow-auto"></div>
        </div>

        {/* </div> */}

        {/* </div> */}
      </div>
    </>
  );
}
