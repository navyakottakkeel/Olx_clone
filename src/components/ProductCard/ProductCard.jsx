import React from "react";

const ProductCard = ({ title, price, location, image, category, date }) => {
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative">
        <img src={image} alt={title} className="h-48 w-full object-cover" />

        <button
          type="button"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl shadow-md transition hover:scale-110"
          aria-label={`Add ${title} to wishlist`}
        >
          ♡
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#002f34]">{title}</h3>

        <p className="mt-2 text-xl font-bold text-[#002f34]">{price}</p>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>{category}</span>
          <span>{date}</span>
        </div>

        <p className="mt-2 text-sm text-gray-500">{location}</p>
      </div>
    </div>
  );
};

export default ProductCard;
