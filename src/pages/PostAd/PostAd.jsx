import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import uploadToCloudinary from "../../utils/uploadToCloudinary";

const PostAd = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const editId = searchParams.get("editId");

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    images: [],
    location: "",
    category: "",
    description: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleRemoveImage = (indexToRemove) => {
    setSelectedImages((previousImages) =>
      previousImages.filter((_, index) => index !== indexToRemove)
    );
  };

  useEffect(() => {
    if (!editId) return;

    const savedAds = JSON.parse(localStorage.getItem("myads")) || [];

    const selectedAd = savedAds.find((ad) => ad.id === editId);

    if (selectedAd) {
      setFormData({
        title: selectedAd.title,
        price: selectedAd.price.toString(),
        images:
          selectedAd.images || (selectedAd.image ? [selectedAd.image] : []),
        location: selectedAd.location,
        category: selectedAd.category,
        description: selectedAd.description,
      });

      setExistingImages(
        selectedAd.images || (selectedAd.image ? [selectedAd.image] : [])
      );

      setSelectedImages([]);
    }
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, price, location, category, description } = formData;

    if (
      !title.trim() ||
      !price ||
      Number(price) <= 0 ||
      !location.trim() ||
      !category ||
      !description.trim()
    ) {
      alert("Please fill in all fields with valid information.");
      return;
    }

    if (existingImages.length === 0 && selectedImages.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    let finalImages = [];
    setIsUploading(true);

    try {
      const uploadImageUrls =
        selectedImages.length > 0
          ? await Promise.all(
              selectedImages.map((imageFile) => uploadToCloudinary(imageFile))
            )
          : [];

      finalImages = [...existingImages, ...uploadImageUrls];
    } catch (error) {
      console.error("Image upload failed:", error);
      alert(error.message || "Failed to upload images. Please try again.");

      return;
    } finally {
      setIsUploading(false);
    }

    const existingAds = JSON.parse(localStorage.getItem("myads")) || [];

    if (editId) {
      const adExists = existingAds.some((ad) => ad.id === editId);

      if (!adExists) {
        alert("This ad could not be found.");
        return;
      }

      const updatedAds = existingAds.map((ad) =>
        ad.id === editId
          ? {
              ...ad,
              ...formData,
              images: finalImages,
              image: finalImages[0] || "",
              price: Number(price),
            }
          : ad
      );

      localStorage.setItem("myads", JSON.stringify(updatedAds));

      alert("Your ad has been updated successfully!");

      navigate("/my-ads");
    } else {
      const newAd = {
        id: Date.now().toString(),
        ...formData,
        images: finalImages,
        image: finalImages[0] || "",
        price: Number(price),
        date: new Date().toISOString(),
      };

      const updatedAds = [...existingAds, newAd];

      localStorage.setItem("myads", JSON.stringify(updatedAds));

      alert("Your ad has been posted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-8 pt-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-gray-800">Post an Ad</h1>

        <p className="mt-2 text-gray-500">
          Create an advertisement to sell your product.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
        >
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
                setFormData({ ...formData, title: e.target.value })
              }
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
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
            />
          </div>

          <div className="mt-6">
            <label
              htmlFor="images"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Product Images
            </label>

            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setSelectedImages(files);
              }}
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {existingImages.map((imageUrl, index) => (
                <div
                  key={`existing-${index}`}
                  className="relative overflow-hidden rounded-lg border"
                >
                  <img
                    src={imageUrl}
                    alt={`Existing product ${index + 1}`}
                    className="h-32 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setExistingImages((previousImages) =>
                        previousImages.filter(
                          (_, imageIndex) => imageIndex !== index
                        )
                      )
                    }
                    className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-sm text-red-600 shadow hover:bg-red-50"
                    aria-label={`Remove existing image ${index + 1}`}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {selectedImages.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="relative overflow-hidden rounded-lg border"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected product ${index + 1}`}
                    className="h-32 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-white px-2 py-1 text-sm text-red-600 shadow hover:bg-red-50"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
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
                setFormData({ ...formData, location: e.target.value })
              }
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
                setFormData({ ...formData, category: e.target.value })
              }
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
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full resize-y rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="mt-8 w-full rounded-md bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            {isUploading
              ? "Uploading Images..."
              : editId
              ? "Update Ad"
              : "Post Ad"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAd;
