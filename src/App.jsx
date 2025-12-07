import { Navbar, Hero, About, Skills, Projects, Contact, Footer, CustomCursor, SettingsPanel, AIChat } from './components';
import { StarsCanvas } from './canvas';
import useVisitorTracking from './hooks/useVisitorTracking';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { PanelProvider } from './context/PanelContext';

function AppContent() {
  // Tashrifchilarni kuzatish
  useVisitorTracking();

  return (
    <div className='relative z-0 bg-theme transition-colors duration-500 overflow-x-hidden w-full max-w-full'>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Settings Panel */}
      <SettingsPanel />

      {/* AI Chat */}
      <AIChat />

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        <Hero />
      </div>

      {/* About Section */}
      <About />

      {/* Skills & Experience Section */}
      <Skills />

      {/* Projects Section */}
      <div className='relative z-0'>
        <Projects />
        <StarsCanvas />
      </div>

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PanelProvider>
          <AppContent />
        </PanelProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
