"use client";
import CartDrawer from "@/components/cardDraware";
import Image from "next/image";
import { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";
import CategoryMenu from "@/components/hero/category";

export default function Navbar() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      <nav className="border-b-2 border-gray-200 bg-white sticky top-0 z-50">
        <div className="container-custom flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            Exclusive
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-8 text-base">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`cursor-pointer pb-1 ${
                    pathname === item.path
                      ? "border-b-2 border-gray-300"
                      : "border-b-2 border-transparent hover:border-gray-300"
                  }`}
                >
                  {item?.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search Bar (hidden on mobile) */}
            <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-md w-64">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-transparent text-sm outline-none w-full"
              />
              <FaSearch className="text-gray-700" />
            </div>

            {/* Wishlist Icon */}
            <Image src="/nav/Vector.svg" height={20} width={17} alt="Wishlist" />

            {/* Cart Icon */}
            <button onClick={() => setCartOpen(true)}>
              <Image src="/nav/Cart1.svg" height={20} width={20} alt="Cart" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-xl"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
{isMobileMenuOpen && (
  <div className="fixed inset-0 z-40 bg-black/50 md:hidden">
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-white p-6 overflow-y-auto shadow-md">
      {/* Close Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="text-xl text-gray-600 hover:text-black"
          aria-label="Close Menu"
        >
          <FaTimes />
        </button>
      </div>

      {/* Mobile Nav Links */}
      <ul className="flex flex-col gap-4 text-base mb-6">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`block py-1 ${
                pathname === item.path
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Category Menu */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        <CategoryMenu />
      </div>
    </div>
  </div>
)}


      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
