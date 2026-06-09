import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, GraduationCap, Trophy } from 'lucide-react';

const milestones = [
  {
    year: '2023 - 2027',
    icon: <GraduationCap size={18} />,
    title: 'B.E. Computer Science Engineering',
    subtitle: 'Dr. N.G.P Institute of Technology, Coimbatore',
    description: 'Pursuing Bachelor of Engineering. Actively participating in technical forums and maintaining a CGPA of 8.0/10 up to the 5th semester.'
  },
  {
    year: 'June 2025',
    icon: <Briefcase size={18} />,
    title: 'Generative AI & LLM Intern',
    subtitle: 'Gateway Software Solutions, Coimbatore',
    description: 'Worked on fine-tuning large language models (LLMs) for summarization and chatbot tasks. Built prototypes demonstrating generative AI capability.'
  },
  {
    year: '2025 - Present',
    icon: <Briefcase size={18} />,
    title: 'AI Project Developer',
    subtitle: 'AI Powered Leaf Disease Detection',
    description: 'Developed an image processing system using Python, OpenCV, and TensorFlow to detect crop/leaf diseases. Integrated Gemini AI to recommend smart advisory strategies to farmers.'
  },
  {
    year: '2023',
    icon: <Calendar size={18} />,
    title: 'Web Development Intern',
    subtitle: 'CodSoft',
    description: 'Developed multiple responsive web projects using HTML, CSS, and JavaScript. Managed code repositories and deployed landing pages live using GitHub Pages.'
  }
];

const stats = [
  { value: '8.0', label: 'B.E. CGPA' },
  { value: '5+', label: 'Projects Completed' },
  { value: '2', label: 'Internships Done' },
  { value: '4+', label: 'Certifications' }
];

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
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
      id="about"
      style={{
        position: 'relative',
        width: '100%',
        padding: '100px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        zIndex: 2
      }}
    >
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '64px',
          alignItems: 'start'
        }}
      >
        {/* Left Side: Biography & Stats */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          <motion.div variants={itemVariants}>
            <span style={{ fontSize: '0.85rem', color: 'var(--primary)', letterSpacing: '0.15em', fontWeight: 600, textTransform: 'uppercase' }}>
              // THE STORY
            </span>
            <h2 
              style={{ 
                fontSize: 'clamp(2rem, 4vw, 3rem)', 
                fontWeight: 800, 
                marginTop: '12px',
                lineHeight: 1.15
              }}
            >
              Crafting premium products with <span className="text-gradient-purple">pixel perfection</span>.
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontSize: '1.05rem', color: 'var(--subtext)' }}>
              I am Nilalochan B V, an aspiring Full Stack Developer with strong foundations in software engineering, web development, and problem-solving. I am passionate about developing scalable solutions, fine-tuning machine learning pipelines, and continuously improving my technical expertise.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--subtext)' }}>
              My technical toolkit spans Java, Python, and C, along with web frontend technologies like HTML, CSS, JavaScript, and React.js. I have hands-on database experience with SQL and SQLite, and I actively build real-world applications in generative AI, machine learning, and MERN ecosystems.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            variants={itemVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              marginTop: '12px'
            }}
          >
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="glass-panel"
                style={{
                  padding: '24px',
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div 
                  style={{
                    fontSize: '2.2rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-heading)',
                    color: '#ffffff',
                    background: idx % 2 === 0 
                      ? 'linear-gradient(135deg, #ffffff 40%, var(--primary) 100%)'
                      : 'linear-gradient(135deg, #ffffff 40%, var(--secondary) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--subtext)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: Visual Scrolling Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative' }}
        >
          {/* Vertical central timeline line */}
          <div 
            style={{
              position: 'absolute',
              left: '23px',
              top: '8px',
              bottom: '8px',
              width: '1px',
              background: 'linear-gradient(to bottom, var(--primary), var(--secondary), transparent)',
              opacity: 0.15
            }}
          />

          {milestones.map((milestone, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '24px',
                position: 'relative'
              }}
            >
              {/* Icon / Marker */}
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: idx % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                  zIndex: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  flexShrink: 0
                }}
              >
                {milestone.icon}
              </div>

              {/* Card Content */}
              <div 
                className="glass-panel"
                style={{
                  flexGrow: 1,
                  padding: '24px',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {milestone.year}
                </span>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginTop: '6px', fontWeight: 600 }}>
                  {milestone.title}
                </h3>
                <h4 style={{ fontSize: '0.9rem', color: 'var(--subtext)', marginTop: '2px', fontWeight: 500 }}>
                  {milestone.subtitle}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--subtext)', marginTop: '12px', lineHeight: 1.5 }}>
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
