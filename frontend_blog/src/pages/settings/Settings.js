import { useState } from "react";
import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import config from "../../config/config";

export default function Settings() {
  const [profilePicture, setProfilePicture] = useState(
    "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
  );
  const [username, setUsername] = useState("Safak");
  const [email, setEmail] = useState("safak@gmail.com");
  const [password, setPassword] = useState("");

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    // Append file if exists
    const fileInput = document.getElementById("fileInput");
    if (fileInput.files.length > 0) {
      formData.append("profile_picture", fileInput.files[0]);
    }

    try {
      const response = await axios.put(
        `${config.API_BASE_URL}/api/update-user/`, // Update with your actual endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile updated successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Failed to update profile:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={profilePicture}
              alt="Profile"
              className="settingsPPImg"
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={handleProfilePictureChange}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder="Safak"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="safak@gmail.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
