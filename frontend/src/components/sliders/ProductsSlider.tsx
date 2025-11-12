// components/sections/HarmonizedAboutProducts.tsx
'use client'

import { useState, useRef, useEffect, useCallback } from 'react' // Added useCallback
import { motion } from 'framer-motion'
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Truck, 
  Sparkles,
  Crown,
  ArrowRight,
  ShieldCheck,
  Users,
  Award,
  Clock,
  Check // Added Check icon for success feedback
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// --- MOCK CART CONTEXT (REPLACE WITH YOUR ACTUAL HOOK) ---
// If you've resolved the previous error, you should replace this entire mock function
// with an import: `import { useCart } from '@/context/CartContext';`
interface CartItem {
    id: number;
    name: string;
    price: string; // Simplified for mock
}

const MOCK_CART_STATE = {
    cartItems: [],
    addToCart: (item: CartItem) => {
        console.log(`MOCK: Added ${item.name} to cart.`);
        // In a real app, this would update the global state
    }
}

const useCart = () => MOCK_CART_STATE;
// --- END MOCK CART CONTEXT ---

// --- Data & Type Definitions ---
// ... (Your existing Product and features definitions remain unchanged)

interface Product {
    id: number
    name: string
    description: string
    price: string
    originalPrice: string
    image: string // Added image URLs for realism
    rating: number
    category: string
    discount?: number
    isNew?: boolean
    isBestSeller?: boolean
    deliveryTime: string
    brand: string
    dosage?: string
    quantity: string
}

const products: Product[] = [
    {
        id: 1,
        name: "Doliprane 1000mg",
        description: "Paracétamol à libération immédiate pour le traitement des douleurs et de la fièvre.",
        price: "25.00 MAD",
        originalPrice: "30.00 MAD",
        image: "/mock-doliprane.png", // Added mock path
        rating: 4.7,
        category: "Antalgique",
        discount: 17,
        isBestSeller: true,
        deliveryTime: "2-4h",
        brand: "SANOFI",
        dosage: "1000mg",
        quantity: "16 comprimés"
    },
    {
        id: 2,
        name: "Vitamine C 500mg",
        description: "Complément alimentaire à libération prolongée pour renforcer l'immunité.",
        price: "45.00 MAD",
        originalPrice: "55.00 MAD",
        image: "/mock-vitaminc.png", // Added mock path
        rating: 4.9,
        category: "Immunité",
        discount: 18,
        isNew: true,
        deliveryTime: "24h",
        brand: "NUTRAVITA",
        dosage: "500mg",
        quantity: "120 comprimés"
    },
    {
        id: 3,
        name: "Bepanthen Pommade",
        description: "Soin dermatologique multi-usage pour peaux irritées et réparations cutanées légères.",
        price: "35.00 MAD",
        originalPrice: "40.00 MAD",
        image: "/mock-bepanthen.png", // Added mock path
        rating: 4.6,
        category: "Dermatologie",
        discount: 13,
        deliveryTime: "4-6h",
        brand: "BAYER",
        quantity: "30g tube"
    },
    {
        id: 4,
        name: "Smecta Sachets",
        description: "Traitement symptomatique des diarrhées aiguës chez l'adulte et l'enfant.",
        price: "28.00 MAD",
        originalPrice: "32.00 MAD",
        image: "/mock-smecta.png", // Added mock path
        rating: 4.8,
        category: "Gastro-entérologie",
        discount: 13,
        isBestSeller: true,
        deliveryTime: "2-4h",
        brand: "IPSEN",
        dosage: "3g/sachet",
        quantity: "12 sachets"
    }
]

const features = [
    // ... (Features array remains unchanged)
    {
        icon: ShieldCheck,
        title: "Produits Certifiés",
        description: "Garantie par les autorités sanitaires, pour votre tranquillité."
    },
    {
        icon: Truck,
        title: "Livraison Express",
        description: "En 2 à 4 heures chrono dans tout Casablanca."
    },
    {
        icon: Award,
        title: "Qualité Optimale",
        description: "Stockage sous conditions pharmaceutiques strictes."
    },
    {
        icon: Users,
        title: "Conseil Expert 24/7",
        description: "Pharmacien diplômé disponible pour vos questions."
    }
]

// --- Helper Components ---

// ... (RatingStars component remains unchanged)
const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${
                    i < Math.floor(rating)
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-gray-300'
                }`}
            />
        ))}
        <span className="ml-2 text-sm font-semibold text-gray-700">
            {rating.toFixed(1)}
        </span>
    </div>
)

// ... (Badge component remains unchanged)
const Badge = ({ type }: { type: 'new' | 'bestseller' | 'discount' | number }) => {
    if (typeof type === 'number') {
        return (
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md transform -rotate-1 skew-x-1">
                -{type}% OFF
            </div>
        )
    }

    const config = {
        new: { label: 'NOUVEAU', gradient: 'from-emerald-500 to-green-600', icon: Sparkles },
        bestseller: { label: 'TOP VENTE', gradient: 'from-amber-500 to-orange-600', icon: Crown }
    }[type as 'new' | 'bestseller']

    return (
        <div className={`bg-gradient-to-r ${config.gradient} text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center space-x-1.5`}>
            <config.icon className="h-3 w-3" />
            <span>{config.label}</span>
        </div>
    )
}

// Separate Product Card component
const ProductCard = ({ product, isFavorite, toggleFavorite }: { product: Product, isFavorite: boolean, toggleFavorite: (id: number) => void }) => {
    
    // --- Add to Cart Logic ---
    const { addToCart } = useCart()
    const [cartStatus, setCartStatus] = useState<'idle' | 'adding' | 'added'>('idle')

    const handleAddToCart = useCallback(() => {
        if (cartStatus === 'adding' || cartStatus === 'added') return

        setCartStatus('adding')

        // 1. Call the actual cart context function
        addToCart(product) 

        // 2. Simulate an API call delay (optional, but good for UX)
        setTimeout(() => {
            setCartStatus('added')
            // 3. Reset the button after a short time
            setTimeout(() => setCartStatus('idle'), 2000)
        }, 500)
    }, [product, addToCart, cartStatus])


    // --- Button Content Rendering ---
    const renderCartButtonContent = () => {
        if (cartStatus === 'added') {
            return (
                <>
                    <Check className="h-5 w-5 animate-bounce" />
                    <span className="font-semibold hidden sm:inline">Ajouté!</span>
                </>
            )
        }
        if (cartStatus === 'adding') {
            return (
                <>
                    <ShoppingCart className="h-5 w-5 animate-spin" />
                    <span className="font-semibold hidden sm:inline">...</span>
                </>
            )
        }
        return (
            <>
                <ShoppingCart className="h-5 w-5" />
                <span className="font-semibold hidden sm:inline">Ajouter</span>
            </>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform"
        >
            {/* Image Section */}
            <div className="relative h-56 lg:h-48 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges and Favorite button remain unchanged */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                    <div className="space-y-2">
                        {product.discount && <Badge type={product.discount} />}
                        {product.isNew && <Badge type="new" />}
                    </div>
                    <div className="space-y-2">
                        {product.isBestSeller && <Badge type="bestseller" />}
                    </div>
                </div>

                <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-gray-200 hover:bg-red-50 transition-all duration-200 z-10"
                    aria-label={`Ajouter ${product.name} aux favoris`}
                >
                    <Heart 
                        className={`h-5 w-5 transition-colors ${
                            isFavorite 
                                ? 'text-red-500 fill-red-500' 
                                : 'text-gray-400 group-hover:text-red-500'
                        }`} 
                    />
                </button>
            </div>

            {/* Content Section */}
            <div className="p-6 h-auto flex flex-col">
                
                {/* Brand & Category (Unchanged) */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                        {product.brand}
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                        {product.category}
                    </span>
                </div>

                {/* Product Name & Details (Unchanged) */}
                <Link href={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
                    <h4 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2 leading-snug">
                        {product.name}
                    </h4>
                </Link>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-1 min-h-[40px]">
                    {product.description}
                </p>

                {/* Rating (Unchanged) */}
                <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-100">
                    <RatingStars rating={product.rating} />
                    <span className="text-sm text-gray-500 flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-emerald-500" />
                        <span>{product.deliveryTime}</span>
                    </span>
                </div>

                {/* Price & CTA (Updated) */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-3xl font-extrabold text-blue-700">
                            {product.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                            {product.originalPrice}
                        </span>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button 
                        onClick={handleAddToCart}
                        disabled={cartStatus === 'adding'}
                        className={`
                            flex items-center space-x-2 
                            ${cartStatus === 'added' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'} 
                            text-white px-5 py-3 rounded-full 
                            transition-all duration-200 shadow-md hover:shadow-lg group-hover:scale-105
                            disabled:opacity-80 disabled:cursor-wait
                        `}
                    >
                        {renderCartButtonContent()}
                    </button>
                </div>
            </div>
        </motion.div>
    )
}


// --- Main Component ---

export default function HarmonizedAboutProducts() {
    // ... (Main component logic remains unchanged)
    const [favorites, setFavorites] = useState<number[]>([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const sliderRef = useRef<HTMLDivElement>(null)

    const toggleFavorite = (productId: number) => {
        setFavorites(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        )
    }

    const nextSlide = () => {
        setCurrentSlide(prev => (prev + 1) % products.length)
    }

    const prevSlide = () => {
        setCurrentSlide(prev => (prev - 1 + products.length) % products.length)
    }

    // Auto-advance slider logic using useEffect for proper cleanup
    useEffect(() => {
        const interval = setInterval(nextSlide, 5000)
        return () => clearInterval(interval)
    }, [currentSlide]) 

    // ... (JSX render structure remains unchanged)

    return (
        <section className="py-20 bg-gradient-to-br from-white via-blue-50/70 to-emerald-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* About Section (Unchanged) */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-inner"
                    >
                        <ShieldCheck className="h-4 w-4" />
                        <span>Votre Pharmacie Certifiée en Ligne</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6"
                    >
                        Votre Santé,{' '}
                        <span className="bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                            Notre Priorité
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Une plateforme de santé complète offrant expertise pharmaceutique, produits authentiques et livraison ultra-rapide au Maroc.
                    </motion.p>
                </div>

                {/* Features Grid (Unchanged) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}
                            className="group text-center bg-white rounded-3xl p-6 shadow-lg border border-blue-100/50 transition-all duration-300 transform"
                        >
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                                <feature.icon className="h-6 w-6 text-blue-600 group-hover:text-white" />
                            </div>
                            <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-snug">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Products Section (Contains ProductCard, which now uses useCart) */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="p-8 sm:p-12">
                        {/* Section Header (Unchanged) */}
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10">
                            <div className="flex-1">
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2"
                                >
                                    Nos Produits Phares
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="text-md text-gray-600 max-w-2xl"
                                >
                                    Les essentiels de votre santé et bien-être, plébiscités par nos clients.
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="mt-6 lg:mt-0"
                            >
                                <Link 
                                    href="/products" 
                                    className="inline-flex items-center space-x-3 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl group text-lg font-semibold"
                                >
                                    <span>Tout le catalogue</span>
                                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Products Grid / Mobile Slider */}
                        <div className="relative">
                            {/* Desktop Grid */}
                            <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
                                {products.map((product) => (
                                    <ProductCard 
                                        key={product.id} 
                                        product={product} 
                                        isFavorite={favorites.includes(product.id)}
                                        toggleFavorite={toggleFavorite}
                                    />
                                ))}
                            </div>

                            {/* Mobile Slider */}
                            <div className="lg:hidden -mx-4 sm:-mx-6"> 
                                <div ref={sliderRef} className="overflow-hidden">
                                    <motion.div
                                        animate={{ x: `calc(-${currentSlide * 100}% - ${currentSlide * 1.5}rem)` }}
                                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                        className="flex p-2"
                                    >
                                        {products.map((product) => (
                                            <div key={product.id} className="w-full flex-shrink-0 px-3">
                                                <ProductCard 
                                                    product={product} 
                                                    isFavorite={favorites.includes(product.id)}
                                                    toggleFavorite={toggleFavorite}
                                                />
                                            </div>
                                        ))}
                                    </motion.div>
                                </div>

                                {/* Slider Controls (Unchanged) */}
                                <div className="flex items-center justify-center mt-8 space-x-4">
                                    <button
                                        onClick={prevSlide}
                                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={currentSlide === 0}
                                        aria-label="Previous slide"
                                    >
                                        <ArrowRight className="h-4 w-4 text-gray-600 rotate-180" />
                                    </button>
                                    
                                    <div className="flex space-x-2">
                                        {products.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentSlide(index)}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                    index === currentSlide 
                                                        ? 'bg-blue-600 w-8' 
                                                        : 'bg-gray-300'
                                                }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={nextSlide}
                                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={currentSlide === products.length - 1}
                                        aria-label="Next slide"
                                    >
                                        <ArrowRight className="h-4 w-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section (Unchanged) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 lg:mt-24">
                    {[
                        { number: "50K+", label: "Clients Satisfaits" },
                        { number: "500+", label: "Produits en stock" },
                        { number: "24/7", label: "Conseil et Support" },
                        { number: "2-4h", label: "Livraison Locale" }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center bg-white p-6 rounded-xl shadow-inner border border-gray-100"
                        >
                            <div className="text-5xl font-extrabold text-blue-600 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-700 font-semibold text-lg">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    )
}