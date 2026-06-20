import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft, Loader2, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function CreateInvoice() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
    status: 'Draft',
    notes: '',
  });

  const [items, setItems] = useState([
    { id: 1, description: '', quantity: 1, price: 0 }
  ]);

  useEffect(() => {
    supabase?.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
      } else {
        setUser(session.user);
      }
    });
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!supabase) return setError('Supabase not configured');
    
    setLoading(true);
    setError('');

    try {
      const total = calculateTotal();

      // 1. Insert Invoice
      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .insert([
          { 
            user_id: user.id,
            client_name: formData.clientName,
            client_email: formData.clientEmail,
            date: formData.date,
            due_date: formData.dueDate,
            status: formData.status,
            total: total,
            notes: formData.notes
          }
        ])
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      // 2. Insert Items
      const invoiceItemsToInsert = items.map(item => ({
        invoice_id: invoiceData.id,
        description: item.description,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(invoiceItemsToInsert);

      if (itemsError) throw itemsError;

      // Navigate back to dashboard on success
      navigate('/dashboard');

    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 4.5rem)', backgroundColor: 'var(--bg-secondary)', padding: '2rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="font-serif heading-3" style={{ color: 'var(--text-primary)' }}>Create New Invoice</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Fill out the details below to generate a new invoice.</p>
          </div>
        </div>

        {error && (
          <div style={{ backgroundColor: 'var(--status-red-bg)', color: 'var(--status-red)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-primary)', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Client Details</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Client Name *</label>
                <input type="text" name="clientName" required value={formData.clientName} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} placeholder="Acme Corp" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Client Email</label>
                <input type="email" name="clientEmail" value={formData.clientEmail} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} placeholder="billing@acme.com" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Invoice Date *</label>
                <input type="date" name="date" required value={formData.date} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Due Date *</label>
                <input type="date" name="dueDate" required value={formData.dueDate} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}>
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Notes / Message to Client (Optional)</label>
              <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows="3" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }} placeholder="Thank you for your business!"></textarea>
            </div>
          </div>

          <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-primary)', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Line Items</h3>
            
            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr 40px', gap: '1rem', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, padding: '0 0.5rem' }}>
              <div>Description</div>
              <div>Qty</div>
              <div>Price (₹)</div>
              <div>Amount</div>
              <div></div>
            </div>

            {items.map((item, index) => (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr 1fr 40px', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <input 
                  type="text" 
                  required
                  value={item.description} 
                  onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} 
                  placeholder="Service description" 
                />
                <input 
                  type="number" 
                  min="1"
                  required
                  value={item.quantity} 
                  onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} 
                />
                <input 
                  type="number" 
                  min="0"
                  step="0.01"
                  required
                  value={item.price} 
                  onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }} 
                />
                <div style={{ padding: '0.75rem 1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  ₹{(item.quantity * item.price).toFixed(2)}
                </div>
                <button 
                  type="button"
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  style={{ background: 'none', border: 'none', cursor: items.length === 1 ? 'not-allowed' : 'pointer', color: items.length === 1 ? 'var(--text-secondary)' : 'var(--status-red)', display: 'flex', justifyContent: 'center' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            <button 
              type="button" 
              onClick={addItem}
              className="btn btn-secondary" 
              style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.5rem 1rem' }}
            >
              <Plus size={16} /> Add Item
            </button>
            
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>Total:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent-blue)' }}>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <motion.button 
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              whileHover={{ scale: loading ? 1 : 1.05 }}
              whileTap={{ scale: loading ? 1 : 0.95 }}
              style={{ padding: '0.75rem 2rem' }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Save Invoice</>}
            </motion.button>
          </div>
        </form>

      </div>
    </div>
  );
}
