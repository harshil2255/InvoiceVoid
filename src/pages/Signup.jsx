import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!supabase) {
      setError('Supabase is not configured. Please add your keys to the .env file.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.name },
          emailRedirectTo: 'https://invoice-void.vercel.app/dashboard'
        }
      });
      
      if (signUpError) throw signUpError;
      
      setSuccess(true);
      // Automatically redirect after brief delay
      setTimeout(() => navigate('/dashboard'), 2000);
      
    } catch (err) {
      setError(err.message || 'An error occurred during sign up.');
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
              <h1 className="font-serif heading-2 mb-2" style={{ color: 'var(--text-primary)' }}>Create Account</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Join thousands of freelancers managing their business effortlessly.</p>
            </div>

            {error && (
              <div style={{ backgroundColor: 'var(--status-red-bg)', color: 'var(--status-red)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                {error}
              </div>
            )}
            
            {success && (
              <div style={{ backgroundColor: 'var(--status-green-bg)', color: 'var(--status-green)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                Account created successfully! Redirecting...
              </div>
            )}

            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>
                    <User size={18} color="var(--text-secondary)" />
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem', outline: 'none' }}
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Password</label>
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
                disabled={loading || success}
                className="btn btn-primary"
                whileHover={{ scale: (loading || success) ? 1 : 1.02 }}
                whileTap={{ scale: (loading || success) ? 1 : 0.98 }}
                style={{ width: '100%', marginTop: '0.5rem', justifyContent: 'center' }}
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Sign Up <ArrowRight size={18} /></>}
              </motion.button>
            </form>

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Log in</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
