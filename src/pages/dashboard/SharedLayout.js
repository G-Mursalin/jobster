// React
import React from "react";
// React Router
import { Outlet } from "react-router-dom";
// CSS
import Wrapper from "../../assets/wrappers/SharedLayout";
// Components
import NavBar from "../../components/NavBar";
import SmallSideBar from "../../components/SmallSideBar";
import BigSideBar from "../../components/BigSideBar";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSideBar />
        <BigSideBar />
        <div>
          <NavBar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
