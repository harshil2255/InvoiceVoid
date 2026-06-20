import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function UpdatePassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a session. The reset link logs the user in via URL fragment.
    supabase?.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // If they somehow got here without a session (e.g. didn't click the link), redirect them.
        navigate('/login');
      }
    });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) return setError('Supabase not configured');
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.updateUser({ password: password });

      if (error) throw error;

      setSuccess(true);
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
    } catch (err) {
      setError(err.message || 'Failed to update password');
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
          <h1 className="font-serif heading-3" style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Update Password</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Enter your new password below.</p>
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
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Password Updated!</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Your password has been successfully reset.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Redirecting to your dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>New Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Confirm New Password</label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} 
                  placeholder="••••••••" 
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
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Update Password'}
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
