"use client";
import react, { useState } from "react";
import Link from "next/link";
import { useUser } from "../../contexts/userContext";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth_services";
import TopLoader from "../../components/loader";
import toast from "react-hot-toast";

export default function RegistrationPage() {
  // const { setUserdetail } = useUser();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: 0,
  });

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

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    // if errors exist → stop submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ no errors → submit to context
    setErrors({});

    try {
      setLoading(true);
      const response = await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role_id: formData.role,
      });
      console.log(response);
      setLoading(false);
      toast.success("Registration successful!.");
      router.replace("/screens/signin");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
      setLoading(false);
    }

    // console.log("hello world")
    // console.log("login detail:",formData);
    // if(formData.role === "Manager") {
    //   router.replace("/screens/manager")
    // }
    // if(formData.role === "Employee"){
    //   router.replace("/screens/employee")

    // }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      {loading && (
        <div className="absolute z-12 ">
          <TopLoader />
        </div>
      )}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 transition-all hover:scale-[1.01]">
        <h1 className="mb-8 text-center text-4xl font-extrabold text-white tracking-tight">
          Register Yourself
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              name: "fullName",
              label: "Name",
              type: "text",
              placeholder: "Pankaj bagauli",
            },
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
                value={FormData[field.name]}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    [field.name]: e.target.value,
                  });
                }}
                className="px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white placeholder-gray-500 outline-none transition-all focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors[field.name] && (
                <p className="text-red-400 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          {/* Role Selection */}

          <div className="py-2">
            <h3 className="text-m font-semibold text-gray-300 mb-3 text-center">
              Select Your Role
            </h3>

            {/* radio row */}
            <div className="flex justify-center gap-6">
              {[1, 2].map((role) => (
                <label
                  key={role}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        role: parseInt(e.target.value),
                      })
                    }
                    className="w-4 h-4 text-purple-500 border-gray-600 focus:ring-purple-500"
                  />
                  <span className="font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
                    {role === 1 ? "Manager" : "Employee"}
                  </span>
                </label>
              ))}
            </div>

            {/* error below */}
            {errors.role && (
              <p className="text-red-400 text-sm text-center mt-1">
                {errors.role}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl shadow-md hover:bg-purple-700 active:scale-95 transition-all uppercase tracking-wider text-sm"
          >
            Create Account
          </button>
        </form>
        <div className="mt-3 flex text-m font-medium text-gray-300 justify-center">
          <h3>Already have an account ? </h3>
          <Link href="/screens/signin" className="ml-2 text-blue-400">
            {" "}
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
