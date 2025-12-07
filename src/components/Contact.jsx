import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../constants';
import { FaGithub, FaLinkedinIn, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { sendContactForm } from '../utils/telegram';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import useDeviceMotion from '../hooks/useDeviceMotion';

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  telegram: FaTelegramPlane,
  instagram: FaInstagram,
};

const Contact = () => {
  const formRef = useRef();
  const { t } = useLanguage();
  const { currentTheme } = useTheme();
  const { tilt, isSupported } = useDeviceMotion();
  const normalizedTilt = isSupported ? tilt : { x: 0, y: 0 };
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendContactForm(form.name, form.email, form.message);
      setLoading(false);
      setSuccess(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Xabar yuborishda xato:', error);
      setLoading(false);
    }
  };

  return (
    <section id='contact' className='relative py-12 sm:py-16 px-3 sm:px-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className='text-secondary text-[12px] sm:text-[14px] uppercase tracking-wider'>
            {t('contact.subtitle')}
          </p>
          <h2 className='text-white font-black text-[24px] sm:text-[40px] mt-1'>
            {t('contact.title')}
            <span style={{ color: currentTheme.colors.primary }}>.</span>
          </h2>
        </motion.div>

        <div className='mt-8 sm:mt-10 grid lg:grid-cols-2 gap-8 sm:gap-10'>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className='text-secondary text-[12px] sm:text-[14px] leading-relaxed mb-5 sm:mb-6'>
              {t('contact.description')}
            </p>

            {/* Contact Items */}
            <div className='space-y-3 sm:space-y-4'>
              <motion.a
                whileHover={{ x: 10 }}
                animate={{
                  x: normalizedTilt.x * 5,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                href={`mailto:${personalInfo.email}`}
                className='flex items-center gap-3 glass rounded-lg p-3 transition-colors hoverable'
                style={{ borderColor: `${currentTheme.colors.primary}30` }}
              >
                <div
                  className='w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white'
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                    boxShadow: `0 0 15px ${currentTheme.glowColor}`,
                  }}
                >
                  <HiOutlineMail size={18} />
                </div>
                <div>
                  <p className='text-secondary text-[10px] sm:text-[11px]'>{t('contact.email')}</p>
                  <p className='text-white font-medium text-[12px] sm:text-[13px]'>{personalInfo.email}</p>
                </div>
              </motion.a>

              <motion.a
                whileHover={{ x: 10 }}
                animate={{
                  x: normalizedTilt.x * 5,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                href={`tel:${personalInfo.phone}`}
                className='flex items-center gap-3 glass rounded-lg p-3 transition-colors hoverable'
                style={{ borderColor: `${currentTheme.colors.primary}30` }}
              >
                <div
                  className='w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white'
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.colors.secondary}, ${currentTheme.colors.primary})`,
                    boxShadow: `0 0 15px ${currentTheme.colors.secondary}50`,
                  }}
                >
                  <HiOutlinePhone size={18} />
                </div>
                <div>
                  <p className='text-secondary text-[10px] sm:text-[11px]'>{t('contact.phone')}</p>
                  <p className='text-white font-medium text-[12px] sm:text-[13px]'>{personalInfo.phone}</p>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ x: 10 }}
                animate={{
                  x: normalizedTilt.x * 5,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
                className='flex items-center gap-3 glass rounded-lg p-3 hoverable'
                style={{ borderColor: `${currentTheme.colors.primary}30` }}
              >
                <div
                  className='w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white'
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`,
                    boxShadow: `0 0 15px ${currentTheme.colors.accent}50`,
                  }}
                >
                  <HiOutlineLocationMarker size={18} />
                </div>
                <div>
                  <p className='text-secondary text-[10px] sm:text-[11px]'>{t('contact.location')}</p>
                  <p className='text-white font-medium text-[12px] sm:text-[13px]'>{personalInfo.location}</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className='mt-6 sm:mt-8'>
              <p className='text-white font-medium mb-3 text-[12px] sm:text-[14px]'>{t('contact.social')}:</p>
              <div className='flex gap-2 sm:gap-3'>
                {Object.entries(personalInfo.social).map(([platform, url]) => {
                  const Icon = socialIcons[platform];
                  return (
                    <motion.a
                      key={platform}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      href={url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='w-10 h-10 sm:w-11 sm:h-11 rounded-lg glass flex items-center justify-center text-white transition-colors hoverable'
                      style={{ borderColor: `${currentTheme.colors.primary}30` }}
                    >
                      {Icon && <Icon size={18} />}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            animate={{
              rotateX: normalizedTilt.y * 2,
              rotateY: normalizedTilt.x * 2,
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className='glass rounded-xl p-4 sm:p-6'
              style={{
                borderColor: `${currentTheme.colors.primary}30`,
                boxShadow: `0 0 30px ${currentTheme.glowColor}`,
              }}
            >
              <h3 className='text-white text-[16px] sm:text-[20px] font-bold mb-4 sm:mb-5'>
                {t('contact.formTitle')}
              </h3>

              <div className='space-y-3 sm:space-y-4'>
                {/* Name */}
                <div>
                  <label className='text-white font-medium mb-1.5 block text-[12px] sm:text-[13px]'>
                    {t('contact.name')}
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('contact.namePlaceholder')}
                    required
                    className='w-full py-2.5 sm:py-3 px-3 sm:px-4 placeholder:text-secondary text-white rounded-lg outline-none border-2 border-transparent transition-colors text-[12px] sm:text-[13px]'
                    style={{
                      backgroundColor: currentTheme.colors.tertiary,
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className='text-white font-medium mb-1.5 block text-[12px] sm:text-[13px]'>
                    {t('contact.email')}
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    placeholder={t('contact.emailPlaceholder')}
                    required
                    className='w-full py-2.5 sm:py-3 px-3 sm:px-4 placeholder:text-secondary text-white rounded-lg outline-none border-2 border-transparent transition-colors text-[12px] sm:text-[13px]'
                    style={{
                      backgroundColor: currentTheme.colors.tertiary,
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className='text-white font-medium mb-1.5 block text-[12px] sm:text-[13px]'>
                    {t('contact.message')}
                  </label>
                  <textarea
                    rows={3}
                    name='message'
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    required
                    className='w-full py-2.5 sm:py-3 px-3 sm:px-4 placeholder:text-secondary text-white rounded-lg outline-none border-2 border-transparent transition-colors resize-none text-[12px] sm:text-[13px]'
                    style={{
                      backgroundColor: currentTheme.colors.tertiary,
                    }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type='submit'
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='w-full py-2.5 sm:py-3 rounded-lg font-bold text-white transition-all hoverable text-[12px] sm:text-[14px]'
                  style={{
                    background: success
                      ? '#22c55e'
                      : `linear-gradient(90deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                    boxShadow: `0 0 20px ${success ? '#22c55e50' : currentTheme.glowColor}`,
                  }}
                >
                  {loading ? (
                    <span className='flex items-center justify-center gap-2'>
                      <svg className='animate-spin h-4 w-4' viewBox='0 0 24 24'>
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                          fill='none'
                        />
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        />
                      </svg>
                      {t('contact.sending')}
                    </span>
                  ) : success ? (
                    <span className='flex items-center justify-center gap-2'>
                      ✓ {t('contact.sent')}
                    </span>
                  ) : (
                    t('contact.send')
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
