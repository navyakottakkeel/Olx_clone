import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ name, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/category/${name}`);
  };
  
  return (
    <div
    onClick={handleClick}
     className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
        {icon}
      </div>

      <p className="text-sm font-semibold text-[#002f34]">
        {name}
      </p>
    </div>
  );
};

export default CategoryCard;