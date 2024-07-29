import { createContext, useContext, useState } from "react";
import runChat from "../../Config/Baymax";
// import React, { useEffect, useState, useRef } from "react";
// import { PiCompassThin } from "react-icons/pi";
// import { SlBulb } from "react-icons/sl";
// import { LuMessageSquare } from "react-icons/lu";
// import { FaCode } from "react-icons/fa6";
// import { BiImageAdd } from "react-icons/bi";
// import { MdMicNone } from "react-icons/md";
// import { LuSendHorizonal } from "react-icons/lu";
// import { FaLink } from "react-icons/fa";
// import { IoReorderThreeOutline } from "react-icons/io5";
// import { Myprovider } from "../AI_Context/AiContext";
// import Prompt from "../Prompt/Prompt";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { easeIn, easeInOut, motion } from "framer-motion";
// import "../CSS/Global.css";
// import Loader from "../Loader/Loader";
// import { IoMdSend } from "react-icons/io";
// import io from "socket.io-client";
const Ai_context = createContext();

const ContextProvider = ({ children }) => {
    const [data, setData] = useState("");
    const [prompt, setPrompt] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [allprompt, setAllprompt] = useState([]);
    const [allresponse, setAllresponse] = useState([]);
    const [loader, setLoader] = useState(false);
    const [history, setHistory] = useState(false);
    const [recent, setRecent] = useState("");
    const [recentans, setRecentans] = useState("");
    const [menu, setMenu] = useState(true);
    const [mobile, setMobile] = useState(true);
    const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]); // State to store chat messages
//   const [isLoading, setIsLoading] = useState(false); // State to manage loading
//   const [loadingMessage, setLoadingMessage] = useState(""); // State for loading message

//   const chatBoxRef = useRef(null);
    const sent = async (prompt) => {
        setQuestion(prompt);
        setLoader(true);
        try {
            const response = await runChat(prompt);
            setAnswer(response);
            setAllresponse([...allresponse, response]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoader(false);
        }
    };

    const passData = {
        data,
        setData,
        sent,
        prompt,
        setPrompt,
        question,
        answer,
        allprompt,
        setAllprompt,
        loader,
        setLoader,
        allresponse,
        setAllresponse,
        history,
        setHistory,
        recent,
        setRecent,
        recentans,
        setRecentans,
        menu,
        setMenu,
        mobile,
        setMobile,
    };

    return <Ai_context.Provider value={passData}>
        {children}
    </Ai_context.Provider>;
};

const Myprovider = () => useContext(Ai_context);

export { Ai_context, Myprovider, ContextProvider };
