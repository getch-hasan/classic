"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/products.json");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
