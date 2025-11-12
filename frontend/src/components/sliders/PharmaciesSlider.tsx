// components/sliders/PharmaciesSlider.tsx
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Star, Navigation as NavIcon, Truck, Shield, Zap, Sparkles, Crown, Heart, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Database-ready pharmacy data structure
const pharmacies = [
  {
    id: 1,
    name: "Pharmacie du Centre Ville",
    address: "123 Avenue Hassan II, Centre Ville, Kenitra",
    phone: "+212 5 37 37 37 37",
    rating: 4.7,
    reviews: 128,
    open: true,
    delivery: true,
    emergency: true,
    image: null, // Will come from database
    hours: "08:00 - 20:00",
    distance: "0.8 km",
    features: ["Livraison express", "Conseil pharmaceutique", "Parapharmacie", "Matériel médical"],
    specialties: ["Médicaments", "Pédiatrie", "Dermatologie"],
    waitingTime: "5 min"
  },
  {
    id: 2,
    name: "Pharmacie de Garde Bab Fès",
    address: "Bab Fès, Centre Ville, Kenitra",
    phone: "+212 5 37 38 38 38",
    rating: 4.5,
    reviews: 95,
    open: true,
    delivery: true,
    emergency: true,
    image: null,
    hours: "24/7",
    distance: "1.2 km",
    features: ["Service 24/7", "Urgences", "Dépannage", "Vaccination"],
    specialties: ["Urgences", "Médecine générale", "Vaccins"],
    waitingTime: "10 min"
  },
  {
    id: 3,
    name: "Pharmacie Modern Premium",
    address: "Rue Mohammed V, Kenitra Centre",
    phone: "+212 5 37 39 39 39",
    rating: 4.8,
    reviews: 156,
    open: false,
    delivery: false,
    emergency: false,
    image: null,
    hours: "09:00 - 19:00",
    distance: "2.1 km",
    features: ["Espace bien-être", "Cosmétique", "Nutrition", "Conseil beauté"],
    specialties: ["Parapharmacie", "Cosmétique", "Nutrition"],
    waitingTime: "2 min"
  },
  {
    id: 4,
    name: "Pharmacie Al Amal Spécialisée",
    address: "Quartier Ouled Moussa, Kenitra",
    phone: "+212 5 37 40 40 40",
    rating: 4.3,
    reviews: 87,
    open: true,
    delivery: true,
    emergency: false,
    image: null,
    hours: "08:30 - 20:30",
    distance: "3.5 km",
    features: ["Livraison à domicile", "Suivi patients", "Ordonnance électronique"],
    specialties: ["Chronique", "Gériatrie", "Diabétologie"],
    waitingTime: "8 min"
  },
  {
    id: 5,
    name: "Pharmacie La Renaissance",
    address: "Route de Rabat, Kenitra",
    phone: "+212 5 37 41 41 41",
    rating: 4.6,
    reviews: 112,
    open: true,
    delivery: true,
    emergency: true,
    image: null,
    hours: "08:00 - 21:00",
    distance: "4.2 km",
    features: ["Drive pharma", "Analyse rapide", "Téléconsultation", "Premiers soins"],
    specialties: ["Analyse", "Télémedecine", "Premiers soins"],
    waitingTime: "3 min"
  },
  {
    id: 6,
    name: "Pharmacie Les Jardins",
    address: "Quartier Les Jardins, Kenitra",
    phone: "+212 5 37 42 42 42",
    rating: 4.9,
    reviews: 203,
    open: true,
    delivery: true,
    emergency: false,
    image: null,
    hours: "07:30 - 20:00",
    distance: "5.1 km",
    features: ["Espace enfant", "Allaitement", "Pédiatrie avancée", "Conseil parental"],
    specialties: ["Pédiatrie", "Maternité", "Nutrition enfant"],
    waitingTime: "6 min"
  }
]

export default function PharmaciesSlider() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (pharmacyId: number) => {
    setFavorites(prev => 
      prev.includes(pharmacyId) 
        ? prev.filter(id => id !== pharmacyId)
        : [...prev, pharmacyId]
    )
  }

  // Create placeholder image URL
  const createPlaceholderImage = (name: string, width: number = 400, height: number = 300) => {
    const text = encodeURIComponent(name.split(' ').slice(0, 2).join(' '))
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <rect width="100%" height="100%" fill="url(#grad)" opacity="0.8"/>
        <text x="50%" y="50%" font-family="system-ui, Arial, sans-serif" font-size="18" 
              font-weight="bold" fill="white" text-anchor="middle" dy=".3em" opacity="0.9">
          ${text}
        </text>
      </svg>
    `)}`
  }

  const RatingStars = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
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
  }

  const PremiumBadge = ({ type }: { type: 'emergency' | 'delivery' | 'premium' }) => {
    const config = {
      emergency: { 
        label: 'URGENCES', 
        gradient: 'from-red-500 to-rose-600',
        icon: Zap 
      },
      delivery: { 
        label: 'LIVRAISON', 
        gradient: 'from-emerald-500 to-green-600',
        icon: Truck 
      },
      premium: { 
        label: 'PREMIUM', 
        gradient: 'from-purple-500 to-indigo-600',
        icon: Crown 
      }
    }[type]

    return (
      <div className={`bg-gradient-to-r ${config.gradient} text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-md flex items-center space-x-1`}>
        <config.icon className="h-3 w-3" />
        <span>{config.label}</span>
      </div>
    )
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-200 shadow-sm mb-8"
          >
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-bold text-gray-900">
                RÉSEAU CERTIFIÉ
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-amber-600" />
              <span className="text-sm font-bold text-gray-900">
                PHARMACIENNES EXPERTS
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Notre Réseau de{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pharmacies Partenaires
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Découvrez notre sélection exclusive de pharmacies certifiées à Kenitra, 
            toutes équipées pour répondre à vos besoins de santé avec professionnalisme
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { 
                icon: Shield, 
                value: "100%", 
                label: "Certifiées",
                description: "Contrôle qualité rigoureux"
              },
              { 
                icon: Zap, 
                value: "24/7", 
                label: "Service Urgence",
                description: "Pharmacies de garde"
              },
              { 
                icon: Truck, 
                value: "<2h", 
                label: "Livraison Express",
                description: "Délai moyen garanti"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 mx-auto">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-800 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-600">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pharmacies Slider */}
        <div className="relative mb-16">
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            navigation={{
              nextEl: '.pharmacies-next',
              prevEl: '.pharmacies-prev',
            }}
            pagination={{
              clickable: true,
              el: '.pharmacies-pagination',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.1 },
              1280: { slidesPerView: 3.2 },
            }}
            modules={[Navigation, Pagination, Autoplay]}
            className="pharmacies-swiper pb-16"
          >
            {pharmacies.map((pharmacy) => (
              <SwiperSlide key={pharmacy.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-grab active:cursor-grabbing"
                >
                  {/* Pharmacy Card */}
                  <div className="relative overflow-hidden">
                    {/* Image Container */}
                    <div className="aspect-[4/3] relative bg-gradient-to-br from-blue-500 to-purple-600">
                      <Image
                        src={createPlaceholderImage(pharmacy.name)}
                        alt={pharmacy.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                      
                      {/* Status Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        <div className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-md ${
                          pharmacy.open 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {pharmacy.open ? 'OUVERT' : 'FERMÉ'}
                        </div>
                        {pharmacy.emergency && <PremiumBadge type="emergency" />}
                        {pharmacy.delivery && <PremiumBadge type="delivery" />}
                        {pharmacy.rating >= 4.8 && <PremiumBadge type="premium" />}
                      </div>

                      {/* Favorite Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleFavorite(pharmacy.id)}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-md border border-gray-200 hover:bg-white transition-all duration-200"
                      >
                        <Heart 
                          className={`h-4 w-4 transition-all duration-200 ${
                            favorites.includes(pharmacy.id) 
                              ? 'text-red-500 fill-red-500' 
                              : 'text-gray-600 hover:text-red-500'
                          }`} 
                        />
                      </motion.button>

                      {/* Waiting Time */}
                      <div className="absolute bottom-3 left-3 bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm">
                        ⏱️ {pharmacy.waitingTime}
                      </div>
                    </div>
                  </div>

                  {/* Pharmacy Info */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight line-clamp-2">
                          {pharmacy.name}
                        </h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <MapPin className="h-3 w-3" />
                          <span>{pharmacy.distance}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>{pharmacy.hours}</span>
                        </div>
                      </div>
                      
                      {/* Rating */}
                      <div className="text-right flex-shrink-0 ml-3">
                        <RatingStars rating={pharmacy.rating} />
                        <span className="text-xs text-gray-600 block mt-1">
                          {pharmacy.reviews} avis
                        </span>
                      </div>
                    </div>

                    {/* Address & Contact */}
                    <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-start space-x-2 text-sm text-gray-700">
                        <MapPin className="h-3.5 w-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{pharmacy.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <Phone className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="font-semibold text-sm">{pharmacy.phone}</span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Spécialités :</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {pharmacy.specialties.map((specialty, index) => (
                          <span
                            key={specialty}
                            className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium border border-blue-200"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2 mb-4">
                      {pharmacy.features.slice(0, 2).map((feature, index) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-2 text-xs text-gray-700"
                        >
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2 text-sm font-semibold flex-1 mr-3 justify-center"
                      >
                        <span>Voir produits</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-2 text-sm font-semibold flex-1 justify-center"
                      >
                        <NavIcon className="h-3.5 w-3.5" />
                        <span>Itinéraire</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="pharmacies-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-md hover:shadow-lg cursor-pointer group -translate-x-2 hover:bg-gray-50 transition-all duration-200">
            <div className="w-2 h-2 border-l-2 border-b-2 border-gray-600 rotate-45 transform -translate-x-0.5 group-hover:border-gray-800 transition-colors" />
          </div>
          <div className="pharmacies-next absolute right-0 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-md hover:shadow-lg cursor-pointer group translate-x-2 hover:bg-gray-50 transition-all duration-200">
            <div className="w-2 h-2 border-r-2 border-b-2 border-gray-600 -rotate-45 transform translate-x-0.5 group-hover:border-gray-800 transition-colors" />
          </div>

          {/* Pagination */}
          <div className="pharmacies-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10" />
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 shadow-xl border border-gray-800 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Vous êtes Pharmacien ?
            </h3>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto leading-relaxed">
              Rejoignez notre réseau exclusif de pharmacies partenaires
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
              >
                <Sparkles className="h-4 w-4" />
                <span>REJOINDRE LE RÉSEAU</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-white/30 text-white px-5 py-3 rounded-lg font-semibold backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-200 flex items-center space-x-2"
              >
                <Shield className="h-4 w-4" />
                <span>EN SAVOIR PLUS</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .pharmacies-swiper {
          padding-bottom: 4rem;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        :global(.pharmacies-pagination .swiper-pagination-bullet) {
          width: 8px;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        :global(.pharmacies-pagination .swiper-pagination-bullet-active) {
          width: 24px;
          background: #374151;
        }
      `}</style>
    </section>
  )
}