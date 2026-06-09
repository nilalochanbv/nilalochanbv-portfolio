import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, X, Sparkles } from 'lucide-react';
import { Github } from '../components/SocialIcons';

const projects = [
  {
    id: 1,
    title: 'AI Leaf Disease Detection & Advisory',
    category: 'Machine Learning',
    tagline: 'Computer Vision system for automated plant disease classification.',
    description: 'Developed a crop health monitoring system using Python, OpenCV, and TensorFlow to detect plant diseases from leaf imagery. Integrated Gemini AI API to act as a smart agricultural advisor, giving farmers active advice on treatment.',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'Gemini AI'],
    gradient: 'linear-gradient(135deg, rgba(0, 210, 255, 0.4) 0%, rgba(5, 8, 22, 0.9) 100%)',
    color: 'var(--primary)',
    liveUrl: 'https://github.com/nilalochanbv',
    gitUrl: 'https://github.com/nilalochanbv'
  },
  {
    id: 2,
    title: 'Generative AI Summarizer & Bot',
    category: 'Generative AI',
    tagline: 'LLM-driven document summarizer and interactive chatbot prototype.',
    description: 'Developed during my Gateway Software Solutions internship. Fine-tuned large language models (LLMs) for specific downstream tasks including document summarization and Q&A, and deployed content generation chatbot prototypes.',
    tags: ['Generative AI', 'LLMs', 'Python', 'Prototyping'],
    gradient: 'linear-gradient(135deg, rgba(191, 90, 242, 0.4) 0%, rgba(5, 8, 22, 0.9) 100%)',
    color: 'var(--secondary)',
    liveUrl: 'https://github.com/nilalochanbv',
    gitUrl: 'https://github.com/nilalochanbv'
  }
];

function ProjectCard({ project, onSelect }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSpotlight({ x, y });

    // Calculate rotation degree limits (-8 to 8 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotY = ((x - centerX) / centerX) * 8;
    const rotX = -((y - centerY) / centerY) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out, border-color 0.3s ease',
        cursor: 'pointer'
      }}
      className="linear-card"
    >
      {/* Spotlight Effect */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.08), transparent 45%)`,
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Card Visual Content Container */}
      <div 
        style={{
          height: '240px',
          background: project.gradient,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border)'
        }}
      >
        {/* Floating Abstract Element representing product wireframes */}
        <div 
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '24px',
            border: '2px dashed rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(15deg)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.4)'
          }}
        >
          <Sparkles size={40} color="#ffffff" style={{ opacity: 0.3 }} />
        </div>

        <span 
          style={{ 
            position: 'absolute', 
            top: '20px', 
            left: '20px',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            color: '#ffffff',
            background: 'rgba(0,0,0,0.3)',
            padding: '4px 10px',
            borderRadius: '9999px',
            border: '1px solid rgba(255,255,255,0.08)',
            letterSpacing: '0.05em'
          }}
        >
          {project.category}
        </span>
      </div>

      {/* Description Area */}
      <div style={{ padding: '28px', textAlign: 'left', transform: 'translateZ(20px)' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff' }}>
          {project.title}
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--subtext)', marginTop: '8px', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.tagline}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx} 
              style={{
                fontSize: '0.75rem', 
                color: 'var(--subtext)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: project.color, 
            fontSize: '0.85rem', 
            fontWeight: 600,
            marginTop: '24px'
          }}
        >
          View Details <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        width: '100%',
        padding: '100px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        zIndex: 2
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase' }}>
          // WORK
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: '12px' }}>
          Featured <span className="text-gradient-primary">Projects</span>.
        </h2>
        <p style={{ maxWidth: '600px', margin: '12px auto 0', color: 'var(--subtext)' }}>
          A selection of projects that demonstrate my full stack expertise and dedication to detail.
        </p>
      </div>

      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}
      >
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onSelect={setSelectedProject} 
          />
        ))}
      </div>

      {/* Expanding Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(5, 8, 22, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                zIndex: 9999
              }}
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: '10%',
                left: '5%',
                right: '5%',
                bottom: '10%',
                maxWidth: '800px',
                margin: '0 auto',
                backgroundColor: 'var(--surface)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                zIndex: 10000,
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#ffffff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <X size={20} />
              </button>

              {/* Cover Gradient Graphic */}
              <div 
                style={{
                  height: '280px',
                  background: selectedProject.gradient,
                  padding: '40px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  position: 'relative'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.05)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {selectedProject.category}
                  </span>
                  <h2 style={{ fontSize: '2.2rem', color: '#ffffff', marginTop: '12px' }}>
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Detail Content */}
              <div style={{ padding: '40px', textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#ffffff' }}>About the project</h3>
                <p style={{ fontSize: '1rem', color: 'var(--subtext)', marginTop: '12px', lineHeight: 1.6 }}>
                  {selectedProject.description}
                </p>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#ffffff', marginTop: '32px' }}>Technologies Used</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                  {selectedProject.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      style={{
                        fontSize: '0.85rem', 
                        color: 'var(--primary)',
                        backgroundColor: 'rgba(0, 210, 255, 0.05)',
                        border: '1px solid rgba(0, 210, 255, 0.1)',
                        padding: '6px 12px',
                        borderRadius: '6px'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer buttons */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '28px' }}>
                  <a 
                    href={selectedProject.liveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    Launch Site <ExternalLink size={16} />
                  </a>
                  <a 
                    href={selectedProject.gitUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    View Code <Github size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
