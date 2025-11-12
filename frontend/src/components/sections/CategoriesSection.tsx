// components/sections/CategoriesSection.tsx
'use client'

import { motion } from 'framer-motion'
import { Pill, Heart, Baby, Eye, Bone, Brain, ArrowRight, Sparkles, Shield, Zap, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const categories = [
  {
    icon: Pill,
    name: "Médicaments Essentiels",
    description: "Antidouleurs, antibiotiques et traitements spécialisés sous contrôle pharmaceutique",
    count: "500+ produits",
    products: "Prescription & OTC",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    borderColor: "border-blue-200",
    features: ["Ordonnance numérique", "Livraison express", "Conseil pharmaceutique"]
  },
  {
    icon: Heart,
    name: "Soins Cardiovasculaires",
    description: "Tension artérielle, cholestérol et santé cardiaque avec suivi personnalisé",
    count: "150+ produits",
    products: "Tensiomètres & Médicaments",
    color: "from-red-500 to-pink-600",
    bgColor: "bg-gradient-to-br from-red-50 to-pink-50",
    borderColor: "border-red-200",
    features: ["Monitoring à domicile", "Alertes de renouvellement", "Support nutritionnel"]
  },
  {
    icon: Baby,
    name: "Pédiatrie Spécialisée",
    description: "Soins adaptés pour enfants et bébés, formulations pédiatriques approuvées",
    count: "200+ produits",
    products: "Sirops & Soins bébé",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
    borderColor: "border-pink-200",
    features: ["Dosage pédiatrique", "Goûts adaptés", "Sécurité maximale"]
  },
  {
    icon: Eye,
    name: "Ophtalmologie Avancée",
    description: "Lentilles de contact, solutions et soins oculaires de haute technologie",
    count: "120+ produits",
    products: "Lentilles & Collyres",
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
    borderColor: "border-emerald-200",
    features: ["Adaptation sur mesure", "Contrôle qualité", "Entretien facile"]
  },
  {
    icon: Bone,
    name: "Orthopédie & Mobilité",
    description: "Matériel médical, aides techniques et solutions pour mobilité réduite",
    count: "80+ produits",
    products: "Orthèses & Équipements",
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
    borderColor: "border-purple-200",
    features: ["Installation à domicile", "Formation utilisation", "Maintenance"]
  },
  {
    icon: Brain,
    name: "Neurologie & Psychiatrie",
    description: "Système nerveux, santé mentale et bien-être cognitif avec accompagnement",
    count: "90+ produits",
    products: "Traitements & Thérapies",
    color: "from-orange-500 to-amber-600",
    bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
    borderColor: "border-orange-200",
    features: ["Suivi personnalisé", "Support continu", "Confidentialité absolue"]
  }
]

export default function CategoriesSection() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-5 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-5 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-cyan-100/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[length:50px_50px] bg-grid-slate-900" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/30 shadow-xl mb-8"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-yellow-600" />
              <span className="text-base font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                CATÉGORIES CERTIFIÉES
              </span>
            </div>
            <div className="w-px h-6 bg-gray-300/50" />
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-base font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                QUALITÉ GARANTIE
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Expertise Médicale
            </span>
            <span className="block text-2xl lg:text-3xl font-light text-gray-600 mt-2">
              Par Spécialité
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-8">
            Explorez nos catégories spécialisées, chacune supervisée par des professionnels de santé 
            pour vous garantir des produits adaptés et des conseils d'expert
          </p>

          {/* Premium Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {[
              { 
                icon: Zap, 
                value: "24/7", 
                label: "Disponibilité",
                description: "Service continu"
              },
              { 
                icon: CheckCircle, 
                value: "100%", 
                label: "Produits Vérifiés",
                description: "Qualité certifiée"
              },
              { 
                icon: Shield, 
                value: "Expert", 
                label: "Conseil Pharma",
                description: "Professionnels diplômés"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
                className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-500 group"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-800 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-600 font-light">{stat.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Premium Categories Grid - PERFECTLY EQUAL SIZES */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onHoverStart={() => setHoveredCategory(index)}
              onHoverEnd={() => setHoveredCategory(null)}
              className="group relative h-full"
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />
              
              {/* Main Card - Fixed Height */}
              <div className={`relative h-full ${category.bgColor} rounded-3xl border-2 ${category.borderColor} p-6 backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-opacity-50 overflow-hidden flex flex-col`}>
                
                {/* Header - Fixed Height */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight line-clamp-2">
                        {category.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <span className="bg-white/80 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-xl text-xs font-semibold border border-white/40">
                          {category.count}
                        </span>
                        <span className="bg-black/5 text-gray-600 px-2 py-1 rounded-xl text-xs font-medium">
                          {category.products}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description - Fixed Height */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 font-light line-clamp-3 flex-1">
                  {category.description}
                </p>

                {/* Features - Fixed Height */}
                <div className="space-y-2 mb-4">
                  {category.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 + index * 0.05 }}
                      className="flex items-center space-x-2 text-xs text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex-shrink-0" />
                      <span className="font-medium line-clamp-1">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA - Fixed Position */}
                <motion.button
                  whileHover={{ scale: 1.02, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/80 backdrop-blur-sm text-gray-900 py-3 px-4 rounded-xl font-semibold border border-white/40 hover:bg-white transition-all duration-300 group/btn flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm"
                >
                  <span>Explorer</span>
                  <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>

                {/* Hover Sparkle Effect */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                </div>

                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-8 shadow-xl border border-gray-800 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Besoin d'Aide pour Choisir ?
            </h3>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto leading-relaxed text-sm">
              Nos pharmaciens sont à votre disposition pour vous orienter vers la catégorie 
              la plus adaptée à vos besoins de santé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 group"
              >
                <Sparkles className="h-4 w-4" />
                <span>CONSULTATION GRATUITE</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm backdrop-blur-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center space-x-2"
              >
                <Shield className="h-4 w-4" />
                <span>GUIDE DES CATÉGORIES</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .bg-grid-slate-900 {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(15 23 42 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}