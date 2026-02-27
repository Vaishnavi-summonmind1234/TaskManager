"use client";
import React, { useState } from "react";
import AddForm from "./AddForm"; 
export default function CreateTask({ returnFalse }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div
          className="bg-gray-800 rounded-2xl w-full max-w-4xl 
  max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl sm:text-2xl text-white font-semibold">
              Create New Task
            </h1>

            <button
              onClick={returnFalse}
              className="text-gray-400 hover:text-white text-sm"
            >
              ✕
            </button>
          </div>

          {/* <Form returnFalse={returnFalse} /> */}
          <AddForm buttonName={"Create Task"} role={1} returnFalse={returnFalse} cancel={true} editing={false}/>
        </div>
      </div>
    </>
  );
}
