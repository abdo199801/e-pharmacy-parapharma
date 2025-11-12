// src/app/page.tsx

// 1. Metadata (SEO) - Replaces the <Head> component in App Router
import type { Metadata } from 'next'; 

export const metadata: Metadata = {
  title: 'E-Pharma - Votre Pharmacie en Ligne | Kenitra',
  description: 'Plateforme de gestion des pharmacies et produits pharmaceutiques à Kenitra. Commandez en ligne, trouvez des pharmacies de garde, gestion de stocks.',
  keywords: ['pharmacie', 'médicaments', 'Kenitra', 'livraison', 'garde', 'para-pharmacie'],
};

// 2. Component Imports
import Layout from '@/components/layout/Layout';
import HeroSlider from '@/components/sliders/HeroSlider';
import PharmaciesSlider from '@/components/sliders/PharmaciesSlider';
import EmergencySection from '@/components/sections/EmergencySection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import StatsSection from '@/components/sections/StatsSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ProductsSlider from '@/components/sliders/ProductsSlider';

// 3. Home Component
export default function Home() {
  return (
    <Layout>
      {/* 1. Hero Slider Section - Full width banner with search */}
      <section id="hero">
        <HeroSlider />
      </section>

      {/* 2. Features Section - Key benefits */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* 3. Categories Section - Product categories */}
      <section id="categories">
        <CategoriesSection />
      </section>

      {/* 4. Popular Products Slider - Featured products */}
      <section id="products">
        <ProductsSlider />
      </section>

      {/* 5. Statistics Section - Trust indicators */}
      <section id="stats">
        <StatsSection />
      </section>

      {/* 6. Pharmacies Slider - Nearby pharmacies */}
      <section id="pharmacies">
        <PharmaciesSlider />
      </section>

      {/* 7. Emergency Section - Urgent services */}
      <section id="emergency">
        <EmergencySection />
      </section>

      {/* 8. Cardiologie Section - Integrated directly */}
      <section id="cardiologie" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Spécialité Cardiologie</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des solutions complètes pour la santé cardiaque avec des médicaments de qualité et un accompagnement personnalisé
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Cardiologie Product 1 */}
            <div className="bg-blue-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Anti-hypertenseurs</h3>
              <p className="text-gray-600 mb-4">
                Contrôlez votre tension artérielle avec nos médicaments efficaces
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Voir produits
              </button>
            </div>

            {/* Cardiologie Product 2 */}
            <div className="bg-green-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Anticoagulants</h3>
              <p className="text-gray-600 mb-4">
                Prévention des caillots sanguins et accidents vasculaires
              </p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Voir produits
              </button>
            </div>

            {/* Cardiologie Product 3 */}
            <div className="bg-purple-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🫀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Statines</h3>
              <p className="text-gray-600 mb-4">
                Gestion du cholestérol pour une meilleure santé cardiaque
              </p>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Voir produits
              </button>
            </div>

            {/* Cardiologie Product 4 */}
            <div className="bg-orange-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Équipements</h3>
              <p className="text-gray-600 mb-4">
                Tensio-mètres et oxymètres pour un monitoring à domicile
              </p>
              <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors">
                Voir produits
              </button>
            </div>
          </div>

          {/* Additional Services */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Services Cardiologie</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg">👨‍⚕️</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Consultation Spécialisée</h4>
                <p className="text-gray-600">Conseils personnalisés par nos pharmaciens experts</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg">📋</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Suivi Thérapeutique</h4>
                <p className="text-gray-600">Accompagnement continu dans votre traitement</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg">🏠</span>
                </div>
                <h4 className="font-semibold text-lg mb-2">Livraison à Domicile</h4>
                <p className="text-gray-600">Recevez vos médicaments directement chez vous</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <button className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg">
              Consulter tous nos produits de cardiologie
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}