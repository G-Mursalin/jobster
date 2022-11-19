// React
import React from "react";
// CSS
import Wrapper from "./../assets/wrappers/BigSidebar";
// React Redux
import { useSelector } from "react-redux";
//components
import NavLinks from "./NavLinks";
import Logo from "../components/Logo";

const BigSideBar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen
            ? "sidebar-container "
            : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
