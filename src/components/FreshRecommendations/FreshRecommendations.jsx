import React from "react";
import ProductCard from "../ProductCard/ProductCard";

const products = [
    {
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
      title: "iPhone 13",
      price: "₹35,000",
      location: "Kannur",
      category: "Mobiles",
      date: "Today",
    },
    {
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80",
      title: "Dell Laptop",
      price: "₹45,000",
      location: "Kozhikode",
      category: "Electronics",
      date: "Yesterday",
    },
    {
      image:
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&q=80",
      title: "Honda Bike",
      price: "₹75,000",
      location: "Thalassery",
      category: "Bikes",
      date: "2 days ago",
    },
  ];

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
            title={product.title}
            price={product.price}
            location={product.location}
            image={product.image}
            category={product.category}
            date={product.date}
          />
        ))}
      </div>
    </section>
  );
};

export default FreshRecommendations;
