import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) return setError('Supabase not configured');
    
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 4.5rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)', padding: '2rem 1rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', backgroundColor: 'var(--bg-primary)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="font-serif heading-3" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Reset Password</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Enter your email to receive a secure reset link.</p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'var(--status-red-bg)', color: 'var(--status-red)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--status-green)' }}>
              <CheckCircle2 size={48} />
            </div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Check your email</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              We've sent a password reset link to <strong>{email}</strong>.
            </p>
            <Link to="/login" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} 
                  placeholder="you@example.com" 
                />
              </div>
            </div>

            <motion.button 
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.875rem', display: 'flex', justifyContent: 'center' }}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send Reset Link'}
            </motion.button>
          </form>
        )}

        {!success && (
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
              <ArrowLeft size={14} /> Back to Login
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
