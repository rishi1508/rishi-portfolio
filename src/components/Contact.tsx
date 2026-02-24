import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/rishi1508',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/rishimishra1508',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'Email',
    url: 'mailto:rishimishra1508@gmail.com',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-24 px-6" ref={ref}>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-heading">
            <span className="text-accent-cyan">05.</span> What's Next?
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-terminal-bright mb-6">
            Get In Touch
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-terminal-text/80 mb-10 leading-relaxed"
        >
          I'm always interested in hearing about new opportunities, challenging 
          DevOps problems, or just connecting with fellow tech enthusiasts. 
          Whether you have a question or just want to say hi, my inbox is always open!
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <a
            href="mailto:rishimishra1508@gmail.com"
            className="btn-primary text-lg"
          >
            Say Hello
          </a>
        </motion.div>

        {/* Terminal-style contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="terminal-window text-left mb-12"
        >
          <div className="terminal-header">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
            <span className="ml-4 text-terminal-muted text-sm font-mono">
              contact.sh
            </span>
          </div>
          <div className="p-4 font-mono text-sm space-y-2">
            <p>
              <span className="text-accent-green">$</span>{' '}
              <span className="text-terminal-muted">echo</span>{' '}
              <span className="text-accent-cyan">$EMAIL</span>
            </p>
            <p className="text-terminal-text/70 pl-4">
              rishimishra1508@gmail.com
            </p>
            <p className="mt-4">
              <span className="text-accent-green">$</span>{' '}
              <span className="text-terminal-muted">echo</span>{' '}
              <span className="text-accent-cyan">$LOCATION</span>
            </p>
            <p className="text-terminal-text/70 pl-4">India</p>
            <p className="mt-4">
              <span className="text-accent-green">$</span>{' '}
              <span className="text-terminal-muted">echo</span>{' '}
              <span className="text-accent-cyan">$STATUS</span>
            </p>
            <p className="text-accent-green pl-4">Open to opportunities</p>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center gap-6"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank" rel="noopener noreferrer"
              rel="noopener noreferrer me"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-3 rounded-lg bg-terminal-surface border border-terminal-border text-terminal-text hover:text-accent-cyan hover:border-accent-cyan/50 transition-colors"
              aria-label={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-24 text-center"
      >
        <p className="text-terminal-muted text-sm font-mono">
          Designed & Built by Rishi Mishra
        </p>
        <p className="text-terminal-muted/50 text-xs font-mono mt-2">
          Built with Astro, React, Tailwind CSS & Framer Motion
        </p>
        <p className="text-terminal-muted/30 text-xs font-mono mt-1">
          © {new Date().getFullYear()} All rights reserved
        </p>
      </motion.footer>
    </section>
  );
}
