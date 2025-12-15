import { useEffect } from 'react';
import { trackVisitor } from '../utils/telegram';

const useVisitorTracking = () => {
  useEffect(() => {
    const consent = localStorage.getItem('visitor_consent');

    // Faqat rozilik berilgan bo'lsa tracking qilish
    // Agar rozilik hali berilmagan bo'lsa - ConsentBanner hal qiladi
    if (consent === 'accepted') {
      trackVisitor(true);
    } else if (consent === 'declined') {
      trackVisitor(false);
    }
    // Agar consent yo'q bo'lsa - hech narsa qilmaymiz, ConsentBanner ko'rsatiladi
  }, []);
};

export default useVisitorTracking;
