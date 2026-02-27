"use client";
import { addUser, updateUser } from "@/services/user_detail_services";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { useUser } from "../contexts/userContext";
import { userById } from "@/services/user_detail_services";
import TopLoader from "./loader";
import toast from "react-hot-toast";

export const AddUserForm = ({ id, role, returnFalse, edit, cancel }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: 0,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const {userDetailContext,setUserDetailContext} = useUser()
  const [userData, setUserData] = useState(null);
  const [editUserData, setEditUserData] = useState({});

   
  useEffect(() => {
    setLoading(true);
    console.log("id", id);
    const  fetchUserData = async () => {
      if (edit) {
        const response = await userById(id)
        console.log("userbyId:response", response);
        const formatedUser = {
          id: response[0],
          name: response[1],
          email: response[2],
          password: response[3],
          role_id: response[4],
          created_at: response[5],
          updated_at: response[6],
          deleted_at: response[7],
        };
        setFormData({
          fullName: response[1] || "",
          email: response[2] || "",
          password: "", // usually we don't show old password
          role: response[4] || null
        });
        setEditUserData(formatedUser)
      }
      else {
        // Reset when switching back to Add
        setFormData({
          fullName: "",
          email: "",
          password: "",
          role: null
        });
      }
    }
    fetchUserData();
    setLoading(false);
}, [edit,id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (role === 1) {
      if (!formData.role) {
        newErrors.role = "Please select a role";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log("Form Data:", formData);

    try {
      setLoading(true);
      if (!edit && userDetailContext.role_id === 1) {
        console.log("add user by admin")
        const data = await addUser({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role_id: formData.role,
        });
        console.log(data);
        toast.success("user added successfully");
      }
      if (edit && userDetailContext.role_id === 1) {
        console.log("update/edit user data by admin")
        const response = await updateUser(id, {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        });
        console.log(response);
        toast.success("user updated successfully");
      }
      if (edit && userDetailContext.role_id === 2 || userDetailContext.role_id === 1) {
        console.log("update user by employee or admin")
        const response = await updateUser(id, {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        });
        console.log(response);
        toast.success("user updated successfully");  
      }
      setLoading(false);  
      router.replace("/screens/manager");
    } catch (error) {
      setLoading(false);
      toast.error("Error submitting form: " );
      console.error("Error submitting form:", error);
    } 
  }

  return (
    <div className="">
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { name: "fullName", label: "Name", type: "text"   },
          { name: "email", label: "Email", type: "email"   },
          { name: "password", label: "Password", type: "password" },
        ].map((field) => (
          <div
            key={field.name}
            className="flex flex-col sm:flex-row sm:items-center"
          >
            <label className="sm:w-2/4 text-gray-400 text-sm mb-2 sm:mb-0">
              {field.label}
            </label>

            <div className="w-100">
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                // defaultValue={field.defaultValue}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full px-2 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white outline-none focus:ring-2 focus:ring-purple-500 text-sm placeholder:text-sm"
              />

              {errors[field.name] && (
                <p className="text-red-400 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Role Selection */}
        {userDetailContext.role_id !== 2 && !edit && (
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="sm:w-3/8 text-gray-400 text-sm mb-2 sm:mb-0">
              Role
            </label>

            <div className="sm:w-3/8 w-full flex gap-4">
              {[1, 2].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData({ ...formData, role })}
                  className={`px-4 py-2 rounded-lg text-sm transition
                      ${
                        formData.role === role
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                >
                  {role === 1 ? "Manager" : "Employee"}
                </button>
              ))}
            </div>
          </div>
        )}

        {errors.role && (
          <p className="text-red-400 text-sm sm:ml-[37%]">{errors.role}</p>
        )}

        <div className="mt-10 flex gap-4 justify-end">
          {cancel && (
            <button
              onClick={returnFalse}
              type="button"
              className="px-3 py-2 bg-gray-700 text-gray-300 rounded-xl 
      hover:bg-gray-600 transition-all text-sm font-medium"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="px-3 py-2 bg-indigo-600 text-white
      rounded-xl shadow-lg hover:bg-indigo-700 
      transition-all text-sm font-semibold"
          >
            {edit ? "Save Changes" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};
