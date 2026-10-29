import { useEffect, useState, useContext, createContext } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);

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
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export default WishlistContext;
