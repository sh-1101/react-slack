import { Link, Navigate } from "react-router-dom";
import "./auth.css";
import { useState } from "react";
import { authRepository } from "../../modules/auth/auth.repository";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser, setCurrentUser } = useCurrentUserStore();
  if (currentUser) return <Navigate to="/" />;

  const signup = async () => {
    if (name === "" || email === "" || password === "") return;
    const { user, token } = await authRepository.signup(name, email, password);
    setCurrentUser(user);
    console.log(user, token);
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-title">Sign up to continue</h1>
        <p className="signup-subtitle">
          Use your email or another service to continue
        </p>

        <div>
          <div className="form-group">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Full name"
              required
              value={name}
            />
          </div>

          <div className="form-group">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              value={email}
            />
          </div>
          <div className="form-group">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              value={password}
            />
          </div>
          <button
            type="submit"
            className="continue-button"
            disabled={name == "" || email == "" || password == ""}
            onClick={signup}
          >
            Continue
          </button>
        </div>
        <p className="signin-link">
          ログインは <Link to="/signin">こちら</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
