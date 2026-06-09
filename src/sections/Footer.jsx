import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { Github, Linkedin } from '../components/SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      style={{
        position: 'relative',
        width: '100%',
        padding: '60px 24px 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: '#050816',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        {/* Top Split */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px'
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: 'left' }}>
            <span 
              style={{ 
                fontSize: '1.4rem', 
                fontWeight: 800, 
                fontFamily: 'var(--font-heading)',
                color: '#ffffff'
              }}
            >
              <span style={{ color: 'var(--primary)' }}>N</span>
              <span>ila.</span>
            </span>
            <p style={{ fontSize: '0.85rem', color: 'var(--subtext)', marginTop: '8px' }}>
              Building modern digital experiences.
            </p>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {[
              { icon: <Github size={18} />, url: 'https://github.com/nilalochanbv' },
              { icon: <Linkedin size={18} />, url: 'https://www.linkedin.com/in/nilalochan-b-v-20b000288' },
              { icon: <Mail size={18} />, url: 'mailto:nilalochanbv@gmail.com' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  color: 'var(--subtext)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.backgroundColor = 'rgba(0, 210, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--subtext)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Split */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.03)',
            paddingTop: '30px'
          }}
        >
          <span style={{ fontSize: '0.85rem', color: 'var(--subtext)' }}>
            &copy; {new Date().getFullYear()} Nilalochan B V. All rights reserved.
          </span>

          <button
            onClick={scrollToTop}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--subtext)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              fontWeight: 500,
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--subtext)'}
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
