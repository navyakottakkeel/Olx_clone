import React from "react";
import ProductCard from "../ProductCard/ProductCard";

const FreshRecommendations = () => {
  const savedAds = JSON.parse(localStorage.getItem("myads")) || [];

  const latestProducts = [...savedAds]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <section className="px-4 py-8">
      <h2 className="text-2xl font-bold text-[#002f34]">
        Fresh Recommendations
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((product) => (
          <ProductCard
            key={product.id}
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
