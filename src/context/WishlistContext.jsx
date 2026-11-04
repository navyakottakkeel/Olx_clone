import { useEffect, useState, useContext, createContext } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
  
    toast.success("Added to wishlist!");
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  
    toast.success("Removed from wishlist!");
  };

  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }

    const savedWishlist = localStorage.getItem(`wishlist_${user.uid}`);

    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem(`wishlist_${user.uid}`, JSON.stringify(wishlist));
  }, [wishlist, user]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export default WishlistContext;
