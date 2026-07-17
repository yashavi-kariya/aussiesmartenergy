import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, ShieldAlert, ArrowLeft, Zap } from 'lucide-react';
import api from '../utils/api';

const NAVY = '#1e2d53';
const NAVY_DARK = '#141f3d';
const NAVY_LIGHT = '#253466';
const GREEN = '#39b54a';
const GREEN_DARK = '#2e9a3d';

const AdminLogin = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await api.post('/admin/login', { identifier, password });
      if (response.data && response.data.success) {
        const { token } = response.data.data;
        localStorage.setItem('adminToken', token);
        navigate('/admin/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Invalid credentials or server connection error.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12"
      style={{ background: `linear-gradient(135deg, ${NAVY_DARK} 0%, ${NAVY} 50%, ${NAVY_LIGHT} 100%)` }}
    >
      {/* Decorative radial glow — green accent top right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${GREEN}22 0%, transparent 70%)` }}
      />
      {/* Decorative radial glow — navy deep bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${NAVY_DARK}cc 0%, transparent 70%)` }}
      />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(${NAVY_LIGHT} 1px, transparent 1px), linear-gradient(90deg, ${NAVY_LIGHT} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Back to website link */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </Link>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md z-10"
        style={{
          background: `linear-gradient(145deg, ${NAVY_LIGHT}cc, ${NAVY}ee)`,
          border: `1px solid rgba(255,255,255,0.12)`,
          borderRadius: '20px',
          boxShadow: `0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)`,
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Card top green accent bar */}
        <div
          className="h-1 w-full rounded-t-[20px]"
          style={{ background: `linear-gradient(90deg, ${GREEN}, ${GREEN_DARK})` }}
        />

        <div className="p-8">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{
                background: `linear-gradient(135deg, ${GREEN}20, ${GREEN}10)`,
                border: `2px solid ${GREEN}40`,
              }}
            >
              <Zap className="w-7 h-7" style={{ color: GREEN }} />
            </motion.div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              Aussie Smart Energy
            </h1>
            <p className="text-white/70 text-sm mt-1 font-medium tracking-wide uppercase">
              Admin Portal
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-3.5 rounded-xl flex items-start gap-3 text-sm"
              style={{
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.25)',
                color: '#fca5a5',
              }}
            >
              <ShieldAlert className="w-5 h-5 shrink-0 text-red-400" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username / Email */}
            <div>
              <label className="block text-white text-xs font-bold uppercase tracking-widest mb-2">
                Username or Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" style={{ color: `${GREEN}80` }}>
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full py-3 pl-11 pr-4 text-white text-sm rounded-xl outline-none transition-all duration-200 placeholder-white/50"
                  style={{
                    background: `rgba(255,255,255,0.10)`,
                    border: `1px solid rgba(255,255,255,0.2)`,
                  }}
                  onFocus={e => e.target.style.border = `1px solid ${GREEN}60`}
                  onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                  placeholder="admin or admin@aussiesmartenergy.com.au"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white text-xs font-bold uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none" style={{ color: `${GREEN}80` }}>
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 pl-11 pr-12 text-white text-sm rounded-xl outline-none transition-all duration-200 placeholder-white/50"
                  style={{
                    background: `rgba(255,255,255,0.10)`,
                    border: `1px solid rgba(255,255,255,0.2)`,
                  }}
                  onFocus={e => e.target.style.border = `1px solid ${GREEN}60`}
                  onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
                  placeholder="••••••••"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 relative overflow-hidden mt-2"
              style={{
                background: loading
                  ? `${GREEN}80`
                  : `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})`,
                boxShadow: loading ? 'none' : `0 4px 24px ${GREEN}40`,
              }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Default credentials hint */}
          <p className="text-center text-white/60 text-xs mt-6">
            Default: <span className="font-mono text-white/80">admin</span> / <span className="font-mono text-white/80">Admin123!</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
