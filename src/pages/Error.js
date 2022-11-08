// React
import React from "react";
// React Router
import { Link } from "react-router-dom";
// Images
import img from "./../assets/images/not-found.svg";
import Wrapper from "./../assets/wrappers/ErrorPage";

const Error = () => {
  return (
    <Wrapper>
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">Back to home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
