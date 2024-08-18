import { useState } from "react";
import axios from "axios";
import config from "../../config/config";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/blogapi/login/`, {
        email,
        password,
      });

      console.log("Login successful:", response.data);
      // You can save the token or user info to local storage or state management
      localStorage.setItem("user", JSON.stringify(response.data));
      // Redirect to another page or update the UI to reflect login status
    } catch (err) {
      console.error("Login failed:", err.response?.data);
      setError(err.response?.data);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="loginInput"
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      {error && <div className="loginError">{JSON.stringify(error)}</div>}
      <button className="loginRegisterButton">Register</button>
    </div>
  );
}
