import { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVegetableProductsAsync,
  selectVegetable,
} from "../redux/slice/fetchVegetableProducts";

const Title = styled(Typography)({
  marginTop: "5px",
  textAlign: "center",
  fontFamily: "'Indie Flower', cursive",
  fontSize: "2.3rem", // Increase font size

  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Add text shadow
  marginBottom: "1rem",
  animation: "$fadeIn 1s ease-in-out infinite alternate", // Apply CSS animation
  "@keyframes fadeIn": {
    from: { opacity: 0, transform: "translateY(-20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
  },
});

const Vegetable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const Vegetable = useSelector(selectVegetable);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVegetableProductsAsync());
  }, [dispatch]);

  // Use setInterval to increment the current page every 1 second
  // Use setInterval to increment the current page every 1 second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPage((prevPage) => {
        if (prevPage === Math.ceil(Vegetable.length / 6) - 1) {
          return 0; // Reset to first page
        } else {
          return prevPage + 1;
        }
      });
    }, 30000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [Vegetable]);

  // Calculate the start and end index for the current page
  const startIndex = currentPage * 6;
  const endIndex = startIndex + 6;

  return (
    <>
      <Header />
      <div>
        <Title variant="h4" component="div" gutterBottom>
          🌽🍇 Vegetables and Fruits 🍅🍓
        </Title>

        <TableContainer component={Paper} className="table-container">
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontFamily: "serif",
                    fontSize: "26px",
                  }}
                >
                  Number
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontFamily: "serif",
                    fontSize: "26px",
                  }}
                >
                  Item
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontFamily: "serif",
                    fontSize: "26px",
                  }}
                >
                  Unit
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: "bold",
                    fontFamily: "serif",
                    fontSize: "26px",
                  }}
                >
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Vegetable.slice(startIndex, endIndex).map((price, index) => (
                <TableRow key={price._id}>
                  <TableCell style={{ fontWeight: "bold", fontSize: "22px" }}>
                    {startIndex + index + 1}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: "22px" }}>
                    {price.DESCRIPTION}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", fontSize: "22px" }}>
                    {price.UNIT}
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", fontSize: "22px" }}
                    align="center"
                  >
                    {price.price + " ብር"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Footer />
    </>
  );
};

export default Vegetable;
