import { useEffect } from 'react';
import { trackVisitor } from '../utils/telegram';

const useVisitorTracking = () => {
  useEffect(() => {
    // Faqat bir marta tracking qilish (session davomida)
    const hasTracked = sessionStorage.getItem('visitor_tracked');

    if (!hasTracked) {
      trackVisitor();
      sessionStorage.setItem('visitor_tracked', 'true');
    }
  }, []);
};

export default useVisitorTracking;
