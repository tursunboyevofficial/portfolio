import { motion } from 'framer-motion';
import { projects, personalInfo } from '../constants';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import useDeviceMotion from '../hooks/useDeviceMotion';

const ProjectCard = ({ index, projectKey, tags, image, sourceCode, liveDemo, currentTheme, tilt = { x: 0, y: 0 }, t }) => {
  const name = t(`projects.${projectKey}.name`);
  const description = t(`projects.${projectKey}.description`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        whileHover={{ y: -10 }}
        animate={{
          rotateX: tilt.y * 3,
          rotateY: tilt.x * 3,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 30 }}
        className='glass rounded-xl p-3 sm:p-4 sm:w-[300px] w-full neon-card hoverable'
        style={{
          borderColor: `${currentTheme.colors.primary}30`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Image */}
        <div className='relative w-full h-[140px] sm:h-[160px] rounded-lg overflow-hidden'>
          <img
            src={image}
            alt={name}
            className='w-full h-full object-cover'
          />

          {/* Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />

          {/* Links */}
          <div className='absolute top-2 right-2 flex gap-1.5'>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={sourceCode}
              target='_blank'
              rel='noopener noreferrer'
              className='w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur flex items-center justify-center text-white transition-colors hoverable'
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            >
              <FaGithub size={14} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={liveDemo}
              target='_blank'
              rel='noopener noreferrer'
              className='w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur flex items-center justify-center text-white transition-colors hoverable'
              style={{
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
            >
              <FaExternalLinkAlt size={11} />
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className='mt-3'>
          <h3 className='text-white text-[14px] sm:text-[18px] font-bold'>{name}</h3>
          <p className='mt-1.5 text-secondary text-[11px] sm:text-[12px] leading-relaxed'>
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className='mt-2 sm:mt-3 flex flex-wrap gap-1.5'>
          {tags.map((tag) => (
            <span
              key={tag.name}
              className='text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full'
              style={{
                backgroundColor: currentTheme.colors.tertiary,
                color: currentTheme.colors.secondary,
              }}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const { t } = useLanguage();
  const { currentTheme } = useTheme();
  const { tilt, isSupported } = useDeviceMotion();
  const normalizedTilt = isSupported ? tilt : { x: 0, y: 0 };

  return (
    <section id='projects' className='relative py-12 sm:py-16 px-3 sm:px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className='text-secondary text-[12px] sm:text-[14px] uppercase tracking-wider'>
            {t('projects.subtitle')}
          </p>
          <h2 className='text-white font-black text-[24px] sm:text-[40px] mt-1'>
            {t('projects.title')}
            <span style={{ color: currentTheme.colors.primary }}>.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mt-3 text-secondary text-[12px] sm:text-[14px] max-w-3xl leading-[20px] sm:leading-[24px]'
        >
          {t('projects.description')}
        </motion.p>

        {/* Projects Grid */}
        <div className='mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-5'>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.key}
              index={index}
              projectKey={project.key}
              tags={project.tags}
              image={project.image}
              sourceCode={project.sourceCode}
              liveDemo={project.liveDemo}
              currentTheme={currentTheme}
              tilt={normalizedTilt}
              t={t}
            />
          ))}
        </div>

        {/* More Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='mt-10 sm:mt-12 flex justify-center'
        >
          <a
            href={personalInfo.social.github}
            target='_blank'
            rel='noopener noreferrer'
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-white font-semibold transition-colors flex items-center gap-2 text-[12px] sm:text-[14px] hoverable'
              style={{
                border: `2px solid ${currentTheme.colors.primary}`,
                boxShadow: `0 0 15px ${currentTheme.glowColor}`,
              }}
            >
              <span>{t('projects.moreProjects')}</span>
              <FaGithub size={16} />
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
