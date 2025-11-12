// src/app/(auth)/login/page.tsx

"use client" 

import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'
import { motion } from 'framer-motion';

export default function LoginPage() {
    return (
        // Full-page wrapper for background and centering
        // CHANGED: Light background with subtle light gray/blue gradient
        <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50/70 text-gray-900 relative overflow-hidden">
            
            {/* Optional: Background blobs/gradients (Adjusted for light theme) */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50" style={{ animationDelay: '-2s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50" style={{ animationDelay: '-4s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-green-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>


            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full max-w-md z-10"
            >
                {/* Header Section */}
                <div className="text-center mb-10">
                    
                    {/* Logo (Visible on mobile, text color changed for light background) */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <motion.div 
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.4 }}
                            className="flex items-center space-x-3"
                        >
                            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-800/50">
                                <span className="text-white font-extrabold text-3xl tracking-tighter">+</span>
                            </div>
                            {/* CHANGED: Text color for the logo on a light background */}
                            <span className="text-3xl font-extrabold text-gray-900 tracking-tight">E-Pharma</span>
                        </motion.div>
                    </div>
                    
                    {/* Main Title (Text color changed for light background) */}
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        Bienvenue
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Accédez à votre espace professionnel
                    </p>
                </div>

                {/* LoginForm Component */}
                <LoginForm />

                {/* "New on E-Pharma" Section (Adjusted for light background) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    // CHANGED: From dark/blurred to clean white card
                    className="mt-8 text-center bg-white border border-gray-200 rounded-xl py-4 px-6 shadow-md"
                >
                    <p className="text-gray-700 text-base">
                        Nouveau sur E-Pharma ?{' '}
                        <Link 
                            href="/register" 
                            // Keeping the professional gradient for the link
                            className="font-bold bg-gradient-to-r from-teal-500 to-green-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                        >
                            Créer un compte
                        </Link>
                    </p>
                </motion.div>

                {/* Emergency Access (Adjusted for light background) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    // CHANGED: From dark red to light red card
                    className="mt-8 p-5 bg-red-50 border border-red-300 rounded-xl shadow-lg shadow-red-100"
                >
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-inner">
                            <span className="text-red-700 font-extrabold text-2xl">!</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-red-800 text-lg mb-0.5">Accès Urgence</h3>
                            <p className="text-red-700 text-sm">
                                Pharmacie de garde : <strong className="font-mono tracking-wide">05 37 37 37 37</strong>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Blob animation keyframes (still needed if the background blobs are active) */}
            <style jsx global>{`
                @keyframes blob {
                    0% {
                        transform: translate(0px, 0px) scale(1);
                    }
                    33% {
                        transform: translate(30px, -50px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    100% {
                        transform: translate(0px, 0px) scale(1);
                    }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
            `}</style>
        </div>
    )
}