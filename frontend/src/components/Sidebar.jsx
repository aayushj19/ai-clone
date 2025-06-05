import React from "react";
import { useState } from "react";
import { X, LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { useEffect } from "react";
import logo from "../assets/logo.png";
const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [promptHistory, setPromptHistory] = useState([]);
  const [, setAuthUser] = useAuth();

  const handleLogout = async() => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/user/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    //   alert(data.message);
      setAuthUser(null);
      window.location.reload();
    } catch (e) {
      alert(e);
    }
};

    useEffect(() => {
    const savedPrompts = JSON.parse(localStorage.getItem(`promtHistory_${user._id}`)) || [];
    setPromptHistory(savedPrompts);
  }, [setPromptHistory]);

    const newChat = ()=>{
        // setPromptHistory(`promtHistory_${user._id}`);    
        localStorage.removeItem(`promtHistory_${user._id}`);
        window.location.reload();

    }
  return (
    <div className="h-full flex flex-col bg-[#202123]">
      {/* {Header} */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between ">
        <div className="text-xl font-bold text-white ">DeepSeek</div>
        <button className="text-gray-300 w-6 h-6">
          <X className="" />
        </button>
      </div>

      {/* {History} */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        <button onClick = {newChat}className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl mb-4">
          + New Chat    
        </button>
        {promptHistory.length === 0 ? (
          <div className="text-gray-500 text-sm mt-20 text-center">
            You have no prompts yet
          </div>
        ) : (
          promptHistory.map((prompt, index) => (
            <div
              key={index}
              className="text-white bg-gray-800 p-2 rounded text-sm mb-2"
            >
              {prompt.content}
            </div>
          ))
        )}
      </div>
      {/* {Footer} */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 cursor-pointer">
            <img className="rounded-full w-9 h-9 p-1" src={logo} alt="" />
            <span className="text-gray-300">
              {user ? user.firstName : "My Profile"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex text-smitems-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700 duration-300 transition"
          >
            <LogOut className="" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
