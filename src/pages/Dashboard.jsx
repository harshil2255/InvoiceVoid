import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Plus, FileText, ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessionAndInvoices = async () => {
      if (!supabase) return navigate('/login');
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }
      
      setUser(session.user);

      // Fetch Invoices
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setInvoices(data);
      }
      setLoading(false);
    };

    fetchSessionAndInvoices();
  }, [navigate]);

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      navigate('/');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Paid':
        return <span className="badge badge-green" style={{ backgroundColor: 'var(--status-green-bg)', color: 'var(--status-green)' }}>Paid</span>;
      case 'Sent':
        return <span className="badge" style={{ backgroundColor: 'var(--accent-blue-light)', color: 'var(--accent-blue)' }}>Sent</span>;
      default:
        return <span className="badge" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>Draft</span>;
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 4.5rem)', backgroundColor: 'var(--bg-secondary)', padding: '2rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-serif heading-2" style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user?.user_metadata?.full_name || user?.email || 'User'}!</p>
          </div>
          <button 
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem' }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
          <Link to="/invoices/new" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            <Plus size={18} /> Create New Invoice
          </Link>
        </div>

        {/* Invoices List */}
        <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-primary)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Your Invoices</h3>
          
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <Loader2 className="animate-spin" size={32} color="var(--accent-blue)" />
            </div>
          ) : invoices.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', borderStyle: 'dashed', borderWidth: '2px', borderColor: 'var(--border-color)', borderRadius: '1rem', backgroundColor: 'transparent' }}>
              <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <FileText size={32} color="var(--text-secondary)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No invoices yet</h3>
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1.5rem' }}>Get paid faster by sending a beautiful, professional invoice.</p>
              <Link to="/invoices/new" className="btn btn-primary" style={{ textDecoration: 'none' }}>Create First Invoice</Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                    <th style={{ padding: '1rem', fontWeight: 500, fontSize: '0.875rem' }}>Client</th>
                    <th style={{ padding: '1rem', fontWeight: 500, fontSize: '0.875rem' }}>Date</th>
                    <th style={{ padding: '1rem', fontWeight: 500, fontSize: '0.875rem' }}>Amount</th>
                    <th style={{ padding: '1rem', fontWeight: 500, fontSize: '0.875rem' }}>Status</th>
                    <th style={{ padding: '1rem', fontWeight: 500, fontSize: '0.875rem' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, idx) => (
                    <motion.tr 
                      key={invoice.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      style={{ borderBottom: '1px solid var(--border-color)' }}
                    >
                      <td style={{ padding: '1.25rem 1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {invoice.client_name}
                      </td>
                      <td style={{ padding: '1.25rem 1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1.25rem 1rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                        ₹{parseFloat(invoice.total).toFixed(2)}
                      </td>
                      <td style={{ padding: '1.25rem 1rem' }}>
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                          <button 
                            onClick={() => navigate(`/invoices/${invoice.id}/edit`)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', fontWeight: 500 }}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => navigate(`/invoices/${invoice.id}`)}
                            style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500 }}
                          >
                            View <ArrowRight size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
