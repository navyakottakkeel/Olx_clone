import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import products from "../../data/products";

const ProductDetails = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState('')

  const {wishlist, setWishlist} = useWishlist();

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMessage("");
        setMessageError("");
        setShowContactModal(false);
      }
    };
  
    document.addEventListener("keydown", handleEscape);
  
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()){
      setMessageError('Please enter Message');
      return;
    } 
    alert("Message Send Successfully");
    setMessage("");
    setShowContactModal(false);
  };

  const navigate = useNavigate();

  const { id } = useParams();
  const productId = Number(id);
  const product = products.find((product) => product.id === productId);

  const handleWishlist = () => {
    const alreadyExists = wishlist.some((item) => item.id === product.id);
    if(alreadyExists){
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      return;
    }
    setWishlist([...wishlist, product])
  }

  const isWishlisted = wishlist.some((item) => item.id === product.id)


  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#002f34]">
            Product Not Found
          </h1>

          <p className="mt-2 text-gray-600">
            Sorry, the product you're looking for doesn't exist.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-md bg-[#002f34] px-5 py-2 text-sm font-semibold text-white hover:bg-[#004f54]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-24 min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#002f34] shadow-sm transition hover:bg-gray-100"
        >
          ← Back
        </button>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative overflow-hidden rounded-lg bg-white shadow-sm">
            <img
              src={product?.image}
              alt={product?.title}
              className="h-80 w-full object-cover md:h-96"
            />
            <span className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white">
              1 / 1
            </span>
          </div>

          {/* Product Information */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl font-bold text-[#002f34]">
                {product?.title}
              </h1>

              <div className="flex items-center gap-3">
                <button
                onClick={(event) => {
                  event.stopPropagation()
                  handleWishlist()
                }}
                  className="text-2xl text-gray-600 hover:text-[#002f34]"
                  aria-label="Add to wishlist"
                >
                  {isWishlisted ? "❤️" : "♡"}
                </button>

                <button
                  className="text-xl text-gray-600 hover:text-[#002f34]"
                  aria-label="Share product"
                >
                  ↗
                </button>
              </div>
            </div>

            <p className="mt-6 border-t border-gray-200 pt-6 text-3xl font-bold text-[#002f34]">
              {product?.price}
            </p>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-[#002f34]">
                Product Details
              </h2>

              <div className="mt-3 space-y-3 text-sm text-gray-600">
                <p>
                  <span>📂</span>
                  <span className="font-semibold">Category:</span>{" "}
                  {product?.category}
                </p>

                <p>
                  <span>📍</span>
                  <span className="font-semibold">Location:</span>{" "}
                  {product?.location}
                </p>

                <p>
                  <span>📅 </span>
                  <span className="font-semibold">Posted:</span> {product?.date}
                </p>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-[#002f34]">
                Description
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {product.description}
              </p>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-[#002f34]">Seller</h2>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-2xl">
                  👤
                </div>

                <div>
                  <p className="font-semibold text-gray-800">
                    {product?.seller?.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Member since {product?.seller?.memberSince}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="cursor-pointer mt-5 w-full rounded-md border-2 border-[#002f34] py-3 text-sm font-semibold text-[#002f34] transition hover:bg-[#002f34] hover:text-white"
                >
                  Contact Seller
                </button>
              </div>
            </div>
            <div className="mt-8 rounded-lg bg-gray-100 p-4">
              <h2 className="font-semibold text-[#002f34]">🛡️ Safety Tip</h2>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Never share sensitive information or make payments before
                verifying the seller and product.
              </p>
            </div>
            <button className="mt-5 text-sm font-semibold text-gray-500 hover:text-[#002f34] hover:underline">
              ⚑ Report this ad
            </button>
          </div>
        </div>
      </div>

      {showContactModal && (
        <div
          onClick={() => {
            setShowContactModal(false);
            setMessage("");
            setMessageError("")
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#002f34]">
                Contact Seller
              </h2>

              <button
                onClick={() => {
                  setShowContactModal(false);
                  setMessage("");
                  setMessageError("")
                }}
                className="text-2xl text-gray-500 hover:text-gray-800"
                aria-label="Close contact modal"
              >
                ×
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              You are contacting{" "}
              <span className="font-semibold text-gray-800">
                {product?.seller?.name}
              </span>
            </p>

            <div className="mt-5 rounded-md bg-gray-100 p-4">
              <p className="text-sm font-semibold text-gray-700">📞 Phone</p>

              <a
                href={`tel:${product?.seller?.phone}`}
                className="mt-1 block text-sm font-medium text-[#002f34] hover:underline"
              >
                {product?.seller?.phone}
              </a>
            </div>

            <div className="mt-5">
              <label
                htmlFor="seller-message"
                className="text-sm font-semibold text-gray-700"
              >
                Message
              </label>

              <textarea
                id="seller-message"
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value)
                  setMessageError("")
                }}
                placeholder="Hi, is this product still available?"
                rows="4"
                maxLength={250}
                className="mt-2 w-full resize-none rounded-md border border-gray-300 p-3 text-sm outline-none focus:border-[#002f34]"
              />
              <p className="mt-1 text-right text-xs text-gray-500">
                {message.length}/250
              </p>
              {messageError && (
                <p className="mt-1 text-sm text-red-500">{messageError}</p>
              )}
            </div>

            <button
              onClick={handleSendMessage}
              className="mt-6 w-full rounded-md bg-[#002f34] py-3 text-sm font-semibold text-white transition hover:bg-[#004f54]"
            >
              Send Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
