"use client"

import { useState } from "react"
import RichTextEditor from "./RichTextEditer";

export default function Form({returnFalse}){
    
    const [formData, setFormData] = useState({
      taskTitle:"",
      descripton:"",
      assignTo:"",
      comment:"",
      attachments: [],
    });
    const [status,setStatus] = useState("")
    const [priority,setPriority] = useState("")
    const [content, setContent] = useState("");
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]);
    const handleAddComment = () => {

    if (!commentInput.trim()) return;

  const newComment = {
    id: Date.now(),
    text: commentInput,
    author: "Pankaj Bagauli", // later from logged-in user
    date: new Date().toLocaleString()
  };

  setComments([newComment, ...comments]);
  setCommentInput("");
};
    const handleSubmit = (e) => {
         e.preventDefault(); 
        console.log("hello world")
        console.log(status)
        console.log(formData);
        console.log(content)
        console.log(commentInput)
        console.log(commentInput)
    }
    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
          {[
            { name: "taskTitle", label: "Tittle", type: "text" },
            // { name: "descripton", label: "Description", type: "text" },
            {name: "assignTo",label:"Assign To" , type:"text"},
          ].map((field) => (
            <div key={field.name} className="flex flex-col col-span-1">
              <label className="mb-2 ml-1 text-sm font-medium text-gray-300">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                min={field.name === "estimatedTime" ? 0 : undefined}
                max={field.name === "completionPercentage" ? 100 : undefined}
                value={formData[field.name] || ""}
                onChange={(e) => {
                  let value = e.target.value;
        
                  if (field.name === "estimatedTime") {
                    value = Math.max(0, value);
                  }
        
                  if (field.name === "completionPercentage") {
                    value = Math.min(100, Math.max(0, value));
                  }
        
                  setFormData({
                    ...formData,
                    [field.name]: value,
                  });
                }}
                className="px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 
                outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          ))}

                        
              {/* <label className="mb-2 ml-1 text-sm font-medium text-gray-300">
                Tittle
              </label>
              <input
                type="text"
                name="taskTitle"
                value={formData.taskTitle || ""}
                onChange={(e) => {
                  let value = e.target.value;
                  setFormData({
                    ...formData,
                    taskTitle: value,
                  });
                }}
                className="px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 
                outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              /> */}
        
          <div>
          <h1 className="mb-2 text-sm font-medium text-gray-300">
            Status
          </h1>
        
          <div className="flex flex-wrap gap-3">
            {["Accept", "Pending", "Testing", "Completed"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setStatus(item)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${
                  status === item
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="mb-2 text-sm font-medium text-gray-300">
            Priority
          </h1>
        
          <div className="flex flex-wrap gap-3">
            {["High", "Medium", "Low"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPriority(item)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${
                  priority === item
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
            
          <div className="col-span-1 sm:col-span-2">
            <h1 className="mb-2 ml-1 text-sm font-medium text-gray-300">Description</h1>
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        
          <div className="col-span-1 sm:col-span-2 flex flex-col w-fit">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Upload Files
            </label>
        
            <input
              type="file"
              name="attachments"
              multiple
              onChange={(e) =>
                setFormData({
                  ...formData,
                  attachments: Array.from(e.target.files),
                })
              }
              className="file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 text-gray-400 cursor-pointer"
            
            />
        
            {/* Show selected file names */}
            {formData.attachments?.length > 0 && (
              <div className="mt-2 text-sm text-gray-400 space-y-1">
                {formData.attachments.map((file, index) => (
                  <p key={index}>📎 {file.name}</p>
                ))}
              </div>
            )}
          </div>  
          <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
        
          <h2 className="text-white text-lg font-semibold mb-4">
            Comments
          </h2>
        
          {/* Add Comment Box */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white outline-none focus:ring-2 focus:ring-purple-500"
            />
        
            <button
              type="button"
              onClick={handleAddComment}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all text-sm "
            >
              Post
            </button>
          </div>
        
          {/* Comments List */}
          <div className="space-y-4 max-h-64 overflow-y-auto">
        
            {comments.length === 0 && (
              <p className="text-gray-400 text-sm">
                No comments yet.
              </p>
            )}
        
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-gray-900 p-4 rounded-xl border border-gray-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-purple-400">
                    {comment.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {comment.date}
                  </span>
                </div>
        
                <p className="text-gray-300 text-sm">
                  {comment.text}
                </p>
              </div>
            ))}
        
          </div>
        </div>
        
          <div className="col-span-1 sm:col-span-2 mt-6 flex flex-col sm:flex-row sm:justify-end gap-4">

  <button
  onClick={returnFalse}
    type="button"
    className="px-6 py-3 bg-gray-700 text-gray-300 rounded-xl 
    hover:bg-gray-600 transition-all text-sm font-medium"
  >
    Cancel
  </button>

  <button
    type="submit"
    className="px-6 py-3 bg-indigo-600 text-white 
    rounded-xl shadow-lg hover:bg-indigo-700 
    transition-all text-sm font-semibold"
  >
    Create Task
  </button>

</div>
        
        </form>
    )
} 