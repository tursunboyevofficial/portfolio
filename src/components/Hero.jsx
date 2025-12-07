import { motion } from 'framer-motion';
import { personalInfo } from '../constants';
import { ComputerCanvas } from '../canvas';
import { FaGithub, FaLinkedinIn, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import useDeviceMotion from '../hooks/useDeviceMotion';

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  telegram: FaTelegramPlane,
  instagram: FaInstagram,
};

const Hero = () => {
  const { t } = useLanguage();
  const { currentTheme } = useTheme();
  const { tilt, isSupported } = useDeviceMotion();

  // Gyroscope-based transform values (reduced for mobile performance)
  const gyroTransform = isSupported
    ? {
        x: tilt.x * 8,
        y: tilt.y * 8,
        rotateX: tilt.y * 3,
        rotateY: tilt.x * 3,
      }
    : { x: 0, y: 0, rotateX: 0, rotateY: 0 };

  return (
    <section className='relative w-full h-screen max-h-screen mx-auto overflow-hidden hero-section'>
      {/* Background gradient */}
      <div className='absolute inset-0 hero-gradient' />

      {/* Animated background particles - slow floating effect */}
      <motion.div
        className='absolute inset-0 overflow-hidden pointer-events-none'
        animate={{
          x: gyroTransform.x * 0.5,
          y: gyroTransform.y * 0.5,
        }}
        transition={{ type: 'spring', stiffness: 30, damping: 40 }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1.5 h-1.5 rounded-full'
            style={{
              backgroundColor: currentTheme.colors.primary,
              boxShadow: `0 0 6px ${currentTheme.colors.primary}`,
              left: `${12 + (i * 10)}%`,
              top: `${20 + (i * 9)}%`,
            }}
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8 + i * 1.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <div className='absolute inset-0 top-[70px] sm:top-[90px] max-w-7xl mx-auto px-3 sm:px-6 flex flex-col lg:flex-row items-start gap-2'>
        {/* Left side - Text */}
        <motion.div
          className='flex flex-col justify-center items-start mt-3 z-10 lg:w-1/2 w-full'
          animate={{
            x: gyroTransform.x,
            y: gyroTransform.y,
          }}
          transition={{ type: 'spring', stiffness: 80, damping: 30 }}
        >
          {/* Animated line and dot */}
          <div className='flex items-center gap-2 sm:gap-4'>
            <div className='flex flex-col justify-center items-center'>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    `0 0 15px ${currentTheme.colors.primary}`,
                    `0 0 25px ${currentTheme.colors.primary}`,
                    `0 0 15px ${currentTheme.colors.primary}`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className='w-3 h-3 sm:w-4 sm:h-4 rounded-full pulse-glow'
                style={{
                  backgroundColor: currentTheme.colors.primary,
                }}
              />
              <div
                className='w-0.5 h-24 sm:h-40 lg:h-60'
                style={{
                  background: `linear-gradient(to bottom, ${currentTheme.colors.primary}, transparent)`,
                }}
              />
            </div>

            <div className='flex-1'>
              {/* Greeting */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='text-secondary text-[12px] sm:text-[15px]'
              >
                {t('hero.greeting')}
              </motion.p>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='font-black text-white text-[22px] sm:text-[36px] lg:text-[50px] xl:text-[60px] leading-tight'
              >
                {personalInfo.name}{' '}
                <span className='gradient-text'>{personalInfo.surname}</span>
              </motion.h1>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className='text-[14px] sm:text-[20px] lg:text-[26px] font-semibold mt-1'
                style={{ color: currentTheme.colors.secondary }}
              >
                {personalInfo.title}
              </motion.h2>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className='mt-2 sm:mt-3 text-secondary text-[11px] sm:text-[13px] lg:text-[14px] max-w-[450px] leading-relaxed'
              >
                {t('hero.bio')}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className='flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6 hero-buttons'
              >
                <a href='#projects'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-white font-semibold text-[11px] sm:text-[13px] transition-shadow hoverable'
                    style={{
                      background: `linear-gradient(90deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                      boxShadow: `0 0 20px ${currentTheme.glowColor}`,
                    }}
                  >
                    {t('hero.viewProjects')}
                  </motion.button>
                </a>
                <a href='#contact'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-white font-semibold text-[11px] sm:text-[13px] transition-colors hoverable'
                    style={{
                      border: `2px solid ${currentTheme.colors.primary}`,
                      boxShadow: `0 0 15px ${currentTheme.glowColor}`,
                    }}
                  >
                    {t('hero.contactMe')}
                  </motion.button>
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className='flex gap-2 sm:gap-3 mt-4 sm:mt-6'
              >
                {Object.entries(personalInfo.social).map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target='_blank'
                      rel='noopener noreferrer'
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className='w-8 h-8 sm:w-10 sm:h-10 rounded-full glass flex items-center justify-center text-white transition-colors hoverable'
                      style={{
                        borderColor: `${currentTheme.colors.primary}30`,
                      }}
                    >
                      {Icon && <Icon size={14} className='sm:w-[18px] sm:h-[18px]' />}
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right side - 3D Canvas with gyroscope effect */}
        <motion.div
          className='lg:w-1/2 w-full h-[220px] sm:h-[280px] lg:h-[450px] mt-4 sm:mt-6 lg:mt-0 flex items-center justify-center'
          animate={{
            rotateX: gyroTransform.rotateX,
            rotateY: -gyroTransform.rotateY,
          }}
          transition={{ type: 'spring', stiffness: 60, damping: 30 }}
          style={{ perspective: 1000 }}
        >
          <ComputerCanvas />
        </motion.div>
      </div>

      {/* Scroll indicator with gyroscope */}
      <motion.div
        className='absolute bottom-6 sm:bottom-8 w-full flex justify-center items-center'
        animate={{
          x: gyroTransform.x * 0.5,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 30 }}
      >
        <a href='#about'>
          <div
            className='w-[24px] h-[40px] sm:w-[28px] sm:h-[50px] rounded-3xl border-2 flex justify-center items-start p-1.5'
            style={{
              borderColor: currentTheme.colors.textSecondary,
            }}
          >
            <motion.div
              animate={{
                y: [0, 14, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full'
              style={{
                backgroundColor: currentTheme.colors.secondary,
                boxShadow: `0 0 8px ${currentTheme.colors.secondary}`,
              }}
            />
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
