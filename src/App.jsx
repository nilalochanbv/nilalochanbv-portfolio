import React from 'react';
import Navbar from './components/Navbar';
import Scene3D from './components/Scene3D';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

function App() {
  return (
    <>
      {/* 3D Particle stardust & Ambient orbs backdrop */}
      <Scene3D />

      {/* Linear Dashboard grid pattern overlay */}
      <div className="grid-background" />



      {/* Glass navigation header with active indicator */}
      <Navbar />

      {/* Main container with index layout structure */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>

      {/* Bottom Footer Section */}
      <Footer />
    </>
  );
}

export default App;
