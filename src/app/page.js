"use client";
import Banner from "@/components/hero/banner";
import CategoryMenu from "@/components/hero/category";
import ProductCard from "@/components/singleCard";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
const [products, setProducts] = useState([]);
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/products.json");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  }, []); // No dependencies — only created once
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
<div className="container-custom">
  <div className="flex">
    <div className="w-[250px] me-4">
      <CategoryMenu />
    </div>

    <div className="flex-1  min-w-0"> {/* 👈 min-w-0 is crucial for flex children */}
      <Banner />
    </div>
  </div>

 <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-red-500 font-medium">Our Products</p>
        <h2 className="text-2xl font-bold">Explore Our Products</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
</div>



  );
}
