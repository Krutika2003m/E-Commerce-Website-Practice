import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"


function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Temporary user registration
    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful!");

    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Create Account</h1>
        <p>Register for your ShopEasy account</p>

        <form onSubmit={handleRegister}>

          <div className="form-group">  <label>Name</label>

            <input  type="text"  placeholder="Enter your name"  value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group"> <label>Email</label>
            <input  type="email"  placeholder="Enter your email"  value={email}
              onChange={(e) => setEmail(e.target.value)}  />
          </div>

          <div className="form-group">  <label>Password</label>
            <input  type="password"  placeholder="Enter password"  value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">  <label>Confirm Password</label>
            <input  type="password" placeholder="Confirm password"  value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <button type="submit" className="auth-button">  Register </button>

        </form>

        <p className="register-text"> Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;