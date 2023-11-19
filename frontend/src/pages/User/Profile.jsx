import { useEffect, useState } from "react";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3 bg-[azure] shadow-[0_5px_30px_5px_rgba(0,0,0,0.08)] p-5 rounded-lg ">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

          <form>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-input p-4 rounded-sm w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-input p-4 rounded-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-input p-4 rounded-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-input p-4 rounded-sm w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-[#903020] text-white py-2 px-4 rounded hover:bg-[#D04010]"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="bg-[#903020] text-white py-2 px-4 rounded hover:bg-[#D04010]"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
