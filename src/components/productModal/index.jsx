import React from "react";

export default function RamModal({ isOpen, product, onClose, qty, setQty }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-500 opacity-80"></div>

      {/* Modal Container */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-screen-md md:max-w-3xl p-4 sm:p-6 z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Product Image */}
          <div className="flex-1 flex items-center justify-center">
            <img
              src={product.mainImage}
              alt={product.title}
              className="w-full max-w-xs object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-3">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {product.name}
            </h2>

            <div className="space-y-2">
              <p className="bg-black inline-block px-2 text-white rounded-full py-1 font-semibold text-sm sm:text-base">
                Regular Price: <span>{product?.price || "N/A"}৳</span>
              </p>

             <div className="flex flex-wrap sm:flex-nowrap gap-2">
  <p className="bg-red-600 font-semibold text-white px-2 rounded-full py-1 whitespace-nowrap text-sm sm:text-base">
    Special Price: {product?.price || "N/A"}৳
  </p>
  <p className="bg-teal-600 font-semibold text-white px-2 rounded-full py-1 whitespace-nowrap text-sm sm:text-base">
    E-com Price: {product?.price || "N/A"}৳
  </p>
</div>

            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <p className="bg-gray-200 px-2 py-1 rounded-full">
                <span className="font-semibold">Brand:</span>{" "}
                <span className="text-gray-700">{product.brand || "Non Brand"}</span>
              </p>
              <span className="text-blue-800 font-semibold">In-Stock</span>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <h1 className="font-semibold text-base sm:text-lg">Key Feature</h1>
              <div
                className="text-gray-800 text-start"
                dangerouslySetInnerHTML={{
                  __html: `<p>${product?.description}</p>`,
                }}
              />
            </div>

            {/* Quantity & Button */}
            <div className="flex flex-row sm:items-center gap-4 pt-3">
              <div className="flex items-center border rounded px-2">
                <button
                  className="px-2 text-xl border-r font-extrabold"
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                >
                  −
                </button>
                <span className="px-4">{qty}</span>
                <button
                  className="px-2 text-xl font-extrabold border-l"
                  onClick={() => setQty((prev) => prev + 1)}
                >
                  +
                </button>
              </div>

              <button className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
