import react from "react";
import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Formbar = () => {
  const [formsData, setFormsData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const changeData = (e) => {
    setFormsData({ ...formsData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      setError("Configuration error: API URL is not set. Please contact support.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formsData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Registration successful!");
        setFormsData({ firstName: "", lastName: "", email: "", userName: "", password: "" });
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Cannot connect to server. Please try again later.");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="formbar">
      <div className="container">
        <h2>Sign Up Form</h2>

        {message && (
          <p style={{ color: "green", textAlign: "center", marginBottom: "10px", fontWeight: "bold" }}>
            {message}
          </p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center", marginBottom: "10px", fontWeight: "bold" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="label-input">
            <label>First Name</label>
            <div className="input">
              <span><FaUser /></span>
              <input
                type="text"
                id="firstName"
                placeholder="type your first Name"
                name="firstName"
                value={formsData.firstName}
                onChange={changeData}
                required
              />
            </div>
          </div>

          <div className="label-input">
            <label>Last Name</label>
            <div className="input">
              <span><FaUser /></span>
              <input
                type="text"
                id="lastName"
                placeholder="type your last Name"
                name="lastName"
                value={formsData.lastName}
                onChange={changeData}
                required
              />
            </div>
          </div>

          <div className="label-input">
            <label>Email</label>
            <div className="input">
              <span><MdOutlineEmail /></span>
              <input
                type="email"
                id="email"
                placeholder="type your email"
                name="email"
                value={formsData.email}
                onChange={changeData}
                required
              />
            </div>
          </div>

          <div className="label-input">
            <label>Username</label>
            <div className="input">
              <span><FaUser /></span>
              <input
                type="text"
                placeholder="type your username"
                name="userName"
                value={formsData.userName}
                onChange={changeData}
                required
              />
            </div>
          </div>

          <div className="label-input">
            <label>Password</label>
            <div className="input">
              <span><FaLock /></span>
              <input
                type="password"
                placeholder="type your password"
                name="password"
                value={formsData.password}
                onChange={changeData}
                required
              />
            </div>
          </div>

          <p className="forget">
            <a href="#">Forget password?</a>
          </p>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Sign Up"}
          </button>

          <div className="socials">
            <p>Or sign in using this</p>
            <div className="icons">
              <a href="#" title="Facebook"><FaFacebookSquare /></a>
              <a href="#" title="Twitter"><FaTwitter /></a>
              <a href="#" title="Google"><SiGmail /></a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formbar;