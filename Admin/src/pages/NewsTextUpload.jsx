import { useState } from "react";
import axios from "axios";
import { Button, Typography, Paper, TextField } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../api/baseURL";

const styles = {
  container: {
    padding: "20px",
    maxWidth: "1000px", // Adjust the width as needed
    maxHeight: "800px", // Adjust the height as needed
    margin: "auto",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  uploadButton: {
    marginTop: "16px",
    backgroundColor: "#da971b", // Change button color to #da971b
  },
};

const NewsUploadText = () => {
  const [newsData, setNewsData] = useState({
    title: "",
    content: "",
  });

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setNewsData({ ...newsData, [name]: value });
  };

  const handleNewsUpload = () => {
    if (!newsData.title || !newsData.content) {
      console.error("Please enter a title and content for the news.");
      toast.error("Please enter a title and content for the news."); // Add error toast
      return;
    }

    axios
      .post(`${ BASE_URL }api/upload-news`, newsData)
      .then((response) => {
        console.log("News uploaded successfully!", response.data);
        toast.success("News uploaded successfully!"); // Add success toast
        setNewsData({ title: "", content: "" }); // Reset the form
      })
      .catch((error) => {
        console.error("Error uploading news:", error);
        toast.error("Error uploading news. Please try again."); // Add error toast
      });
  };

  return (
    <Paper elevation={3} style={styles.container}>
      <Typography variant="h5" gutterBottom>
        Upload News (Text)
      </Typography>
      <form style={styles.form}>
        <TextField
          label="Title"
          variant="outlined"
          name="title"
          value={newsData.title}
          onChange={onInputChange}
        />
        <TextField
          multiline
          rows={4}
          label="Content"
          variant="outlined"
          name="content"
          value={newsData.content}
          onChange={onInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={handleNewsUpload}
          style={styles.uploadButton}
        >
          Upload News
        </Button>
      </form>
    </Paper>
  );
};

export default NewsUploadText;
