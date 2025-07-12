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

  // Ensure arrays are always arrays (in case localStorage returns null/undefined)
  useEffect(() => {
    if (!Array.isArray(cart)) setCart([]);
    if (!Array.isArray(wishlist)) setWishlist([]);
    if (!Array.isArray(orders)) setOrders([]);
  }, []);

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    setCart(currentCart => {
      const safeCart = Array.isArray(currentCart) ? currentCart : [];
      const existingItem = safeCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return safeCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...safeCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(currentCart => {
      const safeCart = Array.isArray(currentCart) ? currentCart : [];
      return safeCart.filter(item => item.id !== productId);
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(currentCart => {
      const safeCart = Array.isArray(currentCart) ? currentCart : [];
      return safeCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    const safeCart = Array.isArray(cart) ? cart : [];
    return safeCart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    const safeCart = Array.isArray(cart) ? cart : [];
    return safeCart.reduce((count, item) => count + item.quantity, 0);
  };

  // Wishlist functions
  const addToWishlist = (product) => {
    setWishlist(currentWishlist => {
      const safeWishlist = Array.isArray(currentWishlist) ? currentWishlist : [];
      const exists = safeWishlist.some(item => item.id === product.id);
      if (exists) return safeWishlist;
      return [...safeWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(currentWishlist => {
      const safeWishlist = Array.isArray(currentWishlist) ? currentWishlist : [];
      return safeWishlist.filter(item => item.id !== productId);
    });
  };

  const isInWishlist = (productId) => {
    const safeWishlist = Array.isArray(wishlist) ? wishlist : [];
    return safeWishlist.some(item => item.id === productId);
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
    
    setOrders(currentOrders => {
      const safeOrders = Array.isArray(currentOrders) ? currentOrders : [];
      return [...safeOrders, newOrder];
    });
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
    cart: Array.isArray(cart) ? cart : [],
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    
    // Wishlist
    wishlist: Array.isArray(wishlist) ? wishlist : [],
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    
    // Orders
    orders: Array.isArray(orders) ? orders : [],
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