"use client"
import { createContext, useContext, useState, useEffect } from "react";

// Create the Cart Context
const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on first load
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Update cart in localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
 // Add item to the
const addToCart = (item) => {
  setCartItems((prev) => {
    const existingItem = prev.find((i) => i.id === item.id);
    if (existingItem) {
      // If item already exists, increase quantity by 1
      return prev.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    }
    // If new item, add it with quantity = 1
    return [...prev, { ...item, quantity: 1 }];
  });
};


  // Remove item from the cart
  const removeFromCart = (id) => {
    setCartItems((prev) => {
      const updatedItems = prev.filter((item) => item.id !== id);
      return updatedItems; // This updates the UI immediately
    });
  };

  // Increase item quantity
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease item quantity
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
