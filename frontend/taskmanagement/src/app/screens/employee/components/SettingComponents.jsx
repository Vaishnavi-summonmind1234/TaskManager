"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/contexts/userContext";
import { AddUserForm } from "@/app/components/AddUserForm";

export default function SettingComponent() {
  const router = useRouter();
  const { userDetailContext } = useUser();
  console.log("user detail in setting component: ", userDetailContext)
  return (
    
    <div className="flex justify-center p-4">

  <div className="bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg p-6 sm:p-8">
    <h1 className="text-xl sm:text-2xl text-white font-semibold mb-6">
      User Detail
    </h1>

    <form className="space-y-6">
        {[
          { name: "fullName", label: "Name", type: "text", value: userDetailContext.name },
          { name: "email", label: "Email", type: "email", value: userDetailContext.email },
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
                // defaultValue={field.defaultValue}
                readOnly
                value={field.value}
                className="w-full px-2 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white outline-none focus:ring-2 focus:ring-purple-500 text-sm placeholder:text-sm"
              />
            </div>
          </div>
        ))}

        {/* Role Selection */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="sm:w-3/8 text-gray-400 text-sm mb-2 sm:mb-0">
              Role
            </label>

            <div className="sm:w-3/8 w-full flex gap-4">
                <div
                  className={"px-4 py-2 rounded-lg text-sm bg-indigo-600 text-white"}
                >
                  {userDetailContext.role_id === 1 ? "Manager" : "Employee"}
                </div>
            </div>
          </div>
      </form>

  </div>

</div>
  );
}