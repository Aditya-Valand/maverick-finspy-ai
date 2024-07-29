import React, { useEffect, useState, useRef } from "react";
import { PiCompassThin } from "react-icons/pi";
import { SlBulb } from "react-icons/sl";
import { LuMessageSquare } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import { BiImageAdd } from "react-icons/bi";
import { MdMicNone } from "react-icons/md";
import { LuSendHorizonal } from "react-icons/lu";
import { FaLink } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
import { Myprovider } from "../AI_Context/AiContext";
import Prompt from "../Prompt/Prompt";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { easeIn, easeInOut, motion } from "framer-motion";
import "../CSS/Global.css";
import Loader from "../Loader/Loader";
import { IoMdSend } from "react-icons/io";
import io from "socket.io-client";

const Main = () => {
  const {
    data,
    setData,
    sent,
    prompt,
    setPrompt,
    allprompt,
    setAllprompt,
    menu,
    setMenu,
    mobile,
    setMobile,
  } = Myprovider();

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [isLoading, setIsLoading] = useState(false); // State to manage loading
  const [loadingMessage, setLoadingMessage] = useState(""); // State for loading message
  // const chatBoxRef = useRef(null);

  const chatBoxRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    const socketConnection = io.connect('http://127.0.0.1:5000');

    socketConnection.on('connect', () => {
      console.log('Connected to server');
    });

    socketConnection.on('response', (data) => {
      setMessages(prevMessages => [...prevMessages, { type: 'ai', text: data.message }]); // Add new message to state
      setIsLoading(false);
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to the bottom when new messages are added
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handlechange = (e) => {
    setData(e.target.value);
  };

  const handleFileChange = (e) => {
    // Handle file change logic here
    const file = e.target.files[0];
    console.log(file); // For demonstration, logging the file
  };

  const handleClick = () => {
    if (data.length === 0) {
      alert("Please enter a prompt");
    } else {
      setMessages(prevMessages => [...prevMessages, { type: 'user', text: data }]); // Add user message to state
      sent(data);
      setData("");
      setPrompt(true);
      setAllprompt([...allprompt, data]);
      // setLoadingMessage("Sending your message..."); // Set loading message
      setIsLoading(true);
      // setLoader(true); // Show loader while waiting for response
      socket.emit('message', { 'message': data }); // Emit message to server
      // sent(ai-message)
      setAnswer(msg.ai-message);
      // setLoader(false);
    }
  };

  const handlesuggestion = (suggestionId) => {
    console.log(suggestionId);
    const value = document.getElementById(suggestionId).innerText;
    setData(value);
  };

  const handlekey = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handlekeydown = (e) => {
    if (e.key === "Delete") {
      setPrompt(false);
      setAllprompt([]);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handlekeydown);
    return () => {
      window.removeEventListener("keydown", handlekeydown);
    };
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="lg:w-screen sm:w-screen flex flex-col items-center overflow-y-scroll scroll-smooth">
        <div className="h-screen bg-white flex flex-col justify-between">
          <div className="lg:w-10/12 h-10 bg-white flex justify-between items-center p-2 z-20">
            <div
              title="Collapse menu"
              className="w-10 h-10 lg:hidden sm:block flex justify-center items-center rounded-full cursor-pointer hover:bg-slate-200"
            >
              <IoReorderThreeOutline
                className="text-2xl"
                onClick={() => setMobile(!mobile)}
              />
            </div>
            <h1 className="text-xl ms-2 mt-8">FinSpy Ai</h1>
            <div className="w-10 h-10 flex justify-center items-center overflow-hidden mt-8 rounded">
              <img src="/logo.png" className="w-screen" />
            </div>
          </div>

          {prompt ? (
            <Prompt />
          ) : (
            <div className="middle-part w-12/12 sm:gap-10 flex flex-col items-center p-3">
              <motion.div
                animate={{ y: [-2000, 0] }}
                transition={{ duration: 1 }}
                className="text-center"
              >
                <h1 className="ms-10 lg:text-6xl sm:text-5xl">
                  <span
                    style={{
                      background:
                        "-webkit-linear-gradient(16deg, #4b90ff , #ff5546)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Hi, I'm FinSpy Ai
                  </span>
                </h1>
                <h1
                  className="ms-10 lg:text-6xl sm:text-5xl"
                  style={{ color: "#C4C7C5" }}
                >
                  How can I help you today?
                </h1>
              </motion.div>
            </div>
          )}

          <div className="w-12/12 bg-white flex flex-col">
            <div ref={chatBoxRef} className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.type === 'ai' ? 'ai-message' : 'user-message'}`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <motion.div
              className="w-12/12 bg-white flex items-center relative"
              animate={{ x: [-2000, 0] }}
              transition={{ duration: 1, ease: easeInOut }}
            >
              <div className="flex items-center w-full bg-gray-100 p-2 rounded-full mt-60">
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-xl text-gray-500 mr-2"
                >
                  <FaLink />
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <input
                  type="text"
                  placeholder="Ask me further questions..."
                  className="flex-1 outline-none h-10 ps-3 rounded-full"
                  style={{ background: "#F0F4F9" }}
                  value={data}
                  onChange={handlechange}
                  onKeyDown={handlekey}
                />
                <IoMdSend onClick={handleClick} pl-3 />
              </div>
            </motion.div>
          </div>
          <h1 className="text-center">
            The answer provided by this AI tool could be wrong, so don't
            take it seriously
          </h1>
        </div>
      </div>
    </>
  );
};

export default Main;
