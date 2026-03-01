import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, Fragment } from 'react';
import type { ReactNode } from 'react';
import { Icons } from './icons';

interface Skill {
  name: string;
  icon: ReactNode;
}

interface PipelineStage {
  name: string;
  icon: ReactNode;
  skills: Skill[];
  color: string;
}

const pipelineStages: PipelineStage[] = [
  {
    name: 'Code',
    icon: <Icons.Code />,
    color: 'from-accent-blue to-accent-cyan',
    skills: [
      { name: 'Python', icon: <Icons.Python /> },
      { name: 'Bash', icon: <Icons.Terminal /> },
      { name: 'YAML', icon: <Icons.Document /> },
    ],
  },
  {
    name: 'Build',
    icon: <Icons.Build />,
    color: 'from-accent-cyan to-accent-green',
    skills: [
      { name: 'Docker', icon: <Icons.Docker /> },
      { name: 'GitLab CI', icon: <Icons.GitLab /> },
      { name: 'GitHub Actions', icon: <Icons.GitHub /> },
    ],
  },
  {
    name: 'Test',
    icon: <Icons.Test />,
    color: 'from-accent-green to-accent-orange',
    skills: [
      { name: 'pytest', icon: <Icons.Check /> },
      { name: 'SonarQube', icon: <Icons.Chart /> },
      { name: 'Trivy', icon: <Icons.Shield /> },
    ],
  },
  {
    name: 'Deploy',
    icon: <Icons.Deploy />,
    color: 'from-accent-orange to-accent-purple',
    skills: [
      { name: 'Terraform', icon: <Icons.Server /> },
      { name: 'Ansible', icon: <Icons.Document /> },
      { name: 'Kubernetes', icon: <Icons.Kubernetes /> },
    ],
  },
  {
    name: 'Monitor',
    icon: <Icons.Monitor />,
    color: 'from-accent-purple to-accent-cyan',
    skills: [
      { name: 'CloudWatch', icon: <Icons.Cloud /> },
      { name: 'Prometheus', icon: <Icons.Chart /> },
      { name: 'Grafana', icon: <Icons.Chart /> },
    ],
  },
];

const cloudSkills = [
  { name: 'EC2', category: 'Compute' },
  { name: 'ECS', category: 'Containers' },
  { name: 'Lambda', category: 'Serverless' },
  { name: 'S3', category: 'Storage' },
  { name: 'RDS', category: 'Database' },
  { name: 'VPC', category: 'Networking' },
  { name: 'IAM', category: 'Security' },
  { name: 'CloudFront', category: 'CDN' },
  { name: 'Route 53', category: 'DNS' },
  { name: 'SQS/SNS', category: 'Messaging' },
  { name: 'EKS', category: 'Kubernetes' },
  { name: 'CodePipeline', category: 'CI/CD' },
];

const stats = [
  { value: '500+', label: 'Deployments', icon: <Icons.Rocket /> },
  { value: '99.9%', label: 'Uptime', icon: <Icons.Clock /> },
  { value: '99%', label: 'Time Saved', icon: <Icons.Lightning /> },
  { value: '6', label: 'GitHub Projects', icon: <Icons.Calendar /> },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-16 md:py-24 px-4 md:px-6 bg-terminal-surface/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-heading">
            <span className="text-accent-cyan">02.</span> Skills & Tools
          </p>
          <h2 className="section-title">My DevOps Pipeline</h2>
        </motion.div>

        {/* CI/CD Pipeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 md:mb-16"
        >
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-4 text-terminal-muted text-sm font-mono">
                pipeline.yml
              </span>
            </div>
            
            {/* Pipeline stages - Vertical on mobile, horizontal on desktop */}
            <div className="p-4 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-0">
                {pipelineStages.map((stage, stageIndex) => (
                  <Fragment key={stage.name}>
                    <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:flex-1">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.2 + stageIndex * 0.15 }}
                        className="flex flex-col items-center shrink-0"
                      >
                        {/* Stage icon */}
                        <div className={`pipeline-node bg-gradient-to-br ${stage.color}`}>
                          <span className="text-terminal-bright w-6 h-6 block">{stage.icon}</span>
                        </div>
                        <span className="mt-2 font-mono text-sm text-terminal-bright">
                          {stage.name}
                        </span>
                      </motion.div>

                      {/* Skills - horizontal on mobile, vertical on desktop */}
                      <div className="flex flex-wrap md:flex-col gap-2 md:mt-4">
                        {stage.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ 
                              duration: 0.3, 
                              delay: 0.4 + stageIndex * 0.15 + skillIndex * 0.1 
                            }}
                            className="flex items-center gap-2 text-sm font-mono text-terminal-text/80 bg-terminal-bg/50 md:bg-transparent px-2 py-1 md:p-0 rounded"
                          >
                            <span className="text-accent-cyan w-4 h-4 block shrink-0">{skill.icon}</span>
                            <span>{skill.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Animated connector between stages — desktop only */}
                    {stageIndex < pipelineStages.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.35 + stageIndex * 0.15 }}
                        className="hidden md:flex items-center self-start mt-7 shrink-0 origin-left"
                        aria-hidden="true"
                      >
                        <div className="pipeline-connector" />
                        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" className="text-accent-cyan/50 -ml-px">
                          <path d="M0 0L6 4L0 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* AWS Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-terminal-bright mb-6 flex items-center gap-3">
            <span className="text-accent-cyan w-7 h-7 block"><Icons.Cloud /></span>
            AWS Services
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
            {cloudSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.03 }}
                className="card text-center py-3 md:py-4 px-2 hover:scale-105"
              >
                <p className="font-mono text-xs md:text-sm text-terminal-bright">{skill.name}</p>
                <p className="text-xs text-terminal-muted mt-1 hidden sm:block">{skill.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="text-center p-4 md:p-6 rounded-xl bg-terminal-surface/50 border border-terminal-border"
            >
              <span className="text-accent-cyan w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 block">{stat.icon}</span>
              <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-terminal-muted text-xs md:text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
