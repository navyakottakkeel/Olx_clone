import React from "react";
import CategoryCard from "../CategoryCard/CategoryCard";

const categories = [
    {
      name: "Cars",
      icon: "🚗",
    },
    {
      name: "Mobiles",
      icon: "📱",
    },
    {
      name: "Bikes",
      icon: "🏍️",
    },
    {
      name: "Property",
      icon: "🏠",
    },
    {
      name: "Electronics",
      icon: "💻",
    },
    {
      name: "Fashion",
      icon: "👗",
    },
    {
      name: "Jobs",
      icon: "💼",
    },
    {
      name: "Services",
      icon: "🔧",
    },
  ];

const Categories = () => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-2xl font-bold text-[#002f34]">Categories</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((category) => (
                <CategoryCard key={category.name} name={category.name} icon={category.icon} />
            ))}
          
        </div>
      </div>
    </section>
  );
};

export default Categories;
