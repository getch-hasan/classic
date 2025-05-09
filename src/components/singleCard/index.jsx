import Image from "next/image";
import { FaStar, FaRegHeart, FaEye } from "react-icons/fa";

const ProductCard = () => {
  return (
    <div className="w-64  rounded  relative group">
      {/* Wishlist and View Icons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2">
        <button className="w-6 h-6 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100">
          <FaRegHeart className="text-gray-600" />
        </button>
        <button className="w-6 h-6 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100">
         <Image src='/product/eye.svg' height={20} width={17} alt=""/>
        </button>
      </div>

      {/* Product Image */}
      <div className=" ">
        <Image height={250} width={270}
          src="/product/car.png"
          alt="ASUS FHD Gaming Laptop"
          className="w-full bg-gray-100 p-8 object-contain rounded-lg "
        />
      </div>

   <div className="py-4">
       {/* Product Title */}
      <h3 className="text-base leading-6 font-medium text-gray-800 mb-1">
        ASUS FHD Gaming Laptop
      </h3>

      {/* Price and Rating */}
      <div className="flex items-center gap-2">
        <span className="text-[#DB4444] font-medium">$700</span>
        <div className="flex items-center  text-yellow-400 text-sm">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <span className="text-gray-500 text-sm font-semibold">(325)</span>
      </div>
   </div>
    </div>
  );
};

export default ProductCard;
