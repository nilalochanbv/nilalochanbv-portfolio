import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight, Briefcase } from 'lucide-react';

const jobHistory = [
  {
    company: 'Gateway Software Solutions',
    role: 'Generative AI & LLM Intern',
    period: 'June 2025',
    highlights: [
      'Worked on fine-tuning large language models (LLMs) for domain-specific tasks such as summarization, Q&A, and chatbot development.',
      'Built and deployed prototypes demonstrating real-world applications of generative AI, such as content creation, code generation, and image captioning.',
      'Collaborated on prompt engineering structures and LLM api integrations into Python applications.'
    ],
    tech: ['Python', 'Generative AI', 'LLMs', 'Model Tuning', 'Prototyping']
  },
  {
    company: 'CodSoft',
    role: 'Web Development Intern',
    period: 'July 2023 - August 2023',
    highlights: [
      'Developed multiple responsive, visually appealing frontend web projects using HTML, CSS, and JavaScript.',
      'Gained hands-on experience in managing code repositories and deploying live client-side projects using GitHub Pages.',
      'Optimized CSS layout models and page elements to ensure fluid responsiveness across mobile, tablet, and desktop viewports.'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'GitHub Pages']
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        width: '100%',
        padding: '100px 24px',
        maxWidth: '1000px',
        margin: '0 auto',
        zIndex: 2
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--primary)', letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase' }}>
          // CAREER
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: '12px' }}>
          Work <span className="text-gradient-purple">Experience</span>.
        </h2>
        <p style={{ maxWidth: '600px', margin: '12px auto 0', color: 'var(--subtext)' }}>
          A history of roles where I have designed solutions, written systems, and optimized product performance.
        </p>
      </div>

      <div 
        className="glass-panel"
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '40px',
          gap: '40px',
          alignItems: 'flex-start'
        }}
        className="glass-panel experience-container"
      >
        {/* Tab Selection */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flexShrink: 0
          }}
          className="experience-tabs"
        >
          {jobHistory.map((job, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              style={{
                textAlign: 'left',
                padding: '14px 24px',
                borderRadius: '8px',
                background: activeTab === idx ? 'rgba(255,255,255,0.03)' : 'transparent',
                border: 'none',
                borderLeft: activeTab === idx 
                  ? '2px solid var(--primary)' 
                  : '2px solid rgba(255, 255, 255, 0.05)',
                color: activeTab === idx ? '#ffffff' : 'var(--subtext)',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontFamily: 'var(--font-heading)',
                minWidth: '180px'
              }}
            >
              {job.company}
            </button>
          ))}
        </div>

        {/* Tab Detail Panel */}
        <div style={{ flexGrow: 1, textAlign: 'left', minHeight: '300px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#ffffff', fontWeight: 700 }}>
                  {jobHistory[activeTab].role}{' '}
                  <span style={{ color: 'var(--primary)' }}>@ {jobHistory[activeTab].company}</span>
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--subtext)', fontSize: '0.85rem', marginTop: '4px' }}>
                  <Calendar size={14} />
                  <span>{jobHistory[activeTab].period}</span>
                </div>
              </div>

              {/* Highlights */}
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', padding: 0, marginTop: '24px' }}>
                {jobHistory[activeTab].highlights.map((bullet, bIdx) => (
                  <li key={bIdx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '3px' }}>
                      <ChevronRight size={16} />
                    </span>
                    <span style={{ color: 'var(--subtext)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Technologies list */}
              <div style={{ marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: '#ffffff', letterSpacing: '0.05em' }}>
                  Technologies Utilized
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                  {jobHistory[activeTab].tech.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        fontSize: '0.8rem',
                        color: '#ffffff',
                        backgroundColor: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        padding: '6px 12px',
                        borderRadius: '6px'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Responsive adjustments in styling */}
      <style>{`
        @media (max-width: 768px) {
          .experience-container {
            flex-direction: column !important;
            padding: 24px !important;
            gap: 24px !important;
          }
          .experience-tabs {
            flex-direction: row !important;
            width: 100% !important;
            overflow-x: auto !important;
            padding-bottom: 8px !important;
          }
          .experience-tabs button {
            min-width: 130px !important;
            text-align: center !important;
            border-left: none !important;
            border-bottom: 2px solid rgba(255,255,255,0.05) !important;
            padding: 10px 16px !important;
          }
          .experience-tabs button:focus {
            outline: none;
          }
        }
      `}</style>
    </section>
  );
}
