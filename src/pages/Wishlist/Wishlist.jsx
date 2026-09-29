import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useWishlist } from "../../context/WishlistContext";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-8 pt-24">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">My Wishlist</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {wishlist.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-5xl">♡</p>

              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                Your wishlist is empty
              </h2>

              <p className="mt-2 text-gray-500">
                Products you like will appear here.
              </p>
            </div>
          ) : (
            wishlist.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                location={product.location}
                category={product.category}
                date={product.date}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
