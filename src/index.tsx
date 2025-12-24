import React, { CSSProperties, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  MdAccountCircle,
  MdEmail,
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

/* ICON CASTS (TYPE SAFE) */
const AccountIcon = MdAccountCircle as React.FC<{ size?: number; style?: React.CSSProperties }>;
const EmailIcon = MdEmail as React.FC<{ size?: number; style?: React.CSSProperties }>;
const LockIcon = MdLockOutline as React.FC<{ size?: number; style?: React.CSSProperties }>;
const EyeIcon = MdVisibility as React.FC<{ size?: number }>;
const EyeOffIcon = MdVisibilityOff as React.FC<{ size?: number }>;

/* COMPONENT */
const AdminSignUp: React.FC = () => {
  const [role, setRole] = useState("Admin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSignUp = () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    alert("Sign up successful");
  };

  const goToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <>
      {/* REMOVE BROWSER PASSWORD EYE */}
      <style>
        {`
          input[type="password"]::-ms-reveal,
          input[type="password"]::-ms-clear {
            display: none;
          }
          input[type="password"]::-webkit-credentials-auto-fill-button {
            visibility: hidden;
            position: absolute;
          }
        `}
      </style>

      <div style={styles.page}>
        <div style={styles.card}>
          {/* SYMBOL */}
          <div style={styles.logoWrapper}>
            <div style={styles.logo}>
              <div style={styles.logoInner} />
            </div>
          </div>

          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Sign up to access the admin panel</p>

          {/* LOGIN AS */}
          <div style={styles.fieldBlock}>
            <label style={styles.label}>Login as</label>
            <select
              style={styles.select}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Admin</option>
              <option>Super Admin</option>
            </select>
          </div>

          {/* USERNAME */}
          <div style={styles.fieldBlock}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrapper}>
              <AccountIcon size={20} style={styles.leftIcon} />
              <input
                style={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div style={styles.fieldBlock}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrapper}>
              <EmailIcon size={20} style={styles.leftIcon} />
              <input
                type="email"
                style={styles.input}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="Enter your email"
              />
            </div>
            {emailError && (
              <div style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                {emailError}
              </div>
            )}
          </div>

          {/* PASSWORD */}
          <div style={styles.fieldBlock}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <LockIcon size={20} style={styles.leftIcon} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                placeholder="Create a password"
              />
              {password && (
                <span
                  style={styles.rightIcon}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </span>
              )}
            </div>
          </div>

          <button style={styles.button} onClick={handleSignUp}>
            Sign Up
          </button>

          <p style={styles.footer}>
            Already have an account?{" "}
            <span style={styles.link} onClick={goToLogin}>
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

/* RENDER */
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<AdminSignUp />);

/* STYLES */
const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fa",
    fontFamily: "Inter, sans-serif",
  },
  card: {
    width: 420,
    background: "#ffffff",
    borderRadius: 18,
    padding: 36,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  },
  logoWrapper: { display: "flex", justifyContent: "center", marginBottom: 14 },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
    border: "2px solid #0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoInner: {
    width: 16,
    height: 16,
    border: "2px solid #0f172a",
    transform: "rotate(45deg)",
  },
  title: { textAlign: "center", marginBottom: 6 },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 24,
  },
  fieldBlock: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: 500, marginBottom: 6, display: "block" },
  inputWrapper: { position: "relative" },
  leftIcon: {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
  },
  rightIcon: {
    position: "absolute",
    right: 14,
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#6b7280",
  },
  input: {
    width: "100%",
    height: 44,
    padding: "0 44px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 14,
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    height: 44,
    padding: "0 14px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 14,
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(180deg, #0f172a, #020617)",
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 10,
  },
  footer: { textAlign: "center", fontSize: 13, marginTop: 18 },
  link: { color: "#2563eb", cursor: "pointer", fontWeight: 500 },
};

export { };

