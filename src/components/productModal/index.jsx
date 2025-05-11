import React from "react";

export default function RamModal({isOpen, product, onClose,qty, setQty})  {
  if (!isOpen || !product) return null;
console.log(product)
  return (
   <div className="fixed inset-0 z-50 flex items-center justify-center">
  {/* Background overlay */}
  <div className="absolute inset-0  bg-gray-500 opacity-80"></div>

  {/* Modal content */}
  <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 z-10">
    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
    >
      &times;
    </button>

    <div className="flex flex-col md:flex-row gap-6">
      {/* Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={product.mainImage}
          alt={product.title}
          className="w-full max-w-xs"
        />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>

        <div className="space-y-1">
          <div className="bg-black inline-block px-2 text-white rounded-full py-1 font-semibold">
            Regular Price: <span>{product.price || "N/A"}৳</span>
          </div>
          <div className="flex gap-2">
            <div className="bg-red-600 font-semibold text-white inline-block px-2 rounded-full py-1">
              Special Price: {product.price || "N/A"}৳
            </div>
            <div className="bg-teal-600 font-semibold text-white inline-block px-2 rounded-full py-1">
              E-com Price: {product.price || "N/A"}৳
            </div>
          </div>
        </div>

        <div>
          <p className="bg-gray-200 inline-block px-2 rounded-full">
            <span className="font-semibold">Brand:</span>{" "}
            <span className="text-gray-700">{product.brand || "Non Brand"}</span>
          </p>
          <span className="ml-4 text-blue-800 font-semibold">In-Stock</span>
        </div>

        <div className="text-sm text-gray-700 space-y-1">
          <h1 className="font-semibold text-lg">Key Feature</h1>
             <div
          className="text-gray-800 text-start"
          dangerouslySetInnerHTML={{
            __html: ` <p>${product?.description}</p>`,
          }}
        />
        </div>

        <div className="flex items-center gap-4 pt-3">
          <div className="flex items-center border rounded px-2">
            <button
              className="px-2 text-2xl border-r font-extrabold"
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
            >
              −
            </button>
            <span className="px-4">{qty}</span>
            <button
              className="px-2 text-2xl font-extrabold border-l"
              onClick={() => setQty((prev) => prev + 1)}
            >
              +
            </button>
          </div>
          <button className="bg-purple-700 text-white px-6 py-1 rounded hover:bg-purple-800">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

