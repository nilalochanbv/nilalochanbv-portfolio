import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Landmark, ShieldCheck } from 'lucide-react';

const awardsList = [
  {
    icon: <Award size={24} />,
    title: 'AWS Cloud Course Completion',
    issuer: 'Amazon Web Services',
    description: 'Completed in-depth studies covering AWS Global Infrastructure, computing instances (EC2), scalable storage (S3), relational databases (RDS), IAM user security, and VPC networking.'
  },
  {
    icon: <Trophy size={24} />,
    title: 'NPTEL - Cloud Computing',
    issuer: 'NPTEL (IIT)',
    description: 'Completed certification on virtualization mechanisms, cloud models (SaaS, PaaS, IaaS), database services, resource scheduling, security paradigms, and SLA management.'
  },
  {
    icon: <Award size={24} />,
    title: 'NPTEL - Introduction to IoT',
    issuer: 'NPTEL (IIT)',
    description: 'Certified in Internet of Things architecture, sensor node networks, communication standards, edge computing, microcontrollers, and IoT database connections.'
  },
  {
    icon: <ShieldCheck size={24} />,
    title: 'Gen AI & LLM Prototyping',
    issuer: 'Gateway Software Solutions',
    description: 'Certified during my internship. Validates expertise in model prompting, LLM tuning workflows, API connectivity, and chatbot prototyping.'
  }
];

export default function Achievements() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { type: 'spring', stiffness: 100, damping: 20 } 
    }
  };

  return (
    <section
      id="achievements"
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
          // CREDENTIALS
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: '12px' }}>
          Key <span className="text-gradient-primary">Achievements</span>.
        </h2>
        <p style={{ maxWidth: '600px', margin: '12px auto 0', color: 'var(--subtext)' }}>
          Certifications, hackathon milestones, and contributions that define my professional growth and industry standards.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}
      >
        {awardsList.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="glass-panel"
            style={{
              padding: '32px 24px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{
              y: -4,
              borderColor: idx % 2 === 0 ? 'rgba(0, 210, 255, 0.25)' : 'rgba(191, 90, 242, 0.25)',
              boxShadow: idx % 2 === 0 ? '0 10px 30px rgba(0, 210, 255, 0.05)' : '0 10px 30px rgba(191, 90, 242, 0.05)'
            }}
          >
            {/* Glowing Accent Ring Behind Icon */}
            <div 
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: idx % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'
              }}
            >
              {item.icon}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                {item.title}
              </h3>
              <span style={{ fontSize: '0.8rem', color: idx % 2 === 0 ? 'var(--primary)' : 'var(--secondary)', fontWeight: 600 }}>
                {item.issuer}
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--subtext)', lineHeight: 1.5, marginTop: '8px' }}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
