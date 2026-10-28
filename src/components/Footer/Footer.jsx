import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 bg-[#ebeeef] text-[#002f34]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-10 md:grid-cols-4">
        {/* Popular Categories */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase">
            Popular Categories
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Cars</li> <li>Motorcycles</li> <li>Mobile Phones</li>{" "}
            <li>Electronics</li> <li>Furniture</li>{" "}
          </ul>
        </div>
        {/* Trending Searches */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase">
            Trending Searches
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Used Cars</li>
            <li>Used Bikes</li>
            <li>Mobile Phones</li>
            <li>Laptops</li>
            <li>Home Furniture</li>
          </ul>
        </div>
        {/* About */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase">About Us</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>About Our Project</li>
            <li>Contact Us</li>
            <li>Help & Support</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* Follow Us */}
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase">Follow Us</h3>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>Facebook</span>
            <span>Instagram</span>
            <span>YouTube</span>
          </div>
        </div>
      </div>
      {/* Copyright */}
      <div className="bg-[#002f34] px-6 py-4 text-center text-sm text-white">
        © {new Date().getFullYear()} OLX Clone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
