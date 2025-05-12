"use client";
import Banner from "@/components/hero/banner";
import CategoryMenu from "@/components/hero/category";
import RamModal from "@/components/productModal";
import ProductCard from "@/components/singleCard";
import { useProducts } from "@/context/ProductContext";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const { products } = useProducts();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [showAll, setShowAll] = useState(false);

  const handleModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const displayedProducts = showAll ? products : products?.slice(0, 8);

  return (
    <div className="container-custom">
    <div className="flex flex-col md:flex-row">
  {/* Sidebar - Category Menu */}
  <div className="w-full hidden md:block md:w-[250px] md:me-4 mb-4 md:mb-0">
    <CategoryMenu />
  </div>

  {/* Main Content - Banner */}
  <div className="flex-1 min-w-0">
    <Banner />
  </div>
</div>


      <section className="py-10 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-red-500 font-semibold border-l-[20px] border-[#DB4444] pl-2 inline-block">
            Our Products
          </p>
          <h2 className="text-4xl font-semibold">Explore Our Products</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts?.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              handleModal={handleModal}
            />
          ))}
        </div>

        {products?.length > 8 && (
          <div className="flex justify-center mt-6">
            <button
              className="bg-[#DB4444] cursor-pointer rounded px-5 text-white py-2"
              onClick={() => setShowAll(true)}
              disabled={showAll}
            >
              {showAll ? "All Products Loaded" : "View All Product"}
            </button>
          </div>
        )}
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
