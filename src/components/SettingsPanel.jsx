import { motion, AnimatePresence } from 'framer-motion';
import { HiCog, HiX, HiGlobeAlt, HiColorSwatch } from 'react-icons/hi';
import { useLanguage, languages } from '../context/LanguageContext';
import { useTheme, themes } from '../context/ThemeContext';
import { usePanel, PANELS } from '../context/PanelContext';

const SettingsPanel = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme, currentTheme } = useTheme();
  const { isPanelOpen, togglePanel, closePanel, activePanel } = usePanel();

  const isOpen = isPanelOpen(PANELS.SETTINGS);
  const shouldHideButton = activePanel && activePanel !== PANELS.SETTINGS;

  return (
    <>
      {/* Settings Button - always visible */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => togglePanel(PANELS.SETTINGS)}
        className='fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full hidden sm:flex items-center justify-center text-white hoverable'
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
          boxShadow: `0 0 20px ${currentTheme.glowColor}`,
        }}
      >
        <HiCog size={20} />
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePanel}
              className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50'
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className='fixed right-0 top-0 h-full w-full sm:w-80 z-50 p-4 sm:p-5 overflow-y-auto'
              style={{ backgroundColor: currentTheme.colors.backgroundAlt }}
            >
              {/* Header */}
              <div className='flex items-center justify-between mb-5'>
                <h2 className='text-white text-lg font-bold flex items-center gap-2'>
                  <HiCog className='text-primary' style={{ color: currentTheme.colors.primary }} />
                  {t('settings.title')}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closePanel}
                  className='w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors hoverable'
                >
                  <HiX size={18} />
                </motion.button>
              </div>

              {/* Language Section */}
              <div className='mb-5'>
                <h3 className='text-white font-semibold mb-3 flex items-center gap-2 text-sm'>
                  <HiGlobeAlt size={16} style={{ color: currentTheme.colors.primary }} />
                  {t('settings.language')}
                </h3>
                <div className='grid grid-cols-1 gap-1.5'>
                  {Object.values(languages).map((lang) => (
                    <motion.button
                      key={lang.code}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full p-2.5 rounded-lg flex items-center gap-3 transition-all hoverable ${
                        language === lang.code
                          ? 'border'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                      style={{
                        borderColor: language === lang.code ? currentTheme.colors.primary : 'transparent',
                        backgroundColor: language === lang.code ? `${currentTheme.colors.primary}20` : undefined,
                      }}
                    >
                      <span className='text-xl'>{lang.flag}</span>
                      <span className='text-white font-medium text-sm'>{lang.name}</span>
                      {language === lang.code && (
                        <motion.div
                          layoutId='langCheck'
                          className='ml-auto w-5 h-5 rounded-full flex items-center justify-center'
                          style={{ backgroundColor: currentTheme.colors.primary }}
                        >
                          <svg className='w-3 h-3 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Theme Section */}
              <div>
                <h3 className='text-white font-semibold mb-3 flex items-center gap-2 text-sm'>
                  <HiColorSwatch size={16} style={{ color: currentTheme.colors.primary }} />
                  {t('settings.theme')}
                </h3>
                <div className='grid grid-cols-1 gap-2'>
                  {Object.values(themes).map((themeItem) => (
                    <motion.button
                      key={themeItem.id}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setTheme(themeItem.id)}
                      className={`w-full p-2.5 rounded-lg flex items-center gap-3 transition-all hoverable ${
                        theme === themeItem.id
                          ? 'border'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent'
                      }`}
                      style={{
                        borderColor: theme === themeItem.id ? themeItem.colors.primary : 'transparent',
                        backgroundColor: theme === themeItem.id ? `${themeItem.colors.primary}20` : undefined,
                      }}
                    >
                      {/* Color preview */}
                      <div className='flex gap-1'>
                        <div
                          className='w-4 h-4 rounded-full'
                          style={{
                            backgroundColor: themeItem.colors.primary,
                            boxShadow: `0 0 6px ${themeItem.colors.primary}`,
                          }}
                        />
                        <div
                          className='w-4 h-4 rounded-full'
                          style={{
                            backgroundColor: themeItem.colors.secondary,
                            boxShadow: `0 0 6px ${themeItem.colors.secondary}`,
                          }}
                        />
                        <div
                          className='w-4 h-4 rounded-full'
                          style={{
                            backgroundColor: themeItem.colors.accent,
                            boxShadow: `0 0 6px ${themeItem.colors.accent}`,
                          }}
                        />
                      </div>
                      <div className='flex-1 text-left'>
                        <span className='text-white font-medium text-sm'>{themeItem.name}</span>
                      </div>
                      {theme === themeItem.id && (
                        <motion.div
                          layoutId='themeCheck'
                          className='w-5 h-5 rounded-full flex items-center justify-center'
                          style={{ backgroundColor: themeItem.colors.primary }}
                        >
                          <svg className='w-3 h-3 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className='mt-5 p-3 rounded-lg' style={{ backgroundColor: currentTheme.colors.tertiary }}>
                <p className='text-white/60 text-xs mb-2'>{t('settings.preview')}</p>
                <div
                  className='h-16 rounded-lg flex items-center justify-center'
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.colors.background}, ${currentTheme.colors.backgroundAlt})`,
                  }}
                >
                  <div
                    className='px-4 py-2 rounded-full font-bold text-white text-sm'
                    style={{
                      background: `linear-gradient(90deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                      boxShadow: `0 0 20px ${currentTheme.glowColor}`,
                    }}
                  >
                    Neon Style
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SettingsPanel;
