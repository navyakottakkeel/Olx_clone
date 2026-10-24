import React from "react";
import { useState } from "react";

const PostAd = () => {
  const [formData, setFormData] = useState({
    title : '',
    price : '',
    image : '',
    location : '',
    category : '',
    description : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const {title, price, image, location, category, description} = formData;

    if(!title || !price || !image || !location || !category || !description){
      alert('Please fill all fields');
      return;
    }

    const existingAds = JSON.parse(localStorage.getItem("myads")) || [];

    const newAd = {
      id: Date.now().toString(),
      ...formData,
      price: Number(price),
      date: new Date().toISOString(),
    }

    const updatedAds = [...existingAds, newAd];

    localStorage.setItem("myads", JSON.stringify(updatedAds));

    alert("Your ad has been posted successfully!");

    console.log(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-8 pt-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800">Post an Ad</h1>

        <p className="mt-2 text-gray-500">
          Create an advertisement to sell your product.
        </p>

        <form 
        onSubmit={handleSubmit}
        className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Product Title
            </label>

            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g. iPhone 13"
              value={formData.title}
              onChange={(e) => 
              setFormData({...formData, title:e.target.value})}
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Price (₹)
            </label>

            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter your price"
              min="1"
              value={formData.price}
              onChange={(e) => 
              setFormData({...formData, price:e.target.value})}
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Product Image URL
            </label>

            <input
              type="url"
              id="image"
              name="image"
              placeholder="Enter your product image URL"
              value={formData.image}
              onChange={(e) => 
              setFormData({...formData, image:e.target.value})}
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Location
            </label>

            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g. Kannur, Kerala"
              value={formData.location}
              onChange={(e) => 
              setFormData({...formData, location:e.target.value})}
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={(e) => 
              setFormData({...formData, category:e.target.value})}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gray-500"
            >
              <option value="" disabled>
                Select a category
              </option>

              <option value="Cars">Cars</option>
              <option value="Bikes">Bikes</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Electronics">Electronics</option>
              <option value="Property">Property</option>
              <option value="Jobs">Jobs</option>
              <option value="Fashion">Fashion</option>
              <option value="Services">Services</option>
            </select>
          </div>

          <div className="mt-6">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Product Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Describe your product..."
              value={formData.description}
              onChange={(e) => 
              setFormData({...formData, description:e.target.value})}
              className="w-full resize-y rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
            />
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-md bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            Post Ad
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;
