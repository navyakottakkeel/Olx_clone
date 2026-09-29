import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Modal/Login";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Wishlist from "./pages/Wishlist/Wishlist";

const App = () => {
  const [openModal, setModal] = useState(false);

  const { user } = useAuth();
  console.log("Current User : ", user);

  const toggleModal = () => setModal(!openModal);

  return (
    <WishlistProvider>
      <BrowserRouter>
        <div>
          <Navbar toggleModal={toggleModal} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
          <Login toggleModal={toggleModal} status={openModal} />
        </div>
      </BrowserRouter>
    </WishlistProvider>
  );
};

export default App;
