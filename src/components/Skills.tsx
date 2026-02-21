import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
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
  { value: '3+', label: 'Years Exp.', icon: <Icons.Calendar /> },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-24 px-6 bg-terminal-surface/30" ref={ref}>
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
          className="mb-16"
        >
          <div className="terminal-window overflow-x-auto">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-4 text-terminal-muted text-sm font-mono">
                pipeline.yml
              </span>
            </div>
            
            {/* Pipeline stages */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 min-w-max md:min-w-0">
                {pipelineStages.map((stage, stageIndex) => (
                  <div key={stage.name} className="flex items-center gap-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + stageIndex * 0.15 }}
                      className="flex flex-col items-center"
                    >
                      {/* Stage icon */}
                      <div className={`pipeline-node bg-gradient-to-br ${stage.color} bg-opacity-10`}>
                        <span className="text-terminal-bright w-6 h-6">{stage.icon}</span>
                      </div>
                      <span className="mt-2 font-mono text-sm text-terminal-bright">
                        {stage.name}
                      </span>
                      
                      {/* Skills under this stage */}
                      <div className="mt-4 flex flex-col gap-2">
                        {stage.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ 
                              duration: 0.3, 
                              delay: 0.4 + stageIndex * 0.15 + skillIndex * 0.1 
                            }}
                            className="flex items-center gap-2 text-sm font-mono text-terminal-text/70"
                          >
                            <span className="text-accent-cyan w-4 h-4">{skill.icon}</span>
                            <span>{skill.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Connector line */}
                    {stageIndex < pipelineStages.length - 1 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + stageIndex * 0.15 }}
                        className="hidden md:block pipeline-connector origin-left"
                      />
                    )}
                  </div>
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
            <span className="text-accent-cyan w-8 h-8"><Icons.Cloud /></span>
            AWS Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {cloudSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.03 }}
                className="card text-center py-4 hover:scale-105"
              >
                <p className="font-mono text-sm text-terminal-bright">{skill.name}</p>
                <p className="text-xs text-terminal-muted mt-1">{skill.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="text-center p-6 rounded-xl bg-terminal-surface/50 border border-terminal-border"
            >
              <span className="text-accent-cyan w-8 h-8 mx-auto mb-2 block">{stat.icon}</span>
              <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-terminal-muted text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
