import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChat, HiX, HiPaperAirplane } from 'react-icons/hi';
import { FaRobot } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { usePanel, PANELS } from '../context/PanelContext';
import { personalInfo } from '../constants';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const greetings = {
  uz: `Assalomu alaykum! 👋 Men ${personalInfo.name}ning virtual yordamchisiman. Sizga qanday yordam bera olaman?`,
  en: `Hello! 👋 I'm ${personalInfo.name}'s virtual assistant. How can I help you?`,
  ru: `Привет! 👋 Я виртуальный помощник ${personalInfo.name}. Чем могу помочь?`,
  tr: `Merhaba! 👋 Ben ${personalInfo.name}'ın sanal asistanıyım. Size nasıl yardımcı olabilirim?`,
  de: `Hallo! 👋 Ich bin der virtuelle Assistent von ${personalInfo.name}. Wie kann ich Ihnen helfen?`,
};

const systemPrompt = `Sen ${personalInfo.name} ${personalInfo.surname}ning shaxsiy portfolio saytidagi AI yordamchisisan.

${personalInfo.name} haqida ma'lumot:
- Kasbi: ${personalInfo.title}
- Joylashuv: ${personalInfo.location}
- Email: ${personalInfo.email}
- Bio: ${personalInfo.bio}

Sening vazifang:
1. Tashrif buyuruvchilarga samimiy va professional tarzda yordam berish
2. ${personalInfo.name}ning ko'nikmalari va loyihalari haqida ma'lumot berish
3. Hamkorlik va bog'lanish haqida ma'lumot berish
4. Texnik savolarga javob berish

Qoidalar:
- Qisqa va aniq javoblar ber (2-3 jumla)
- Samimiy va professional bo'l
- Agar bilmasang, email orqali bog'lanishni tavsiya qil
- O'zbek, ingliz, rus, turk va nemis tillarida javob bera olasan - foydalanuvchi qaysi tilda yozsa, o'sha tilda javob ber`;

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { currentTheme } = useTheme();
  const { language } = useLanguage();
  const { isPanelOpen, togglePanel, closePanel, activePanel } = usePanel();

  const isOpen = isPanelOpen(PANELS.AI_CHAT);
  const shouldHideButton = activePanel && activePanel !== PANELS.AI_CHAT;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setMessages([
        {
          role: 'assistant',
          content: greetings[language] || greetings.uz,
        },
      ]);
      setHasGreeted(true);
    }
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen, hasGreeted, language]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            userMessage,
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (data.choices && data.choices[0]) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.choices[0].message.content,
          },
        ]);
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.error('AI Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: language === 'uz'
            ? "Kechirasiz, xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
            : "Sorry, an error occurred. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button - always visible */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => togglePanel(PANELS.AI_CHAT)}
        className='fixed bottom-6 right-[4.5rem] z-50 w-11 h-11 rounded-full flex items-center justify-center text-white hoverable'
        style={{
          background: `linear-gradient(135deg, ${currentTheme.colors.secondary}, ${currentTheme.colors.primary})`,
          boxShadow: `0 0 20px ${currentTheme.colors.secondary}50`,
        }}
      >
        <HiChat size={20} />
        {!hasGreeted && (
          <span
            className='absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full animate-pulse'
            style={{ backgroundColor: currentTheme.colors.accent }}
          />
        )}
      </motion.button>

      {/* Chat Panel */}
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

            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className='fixed bottom-4 right-3 left-3 sm:left-auto sm:bottom-6 sm:right-6 z-50 sm:w-[320px] h-[70vh] max-h-[450px] rounded-xl overflow-hidden flex flex-col'
              style={{
                backgroundColor: currentTheme.colors.backgroundAlt,
                boxShadow: `0 0 40px ${currentTheme.glowColor}`,
                border: `1px solid ${currentTheme.colors.primary}30`,
              }}
            >
              {/* Header */}
              <div
                className='p-3 flex items-center justify-between'
                style={{
                  background: `linear-gradient(90deg, ${currentTheme.colors.primary}30, ${currentTheme.colors.secondary}30)`,
                  borderBottom: `1px solid ${currentTheme.colors.primary}30`,
                }}
              >
                <div className='flex items-center gap-2'>
                  <div
                    className='w-8 h-8 rounded-full flex items-center justify-center'
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                      boxShadow: `0 0 12px ${currentTheme.glowColor}`,
                    }}
                  >
                    <FaRobot size={14} className='text-white' />
                  </div>
                  <div>
                    <h3 className='text-white font-bold text-[11px]'>AI Yordamchi</h3>
                    <p className='text-[9px]' style={{ color: currentTheme.colors.secondary }}>
                      Online
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closePanel}
                  className='w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors hoverable'
                  style={{ backgroundColor: `${currentTheme.colors.primary}20` }}
                >
                  <HiX size={14} />
                </motion.button>
              </div>

              {/* Messages */}
              <div className='flex-1 overflow-y-auto p-3 space-y-2'>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-2 rounded-lg text-[11px] leading-relaxed ${
                        message.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
                      }`}
                      style={{
                        backgroundColor:
                          message.role === 'user'
                            ? currentTheme.colors.primary
                            : currentTheme.colors.tertiary,
                        color: 'white',
                        boxShadow:
                          message.role === 'user'
                            ? `0 0 10px ${currentTheme.colors.primary}40`
                            : 'none',
                      }}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className='flex justify-start'
                  >
                    <div
                      className='p-2 rounded-lg rounded-bl-sm'
                      style={{ backgroundColor: currentTheme.colors.tertiary }}
                    >
                      <div className='flex gap-1'>
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            animate={{ y: [0, -3, 0] }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                            className='w-1.5 h-1.5 rounded-full'
                            style={{ backgroundColor: currentTheme.colors.primary }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                className='p-2'
                style={{
                  borderTop: `1px solid ${currentTheme.colors.primary}30`,
                  backgroundColor: currentTheme.colors.background,
                }}
              >
                <div
                  className='flex items-center gap-2 p-1.5 rounded-lg'
                  style={{ backgroundColor: currentTheme.colors.tertiary }}
                >
                  <input
                    ref={inputRef}
                    type='text'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={language === 'uz' ? 'Xabar yozing...' : 'Type a message...'}
                    className='flex-1 bg-transparent text-white text-[11px] outline-none px-2 placeholder:text-white/40'
                    disabled={isLoading}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className='w-7 h-7 rounded-lg flex items-center justify-center text-white transition-all disabled:opacity-50 hoverable'
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                      boxShadow: input.trim() ? `0 0 10px ${currentTheme.glowColor}` : 'none',
                    }}
                  >
                    <HiPaperAirplane size={12} className='rotate-90' />
                  </motion.button>
                </div>
                <p className='text-[8px] text-center mt-1' style={{ color: currentTheme.colors.textSecondary }}>
                  Powered by Groq AI
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
