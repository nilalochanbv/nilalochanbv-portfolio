import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail } from 'lucide-react';
import { Github, Linkedin } from '../components/SocialIcons';

export function MagneticButton({ children, className, onClick, style }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Magnetic pull factor (30% of actual distance)
    setPosition({ x: distanceX * 0.3, y: distanceY * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.1 }}
      style={{ display: 'inline-block', ...style }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    // Convert to relative coordinates (-0.5 to 0.5)
    const relX = (clientX - left) / width - 0.5;
    const relY = (clientY - top) / height - 0.5;
    setMousePos({ x: relX, y: relY });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const handleScrollTo = (id) => {
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
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden',
        zIndex: 2
      }}
    >
      {/* Dynamic Parallax Glow Backgrounds */}
      <motion.div
        className="orb-glow"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'var(--primary)',
          filter: 'blur(120px)',
          opacity: 0.12,
          position: 'absolute',
          top: '25%',
          left: '20%',
          x: mousePos.x * -60,
          y: mousePos.y * -60,
          pointerEvents: 'none'
        }}
      />
      <motion.div
        className="orb-glow"
        style={{
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'var(--secondary)',
          filter: 'blur(120px)',
          opacity: 0.1,
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          x: mousePos.x * 60,
          y: mousePos.y * 60,
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '1000px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '32px',
          zIndex: 3
        }}
      >
        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '8px 16px',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'var(--primary)',
            textTransform: 'uppercase',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 12px rgba(0, 210, 255, 0.05)'
          }}
        >
          ✦ AVAILABLE FOR WORLDWIDE CLIENTS
        </motion.div>

        {/* Hero Copy */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <motion.h3
            variants={textVariants}
            style={{
              fontSize: '1.2rem',
              fontWeight: 500,
              color: 'var(--subtext)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}
          >
            Hi, I am
          </motion.h3>

          <motion.h1
            variants={textVariants}
            style={{
              fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
              lineHeight: 1.05,
              fontWeight: 900,
              fontFamily: 'var(--font-heading)',
              letterSpacing: '-0.03em'
            }}
          >
            <span className="text-gradient-radial">Nilalochan B V</span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--subtext)',
              maxWidth: '640px',
              margin: '16px auto 0',
              lineHeight: 1.6
            }}
          >
            Building modern digital experiences with code, creativity, and innovation. Creating immersive web applications with premium UI details.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '16px'
          }}
        >
          <MagneticButton>
            <button 
              className="btn-primary"
              onClick={() => handleScrollTo('projects')}
            >
              Explore Projects
            </button>
          </MagneticButton>

          <MagneticButton>
            <button 
              className="btn-secondary"
              onClick={() => handleScrollTo('contact')}
            >
              Contact Me
            </button>
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          style={{
            display: 'flex',
            gap: '24px',
            marginTop: '24px'
          }}
        >
          {[
            { icon: <Github size={20} />, url: 'https://github.com/nilalochanbv' },
            { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/nilalochan-b-v-20b000288' },
            { icon: <Mail size={20} />, url: 'mailto:nilalochanbv@gmail.com' }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, color: 'var(--primary)' }}
              style={{
                color: 'var(--subtext)',
                transition: 'color 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Animated Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 3
        }}
        onClick={() => handleScrollTo('about')}
      >
        <span style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--subtext)' }}>
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{
            color: 'var(--primary)'
          }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
