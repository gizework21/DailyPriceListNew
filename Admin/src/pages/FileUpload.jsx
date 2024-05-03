import { useEffect, useState, useRef } from "react";
import {
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {
  postVegetableProductAsync,
  fetchVegetableProductsAsync,
} from "../redux/slice/fetchVegetableProducts";
import { fetchAnimalProductsAsync } from "../redux/slice/fetchAnimalProducts";
import { fetchIndustrialProductsAsync } from "../redux/slice/fetchIndustrialProducts";

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px", // Adjust the maxWidth as needed
    margin: "auto",
    textAlign: "center",
  },
  paper: {
    padding: "20px",
    marginTop: "20px",
  },
  header: {
    marginBottom: "20px",
  },
  dropdown: {
    width: "100%",
    marginTop: "16px",
  },
  dropzone: {
    border: "2px dashed #3498db",
    borderRadius: "8px",
    padding: "32px",
    marginTop: "32px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#ecf0f1",
    },
  },
  uploadIcon: {
    fontSize: "2rem",
    marginBottom: "8px",
    color: "#d7a022", // Set the icon color to #d7a022
  },
  fileInputLabel: {
    cursor: "pointer",
  },
  uploadedFile: {
    marginTop: "16px",
    color: "#4CAF50",
  },
  uploadButton: {
    marginTop: "16px",
    backgroundColor: "#007bff", // Set the button background color to #007bff
    color: "#fff", // Set the button text color to white
  },
};

const FileUpload = () => {
  const dispatch = useDispatch();

  const [uploadedFile, setUploadedFile] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  const onFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (
        file.type === "application/vnd.ms-excel" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setUploadedFile(file);
        setError(null);
      } else {
        console.error("Please select a valid .xls or .xlsx file.");
        setError("Please select a valid .xls or .xlsx file.");
        event.target.value = null;
      }
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleConfirmationDialogOpen = () => {
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };

  const handleUpload = () => {
    if (!uploadedFile) {
      console.error("Please choose a file.");
      toast.error("Please choose a file.");
      return;
    }
    if (!selectedCategory) {
      console.error("Please choose the category of the file.");
      toast.error("Please choose the category of the file.");
      return;
    }

    handleConfirmationDialogOpen();
  };

  const handleConfirmUpload = async () => {
    handleConfirmationDialogClose();

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("category", selectedCategory);

    try {
      await dispatch(postVegetableProductAsync(formData));
      dispatch(fetchVegetableProductsAsync());
      dispatch(fetchAnimalProductsAsync());
      dispatch(fetchIndustrialProductsAsync());
      toast.success("Item added successfully!");
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  return (
    <Container component="main" maxWidth="lg" style={styles.container}>
      <Paper elevation={3} style={styles.paper}>
        <Typography variant="h5" gutterBottom style={styles.header}>
          Upload Excel File
        </Typography>
        {/* Categories Dropdown */}
        <FormControl style={styles.dropdown}>
          <InputLabel id="categoryLabel">Category</InputLabel>
          <Select
            labelId="categoryLabel"
            id="categorySelect"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <MenuItem value="Vegetable">Vegetable And Fruit</MenuItem>
            <MenuItem value="industrialProduct">Industrial Product</MenuItem>
            <MenuItem value="animalProducts">Animal Products</MenuItem>
          </Select>
        </FormControl>
        <label htmlFor="fileInput" style={styles.dropzone}>
          <CloudUploadIcon
            fontSize="large"
            color="primary"
            style={styles.uploadIcon}
          />
          <Typography variant="body1" color="textSecondary">
            Choose an Excel file (.xls or .xlsx)
          </Typography>
          <input
            type="file"
            accept=".xls, .xlsx"
            onChange={onFileChange}
            style={{ display: "none" }}
            id="fileInput"
          />
        </label>

        {uploadedFile && (
          <Typography
            variant="body2"
            color="textSecondary"
            style={styles.uploadedFile}
          >
            File: {uploadedFile.name}
          </Typography>
        )}

        <Button
          variant="contained"
          disableElevation
          onClick={handleUpload}
          style={{
            backgroundColor: "#d7a022", // Set the new button background color to #d7a022
            color: "#fff", // Set the button text color to white
            marginTop: "16px",
          }}
        >
          Upload
        </Button>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmationDialogOpen}
          onClose={handleConfirmationDialogClose}
        >
          <DialogTitle>Confirm Upload</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to upload the selected file?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmUpload} color="primary">
              Confirm Upload
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer />
      </Paper>
    </Container>
  );
};

export default FileUpload;
