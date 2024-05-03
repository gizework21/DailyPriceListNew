import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { BASE_URL } from "../api/baseURL";

const NewsList = () => {
  const itemsPerPage = 10;
  const [dailyPrices, setDailyPrices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${ BASE_URL }api/fetch-news`
        );
        setDailyPrices(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const paginationIntervalId = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage % totalPages) + 1);
    }, 5000);

    return () => {
      clearInterval(paginationIntervalId);
    };
  }, [totalPages]);

  useEffect(() => {
    setTotalPages(Math.ceil(dailyPrices.length / itemsPerPage));
  }, [dailyPrices]);

  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = Math.min(startItem + itemsPerPage, dailyPrices.length);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleEditClick = (news) => {
    setSelectedNews(news);
    setUpdatedTitle(news.title);
    setUpdatedContent(news.content);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setSelectedNews(null);
    setUpdatedTitle("");
    setUpdatedContent("");
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/edit-news/${selectedNews._id}`,
        {
          title: updatedTitle,
          content: updatedContent,
        }
      );

      setDailyPrices((prevPrices) =>
        prevPrices.map((price) =>
          price._id === selectedNews._id
            ? { ...price, title: updatedTitle, content: updatedContent }
            : price
        )
      );

      handleEditModalClose();

      toast.success("News updated successfully");
    } catch (error) {
      console.error("Error updating news:", error);
      toast.error("Error updating news. Please try again.");
    }
  };

  const handleRestrictClick = async (news) => {
    try {
      await axios.put(`http://localhost:4000/api/restrict-news/${news._id}`, {
        isRestricted: !news.isRestricted,
      });

      setDailyPrices((prevPrices) =>
        prevPrices.map((price) =>
          price._id === news._id
            ? { ...price, isRestricted: !price.isRestricted }
            : price
        )
      );

      toast.success(
        `News restriction ${
          news.isRestricted ? "removed" : "applied"
        } successfully`
      );
    } catch (error) {
      console.error("Error updating news restriction:", error);
      toast.error("Error updating news restriction. Please try again.");
    }
  };

  return (
    <div>
      <TableContainer component={Paper} className="table-container">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Number</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Restrict</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dailyPrices.slice(startItem, endItem).map((price, index) => (
              <TableRow key={price._id}>
                <TableCell>{startItem + index + 1}</TableCell>
                <TableCell>{price.title}</TableCell>
                <TableCell>{price.content}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRestrictClick(price)}
                    style={{
                      color: "#fff",
                      backgroundColor: price.isRestricted
                        ? "#cc0033"
                        : "#da971b",
                      borderRadius: "5px",
                    }}
                  >
                    {price.isRestricted ? <LockIcon /> : <LockOpenIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleEditClick(price)}
                    style={{ backgroundColor: "#da971b", color: "#fff" }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          style={{ backgroundColor: "#da971b", color: "#fff" }}
        >
          Previous
        </Button>{" "}
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{ backgroundColor: "#da971b", color: "#fff" }}
        >
          Next
        </Button>
      </div>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={handleEditModalClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
          }}
        >
          <TextField
            label="Title"
            fullWidth
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            style={{ backgroundColor: "#da971b", color: "#fff" }}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default NewsList;