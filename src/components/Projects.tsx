import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { Icons } from './icons';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  highlights: string[];
  icon: ReactNode;
  gradient: string;
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: 'DocuMind',
    description: 'AI-Powered Document Management System',
    longDescription:
      'An intelligent document management system built on AWS that leverages AI to automatically categorize, search, and manage documents. Features include OCR processing, smart tagging, and natural language search capabilities.',
    technologies: ['AWS', 'Python', 'Lambda', 'S3', 'Textract', 'OpenSearch', 'Terraform'],
    highlights: [
      'Processes 10,000+ documents daily',
      'AI-powered categorization with 95% accuracy',
      'Serverless architecture for cost efficiency',
      'Full-text search across all document types',
    ],
    icon: <Icons.Brain />,
    gradient: 'from-accent-cyan to-accent-blue',
  },
  {
    title: 'Land Registry',
    description: 'Blockchain-Based Property Registration',
    longDescription:
      'A decentralized land registry system that uses blockchain technology to ensure transparent, tamper-proof property records. Eliminates fraud and provides instant verification of property ownership.',
    technologies: ['Blockchain', 'Solidity', 'Python', 'Docker', 'PostgreSQL', 'React'],
    highlights: [
      'Immutable record keeping',
      'Smart contract-based transfers',
      'Reduced processing time by 80%',
      'Complete audit trail',
    ],
    icon: <Icons.Building />,
    gradient: 'from-accent-purple to-accent-cyan',
  },
  {
    title: 'OCTS',
    description: 'One Click Tenant Setup',
    longDescription:
      'An automation platform that provisions complete tenant environments with a single click. Handles infrastructure setup, database configuration, application deployment, and DNS management automatically.',
    technologies: ['Terraform', 'Ansible', 'GitLab CI', 'AWS', 'Python', 'Bash'],
    highlights: [
      '99% reduction in setup time',
      'From 4 hours to under 5 minutes',
      'Zero manual intervention required',
      'Consistent, reproducible environments',
    ],
    icon: <Icons.Zap />,
    gradient: 'from-accent-orange to-accent-purple',
  },
];

function ProjectCard({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
      className="group"
    >
      <div className="card h-full flex flex-col overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300">
        {/* Header with gradient */}
        <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
        
        <div className="p-6 flex flex-col flex-1">
          {/* Icon and title */}
          <div className="flex items-start justify-between mb-4">
            <span className="text-accent-cyan w-10 h-10">{project.icon}</span>
            <div className="flex gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-muted hover:text-accent-cyan transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-muted hover:text-accent-cyan transition-colors"
                  aria-label="Live Demo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Title and description */}
          <h3 className="text-xl font-bold text-terminal-bright mb-1 group-hover:text-accent-cyan transition-colors">
            {project.title}
          </h3>
          <p className="text-accent-cyan text-sm font-mono mb-3">{project.description}</p>
          <p className="text-terminal-text/70 text-sm leading-relaxed mb-4">
            {project.longDescription}
          </p>

          {/* Highlights */}
          <div className="mb-6 flex-1">
            <ul className="space-y-1">
              {project.highlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-terminal-text/60">
                  <svg className="w-4 h-4 text-accent-green mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-terminal-border">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-terminal-muted hover:text-accent-cyan transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-24 px-6 bg-terminal-surface/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-heading">
            <span className="text-accent-cyan">04.</span> Projects
          </p>
          <h2 className="section-title">Things I've Built</h2>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* More projects hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-terminal-muted text-sm font-mono">
            More projects on{' '}
            <a
              href="https://github.com/rishi1508"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan hover:underline"
            >
              GitHub →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
