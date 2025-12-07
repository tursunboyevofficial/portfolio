const BOT_TOKEN = '6191567729:AAEsvrpMaVq8jRIoj_acrDOV3SpxDKjyR_o';
const CHAT_ID = '5291425408';

// Telegram botga xabar yuborish
export const sendToTelegram = async (message) => {
  if (!CHAT_ID) {
    console.warn('Telegram CHAT_ID sozlanmagan');
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });
  } catch (error) {
    console.error('Telegram xabar yuborishda xato:', error);
  }
};

// Foydalanuvchi ma'lumotlarini olish
export const getVisitorInfo = async () => {
  const info = {
    timestamp: new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    windowSize: `${window.innerWidth}x${window.innerHeight}`,
    referrer: document.referrer || 'To\'g\'ridan-to\'g\'ri',
    url: window.location.href,
  };

  // Brauzer nomi
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) info.browser = 'Firefox';
  else if (ua.includes('Chrome')) info.browser = 'Chrome';
  else if (ua.includes('Safari')) info.browser = 'Safari';
  else if (ua.includes('Edge')) info.browser = 'Edge';
  else if (ua.includes('Opera')) info.browser = 'Opera';
  else info.browser = 'Noma\'lum';

  // Qurilma turi
  if (/Mobi|Android/i.test(ua)) info.device = 'Mobile';
  else if (/Tablet|iPad/i.test(ua)) info.device = 'Tablet';
  else info.device = 'Desktop';

  // IP va joylashuvni olish
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    info.ip = data.ip;
    info.city = data.city;
    info.region = data.region;
    info.country = data.country_name;
    info.isp = data.org;
  } catch (error) {
    info.ip = 'Aniqlanmadi';
    info.location = 'Aniqlanmadi';
  }

  return info;
};

// Tashrif haqida xabar yuborish
export const trackVisitor = async () => {
  const info = await getVisitorInfo();

  const message = `
<b>Yangi tashrif!</b>

<b>Vaqt:</b> ${info.timestamp}
<b>IP:</b> ${info.ip}
<b>Joylashuv:</b> ${info.city}, ${info.region}, ${info.country}
<b>ISP:</b> ${info.isp}

<b>Qurilma:</b> ${info.device}
<b>Brauzer:</b> ${info.browser}
<b>Platforma:</b> ${info.platform}
<b>Til:</b> ${info.language}

<b>Ekran:</b> ${info.screenSize}
<b>Oyna:</b> ${info.windowSize}

<b>Qayerdan:</b> ${info.referrer}
<b>Sahifa:</b> ${info.url}
  `.trim();

  await sendToTelegram(message);
};

// Kontakt formasi xabarini yuborish
export const sendContactForm = async (name, email, formMessage) => {
  const info = await getVisitorInfo();

  const message = `
<b>Yangi xabar!</b>

<b>Ism:</b> ${name}
<b>Email:</b> ${email}
<b>Xabar:</b>
${formMessage}

<b>IP:</b> ${info.ip}
<b>Joylashuv:</b> ${info.city}, ${info.country}
<b>Qurilma:</b> ${info.device} / ${info.browser}
<b>Vaqt:</b> ${info.timestamp}
  `.trim();

  await sendToTelegram(message);
};
