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
  const [status, setStatus] = useState(""); // "success" | "error" | ""

  // Resets button color when user starts typing again
  const changeData = (e) => {
    setFormsData({ ...formsData, [e.target.name]: e.target.value });
    setStatus("");
    setMessage("");
    setError("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    setStatus("");

    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      setError("Configuration error: API URL is not set. Please contact support.");
      setStatus("error");
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

      // ✅ FIX: Check both response.ok AND common success status codes (200, 201)
      // Also check if the data message contains "success" keywords as a fallback
      const isSuccess =
        response.ok ||
        response.status === 201 ||
        response.status === 200 ||
        (data.message &&
          (data.message.toLowerCase().includes("success") ||
            data.message.toLowerCase().includes("registered") ||
            data.message.toLowerCase().includes("created")));

      if (isSuccess) {
        setMessage(data.message || "Registration successful!");
        setStatus("success"); // ✅ turns button green
        setFormsData({
          firstName: "",
          lastName: "",
          email: "",
          userName: "",
          password: "",
        });
      } else {
        setError(data.message || "Something went wrong. Please try again.");
        setStatus("error"); // ❌ turns button red
      }
    } catch (err) {
      setError("Cannot connect to server. Please try again later.");
      setStatus("error");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  }

  // Button styles based on status
  const buttonStyle = {
    backgroundColor:
      status === "success" ? "green" :
      status === "error"   ? "red"   : "",
    color: status ? "white" : "",
    transition: "background-color 0.3s ease",
  };

  // Button label based on status
  const buttonLabel =
    loading              ? "Submitting..."             :
    status === "success" ? "Registered Successfully ✓" :
    status === "error"   ? "Registration Failed ✗"     : "Sign Up";

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

          {/* Button changes color and text based on registration result */}
          <button
            className="btn"
            type="submit"
            disabled={loading}
            style={buttonStyle}
          >
            {buttonLabel}
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
