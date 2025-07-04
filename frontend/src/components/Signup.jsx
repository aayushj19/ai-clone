// import {React,Link} from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/signup",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );
      alert(data.message || "Signup successful");
      navigate("/login");
    } catch (e) {
      const message = error?.response?.data?.errors || "Invalid credentials";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(value);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="bg-[#1e1e1e]  text-white w-full max-w-md rounded-2xl p-6 shadow-lg">
        {/* {Heading} */}
        <h1 className="text-white items-center justify-center text-center">
          Signup
        </h1>

        {/* {firstName} */}
        <div className="mb-4 mt-2 ">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        {/* {lastName} */}
        <div className="mb-4 mt-2">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        {/* {email} */}
        <div className="mb-4 mt-2">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* {password} */}
        <div className="mb-4 mt-2 relative">
          <input
            className="w-full bg-transparent border border-gray-600 rounded-md px-4 py-2 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#7a6ff0]"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="absolute right-3 top-3 text-gray-400">
            {" "}
            <Eye size={18} />{" "}
          </span>
        </div>

        {/* {Error Message} */}
        {error && <span className="text-red-500 text-sm mb-4">{error}</span>}

        {/* {Terms and Conditions} */}
        <p className="text-xs text-gray-400 mt-4 mb-6">
          By signing up or logging in, you agree to Deepseek's{" "}
          <a className="underline" href="">
            Terms of Use
          </a>{" "}
          and{" "}
          <a className="underline" href="">
            Privacy Policy
          </a>{" "}
          .
        </p>

        {/* {Signup Button} */}
        <button
          disabled={loading}
          onClick={handleSignup}
          className="w-full bg-[#7a6ff6] hover:bg-[#6c61a6] font-semibold text-white py-3 transition rounded-lg disabled:opacity-50"
        >
          {loading ? "Signing..." : "Signup"}
        </button>

        {/* {Links} */}
        <div className="flex justify-between mt-4 text-sm">
          {" "}
          <a className="text-[#7a6ff6] hover:underline" href="">
            {" "}
            Already have an account?
          </a>
          <Link className="text-[#7a6ff6] hover:underline" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
