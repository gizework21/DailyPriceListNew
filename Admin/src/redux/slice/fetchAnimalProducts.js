import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAnimalProducts } from "../../api/api";

export const fetchAnimalProductsAsync = createAsyncThunk(
  "products/animalProducts",
  async () => {
    try {
      const data = await fetchAnimalProducts();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const animalProductSlice = createSlice({
  name: "animalproducts",
  initialState: { animalProducts: [], status: "idle", error: null }, // Initialize with status and error properties
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimalProductsAsync.fulfilled, (state, action) => {
        // Check the structure of the returned data
        // console.log(state.animalProducts);
        state.animalProducts = action.payload; // animalProducts have to be equal to animalProducts in the initial state
        state.status = "succeeded"; // Update status
      })
      .addCase(fetchAnimalProductsAsync.rejected, (state, action) => {
        console.error(
          "Error fetching vegetable products:",
          action.error.message
        );
        state.status = "failed"; // Update status
        state.error = action.error.message; // Update error
      })
      .addCase(fetchAnimalProductsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      });
  },
});

export const { actions } = animalProductSlice;

export const selectAnimal = (state) => state.animalProducts.animalProducts;

export default animalProductSlice.reducer;
