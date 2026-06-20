import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, CheckCircle2, Loader2, Printer, Edit } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ViewInvoice() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        // Fetch invoice
        const { data: invoiceData, error: invoiceError } = await supabase
          .from('invoices')
          .select('*')
          .eq('id', id)
          .single();

        if (invoiceError) throw invoiceError;
        setInvoice(invoiceData);

        // Fetch items
        const { data: itemsData, error: itemsError } = await supabase
          .from('invoice_items')
          .select('*')
          .eq('invoice_id', id);

        if (itemsError) throw itemsError;
        setItems(itemsData);

      } catch (err) {
        console.error(err);
        setError(`Failed to load invoice details: ${err.message || JSON.stringify(err)}`);
      } finally {
        setLoading(false);
      }
    };

    if (supabase) {
      fetchInvoice();
    } else {
      setError('Supabase is not configured.');
      setLoading(false);
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = async () => {
    if (!invoice?.client_email) {
      setError('Client email is missing.');
      return;
    }

    setSending(true);
    setError('');

    try {
      // 1. Generate the Gmail compose link
      const subject = encodeURIComponent(`Invoice ${invoice.id.split('-')[0].toUpperCase()} from InvoiceVoid`);
      let emailText = `Hi ${invoice.client_name},\n\nYou have a new invoice due on ${new Date(invoice.due_date).toLocaleDateString()}.\n\nTotal Amount: ₹${invoice.total}\n\n`;
      if (invoice.notes) {
        emailText += `Message from us:\n${invoice.notes}\n\n`;
      }
      emailText += `Please find the details of your invoice attached or let me know if you need a PDF copy.\n\nThank you for your business!`;
      const body = encodeURIComponent(emailText);
      
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${invoice.client_email}&su=${subject}&body=${body}`;

      // 2. Open Gmail in a new tab immediately to prevent popup blockers
      window.open(gmailLink, '_blank');

      // 3. Generate and download the PDF automatically
      const element = document.getElementById('invoice-document');
      if (element) {
        const html2pdf = (await import('html2pdf.js')).default;
        const opt = {
          margin:       0.5,
          filename:     `Invoice-${invoice.id.split('-')[0].toUpperCase()}.pdf`,
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        await html2pdf().set(opt).from(element).save();
      }

      // 4. Update status in Supabase
      await supabase
        .from('invoices')
        .update({ status: 'Sent' })
        .eq('id', invoice.id);

      setInvoice({ ...invoice, status: 'Sent' });
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 5000);

    } catch (err) {
      console.error(err);
      setError('Failed to update invoice status.');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: 'calc(100vh - 4.5rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)' }}>
        <Loader2 className="animate-spin" size={40} color="var(--accent-blue)" />
      </div>
    );
  }

  if (error && !invoice) {
    return (
      <div style={{ minHeight: 'calc(100vh - 4.5rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)' }}>
        <div style={{ color: 'var(--status-red)' }}>{error}</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 4.5rem)', backgroundColor: 'var(--bg-secondary)', padding: '2rem 1.5rem' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-6 no-print">
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={20} /> Back to Dashboard
          </button>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => navigate(`/invoices/${id}/edit`)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              <Edit size={16} /> Edit Invoice
            </button>
            <button onClick={handlePrint} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              <Printer size={16} /> Print / Save PDF
            </button>
            <button onClick={handleSendEmail} disabled={sending || !invoice?.client_email} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
              {sending ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />} Send Email
            </button>
          </div>
        </div>

        {error && (
          <div className="no-print" style={{ backgroundColor: 'var(--status-red-bg)', color: 'var(--status-red)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
            {error}
          </div>
        )}

        {sendSuccess && (
          <div className="no-print" style={{ backgroundColor: 'var(--status-green-bg)', color: 'var(--status-green)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={20} /> Invoice sent successfully to {invoice.client_email}!
          </div>
        )}

        {/* Invoice Paper Document */}
        <div id="invoice-document" className="card" style={{ padding: '4rem', backgroundColor: 'white', color: 'black', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1 }}>INVOICE</h1>
              <p style={{ color: '#475569', marginTop: '0.5rem' }}>#{invoice.id.split('-')[0].toUpperCase()}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>InvoiceVoid</h2>
              <p style={{ color: '#475569' }}>Your Freelance Business</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
            <div>
              <p style={{ fontSize: '0.875rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 700 }}>Billed To</p>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>{invoice.client_name}</h3>
              <p style={{ color: '#475569' }}>{invoice.client_email}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'right' }}>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', fontWeight: 700 }}>Date Issued</p>
                <p style={{ color: '#0f172a', fontWeight: 500 }}>{new Date(invoice.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem', fontWeight: 700 }}>Date Due</p>
                <p style={{ color: '#0f172a', fontWeight: 500 }}>{new Date(invoice.due_date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '4rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '1rem 0', color: '#334155', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase' }}>Description</th>
                  <th style={{ padding: '1rem 0', color: '#334155', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '1rem 0', color: '#334155', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', textAlign: 'right' }}>Price</th>
                  <th style={{ padding: '1rem 0', color: '#334155', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '1.5rem 0', color: '#0f172a', fontWeight: 500 }}>{item.description}</td>
                    <td style={{ padding: '1.5rem 0', color: '#475569', textAlign: 'center', fontWeight: 500 }}>{item.quantity}</td>
                    <td style={{ padding: '1.5rem 0', color: '#475569', textAlign: 'right', fontWeight: 500 }}>₹{parseFloat(item.price).toFixed(2)}</td>
                    <td style={{ padding: '1.5rem 0', color: '#0f172a', fontWeight: 600, textAlign: 'right' }}>₹{(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '2rem' }}>
            <div style={{ flex: 1, paddingRight: '2rem' }}>
              {invoice.notes && (
                <div>
                  <h4 style={{ fontSize: '0.875rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 700 }}>Notes</h4>
                  <p style={{ color: '#334155', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{invoice.notes}</p>
                </div>
              )}
            </div>
            
            <div style={{ width: '300px', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '2px solid #cbd5e1', marginBottom: '1rem' }}>
                <span style={{ color: '#334155', fontWeight: 700 }}>Subtotal</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>₹{parseFloat(invoice.total).toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#0f172a', fontWeight: 800, fontSize: '1.25rem' }}>Total Due</span>
                <span style={{ color: 'var(--accent-blue)', fontWeight: 800, fontSize: '1.75rem' }}>₹{parseFloat(invoice.total).toFixed(2)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .card, .card * { visibility: visible; }
          .card { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
}
