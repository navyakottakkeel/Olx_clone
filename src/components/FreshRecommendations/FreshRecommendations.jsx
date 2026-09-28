import React from "react";
import products from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";



const FreshRecommendations = () => {
  return (
    <section className="px-4 py-8">
      <h2 className="text-2xl font-bold text-[#002f34]">
        Fresh Recommendations
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.title}
            id={product.id}
            title={product.title}
            price={product.price}
            location={product.location}
            image={product.image}
            category={product.category}
            date={product.date}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
};

export default FreshRecommendations;
