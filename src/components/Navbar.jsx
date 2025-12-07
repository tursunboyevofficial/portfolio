import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { usePanel, PANELS } from '../context/PanelContext';

const Navbar = () => {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const { currentTheme } = useTheme();
  const { isPanelOpen, togglePanel, closePanel, activePanel } = usePanel();

  const isMenuOpen = isPanelOpen(PANELS.MOBILE_MENU);
  const shouldHideButton = activePanel && activePanel !== PANELS.MOBILE_MENU;

  const navLinks = [
    { id: 'about', title: t('nav.about') },
    { id: 'skills', title: t('nav.skills') },
    { id: 'projects', title: t('nav.projects') },
    { id: 'contact', title: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex items-center py-4 sm:py-5 fixed top-0 z-20 transition-all duration-300 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6'>
        {/* Logo */}
        <a
          href='#'
          className='flex items-center gap-2 sm:gap-3 hoverable'
          onClick={() => {
            setActive('');
            window.scrollTo(0, 0);
          }}
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className='w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center'
            style={{
              background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
              boxShadow: `0 0 20px ${currentTheme.glowColor}`,
            }}
          >
            <span className='text-white font-bold text-lg sm:text-xl'>
              {personalInfo.name.charAt(0)}
            </span>
          </motion.div>
          <span className='text-white text-[14px] sm:text-[18px] font-bold hidden sm:block'>
            {personalInfo.name}
            <span style={{ color: currentTheme.colors.primary }}> | </span>
            <span className='text-secondary text-[12px] sm:text-[14px]'>{personalInfo.title}</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className='list-none hidden md:flex flex-row gap-6 lg:gap-8'>
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? 'text-white' : 'text-secondary'
              } hover:text-white text-[14px] lg:text-[16px] font-medium cursor-pointer transition-colors relative hoverable`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
              {active === link.title && (
                <motion.div
                  layoutId='activeTab'
                  className='absolute -bottom-1 left-0 right-0 h-0.5'
                  style={{
                    background: `linear-gradient(90deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                    boxShadow: `0 0 10px ${currentTheme.glowColor}`,
                  }}
                />
              )}
            </li>
          ))}
        </ul>

        {/* Contact Button (Desktop) */}
        <a href='#contact' className='hidden md:block'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-5 lg:px-6 py-2 rounded-full text-white font-medium text-sm hoverable'
            style={{
              background: `linear-gradient(90deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
              boxShadow: `0 0 20px ${currentTheme.glowColor}`,
            }}
          >
            {t('hero.contactMe')}
          </motion.button>
        </a>

        {/* Mobile Menu Button - always visible on mobile */}
        <div className='md:hidden flex items-center'>
          <button
            onClick={() => togglePanel(PANELS.MOBILE_MENU)}
            className='w-10 h-10 flex flex-col items-center justify-center gap-1.5 hoverable'
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className='w-6 h-[3px] block rounded-full'
              style={{
                backgroundColor: currentTheme.colors.primary,
                boxShadow: `0 0 6px ${currentTheme.colors.primary}`,
              }}
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className='w-6 h-[3px] block rounded-full'
              style={{
                backgroundColor: currentTheme.colors.primary,
                boxShadow: `0 0 6px ${currentTheme.colors.primary}`,
              }}
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className='w-6 h-[3px] block rounded-full'
              style={{
                backgroundColor: currentTheme.colors.primary,
                boxShadow: `0 0 6px ${currentTheme.colors.primary}`,
              }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closePanel}
                className='fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden'
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className='fixed top-14 left-3 right-3 p-4 glass rounded-xl md:hidden z-50'
                style={{
                  borderColor: `${currentTheme.colors.primary}30`,
                  boxShadow: `0 0 30px ${currentTheme.glowColor}`,
                }}
              >
                <ul className='list-none flex flex-col gap-2'>
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.id}
                      whileHover={{ x: 5 }}
                      className={`${
                        active === link.title ? 'text-white' : 'text-secondary'
                      } font-medium text-[13px] cursor-pointer`}
                      onClick={() => {
                        closePanel();
                        setActive(link.title);
                      }}
                    >
                      <a
                        href={`#${link.id}`}
                        className='flex items-center gap-2 py-1.5'
                      >
                        <span
                          className='w-1.5 h-1.5 rounded-full'
                          style={{
                            backgroundColor: active === link.title ? currentTheme.colors.primary : 'transparent',
                            boxShadow: active === link.title ? `0 0 8px ${currentTheme.colors.primary}` : 'none',
                          }}
                        />
                        {link.title}
                      </a>
                    </motion.li>
                  ))}
                  <li className='pt-1'>
                    <a
                      href='#contact'
                      onClick={closePanel}
                      className='block px-3 py-2 text-center rounded-full text-white font-medium text-[12px]'
                      style={{
                        background: `linear-gradient(90deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                        boxShadow: `0 0 15px ${currentTheme.glowColor}`,
                      }}
                    >
                      {t('hero.contactMe')}
                    </a>
                  </li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
