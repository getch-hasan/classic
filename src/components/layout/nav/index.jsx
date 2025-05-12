"use client";
import CartDrawer from "@/components/cardDraware";
import Image from "next/image";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isCartOpen, setCartOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Contact", path: "/contact" },
    { label: "About", path: "/about" },
    { label: "Sign Up", path: "/sign-up" },
    { label: "Admin", path: "/admin" },
  ];

  return (
    <>
      <nav className="border-b-2 border-gray-200">
        <div className="flex items-center justify-between container-custom py-4 bg-white">
          {/* Logo */}
          <Link href={'/'} className="text-2xl font-bold">Exclusive</Link>

          {/* Nav Links */}
          <ul className="hidden md:flex space-x-8 text-base">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`cursor-pointer pb-1 ${
                    pathname === item.path
                      ? "border-b-2 border-gray-200 "
                      : "border-b-2 border-transparent hover:border-gray-200"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Box */}
            <div className="hidden md:flex items-center bg-[#F5F5F5] px-3 py-1 rounded-md w-64">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent text-sm outline-none w-full"
              />
              <FaSearch className="text-[#000000]" />
            </div>

            {/* Wishlist Icon */}
            <Image src="/nav/Vector.svg" height={20} width={17} alt="Wishlist" />

            {/* Cart Icon */}
            <button onClick={() => setCartOpen(true)}>
              <Image src="/nav/Cart1.svg" height={20} width={20} alt="Cart" />
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
