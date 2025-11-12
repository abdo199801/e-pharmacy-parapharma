// src/components/sections/StatsSection.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  Building2, 
  Package, 
  Clock, 
  Zap,
  Shield,
  Award,
  Users,
  Truck
} from 'lucide-react'

const stats = [
  { 
    number: 50, 
    suffix: '+', 
    label: 'Pharmacies Partenaires',
    description: 'Réseau certifié à Kenitra',
    icon: Building2,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    number: 1000, 
    suffix: '+', 
    label: 'Produits Disponibles',
    description: 'Médicaments et produits de santé',
    icon: Package,
    color: 'from-emerald-500 to-green-500'
  },
  { 
    number: 24, 
    suffix: '/7', 
    label: 'Service Urgence',
    description: 'Assistance permanente',
    icon: Clock,
    color: 'from-orange-500 to-red-500'
  },
  { 
    number: 30, 
    suffix: 'min', 
    label: 'Livraison Express',
    description: 'Délai moyen de livraison',
    icon: Zap,
    color: 'from-purple-500 to-pink-500'
  }
]

const Counter = ({ number, suffix }: { number: number; suffix: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <span ref={ref} className="font-black">
      {isInView ? (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {number}
        </motion.span>
      ) : (
        0
      )}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10% left-5% w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10% right-5% w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[length:50px_50px] bg-grid-white" />

      {/* Animated Orbs */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: Math.random() * 100 + '%',
              opacity: 0 
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>

      <div className="max-w-8xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-20"
        >
          {/* Trust Badges */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center space-x-6 bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-4 border border-white/20 shadow-2xl mb-8"
          >
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-green-400" />
              <span className="text-lg font-black text-white">
                RÉSEAU CERTIFIÉ
              </span>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-yellow-400" />
              <span className="text-lg font-black text-white">
                QUALITÉ GARANTIE
              </span>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-black text-white">
                10,000+ CLIENTS
              </span>
            </div>
          </motion.div>

          {/* Main Title */}
          <h1 className="text-6xl lg:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
              Excellence
            </span>
            <span className="block text-4xl lg:text-5xl font-light text-blue-200 mt-4">
              en Chiffres & Performances
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light">
            Découvrez les chiffres qui témoignent de notre engagement pour votre santé 
            et notre leadership dans le secteur pharmaceutique à Kenitra
          </p>
        </motion.div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.8 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.8 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} />
              
              <div className="relative bg-white/10 backdrop-blur-xl rounded-4xl border-2 border-white/20 p-8 transition-all duration-500 group-hover:shadow-2xl group-hover:border-white/40 overflow-hidden">
                
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Number */}
                <div className="text-center mb-4">
                  <div className="text-5xl lg:text-6xl font-black text-white mb-2">
                    <Counter number={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-xl font-bold text-white mb-2">
                    {stat.label}
                  </div>
                  <div className="text-blue-200 text-sm font-medium">
                    {stat.description}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '85%' } : { width: 0 }}
                      transition={{ delay: index * 0.1 + 0.8, duration: 1.5, ease: "easeOut" }}
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                    />
                  </div>
                </div>

                {/* Hover Sparkle Effect */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8 }}
          className="bg-white/5 backdrop-blur-xl rounded-4xl border border-white/10 p-8 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: '98%', label: 'Satisfaction Client', icon: Users },
              { value: '4.9/5', label: 'Note Moyenne', icon: Award },
              { value: '<2h', label: 'Temps de Réponse', icon: Clock }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 + 1 }}
                className="text-white"
              >
                <div className="flex justify-center mb-3">
                  <metric.icon className="h-8 w-8 text-blue-300" />
                </div>
                <div className="text-3xl font-black text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-blue-200 font-medium">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center bg-white/10 backdrop-blur-xl rounded-3xl px-8 py-6 border border-white/20">
            <div className="text-white text-lg font-semibold">
              Rejoignez notre communauté de confiance à Kenitra
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-900 px-8 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Découvrir nos services
            </motion.button>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .bg-grid-white {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(255,255,255,0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
        }
      `}</style>
    </section>
  )
}