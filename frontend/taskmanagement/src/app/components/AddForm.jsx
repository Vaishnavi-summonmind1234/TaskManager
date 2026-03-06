"use client";

import { useState, useEffect } from "react";
import RichTextEditor from "./RichTextEditer";
import Select from "react-select";
import { addTask, task_update } from "@/services/task_services";
import { addAttachment } from "@/services/attachment_services";
import { addComment } from "@/services/comment_services";
import { userDetails } from "@/services/user_detail_services";
import { useUser } from "../contexts/userContext";
import { User } from "lucide-react";
import { assign } from "@/services/assignServices";
import toast from "react-hot-toast";

export default function AddForm({
  id,
  role,
  editing,
  returnFalse,
  cancel,
  handleRefreshPage,
  individualTask,
  taskAssigment,
}) {
  console.log(
    "AddForm Rendered with id:",
    id,
    "role:",
    role,
    "editing:",
    editing,
    "individualTask",
    individualTask,
    "taskAssignment",
    taskAssigment,
  );
  const { userDetailContext } = useUser();
  console.log("User Detail in AddForm:", userDetailContext);
  const [formData, setFormData] = useState({
    title: "",
    descriptions: "",
    startDate: "",
    endDate: "",
    estimatedTime: "",
    completionPercentage: "",
    attachments: [],
    approach: "",
    comments: [],
    status: "",
    priority: "",
    assignedTo: [],
  });
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  // const users = [
  //   { value: 1, label: "divyam Bagauli" },
  //   { value: 2, label: "Harsh sharma" },
  //   { value: 3, label: "Pankaj kumar" },
  // ];
  const today = new Date().toLocaleDateString("en-CA");
  console.log("today date", today);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [content, setContent] = useState("");

  const [comments, setComments] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [replyCommentList, setReplyCommentList] = useState([]);
  const [replyInput, setReplyInput] = useState("");
  const [sendReply, setSendReply] = useState({
    id: null,
    open: false,
    disable: false,
  });
  // console.log(role);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#101828  ",
      fontSize: "14px",
      borderColor: state.isFocused ? "#7c3aed" : "#364153",
      boxShadow: state.isFocused ? "0 0 0 2px #7c3aed" : "none",
      "&:hover": {
        borderColor: "#7c3aed",
      },
      color: "white",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#364153",
      fontSize: "14px",
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#101828" : "#1f2937",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white", // 👈 selected value color
    }),
    // multiValue: (provided) => ({
    //   ...provided,
    //   backgroundColor: "#101828",
    // }),
    // multiValueLabel: (provided) => ({
    //   ...provided,
    //   color: "white",
    // }),
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await userDetails();

      const formattedUsers = response.map((user) => ({
        value: user.id,
        label: user.name,
      }));

      setUsers(formattedUsers);
      console.log("response of all user : ", formattedUsers);
    };

    setFormData((prev) => ({
      ...prev,
      title: individualTask?.title || "",
      description: individualTask?.description || "",
      status: individualTask?.status || "",
      priority: individualTask?.priority || "",
      startDate: individualTask?.start_date || "",
      endDate: individualTask?.end_date || "",
      estimatedTime: individualTask?.estimate_time || "",
      approach: individualTask?.approach || "",
      completionPercentage: individualTask?.completion_percentage || "",
      assignedTo: taskAssigment
        ? {
            value: taskAssigment[0].assignedAt_id,
            label: taskAssigment[0].assignedAt_name,
          }
        : null,
    }));
    console.log("form data after set value", formData);
    fetchUser();
  }, [editing, id, role, taskAssigment, individualTask]);

  const handleSendReply = (id, value) => {
    // console.log(reply called)
    sendReply(true);
    // console.log(id, value);
    // setSendReply((prev) => ({
    //   ...prev,
    //   id,
    //   value,
    // }));
  };

  const handleAddReply = (commentId) => {
    console.log(commentId);
    if (!replyInput.trim()) return;
    console.log(replyInput);

    const newComment = {
      id: Date.now(),
      text: replyInput,
      author: "Pankaj Bagauli", // later from logged-in user
      parentId: commentId,
      date: new Date().toLocaleString(),
    };

    console.log(newComment);

    setFormData((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments],
    }));
    setReplyCommentList((prev) => [...prev, newComment]);
    setReplyInput("");
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    console.log(commentInput);

    const newComment = {
      id: Date.now(),
      text: commentInput,
      author: "Pankaj Bagauli", // later from logged-in user
      date: new Date().toLocaleString(),
    };

    setCommentList((prev) => [...prev, newComment]);

    setFormData((prev) => ({
      ...prev,
      comments: [newComment, ...prev.comments],
    }));
    setCommentInput("");
  };

  async function handleSubmit(e) {
    console.log(formData);
    e.preventDefault();
    const newErrors = {};

    if (role === 1) {
      if (!formData.title.trim()) {
        newErrors.title = "Title is required";
      }
      if (!formData.descriptions.trim()) {
        newErrors.descriptions = "Descriptions is required";
      }
      if (!formData.startDate.trim()) {
        newErrors.startDate = "Start Date is required";
      }

      if (!formData.endDate.trim()) {
        newErrors.endDate = "End Date is required";
      }

      if (!formData.estimatedTime) {
        newErrors.estimatedTime = "Estimated Time is required";
      }

      if (formData.assignedTo.length === 0) {
        newErrors.assignedTo = "Assign Task To employee";
      }

      if (!formData.priority.trim()) {
        newErrors.priority = "Priority is required";
      }
    }

    if (role === 2) {
      if (!formData.completionPercentage.trim()) {
        newErrors.completionPercentage = "Completion Percentage is required";
      }
      if (!formData.approach) {
        newErrors.approach = "Approach is required";
      }
    }

    if (!formData.status.trim()) {
      newErrors.status = "Status is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(errors);
      toast.error("all field are required");
      return;
    }
    setErrors({});

    console.log("formData", formData);
    console.log(content);

    try {
      setLoading(true);
      let response;
      let taskId;
      // ===============================
      // 🟢 MANAGER → CREATE TASK
      // ===============================
      if (role === 1) {
        console.log("sending data for creation...");
        const payload = {
          title: formData.title,
          description: formData.descriptions,
          status: formData.status,
          priority: formData.priority,
          assigned_by: Number(userDetailContext.id),
          start_date: formData.startDate,
          end_date: formData.endDate,
          estimate_time: Number(formData.estimatedTime),
          approach: formData.approach,
        };
        if (editing) {
          console.log("editing");
          response = await task_update(id, payload);
          console.log("updating task", response);
        }
        if (!editing) {
          console.log("not editing");
          response = await addTask(payload);
          console.log("Created Task:", response);
          taskId = response?.id;
        }
      }
      // task assign
      if (role === 1) {
        if (!taskId) {
          taskId = id;
        }
        const assignedToIds = [formData.assignedTo?.value];
        console.log("assignTO:", taskId);
        console.log("assignedToIds:", assignedToIds);
        const response = await assign(taskId, assignedToIds);
        console.log("response for assign", response);
      }

      // ===============================
      // 🔵 EMPLOYEE → UPDATE TASK
      // ===============================
      if (role === 2) {
        const payload = {
          completion_percentage: Number(formData.completionPercentage),
          approach: formData.approach,
          status: formData.status,
        };

        response = await task_update(id, payload);
        console.log("Updated Task:", response);
        // ideally this should be updateTask()
      }

      // if (taskId) {
      //   // Upload Attachments in Parallel
      //   if (formData.attachments.length > 0) {
      //     const response = await Promise.all(
      //       formData.attachments.map((file) =>
      //         addAttachment({
      //           id: taskId,
      //           file: file.name,
      //         })
      //       )
      //     );
      //     console.log("Attachments Upload Response:", response);
      //   }

      //   // Upload Comments in Parallel
      //   console.log("Uploading Comments...", formData.comments);
      //   if (formData.comments.length > 0) {
      //     const response = await Promise.all(
      //       formData.comments.map((comment) =>
      //         addComment(taskId, {
      //           comment: comment.text,
      //           parentId: comment.parentId || null,
      //         }),
      //       ),
      //     );
      //     console.log("Comments Upload Response", response);
      //   }
      // }

      if (taskId) {
        // Upload Attachments in Parallel
        try {
          if (formData.attachments.length > 0) {
            const response = await Promise.all(
              formData.attachments.map((file) =>
                addAttachment({
                  id: taskId,
                  file: file,
                }),
              ),
            );
            console.log("Attachments Upload Response:", response);
            toast.success("file uploaded Sucessfully");
          }
        } catch (error) {
          toast.error("failed to upload file");
          console.log("faild to upload file", error);
        }

        // Upload Comments in Parallel
        console.log("Uploading Comments...", formData.comments);
        // if (editing) {
        //   if (formData.comments.length > 0) {
        //     const response = await Promise.all(
        //       formData.comments.map((comment) =>
        //         addComment(taskId, {
        //           comment: comment.text,
        //           parentId: comment.parentId || null,
        //         }),
        //       ),
        //     );
        //     console.log("Comments Upload Response", response);
        //   }
        // }
      }

      // alert("Task saved successfully 🚀");

      if (returnFalse) {
        returnFalse();
      }
      setLoading(false);
      if (editing) {
        toast.success("Task updated Sucessfully");
      } else {
        toast.success("Task Added Sucessfully");
      }
      handleRefreshPage();
    } catch (error) {
      toast.error("somtthing went wrong");
      console.error("Error:", error);
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
    >
      {/* {titile} */}

      {role === 1 && (
        <div className="flex flex-col col-span-1">
          <label className="mb-2 ml-1 text-sm font-medium text-gray-300">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Title"
            onChange={(e) => {
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              });
            }}
            className="px-2 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500
          outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-sm "
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title}</p>
          )}
        </div>
      )}

      {/* startdata */}
      {role === 1 && (
        <div className="flex flex-col col-span-1">
          <label className="mb-2 ml-1 text-sm font-medium text-gray-300">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            min={today}
            value={formData.startDate}
            onChange={(e) => {
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              });
            }}
            className="px-2 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500
                  outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-sm"
          />
          {errors.startDate && (
            <p className="text-red-400 text-sm mt-1">{errors.startDate}</p>
          )}
        </div>
      )}

      {/* endDate */}
      {role === 1 && (
        <div className="flex flex-col col-span-1">
          <label className="mb-2 ml-1 text-sm font-medium text-gray-300">
            End Date
          </label>
          <input
            min={today}
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={(e) => {
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              });
            }}
            className="px-2 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500
                  outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-sm"
          />
          {errors.endDate && (
            <p className="text-red-400 text-sm mt-1">{errors.endDate}</p>
          )}
        </div>
      )}
      {/* estimatehour */}
      {role === 1 && (
        <div className="flex flex-col col-span-1">
          <label className="mb-2 ml-1 text-sm font-medium text-gray-300">
            Estimated Time (hrs)
          </label>
          <input
            type="number"
            name="estimatedTime"
            value={formData.estimatedTime}
            min={0}
            onChange={(e) => {
              let value = Number(e.target.value);
              value = Math.max(0, value);
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              });
            }}
            className="px-2 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500
                  outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-sm"
          />
          {errors.estimatedTime && (
            <p className="text-red-400 text-sm mt-1">{errors.estimatedTime}</p>
          )}
        </div>
      )}
      {/* completion percentage */}
      {role === 2 && (
        <div className="flex flex-col col-span-1">
          <label className="mb-2 ml-1 text-sm font-medium text-gray-300">
            Completion %
          </label>
          <input
            type="number"
            name="completionPercentage"
            value={formData.completionPercentage}
            max={100}
            onChange={(e) => {
              let value = e.target.value;
              value = Math.min(100, Math.max(0, value));
              setFormData({
                ...formData,
                [e.target.name]: e.target.value,
              });
            }}
            className="px-2 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500
                outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-sm"
          />
          {errors.completionPercentage && (
            <p className="text-red-400 text-sm mt-1">
              {errors.completionPercentage}
            </p>
          )}
        </div>
      )}

      {/* assignedTo */}
      {role === 1 && (
        <div className="flex flex-col col-span-1">
          <label className="mb-2 ml-1 text-sm font-medium text-gray-300">
            Assign To
          </label>
          <Select
            options={users}
            value={formData.assignedTo}
            placeholder="Select an employee"
            styles={customStyles}
            closeMenuOnSelect={true}
            onChange={(selectedOptions) =>
              setFormData((prev) => ({
                ...prev,
                assignedTo: selectedOptions || [],
              }))
            }
          />
          {errors.assignedTo && (
            <p className="text-red-400 text-sm mt-1">{errors.assignedTo}</p>
          )}
        </div>
      )}
      {/* status */}
      <div>
        <h1 className="mb-2 text-sm font-medium text-gray-300">Status</h1>

        <div className="flex flex-wrap gap-3">
          {["todo", "doing", "testing", "manager_review", "done"].map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    status: item,
                  })
                }
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${
                  formData.status === item
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {item === "manager_review" ? "Manager Review" : item}
              </button>
            ),
          )}
        </div>
        {errors.status && (
          <p className="text-red-400 text-sm mt-1">{errors.status}</p>
        )}
      </div>
      {/* priority */}
      {role === 1 && (
        <div>
          <h1 className="mb-2 text-sm font-medium text-gray-300">Priority</h1>

          <div className="flex flex-wrap gap-3">
            {["high", "medium", "low"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    priority: item,
                  })
                }
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                  ${
                    formData.priority === item
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-800"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>
          {errors.priority && (
            <p className="text-red-400 text-sm mt-1">{errors.priority}</p>
          )}
        </div>
      )}
      {/* description or approach */}
      <div className="col-span-1 sm:col-span-2">
        <h1 className="mb-2 ml-1 text-sm font-medium text-gray-300">
          {role === 1 ? "Description" : "Approach"}
        </h1>
        <RichTextEditor
          value={role === 1 ? formData.descriptions : formData.approach}
          onChange={(value) => {
            const FilteredValue = value?.content[0].content[0].text || "";
            // console.log(FilteredValue);
            setFormData((prev) => ({
              ...prev,
              ...(role === 1
                ? { descriptions: FilteredValue }
                : { approach: FilteredValue }),
            }));
          }}
        />
        {errors.descriptions && (
          <p className="text-red-400 text-sm mt-1">{errors.descriptions}</p>
        )}
      </div>
      {/* upload files */}
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
          className="file:mr-4 file:py-2 file:px-2 file:rounded-xl file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 text-gray-400 cursor-pointer text-sm placeholder:text-sm"
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
      {/* comments */}
      {editing && (
        <div className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h2 className="text-white text-sm font-semibold mb-4">Comments</h2>
          {/* Add Comment Box */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 px-2 py-2 rounded-xl border border-gray-700 bg-gray-900 text-white outline-none focus:ring-2 focus:ring-purple-500 text-sm placeholder:text-sm"
            />
            <button
              type="button"
              onClick={handleAddComment}
              className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all text-sm "
            >
              Post
            </button>
          </div>
          {/* Comments List */}
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {formData.comments.length === 0 && (
              <p className="text-gray-400 text-sm">No comments yet.</p>
            )}
            {commentList.map((comment) => (
              <div key={comment.id} className="flex flex-col">
                <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
                  {/* Main Comment */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-purple-400">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-500">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{comment.text}</p>

                  {/* Replies Section */}
                  <div>
                    <div className="ml-6 border-l border-gray-700 pl-4 space-y-3">
                      {replyCommentList
                        .filter((reply) => reply.parentId === comment.id) // Fixed: comment.id instead of mainComment.id
                        .map((reply) => (
                          <div key={reply.id}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium text-purple-300">
                                {reply.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {reply.date}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">
                              {reply.text}
                            </p>
                          </div>
                        ))}

                      {/* Optional: Show message when no replies */}
                      {replyCommentList.filter(
                        (reply) => reply.parentId === comment.id,
                      ).length === 0 && (
                        <p className="text-gray-500 text-sm italic">
                          No replies yet
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reply Button - Only show when reply box is closed */}
                {(!sendReply.open || sendReply.id !== comment.id) && (
                  <button
                    onClick={() =>
                      setSendReply({
                        id: comment.id, // Fixed: comment.id instead of comments.id
                        open: true,
                      })
                    }
                    className="self-end m-1 text-purple-400 hover:text-purple-300"
                  >
                    Reply
                  </button>
                )}

                {/* Reply Input Box - Show only for this comment when open */}
                {sendReply.id === comment.id && sendReply.open && (
                  <div className="flex gap-2 mb-3 mt-2">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white text-sm focus:outline-none focus:border-purple-500"
                    />

                    <button
                      onClick={() => {
                        handleAddReply(comment.id);
                        // setSendReply({
                        //   id: "", // Close after sending
                        //   open: false,
                        // });
                      }}
                      className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 text-white text-sm placeholder:text-sm"
                    >
                      Post Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* button */}
      <div className="col-span-1 sm:col-span-2 mt-6 flex flex-col sm:flex-row sm:justify-end gap-4">
        {cancel ? (
          <button
            onClick={returnFalse}
            type="button"
            className="px-6 py-3 bg-gray-700 text-gray-300 rounded-xl
    hover:bg-gray-600 transition-all text-sm font-medium"
          >
            Cancel
          </button>
        ) : null}

        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 text-white
    rounded-xl shadow-lg hover:bg-indigo-700
    transition-all text-sm font-semibold"
        >
          {editing ? "Save Changes" : "Create Task"}
        </button>
      </div>
    </form>
  );
}
