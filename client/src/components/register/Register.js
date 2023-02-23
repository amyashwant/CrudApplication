import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordagain] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    const user = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/add-user",
        user
      );
      navigate("/login");
      
    } catch (err) {
     
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo"> Register with your email and password</h3>
          <span className="loginDesc">
          
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              className="loginInput"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              placeholder="Email"
              required
              className="loginInput"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              placeholder="Password"
              required
              type="password"
              className="loginInput"
              minLength="6"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              placeholder="Password Again"
              required
              type="password"
              className="loginInput"
              onChange={(e) => {
                setPasswordagain(e.target.value);
              }}
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
