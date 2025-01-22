import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress"; // Import MUI spinner
import SubmitButton from "./progess";

export const Login = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleformsubmitt = (e) => {
    e.preventDefault(); // Prevent page reload

    // Set loader for 2 minutes (120,000 ms)
    setLoading(true);

    setTimeout(() => {
      const formdata = {
        name: name,
        pass: pass,
      };

      if (name === "Arslan" && pass === "admin1234") {
        console.log(formdata);
        console.log("Login Successfully");

        localStorage.setItem("token", "12324ijdiwu23hei23e");

        // Stop loading after 2 minutes
        setLoading(false);

        // Redirect after loading is complete
        navigate("/home"); // Correct redirection here
      } else {
        console.log("Name or Pass is Invalid");

        // Stop loading even if login fails
        setLoading(false);
      }
    }, 20000); // 2 minutes in milliseconds (120,000 ms)
  };

  return (
    <div data-aos="fade-up">
      <div style={styles.container}>
        {loading ? ( // Conditionally render the Material-UI spinner
          <CircularProgress style={styles.spinner} /> // Material-UI CircularProgress spinner
        ) : (
          <form
            onSubmit={handleformsubmitt}
            style={styles.form}
            autoComplete="off"
          >
            <h2 style={styles.heading}>Login</h2>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              autoComplete="off"
            />
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              style={styles.input}
              autoComplete="off"
            />
            {/* <button type="submit" style={styles.button}>
              Submit
            </button> */}
            <SubmitButton name={name} pass={pass}></SubmitButton>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    marginBottom: "20px",
    textAlign: "center",
    color: "orange",
  },
  label: {
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    // borderRadius: "20px 4px",
    border: "2px solid orange",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    padding: "10px",
    backgroundColor: "orange",
    color: "white",
    borderRadius: "20px 4px",
    cursor: "pointer",
    fontSize: "13px",
  },
  spinner: {
    color: "orange", // Customize spinner color
  },
};
