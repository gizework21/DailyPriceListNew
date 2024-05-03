import { combineReducers } from "redux";

import userReducer from "./slice/userSlice"; // Add userReducer
import vegetableProductsReducer from "./slice/fetchVegetableProducts"; 
import animalProductsReducer from "./slice/fetchAnimalProducts";
import industrialProductsReducer from "./slice/fetchIndustrialProducts";
import newsReducer from "./slice/fetchNews";


const rootReducer = combineReducers({
  user: userReducer, // Add user reducer
  vegetableProducts: vegetableProductsReducer,
  animalProducts: animalProductsReducer,
  industrialProducts: industrialProductsReducer,
  newsText: newsReducer,
});

export default rootReducer;
