import { motion } from 'framer-motion';
import { technologies, experiences } from '../constants';
import { FaReact, FaNodeJs, FaPython, FaDocker, FaGitAlt, FaFigma, FaHtml5 } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiFlutter, SiPostgresql, SiMongodb, SiThreedotjs, SiTailwindcss } from 'react-icons/si';
import { HiBriefcase, HiLightningBolt, HiCursorClick } from 'react-icons/hi';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import useDeviceMotion from '../hooks/useDeviceMotion';

const techIcons = {
  react: FaReact,
  javascript: SiJavascript,
  typescript: SiTypescript,
  nodejs: FaNodeJs,
  python: FaPython,
  flutter: SiFlutter,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  docker: FaDocker,
  git: FaGitAlt,
  figma: FaFigma,
  threejs: SiThreedotjs,
  html: FaHtml5,
  tailwind: SiTailwindcss,
};

const experienceIcons = {
  briefcase: HiBriefcase,
  rocket: HiLightningBolt,
  target: HiCursorClick,
};

const SkillBar = ({ name, icon, level, color, index, currentTheme }) => {
  const Icon = techIcons[icon];
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className='mb-3 sm:mb-4'
    >
      <div className='flex justify-between items-center mb-1.5'>
        <div className='flex items-center gap-2'>
          {Icon && (
            <Icon
              size={16}
              style={{
                color,
                filter: `drop-shadow(0 0 4px ${color})`,
              }}
            />
          )}
          <span className='text-white font-medium text-[12px] sm:text-[14px]'>{name}</span>
        </div>
        <span className='text-secondary text-[10px] sm:text-[12px]'>{level}%</span>
      </div>
      <div
        className='w-full h-2 sm:h-2.5 rounded-full overflow-hidden'
        style={{ backgroundColor: currentTheme.colors.tertiary }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
          className='h-full rounded-full'
          style={{
            background: `linear-gradient(90deg, ${color}, ${currentTheme.colors.primary})`,
            boxShadow: `0 0 15px ${color}40`,
          }}
        />
      </div>
    </motion.div>
  );
};

const ExperienceCard = ({ experienceKey, icon, index, currentTheme, t, totalCount }) => {
  const Icon = experienceIcons[icon];
  const title = t(`experience.${experienceKey}.title`);
  const company = t(`experience.${experienceKey}.company`);
  const date = t(`experience.${experienceKey}.date`);
  const points = t(`experience.${experienceKey}.points`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className='relative'
    >
      {/* Timeline line */}
      {index !== totalCount - 1 && (
        <div
          className='absolute left-[20px] sm:left-[24px] top-[50px] sm:top-[56px] w-[2px] h-[calc(100%-16px)]'
          style={{
            background: `linear-gradient(to bottom, ${currentTheme.colors.primary}, transparent)`,
          }}
        />
      )}

      <div className='flex gap-3 sm:gap-4'>
        {/* Icon */}
        <div
          className='w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] rounded-full flex items-center justify-center border-2 flex-shrink-0'
          style={{
            backgroundColor: currentTheme.colors.tertiary,
            borderColor: currentTheme.colors.primary,
            boxShadow: `0 0 12px ${currentTheme.glowColor}`,
          }}
        >
          {Icon && (
            <Icon
              size={18}
              style={{ color: currentTheme.colors.primary }}
            />
          )}
        </div>

        {/* Content */}
        <div className='flex-1 pb-4 sm:pb-6'>
          <div
            className='glass rounded-lg p-3 sm:p-4 transition-colors'
            style={{ borderColor: `${currentTheme.colors.primary}30` }}
          >
            <h3 className='text-white text-[14px] sm:text-[16px] font-bold'>
              {title}
            </h3>
            <p
              className='text-[11px] sm:text-[12px] font-semibold mt-0.5'
              style={{ color: currentTheme.colors.secondary }}
            >
              {company}
            </p>
            <p className='text-secondary text-[10px] sm:text-[11px] mt-0.5'>
              {date}
            </p>

            <ul className='mt-2 sm:mt-3 list-disc ml-3 space-y-1'>
              {Array.isArray(points) && points.map((point, pointIndex) => (
                <li
                  key={pointIndex}
                  className='text-secondary text-[10px] sm:text-[12px] pl-0.5'
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const { t } = useLanguage();
  const { currentTheme } = useTheme();
  const { tilt, isSupported } = useDeviceMotion();
  const normalizedTilt = isSupported ? tilt : { x: 0, y: 0 };

  return (
    <section id='skills' className='relative py-12 sm:py-16 px-3 sm:px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className='text-secondary text-[12px] sm:text-[14px] uppercase tracking-wider'>
            {t('skills.subtitle')}
          </p>
          <h2 className='text-white font-black text-[24px] sm:text-[40px] mt-1'>
            {t('skills.title')}
            <span style={{ color: currentTheme.colors.primary }}>.</span>
          </h2>
        </motion.div>

        <div className='mt-8 sm:mt-12 grid lg:grid-cols-2 gap-8 sm:gap-12'>
          {/* Skills */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className='text-[16px] sm:text-[20px] font-bold mb-4 sm:mb-6'
              style={{ color: currentTheme.colors.secondary }}
            >
              {t('skills.technologies')}
            </motion.h3>
            <div>
              {technologies.map((tech, index) => (
                <SkillBar
                  key={tech.name}
                  index={index}
                  {...tech}
                  currentTheme={currentTheme}
                />
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className='text-[16px] sm:text-[20px] font-bold mb-4 sm:mb-6'
              style={{ color: currentTheme.colors.secondary }}
            >
              {t('skills.experience')}
            </motion.h3>
            <div>
              {[
                { key: 'senior', icon: 'briefcase' },
                { key: 'fullstack', icon: 'rocket' },
                { key: 'frontend', icon: 'target' },
              ].map((exp, index) => (
                <ExperienceCard
                  key={exp.key}
                  experienceKey={exp.key}
                  icon={exp.icon}
                  index={index}
                  currentTheme={currentTheme}
                  t={t}
                  totalCount={3}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tech Icons Grid with Gyroscope */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mt-12 sm:mt-16'
        >
          <h3 className='text-white text-[14px] sm:text-[18px] font-bold text-center mb-6 sm:mb-8'>
            {t('skills.dailyTech')}
          </h3>
          <div className='flex flex-wrap justify-center gap-3 sm:gap-4'>
            {technologies.slice(0, 8).map((tech, index) => {
              const Icon = techIcons[tech.icon];
              return (
                <motion.div
                  key={tech.name}
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  animate={{
                    rotateX: normalizedTilt.y * 5,
                    rotateY: normalizedTilt.x * 5,
                  }}
                  className='w-12 h-12 sm:w-16 sm:h-16 rounded-xl glass flex items-center justify-center cursor-pointer transition-colors hoverable'
                  style={{
                    borderColor: `${currentTheme.colors.primary}30`,
                    transformStyle: 'preserve-3d',
                  }}
                  title={tech.name}
                >
                  {Icon && (
                    <Icon
                      size={24}
                      className='sm:w-[28px] sm:h-[28px]'
                      style={{
                        color: tech.color,
                        filter: `drop-shadow(0 0 8px ${tech.color})`,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
