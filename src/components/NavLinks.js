// React
import React from "react";
// React Router
import { NavLink } from "react-router-dom";
// React Redux
import { useDispatch } from "react-redux";
// Utils
import links from "../utils/links";

const NavLinks = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  return (
    <div className="nav-links">
      {links.map((val) => (
        <NavLink
          to={val.path}
          key={val.id}
          onClick={() => dispatch(toggleSidebar())}
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <span className="icon">{val.icon}</span> {val.text}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;
