// components/layout/Header.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import {
    Search,
    MapPin,
    Phone,
    Menu,
    X,
    ShoppingCart,
    User,
    ChevronDown,
    Pill,
    Truck,
    FileText,
    Store,
    Leaf,
    Shield,
    Clock,
    Heart,
    Stethoscope,
    Baby,
    Sparkles,
    Award,
    ShieldCheck,
    Bone,
    Brain,
    Ambulance,
    Calendar,
    BadgePercent,
    Microscope,
    Star,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

// Import the CartDropdown (assuming you renamed it as instructed)
// If you still use CartModal, rename the import and the component file!

// 🌟 FIX: Add onCartClick prop to handle opening the cart dropdown
export default function Header({ onCartClick }: { onCartClick: () => void }) {
    
    // The cartItemCount is now correctly read from the context
    const { cartItemCount } = useCart()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const [isScrolled, setIsScrolled] = useState(false)
    
    // 💡 NEW: Ref for the Cart Dropdown container (to manage clicks outside)
    const cartDropdownRef = useRef<HTMLDivElement>(null);
    const mainDropdownRef = useRef<HTMLDivElement>(null);


    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Close mega menus
            if (mainDropdownRef.current && !(mainDropdownRef.current as any).contains(event.target)) {
                setActiveDropdown(null)
            }
            // Close cart dropdown
            if (cartDropdownRef.current && !(cartDropdownRef.current as any).contains(event.target)) {
                 // 💡 IMPORTANT: onCartClick in Layout is a toggle, we need a separate handler to just close it.
                 // For now, we'll keep the logic simple, but ideally, Layout would expose 'closeCart'.
                 // We rely on the CartDropdown component's own click handler on its fixed/absolute overlay.
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // --- Category Data (omitted for brevity, assume unchanged) ---
    const pharmacieCategories = [
        { icon: Heart, title: "Cardiologie", items: ["Médicaments hypertension", "Anticoagulants"], href: "/pharmacie/cardiologie", color: "text-red-600", bgColor: "bg-red-50" },
        { icon: Bone, title: "Rhumatologie", items: ["Anti-inflammatoires", "Traitements arthrose"], href: "/pharmacie/rhumatologie", color: "text-orange-600", bgColor: "bg-orange-50" },
        { icon: Brain, title: "Neurologie", items: ["Antidépresseurs", "Traitements migraine"], href: "/pharmacie/neurologie", color: "text-purple-600", bgColor: "bg-purple-50" },
        { icon: Microscope, title: "Allergologie", items: ["Antihistaminiques", "Traitements asthme"], href: "/pharmacie/allergologie", color: "text-blue-600", bgColor: "bg-blue-50" }
    ]

    const parapharmacieCategories = [
        { icon: Baby, title: "Puériculture", items: ["Soins bébé", "Nutrition infantile"], href: "/parapharmacie/puericulture", color: "text-pink-600", bgColor: "bg-pink-50" },
        { icon: Stethoscope, title: "Soins Corps", items: ["Hygiène quotidienne", "Dermatologie"], href: "/parapharmacie/soins-corps", color: "text-emerald-600", bgColor: "bg-emerald-50" },
        { icon: Sparkles, title: "Beauté", items: ["Soins visage", "Maquillage"], href: "/parapharmacie/beaute", color: "text-rose-600", bgColor: "bg-rose-50" },
        { icon: Pill, title: "Compléments", items: ["Vitamines", "Minéraux"], href: "/parapharmacie/complements", color: "text-amber-600", bgColor: "bg-amber-50" }
    ]

    const servicesItems = [
        { icon: Truck, title: "Livraison Express", description: "Sous 2 heures en ville", features: ["Suivi en temps réel"], href: "/services/livraison", color: "text-orange-600", bgColor: "bg-orange-50" },
        { icon: Ambulance, title: "Urgence 24/7", description: "Service continu", features: ["Pharmacie de garde"], href: "/services/urgence", color: "text-red-600", bgColor: "bg-red-50" },
        { icon: Calendar, title: "Rappel Ordonnance", description: "Gestion intelligente", features: ["Alertes automatiques"], href: "/services/rappel", color: "text-blue-600", bgColor: "bg-blue-50" },
        { icon: BadgePercent, title: "Promotions", description: "Avantages exclusifs", features: ["Offres personnalisées"], href: "/promotions", color: "text-green-600", bgColor: "bg-green-50" }
    ]
    // -----------------------------------------------------------------------

    const DropdownContent = ({ items, title }: { items: any[], title: string }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50"
        >
            {/* ... Dropdown Content Structure (unchanged) ... */}
            <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-blue-600 font-semibold">
                        <Award className="h-4 w-4" />
                        <span>Produits certifiés</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    {items.map((category) => (
                        <div key={category.title} className="group">
                            <Link
                                href={category.href}
                                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                                onClick={() => setActiveDropdown(null)}
                            >
                                <div className={`p-3 rounded-xl ${category.bgColor} group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}>
                                    <category.icon className={`h-6 w-6 ${category.color}`} />
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-bold text-lg mb-2 group-hover:${category.color} transition-colors duration-200`}>
                                        {category.title}
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {category.items.map((item: string, index: number) => (
                                            <li key={index} className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-150">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-3 flex items-center text-xs text-blue-600 font-semibold">
                                        <span>Voir tous les produits</span>
                                        <ChevronDown className="h-3 w-3 transform -rotate-90 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Featured Services Section (omitted for brevity) */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-lg font-semibold text-gray-900">Services Associés</h4>
                        <div className="flex items-center space-x-2 text-sm text-blue-600">
                            <Star className="h-4 w-4" />
                            <span>Recommandés par nos experts</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {servicesItems.slice(0, 4).map((service) => (
                            <Link
                                key={service.title}
                                href={service.href}
                                className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group border border-transparent hover:border-gray-200"
                                onClick={() => setActiveDropdown(null)}
                            >
                                <div className={`w-12 h-12 ${service.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                                    <service.icon className={`h-6 w-6 ${service.color}`} />
                                </div>
                                <h5 className="font-semibold text-gray-900 text-sm mb-1">{service.title}</h5>
                                <p className="text-xs text-gray-500">{service.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )

    return (
        <header className={`bg-white backdrop-blur-md transition-all duration-300 sticky top-0 z-50 border-b ${
            isScrolled
                ? 'shadow-xl border-gray-200'
                : 'shadow-sm border-gray-100'
        }`}>
            {/* Top Bar (unchanged) */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>Kenitra - Livraison dans tout le Maroc</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-3.5 w-3.5" />
                            <span>Ouvert 24h/24 et 7j/7</span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <span>+212 5 30 123 456</span>
                        <div className="w-px h-4 bg-blue-500/50"></div>
                        <span>contact@epharma.ma</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo (unchanged) */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-4 group">
                            {/* ... Logo Content ... */}
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                    <Pill className="h-6 w-6 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900 tracking-tight">E-Pharma</span>
                                <span className="text-xs text-blue-600 font-semibold tracking-wider">PHARMACIE EN LIGNE</span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Search (unchanged) */}
                    <div className="hidden lg:block flex-1 max-w-2xl mx-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher médicaments, produits de santé, conseils..."
                                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                            />
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {/* Emergency (unchanged) */}
                        <Link
                            href="/urgence"
                            className="flex items-center space-x-3 text-gray-700 hover:text-red-600 transition-colors duration-200 group"
                        >
                            {/* ... Emergency Content ... */}
                            <div className="relative">
                                <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors duration-200">
                                    <Ambulance className="h-5 w-5 text-red-600" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold">Urgence</span>
                                <span className="text-xs text-gray-500">Disponible 24h</span>
                            </div>
                        </Link>

                        {/* 🛒 Cart Container - 💡 THE KEY FIX for Positioning */}
                        <div className="relative z-50" ref={cartDropdownRef}>
                            <button
                                onClick={onCartClick} // 🌟 This opens/closes the dropdown in Layout.tsx
                                className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200 group relative pr-4"
                                aria-label={`Ouvrir le Panier avec ${cartItemCount} articles`}
                            >
                                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold">Panier</span>
                                    <span className="text-xs text-gray-500">{cartItemCount} article{cartItemCount !== 1 ? 's' : ''}</span>
                                </div>
                                
                                {/* Cart Badge - Shows the live count */}
                                {cartItemCount > 0 && (
                                    <div className="absolute -top-1 right-3 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
                                        {cartItemCount}
                                    </div>
                                )}
                            </button>
                            
                            {/* // The CartDropdown is now handled by Layout.tsx and is absolutely 
                            // positioned relative to the overall screen, but using a 'fixed' position is necessary 
                            // for its click-outside closing mechanism, so we leave it in Layout. 
                            // The original instructions for CartDropdown.tsx should be used 
                            // (fixed inset-0, absolute positioning of the box inside it).
                            // We only make this wrapper relative to correctly scope the cart button visually.
                            // The `onCartClick` prop is correct.
                            */}
                        </div>

                        {/* Auth (unchanged) */}
                        <div className="flex items-center space-x-3">
                            <Link
                                href="/login"
                                className="flex items-center space-x-2 px-4 py-2.5 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 rounded-lg hover:bg-gray-50"
                            >
                                <User className="h-4 w-4" />
                                <span>Connexion</span>
                            </Link>
                            <Link
                                href="/register"
                                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 shadow-md hover:shadow-blue-200 hover:scale-105"
                            >
                                S'inscrire
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button and cart icon */}
                    <div className="flex items-center lg:hidden space-x-3">
                        {/* Mobile Cart Icon - 🌟 FIXED: Changed to Button and added onClick handler */}
                        <button
                            onClick={onCartClick} // 🌟 Call the function from the parent
                            className="p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
                            aria-label={`Ouvrir le Panier avec ${cartItemCount} articles`}
                        >
                            <ShoppingCart className="h-6 w-6 text-gray-700" />
                            {cartItemCount > 0 && (
                                <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white">
                                    {cartItemCount}
                                </div>
                            )}
                        </button>

                        {/* Mobile menu button */}
                        <button
                            className="p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center justify-between py-4 border-t border-gray-200">
                    {/* Main Nav Links */}
                    <div className="flex items-center space-x-8" ref={mainDropdownRef}>
                        {/* Pharmacie Dropdown (unchanged structure) */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => setActiveDropdown('pharmacie')}
                                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 group py-2"
                            >
                                <Store className="h-5 w-5" />
                                <span>Pharmacie</span>
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'pharmacie' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeDropdown === 'pharmacie' && (
                                    <div onMouseLeave={() => setActiveDropdown(null)}>
                                        <DropdownContent items={pharmacieCategories} title="Médicaments & Traitements" />
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Parapharmacie Dropdown (unchanged structure) */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => setActiveDropdown('parapharmacie')}
                                className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 font-semibold transition-colors duration-200 group py-2"
                            >
                                <Leaf className="h-5 w-5" />
                                <span>Parapharmacie</span>
                                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === 'parapharmacie' ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeDropdown === 'parapharmacie' && (
                                    <div onMouseLeave={() => setActiveDropdown(null)}>
                                        <DropdownContent items={parapharmacieCategories} title="Bien-être & Soins" />
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Simple Nav Links (unchanged) */}
                        <Link href="/services" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-semibold transition-colors duration-200 group py-2">
                            <Truck className="h-5 w-5" />
                            <span>Nos Services</span>
                        </Link>
                        <Link href="/blog" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-semibold transition-colors duration-200 group py-2">
                            <FileText className="h-5 w-5" />
                            <span>Conseils Santé</span>
                        </Link>
                        <Link href="/contact" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 group py-2">
                            <Phone className="h-5 w-5" />
                            <span>Contact</span>
                        </Link>
                    </div>

                    {/* Trust Badges (unchanged) */}
                    <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2 text-green-600 font-semibold">
                            <ShieldCheck className="h-5 w-5" />
                            <span>Certifié ANSM</span>
                        </div>
                        <div className="flex items-center space-x-2 text-blue-600 font-semibold">
                            <Shield className="h-5 w-5" />
                            <span>Paiement Sécurisé</span>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu (unchanged logic) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-200 shadow-2xl overflow-hidden"
                    >
                        {/* ... Mobile Menu Content ... (omitted for brevity) */}
                        <div className="px-4 py-6 space-y-6">
                            {/* Mobile Search */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Rechercher produits..."
                                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                                />
                            </div>

                            {/* Pharmacie Mobile */}
                            {/* ... Mobile Pharmacie Content (omitted for brevity) ... */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                                    <Store className="h-5 w-5 text-blue-600 mr-2" />
                                    Pharmacie
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {pharmacieCategories.map((category) => (
                                        <Link key={category.title} href={category.href} className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                                            <div className={`p-2 rounded-lg ${category.bgColor}`}><category.icon className={`h-4 w-4 ${category.color}`} /></div>
                                            <div><span className="font-semibold text-gray-900 text-sm">{category.title}</span></div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Parapharmacie Mobile */}
                            {/* ... Mobile Parapharmacie Content (omitted for brevity) ... */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                                    <Leaf className="h-5 w-5 text-emerald-600 mr-2" />
                                    Parapharmacie
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {parapharmacieCategories.map((category) => (
                                        <Link key={category.title} href={category.href} className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                                            <div className={`p-2 rounded-lg ${category.bgColor}`}><category.icon className={`h-4 w-4 ${category.color}`} /></div>
                                            <div><span className="font-semibold text-gray-900 text-sm">{category.title}</span></div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Services Mobile */}
                            {/* ... Mobile Services Content (omitted for brevity) ... */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Services</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {servicesItems.map((service) => (
                                        <Link key={service.title} href={service.href} className="text-center p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                                            <div className={`w-10 h-10 ${service.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2`}><service.icon className={`h-5 w-5 ${service.color}`} /></div>
                                            <span className="font-semibold text-gray-900 text-sm">{service.title}</span>
                                            <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Auth (unchanged) */}
                            <div className="border-t border-gray-200 pt-6 space-y-3">
                                <Link
                                    href="/connexion"
                                    className="flex items-center justify-center space-x-2 w-full p-4 rounded-xl border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 font-semibold"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <User className="h-4 w-4" />
                                    <span>Connexion</span>
                                </Link>
                                <Link
                                    href="/inscription"
                                    className="flex items-center justify-center w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold hover:shadow-lg transition-all duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Créer un compte
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}