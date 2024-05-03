import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchIndustrialProducts } from "../../api/api";

export const fetchIndustrialProductsAsync = createAsyncThunk(
  "products/industrialProducts",
  async () => {
    try {
      const data = await fetchIndustrialProducts();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const industrialProductSlice = createSlice({
  name: "industrialproducts",
  initialState: { industrialProducts: [], status: "idle", error: null }, // Initialize with status and error properties
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIndustrialProductsAsync.fulfilled, (state, action) => {
        // Check the structure of the returned data
        // console.log(state.industrialProducts);
        state.industrialProducts = action.payload; // vegetableProducts have to be equal to vegetableProducts in the initial state
        state.status = "succeeded"; // Update status
      })
      .addCase(fetchIndustrialProductsAsync.rejected, (state, action) => {
        console.error(
          "Error fetching vegetable products:",
          action.error.message
        );
        state.status = "failed"; // Update status
        state.error = action.error.message; // Update error
      })
      .addCase(fetchIndustrialProductsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
  },
});

export const { actions } = industrialProductSlice;

export const selectIndustrial = (state) =>
  state.industrialProducts.industrialProducts;

export default industrialProductSlice.reducer;
