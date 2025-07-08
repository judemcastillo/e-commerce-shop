import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../localStorage/useLocalStorage';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('shopping-cart', []);
  const [wishlist, setWishlist] = useLocalStorage('wishlist', []);
  const [orders, setOrders] = useLocalStorage('orders', []);
  const [user, setUser] = useLocalStorage('user', null);

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...currentCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    setWishlist(currentWishlist => {
      const exists = currentWishlist.some(item => item.id === product.id);
      if (exists) return currentWishlist;
      return [...currentWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(currentWishlist => 
      currentWishlist.filter(item => item.id !== productId)
    );
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Order functions
  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: cart,
      total: getCartTotal(),
      status: 'pending',
      ...orderData
    };
    
    setOrders(currentOrders => [...currentOrders, newOrder]);
    clearCart();
    return newOrder;
  };

  // User functions
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    // Cart
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    
    // Wishlist
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    
    // Orders
    orders,
    createOrder,
    
    // User
    user,
    login,
    logout,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};