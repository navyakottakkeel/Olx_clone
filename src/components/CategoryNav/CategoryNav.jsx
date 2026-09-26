import React from "react";
import arrow from "../../assets/arrow-down.svg";

const CategoryNav = () => {
  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-4 whitespace-nowrap scrollbar-hide">

        <div className="flex cursor-pointer items-center gap-2">
          <p className="font-bold text-[#002f34]">
            ALL CATEGORIES
          </p>

          <img
            src={arrow}
            alt="arrow"
            className="w-4"
          />
        </div>

        <p className="cursor-pointer text-sm hover:text-[#002f34]">
          Cars
        </p>

        <p className="cursor-pointer text-sm hover:text-[#002f34]">
          Bikes
        </p>

        <p className="cursor-pointer text-sm hover:text-[#002f34]">
          Mobiles
        </p>

        <p className="cursor-pointer text-sm hover:text-[#002f34]">
          Electronics
        </p>

        <p className="cursor-pointer text-sm hover:text-[#002f34]">
          Property
        </p>

        <p className="cursor-pointer text-sm hover:text-[#002f34]">
          Jobs
        </p>

        <p className="cursor-pointer text-sm hover:text-[#002f34]">
          Fashion
        </p>

        <p className="cursor-pointer text-sm hover:text-[#002f34]">
          Services
        </p>

      </div>
    </div>
  );
};

export default CategoryNav;