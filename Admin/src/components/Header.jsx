// Header.jsx
import logo from '../assets/log.png'
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  const appBarStyle = {
    backgroundColor: "#f2f2f2",
  };

  const currentDate = new Date().toLocaleDateString();

  const logoStyle = {
    width: "100px", // Adjust the size as needed
    height: "auto", // Maintain aspect ratio
    marginRight: "auto", // Push logo to the left
  };

  const dateStyle = {
    marginLeft: "auto", // Push date to the right
  };

  return (
    <AppBar position="static" style={appBarStyle}>
      <Toolbar style={{ justifyContent: 'space-between',color:"black" }}>
        <img src={logo} alt="Logo" style={logoStyle} />
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          className="text-xl font-bold"
          style={dateStyle}
        >
          Daily Price - {currentDate}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
