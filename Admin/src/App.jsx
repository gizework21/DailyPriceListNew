import React, { useState, useEffect } from "react";
import {  Routes, Route,Navigate } from 'react-router-dom';
import ErrorPage from "./pages/404";
import Animal from "./pages/Animal";  
import Vigetable from "./pages/Vigetable";
import Industrial from "./pages/Industrial";
import FileUpload from "./pages/FileUpload";
import NewsUpload from "./pages/NewsTextUpload";
import NewsList from "./pages/NewsList";
import Login from "./pages/LoginPage";
import LandingPage from "./pages/landingPage";
import OnlyAdminPrivateRoute from "./pages/AdminRoute";
import VegetableProduct from "./pages/VegtableProduct";
import AnimalProduct from "./pages/AnimalProduct";
import IndustrialProduct from "./pages/IndustrialProduct";

const App = () => {
  return (
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/login" element={<Login/>} />
            <Route path='/vegetableproduct' element={<VegetableProduct />} />
            <Route path='/animalproduct' element={<AnimalProduct />} />
            <Route path='/industrialproduct' element={<IndustrialProduct />} />
            <Route path='/admin' element={<OnlyAdminPrivateRoute />} />

            <Route element={<OnlyAdminPrivateRoute />}>
                <Route path="/animal" element={<Animal />} />
                <Route path="/industrial" element={<Industrial />} />
                <Route path="/vigitable" element={<Vigetable />} />
                <Route path="/fileUpload" element={<FileUpload />} />
                <Route path="/newsUpload" element={<NewsUpload />} />
                <Route path="/newsList" element={<NewsList />} />

                </Route>
              <Route path="/*" element={<ErrorPage />} />
            <Route path="/404" element={<ErrorPage />} />
          </Routes>
  );
};

export default App;
