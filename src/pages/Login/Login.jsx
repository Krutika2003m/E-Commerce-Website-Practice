import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"


function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    //  login
    localStorage.setItem("token", "user_logged_in");

    alert("Login successful!");

    navigate("/products");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Welcome Back</h1>
        <p>Login to ShopEasy account</p>

        <form onSubmit={handleLogin}>

          <div className="form-group">
            <label>Email</label>

            <input type="email"  placeholder="Enter your email"  value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input  type="password"  placeholder="Enter your password"  value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-button">
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;