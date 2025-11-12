// src/components/cart/CartDropdown.tsx
'use client'

import { useCart } from '@/context/CartContext';
import React, { useRef, useEffect } from 'react';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'; 

interface CartDropdownProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDropdown({ isOpen, onClose }: CartDropdownProps) {
    const { 
        cartItems, 
        cartTotalAmount, 
        cartItemCount, 
        updateQuantity, 
        removeFromCart 
    } = useCart();
    
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Enhanced animation classes with smoother transitions
    const dropdownClass = isOpen 
        ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
        : 'opacity-0 pointer-events-none -translate-y-4 scale-95'; 
    
    // Close dropdown on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when dropdown is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Premium Backdrop with blur effect */}
            <div 
                className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-all duration-500 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />
            
            {/* Enhanced Dropdown Container */}
            <div 
                ref={dropdownRef}
                className={`fixed top-20 right-4 w-96 bg-white rounded-2xl shadow-2xl p-0 
                            transform transition-all duration-500 ease-out z-50
                            border border-gray-100 ${dropdownClass}`}
                onClick={(e) => e.stopPropagation()} 
            >
                {/* Premium Header with gradient */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Votre Panier
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                {cartItemCount} article{cartItemCount !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors group"
                            aria-label="Fermer le panier"
                        >
                            <X className="h-4 w-4 text-gray-600 group-hover:text-gray-800 transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Enhanced Content Area */}
                <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {cartItemCount === 0 ? (
                        <div className="text-center py-12 px-6">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShoppingCart className="h-8 w-8 text-gray-400" /> 
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Panier vide
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Ajoutez des articles pour commencer vos achats
                            </p>
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-transform"
                            >
                                Découvrir nos produits
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {/* Enhanced Item List */}
                            <ul className="divide-y divide-gray-100">
                                {cartItems.map(item => (
                                    <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex space-x-4 items-start">
                                            {/* Product Image Placeholder */}
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <span className="text-xs font-medium text-blue-600">IMG</span>
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {parseFloat(item.price).toFixed(2)} MAD
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
                                                        aria-label="Supprimer l'article"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                {/* Enhanced Quantity Controls */}
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                                                            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-gray-300 transition-all"
                                                            disabled={item.cartQuantity <= 1}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="w-8 text-center font-semibold text-gray-900">
                                                            {item.cartQuantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                                                            className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition-all"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                    <p className="text-lg font-bold text-blue-600">
                                                        {(parseFloat(item.price) * item.cartQuantity).toFixed(2)} MAD
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            {/* Premium Cart Summary */}
                            <div className="p-6 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Sous-total</span>
                                        <span>{cartTotalAmount.toFixed(2)} MAD</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600">
                                        <span>Livraison</span>
                                        <span className="text-green-600">Gratuite</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3">
                                        <div className="flex justify-between text-lg font-bold text-gray-900">
                                            <span>Total TTC</span>
                                            <span>{cartTotalAmount.toFixed(2)} MAD</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    <button
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                                        onClick={onClose}
                                    >
                                        Commander maintenant
                                    </button>
                                    <button
                                        className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all"
                                        onClick={onClose}
                                    >
                                        Continuer mes achats
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
            `}</style>
        </>
    );
}