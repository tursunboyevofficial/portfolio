import { motion } from 'framer-motion';
import { HiOutlineGlobeAlt, HiOutlineDeviceMobile, HiOutlineServer, HiOutlineColorSwatch } from 'react-icons/hi';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import useDeviceMotion from '../hooks/useDeviceMotion';

const serviceIcons = {
  web: HiOutlineGlobeAlt,
  mobile: HiOutlineDeviceMobile,
  backend: HiOutlineServer,
  design: HiOutlineColorSwatch,
};

const ServiceCard = ({ index, icon, titleKey, descKey, currentTheme, t, tilt }) => {
  const Icon = serviceIcons[icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className='w-full sm:w-[220px]'
    >
      <motion.div
        whileHover={{ y: -10, rotateY: 10 }}
        animate={{
          rotateX: tilt.y * 3,
          rotateY: tilt.x * 3,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 30 }}
        className='w-full p-[1px] rounded-[16px] shadow-card neon-card hoverable'
        style={{
          background: `linear-gradient(90deg, ${currentTheme.colors.secondary}, ${currentTheme.colors.accent})`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className='rounded-[16px] py-4 px-6 min-h-[220px] flex justify-evenly items-center flex-col'
          style={{ backgroundColor: currentTheme.colors.tertiary }}
        >
          <div
            className='w-14 h-14 rounded-full flex items-center justify-center'
            style={{
              background: `linear-gradient(135deg, ${currentTheme.colors.primary}20, ${currentTheme.colors.secondary}20)`,
            }}
          >
            {Icon && (
              <Icon
                size={32}
                style={{
                  color: currentTheme.colors.primary,
                  filter: `drop-shadow(0 0 8px ${currentTheme.colors.primary})`,
                }}
              />
            )}
          </div>
          <h3 className='text-white text-[16px] font-bold text-center'>
            {t(`services.${titleKey}`)}
          </h3>
          <p className='text-secondary text-[12px] text-center mt-1'>
            {t(`services.${descKey}`)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const About = () => {
  const { t } = useLanguage();
  const { currentTheme } = useTheme();
  const { tilt, isSupported } = useDeviceMotion();

  const normalizedTilt = isSupported ? tilt : { x: 0, y: 0 };

  const services = [
    { icon: 'web', titleKey: 'web', descKey: 'webDesc' },
    { icon: 'mobile', titleKey: 'mobile', descKey: 'mobileDesc' },
    { icon: 'backend', titleKey: 'backend', descKey: 'backendDesc' },
    { icon: 'design', titleKey: 'design', descKey: 'designDesc' },
  ];

  return (
    <section id='about' className='relative py-12 sm:py-16 px-3 sm:px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className='text-secondary text-[12px] sm:text-[14px] uppercase tracking-wider'>
            {t('about.subtitle')}
          </p>
          <h2 className='text-white font-black text-[24px] sm:text-[40px] mt-1'>
            {t('about.title')}
            <span style={{ color: currentTheme.colors.primary }}>.</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mt-3 text-secondary text-[12px] sm:text-[14px] max-w-3xl leading-[22px] sm:leading-[26px]'
        >
          {t('about.description')}
        </motion.p>

        {/* Service Cards */}
        <div className='mt-10 sm:mt-14 flex flex-wrap justify-center gap-4 sm:gap-6'>
          {services.map((service, index) => (
            <ServiceCard
              key={service.titleKey}
              index={index}
              {...service}
              currentTheme={currentTheme}
              t={t}
              tilt={normalizedTilt}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='mt-12 sm:mt-16 flex flex-wrap justify-center gap-6 sm:gap-12'
        >
          {[
            { value: '2+', labelKey: 'years' },
            { value: '10+', labelKey: 'projects' },
            { value: '5+', labelKey: 'clients' },
            { value: '99%', labelKey: 'satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              animate={{
                y: normalizedTilt.y * 5,
                x: normalizedTilt.x * 5,
              }}
              className='text-center'
            >
              <h3
                className='text-[28px] sm:text-[48px] font-bold gradient-text'
                style={{
                  textShadow: `0 0 20px ${currentTheme.glowColor}`,
                }}
              >
                {stat.value}
              </h3>
              <p className='text-secondary text-[11px] sm:text-[14px]'>
                {t(`stats.${stat.labelKey}`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
