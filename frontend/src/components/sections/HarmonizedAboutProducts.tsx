'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
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
  Check,
  AlertCircle
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { productService, Product } from '@/services/productService'

// Features array remains the same
const features = [
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

// Helper Components (unchanged)
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

// Product Card Component with Real Data
const ProductCard = ({ 
  product, 
  isFavorite, 
  toggleFavorite 
}: { 
  product: Product
  isFavorite: boolean
  toggleFavorite: (id: string) => void 
}) => {
  const { addToCart } = useCart()
  const [cartStatus, setCartStatus] = useState<'idle' | 'adding' | 'added'>('idle')

  const handleAddToCart = useCallback(async () => {
    if (cartStatus === 'adding' || cartStatus === 'added') return

    setCartStatus('adding')

    try {
      await addToCart(product.id, 1)
      setCartStatus('added')
      setTimeout(() => setCartStatus('idle'), 2000)
    } catch (error) {
      console.error('Failed to add to cart:', error)
      setCartStatus('idle')
    }
  }, [product.id, addToCart, cartStatus])

  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  // Determine if product is new (created within last 30 days)
  const isNewProduct = new Date(product.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD'
    }).format(price)
  }

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
          src={product.image || '/images/placeholder-product.png'}
          alt={product.name}
          width={200}
          height={200}
          className="object-contain group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
          <div className="space-y-2">
            {discountPercentage > 0 && <Badge type={discountPercentage} />}
            {isNewProduct && <Badge type="new" />}
          </div>
          <div className="space-y-2">
            {product.isBestSeller && <Badge type="bestseller" />}
          </div>
        </div>

        {/* Favorite Button */}
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
        
        {/* Brand & Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            {product.brand || 'Marque'}
          </span>
          <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
            {product.category.name}
          </span>
        </div>

        {/* Product Name & Details */}
        <Link href={`/product/${product.id}`} className="hover:text-blue-600 transition-colors">
          <h4 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2 leading-snug">
            {product.name}
          </h4>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed flex-1 min-h-[40px]">
          {product.description}
        </p>

        {/* Rating & Delivery */}
        <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-100">
          <RatingStars rating={product.rating || 4.5} />
          <span className="text-sm text-gray-500 flex items-center space-x-1">
            <Clock className="h-4 w-4 text-emerald-500" />
            <span>{product.deliveryTime || '2-4h'}</span>
          </span>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-3xl font-extrabold text-blue-700">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            disabled={cartStatus === 'adding' || product.stock === 0}
            className={`
              flex items-center space-x-2 
              ${cartStatus === 'added' 
                ? 'bg-emerald-500 hover:bg-emerald-600' 
                : product.stock === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
              } 
              text-white px-5 py-3 rounded-full 
              transition-all duration-200 shadow-md hover:shadow-lg group-hover:scale-105
              disabled:opacity-80 disabled:cursor-not-allowed
            `}
          >
            {product.stock === 0 ? (
              <>
                <AlertCircle className="h-5 w-5" />
                <span className="font-semibold hidden sm:inline">Rupture</span>
              </>
            ) : (
              renderCartButtonContent()
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Main Component
export default function HarmonizedAboutProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await productService.getFeaturedProducts()
        
        if (response.success && response.data) {
          setProducts(response.data)
        } else {
          setError('Failed to load products')
        }
      } catch (err: any) {
        console.error('Error fetching products:', err)
        setError(err.response?.data?.error || 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const toggleFavorite = (productId: string) => {
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

  useEffect(() => {
    if (products.length === 0) return
    
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [currentSlide, products.length])

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-white via-blue-50/70 to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement des produits...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-white via-blue-50/70 to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Erreur de chargement</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/70 to-emerald-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Section */}
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

        {/* Features Grid */}
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

        {/* Products Section */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="p-8 sm:p-12">
            {/* Section Header */}
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
              {products.length > 0 && (
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

                  {/* Slider Controls */}
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
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
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