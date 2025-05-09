import Image from "next/image";
import { FaHeart, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="border-b-2 border-gray-200">
        <div className="flex items-center justify-between container-custom py-4  bg-white">
      {/* Logo */}
      <div className="text-2xl font-bold">Exclusive</div>

      {/* Nav Links */}
      <ul className="hidden md:flex space-x-8 text-base f ">
        <li className="hover:text-purple-600 cursor-pointer border-b-2 border-gray-200">Home</li>
        <li className="hover:text-purple-600 cursor-pointer">Contact</li>
        <li className="hover:text-purple-600 cursor-pointer">About</li>
        <li className="hover:text-purple-600 cursor-pointer">Sign Up</li>
      </ul>

      {/* Search and Icons */}
      <div className="flex items-center justify-between space-x-4">
  {/* Search Box */}
  <div className="hidden md:flex items-center bg-primary px-3 py-1 rounded-md w-64">
    <input
      type="text"
      placeholder="What are you looking for?"
      className="bg-transparent text-sm outline-none w-full"
    />
    <FaSearch className="text-[#000000]" />
  </div>

  {/* Icons */}
 <Image src='/nav/Vector.svg' height={20} width={17} alt=""/>
 <Image src='/nav/Cart1.svg' height={10} width={20} alt=""/>
  
</div>

    </div>
    </nav>
  );
}
