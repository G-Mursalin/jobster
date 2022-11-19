// React
import React, { useState } from "react";
// CSS
import Wrapper from "./../assets/wrappers/Navbar";
// React Redux
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../features/userSlice";
// React Icons
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
// Components
import Logo from "./Logo";

const NavBar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => console.log("toggle logout dropdown")}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className="dropdown show-dropdown">
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                console.log("logout user");
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;
