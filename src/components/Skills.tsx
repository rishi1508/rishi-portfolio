import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Skill {
  name: string;
  icon: string;
  color: string;
}

interface PipelineStage {
  name: string;
  icon: string;
  skills: Skill[];
  color: string;
}

const pipelineStages: PipelineStage[] = [
  {
    name: 'Code',
    icon: '📝',
    color: 'from-accent-blue to-accent-cyan',
    skills: [
      { name: 'Python', icon: '🐍', color: 'text-yellow-400' },
      { name: 'Bash', icon: '💻', color: 'text-green-400' },
      { name: 'YAML', icon: '📄', color: 'text-red-400' },
    ],
  },
  {
    name: 'Build',
    icon: '🔨',
    color: 'from-accent-cyan to-accent-green',
    skills: [
      { name: 'Docker', icon: '🐳', color: 'text-blue-400' },
      { name: 'GitLab CI', icon: '🦊', color: 'text-orange-400' },
      { name: 'GitHub Actions', icon: '🔄', color: 'text-purple-400' },
    ],
  },
  {
    name: 'Test',
    icon: '🧪',
    color: 'from-accent-green to-accent-orange',
    skills: [
      { name: 'pytest', icon: '✅', color: 'text-green-400' },
      { name: 'SonarQube', icon: '📊', color: 'text-blue-400' },
      { name: 'Trivy', icon: '🔒', color: 'text-cyan-400' },
    ],
  },
  {
    name: 'Deploy',
    icon: '🚀',
    color: 'from-accent-orange to-accent-purple',
    skills: [
      { name: 'Terraform', icon: '🏗️', color: 'text-purple-400' },
      { name: 'Ansible', icon: '📜', color: 'text-red-400' },
      { name: 'Kubernetes', icon: '☸️', color: 'text-blue-400' },
    ],
  },
  {
    name: 'Monitor',
    icon: '📈',
    color: 'from-accent-purple to-accent-cyan',
    skills: [
      { name: 'CloudWatch', icon: '☁️', color: 'text-orange-400' },
      { name: 'Prometheus', icon: '📊', color: 'text-orange-500' },
      { name: 'Grafana', icon: '📉', color: 'text-yellow-400' },
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
                        <span className="text-2xl">{stage.icon}</span>
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
                            <span>{skill.icon}</span>
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
            <span className="text-3xl">☁️</span>
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
          {[
            { value: '500+', label: 'Deployments', icon: '🚀' },
            { value: '99.9%', label: 'Uptime', icon: '⏱️' },
            { value: '99%', label: 'Time Saved', icon: '⚡' },
            { value: '3+', label: 'Years Exp.', icon: '📅' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              className="text-center p-6 rounded-xl bg-terminal-surface/50 border border-terminal-border"
            >
              <span className="text-3xl mb-2 block">{stat.icon}</span>
              <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-terminal-muted text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
