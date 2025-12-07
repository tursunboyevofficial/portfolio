import { createContext, useContext, useState, useEffect } from 'react';

const PanelContext = createContext();

export const PANELS = {
  NONE: null,
  SETTINGS: 'settings',
  AI_CHAT: 'ai_chat',
  MOBILE_MENU: 'mobile_menu',
};

export const PanelProvider = ({ children }) => {
  const [activePanel, setActivePanel] = useState(PANELS.NONE);

  // Lock body scroll when any panel is open
  useEffect(() => {
    if (activePanel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activePanel]);

  const openPanel = (panel) => {
    setActivePanel(panel);
  };

  const closePanel = () => {
    setActivePanel(PANELS.NONE);
  };

  const togglePanel = (panel) => {
    if (activePanel === panel) {
      closePanel();
    } else {
      openPanel(panel);
    }
  };

  const isPanelOpen = (panel) => activePanel === panel;
  const isAnyPanelOpen = activePanel !== PANELS.NONE;

  return (
    <PanelContext.Provider
      value={{
        activePanel,
        openPanel,
        closePanel,
        togglePanel,
        isPanelOpen,
        isAnyPanelOpen,
        PANELS,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
};

export const usePanel = () => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error('usePanel must be used within a PanelProvider');
  }
  return context;
};
