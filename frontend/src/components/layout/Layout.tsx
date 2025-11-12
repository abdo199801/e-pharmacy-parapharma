// src/components/layout/Layout.tsx
'use client' // <-- Keep this, as it uses useState

import { ReactNode, useState } from 'react' // 🌟 Import useState
import Header from './Header'
import Footer from './Footer'
import { CartProvider } from '@/context/CartContext'
import CartSidebar from '@/Cart/CartContext'
// 🌟 MOCK IMPORT: Ensure you have created this component!

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    // 🌟 1. State to control the cart sidebar visibility
    const [isCartOpen, setIsCartOpen] = useState(false)

    // Handler to open the sidebar
    const openCart = () => setIsCartOpen(true)
    // Handler to close the sidebar
    const closeCart = () => setIsCartOpen(false)

    return (
        <CartProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
                
                {/* 🌟 2. Pass the handler to the Header component */}
                <Header onCartClick={openCart} />
                
                <main className="flex-1">
                    {children}
                </main>
                <Footer />
            </div>

            {/* 🌟 3. The CartSidebar component (Assuming you have this file) */}
            <CartSidebar 
                isOpen={isCartOpen} 
                onClose={closeCart} 
            />
        </CartProvider>
    )
}