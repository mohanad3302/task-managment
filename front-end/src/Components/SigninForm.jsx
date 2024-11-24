
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios to send requests
import { UserContext } from "../Contexts/UserContext";

export default function SignInForm() {
  const { userData, setUserData } = useContext(UserContext);

  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleChangeEmailInput(e) {
    setFormInputs({ ...formInputs, email: e.target.value });
  }

  // Update password input
  function handleChangePasswordInput(e) {
    setFormInputs({ ...formInputs, password: e.target.value });
  }

  
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      console.log("email  " + formInputs.email)
      const response = await axios.post("http://localhost:5000/api/auth/signin", {
        email: formInputs.email,
        password: formInputs.password,
      });

      if (response.status === 200) {
        const response = await axios.get("http://localhost:5000/api/tasks/getTasks") 
        localStorage.setItem("todos" , JSON.stringify(response.data.tasks))
        localStorage.setItem('isLoggedIn', 'true')
        navigate("/board");
      }
    } catch (error) {
      setErrorMessage("Invalid login credentials. Please try again.");
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <form
        style={{
          padding: "20px",
          height: "100vh",
          width: "500px",
        }}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "30px",
            background: "rgba(88, 59, 255, 0.8",
            minHeight: "700px",
            marginBottom: "40px",
            borderRadius: "30px",
          }}
        >
          <h1>Sign In Form</h1>
          <input
            type="email"
            value={formInputs.userName}
            onChange={handleChangeEmailInput}
            placeholder="Email"
          />
          <input
            type="password"
            value={formInputs.userPass}
            onChange={handleChangePasswordInput}
            placeholder="Password"
          />
              
          <button
            type="button"
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              Border: "none",
            }}
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>

          {/* Display error message if credentials are incorrect */}
          {errorMessage && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
          )}
          
        </div>
      </form>
    </div>
  );
}
