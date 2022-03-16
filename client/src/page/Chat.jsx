import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io }  from "socket.io-client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Welcome from "../components/Welcome";
import Main from "../components/Main";
const Chat = () => {
  const navigate = new useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  // chay dung 1 lan sau khi render
  useEffect(() => {
    async function checkuser() {
      if (localStorage.getItem("chat-app") == null) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app")));
      }
    }
    checkuser();
  }, []);

  useEffect(() => {
    async function data() {
      if (currentUser) {
        if (currentUser.avatar) {
          const url = "http://localhost:8000/api/user/alluser";
          const datauser = await axios.get(`${url}/${currentUser._id}`);
          setContacts(datauser.data);
        } else {
          navigate("/Signup");
        }
      }
    }
    data();
  }, [currentUser]);
  useEffect(() => 
  {
    const host ="http://localhost:8000";
    if (currentUser) {
      socket.current = io(host,{ transports : ['websocket'] }); // connect den server
      socket.current.emit("add-user", currentUser._id); // phat su kien
    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <div className="layout">
        <Navbar currentUser={currentUser} />
        <Sidebar
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <Main  currentChat={currentChat} currentUser={currentUser} socket ={socket}/>
        )}
      </div>
    </>
  );
};

export default Chat;
