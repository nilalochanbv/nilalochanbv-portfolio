import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Cpu, HeartHandshake } from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <Cpu size={20} />,
    color: 'var(--primary)',
    skills: [
      { name: 'Python', level: 85 },
      { name: 'Java', level: 75 },
      { name: 'JavaScript', level: 80 },
      { name: 'C Programming (Basics)', level: 65 }
    ]
  },
  {
    title: 'Web Development',
    icon: <Layout size={20} />,
    color: 'var(--secondary)',
    skills: [
      { name: 'React.js', level: 80 },
      { name: 'MERN Stack', level: 75 },
      { name: 'HTML5 / CSS3', level: 85 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'Responsive Web Design', level: 85 }
    ]
  },
  {
    title: 'Database Systems',
    icon: <Server size={20} />,
    color: '#10b981', // Emerald Green
    skills: [
      { name: 'SQL / MySQL', level: 80 },
      { name: 'SQLite', level: 85 },
      { name: 'MongoDB', level: 75 }
    ]
  },
  {
    title: 'Gen AI & Machine Learning',
    icon: <HeartHandshake size={20} />,
    color: '#f59e0b', // Amber Accent
    skills: [
      { name: 'Generative AI & LLMs', level: 75 },
      { name: 'OpenCV & TensorFlow', level: 70 },
      { name: 'Internet of Things (IoT)', level: 80 },
      { name: 'Prompt Engineering & Prototyping', level: 80 }
    ]
  }
];

function CircularProgress({ value, color }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '60px', height: '60px' }}>
      <svg style={{ width: '60px', height: '60px', transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.04)"
          strokeWidth="3.5"
        />
        {/* Animated Progress Circle */}
        <motion.circle
          cx="30"
          cy="30"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth="3.5"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: strokeDashoffset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
          strokeLinecap="round"
        />
      </svg>
      {/* Centered Percentage Text */}
      <span 
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8rem',
          fontWeight: 600,
          color: '#ffffff'
        }}
      >
        {value}%
      </span>
    </div>
  );
}

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
  };

  return (
    <section
      id="skills"
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
          // EXPERTISE
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginTop: '12px' }}>
          My Technical <span className="text-gradient-purple">Toolkit</span>.
        </h2>
        <p style={{ maxWidth: '600px', margin: '12px auto 0', color: 'var(--subtext)' }}>
          A curated selection of languages, frameworks, and workflows that I utilize daily to engineer premium applications.
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
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="glass-panel"
            style={{
              padding: '32px 24px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{ 
              borderColor: category.color + '40',
              boxShadow: `0 0 30px ${category.color}08`,
              y: -4
            }}
          >
            {/* Category Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div 
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: category.color
                }}
              >
                {category.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                {category.title}
              </h3>
            </div>

            {/* Skills List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {category.skills.map((skill, sIdx) => (
                <div 
                  key={sIdx} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.02)'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>
                      {skill.name}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--subtext)' }}>
                      {skill.level >= 90 ? 'Expert' : skill.level >= 80 ? 'Proficient' : 'Advanced'}
                    </span>
                  </div>
                  <CircularProgress value={skill.level} color={category.color} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
