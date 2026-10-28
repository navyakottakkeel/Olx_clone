import React from "react";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Login from "./components/Modal/Login";
import Navbar from "./components/Navbar/Navbar";
import { useAuth } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import AllProducts from "./pages/AllProducts/AllProducts";
import Home from "./pages/Home/Home";
import MyAds from "./pages/MyAds/MyAds";
import PostAd from "./pages/PostAd/PostAd";
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
            <Route path="/products" element={<AllProducts />} />
            <Route path="/category/:category" element={<AllProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/my-ads" element={<MyAds />} />
            <Route path="/post-ad" element={<PostAd />} />
          </Routes>
          <Footer />
          <Login toggleModal={toggleModal} status={openModal} />
        </div>
      </BrowserRouter>
    </WishlistProvider>
  );
};

export default App;
