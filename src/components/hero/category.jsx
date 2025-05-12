"use client";

import { FaAngleRight } from "react-icons/fa";
export const categories = [
  {
    name: "Woman’s Fashion",
    subcategories: [
      { name: "Clothing" },
      { name: "Accessories" },
      { name: "Shoes" },
      { name: "Bags" },
    ],
  },
  {
    name: "Men’s Fashion",
    subcategories: [
      { name: "Shirts" },
      { name: "Pants" },
      { name: "Shoes" },
      { name: "Watches" },
    ],
  },
  {
    name: "Electronics",
    subcategories: [
      { name: "Mobile Phones" },
      { name: "Laptops" },
      { name: "Headphones" },
      { name: "Cameras" },
    ],
  },
  {
    name: "Home & Kitchen",
  
  },
];

function SubMenu({ items }) {
  return (
    <ul className="absolute left-full top-0 bg-white border shadow-lg min-w-[200px] z-50">
      {items.map((item, i) => (
        <li
          key={i}
          className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap cursor-pointer"
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default function CategoryMenu() {
  return (
    <ul className="w-[250px] border-r border-gray-200  ">
      {categories.map((cat, idx) => (
        <li
          key={idx}
          className="relative group pe-4 text-base leading-6 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
        >
          <span>{cat.name}</span>
          {cat?.subcategories && <FaAngleRight className="ml-2 text-sm" />}
          {cat?.subcategories && (
            <div className="hidden group-hover:block absolute left-full top-0 z-50">
              <SubMenu items={cat.subcategories} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
