// components/layout/Footer.tsx
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Shield,
  Award,
  Truck,
  Heart,
  CreditCard,
  Leaf,
  Pill,
  Baby,
  Sparkles,
  Syringe,
  Microscope,
  Send, // Added for newsletter button
  Code, // Used for a subtle decorative element
} from 'lucide-react'

// --- INTERFACES (Kept from original) ---

interface Category {
  icon: React.ComponentType<any>;
  name: string;
  subItems: string[];
}

interface CompanyLink {
  name: string;
  href: string;
}

interface Service {
  name: string;
  icon: React.ComponentType<any>;
  description: string;
}

interface TrustBadge {
  icon: React.ComponentType<any>;
  text: string;
}

// ----------------------------------------

export default function Footer() {
  const currentYear = new Date().getFullYear()

  // --- DATA (Kept from original) ---
  const categories: Category[] = [
    {
      icon: Pill,
      name: "Médicaments",
      subItems: ["Ordonnance", "Sans ordonnance", "Génériques", "Marques"]
    },
    {
      icon: Baby,
      name: "Soins Bébé",
      subItems: ["Couches", "Nutrition infantile", "Hygiène", "Soins spécifiques"]
    },
    {
      icon: Sparkles,
      name: "Beauté & Cosmétique",
      subItems: ["Soins Visage", "Maquillage", "Corps & Bain", "Soins Capillaires"]
    },
    {
      icon: Leaf,
      name: "Nutrition & Bien-être",
      subItems: ["Vitamines", "Compléments alimentaires", "Nutrition sportive", "Gestion du poids"]
    },
    {
      icon: Heart,
      name: "Cardiologie",
      subItems: ["Tensiomètres", "Contrôle cholestérol", "Surveillance glycémique", "Équipements ECG"]
    },
    {
      icon: Syringe,
      name: "Premiers Secours",
      subItems: ["Pansements", "Antiseptiques", "Matériel d'urgence", "Équipement médical"]
    }
  ]

  const companyLinks: CompanyLink[] = [
    { name: "À Propos de Nous", href: "/about" },
    { name: "Réseau de Pharmacies", href: "/pharmacies" },
    { name: "Opportunités de Carrière", href: "/careers" },
    { name: "Espace Professionnel", href: "/professionals" },
    { name: "Espace Presse", href: "/press" },
    { name: "Blog Santé", href: "/blog" }
  ]

  const services: Service[] = [
    { name: "Livraison Express", icon: Truck, description: "Sous 2 heures en zone urbaine" },
    { name: "Paiement Sécurisé", icon: CreditCard, description: "CB & Mobile Money" },
    { name: "Pharmacie de Garde", icon: Clock, description: "Service 24h/24 7j/7" },
    { name: "Conseil Pharmacien", icon: Microscope, description: "Expertise professionnelle gratuite" }
  ]

  const trustBadges: TrustBadge[] = [
    { icon: Shield, text: "Données Médicales Sécurisées" },
    { icon: Award, text: "Certification ANSM" },
    { icon: Heart, text: "Service Client 5★" }
  ]

  const socialMedia = [
    { Icon: Facebook, name: "Facebook" },
    { Icon: Twitter, name: "Twitter" },
    { Icon: Instagram, name: "Instagram" },
    { Icon: Linkedin, name: "LinkedIn" }
  ]

  const legalLinks = [
    { name: "Politique de Confidentialité", href: "#" },
    { name: "Conditions Générales", href: "#" },
    { name: "Mentions Légales", href: "#" },
    { name: "Gestion des Cookies", href: "#" },
    { name: "Conformité RGPD", href: "#" }
  ]
  // ----------------------------------------


  return (
    // Premium dark background with subtle gradient
    <footer className="bg-gradient-to-b from-gray-950 to-black text-white relative overflow-hidden pt-12">
      
      {/* Dynamic Hexagon/Code Pattern (Premium Aesthetic) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Code className="h-64 w-64 text-blue-900/10 absolute top-10 left-1/4 transform rotate-12" />
          <Heart className="h-48 w-48 text-emerald-900/10 absolute bottom-1/4 right-1/4 transform -rotate-45" />
      </div>

      {/* --- Trust Assurance Banner (Enhanced Gradient and Shadow) --- */}
      <div className="relative z-10 bg-gradient-to-r from-blue-900/30 to-emerald-900/30 border-y border-gray-700/50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-5 flex flex-col lg:flex-row items-center justify-between space-y-3 lg:space-y-0">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {trustBadges.map((badge, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-2 text-sm font-semibold transition-all duration-300 hover:scale-[1.02] cursor-default"
                >
                  {/* Enhanced Icon Styling */}
                  <badge.icon className="h-5 w-5 text-blue-400 flex-shrink-0 drop-shadow-md" />
                  <span className="text-gray-200 whitespace-nowrap">{badge.text}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse flex-shrink-0 shadow-lg shadow-green-500/50" />
                <span className="whitespace-nowrap font-medium text-white">Service en ligne actif</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Footer Content --- */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          
          {/* Brand Identity Section */}
          <div className="space-y-10">
            
            {/* Logo and Tagline */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                {/* Premium Logo Design (Gradient & Shadow) */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 transform hover:scale-[1.05] transition-transform duration-300">
                  <Pill className="h-7 w-7 text-white" /> {/* Use a more relevant Icon */}
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-gray-900 shadow-md" />
              </div>
              <div>
                <h2 className="text-4xl font-black bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent drop-shadow-lg">
                  E-Pharma
                </h2>
                <p className="text-blue-400 font-bold text-sm tracking-widest uppercase mt-0.5">
                  Santé & Innovation
                </p>
              </div>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Votre partenaire santé de confiance. Pharmacie en ligne agréée 
              proposant des produits pharmaceutiques de qualité supérieure 
              avec service de livraison express sur l'ensemble du territoire marocain.
            </p>

            {/* Services Excellence (Improved Visuals) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-4 rounded-xl bg-gray-800/60 backdrop-blur-md border border-gray-700/50 hover:bg-gray-700/50 transition-colors duration-300 transform hover:translate-y-[-2px] shadow-lg shadow-black/20"
                >
                  {/* Dynamic Color for Service Icon */}
                  <div className="p-2 bg-blue-500/20 rounded-xl flex-shrink-0 self-center">
                    <service.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-sm text-white truncate uppercase">
                      {service.name}
                    </p>
                    <p className="text-xs text-gray-400">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Product Categories */}
            <div>
              <h3 className="font-bold text-xl mb-7 text-white relative inline-block">
                Catégories Produits
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-500/50 rounded-full" />
              </h3>
              <div className="space-y-3">
                {categories.slice(0, 4).map((category, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer transform hover:translate-x-1">
                      <category.icon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <span className="font-semibold text-base">{category.name}</span>
                    </div>
                    {/* Simplified sub-items visibility for cleaner look */}
                  </div>
                ))}
                <a href="/categories" className="block mt-4 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                  Voir toutes les catégories →
                </a>
              </div>
            </div>

            {/* Corporate Information */}
            <div>
              <h3 className="font-bold text-xl mb-7 text-white relative inline-block">
                Institutionnel
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-500/50 rounded-full" />
              </h3>
              <div className="space-y-3">
                {companyLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="block text-gray-400 hover:text-white transition-all duration-200 text-base font-medium hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="font-bold text-xl mb-7 text-white relative inline-block">
                Contact & Urgences
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-purple-500/50 rounded-full" />
              </h3>
              <div className="space-y-5">
                
                {/* Location */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-500/10 rounded-lg flex-shrink-0 mt-1">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Siège Social</p>
                    <p className="text-sm text-gray-400">Kénitra, Maroc - <span className='text-xs text-gray-500'>Livraison Nationale</span></p>
                  </div>
                </div>

                {/* Phone - Highlighted for urgency */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-red-500/10 rounded-lg flex-shrink-0 mt-1 animate-pulse">
                    <Phone className="h-4 w-4 text-red-400" />
                  </div>
                  <div>
                    <p className="font-extrabold text-white text-lg">+212 5 37 37 37 37</p>
                    <p className="text-sm text-red-400">Assistance urgente 24h/24</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0 mt-1">
                    <Mail className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email Contact</p>
                    <p className="text-sm text-gray-400">contact@epharma.ma</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-2">
                  <p className="text-sm font-semibold text-gray-300 mb-3">
                    Rejoignez notre communauté
                  </p>
                  <div className="flex space-x-3">
                    {socialMedia.map(({ Icon, name }, index) => (
                      <a
                        key={index}
                        href="#"
                        className="p-3 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                        aria-label={`Suivez-nous sur ${name}`}
                      >
                        <Icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Newsletter Subscription (High-Impact Card) --- */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-10 border border-blue-500/30 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                Bulletin Santé Exclusif
              </h3>
              <p className="text-gray-300 max-w-lg text-lg">
                Recevez directement les conseils de nos pharmaciens, les nouveautés produits et les **offres privées**.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Votre adresse email pour les promos"
                className="px-5 py-4 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 flex-1 min-w-0 transition-all duration-200 text-base"
                aria-label="Adresse email pour l'abonnement"
              />
              <button 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-xl shadow-blue-500/40 transform hover:-translate-y-1 flex items-center justify-center space-x-2 uppercase"
                aria-label="S'abonner au bulletin santé"
              >
                <Send className="h-5 w-5" />
                <span>S'abonner</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Legal Footer (Subtly Enhanced) --- */}
      <div className="border-t border-gray-800 bg-black/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} <span className="text-gray-300 font-semibold">E-Pharma SAS</span>. 
              Tous droits réservés. <span className='text-blue-500 font-medium'>Agrément ANSM: PH-2024-001</span>
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              {legalLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="text-gray-500 hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Security Badge */}
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Shield className="h-3 w-3 flex-shrink-0 text-green-500" />
              <span className="whitespace-nowrap">Conformité ISO 27001 • Certificat SSL étendu</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}