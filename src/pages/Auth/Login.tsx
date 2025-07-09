import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useTranslation } from 'react-i18next';

export const Login = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(t('login_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Språkväxlare */}
          <div className="flex justify-end mb-2">
            <button onClick={() => i18n.changeLanguage('sv')} className="px-2 py-1 rounded border border-gray-300 text-xs hover:bg-gray-100">SV</button>
            <button onClick={() => i18n.changeLanguage('en')} className="px-2 py-1 rounded border border-gray-300 text-xs hover:bg-gray-100 ml-2">EN</button>
          </div>
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/byggapp.png" alt="Byggio Logo" className="h-16 w-auto object-contain" />
          </div>
          {/* Header */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            {t('login_title')}
          </h2>
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('email')}
              </label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors" required />
            </div>
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('password')}
              </label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors" required />
            </div>
            {/* Submit Button */}
            <button type="submit" disabled={loading} className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? t('logging_in') : t('login_button')}
            </button>
          </form>
          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            {t('no_account')}{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary-dark transition-colors">
              {t('register_here')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}; 