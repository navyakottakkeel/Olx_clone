import React from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow-down.svg";

const CategoryNav = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-4 whitespace-nowrap scrollbar-hide">
        <div
          onClick={() => navigate("/products")}
          className="flex cursor-pointer items-center gap-2"
        >
          <p className="font-bold text-[#002f34]">ALL CATEGORIES</p>

          <img src={arrow} alt="arrow" className="w-4" />
        </div>

        <p
          onClick={() => handleCategoryClick("Cars")}
          className="cursor-pointer text-sm hover:text-[#002f34]"
        >
          Cars
        </p>

        <p
          onClick={() => handleCategoryClick("Bikes")}
          className="cursor-pointer text-sm hover:text-[#002f34]"
        >
          Bikes
        </p>

        <p
          onClick={() => handleCategoryClick("Mobiles")}
          className="cursor-pointer text-sm hover:text-[#002f34]"
        >
          Mobiles
        </p>

        <p
          onClick={() => handleCategoryClick("Electronics")}
          className="cursor-pointer text-sm hover:text-[#002f34]"
        >
          Electronics
        </p>

        <p
          onClick={() => handleCategoryClick("Camera")}
          className="cursor-pointer text-sm hover:text-[#002f34]"
        >
          Camera
        </p>

        <p
          onClick={() => handleCategoryClick("Property")}
          className="cursor-pointer text-sm hover:text-[#002f34]"
        >
          Property
        </p>

        <p
          onClick={() => handleCategoryClick("Jobs")}
          className="cursor-pointer text-sm hover:text-[#002f34]"
        >
          Jobs
        </p>

        <p
          onClick={() => handleCategoryClick("Fashion")}
          className="cursor-pointer text-sm hover:text-[#002f34]"
        >
          Fashion
        </p>

        <p
          onClick={() => handleCategoryClick("Services")}
          className="cursor-pointer text-sm hover:text-[#002f34]"
        >
          Services
        </p>
      </div>
    </div>
  );
};

export default CategoryNav;
