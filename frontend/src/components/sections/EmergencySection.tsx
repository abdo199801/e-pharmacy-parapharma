// components/sections/EmergencySection.tsx
'use client'

import { motion } from 'framer-motion'
import { Phone, Clock, MapPin, Ambulance } from 'lucide-react'

export default function EmergencySection() {
  return (
    <section className="py-16 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Service d'Urgence 24h/24
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              En cas d'urgence médicale, contactez immédiatement nos pharmacies de garde. Service disponible 7j/7.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Phone className="h-6 w-6 text-red-600" />
                <span className="text-2xl font-bold text-gray-900">05 37 37 37 37</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>Service disponible 24h/24 et 7j/7</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Appeler Urgence</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-red-600 text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
              >
                <MapPin className="h-5 w-5" />
                <span>Pharmacies de Garde</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Ambulance className="h-10 w-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Intervention Rapide
              </h3>
              <p className="text-gray-600 mb-6">
                Nos pharmacies de garde sont équipées pour répondre à vos urgences médicales avec professionnalisme.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-gray-900">15min</div>
                  <div className="text-gray-600">Temps moyen</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">100%</div>
                  <div className="text-gray-600">Disponible</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}