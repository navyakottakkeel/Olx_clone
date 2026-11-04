import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import uploadToCloudinary from "../../utils/uploadToCloudinary";
import toast from "react-hot-toast";

const PostAd = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
  const [errors, setErrors] = useState({});

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

    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Product title is required.";
    }

    if (!price || Number(price) <= 0) {
      newErrors.price = "Enter a valid price greater than 0.";
    }

    if (!location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!category) {
      newErrors.category = "Please select a category.";
    }

    if (!description.trim()) {
      newErrors.description = "Product description is required.";
    }

    if (existingImages.length === 0 && selectedImages.length === 0) {
      newErrors.images = "Please select at least one image.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorField = Object.keys(newErrors)[0];

      const firstErrorElement = document.getElementById(firstErrorField);

      firstErrorElement?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      firstErrorElement?.focus();

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
      toast.error(
        error.message || "Failed to upload images. Please try again."
      );
      setIsUploading(false);
      return;
    }

    const existingAds = JSON.parse(localStorage.getItem("myads")) || [];

    if (editId) {
      const selectedAd = existingAds.find((ad) => ad.id === editId);

      if (!selectedAd) {
        toast.error("This ad could not be found.");
        setIsUploading(false);
        return;
      }

      if (selectedAd.userId !== user.uid) {
        toast.error("You can only edit your own ads.");
        setIsUploading(false);
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

      setIsUploading(false);
      toast.success("Your ad has been updated successfully!");

      navigate("/my-ads");
    } else {
      const newAd = {
        id: Date.now().toString(),
        userId: user.uid,
        ...formData,
        images: finalImages,
        image: finalImages[0] || "",
        price: Number(price),
        date: new Date().toISOString(),
      };

      const updatedAds = [...existingAds, newAd];

      localStorage.setItem("myads", JSON.stringify(updatedAds));
      setIsUploading(false);
      setFormData({
        title: "",
        price: "",
        images: [],
        location: "",
        category: "",
        description: "",
      });

      setSelectedImages([]);
      setExistingImages([]);

      toast.success("Your ad has been posted successfully!");
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
          noValidate
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
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });

                setErrors((prev) => ({
                  ...prev,
                  title: "",
                }));
              }}
              className={`w-full rounded-md border px-4 py-3 outline-none focus:border-gray-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
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
              onChange={(e) => {
                setFormData({ ...formData, price: e.target.value });
                setErrors((prev) => ({
                  ...prev,
                  price: "",
                }));
              }}
              className={`w-full rounded-md border px-4 py-3 outline-none focus:border-gray-500 ${
                errors.price ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price}</p>
            )}
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

                setErrors((prev) => ({
                  ...prev,
                  images: "",
                }));
              }}
              className={`w-full rounded-md border px-4 py-3 outline-none focus:border-gray-500 ${
                errors.images ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.images && (
              <p className="mt-1 text-sm text-red-600">{errors.images}</p>
            )}

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
              onChange={(e) => {
                setFormData({ ...formData, location: e.target.value });

                setErrors((prev) => ({
                  ...prev,
                  location: "",
                }));
              }}
              className={`w-full rounded-md border px-4 py-3 outline-none focus:border-gray-500 ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
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
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value });

                setErrors((prev) => ({
                  ...prev,
                  category: "",
                }));
              }}
              className={`w-full rounded-md border px-4 py-3 outline-none focus:border-gray-500 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled>
                Select a category
              </option>

              <option value="Cars">Cars</option>
              <option value="Bikes">Bikes</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Electronics">Electronics</option>
              <option value="Camera">Camera</option>
              <option value="Property">Property</option>
              <option value="Jobs">Jobs</option>
              <option value="Fashion">Fashion</option>
              <option value="Services">Services</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
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
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });

                setErrors((prev) => ({
                  ...prev,
                  description: "",
                }));
              }}
              className={`w-full rounded-md border px-4 py-3 outline-none focus:border-gray-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="mt-8 w-full rounded-md bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-gray-700"
          >
            {isUploading
              ? editId
                ? "Updating..."
                : "Posting..."
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
