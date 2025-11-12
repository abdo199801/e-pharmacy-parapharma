// src/app/(auth)/register/page.tsx
import RegisterForm from '../../../components/auth/RegisterForm'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="lg:hidden flex justify-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-medical-blue rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">+</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">E-Pharma</span>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Créer un compte
        </h1>
        <p className="text-gray-600">
          Rejoignez notre réseau de pharmacies
        </p>
      </div>

      <RegisterForm />

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Déjà membre ?{' '}
          <Link 
            href="/login" 
            className="font-semibold text-primary-600 hover:text-primary-500 transition-colors"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}