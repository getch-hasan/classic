"use client";

import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useProducts } from "@/context/ProductContext";
import Image from "next/image";

const ProductDetails = () => {
  const { slug } = useParams();
  const { products } = useProducts();

  const product = products.find(
    (p) => p.slug === slug || p.id.toString() === slug
  );

  // Initialize with fallback values
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);

  // Update state when product is available
  useEffect(() => {
    if (product) {
      setSelectedImage(product?.mainImage || product?.images?.[0] || "");
      setSelectedColor(product?.colours?.[0] || null);
      setSelectedSize(product?.sizes?.[0] || "");
    }
  }, [product]);

  if (!product) {
    return <div className="text-center py-20">Loading product details...</div>;
  }

  const stars = product.rating?.stars || 0;
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="p-6  container-custom">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        {product.breadcrumbs.join(" / ")}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Image Gallery */}
        <div className=" flex gap-4">
          <div className="flex flex-col gap-2">
            {product?.images?.map((img, idx) => (
              <Image
                height={100} 
                width={130}  
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className="bg-gray-100 p-5 h-full rounded-sm cursor-pointer"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
          <div className="flex-1">
            {selectedImage ? (
              <Image
                height={600} // Main image height
                width={500}  // Main image width
                src={selectedImage}
                alt="Main"
                className="mx-auto bg-gray-100 h-full p-20 rounded-sm"
              />
            ) : (
              <div className="w-full max-w-md mx-auto aspect-square bg-gray-100 animate-pulse" />
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-semibold">{product.name}</h2>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(fullStars)].map((_, i) => (
                <FaStar key={`full-${i}`} />
              ))}
              {hasHalfStar && <FaStarHalfAlt />}
              {[...Array(emptyStars)].map((_, i) => (
                <FaRegStar key={`empty-${i}`} />
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              ({product.rating?.reviews} Reviews)
            </span>
            <span className="text-green-600 font-semibold text-sm ml-2">
              {product.availability}
            </span>
          </div>

          <div className="text-2xl font-bold">${product.price}</div>

          <p className="text-gray-700">{product.description}</p>

          {/* Colors */}
          <div>
            <p className="text-sm font-medium">Colours:</p>
            <div className="flex gap-2 mt-1">
              {product.colours.map((color, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full border cursor-pointer ${
                    selectedColor?.hex === color.hex ? "ring-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <p className="text-sm font-medium">Size:</p>
            <div className="flex gap-2 mt-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`border px-3 py-1 rounded ${
                    selectedSize === size ? "bg-black text-white" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Buy Now */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded px-2">
              <button
                className="px-2 text-2xl border-r font-bold"
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              >
                −
              </button>
              <span className="px-4">{qty}</span>
              <button
                className="px-2 text-2xl font-bold border-l"
                onClick={() => setQty((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
              Buy Now
            </button>
            <button className="text-xl border p-2 rounded hover:bg-gray-100">
              ♡
            </button>
          </div>

          {/* Delivery Info */}
          <div className="mt-6 space-y-3 border-t pt-4">
            <div className="flex items-start gap-3">
              <span>🚚</span>
              <p>
                <strong>{product.delivery.type}</strong>
                <br />
                {product.delivery.note}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span>🔁</span>
              <p>
                <strong>{product.return.type}</strong>
                <br />
                {product.return.note}{" "}
                <span className="underline cursor-pointer">Details</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
