import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

import "../index.css";
const Sidebar = ({ contacts, currentUser, changeChat }) => {
  const navigate = new useNavigate();
  const handleClick = async () => {
      localStorage.clear();
      navigate("/login");
  };
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      <div className="sidebar">
        <div className="tab-content h-100" role="tablist">
          <div
            className="tab-pane fade h-100 show active"
            id="tab-content-dialogs"
            role="tabpanel"
          >
            <div className="d-flex flex-column h-100">
              <div className="hide-scrollbar">
                <div className="container-fluid py-6">
                  <h2 className="font-bold mb-6">Chat</h2>
                  <form className="mb-6">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search for messages or users..."
                        aria-label="Search for messages or users..."
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
                  </form>
                  <div
                    className="text-center hide-scrollbar d-flex my-7"
                    data-horizontal-scroll=""
                  >
                    {contacts.map((contact, index) => {
                      return (
                        <div
                          className="d-block text-reset mr-7 mr-lg-6"
                          key={contact._id}
                          onClick={() => changeCurrentChat(index, contact)}
                        >
                          <div className="avatar avatar-sm avatar-online mb-3">
                            <img
                              className="avatar-img"
                              src={contact.avatar}
                              alt="Image Description"
                            />
                          </div>
                          <div className="small">{contact.name}</div>
                        </div>
                      );
                    })}
                  </div>
                  <nav className="nav d-block list-discussions-js mb-n6">
                    {contacts.map((contact, index) => {
                      return (
                        <div
                          className="text-reset nav-link p-0 mb-6"
                          key={contact._id}
                          onClick={() => changeCurrentChat(index, contact)}
                        >
                          <div className="card card-active-listener">
                            <div
                              className={`card-body ${
                                index === currentSelected ? "selected" : ""
                              }`}
                            >
                              <div className="media">
                                <div className="avatar mr-5">
                                  <img
                                    className="avatar-img"
                                    src={contact.avatar}
                                    alt="Bootstrap Themes"
                                  />
                                </div>

                                <div className="media-body overflow-hidden">
                                  <div className="d-flex align-items-center mb-1">
                                    <h6 className="text-truncate mb-0 mr-auto">
                                      {contact.name}
                                    </h6>
                                    <p className="small text-muted text-nowrap ml-4">
                                      10:42 am
                                    </p>
                                  </div>
                                  <div className="text-truncate">
                                    Anna:How are you?
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="badge badge-circle badge-primary badge-border-light badge-top-right">
                              <span>3</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade h-100 "
            id="tab-content-user"
            role="tabpanel"
          >
            <div className="d-flex flex-column h-100">
              <div className="hide-scrollbar">
                <div className="container-fluid py-6">
                  <h2 className="font-bold mb-6">Profile</h2>
                  <div className="card mb-6">
                    <div className="card-body">
                      <div className="text-center py-6">
                        <div className="avatar avatar-xl mb-5">
                          <img
                            className="avatar-img"
                            src="assets\images\avatars\12.jpg"
                            alt=""
                          />
                        </div>

                        <h5>OMG</h5>
                      </div>
                    </div>
                  </div>
                  <div className="card mb-6">
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0 py-6">
                          <div className="media align-items-center">
                            <div className="media-body">
                              <p className="small text-muted mb-0">Country</p>
                              <p>Viet Nam</p>
                            </div>
                            <i className="text-muted icon-sm fe-globe"></i>
                          </div>
                        </li>

                        <li className="list-group-item px-0 py-6">
                          <div className="media align-items-center">
                            <div className="media-body">
                              <p className="small text-muted mb-0">Phone</p>
                              <p>+84 04 32 68 24 1</p>
                            </div>
                            <i className="text-muted icon-sm fe-mic"></i>
                          </div>
                        </li>

                        <li className="list-group-item px-0 py-6">
                          <div className="media align-items-center">
                            <div className="media-body">
                              <p className="small text-muted mb-0">Email</p>
                              <p>Vanchung917@gmail.com</p>
                            </div>
                            <i className="text-muted icon-sm fe-mail"></i>
                          </div>
                        </li>

                        <li className="list-group-item px-0 py-6">
                          <div className="media align-items-center">
                            <div className="media-body">
                              <p className="small text-muted mb-0">Time</p>
                              <p>10:03 am</p>
                            </div>
                            <i className="text-muted icon-sm fe-clock"></i>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card mb-6">
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item px-0 py-6">
                          <a href="https://twitter.com/" className="media text-muted">
                            <div className="media-body align-self-center">
                              Twitter
                            </div>
                            <i className="icon-sm fe-twitter"></i>
                          </a>
                        </li>

                        <li className="list-group-item px-0 py-6">
                          <a href="https://www.facebook.com/" className="media text-muted">
                            <div className="media-body align-self-center">
                              Facebook
                            </div>
                            <i className="icon-sm fe-facebook"></i>
                          </a>
                        </li>

                        <li className="list-group-item px-0 py-6">
                          <a href="https://github.com/VanChung369" className="media text-muted">
                            <div className="media-body align-self-center">
                              Github
                            </div>
                            <i className="icon-sm fe-github"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-lg btn-block btn-basic d-flex align-items-center"
                      >
                        Settings
                        <span className="fe-settings ml-auto"></span>
                      </button>
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        className="btn btn-lg btn-block btn-basic d-flex align-items-center"
                      onClick={handleClick} >
                        Logout
                        <span className="fe-log-out ml-auto"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
