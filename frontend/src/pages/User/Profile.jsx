import { useEffect, useState } from "react";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";

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
        </form>
      </div>
    </div>
  );
};

export default Profile;
