"use client";
import Banner from "@/components/hero/banner";
import CategoryMenu from "@/components/hero/category";
import RamModal from "@/components/productModal";
import ProductCard from "@/components/singleCard";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
const [products, setProducts] = useState([]);
console.log(products);
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

 const [modalOpen, setModalOpen] = useState(false);
 const [selectedProduct, setSelectedProduct] = useState(null);
 const [qty, setQty] = useState(1);
 console.log(modalOpen) 
const handleModal = (product) => {
  setSelectedProduct(product); // Set selected product
  setModalOpen(true);          // Then open the modal
};

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
<p className="text-red-500 font-semibold border-l-[20px]  border-[#DB4444] pl-2 inline-block ">Our Products</p>


        <h2 className="text-4xl font-semibold ">Explore Our Products</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product, index) => (
          <ProductCard key={index} product={product} handleModal={handleModal}  />
        ))}
      </div>
    </section>


  {modalOpen && (
<RamModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  product={selectedProduct}
  setQty={setQty}
  qty={qty}
/>

)}

</div>



  );
}
