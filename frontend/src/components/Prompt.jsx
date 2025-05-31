import { Paperclip, ArrowUp, Bot, Globe } from "lucide-react";
import logo from "../assets/logo.png";
import { useState } from "react";
import React from "react";

const Prompt = () => {
   const [inputValue, setInputValue] = useState('');
   const [typedMessage, setTypedMessage] = useState('');

  const handleSend =()=>{
    const trimmedMessage = inputValue.trim();
    if(!trimmedMessage) return
    setTypedMessage(trimmedMessage);
    setInputValue('');

  } 
  const handleDown = (e) => {
    if(e.key === 'Enter'){
      handleSend();
    }
  }
  return (
    <div className="flex flex-col items-center justify-between flex-1 w-full px-4 pb-4 md:pb-8">
      {/* {Greetings} */}
      <div className="mt-16 text-center">
        <div className="flex items-center justify-center gap-2">
          <img className="h-6 md:h-8" src={logo} alt="" />
          <h1 className="text-3xl font-semibold text-white mb-2">
            Hi,I'm DeepSeek
          </h1>
        </div>
        <p className="text-gray-400 text-base mt-2">
          How can I help you today?
        </p>
      </div>

      {/* {Propmt} */}
      <div className="w-full max-w-4xl overflow-y-auto mt-6 mb-4 space-y-4 max-h-[60vh] px-1">
        {typedMessage && (
          <div className="w-full flex justify-end text-white"  >
            <div className="bg-blue-700 text-white self-end max-w-[75%] px-4 py-2 rounded-xl">
              {typedMessage} 
            </div>
          </div>
        )}
      </div>

      {/* {Input Box} */}
      <div className="w-full max-w-4xl relative mt-auto">
        <div className="bg-[#2f2f2f] rounded-[2rem] px-4 py-8 shadow-md">
          <input
            className="bg-transparent mb-2 w-full text-white placeholder-gray-400 text-lg outline-none"
            type="text"
            placeholder="💬 Message DeepSeek"
            value = {inputValue}
            onKeyDown={handleDown}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="flex items-center justify-between mt-4 gap-4">
            <div className="flex gap-2">
              <button className="flex items-center gap-2 border border-gray-500 text-white text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition">
                <Bot />
                DeepThink (R1)
              </button>
              <button className="flex items-center gap-2 border border-gray-500 text-white text-base px-3 py-1.5 rounded-full hover:bg-gray-600 transition">
                <Globe />
                Search
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-white transition">
                {" "}
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                onClick={handleSend}
                className="bg-gray-500 hover:bg-blue-900 p-2 rounded-full text-white transition">
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
