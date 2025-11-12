'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
    Eye, EyeOff, Mail, Lock, User, 
    Building, Phone, CheckCircle, XCircle
} from 'lucide-react'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authService } from './services/authService';

// Define the primary professional color palette for consistency
const PRIMARY_COLOR = 'from-teal-500 to-green-600';

// ========================================================================
// 1. Zod Validation Schema
// ========================================================================
const registrationSchema = z.object({
    userType: z.enum(['pharmacist', 'client']),
    firstName: z.string().min(2, 'Le prénom est obligatoire (min 2 caractères).'),
    lastName: z.string().min(2, 'Le nom est obligatoire (min 2 caractères).'),
    email: z.string().min(1, "L'email est obligatoire.").email("Format d'email invalide."),
    phone: z.string().min(10, 'Numéro de téléphone invalide.').max(15).regex(/^[0-9\s\+\(\)]+$/, 'Numéro de téléphone invalide.'),
    password: z.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères.')
        .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
        .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
        .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
    confirmPassword: z.string().min(1, 'Veuillez confirmer votre mot de passe.'),
    terms: z.boolean().refine(val => val === true, {
        message: "Vous devez accepter les conditions d'utilisation.",
    }),
}).superRefine((data, ctx) => {
    // Cross-field validation (Password Match)
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['confirmPassword'],
            message: 'Les mots de passe ne correspondent pas.',
        });
    }
});

type RegisterFormInputs = z.infer<typeof registrationSchema>;
// ========================================================================

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // ========================================================================
    // 2. React Hook Form Initialization
    // ========================================================================
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            userType: 'pharmacist',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            terms: false,
        },
        mode: "onTouched"
    });

    const userType = watch('userType');
    const password = watch('password');
    // ========================================================================

    // ========================================================================
    // 3. UPDATED Submission Handler - Connects to Backend
    // ========================================================================
    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        try {
            setSubmitError('');
            setSubmitSuccess(false);
            setIsLoading(true);
            
            console.log('📝 Register data:', data);

            // Map frontend data to backend format
            const registrationData = {
                firstname: data.firstName.trim(),
                lastname: data.lastName.trim(),
                email: data.email.toLowerCase().trim(),
                password: data.password,
                phone: data.phone.trim(),
                // Map userType to role
                role: data.userType === 'pharmacist' ? 'ADMINISTRATORCLIENT' : 'NORMALCLIENT'
            };

            console.log('🚀 Sending to backend:', registrationData);

            // Call real backend API
            const response = await authService.register(registrationData);

            console.log('✅ Registration successful:', response);
            
            setSubmitSuccess(true);
            setIsLoading(false);
            
            // Show success message
            setTimeout(() => {
                // Redirect based on user role
                if (response.client.role === 'ADMINISTRATORCLIENT') {
                    router.push('/dashboard');
                } else {
                    router.push('/');
                }
            }, 2000);
            
        } catch (error: any) {
            console.error('❌ Registration failed:', error);
            setIsLoading(false);
            
            // Enhanced error handling
            let errorMessage = 'Échec de la création du compte. Veuillez réessayer.';
            
            if (error instanceof Error) {
                errorMessage = error.message;
                
                // User-friendly error messages
                if (errorMessage.includes('already exists') || errorMessage.includes('déjà utilisé')) {
                    errorMessage = 'Cette adresse email est déjà utilisée.';
                } else if (errorMessage.includes('Network') || errorMessage.includes('internet')) {
                    errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.';
                } else if (errorMessage.includes('Invalid email')) {
                    errorMessage = 'Format d\'email invalide.';
                }
            }
            
            setSubmitError(errorMessage);
        }
    };
    // ========================================================================

    // Helper function to define input class based on error state
    const getInputClass = (fieldName: keyof RegisterFormInputs) => `
        w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-gray-900 focus:ring-2 transition-all duration-200 placeholder-gray-400 shadow-sm hover:shadow-md
        ${errors[fieldName] 
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 focus:ring-teal-500 focus:border-teal-500'
        }
    `.trim();

    const getIconClass = (fieldName: keyof RegisterFormInputs) => `
        absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200
        ${errors[fieldName] 
            ? 'text-red-500' 
            : 'text-gray-400 group-focus-within:text-teal-500'
        }
    `.trim();

    // Password strength indicator
    const getPasswordStrength = () => {
        if (!password) return { strength: 0, text: '', color: '' };
        
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        const strengths = [
            { text: 'Très faible', color: 'bg-red-500' },
            { text: 'Faible', color: 'bg-orange-500' },
            { text: 'Moyen', color: 'bg-yellow-500' },
            { text: 'Fort', color: 'bg-green-500' },
            { text: 'Très fort', color: 'bg-teal-500' }
        ];

        return { ...strengths[strength - 1] || strengths[0], strength };
    };

    const passwordStrength = getPasswordStrength();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            
            {/* Success Message */}
            {submitSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3 animate-in fade-in duration-300">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <div>
                        <h3 className="text-green-800 font-semibold">Compte créé avec succès!</h3>
                        <p className="text-green-600 text-sm">Redirection en cours...</p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 animate-in fade-in duration-300">
                    <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                    <div>
                        <h3 className="text-red-800 font-semibold">Erreur</h3>
                        <p className="text-red-600 text-sm">{submitError}</p>
                    </div>
                </div>
            )}

            {/* User Type Selection */}
            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 shadow-inner">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Type de compte *
                </label>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { 
                            value: 'pharmacist', 
                            label: 'Pharmacien', 
                            icon: Building, 
                            description: 'Espace professionnel',
                            color: 'text-teal-600',
                            bgColor: 'bg-teal-50'
                        },
                        { 
                            value: 'client', 
                            label: 'Client', 
                            icon: User, 
                            description: 'Achat en ligne',
                            color: 'text-green-600',
                            bgColor: 'bg-green-50'
                        }
                    ].map((type) => {
                        const isSelected = userType === type.value;
                        const Icon = type.icon;
                        
                        return (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => setValue('userType', type.value as 'pharmacist' | 'client', { shouldValidate: true })}
                                className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 border-2 ${
                                    isSelected
                                        ? `border-teal-500 bg-white shadow-md ${type.color}`
                                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                }`}
                            >
                                <div className={`p-2 rounded-lg mb-2 ${isSelected ? type.bgColor : 'bg-gray-100'}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span className={`font-semibold text-sm ${isSelected ? '' : 'text-gray-600'}`}>
                                    {type.label}
                                </span>
                                <span className="text-xs text-gray-400 mt-1">
                                    {type.description}
                                </span>
                            </button>
                        );
                    })}
                </div>
                {errors.userType && (
                    <p className="mt-2 text-sm text-red-500">{errors.userType.message}</p>
                )}
            </div>

            {/* --- Personal Information --- */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                    Vos coordonnées
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Prénom */}
                    <div className="group">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                            Prénom *
                        </label>
                        <div className="relative">
                            <User className={getIconClass('firstName')} />
                            <input
                                id="firstName"
                                type="text"
                                placeholder="Votre prénom"
                                {...register('firstName')}
                                className={getInputClass('firstName')}
                            />
                        </div>
                        {errors.firstName && (
                            <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
                                <XCircle className="h-4 w-4" />
                                <span>{errors.firstName.message}</span>
                            </p>
                        )}
                    </div>

                    {/* Nom */}
                    <div className="group">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                            Nom *
                        </label>
                        <div className="relative">
                            <User className={getIconClass('lastName')} /> 
                            <input
                                id="lastName"
                                type="text"
                                placeholder="Votre nom"
                                {...register('lastName')}
                                className={getInputClass('lastName')}
                            />
                        </div>
                        {errors.lastName && (
                            <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
                                <XCircle className="h-4 w-4" />
                                <span>{errors.lastName.message}</span>
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Email */}
                    <div className="group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                        </label>
                        <div className="relative">
                            <Mail className={getIconClass('email')} />
                            <input
                                id="email"
                                type="email"
                                placeholder="votre@email.ma"
                                {...register('email')}
                                className={getInputClass('email')}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
                                <XCircle className="h-4 w-4" />
                                <span>{errors.email.message}</span>
                            </p>
                        )}
                    </div>

                    {/* Téléphone */}
                    <div className="group">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Téléphone *
                        </label>
                        <div className="relative">
                            <Phone className={getIconClass('phone')} />
                            <input
                                id="phone"
                                type="tel"
                                placeholder="06 XX XX XX XX"
                                {...register('phone')}
                                className={getInputClass('phone')}
                            />
                        </div>
                        {errors.phone && (
                            <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
                                <XCircle className="h-4 w-4" />
                                <span>{errors.phone.message}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* --- Password Fields --- */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                    Sécurité
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Mot de passe */}
                    <div className="group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Mot de passe *
                        </label>
                        <div className="relative">
                            <Lock className={getIconClass('password')} />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...register('password')}
                                className={getInputClass('password').replace('pr-4', 'pr-12')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-teal-600 transition-colors duration-200 rounded-lg"
                                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        
                        {/* Password Strength Indicator */}
                        {password && (
                            <div className="mt-2">
                                <div className="flex items-center space-x-2 mb-1">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                            style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs text-gray-500">{passwordStrength.text}</span>
                                </div>
                            </div>
                        )}
                        
                        {errors.password && (
                            <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
                                <XCircle className="h-4 w-4" />
                                <span>{errors.password.message}</span>
                            </p>
                        )}
                    </div>

                    {/* Confirmer */}
                    <div className="group">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Confirmer le mot de passe *
                        </label>
                        <div className="relative">
                            <Lock className={getIconClass('confirmPassword')} />
                            <input
                                id="confirmPassword"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...register('confirmPassword')}
                                className={getInputClass('confirmPassword')} 
                            />
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
                                <XCircle className="h-4 w-4" />
                                <span>{errors.confirmPassword.message}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Terms Agreement */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <label className="flex items-start space-x-3 group cursor-pointer">
                    <input
                        id="terms"
                        type="checkbox"
                        className="sr-only peer"
                        {...register('terms')}
                    />
                    {/* Custom Checkbox */}
                    <div className={`w-5 h-5 border-2 rounded mt-1 flex items-center justify-center flex-shrink-0 transition-all duration-200 shadow-sm ${
                        errors.terms 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-300 group-hover:border-teal-500 peer-checked:bg-gradient-to-r peer-checked:from-teal-500 peer-checked:to-green-600 peer-checked:border-teal-500'
                    }`}>
                        <svg className="w-3 h-3 text-white scale-0 transition-transform duration-200 peer-checked:scale-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    
                    <span className={`text-sm leading-relaxed ${errors.terms ? 'text-red-600' : 'text-gray-600'}`}>
                        J'accepte les{' '}
                        <Link href="/terms" className="text-teal-600 hover:text-teal-700 font-semibold underline transition-colors">
                            conditions d'utilisation
                        </Link>{' '}
                        et la{' '}
                        <Link href="/privacy" className="text-teal-600 hover:text-teal-700 font-semibold underline transition-colors">
                            politique de confidentialité
                        </Link>
                        . Je comprends que mes données seront utilisées conformément à la réglementation en vigueur.
                    </span>
                </label>
                {errors.terms && (
                    <p className="mt-2 text-sm text-red-500 flex items-center space-x-1">
                        <XCircle className="h-4 w-4" />
                        <span>{errors.terms.message}</span>
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={`w-full group relative bg-gradient-to-r ${PRIMARY_COLOR} text-white py-4 px-6 rounded-xl font-bold text-lg shadow-xl transform transition-all duration-300 ${
                    (isSubmitting || isLoading) 
                        ? 'opacity-75 cursor-not-allowed' 
                        : 'hover:scale-[1.02] hover:shadow-2xl active:scale-[0.99]'
                } overflow-hidden`}
            >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="relative flex items-center justify-center space-x-3">
                    {(isSubmitting || isLoading) ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            <span>Création en cours...</span>
                        </>
                    ) : (
                        <>
                            <CheckCircle className="h-5 w-5" />
                            <span>Créer mon compte</span>
                        </>
                    )}
                </div>
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600">
                    Déjà un compte?{' '}
                    <Link 
                        href="/login" 
                        className="text-teal-600 hover:text-teal-700 font-semibold underline transition-colors"
                    >
                        Se connecter
                    </Link>
                </p>
            </div>
        </form>
    );
}