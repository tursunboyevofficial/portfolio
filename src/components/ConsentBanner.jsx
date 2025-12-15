import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { trackVisitor } from '../utils/telegram';
import { FiShield, FiMonitor, FiMapPin, FiGlobe, FiClock, FiChevronDown, FiChevronUp, FiCheck, FiX } from 'react-icons/fi';

const ConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const consent = localStorage.getItem('visitor_consent');
    if (!consent) {
      // Biroz kechikish bilan ko'rsatish
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = async () => {
    localStorage.setItem('visitor_consent', 'accepted');
    setIsVisible(false);
    await trackVisitor(true);
  };

  const handleDecline = () => {
    localStorage.setItem('visitor_consent', 'declined');
    setIsVisible(false);
    trackVisitor(false);
  };

  const dataItems = [
    // {
    //   icon: FiMonitor,
    //   title: "Qurilma ma'lumotlari",
    //   description: "Brauzer turi, operatsion tizim, ekran o'lchami",
    // },
    // {
    //   icon: FiMapPin,
    //   title: "Joylashuv",
    //   description: "IP manzil, shahar, davlat (taxminiy)",
    // },
    // {
    //   icon: FiGlobe,
    //   title: "Tarmoq ma'lumotlari",
    //   description: "Internet provayder (ISP)",
    // },
    {
      icon: FiClock,
      title: "Tashrif vaqti",
      description: "Saytga kirgan vaqtingiz",
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={() => {}} // Prevent closing on backdrop click
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div
              className="relative w-full max-w-lg rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.colors.tertiary} 0%, ${currentTheme.colors.background} 100%)`,
                border: `1px solid ${currentTheme.colors.primary}40`,
                boxShadow: `0 0 40px ${currentTheme.colors.primary}30, 0 0 80px ${currentTheme.colors.primary}10`,
              }}
            >
              {/* Glow effect */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
                style={{ background: currentTheme.colors.primary }}
              />
              <div
                className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-3xl opacity-20"
                style={{ background: currentTheme.colors.secondary }}
              />

              {/* Content */}
              <div className="relative p-6 md:p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: `${currentTheme.colors.primary}20`,
                      border: `1px solid ${currentTheme.colors.primary}40`
                    }}
                  >
                    <FiShield
                      className="w-6 h-6"
                      style={{ color: currentTheme.colors.primary }}
                    />
                  </div>
                  <div>
                    <h2
                      className="text-xl font-bold"
                      style={{ color: currentTheme.colors.text }}
                    >
                      Maxfiylik va Rozilik
                    </h2>
                    <p
                      className="text-sm"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      Shaffoflik biz uchun muhim
                    </p>
                  </div>
                </div>

                {/* Main text */}
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: currentTheme.colors.textSecondary }}
                >
                  Assalomu alaykum! Saytimizni yaxshilash va tashriflarni tahlil qilish maqsadida
                  quyidagi ma'lumotlarni yig'ishga rozilik so'raymiz:
                </p>

                {/* Data items preview */}
                <div
                  className="rounded-xl p-4 mb-4"
                  style={{
                    background: `${currentTheme.colors.background}80`,
                    border: `1px solid ${currentTheme.colors.primary}20`
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {dataItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <item.icon
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: currentTheme.colors.primary }}
                        />
                        <span
                          className="text-xs"
                          style={{ color: currentTheme.colors.text }}
                        >
                          {item.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expandable details */}
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-2 text-sm mb-4 transition-colors hover:opacity-80"
                  style={{ color: currentTheme.colors.primary }}
                >
                  {showDetails ? <FiChevronUp /> : <FiChevronDown />}
                  {showDetails ? "Kamroq ko'rsatish" : "Batafsil ma'lumot"}
                </button>

                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="rounded-xl p-4 mb-4 space-y-3"
                        style={{
                          background: `${currentTheme.colors.background}60`,
                          border: `1px solid ${currentTheme.colors.primary}15`
                        }}
                      >
                        {dataItems.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div
                              className="p-2 rounded-lg mt-0.5"
                              style={{ background: `${currentTheme.colors.primary}15` }}
                            >
                              <item.icon
                                className="w-4 h-4"
                                style={{ color: currentTheme.colors.primary }}
                              />
                            </div>
                            <div>
                              <p
                                className="text-sm font-medium"
                                style={{ color: currentTheme.colors.text }}
                              >
                                {item.title}
                              </p>
                              <p
                                className="text-xs"
                                style={{ color: currentTheme.colors.textSecondary }}
                              >
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}

                        <div
                          className="pt-3 mt-3 text-xs"
                          style={{
                            borderTop: `1px solid ${currentTheme.colors.primary}20`,
                            color: currentTheme.colors.textSecondary
                          }}
                        >
                          <p className="mb-2">
                            <strong style={{ color: currentTheme.colors.text }}>Nima uchun?</strong> Bu ma'lumotlar sayt statistikasi va xavfsizlik uchun ishlatiladi.
                          </p>
                          <p>
                            <strong style={{ color: currentTheme.colors.text }}>Muhim:</strong> Ma'lumotlar uchinchi tomonlarga sotilmaydi yoki uzatilmaydi.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="flex gap-3">
                  {/* <button
                    onClick={handleDecline}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: `${currentTheme.colors.tertiary}`,
                      border: `1px solid ${currentTheme.colors.primary}30`,
                      color: currentTheme.colors.textSecondary
                    }}
                  >
                    <FiX className="w-4 h-4" />
                    Rad etaman
                  </button> */}
                  <button
                    onClick={handleAccept}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.colors.primary} 0%, ${currentTheme.colors.secondary} 100%)`,
                      color: '#ffffff',
                      boxShadow: `0 4px 20px ${currentTheme.colors.primary}40`
                    }}
                  >
                    <FiCheck className="w-4 h-4" />
                    Roziman
                  </button>
                </div>

                {/* Footer note */}
                <p
                  className="text-xs text-center mt-4"
                  style={{ color: currentTheme.colors.textSecondary }}
                >
                  Rad etsangiz ham saytdan foydalanishingiz mumkin
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConsentBanner;
