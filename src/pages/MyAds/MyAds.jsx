import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setAds([]);
      return;
    }
  
    const savedAds = JSON.parse(localStorage.getItem("myads")) || [];
  
    const userAds = savedAds.filter((ad) => ad.userId === user.uid);
  
    setAds(userAds);
  }, [user]);

  console.log("myads:", localStorage.getItem("myads"));
console.log("myAds:", localStorage.getItem("myAds"));

const handleDelete = (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this ad?"
  );

  if (!confirmDelete) {
    return;
  }

  const savedAds = JSON.parse(localStorage.getItem("myads")) || [];

  const updatedAds = savedAds.filter((ad) => ad.id !== id);

  localStorage.setItem("myads", JSON.stringify(updatedAds));

  setAds(updatedAds.filter((ad) => ad.userId === user.uid));
};

  return (
    <div className="mx-auto max-w-7xl pt-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">My Ads</h1>

        <button
          onClick={() => navigate("/post-ad")}
          className="rounded-md bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          + Post New Ad
        </button>
      </div>

      <p className="mt-2 text-gray-500">
        Manage the advertisements you have posted.
      </p>

      <p className="mt-2 text-sm font-medium text-blue-600">
        You have posted {ads.length} {ads.length === 1 ? "ad" : "ads"}.
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

                <p className="mt-2 text-sm text-gray-500">{ad.location}</p>

                <p className="mt-1 text-sm text-gray-500">
                  Category: {ad.category}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Posted on:{" "}
                  {ad.date
                    ? new Date(ad.date).toLocaleDateString("en-IN")
                    : "Date unavailable"}
                </p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => navigate(`/post-ad?editId=${ad.id}`)}
                    className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => navigate(`/product/${ad.id}`)}
                    className="flex-1 rounded-md bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
                  >
                    View Ad
                  </button>

                  <button
                    onClick={() => handleDelete(ad.id)}
                    className="flex-1 rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAds;
