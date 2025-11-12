// components/EPharmaHeroSlider3D.tsx
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectCreative, Parallax } from 'swiper/modules'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  Pill, Heart, Sparkles, Shield, Clock, Star, ArrowRight, Video, Users, Award, Zap, Leaf, CheckCircle, PauseCircle, PlayCircle
} from 'lucide-react'
import { useState, useRef, useMemo, FC, MouseEvent } from 'react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-creative'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/parallax'

// --- Color Mapping for Safe Tailwind Usage ---
const ACCENT_COLORS = {
  blue: {
    text: 'text-blue-300',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-blue-600',
    ctaFrom: 'from-blue-600',
    ctaTo: 'to-blue-700',
    bgLight: 'bg-blue-900/40',
    borderLight: 'border-blue-700/50',
    textLight: 'text-blue-300',
    bgAccent: 'bg-blue-500/10'
  },
  purple: {
    text: 'text-purple-300',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-purple-600',
    ctaFrom: 'from-purple-600',
    ctaTo: 'to-purple-700',
    bgLight: 'bg-purple-900/40',
    borderLight: 'border-purple-700/50',
    textLight: 'text-purple-300',
    bgAccent: 'bg-purple-500/10'
  },
  emerald: {
    text: 'text-emerald-300',
    gradientFrom: 'from-emerald-400',
    gradientTo: 'to-emerald-600',
    ctaFrom: 'from-emerald-600',
    ctaTo: 'to-emerald-700',
    bgLight: 'bg-emerald-900/40',
    borderLight: 'border-emerald-700/50',
    textLight: 'text-emerald-300',
    bgAccent: 'bg-emerald-500/10'
  },
} as const;

type AccentColor = keyof typeof ACCENT_COLORS;

interface Slide {
  id: number
  category: 'pharmacie' | 'parapharmacie'
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType<any>
  gradient: string
  overlay: string
  features: string[]
  badge: string
  stats: Array<{ value: string; label: string; icon: React.ComponentType<any> }>
  ctaPrimary: string
  ctaSecondary: string
  accentColor: AccentColor
}

const slides: Slide[] = [
    {
        id: 1,
        category: 'pharmacie',
        title: "Médicaments Prescrits",
        subtitle: "PHARMACIE CERTIFIÉE • LIVRAISON SÉCURISÉE",
        description: "Vos médicaments prescrits livrés en toute sécurité avec suivi pharmaceutique personnalisé. Service agréé par le Ministère de la Santé.",
        icon: Pill,
        gradient: "from-blue-950/95 via-slate-900/90 to-blue-900/85",
        overlay: "bg-gradient-to-br from-blue-900/60 via-slate-900/50 to-blue-800/60",
        features: ["Ordonnances Numériques", "Validation Pharmacien", "Traçabilité Complète"],
        badge: "AGRÉMENT ANSM",
        stats: [
            { value: "24/7", label: "Service Continu", icon: Clock },
            { value: "5000+", label: "Médicaments", icon: Pill },
            { value: "98%", label: "Disponibilité", icon: Shield }
        ],
        ctaPrimary: "Ordonnance en Ligne",
        ctaSecondary: "Consultation Vidéo",
        accentColor: "blue",
    },
    {
        id: 2,
        category: 'parapharmacie',
        title: "Soins & Bien-être",
        subtitle: "BEAUTÉ • HYGIÈNE • COMPLÉMENTS",
        description: "Découvrez notre gamme complète de produits de parapharmacie pour votre bien-être au quotidien. Qualité pharmaceutique garantie.",
        icon: Sparkles,
        gradient: "from-purple-950/95 via-pink-900/90 to-rose-900/85",
        overlay: "bg-gradient-to-br from-purple-900/60 via-pink-900/50 to-rose-800/60",
        features: ["Cosmétiques Actifs", "Compléments Alimentaires", "Hygiène Premium"],
        badge: "PARAPHARMACIE",
        stats: [
            { value: "2000+", label: "Produits", icon: Sparkles },
            { value: "4.9/5", label: "Satisfaction", icon: Star },
            { value: "Marques", label: "Premium", icon: Award }
        ],
        ctaPrimary: "Découvrir le Catalogue",
        ctaSecondary: "Conseil Beauté",
        accentColor: "purple",
    },
    {
        id: 3,
        category: 'pharmacie',
        title: "Santé Naturelle",
        subtitle: "VITAMINES • PLANTES • NUTRITION",
        description: "Compléments alimentaires, vitamines et produits de santé naturelle sélectionnés par nos pharmaciens pour une santé optimale.",
        icon: Leaf,
        gradient: "from-emerald-950/95 via-teal-900/90 to-green-900/85",
        overlay: "bg-gradient-to-br from-emerald-900/60 via-teal-900/50 to-green-800/60",
        features: ["Vitamines & Minéraux", "Plantes Médicinales", "Nutrition Sportive"],
        badge: "BIEN-ÊTRE ACTIF",
        stats: [
            { value: "100%", label: "Naturel", icon: Heart },
            { value: "Bio", label: "Sélection", icon: Leaf },
            { value: "Expert", label: "Conseil", icon: Users }
        ],
        ctaPrimary: "Catalogue Santé",
        ctaSecondary: "Conseil Nutrition",
        accentColor: "emerald",
    },
]

// --- 3D INTERACTIVE CARD COMPONENT ---
interface StatCardProps {
    stat: Slide['stats'][0];
    accent: typeof ACCENT_COLORS[AccentColor];
}

const StatCard3D: FC<StatCardProps> = ({ stat, accent }) => {
    const x = useMotionValue(0.5)
    const y = useMotionValue(0.5)

    const springConfig = { damping: 25, stiffness: 400, mass: 1 }
    const rotateX = useSpring(useTransform(y, [0, 1], [-10, 10]), springConfig)
    const rotateY = useSpring(useTransform(x, [0, 1], [10, -10]), springConfig)
    const shadowX = useTransform(rotateY, [10, -10], ['-10px', '10px'])
    const shadowY = useTransform(rotateX, [-10, 10], ['-10px', '10px'])

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width)
        y.set((e.clientY - rect.top) / rect.height)
    }

    const handleMouseLeave = () => {
        x.set(0.5)
        y.set(0.5)
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformPerspective: '1000px',
                rotateX,
                rotateY,
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="text-center group p-4 rounded-2xl bg-white/5 backdrop-blur-xl transition-all duration-500 border border-white/10 hover:border-white/20 relative overflow-hidden"
        >
            {/* Dynamic 3D Shadow/Glow */}
            <motion.div
                className="absolute inset-0 rounded-2xl z-0 pointer-events-none opacity-80"
                style={{
                    boxShadow: `${shadowX} ${shadowY} 30px rgba(0, 0, 0, 0.5), 0 0 50px -10px rgba(var(--rgb-${accent.ctaFrom.split('-')[1]}), 0.5)`,
                }}
            />
            
            <div className={`absolute inset-0 opacity-10 ${accent.bgAccent} animate-pulse duration-1000 group-hover:opacity-20 transition-opacity`} />
            
            <div className="flex flex-col items-center justify-center space-y-1 relative z-10">
                <stat.icon className={`h-8 w-8 ${accent.text} drop-shadow-lg`} />
                <div className={`text-4xl font-extrabold tracking-tighter bg-gradient-to-r ${accent.gradientFrom} ${accent.gradientTo} bg-clip-text text-transparent drop-shadow-md`}>
                    {stat.value}
                </div>
            </div>
            <div className="text-white/70 font-semibold text-xs tracking-widest uppercase mt-2 relative z-10">{stat.label}</div>
        </motion.div>
    );
}
// --- END 3D INTERACTIVE CARD COMPONENT ---

// --- Main Slider Component ---
export default function EPharmaHeroSlider3D() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeSlide, setActiveSlide] = useState(0)
  const swiperRef = useRef<any>(null)

  const currentSlide = slides[activeSlide]
  const currentAccent = ACCENT_COLORS[currentSlide.accentColor]

  const toggleAutoplay = () => {
    setIsPlaying(prev => {
      const newPlayState = !prev;
      if (swiperRef.current && swiperRef.current.swiper) {
        if (newPlayState) {
          swiperRef.current.swiper.autoplay.start();
        } else {
          swiperRef.current.swiper.autoplay.stop();
        }
      }
      return newPlayState;
    });
  };

  const CategoryBadge = ({ category }: { category: 'pharmacie' | 'parapharmacie' }) => {
    const isPharmacie = category === 'pharmacie';
    const accent = isPharmacie ? ACCENT_COLORS.blue : ACCENT_COLORS.purple;

    return (
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={`px-7 py-2.5 rounded-full font-extrabold text-xs tracking-[.35em] uppercase border ${
          isPharmacie 
            ? `${ACCENT_COLORS.blue.bgLight} ${ACCENT_COLORS.blue.textLight} ${ACCENT_COLORS.blue.borderLight} shadow-blue-500/30`
            : `${ACCENT_COLORS.purple.bgLight} ${ACCENT_COLORS.purple.textLight} ${ACCENT_COLORS.purple.borderLight} shadow-purple-500/30`
        } shadow-lg backdrop-blur-sm`}
      >
        {isPharmacie ? 'PHARMACIE' : 'PARAPHARMACIE'}
      </motion.div>
    );
  }

  return (
    <div className="relative h-screen bg-gray-950 overflow-hidden font-sans">
      
      {/* Background - Deep Space Effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gray-900">
            <div className="absolute inset-0 opacity-10 animate-pulse-slow">
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(ellipse at center, rgba(30,58,138,0.1) 0%, transparent 70%)`,
                    }}
                />
            </div>
        </div>
        {/* Dynamic Gradient Overlay */}
        <div className={`absolute inset-0 ${currentSlide.gradient}`} />
      </div>

      {/* High-Fidelity Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        centeredSlides={true}
        speed={1400}
        autoplay={isPlaying ? { delay: 8000, disableOnInteraction: false } : false}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        parallax={true}
        effect={'creative'}
        creativeEffect={{
          prev: { shadow: true, translate: [0, 0, -1200], rotate: [0, 0, -2] },
          next: { translate: ['120%', 0, 0], rotate: [0, 0, 2] },
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        modules={[Autoplay, Pagination, Navigation, EffectCreative, Parallax]}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`relative h-full ${slide.overlay}`}>
              
              {/* Content Container */}
              <div className="relative h-full flex items-center pt-24 pb-48">
                <div className="max-w-8xl mx-auto px-8 lg:px-16 w-full" data-swiper-parallax-opacity="0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Left Content - Text & Features (col-span-7) */}
                    <motion.div
                      initial={{ opacity: 0, x: -100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="text-white space-y-10 lg:col-span-7"
                      data-swiper-parallax="-100"
                    >
                      {/* Category & Badge */}
                      <div className="flex items-center space-x-6">
                        <CategoryBadge category={slide.category} />
                        <motion.div 
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.6 }}
                           className="px-5 py-2 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 ring-1 ring-white/5"
                        >
                          <span className="text-xs font-bold tracking-widest uppercase text-white/60">{slide.badge}</span>
                        </motion.div>
                      </div>

                      {/* Title Section - Kinetic Typography */}
                      <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl xl:text-9xl font-extrabold leading-none tracking-tight">
                          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-stroke-2">
                            {slide.title}
                          </span>
                        </h1>
                        
                        <div className="flex items-center space-x-4">
                          <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse flex-shrink-0 shadow-lg shadow-green-500/50" />
                          <p className="text-2xl font-semibold tracking-wider text-blue-200/90">
                            {slide.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xl text-gray-200 leading-relaxed font-light max-w-3xl border-l-4 border-white/30 pl-6 pt-2">
                        {slide.description}
                      </p>
                      
                      {/* Features Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
                        {slide.features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.8, type: "spring", stiffness: 100 }}
                            className="flex items-center space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 group shadow-xl hover:shadow-2xl"
                          >
                            <div className={`p-2 ${currentAccent.bgAccent} rounded-xl border border-white/10`}>
                              <CheckCircle className="h-5 w-5 text-green-400" />
                            </div>
                            <span className="font-semibold text-white/95 text-base tracking-wide">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* CTA Buttons - Glowing Primary, Ethereal Secondary */}
                      <div className="flex flex-col sm:flex-row gap-6 pt-10">
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: `0 0 30px rgba(59, 130, 246, 0.8), 0 0 10px rgba(255, 255, 255, 0.4)` }}
                          whileTap={{ scale: 0.95 }}
                          className={`bg-gradient-to-r ${currentAccent.ctaFrom} ${currentAccent.ctaTo} text-white px-12 py-5 rounded-xl font-extrabold text-xl shadow-2xl transition-all duration-500 flex items-center justify-center space-x-4 relative overflow-hidden group border border-white/20`}
                        >
                          <slide.icon className="h-6 w-6" />
                          <span>{slide.ctaPrimary}</span>
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                          whileTap={{ scale: 0.95 }}
                          className="border border-white/30 text-white/80 px-10 py-5 rounded-xl font-semibold text-xl backdrop-blur-xl hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-4 shadow-xl"
                        >
                          <Video className="h-6 w-6" />
                          <span>{slide.ctaSecondary}</span>
                        </motion.button>
                      </div>
                    </motion.div>

                    {/* Right Content - Visual & Stats (col-span-5) */}
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="relative lg:col-span-5 hidden lg:block"
                      data-swiper-parallax="100"
                    >
                      {/* Main Visual Card - Ethereal, translucent design */}
                      <div className="relative bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 border border-white/10 shadow-3xl ring-2 ring-white/5">
                        
                        {/* Stats Grid using 3D Card Component */}
                        <div className="grid grid-cols-3 gap-8 mb-8">
                          {slide.stats.map((stat, index) => (
                            <StatCard3D key={stat.label} stat={stat} accent={currentAccent} />
                          ))}
                        </div>

                        {/* Interactive Demo */}
                        <div className={`bg-black/50 rounded-3xl p-8 border border-white/20 shadow-inner-2xl`}>
                          <div className="flex justify-between items-center mb-6">
                            <span className="text-white font-extrabold text-base tracking-widest uppercase">E-PHARMA NETWORK</span>
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
                              <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-500/50" />
                            </div>
                          </div>
                          <div className={`h-40 bg-gradient-to-br ${currentAccent.bgAccent} rounded-2xl flex items-center justify-center border border-white/10 shadow-inner-xl`}>
                            <div className="text-center space-y-3">
                              <slide.icon className={`h-14 w-14 ${currentAccent.text} mx-auto filter drop-shadow-2xl`} />
                              <div className="text-white/95 font-bold text-xl uppercase">
                                {slide.category === 'pharmacie' ? 'PRESCRIPTION' : 'WELLNESS'}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Pagination and Autoplay Control */}
        <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-10 flex space-x-6 items-center">
            {/* Play/Pause Button */}
            <motion.button
                onClick={toggleAutoplay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 transition-all duration-300 shadow-2xl"
                aria-label={isPlaying ? "Pause slider" : "Play slider"}
            >
                {isPlaying ? <PauseCircle className="h-6 w-6 text-white" /> : <PlayCircle className="h-6 w-6 text-white" />}
            </motion.button>

            {/* Pagination Bullets */}
            <div className="custom-pagination flex space-x-2"></div>
        </div>

        {/* Navigation Arrows - Clean, futuristic design */}
        <div className="swiper-button-prev absolute left-10 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/5 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all duration-300 group shadow-2xl">
          <ArrowRight className="h-6 w-6 text-white/80 rotate-180 transition-transform group-hover:scale-110" />
        </div>
        <div className="swiper-button-next absolute right-10 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/5 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all duration-300 group shadow-2xl">
          <ArrowRight className="h-6 w-6 text-white/80 transition-transform group-hover:scale-110" />
        </div>
      </Swiper>

      {/* Required CSS for effects not supported directly by Tailwind classes */}
      <style jsx global>{`
        /* Global CSS for kinetic title effect */
        .text-stroke-2 {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
          text-stroke: 1px rgba(255, 255, 255, 0.1);
        }

        /* Keyframes for subtle background pulse */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.25; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 20s infinite ease-in-out;
        }

        /* Custom Pagination - Highly refined */
        .custom-bullet {
          width: 60px;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 1.5px;
          margin: 0 5px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0.6;
        }
        
        .custom-bullet-active {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        
        .custom-bullet-active::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, #3B82F6, #10B981); 
          animation: progress 8s linear;
          border-radius: 1.5px;
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        .shadow-inner-xl {
            box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
        }
        .shadow-inner-2xl {
            box-shadow: inset 0 4px 15px rgba(0,0,0,0.7);
        }
      `}</style>
    </div>
  )
}