import { useEffect } from "react";
import { createContext, useState, useContext } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({children}) => {
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem('wishlist');

        return savedWishlist? JSON.parse(savedWishlist) : []
    });

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist))
    },[wishlist])

    return (
        <WishlistContext.Provider value={{wishlist, setWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => {
    return useContext(WishlistContext)
}

export default WishlistContext;