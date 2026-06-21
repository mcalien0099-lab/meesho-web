"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
// Removed static imports

const AppContext = createContext();

export function AppProvider({ children, initialData }) {
  const [activeTab, setActiveTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart and wishlist from local storage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setWishlist(new Set(JSON.parse(savedWishlist)));
      }
    } catch (error) {
      console.error("Error loading state from local storage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to local storage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart to local storage:", error);
      }
    }
  }, [cart, isLoaded]);

  // Save wishlist to local storage on change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("wishlist", JSON.stringify(Array.from(wishlist)));
      } catch (error) {
        console.error("Error saving wishlist to local storage:", error);
      }
    }
  }, [wishlist, isLoaded]);

  // Data state initialized from server
  const [products, setProducts] = useState(initialData?.products || []);
  const [categories, setCategories] = useState(initialData?.categories || []);
  const [banners, setBanners] = useState(initialData?.banners || []);
  const [settings, setSettings] = useState(initialData?.settings || null);
  const [loading, setLoading] = useState(false); // No loading state needed now

  // Filters state
  const [filters, setFilters] = useState({
    category: null,
    priceRange: null, // { min, max }
    minRating: null,
    sortBy: "relevance",
  });

  // Derived state
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Data is fetched on server now, removing client-side useEffect

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    let result = [...products];

    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.category?.name?.toLowerCase().includes(q) ||
          (typeof p.category === 'string' && p.category.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter((p) => {
        // Handle both string category and populated object
        if (typeof p.category === 'object' && p.category?._id) {
          return p.category._id === filters.category;
        }
        return p.category === filters.category;
      });
    }

    // Price range filter
    if (filters.priceRange) {
      result = result.filter(
        (p) =>
          p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
      );
    }

    // Rating filter
    if (filters.minRating) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Sorting
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "discount-desc":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "new":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // "relevance" - no sorting needed
        break;
    }

    setFilteredProducts(result);
  }, [filters, searchQuery, products]);

  // Actions
  const addToCart = (product, size = "Standard", qty = 1, openDrawer = true) => {
    setCart((prev) => {
      const existing = prev.find((item) => (item.id || item._id) === (product.id || product._id) && item.size === size);
      if (existing) {
        return prev.map((item) =>
          (item.id || item._id) === (product.id || product._id) && item.size === size
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { ...product, size, qty }];
    });
    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateCartQty = (productId, size, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        (item.id || item._id) === productId && item.size === size
          ? { ...item, qty: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId, size) => {
    setCart((prev) => prev.filter((item) => !((item.id || item._id) === productId && item.size === size)));
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartOriginalTotal = cart.reduce((acc, item) => acc + item.originalPrice * item.qty, 0);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  };

  const setCategoryFilter = (categoryId) => {
    setFilters((prev) => ({ ...prev, category: categoryId }));
  };

  const handleTabChange = (tab, category = null) => {
    setActiveTab(tab);
    if (category) {
      setCategoryFilter(category);
    } else if (tab === "home") {
      setCategoryFilter(null);
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        handleTabChange,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        cartTotal,
        cartOriginalTotal,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        setCategoryFilter,
        filteredProducts,
        isMobileFilterOpen,
        setIsMobileFilterOpen,
        isMobileSortOpen,
        setIsMobileSortOpen,
        products,
        categories,
        banners,
        settings,
        loading,
      }}
    >
      {settings && (
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --color-meesho-purple: ${settings.primaryColor};
              --color-meesho-pink: ${settings.accentColor};
            }
          `
        }} />
      )}
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
