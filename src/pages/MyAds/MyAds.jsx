import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const MyAds = () => {

  const [ads, setAds] = useState([]);

  useEffect(() => {
    const savedAds = JSON.parse(localStorage.getItem("myads")) || [];
    setAds(savedAds)
  },[])

  return (
    <div className="mx-auto max-w-7xl">
  <h1 className="text-2xl font-bold text-gray-800">
    My Ads
  </h1>

  <p className="mt-2 text-gray-500">
    Manage the advertisements you have posted.
  </p>

  {ads.length === 0 ? (
    <p className="mt-8 text-center text-gray-500">
      You haven't posted any ads yet.
    </p>
  ) : (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {ads.map((ad) => (
        <div
          key={ad.id}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          <img
            src={ad.image}
            alt={ad.title}
            className="h-48 w-full object-cover"
          />

          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {ad.title}
            </h2>

            <p className="mt-2 text-xl font-bold text-gray-900">
              ₹{ad.price.toLocaleString("en-IN")}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {ad.location}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Category: {ad.category}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
  );
};

export default MyAds;