// src/app/(auth)/layout.tsx
import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
    // Define main premium colors for easy modification
    const PRIMARY_START = 'from-teal-500';
    const PRIMARY_END = 'to-green-600';

    return (
        // Main wrapper: White/light background for the whole page
        <div className="min-h-screen bg-gray-50">
            <div className="flex min-h-screen">
                
                {/* ------------------------------------------------------------------ */}
                {/* Left Side - Premium Branding Panel (Hidden on mobile) */}
                {/* ------------------------------------------------------------------ */}
                <div 
                    className={`hidden lg:flex lg:flex-1 lg:flex-col lg:justify-between lg:p-12 
                        bg-gradient-to-br ${PRIMARY_START} ${PRIMARY_END} 
                        relative overflow-hidden shadow-2xl shadow-green-900/50 
                        max-w-xl xl:max-w-2xl 2xl:max-w-3xl`}
                >
                    {/* Background Pattern/Texture (Optional) */}
                    <svg className="absolute inset-0 w-full h-full opacity-10" fill="none">
                        <defs>
                            <pattern id="grid-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 L 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    </svg>

                    {/* Content Wrapper */}
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        
                        {/* Top: Logo */}
                        <header className="flex items-center space-x-4 mb-16">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-xl">
                                <span className="text-white font-extrabold text-3xl tracking-tighter">+</span>
                            </div>
                            <span className="text-3xl font-extrabold text-white tracking-tighter">E-Pharma</span>
                        </header>
                        
                        {/* Center: Main Message */}
                        <main className="max-w-lg pb-10">
                            <h1 className="text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight drop-shadow-lg">
                                Votre Partenaire Santé, Digital et Sécurisé.
                            </h1>
                            <p className="text-teal-100 text-xl font-light leading-relaxed">
                                Accédez à la plateforme professionnelle leader au Maroc. Simplifiez la gestion et optimisez le service client.
                            </p>
                        </main>
                        
                        {/* Bottom: Footer Info */}
                        <footer className="pt-8 border-t border-white/20">
                            <div className="flex space-x-6 text-white text-sm font-medium">
                                <span>© 2024 E-Pharma</span>
                                <span className="opacity-50">|</span>
                                <span>Kenitra, Maroc</span>
                            </div>
                        </footer>
                    </div>
                </div>

                {/* ------------------------------------------------------------------ */}
                {/* Right Side - Auth Forms Container */}
                {/* ------------------------------------------------------------------ */}
                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 2xl:px-32">
                    {/* The children (LoginPage or RegisterPage) are rendered here, centered */}
                    {children}
                </div>
            </div>
        </div>
    )
}