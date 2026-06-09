import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare, User, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Github, Linkedin } from '../components/SocialIcons';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address.';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    // POST form data to Express server running locally
    fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to save message');
        return res.json();
      })
      .then((data) => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });

        // Trigger premium celebration confetti burst!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00d2ff', '#bf5af2', '#ffffff']
        });

        // Reset success status after a delay
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch((err) => {
        console.error('Error saving message:', err);
        setStatus('error');
        // Reset status after a delay
        setTimeout(() => setStatus('idle'), 5000);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        width: '100%',
        padding: '100px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
        zIndex: 2
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase' }}>
          // CONNECT
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: '12px' }}>
          Get In <span className="text-gradient-primary">Touch</span>.
        </h2>
        <p style={{ maxWidth: '600px', margin: '12px auto 0', color: 'var(--subtext)' }}>
          Whether you want to discuss a project, query my stack, or just connect, send a message.
        </p>
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '50px',
          alignItems: 'start'
        }}
      >
        {/* Left Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff' }}>
            Let's discuss something <span className="text-gradient-purple">extraordinary</span>.
          </h3>
          <p style={{ color: 'var(--subtext)', lineHeight: 1.6, fontSize: '0.95rem' }}>
            I am always seeking to collaborate with forward-thinking designers, startups, and clients. Tell me about your ideas, and let's craft a premium web application together.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '12px' }}>
            {/* Email */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)'
                }}
              >
                <Mail size={18} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--subtext)', textTransform: 'uppercase' }}>Email</span>
                <a href="mailto:nilalochanbv@gmail.com" style={{ fontSize: '0.95rem', color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                  nilalochanbv@gmail.com
                </a>
              </div>
            </div>



            {/* Location */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--secondary)'
                }}
              >
                <MapPin size={18} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--subtext)', textTransform: 'uppercase' }}>Location</span>
                <span style={{ fontSize: '0.95rem', color: '#ffffff' }}>Coimbatore, TamilNadu</span>
              </div>
            </div>

            {/* GitHub */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)'
                }}
              >
                <Github size={18} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--subtext)', textTransform: 'uppercase' }}>GitHub</span>
                <a href="https://github.com/nilalochanbv" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.95rem', color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                  github.com/nilalochanbv
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div 
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--secondary)'
                }}
              >
                <Linkedin size={18} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--subtext)', textTransform: 'uppercase' }}>LinkedIn</span>
                <a href="https://www.linkedin.com/in/nilalochan-b-v-20b000288" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.95rem', color: '#ffffff', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.target.style.color = 'var(--secondary)'} onMouseLeave={(e) => e.target.style.color = '#ffffff'}>
                  linkedin.com/in/nilalochan-b-v-20b000288
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="glass-panel" style={{ padding: '40px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            {/* Name Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', position: 'relative' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <User size={14} /> Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nilalochan"
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: errors.name ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => {
                  if (!errors.name) {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 15px rgba(0, 210, 255, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.name) {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {errors.name && (
                <span style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '2px' }}>{errors.name}</span>
              )}
            </div>

            {/* Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <Mail size={14} /> Email Address
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nila@example.com"
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: errors.email ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 15px rgba(0, 210, 255, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {errors.email && (
                <span style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '2px' }}>{errors.email}</span>
              )}
            </div>

            {/* Message Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', display: 'flex', gap: '6px', alignItems: 'center' }}>
                <MessageSquare size={14} /> Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Let's build something world class..."
                rows="5"
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: errors.message ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                }}
                onFocus={(e) => {
                  if (!errors.message) {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 15px rgba(0, 210, 255, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!errors.message) {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              />
              {errors.message && (
                <span style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '2px' }}>{errors.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '14px 0',
                marginTop: '8px',
                cursor: status === 'sending' ? 'not-allowed' : 'pointer'
              }}
            >
              {status === 'sending' ? (
                'Sending Message...'
              ) : status === 'success' ? (
                'Message Sent Success!'
              ) : status === 'error' ? (
                'Database Offline! Try Again.'
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
