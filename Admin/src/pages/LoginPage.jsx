import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../redux/slice/userSlice";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton, // Import IconButton
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await dispatch(loginUserAsync({ phoneNumber, password }));
      navigate("/fileUpload");
      toast.success("Login successful");
    } catch (error) {
      console.error("Login failed:", error.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleDelete = () => {
    navigate("/"); // Navigate to root route
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        className="authForm"
        style={{
          padding: "2rem",
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Avatar style={{ backgroundColor: "#d7a022", marginBottom: "1rem" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          variant="h5"
          gutterBottom
          style={{
            fontFamily: "cursive",
            color: "#333",
            marginBottom: "1rem",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Welcome
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          style={{
            backgroundColor: "#d7a022",
            color: "#fff",
            padding: "1rem",
            marginTop: "1rem",
          }}
          onClick={handleLogin}
        >
          Login
        </Button>
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
          sx={{ color: "#d7a022", paddingTop: 2 }}
        >
          {" "}
          {/* Add IconButton here */}
          <HomeIcon />
        </IconButton>
      </Paper>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default LoginPage;
