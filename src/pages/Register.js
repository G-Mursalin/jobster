// React
import React, { useState, useEffect } from "react";
// CSS
import Wrapper from "./../assets/wrappers/RegisterPage";
// React Tostify
import { toast } from "react-toastify";
// React Router
import { useNavigate } from "react-router-dom";
// React redux-toolkit
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
// Components
import Logo from "./../components/Logo";
import FormRow from "../components/FormRow";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields");
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));

    setValues(initialState);
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "login" : "register"}</h3>

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        {values.isMember ? (
          <>
            <p>Login Email: test@gmail.com</p>
            <p>Login Password: 123456789</p>
          </>
        ) : (
          " "
        )}
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {values.isMember ? "login" : "submit"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button className="member-btn" type="button" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
