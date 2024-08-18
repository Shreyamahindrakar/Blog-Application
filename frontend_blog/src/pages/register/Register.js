import { useState } from "react";
import axios from "axios";
import config from "../../config/config";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/blogapi/register/`, {
        username,
        email,
        password,
      });

      setSuccess(true);
      console.log("Registration successful:", response.data);
    } catch (err) {
      console.error("Registration failed:", err.response?.data);
      setError(err.response?.data);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      {error && <div className="registerError">{JSON.stringify(error)}</div>}
      {success && <div className="registerSuccess">Registration successful!</div>}
      <button className="registerLoginButton">Login</button>
    </div>
  );
}
