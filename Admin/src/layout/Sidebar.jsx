import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#fff", // Set the background color to white
    color: "#2c3e50", // Set text color
  },
  logo: {
    width: "80%",
    height: "auto",
    margin: "20px auto",
  },
  listItem: {
    "&:hover": {
      color:'white',
      backgroundColor: "#da971b", // Set hover background color
    },
  },
  listItemText: {
    fontSize: "1.2rem",
    color: "#2c3e50", // Set text color
  },
  icon: {
    fontSize: "3.5rem",
    color: "#d7a022", // Set icon color
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();

  const handleItemClick = (title, to) => {
    setSelected(title);
    navigate(to);
  };

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        <Box textAlign="center">
          <img src={logo} alt="Logo" className={classes.logo} />
        </Box>

        <>
          <ListItem
            className={classes.listItem}
            onClick={() => handleItemClick("Excel Upload", "/fileUpload")}
            selected={selected === "Excel Upload"}
            button
          >
            <ListItemIcon style={{ color: "#d7a022" }}>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Add Product" />
          </ListItem>

          <ListItem
            className={classes.listItem}
            onClick={() => handleItemClick("Animal Products", "/animal")}
            selected={selected === "Animal Products"}
            button
          >
            <ListItemIcon style={{ color: "#d7a022" }}>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Animal Products" />
          </ListItem>
          <ListItem
            className={classes.listItem}
            onClick={() => handleItemClick("Vigitable Products", "/vigitable")}
            selected={selected === "Vigitable Products"}
            button
          >
            <ListItemIcon style={{ color: "#d7a022" }}>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Vigitable Products" />
          </ListItem>

          <ListItem
            className={classes.listItem}
            onClick={() =>
              handleItemClick("Industrial Products", "/industrial")
            }
            selected={selected === "Industrial Products"}
            button
          >
            <ListItemIcon style={{ color: "#d7a022" }}>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Industrial Products" />
          </ListItem>

          <ListItem
            className={classes.listItem}
            onClick={() => handleItemClick("News Upload", "/newsUpload")}
            selected={selected === "News Upload"}
            button
          >
            <ListItemIcon style={{ color: "#d7a022" }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="News Upload" />
          </ListItem>
          <ListItem
            className={classes.listItem}
            onClick={() => handleItemClick("News List", "/newsList")}
            selected={selected === "News List"}
            button
          >
            <ListItemIcon style={{ color: "#d7a022" }}>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="News List" />
          </ListItem>
        </>
      </List>
    </Drawer>
  );
};

export default Sidebar;
