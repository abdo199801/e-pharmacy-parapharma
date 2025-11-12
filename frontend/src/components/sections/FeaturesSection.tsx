// src/components/sections/FeaturesSection.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Truck, 
  Shield, 
  Clock, 
  MapPin, 
  Zap, 
  Sparkles, 
  Award, 
  CheckCircle,
  ArrowRight,
  Star,
  Heart
} from 'lucide-react'

const features = [
  {
    icon: Truck,
    title: "Livraison Express",
    description: "Recevez vos médicaments en moins de 2 heures avec notre réseau de coursiers dédiés",
    stats: "98% de livraisons à temps",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    highlights: ["Tracking en temps réel", "Livraison programmée", "Emballage sécurisé"]
  },
  {
    icon: Shield,
    title: "Sécurité Maximale",
    description: "Produits 100% authentiques certifiés ANSM avec traçabilité complète",
    stats: "0 cas de contrefaçon",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
    borderColor: "border-emerald-200",
    highlights: ["Certification ANSM", "Traçabilité numérique", "Contrôle qualité"]
  },
  {
    icon: Clock,
    title: "Service Continu",
    description: "Assistance 24h/24 et 7j/7 avec pharmaciens de garde et urgences médicales",
    stats: "Réponse en < 5min",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
    borderColor: "border-orange-200",
    highlights: ["Pharmaciens diplômés", "Urgences 24/7", "Conseil personnalisé"]
  },
  {
    icon: MapPin,
    title: "Réseau Intelligent",
    description: "Géolocalisation précise des pharmacies partenaires avec stocks en temps réel",
    stats: "50+ pharmacies à Kenitra",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    highlights: ["Stocks live", "Réservation instantanée", "Prix garantis"]
  }
]

const additionalFeatures = [
  {
    icon: Zap,
    title: "Interface Rapide",
    description: "Commandez en 3 clics maximum avec une expérience utilisateur optimisée"
  },
  {
    icon: Award,
    title: "Prix Compétitifs",
    description: "Meilleur rapport qualité-prix garanti avec promotions exclusives"
  },
  {
    icon: Heart,
    title: "Santé Privilégiée",
    description: "Programme fidélité et avantages exclusifs pour votre bien-être"
  },
  {
    icon: Star,
    title: "Avis Vérifiés",
    description: "Retours authentiques de clients satisfaits avec notation transparente"
  }
]

export default function FeaturesSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10% left-5% w-80 h-80 bg-blue-100/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10% right-5% w-96 h-96 bg-purple-100/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-cyan-100/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[length:50px_50px] bg-grid-slate-900" />

      <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20"
        >
          {/* Excellence Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-xl rounded-3xl px-8 py-4 border border-white/30 shadow-2xl mb-8"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-yellow-600" />
              <span className="text-lg font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                EXCELLENCE CERTIFIÉE
              </span>
            </div>
            <div className="w-px h-8 bg-gray-300/50" />
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-green-600" />
              <span className="text-lg font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                SATISFACTION GARANTIE
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              L'Excellence
            </span>
            <span className="block text-4xl lg:text-5xl font-light text-gray-600 mt-4">
              au Service de Votre Santé
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Découvrez pourquoi E-Pharma révolutionne l'accès aux soins avec des services premium 
            conçus pour votre bien-être et votre tranquillité d'esprit
          </p>

          {/* Trust Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { 
                value: "10,000+", 
                label: "Clients Satisfaits",
                description: "Communauté grandissante"
              },
              { 
                value: "99.8%", 
                label: "Taux de Satisfaction",
                description: "Retours positifs"
              },
              { 
                value: "4.9★", 
                label: "Note Moyenne",
                description: "Sur les stores"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ delay: index * 0.3 }}
                className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="text-center">
                  <div className="text-3xl font-black text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-600 font-light">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative"
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />
              
              <div className={`relative ${feature.bgColor} rounded-4xl border-2 ${feature.borderColor} p-8 backdrop-blur-sm transition-all duration-500 group-hover:shadow-3xl group-hover:border-opacity-50 overflow-hidden`}>
                
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className={`p-5 rounded-2xl bg-gradient-to-r ${feature.color} shadow-2xl group-hover:scale-110 transition-transform duration-300 mb-6`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="font-bold text-2xl text-gray-900 mb-3 leading-tight">
                    {feature.title}
                  </h3>
                  
                  <div className="bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-2xl text-sm font-semibold border border-white/40 mb-4">
                    {feature.stats}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-lg leading-relaxed font-light mb-6 text-center">
                  {feature.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {feature.highlights.map((highlight, highlightIndex) => (
                    <motion.div
                      key={highlight}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: highlightIndex * 0.1 + index * 0.05 + 0.5 }}
                      className="flex items-center space-x-3 text-sm text-gray-700"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex-shrink-0" />
                      <span className="font-medium">{highlight}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Sparkle Effect */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </div>

                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Et Ce N'est Pas Tout...
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez d'autres avantages exclusifs qui font la différence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 + 1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-2xl group-hover:bg-blue-200 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-4xl p-12 shadow-2xl border border-gray-800 max-w-4xl mx-auto">
            <h3 className="text-4xl font-black text-white mb-6">
              Prêt à Expérimenter l'Excellence ?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Rejoignez des milliers de clients satisfaits qui ont transformé 
              leur accès aux soins avec E-Pharma
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-gray-900 px-12 py-5 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center space-x-4 group"
              >
                <Zap className="h-6 w-6" />
                <span>COMMENCER MAINTENANT</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-semibold text-lg backdrop-blur-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center space-x-3"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Voir les témoignages</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .bg-grid-slate-900 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  )
}