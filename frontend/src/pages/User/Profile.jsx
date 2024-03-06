import { useEffect, useState } from "react";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { CustomCSS } from "../../components/Custom/CustomCSS";
import { CustomSnippets } from "../../components/Custom/CustomSnippets";
import { Container, Toolbar } from "@mui/material";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile Updated Successfully!");
        console.log(res);
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Toolbar />
      <Toolbar />
      {CustomSnippets.Heading({ heading: "Update Profile" })}

      <form onSubmit={handleSubmit}>
        <div className={CustomCSS.gridTwo}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className={CustomCSS.inputField}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className={CustomCSS.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className={CustomCSS.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className={CustomCSS.inputField}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between col-span-full">
            <button type="submit" className={CustomCSS.buttonSubmit}>
              Update
            </button>

            <Link to="/user-orders" className={CustomCSS.buttonUpdate}>
              My Orders
            </Link>
          </div>
        </div>
      </form>
      {loadingUpdateProfile && <Loader />}
    </Container>
  );
};

export default Profile;
