import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const technologies = [
    'Python',
    'Bash/Shell',
    'Terraform',
    'Docker',
    'Kubernetes',
    'AWS',
    'GitLab CI/CD',
    'Linux',
    'Ansible',
    'PostgreSQL',
  ];

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-heading">
            <span className="text-accent-cyan">01.</span> About Me
          </p>
          <h2 className="section-title">Who I Am</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 space-y-4 text-terminal-text/80 text-lg leading-relaxed"
          >
            <p>
              Hello! I'm Rishi, a DevOps Engineer passionate about building robust, 
              scalable infrastructure and automating everything that can be automated. 
              My journey in tech started with a curiosity about how large-scale systems 
              work behind the scenes, which naturally led me to the world of cloud 
              computing and infrastructure automation.
            </p>
            <p>
              Currently, I'm working at{' '}
              <a href="#" className="link">
                Wonderlend Hubs
              </a>
              , where I focus on designing and implementing CI/CD pipelines, managing 
              cloud infrastructure on AWS, and building automation tools that help 
              development teams ship faster and more reliably.
            </p>
            <p>
              What excites me most is the challenge of reducing complex, manual 
              processes to elegant, automated workflows. I believe in the power of 
              Infrastructure as Code, and I'm constantly exploring new tools and 
              methodologies to improve system reliability and developer experience.
            </p>

            {/* Tech list */}
            <div className="pt-4">
              <p className="text-terminal-bright font-semibold mb-3">
                Technologies I work with:
              </p>
              <ul className="grid grid-cols-2 gap-2">
                {technologies.map((tech, index) => (
                  <motion.li
                    key={tech}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    className="flex items-center gap-2 font-mono text-sm"
                  >
                    <span className="text-accent-cyan">▹</span>
                    {tech}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Profile image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group"
          >
            <div className="relative z-10">
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 p-1">
                <div className="bg-terminal-surface rounded-lg overflow-hidden aspect-square">
                  <img 
                    src="/rishi-portfolio/rishi-photo.jpg" 
                    alt="Rishi Mishra" 
                    className="w-full h-full object-cover object-top filter grayscale-[20%] hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
            {/* Decorative border */}
            <div className="absolute inset-0 border-2 border-accent-cyan rounded-xl translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
