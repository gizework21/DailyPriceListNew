import * as React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Header from "../components/Header";
import AdminRoute from "../pages/AdminRoute";

const Container = styled("div")({
  width: "100%",
  height: "88.3vh",
  background: 'url("./2.jpg")', // Set background image
  backgroundSize: "cover", // Make sure the background image covers the entire container
  backgroundPosition: "center", // Center the background image
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 230,
  height: 100,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  fontWeight: "bold",
  fontFamily: "serif", // Change font family
  boxShadow: "0px 4px 6px rgba(0, 128, 0, 0.5)", // Change shadow color to green
  transition: "transform 0.3s, box-shadow 0.3s, background 0.3s", // Add transition for hover effect
  marginTop: theme.spacing(-17), // Add margin top
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    transform: "translateY(-5px)", // Add a slight lift on hover
    boxShadow: "0px 6px 12px rgba(0, 128, 0, 0.7)", // Change shadow color on hover to a lighter green
    background: "#d7a022", // Change background color to orange on hover
  },
  fontSize: "1.8rem", // Increase font size
}));

const CenteredStack = styled(Stack)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function SquareCorners() {
  return (
    <>
      <Header />
      <Container>
        <CenteredStack>
          <Stack direction="row" spacing={2}>
            <Link to="/vegetableproduct" style={{ textDecoration: "none" }}>
              <DemoPaper square={false}>Vegetable Products</DemoPaper>
            </Link>
            <Link to="/animalproduct" style={{ textDecoration: "none" }}>
              <DemoPaper square={false}>Animal Products</DemoPaper>
            </Link>
            <Link to="/industrialproduct" style={{ textDecoration: "none" }}>
              <DemoPaper square={false}>Industrial Products</DemoPaper>
            </Link>
            <Link to="/admin" style={{ textDecoration: "none" }}>
              <DemoPaper square={false}>Go to Admin page</DemoPaper>
            </Link>
          </Stack>
        </CenteredStack>
      </Container>
    </>
  );
}
