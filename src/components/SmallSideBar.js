// React
import React from "react";
// CSS
import Wrapper from "./../assets/wrappers/SmallSidebar";
// React Icons
import { FaTimes } from "react-icons/fa";
// React Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../features/user/userSlice";
// React Router
import { NavLink } from "react-router-dom";
// Utils
import links from "../utils/links";
// Components
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const SmallSideBar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button
            className="close-btn"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks isToggleSidebar={true} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;
