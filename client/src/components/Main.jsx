import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Chatinput from "./Chatinput";
const Main = ({ currentChat, currentUser, socket }) => {
  const [messenger, setMesseger] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const handleSendMsg = async (msg) => {
    const urladd = "http://localhost:8000/api/messages/add";
    await axios.post(urladd, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...messenger];
    msgs.push({ fromSelf: true, message: msg });
    setMesseger(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMesseger((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messenger]);
  useEffect(() => {
    async function get() {
      const urlget = "http://localhost:8000/api/messages/get";
      if (currentUser) {
        const data = await axios.post(urlget, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMesseger(data.data);
      }
    }
    get();
  }, [currentChat]);

  return (
    <>
      {currentChat && (
        <div className="main main-visible" data-mobile-height="">
          <div id="chat-1" className="chat dropzone-form-js">
            <div className="chat-body">
              <div className="chat-header border-bottom py-4 py-lg-6 px-lg-8">
                <div className="container-xxl">
                  <div className="row align-items-center">
                    <div className="col-3 d-xl-none">
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item">
                          <a
                            className="text-muted px-0"
                            href="http://127.0.0.1:3000/"
                            data-chat="open"
                          >
                            <i className="icon-md fe-chevron-left"></i>
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="col-6 col-xl-6">
                      <div className="media text-center text-xl-left">
                        <div className="avatar avatar-sm d-none d-xl-inline-block mr-5">
                          <img
                            src={currentChat.avatar}
                            className="avatar-img"
                            alt=""
                          />
                        </div>

                        <div className="media-body align-self-center text-truncate">
                          <h6 className="text-truncate mb-n1">
                            {currentChat.name}
                          </h6>
                          <small className="text-muted">Online</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-3 col-xl-6 text-right">
                      <ul className="nav justify-content-end">
                        <li className="nav-item list-inline-item d-none d-xl-block mr-5">
                          <a
                            className="nav-link text-muted px-3"
                            data-toggle="collapse"
                            data-target="#chat-1-search"
                            href="#"
                            title="Search this chat"
                          >
                            <i className="icon-md fe-search"></i>
                          </a>
                        </li>

                        <li className="nav-item list-inline-item d-none d-xl-block mr-3">
                          <a
                            className="nav-link text-muted px-3"
                            href="#"
                            data-chat-sidebar-toggle="#chat-1-members"
                            title="Add People"
                          >
                            <i className="icon-md fe-user-plus"></i>
                          </a>
                        </li>

                        <li className="nav-item list-inline-item d-none d-xl-block mr-0">
                          <a
                            className="nav-link text-muted px-3"
                            href="#"
                            data-chat-sidebar-toggle="#chat-1-info"
                            title="Details"
                          >
                            <i className="icon-md fe-more-vertical"></i>
                          </a>
                        </li>
                        <li className="nav-item list-inline-item d-block d-xl-none">
                          <div className="dropdown">
                            <a
                              className="nav-link text-muted px-0"
                              href="#"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="icon-md fe-more-vertical"></i>
                            </a>
                            <div className="dropdown-menu">
                              <a
                                className="dropdown-item d-flex align-items-center"
                                data-toggle="collapse"
                                data-target="#chat-1-search"
                                href="#"
                              >
                                Search{" "}
                                <span className="ml-auto pl-5 fe-search"></span>
                              </a>

                              <a
                                className="dropdown-item d-flex align-items-center"
                                href="#"
                                data-chat-sidebar-toggle="#chat-1-info"
                              >
                                Chat Info{" "}
                                <span className="ml-auto pl-5 fe-more-horizontal"></span>
                              </a>

                              <a
                                className="dropdown-item d-flex align-items-center"
                                href="#"
                                data-chat-sidebar-toggle="#chat-1-members"
                              >
                                Add Members{" "}
                                <span className="ml-auto pl-5 fe-user-plus"></span>
                              </a>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="collapse border-bottom px-lg-8"
                id="chat-1-search"
              >
                <div className="container-xxl py-4 py-lg-6">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Search this chat"
                      aria-label="Search this chat"
                    />

                    <div className="input-group-append">
                      <button
                        className="btn btn-lg btn-ico btn-secondary btn-minimal"
                        type="submit"
                      >
                        <i className="fe-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="chat-content px-lg-8">
                <div className="container-xxl py-6 py-lg-10">
                  {messenger.map((message) => {
                    return (
                      <div className="chatcss"  ref={scrollRef}
                             key={uuidv4()}>
                        <div
                          className={`message ${
                            message.fromSelf ? "message-right" : ""
                          }`}
                        >
                          {message.fromSelf ? (
                            <div className="avatar avatar-sm mr-4 mr-lg-5">
                              <img
                                className="avatar-img"
                                src={currentUser.avatar}
                                alt=""
                              />
                            </div>
                          ) : (
                            <div className="avatar avatar-sm mr-4 mr-lg-5 d-none d-lg-block">
                              <img
                                className="avatar-img"
                                src={currentChat.avatar}
                                alt=""
                              />
                            </div>
                          )}

                          <div className="message-body">
                            <div className="message-row">
                              <div
                                className={`d-flex align-items-center ${
                                  message.fromSelf ? "justify-content-end" : ""
                                } `}
                              >
                                {message.fromSelf == false ? (
                                  <div className="message-content bg-light">
                                    <h6 className="mb-2">{currentChat.name}</h6>
                                    <div>{message.message}</div>
                                    <div className="mt-1">
                                      <small className="opacity-65">
                                        {message.time}
                                      </small>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="message-content bg-primary text-white">
                                      <div> {message.message}</div>

                                      <div className="mt-1">
                                        <small className="opacity-65">
                                          {" "}
                                          {message.time}
                                        </small>
                                      </div>
                                    </div>
                                  </>
                                )}

                                <div className="dropdown">
                                  <a
                                    className="text-muted opacity-60 ml-3"
                                    href="#"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    <i className="fe-more-vertical"></i>
                                  </a>

                                  <div className="dropdown-menu">
                                    <a
                                      className="dropdown-item d-flex align-items-center"
                                      href="#"
                                    >
                                      Edit{" "}
                                      <span className="ml-auto fe-edit-3"></span>
                                    </a>
                                    <a
                                      className="dropdown-item d-flex align-items-center"
                                      href="#"
                                    >
                                      Share{" "}
                                      <span className="ml-auto fe-share-2"></span>
                                    </a>
                                    <div
                                      className="dropdown-item d-flex align-items-center"
                                  
                                    >
                                      Delete{" "}
                                      <span className="ml-auto fe-trash-2"></span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="end-of-chat"></div>
              </div>
              <div className="chat-files hide-scrollbar px-lg-8">
                <div className="container-xxl">
                  <div className="dropzone-previews-js form-row py-4"></div>
                </div>
              </div>
              <Chatinput handleSendMsg={handleSendMsg} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
