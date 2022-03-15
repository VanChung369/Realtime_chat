import React, { useEffect, useState } from "react";
import Logo from "../assets/images/brand.svg";
const Navbar = ({ currentUser }) => {
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatar);
    }
  }, [currentUser]);

  return (
    <>
      {currentUserImage && (
        <div className="navigation navbar navbar-light justify-content-center py-xl-7">
          <a href="#" className="d-none d-xl-block mb-6">
            <img
              src={currentUserImage}
              className="mx-auto fill-primary"
              data-inject-svg=""
              alt="Logo"
              style={{ height: "46px", borderRadius: "25px" }}
            />
          </a>
          <ul
            className="nav navbar-nav flex-row flex-xl-column flex-grow-1 justify-content-between justify-content-xl-center py-3 py-lg-0"
            role="tablist"
          >
            <li className="nav-item d-none d-xl-block invisible flex-xl-grow-1">
              <a
                className="nav-link position-relative p-0 py-xl-3"
                href="#"
                title=""
              >
                <i className="icon-lg fe-x"></i>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link position-relative p-0 py-xl-3"
                data-toggle="tab"
                href="#tab-content-create-chat"
                title="Create chat"
                role="tab"
              >
                <i className="icon-lg fe-edit"></i>
              </a>
            </li>
            <li className="nav-item mt-xl-9">
              <a
                className="nav-link position-relative p-0 py-xl-3 active"
                data-toggle="tab"
                href="#tab-content-dialogs"
                title="Chats"
                role="tab"
              >
                <i className="icon-lg fe-message-square"></i>
                <div className="badge badge-dot badge-primary badge-bottom-center"></div>
              </a>
            </li>
            <li className="nav-item mt-xl-9 d-none d-xl-block flex-xl-grow-1">
              <a
                className="nav-link position-relative p-0 py-xl-3"
                data-toggle="tab"
                href="#tab-content-friends"
                title="Friends"
                role="tab"
              >
                <i className="icon-lg fe-users"></i>
              </a>
            </li>
            <li className="nav-item mt-xl-9">
              <a
                className="nav-link position-relative p-0 py-xl-3"
                data-toggle="tab"
                href="#tab-content-user"
                title="Settings"
                role="tab"
              >
                <i className="icon-lg fe-settings"></i>
              </a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
