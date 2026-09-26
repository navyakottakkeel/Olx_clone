import React from "react";

const Banner = () => {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl bg-[#e8f5f5] px-6 py-10 text-center md:flex-row md:justify-between md:text-left">

          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#002f34]">
              Buy & Sell Near You
            </p>

            <h1 className="text-3xl font-bold leading-tight text-[#002f34] md:text-4xl">
              Find what you need.
              <br />
              Sell what you don't.
            </h1>

            <p className="mt-4 text-sm text-gray-600 md:text-base">
              Discover great deals around you or post an ad and
              connect with interested buyers.
            </p>

            <button className="mt-6 rounded-md bg-[#002f34] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#00434a]">
              Browse Products
            </button>
          </div>

          <div className="mt-8 flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-sm md:mr-10 md:mt-0 md:h-52 md:w-52">
            <span className="text-5xl">🛍️</span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;