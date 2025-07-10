import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { db } from '../../config/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validera lösenord
    if (password !== confirmPassword) {
      setError(t('passwords_do_not_match'));
      return;
    }

    if (password.length < 6) {
      setError(t('password_too_short'));
      return;
    }

    if (!firstName || !lastName) {
      setError(t('name_required'));
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Spara extra info i Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName,
        lastName,
        company,
        email,
        createdAt: new Date()
      });
      navigate('/login', { state: { registered: true } });
    } catch (err) {
      setError(t('register_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="w-full max-w-xs sm:max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
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
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
            {t('register_title')}
          </h2>
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* First Name Field */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                {t('first_name')}
              </label>
              <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-base sm:text-sm" required />
            </div>
            {/* Last Name Field */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                {t('last_name')}
              </label>
              <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-base sm:text-sm" required />
            </div>
            {/* Company Field (optional) */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                {t('company_name')} ({t('optional')})
              </label>
              <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-base sm:text-sm" />
            </div>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t('email')}
              </label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-base sm:text-sm" required />
            </div>
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('password')}
              </label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-base sm:text-sm" required />
            </div>
            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                {t('confirm_password')}
              </label>
              <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors text-base sm:text-sm" required />
            </div>
            {/* Submit Button */}
            <button type="submit" disabled={loading} className="w-full py-3 sm:py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-sm">
              {loading ? t('registering') : t('register_button')}
            </button>
          </form>
          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            {t('already_have_account')}{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
              {t('login_here')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 