import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchVegetableProducts, postVegetableProduct } from "../../api/api";

export const fetchVegetableProductsAsync = createAsyncThunk(
  "products/vegetableProducts",
  async () => {
    try {
      const data = await fetchVegetableProducts();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const postVegetableProductAsync = createAsyncThunk(
  "product/postVegetableProduct",
  async (vegetableProduct) => {
    try {
      return postVegetableProduct(vegetableProduct);
    } catch (error) {
      throw error;
    }
  }
);

export const vegetableProductSlice = createSlice({
  name: "vegetableproducts",
  initialState: { vegetableProducts: [], status: "idle", error: null }, // Initialize with status and error properties
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVegetableProductsAsync.fulfilled, (state, action) => {
        // Check the structure of the returned data
        // console.log(state.vegetableProducts);
        state.vegetableProducts = action.payload; // vegetableProducts have to be equal to vegetableProducts in the initial state
        state.status = "succeeded"; // Update status
      })
      .addCase(fetchVegetableProductsAsync.rejected, (state, action) => {
        console.error(
          "Error fetching vegetable products:",
          action.error.message
        );
        state.status = "failed"; // Update status
        state.error = action.error.message; // Update error
      })
      .addCase(fetchVegetableProductsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postVegetableProductAsync.fulfilled, (state, action) => {
        state.vegetableProducts.push(action.payload); // Push the new item to the items array
      })
      .addCase(postVegetableProductAsync.rejected, (state, action) => {
        state.status = "failed"; // Update status
        state.error = action.error.message; // Update error
        console.error("Error adding vegetableProducts:", action.error.message);
      });
  },
});

export const { actions } = vegetableProductSlice;

export const selectVegetable = (state) =>
  state.vegetableProducts.vegetableProducts;

export default vegetableProductSlice.reducer;
