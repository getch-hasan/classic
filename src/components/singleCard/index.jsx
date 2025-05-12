import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaRegHeart } from "react-icons/fa";

const ProductCard = ({product ,handleModal }) => {
    const [selectedColor, setSelectedColor] = useState("");
    const rating = product?.rating?.stars || 0;
const fullStars = Math.floor(rating);
const hasHalfStar = rating % 1 >= 0.5;
const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
  return (
    <Link href={`details/${product?.id}`} className="w-64  rounded">
      {/* Product Image */}
      <div className="relative group  ">
        <Image height={250} width={270}
          src={product?.mainImage}
          alt="ASUS FHD Gaming Laptop"
          className="w-full h-[250px] bg-gray-100 p-8 object-contain rounded-lg "
        />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button className="w-6 h-6 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100">
          <FaRegHeart className="text-gray-600" />
        </button>
        <button  onClick={(e) => {
    e.stopPropagation(); 
    e.preventDefault();  
    handleModal(product);
  }} className="w-6 h-6 rounded-full bg-white shadow flex items-center justify-center cursor-pointer hover:bg-gray-100">
  <Image src={'/product/eye.svg'} height={20} width={17} alt=""/>
</button>


          
      </div>
      <p className="absolute inline-block bg-[#00FF66] rounded px-2 top-3 left-3 text-white ">{product?.arrival}</p>
   <button
  onClick={(e) => {
    e.preventDefault(); // prevent Link navigation
    e.stopPropagation(); // stop bubbling
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(item => item.id === product.id);
    if (!exists) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }}
  className="absolute hidden group-hover:block bottom-0 w-full bg-black font-medium cursor-pointer py-1 text-white"
>
  Add To Cart
</button>

      </div>

   <div className="py-4">
       {/* Product Title */}
      <h3 className="text-base leading-6 font-medium text-gray-800 mb-1">
       {product?.name}
      </h3>

      {/* Price and Rating */}
      <div className="flex items-center gap-2">
        <span className="text-[#DB4444] font-medium">${product?.price}</span>
<div className="flex items-center text-sm text-yellow-400">
  {[...Array(fullStars)].map((_, i) => (
    <FaStar key={`full-${i}`} />
  ))}
  {hasHalfStar && <FaStarHalfAlt key="half" />}
  {[...Array(emptyStars)].map((_, i) => (
    <FaRegStar key={`empty-${i}`} />
  ))}
</div>

        <span className="text-gray-500 text-sm font-semibold">({product?.rating?.stars})</span>
      </div>
  <div className="flex items-center gap-2 mt-2">
 {product?.colours?.map((color, index) => (
  <label
    key={index}
    htmlFor={`color-${index}`}
    className="cursor-pointer"
    onClick={(e) => {
      e.stopPropagation(); // Prevent bubbling to Link
      e.preventDefault();  // Prevent navigation
      setSelectedColor(color.hex); // Optional: track selection
    }}
  >
    <input
      type="radio"
      name="color"
      value={color?.hex}
      id={`color-${index}`}
      className="hidden"
    />
    <div
      className={`w-5 h-5 rounded-full transition border-2 ${
        selectedColor === color.hex ? 'border-black' : 'border-transparent'
      }`}
      style={{ backgroundColor: color.hex }}
    />
  </label>
))}

</div>


   </div>
    </Link>
  );
};

export default ProductCard;
