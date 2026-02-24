import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Job {
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

const jobs: Job[] = [
  {
    title: 'DevOps Engineer',
    company: 'Wonderlend Hubs',
    companyUrl: 'https://wonderlendhubs.com',
    location: 'India',
    period: 'Present',
    description: [
      'Architected and implemented CI/CD pipelines using GitLab CI, reducing deployment time by 99% (from hours to minutes)',
      'Designed and deployed cloud infrastructure on AWS using Terraform, serving 1000+ concurrent users',
      'Built Docker-based microservices architecture with automated container orchestration',
      'Developed One Click Tenant Setup (OCTS) system, automating complete tenant provisioning workflows',
      'Implemented Infrastructure as Code practices, enabling reproducible and version-controlled infrastructure',
      'Created monitoring and alerting systems using CloudWatch, achieving 99.9% uptime SLA',
    ],
    technologies: ['AWS', 'Terraform', 'Docker', 'GitLab CI', 'Python', 'Bash', 'PostgreSQL'],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeJob, setActiveJob] = useState(0);

  return (
    <section id="experience" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-heading">
            <span className="text-accent-cyan">03.</span> Experience
          </p>
          <h2 className="section-title">Where I've Worked</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8"
        >
          {/* Job tabs (for future multiple jobs) */}
          <div className="md:flex gap-8">
            {/* Tab list */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-terminal-border mb-8 md:mb-0">
              {jobs.map((job, index) => (
                <button
                  key={job.company}
                  onClick={() => setActiveJob(index)}
                  className={`px-4 py-3 font-mono text-sm text-left whitespace-nowrap transition-all
                    ${activeJob === index 
                      ? 'text-accent-cyan bg-accent-cyan/10 border-b-2 md:border-b-0 md:border-l-2 border-accent-cyan -mb-px md:mb-0 md:-ml-px' 
                      : 'text-terminal-text/60 hover:text-accent-cyan hover:bg-accent-cyan/5'
                    }`}
                >
                  {job.company}
                </button>
              ))}
            </div>

            {/* Job content */}
            <div className="flex-1 min-h-[400px]">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: activeJob === index ? 1 : 0,
                    x: activeJob === index ? 0 : 20,
                    display: activeJob === index ? 'block' : 'none'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Title and company */}
                  <h3 className="text-xl md:text-2xl font-semibold text-terminal-bright">
                    {job.title}{' '}
                    <span className="text-accent-cyan">
                      @{' '}
                      {job.companyUrl ? (
                        <a
                          href={job.companyUrl}
                          target="_blank" rel="noopener noreferrer"
                          rel="noopener noreferrer"
                          className="hover:underline underline-offset-4"
                        >
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                    </span>
                  </h3>

                  {/* Period and location */}
                  <p className="font-mono text-sm text-terminal-muted mt-2">
                    {job.period} · {job.location}
                  </p>

                  {/* Description list */}
                  <ul className="mt-6 space-y-4">
                    {job.description.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                        className="flex gap-3 text-terminal-text/80"
                      >
                        <span className="text-accent-cyan mt-1.5 flex-shrink-0">▹</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-accent-cyan/10 text-accent-cyan rounded-full text-sm font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline visualization */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 p-6 rounded-xl bg-terminal-surface/50 border border-terminal-border"
          >
            <h4 className="font-mono text-sm text-accent-cyan mb-4">
              $ git log --oneline career
            </h4>
            <div className="font-mono text-sm space-y-2 text-terminal-text/70">
              <p>
                <span className="text-accent-green">abc1234</span>{' '}
                <span className="text-terminal-muted">(HEAD)</span>{' '}
                DevOps Engineer @ Wonderlend Hubs
              </p>
              <p>
                <span className="text-accent-orange">def5678</span>{' '}
                Started cloud journey with AWS
              </p>
              <p>
                <span className="text-accent-purple">ghi9012</span>{' '}
                First automation script (and it worked!)
              </p>
              <p>
                <span className="text-terminal-muted">...</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
