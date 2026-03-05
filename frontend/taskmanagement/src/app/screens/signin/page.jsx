"use client";
import react, { useState } from "react";
import { useUser } from "../../contexts/userContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getProfile, login } from "@/services/auth_services";
import TopLoader from "@/app/components/loader";

export default function SigninPage() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUserdetailContext } = useUser();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      setLoading(true);
      const data = await login({
        email: formData.email,
        password: formData.password,
      });
      const profile = await getProfile();
      console.log("Profile data:", data);
      setUserdetailContext(profile);
      setLoading(false);
      if (profile.role_id === 1) {
        router.replace("/screens/manager");
      }
      if (profile.role_id === 2) {
        router.replace("/screens/employee");
      }
      console.log("login Sucess", data);
      toast.success("login Sucessfull");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          toast.error(`Error ${status} , Invalid email or password`);
          setLoading(false);
          return;
        }

        if (status === 403) {
          toast.error(`Error ${status}, Forbidden`);
          setLoading(false);
          return;
        }
      }
      toast.error("Signin failed.Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      {loading && (
        <div className="absolute z-12 ">
          <TopLoader />
        </div>
      )}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 transition-all hover:scale-[1.01]">
        <h1 className="mb-8 text-center text-2xl font-extrabold text-white tracking-tight">
          Signin Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "pankaj@gmail.com",
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "••••••••",
            },
          ].map((field) => (
            <div key={field.label} className="flex flex-col">
              <label className="mb-2 ml-1 text-sm font-semibold text-gray-300">
                {field.label}
              </label>

              <input
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                value={formData[field.name]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [field.name]: e.target.value,
                  });
                }}
                className="px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm placeholder:text-sm"
              />
              {errors[field.name] && (
                <p className="text-red-400 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl shadow-md hover:bg-purple-700 active:scale-95 transition-all uppercase tracking-wider text-sm"
          >
            Signin
          </button>
        </form>
      </div>
    </div>
  );
}
