import { Link, Navigate } from "react-router-dom";
import "../Signup/auth.css";
import { useState } from "react";
import { authRepository } from "../../modules/auth/auth.repository";
import { useCurrentUserStore } from "../../modules/auth/current-user.state";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { currentUser, setCurrentUser } = useCurrentUserStore();
  if (currentUser) return <Navigate to="/" />;

  const signin = async () => {
    if (email === "" || password === "") return;

    const { user, token } = await authRepository.signin(email, password);
    localStorage.setItem("token", token);
    setCurrentUser(user);
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-title">Sign in</h1>
        <p className="signup-subtitle">メールアドレスでログインしてください</p>

        <div>
          <div className="form-group">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              value={email}
              required
            />
          </div>

          <div className="form-group">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              value={password}
              required
            />
          </div>
          <button
            onClick={signin}
            type="submit"
            disabled={email == "" || password == ""}
            className="continue-button"
          >
            Continue
          </button>
        </div>
        <p className="signin-link">
          ユーザー登録は<Link to="/signup">こちら</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
