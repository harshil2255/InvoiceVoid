import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setError('Supabase is not configured. Please add your keys to the .env file.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      
      if (signInError) throw signInError;
      
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding" style={{ minHeight: 'calc(100vh - 4.5rem)', display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ width: '100%', maxWidth: '420px' }}
        >
          <div className="card" style={{ padding: '2.5rem', backgroundColor: 'var(--bg-primary)' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h1 className="font-serif heading-2 mb-2" style={{ color: 'var(--text-primary)' }}>Welcome Back</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Log in to access your InvoiceVoid dashboard.</p>
            </div>

            {error && (
              <div style={{ backgroundColor: 'var(--status-red-bg)', color: 'var(--status-red)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                    <Mail size={18} color="var(--text-secondary)" />
                  </div>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Password</label>
                  <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: 'var(--accent-blue)', textDecoration: 'none' }}>Forgot password?</Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                    <Lock size={18} color="var(--text-secondary)" />
                  </div>
                  <input 
                    type="password" 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <motion.button 
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Log In <ArrowRight size={18} /></>}
              </motion.button>
            </form>

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Don't have an account? <Link to="/signup" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Sign up</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
