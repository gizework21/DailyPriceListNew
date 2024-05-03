import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Popover,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { toast } from "react-toastify"; // Import the toast module
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../redux/slice/userSlice";
import HomeIcon from "@mui/icons-material/Home"; 

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful"); // Display success toast for logout
    navigate("/");
    setAnchorEl(null); // Close the popover after logout
  };

  const handleUserIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleGoToHomePage = () => {
    navigate("/");
    setAnchorEl(null); // Close the popover after navigation
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      backgroundColor="#efefef" // Set your desired background color here
    >
      <Box display="flex" borderRadius="3px" backgroundColor="#d7a022">
        {/* Add your search bar component here if needed */}
      </Box>

      {/* ICONS */}
      <Box display="flex" color="#d7a022" alignItems="center">
        <IconButton onClick={handleUserIconClick} sx={{ color: "#d7a022" }}>
          <PersonOutlinedIcon />
        </IconButton>

        {/* Display the username next to the user profile icon */}
        {user && (
          <Typography variant="body2" color="#d7a022" sx={{ mr: 1 }}>
            {user.fullName}
          </Typography>
        )}

        {/* "Go to home page" button */}
        <IconButton onClick={handleGoToHomePage} sx={{ color: "#d7a022" }}>
          <HomeIcon />
        </IconButton>

        {/* User Information Popover */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Paper>
            <List>
              {user && (
                <>
                  <ListItem>
                    <ListItemText primary={`Name: ${user.fullName}`} />
                  </ListItem>

                  <Divider />
                </>
              )}
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Paper>
        </Popover>
      </Box>
    </Box>
  );
};

export default Topbar;
