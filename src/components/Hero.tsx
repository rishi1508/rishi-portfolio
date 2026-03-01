import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Icons } from './icons';

const roles = [
  'DevOps Engineer',
  'Platform Engineer',
  'SRE',
  'Automation Enthusiast',
  'Infrastructure Builder',
];

function TypewriterText({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const text = texts[currentIndex];
    
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pauseTimeout);
    }

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < text.length) {
          setCurrentText(text.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(text.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentIndex, texts]);

  return (
    <span className="text-accent-cyan" role="status" aria-label={texts[currentIndex]}>
      <span aria-hidden="true">{currentText}</span>
      <span className="animate-blink" aria-hidden="true">|</span>
      <span className="sr-only">{texts[currentIndex]}</span>
    </span>
  );
}

function FloatingIcon({ icon: IconComponent, delay, x, y }: { icon: React.FC; delay: number; x: string; y: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.2, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="absolute text-accent-cyan/60"
      style={{ left: x, top: y }}
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay }}
        className="w-10 h-10 md:w-12 md:h-12"
      >
        <IconComponent />
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>

      {/* Floating tech icons */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <FloatingIcon icon={Icons.Docker} delay={0} x="10%" y="20%" />
        <FloatingIcon icon={Icons.Cloud} delay={0.2} x="85%" y="25%" />
        <FloatingIcon icon={Icons.Lightning} delay={0.4} x="15%" y="70%" />
        <FloatingIcon icon={Icons.Wrench} delay={0.6} x="80%" y="65%" />
        <FloatingIcon icon={Icons.Package} delay={0.8} x="5%" y="45%" />
        <FloatingIcon icon={Icons.Rocket} delay={1} x="90%" y="45%" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center pb-16 sm:pb-20">
        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-8"
        >
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-4 text-terminal-muted text-sm font-mono">
                rishi@devops:~
              </span>
            </div>
            <div className="px-4 py-3 font-mono text-sm">
              <span className="text-accent-green">$</span>
              <span className="text-terminal-text ml-2">whoami</span>
            </div>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-terminal-bright mb-4"
        >
          Rishi Mishra
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl lg:text-4xl font-mono mb-6 h-12"
        >
          <TypewriterText texts={roles} />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-terminal-text/80 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I build and automate cloud infrastructure at scale. Currently engineering
          DevOps solutions at{' '}
          <span className="text-accent-cyan font-semibold">Wonderlend Hubs</span>,
          reducing deployment times from hours to minutes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={handleScrollToProjects}
            className="btn-primary group"
          >
            <span>View My Work</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
          <button
            onClick={handleScrollToContact}
            className="btn-outline"
          >
            Get In Touch
          </button>
        </motion.div>

      </div>

      {/* Scroll indicator - positioned relative to section, not content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
        role="presentation"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-terminal-muted rounded-full flex justify-center motion-reduce:animate-none"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-accent-cyan rounded-full mt-2 motion-reduce:animate-none"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
