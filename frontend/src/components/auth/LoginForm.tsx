'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, Building, User, Sparkles, Shield, ArrowRight } from 'lucide-react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authService } from './services/authService';

// Define the primary professional color palette for consistency
const PRIMARY_COLOR = 'from-teal-500 to-green-600';
const SECONDARY_COLOR = 'from-purple-500 to-pink-500';

// ========================================================================
// 1. Zod Validation Schema
// ========================================================================
const loginSchema = z.object({
    email: z.string().min(1, 'L\'email est obligatoire.').email('Format d\'email invalide.'),
    password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères.'),
    userType: z.enum(['pharmacist', 'client'], {
        required_error: "Veuillez sélectionner votre type d'utilisateur.",
    }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;
// ========================================================================

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const router = useRouter();

    // ========================================================================
    // 2. React Hook Form Initialization
    // ========================================================================
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            userType: 'pharmacist',
            email: '',
            password: '',
        },
        mode: "onTouched"
    });
    
    const userType = watch('userType');
    // ========================================================================

    // ========================================================================
    // 3. UPDATED Submission Handler - Uses real authService
    // ========================================================================
    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setApiError(null);
        
        try {
            console.log('Attempting login with:', data);
            
            // Call real backend API via authService
            const response = await authService.login({
                email: data.email,
                password: data.password,
                userType: data.userType
            });

            console.log('Login successful:', response);
            
            // Show success message (you can replace with toast notification)
            
            // Redirect based on user role
            if (response.client.role === 'ADMINISTRATORCLIENT') {
                router.push('/admin/dashboard');
            } else {
                router.push('/');
            }
            
        } catch (error: any) {
            console.error('Login failed:', error);
            
            // Handle different error types
            let errorMessage = 'Échec de la connexion. Veuillez réessayer.';
            
            if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            } else if (error?.message) {
                errorMessage = error.message;
            }
            
            setApiError(errorMessage);
        }
    };
    // ========================================================================

    const userTypes = [
        { 
            value: 'pharmacist', 
            label: 'Pharmacien', 
            icon: Building,
            description: 'Accès professionnel',
            color: PRIMARY_COLOR,
            hoverBg: 'hover:bg-teal-700/10'
        },
        { 
            value: 'client', 
            label: 'Client/Para.', 
            icon: User,
            description: 'Espace parapharmacie',
            color: SECONDARY_COLOR,
            hoverBg: 'hover:bg-purple-700/10'
        }
    ]

    // Demo accounts - these should match actual users in your database
    const demoAccounts = [
        {
            type: 'Pharmacien',
            email: 'pharmacien@demo.ma',
            password: 'demo123',
            color: 'bg-gradient-to-r from-teal-500/10 to-green-500/10 border-teal-600/50',
            userType: 'pharmacist' as 'pharmacist'
        },
        {
            type: 'Client',
            email: 'client@demo.ma',
            password: 'demo123',
            color: 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-600/50',
            userType: 'client' as 'client'
        }
    ]

    // Helper to apply demo credentials
    const applyDemoCredentials = (account: typeof demoAccounts[number]) => {
        setApiError(null);
        setValue('email', account.email, { shouldValidate: true });
        setValue('password', account.password, { shouldValidate: true });
        setValue('userType', account.userType, { shouldValidate: true });
    };
    
    // Helper function to handle user type switch
    const handleUserTypeSwitch = (newType: 'pharmacist' | 'client') => {
        setApiError(null);
        setValue('userType', newType, { shouldValidate: true });

        reset({
            userType: newType,
            email: '',
            password: '',
        }, {
            keepErrors: false,
            keepTouched: false,
        });
    };

    return (
        <div className="max-w-md mx-auto bg-white/5 backdrop-blur-md border border-gray-700 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-8 md:p-10">
            
            {/* Header */}
            <div className="text-center mb-10">
                <div className="flex items-center justify-center mb-5">
                    <div className="relative">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-900/50 bg-gradient-to-br ${PRIMARY_COLOR}`}>
                            <Shield className="h-7 w-7 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50">
                            <Sparkles className="h-3.5 w-3.5 text-white" />
                        </div>
                    </div>
                </div>
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-2 tracking-tight">
                    Connexion Sécurisée
                </h1>
                <p className="text-gray-400 text-lg">Accédez à votre espace professionnel</p>
            </div>

            {/* API Error Display */}
            {apiError && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 text-sm font-medium backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-red-400" />
                        <span>{apiError}</span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                
                {/* User Type Selection */}
                <div className="bg-gray-800/50 p-3 rounded-2xl border border-gray-700 shadow-inner shadow-black/20">
                    <div className="grid grid-cols-2 gap-3">
                        {userTypes.map((type) => {
                            const Icon = type.icon
                            const isSelected = userType === type.value
                            
                            return (
                                <button
                                    key={type.value}
                                    type="button"
                                    onClick={() => handleUserTypeSwitch(type.value as 'pharmacist' | 'client')}
                                    className={`relative p-4 rounded-xl transition-all duration-300 ${type.hoverBg} ${
                                        isSelected
                                            ? `bg-gradient-to-r ${type.color} text-white shadow-xl shadow-gray-900/50 border border-gray-600`
                                            : 'bg-gray-800 text-gray-400 hover:text-gray-100 border border-gray-700/70'
                                    }`}
                                >
                                    {isSelected && (
                                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-gray-700">
                                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${type.color}`} />
                                        </div>
                                    )}
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className={`p-2 rounded-lg ${
                                            isSelected ? 'bg-white/20' : 'bg-gray-700/50'
                                        }`}>
                                            <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-gray-300'}`} />
                                        </div>
                                        <span className={`font-bold text-base ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                                            {type.label}
                                        </span>
                                        <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>
                                            {type.description}
                                        </span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                    {errors.userType && (
                        <p className="mt-3 text-sm text-red-500 text-center font-medium">
                            {errors.userType.message}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email professionnel
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className={`h-5 w-5 text-gray-500 transition-colors duration-200 ${errors.email ? 'text-red-500' : 'group-focus-within:text-teal-400'}`} />
                        </div>
                        <input
                            id="email"
                            type="email"
                            placeholder="votre@pharmacie.ma"
                            {...register('email')}
                            className={`w-full pl-11 pr-4 py-3 bg-gray-900/70 border rounded-xl text-gray-50 transition-all duration-200 placeholder-gray-500 shadow-xl shadow-black/10 
                                ${errors.email 
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                    : 'border-gray-700 focus:ring-teal-500 focus:border-teal-500'}`}
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-2 text-sm text-red-500 font-medium">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="group">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                        Mot de passe
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className={`h-5 w-5 text-gray-500 transition-colors duration-200 ${errors.password ? 'text-red-500' : 'group-focus-within:text-teal-400'}`} />
                        </div>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Votre mot de passe"
                            {...register('password')}
                            className={`w-full pl-11 pr-12 py-3 bg-gray-900/70 border rounded-xl text-gray-50 transition-all duration-200 placeholder-gray-500 shadow-xl shadow-black/10 
                                ${errors.password 
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                    : 'border-gray-700 focus:ring-teal-500 focus:border-teal-500'}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-500 hover:text-teal-400 transition-all duration-200 rounded-lg"
                            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                        >
                            {showPassword ? 
                                <EyeOff className="h-5 w-5" /> : 
                                <Eye className="h-5 w-5" />
                            }
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-2 text-sm text-red-500 font-medium">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-3 group cursor-pointer" htmlFor="remember">
                        <div className="relative">
                            <input
                                id="remember"
                                type="checkbox"
                                className="sr-only peer"
                            />
                            <div className="w-5 h-5 border-2 border-gray-600 rounded-md group-hover:border-teal-400 transition-colors duration-200 flex items-center justify-center peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-green-600 peer-checked:border-teal-500">
                                <div className="w-3 h-3 bg-white rounded-sm scale-0 transition-transform duration-200 peer-checked:scale-100" />
                            </div>
                        </div>
                        <span className="text-sm text-gray-400 font-medium hover:text-gray-200 transition-colors duration-200">Se souvenir de moi</span>
                    </label>
                    
                    <button 
                        type="button" 
                        className={`text-sm font-semibold bg-gradient-to-r ${PRIMARY_COLOR} bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200`}
                    >
                        Mot de passe oublié ?
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full group relative bg-gradient-to-r ${PRIMARY_COLOR} text-white py-4 px-6 rounded-xl font-bold text-lg shadow-2xl shadow-green-900/50 transform transition-all duration-300 ${
                        isSubmitting 
                            ? 'opacity-75 cursor-not-allowed disabled:transform-none' 
                            : 'hover:scale-[1.01] hover:shadow-green-700/70'
                    } overflow-hidden`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="relative flex items-center justify-center space-x-3">
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" role="status" aria-label="Connexion en cours" />
                                <span>Connexion en cours...</span>
                            </>
                        ) : (
                            <>
                                <span>Se connecter</span>
                                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
                            </>
                        )}
                    </div>
                </button>

                {/* Demo Accounts */}
                <div className="border-t border-gray-800 pt-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-lg shadow-amber-500/50" />
                        <p className="text-sm font-semibold text-gray-300">Comptes de démonstration (cliquer pour remplir)</p>
                    </div>
                    
                    <div className="grid gap-3">
                        {demoAccounts.map((account, index) => (
                            <div 
                                key={index}
                                className={`p-4 rounded-xl border-2 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] cursor-pointer ${account.color} shadow-md hover:shadow-xl`}
                                onClick={() => applyDemoCredentials(account)}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <strong className="text-sm font-bold text-gray-100">{account.type}</strong>
                                    <div className="w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse shadow-md shadow-green-500/50" />
                                </div>
                                <div className="text-xs text-gray-300 space-y-1 font-mono">
                                    <div>📧 {account.email}</div>
                                    <div>🔒 {account.password}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 pt-4">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-gray-400 font-medium">Connexion sécurisée par cryptage avancé</span>
                </div>
            </form>
        </div>
    )
}