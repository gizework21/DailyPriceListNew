import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { BASE_URL } from "../api/baseURL";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIndustrialProductsAsync,
  selectIndustrial,
} from "../redux/slice/fetchIndustrialProducts";

const DailyPriceList = () => {
  const itemsPerPage = 10;
  const [dailyPrices, setDailyPrices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const Industrial = useSelector(selectIndustrial);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIndustrialProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    try {
      setTotalPages(Math.ceil(Industrial.length / itemsPerPage));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [itemsPerPage]);

  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = Math.min(startItem + itemsPerPage, Industrial.length);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <TableContainer component={Paper} className="table-container">
        <Table className="table">
          <TableHead sx={{ background: "#da971b" }}>
            <TableRow>
              <TableCell sx={{ fontSize: "23px" }}>Number</TableCell>
              <TableCell sx={{ fontSize: "23px" }}>Item</TableCell>
              <TableCell sx={{ fontSize: "23px" }}>Unit</TableCell>
              <TableCell align="center" sx={{ fontSize: "23px" }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Industrial.slice(startItem, endItem).map((price, index) => (
              <TableRow key={price._id}>
                <TableCell>{startItem + index + 1}</TableCell>
                <TableCell>{price.DESCRIPTION}</TableCell>
                <TableCell>{price.UNIT}</TableCell>
                <TableCell align="center">{price.price} Birr</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "20px", textAlign: "end" }}>
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{ backgroundColor: "#da971b", color: "#fff" }}
        >
          <KeyboardArrowLeftIcon />
        </Button>{" "}
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{ backgroundColor: "#da971b", color: "#fff" }}
        >
          <KeyboardArrowRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default DailyPriceList;
