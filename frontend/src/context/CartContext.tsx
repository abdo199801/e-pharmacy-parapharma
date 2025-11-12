// src/context/CartContext.tsx
'use client'

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react'

// Define the basic structure of a product (simplified for this context)
interface Product {
    id: number;
    name: string;
    price: string;
    // Add other properties if needed for display, e.g., imageUrl: string;
}

// Define the structure of an item IN THE CART
export interface CartItem extends Product {
    cartQuantity: number;
}

// Define the structure of the context value
interface CartContextType {
    // 🌟 RENAME: Using 'cartItems' for clarity and common convention
    cartItems: CartItem[]; 
    cartItemCount: number;
    cartTotalAmount: number; // Add for completeness (calculated below)
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
    clearCart: () => void;
}

// 1. Initialize the Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function to calculate total item count
const calculateTotalItems = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.cartQuantity, 0);
};

// Helper function to calculate total amount (assuming price is a simple numeric string for now)
const calculateTotalAmount = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + (parseFloat(item.price) * item.cartQuantity), 0);
};

// 2. Create the Provider Component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // Memoize derived states
    const cartItemCount = useMemo(() => calculateTotalItems(cartItems), [cartItems]);
    const cartTotalAmount = useMemo(() => calculateTotalAmount(cartItems), [cartItems]);

    // Function to add a product to the cart
    const addToCart = useCallback((product: Product, quantity: number = 1) => {
        setCartItems(prevCart => {
            const existingItemIndex = prevCart.findIndex(item => item.id === product.id);

            if (existingItemIndex > -1) {
                // Product exists, update quantity
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex] = {
                    ...updatedCart[existingItemIndex],
                    cartQuantity: updatedCart[existingItemIndex].cartQuantity + quantity,
                };
                return updatedCart;
            } else {
                // New product, add it to cart
                return [...prevCart, { ...product, cartQuantity: quantity }];
            }
        });
    }, []);

    // 🌟 NEW: Function to remove a product entirely
    const removeFromCart = useCallback((productId: number) => {
        setCartItems(prevCart => prevCart.filter(item => item.id !== productId));
    }, []);

    // 🌟 NEW: Function to update the quantity of a specific item
    const updateQuantity = useCallback((productId: number, newQuantity: number) => {
        setCartItems(prevCart => {
            if (newQuantity <= 0) {
                return prevCart.filter(item => item.id !== productId);
            }
            
            return prevCart.map(item => 
                item.id === productId 
                ? { ...item, cartQuantity: newQuantity }
                : item
            );
        });
    }, []);

    // 🌟 NEW: Function to clear the entire cart
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);


    const contextValue = useMemo(() => ({
        cartItems, // 🌟 Updated name
        cartItemCount,
        cartTotalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    }), [cartItems, cartItemCount, cartTotalAmount, addToCart, removeFromCart, updateQuantity, clearCart]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// 3. Create a custom hook for easy consumption
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};