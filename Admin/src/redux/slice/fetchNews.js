import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNewsProducts } from "../../api/api";

export const fetchNewsAsync = createAsyncThunk(
  "news",
  async () => {
    try {
      const data = await fetchNewsProducts();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState: { newsText: [], status: "idle", error: null }, // Initialize with status and error properties
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsAsync.fulfilled, (state, action) => {
        // Check the structure of the returned data
        // console.log(state.newsText);
        state.newsText = action.payload; // animalProducts have to be equal to animalProducts in the initial state
        state.status = "succeeded"; // Update status
      })
      .addCase(fetchNewsAsync.rejected, (state, action) => {
        console.error(
          "Error fetching vegetable products:",
          action.error.message
        );
        state.status = "failed"; // Update status
        state.error = action.error.message; // Update error
      })
      .addCase(fetchNewsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      });
  },
});

export const { actions } = newsSlice;

export const selectNews = (state) => state.newsText.newsText;

export default newsSlice.reducer;
