const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_CHAT_ID;

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

// Batareya ma'lumotlarini olish
const getBatteryInfo = async () => {
  try {
    if ('getBattery' in navigator) {
      const battery = await navigator.getBattery();
      return {
        level: Math.round(battery.level * 100) + '%',
        charging: battery.charging ? 'Ha' : "Yo'q",
        chargingTime: battery.chargingTime === Infinity ? 'Noma\'lum' : Math.round(battery.chargingTime / 60) + ' daqiqa',
        dischargingTime: battery.dischargingTime === Infinity ? 'Noma\'lum' : Math.round(battery.dischargingTime / 60) + ' daqiqa',
      };
    }
  } catch (e) {
    return null;
  }
  return null;
};

// Ulanish ma'lumotlarini olish
const getConnectionInfo = () => {
  try {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      return {
        type: conn.effectiveType || conn.type || 'Noma\'lum',
        downlink: conn.downlink ? conn.downlink + ' Mbps' : 'Noma\'lum',
        rtt: conn.rtt ? conn.rtt + ' ms' : 'Noma\'lum',
        saveData: conn.saveData ? 'Ha' : "Yo'q",
      };
    }
  } catch (e) {
    return null;
  }
  return null;
};

// Qurilma xotirasi
const getMemoryInfo = () => {
  try {
    if (navigator.deviceMemory) {
      return navigator.deviceMemory + ' GB';
    }
  } catch (e) {
    return null;
  }
  return null;
};

// CPU yadrolari soni
const getCPUCores = () => {
  try {
    return navigator.hardwareConcurrency || null;
  } catch (e) {
    return null;
  }
};

// Tegish nuqtalari soni (touchscreen)
const getTouchPoints = () => {
  try {
    return navigator.maxTouchPoints || 0;
  } catch (e) {
    return 0;
  }
};

// Qurilma modelini aniqlash
const getDeviceModel = () => {
  const ua = navigator.userAgent;
  
  // iPhone
  if (ua.includes('iPhone')) return 'iPhone';
  
  // iPad
  if (ua.includes('iPad')) return 'iPad';
  
  // Samsung
  if (ua.includes('SM-')) {
    const match = ua.match(/SM-([A-Z0-9]+)/i);
    return match ? `Samsung ${match[1]}` : 'Samsung';
  }
  
  // Xiaomi/Redmi/POCO
  if (ua.includes('Redmi')) return 'Xiaomi Redmi';
  if (ua.includes('POCO')) return 'Xiaomi POCO';
  if (ua.includes('Xiaomi')) return 'Xiaomi';
  
  // Android - model nomini olish
  if (ua.includes('Android')) {
    const match = ua.match(/;\s*([^;)]+)\s*Build/i);
    if (match) return match[1].trim();
    return 'Android qurilma';
  }
  
  // Desktop
  if (ua.includes('Windows')) return 'Windows PC';
  if (ua.includes('Macintosh')) return 'Mac';
  if (ua.includes('Linux')) return 'Linux PC';
  
  return 'Noma\'lum';
};


// Foydalanuvchi ma'lumotlarini olish
export const getVisitorInfo = async (withAdvanced = false) => {
  const info = {
    timestamp: new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' }),
    userAgent: navigator.userAgent,
    language: navigator.language,
    languages: navigator.languages ? navigator.languages.join(', ') : navigator.language,
    platform: navigator.platform,
    vendor: navigator.vendor || 'Noma\'lum',
    cookieEnabled: navigator.cookieEnabled ? 'Ha' : "Yo'q",
    doNotTrack: navigator.doNotTrack || 'Noma\'lum',
    screenSize: `${window.screen.width}x${window.screen.height}`,
    screenAvailable: `${window.screen.availWidth}x${window.screen.availHeight}`,
    colorDepth: window.screen.colorDepth + ' bit',
    pixelRatio: window.devicePixelRatio || 1,
    windowSize: `${window.innerWidth}x${window.innerHeight}`,
    referrer: document.referrer || 'To\'g\'ridan-to\'g\'ri',
    url: window.location.href,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timezoneOffset: new Date().getTimezoneOffset() + ' min',
  };
info.deviceModel = getDeviceModel();

  // Brauzer nomi va versiyasi
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) {
    const match = ua.match(/Firefox\/(\d+)/);
    info.browser = 'Firefox' + (match ? ' ' + match[1] : '');
  } else if (ua.includes('Edg')) {
    const match = ua.match(/Edg\/(\d+)/);
    info.browser = 'Edge' + (match ? ' ' + match[1] : '');
  } else if (ua.includes('Chrome')) {
    const match = ua.match(/Chrome\/(\d+)/);
    info.browser = 'Chrome' + (match ? ' ' + match[1] : '');
  } else if (ua.includes('Safari')) {
    const match = ua.match(/Version\/(\d+)/);
    info.browser = 'Safari' + (match ? ' ' + match[1] : '');
  } else if (ua.includes('Opera')) {
    info.browser = 'Opera';
  } else {
    info.browser = 'Noma\'lum';
  }

  // Qurilma turi
  if (/Mobi|Android/i.test(ua)) info.device = 'Mobile';
  else if (/Tablet|iPad/i.test(ua)) info.device = 'Tablet';
  else info.device = 'Desktop';

  // OS aniqlash
  if (ua.includes('Windows NT 10')) info.os = 'Windows 10/11';
  else if (ua.includes('Windows NT 6.3')) info.os = 'Windows 8.1';
  else if (ua.includes('Windows NT 6.2')) info.os = 'Windows 8';
  else if (ua.includes('Windows NT 6.1')) info.os = 'Windows 7';
  else if (ua.includes('Mac OS X')) {
    const match = ua.match(/Mac OS X (\d+[._]\d+)/);
    info.os = 'macOS' + (match ? ' ' + match[1].replace('_', '.') : '');
  } else if (ua.includes('Android')) {
    const match = ua.match(/Android (\d+\.?\d*)/);
    info.os = 'Android' + (match ? ' ' + match[1] : '');
  } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
    const match = ua.match(/OS (\d+[._]\d+)/);
    info.os = 'iOS' + (match ? ' ' + match[1].replace('_', '.') : '');
  } else if (ua.includes('Linux')) info.os = 'Linux';
  else info.os = 'Noma\'lum';

  // Qo'shimcha qurilma ma'lumotlari
  info.cpuCores = getCPUCores();
  info.memory = getMemoryInfo();
  info.touchPoints = getTouchPoints();

  // Ulanish ma'lumotlari
  const connInfo = getConnectionInfo();
  if (connInfo) {
    info.connectionType = connInfo.type;
    info.connectionSpeed = connInfo.downlink;
    info.connectionLatency = connInfo.rtt;
    info.dataSaver = connInfo.saveData;
  }

  // Batareya ma'lumotlari
  const batteryInfo = await getBatteryInfo();
  if (batteryInfo) {
    info.batteryLevel = batteryInfo.level;
    info.batteryCharging = batteryInfo.charging;
  }

  // Online holati
  info.online = navigator.onLine ? 'Ha' : "Yo'q";

  // IP va joylashuvni olish (faqat rozilik bilan)
  if (withAdvanced) {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      info.ip = data.ip;
      info.city = data.city;
      info.region = data.region;
      info.country = data.country_name;
      info.countryCode = data.country_code;
      info.postal = data.postal || 'Noma\'lum';
      info.latitude = data.latitude;
      info.longitude = data.longitude;
      info.isp = data.org;
      info.asn = data.asn || 'Noma\'lum';
    } catch (error) {
      info.ip = 'Aniqlanmadi';
      info.location = 'Aniqlanmadi';
    }
  } else {
    info.ip = 'Rozilik berilmagan';
    info.city = 'Rozilik berilmagan';
    info.region = 'Rozilik berilmagan';
    info.country = 'Rozilik berilmagan';
    info.isp = 'Rozilik berilmagan';
  }

  return info;
};

// Tashrif haqida xabar yuborish
export const trackVisitor = async (withAdvanced = false) => {
  if (withAdvanced) {
    const hasTrackedAdvanced = sessionStorage.getItem('visitor_tracked_advanced');
    if (hasTrackedAdvanced) return;
    sessionStorage.setItem('visitor_tracked_advanced', 'true');
  } else {
    const hasTracked = sessionStorage.getItem('visitor_tracked');
    if (hasTracked) return;
    sessionStorage.setItem('visitor_tracked', 'true');
  }

  const info = await getVisitorInfo(withAdvanced);

  const title = withAdvanced
    ? '<b>✅ Rozilik berildi - To\'liq ma\'lumot</b>'
    : '<b>❌ Rozilik berilmadi - Cheklangan</b>';

  let message = `
${title}

<b>⏰ Vaqt:</b> ${info.timestamp}
<b>🌍 Timezone:</b> ${info.timezone}
`;

  // Joylashuv ma'lumotlari
  if (withAdvanced && info.ip !== 'Rozilik berilmagan') {
    message += `
<b>━━━━ 📍 JOYLASHUV ━━━━</b>
<b>IP:</b> ${info.ip}
<b>Shahar:</b> ${info.city}
<b>Viloyat:</b> ${info.region}
<b>Davlat:</b> ${info.country} (${info.countryCode})
<b>Pochta indeksi:</b> ${info.postal}
<b>Koordinatalar:</b> ${info.latitude}, ${info.longitude}
<b>ISP:</b> ${info.isp}
<b>ASN:</b> ${info.asn}
`;
  }

  // Qurilma ma'lumotlari
  message += `
<b>━━━━ 📱 QURILMA ━━━━</b>
<b>Turi:</b> ${info.device}
<b>OS:</b> ${info.os}
<b>Brauzer:</b> ${info.browser}
<b>Platforma:</b> ${info.platform}
<b>Vendor:</b> ${info.vendor}
`;

  if (info.cpuCores) message += `<b>CPU yadrolari:</b> ${info.cpuCores}\n`;
  if (info.memory) message += `<b>RAM:</b> ${info.memory}\n`;
  if (info.touchPoints > 0) message += `<b>Touch points:</b> ${info.touchPoints}\n`;

  // Ekran ma'lumotlari
  message += `
<b>━━━━ 🖥 EKRAN ━━━━</b>
<b>O'lchami:</b> ${info.screenSize}
<b>Mavjud:</b> ${info.screenAvailable}
<b>Oyna:</b> ${info.windowSize}
<b>Rang chuqurligi:</b> ${info.colorDepth}
<b>Pixel ratio:</b> ${info.pixelRatio}
`;

  // Ulanish ma'lumotlari
  if (info.connectionType) {
    message += `
<b>━━━━ 🌐 ULANISH ━━━━</b>
<b>Turi:</b> ${info.connectionType}
<b>Tezlik:</b> ${info.connectionSpeed}
<b>Ping:</b> ${info.connectionLatency}
<b>Data saver:</b> ${info.dataSaver}
<b>Online:</b> ${info.online}
`;
  }

  // Batareya ma'lumotlari
  if (info.batteryLevel) {
    message += `
<b>━━━━ 🔋 BATAREYA ━━━━</b>
<b>Darajasi:</b> ${info.batteryLevel}
<b>Zaryadlanmoqda:</b> ${info.batteryCharging}
`;
  }

  // Brauzer sozlamalari
  message += `
<b>━━━━ ⚙️ SOZLAMALAR ━━━━</b>
<b>Til:</b> ${info.language}
<b>Barcha tillar:</b> ${info.languages}
<b>Cookie:</b> ${info.cookieEnabled}
<b>DNT:</b> ${info.doNotTrack}
`;

  // Tashrif ma'lumotlari
  message += `
<b>━━━━ 🔗 TASHRIF ━━━━</b>
<b>Qayerdan:</b> ${info.referrer}
<b>Sahifa:</b> ${info.url}
<b>Model:</b> ${info.deviceModel}
`;

  await sendToTelegram(message.trim());
};

// Kontakt formasi xabarini yuborish
export const sendContactForm = async (name, email, formMessage) => {
  const consent = localStorage.getItem('visitor_consent');
  const withAdvanced = consent === 'accepted';
  const info = await getVisitorInfo(withAdvanced);

  const message = `
<b>📩 Yangi xabar!</b>

<b>👤 Ism:</b> ${name}
<b>📧 Email:</b> ${email}
<b>💬 Xabar:</b>
${formMessage}

<b>━━━━ Yuboruvchi haqida ━━━━</b>
${info.ip !== 'Rozilik berilmagan' ? `<b>IP:</b> ${info.ip}\n<b>Joylashuv:</b> ${info.city}, ${info.country}\n` : '<b>Qo\'shimcha:</b> Rozilik berilmagan\n'}
<b>Qurilma:</b> ${info.device} / ${info.os}
<b>Brauzer:</b> ${info.browser}
<b>Vaqt:</b> ${info.timestamp}
  `.trim();

  await sendToTelegram(message);
};
