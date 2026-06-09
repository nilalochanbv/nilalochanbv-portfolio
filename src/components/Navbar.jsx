import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll height to add background blur/opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy to set active link
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // detects center of viewport
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'py-4 bg-opacity-70 bg-[#050816] backdrop-blur-md border-b border-white/5' 
            : 'py-6 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s ease',
          backgroundColor: scrolled ? 'rgba(5, 8, 22, 0.75)' : 'rgba(5, 8, 22, 0)',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(255, 255, 255, 0)',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div 
          style={{
            width: '100%',
            maxWidth: '1200px',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              textDecoration: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span style={{ color: 'var(--primary)' }}>N</span>
            <span>ila.</span>
          </a>

          {/* Desktop Nav Items */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="desktop-nav">
            <ul style={{ display: 'flex', listStyle: 'none', gap: '24px', margin: 0, padding: 0 }}>
              {navItems.map((item) => (
                <li key={item.id} style={{ position: 'relative' }}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: activeSection === item.id ? '#ffffff' : 'var(--subtext)',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      padding: '8px 4px',
                      transition: 'color 0.2s ease',
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {item.label}
                  </button>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                        borderRadius: 2
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToSection('contact')}
              className="btn-secondary"
              style={{
                padding: '8px 18px',
                fontSize: '0.85rem',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Hire Me <ArrowUpRight size={14} />
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'none'
            }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 70,
              left: 12,
              right: 12,
              backgroundColor: 'rgba(11, 16, 32, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '24px',
              zIndex: 49,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none', gap: '16px', padding: 0, margin: 0 }}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: activeSection === item.id ? 'var(--primary)' : '#ffffff',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      fontFamily: 'var(--font-sans)'
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '12px 0',
                marginTop: '8px'
              }}
            >
              Get In Touch
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS stylesheet addition for showing/hiding mobile nav */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
