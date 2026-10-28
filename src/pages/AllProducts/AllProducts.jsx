import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CategoryNav from "../../components/CategoryNav/CategoryNav";
import ProductCard from "../../components/ProductCard/ProductCard";

const AllProducts = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const [products, setProducts] = useState([]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category
      ? product.category.toLowerCase() === category.toLowerCase()
      : true;

    const query = searchTerm.toLowerCase();

    const matchesSearch =
      product.title.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.location.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const savedAds = JSON.parse(localStorage.getItem("myads")) || [];
    setProducts(savedAds);
  }, []);

  return (
    
    <div className="pt-20 px-4 md:px-8">
      <CategoryNav />
      <h1 className="text-2xl font-bold text-[#002f34]">
        {searchTerm
          ? `Search Results: ${searchTerm}`
          : category || "All Products"}
      </h1>
      {filteredProducts.length === 0 && (
  <p className="mt-8 text-center text-gray-500">
    {searchTerm
      ? `No products found for "${searchTerm}".`
      : category
      ? `No products found in ${category}.`
      : "No products available yet."}
  </p>
)}

      {filteredProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={`₹${product.price}`}
              location={product.location}
              image={product.image}
              category={product.category}
              date={product.date}
            />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-center text-gray-500">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default AllProducts;
