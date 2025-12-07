import { motion } from 'framer-motion';
import { personalInfo } from '../constants';
import { FaGithub, FaLinkedinIn, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  telegram: FaTelegramPlane,
  instagram: FaInstagram,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const { currentTheme } = useTheme();

  const navLinks = [
    { id: 'about', title: t('nav.about') },
    { id: 'skills', title: t('nav.skills') },
    { id: 'projects', title: t('nav.projects') },
    { id: 'contact', title: t('nav.contact') },
  ];

  return (
    <footer
      className='relative py-8 px-3 sm:px-6 border-t'
      style={{ borderColor: `${currentTheme.colors.primary}20` }}
    >
      <div className='max-w-7xl mx-auto'>
        <div className='grid md:grid-cols-3 gap-6 sm:gap-8'>
          {/* Logo & Description */}
          <div>
            <div className='flex items-center gap-2 mb-3'>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className='w-8 h-8 rounded-lg flex items-center justify-center'
                style={{
                  background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                  boxShadow: `0 0 15px ${currentTheme.glowColor}`,
                }}
              >
                <span className='text-white font-bold text-base'>
                  {personalInfo.name.charAt(0)}
                </span>
              </motion.div>
              <span className='text-white text-[13px] sm:text-[15px] font-bold'>
                {personalInfo.name} {personalInfo.surname}
              </span>
            </div>
            <p className='text-secondary text-[11px] sm:text-[12px] leading-relaxed'>
              {personalInfo.title}. {t('footer.madeWith')} React + Three.js
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-white font-bold mb-3 text-[12px] sm:text-[14px]'>
              {t('nav.about')}
            </h4>
            <ul className='space-y-1.5'>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className='text-secondary hover:text-white transition-colors text-[11px] sm:text-[12px] hoverable'
                    style={{
                      '--hover-color': currentTheme.colors.primary,
                    }}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className='text-white font-bold mb-3 text-[12px] sm:text-[14px]'>
              {t('contact.social')}
            </h4>
            <div className='flex gap-2'>
              {Object.entries(personalInfo.social).map(([platform, url]) => {
                const Icon = socialIcons[platform];
                return (
                  <motion.a
                    key={platform}
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 rounded-lg flex items-center justify-center text-white transition-colors hoverable'
                    style={{
                      backgroundColor: currentTheme.colors.tertiary,
                    }}
                  >
                    {Icon && <Icon size={14} />}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className='mt-6 sm:mt-8 pt-4 flex justify-center items-center border-t'
          style={{ borderColor: `${currentTheme.colors.primary}10` }}
        >
          <p className='text-secondary text-[10px] sm:text-[12px]'>
            © {currentYear} {personalInfo.name} {personalInfo.surname}. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
