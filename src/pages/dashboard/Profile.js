// React
import React, { useState } from "react";
// React Redux
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/user/userSlice";
// CSS
import Wrapper from "./../../assets/wrappers/DashboardFormPage";
// React Tostify
import { toast } from "react-toastify";
// Components
import FormRow from "../../components/FormRow";

const Profile = () => {
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    location: user?.location || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, location } = userData;

    if (!name || !email || !location) {
      toast.error("Please Fill Out All Fields");
      return;
    }

    dispatch(updateUser({ name, email, location }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>

        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            handleChange={handleChange}
          />

          <FormRow
            type="email"
            name="email"
            value={userData.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
