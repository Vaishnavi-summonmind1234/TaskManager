"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/contexts/userContext";
import { AddUserForm } from "@/app/components/AddUserForm";

export default function SettingComponent() {
  const router = useRouter();
  const handleRefreshPage = () => {
    console.log("admin data update by admin");
    router.refresh();
  }
  const { userDetailContext } = useUser();
  console.log("user detail in setting component:", userDetailContext);

  return (
    <div className="flex justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg p-6 sm:p-8">
        <h1 className="text-xl sm:text-2xl text-white font-semibold mb-6">
          Update Detail
        </h1>
        <AddUserForm
          id={userDetailContext.id}
          role={1}
          cancel={false}
          edit={true}
          handleRefreshPage={handleRefreshPage}
        />
      </div>
    
    </div>
  );
}
