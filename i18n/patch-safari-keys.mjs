/** Inject/update safari.* keys into every language pack */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { languages } from "./languages.mjs";
import { en } from "./_keys.mjs";

const packsDir = join(dirname(fileURLToPath(import.meta.url)), "packs");
const KEYS = [
  "safari.title",
  "safari.body",
  "safari.point1",
  "safari.point2",
  "safari.point3",
  "safari.help",
  "safari.note",
  "safari.btn",
];

const COPY = {
  en: Object.fromEntries(KEYS.map((k) => [k, en[k]])),
  "zh-CN": {
    "safari.title": "用 GuardLine 守护你的 WhatsApp",
    "safari.body":
      "GuardLine 帮你在盗号发生前先加固，一旦被锁也能按流程快速夺回。",
    "safari.point1": "30 篇长文：验证码、两步验证 PIN、关联设备、钓鱼与夺回",
    "safari.point2": "推荐防护工具 + 清晰逐步检查清单",
    "safari.point3": "20 篇国际诈骗通报，帮你提前识破新话术",
    "safari.help":
      "请用 Safari 打开：操作更顺畅，色彩与观感更完整，读指南更轻松。",
    "safari.note": "在 Safari 中打开后，网站即可正常运行，并且此提示会保持隐藏。",
    "safari.btn": "使用 Safari 浏览器打开",
  },
  "zh-TW": {
    "safari.title": "用 GuardLine 守護你的 WhatsApp",
    "safari.body":
      "GuardLine 幫你在盜號發生前先加固，一旦被鎖也能依流程快速奪回。",
    "safari.point1": "30 篇長文：驗證碼、兩步驟驗證 PIN、已連結裝置、釣魚與奪回",
    "safari.point2": "推薦防護工具 + 清晰逐步檢查清單",
    "safari.point3": "20 篇國際詐騙通報，幫你提前識破新話術",
    "safari.help":
      "請用 Safari 開啟：操作更順暢，色彩與觀感更完整，讀指南更輕鬆。",
    "safari.note": "在 Safari 中開啟後，網站即可正常運作，並且此提示會保持隱藏。",
    "safari.btn": "使用 Safari 瀏覽器開啟",
  },
  ms: {
    "safari.title": "Lindungi WhatsApp anda dengan GuardLine",
    "safari.body":
      "GuardLine membantu anda menghentikan rampasan akaun sebelum ia bermula—dan pulih pantas jika anda sudah dikunci.",
    "safari.point1": "30 panduan panjang: kod, PIN 2FA, peranti dipautkan, phishing & pemulihan",
    "safari.point2": "Alat perlindungan disyorkan dengan senarai semak langkah demi langkah",
    "safari.point3": "20 amaran penipuan dunia supaya anda kenali tipu daya baharu awal",
    "safari.help":
      "Buka dalam Safari untuk kawalan lebih lancar dan pengalaman baca lebih berwarna.",
    "safari.note":
      "Selepas dibuka dalam Safari, laman web berjalan seperti biasa dan notis ini kekal tersembunyi.",
    "safari.btn": "Buka dengan Safari",
  },
  id: {
    "safari.title": "Lindungi WhatsApp Anda dengan GuardLine",
    "safari.body":
      "GuardLine membantu menghentikan pembajakan akun sebelum terjadi—dan pulih cepat jika Anda sudah terkunci.",
    "safari.point1": "30 panduan panjang: kode, PIN 2FA, perangkat tertaut, phishing & pemulihan",
    "safari.point2": "Alat perlindungan yang direkomendasikan dengan checklist langkah demi langkah",
    "safari.point3": "20 peringatan penipuan dunia agar Anda mengenali tipu daya baru lebih awal",
    "safari.help":
      "Buka di Safari untuk kontrol lebih mulus dan pengalaman membaca lebih berwarna.",
    "safari.note":
      "Setelah dibuka di Safari, situs berjalan normal dan pemberitahuan ini tetap tersembunyi.",
    "safari.btn": "Buka dengan Safari",
  },
  ja: {
    "safari.title": "GuardLineでWhatsAppを守る",
    "safari.body":
      "GuardLineは乗っ取りを未然に防ぎ、すでにロックされても素早く取り戻せるようサポートします。",
    "safari.point1": "詳説30本：確認コード、2FA PIN、リンク済み端末、フィッシングと復旧",
    "safari.point2": "おすすめ保護ツールと分かりやすいチェックリスト",
    "safari.point3": "世界の詐欺アラート20件で新しい手口を早めに把握",
    "safari.help":
      "Safariで開くと操作がスムーズで、色彩も豊かになりガイドが読みやすくなります。",
    "safari.note":
      "Safariで開いた後はサイトが正常に動作し、この案内は表示されなくなります。",
    "safari.btn": "Safariで開く",
  },
  ko: {
    "safari.title": "GuardLine으로 WhatsApp을 지키세요",
    "safari.body":
      "GuardLine은 계정 탈취를 미리 막고, 이미 잠겼다면 빠르게 복구하도록 돕습니다.",
    "safari.point1": "상세 가이드 30편: 코드, 2FA PIN, 연결 기기, 피싱과 복구",
    "safari.point2": "추천 보호 도구와 단계별 체크리스트",
    "safari.point3": "세계 사기 경보 20건으로 새 수법을 일찍 알아차리기",
    "safari.help":
      "Safari로 열면 조작이 더 부드럽고 색감이 풍부해 가이드를 읽기 쉽습니다.",
    "safari.note":
      "Safari에서 열면 사이트가 정상 작동하며 이 안내는 계속 숨겨집니다.",
    "safari.btn": "Safari로 열기",
  },
  es: {
    "safari.title": "Protege tu WhatsApp con GuardLine",
    "safari.body":
      "GuardLine te ayuda a frenar robos de cuenta antes de que pasen—y a recuperar rápido si ya estás bloqueado.",
    "safari.point1": "30 guías largas: códigos, PIN 2FA, dispositivos vinculados, phishing y recuperación",
    "safari.point2": "Herramientas recomendadas con listas de pasos claras",
    "safari.point3": "20 alertas mundiales de estafas para reconocer trucos nuevos a tiempo",
    "safari.help":
      "Ábrelo en Safari para controles más fluidos y una lectura más colorida.",
    "safari.note":
      "Cuando abras esta página en Safari, el sitio funciona con normalidad y este aviso permanece oculto.",
    "safari.btn": "Abrir con Safari",
  },
  fr: {
    "safari.title": "Protégez votre WhatsApp avec GuardLine",
    "safari.body":
      "GuardLine vous aide à stopper les prises de contrôle avant qu’elles n’arrivent—et à récupérer vite si vous êtes déjà bloqué.",
    "safari.point1": "30 guides détaillés : codes, PIN 2FA, appareils liés, phishing et récupération",
    "safari.point2": "Outils recommandés avec checklists étape par étape",
    "safari.point3": "20 alertes d’arnaques mondiales pour repérer tôt les nouveaux pièges",
    "safari.help":
      "Ouvrez dans Safari pour des contrôles plus fluides et une lecture plus colorée.",
    "safari.note":
      "Une fois ouverte dans Safari, le site fonctionne normalement et ce message reste masqué.",
    "safari.btn": "Ouvrir avec Safari",
  },
  de: {
    "safari.title": "Schützen Sie WhatsApp mit GuardLine",
    "safari.body":
      "GuardLine hilft, Kontoübernahmen zu stoppen—und schnell zurückzugewinnen, wenn Sie schon gesperrt sind.",
    "safari.point1": "30 Langguides: Codes, 2FA-PIN, verknüpfte Geräte, Phishing & Wiederherstellung",
    "safari.point2": "Empfohlene Schutz-Tools mit klaren Checklisten",
    "safari.point3": "20 Welt-Betrugswarnungen, um neue Tricks früh zu erkennen",
    "safari.help":
      "In Safari öffnen für flüssigere Bedienung und ein farbigeres Leseerlebnis.",
    "safari.note":
      "Nach dem Öffnen in Safari funktioniert die Website normal und dieser Hinweis bleibt ausgeblendet.",
    "safari.btn": "Mit Safari öffnen",
  },
  "pt-BR": {
    "safari.title": "Proteja seu WhatsApp com o GuardLine",
    "safari.body":
      "O GuardLine ajuda a impedir invasões antes que aconteçam—e a recuperar rápido se você já estiver bloqueado.",
    "safari.point1": "30 guias longos: códigos, PIN 2FA, dispositivos vinculados, phishing e recuperação",
    "safari.point2": "Ferramentas recomendadas com checklists passo a passo",
    "safari.point3": "20 alertas mundiais de golpes para reconhecer novos truques cedo",
    "safari.help":
      "Abra no Safari para controles mais fluidos e uma leitura mais colorida.",
    "safari.note":
      "Depois de abrir no Safari, o site funciona normalmente e este aviso permanece oculto.",
    "safari.btn": "Abrir com Safari",
  },
  "pt-PT": {
    "safari.title": "Proteja o seu WhatsApp com o GuardLine",
    "safari.body":
      "O GuardLine ajuda a impedir tomadas de conta antes de acontecerem—e a recuperar depressa se já estiver bloqueado.",
    "safari.point1": "30 guias longos: códigos, PIN 2FA, dispositivos ligados, phishing e recuperação",
    "safari.point2": "Ferramentas recomendadas com checklists passo a passo",
    "safari.point3": "20 alertas mundiais de burlas para reconhecer novos truques cedo",
    "safari.help":
      "Abra no Safari para controlos mais fluidos e uma leitura mais colorida.",
    "safari.note":
      "Depois de abrir no Safari, o site funciona normalmente e este aviso permanece oculto.",
    "safari.btn": "Abrir com Safari",
  },
  it: {
    "safari.title": "Proteggi WhatsApp con GuardLine",
    "safari.body":
      "GuardLine ti aiuta a fermare i furti di account prima che succedano—e a recuperare in fretta se sei già bloccato.",
    "safari.point1": "30 guide lunghe: codici, PIN 2FA, dispositivi collegati, phishing e recupero",
    "safari.point2": "Strumenti consigliati con checklist passo dopo passo",
    "safari.point3": "20 avvisi mondiali sulle truffe per riconoscere presto i nuovi trucchi",
    "safari.help":
      "Apri in Safari per controlli più fluidi e una lettura più colorata.",
    "safari.note":
      "Dopo l’apertura in Safari il sito funziona normalmente e questo avviso resta nascosto.",
    "safari.btn": "Apri con Safari",
  },
  ru: {
    "safari.title": "Защитите WhatsApp с GuardLine",
    "safari.body":
      "GuardLine помогает остановить захват аккаунта заранее — и быстро вернуть доступ, если вас уже заблокировали.",
    "safari.point1": "30 подробных гайдов: коды, PIN 2FA, связанные устройства, фишинг и восстановление",
    "safari.point2": "Рекомендованные инструменты защиты с пошаговыми чек-листами",
    "safari.point3": "20 мировых предупреждений о мошенничестве, чтобы раньше узнавать новые схемы",
    "safari.help":
      "Откройте в Safari — управление плавнее, цвета богаче, гайды читать удобнее.",
    "safari.note":
      "После открытия в Safari сайт работает нормально, и это сообщение остаётся скрытым.",
    "safari.btn": "Открыть в Safari",
  },
  ar: {
    "safari.title": "احمِ واتسابك مع GuardLine",
    "safari.body":
      "يساعدك GuardLine على إيقاف اختراق الحساب قبل حدوثه—واستعادته بسرعة إن كنت مقفولًا بالفعل.",
    "safari.point1": "30 دليلًا مطولًا: الرموز، PIN للتحقق بخطوتين، الأجهزة المرتبطة، التصيد والاستعادة",
    "safari.point2": "أدوات حماية موصى بها مع قوائم خطوات واضحة",
    "safari.point3": "20 تنبيه احتيال عالمي لتتعرف على الحيل الجديدة مبكرًا",
    "safari.help":
      "افتح في Safari لتحكم أكثر سلاسة وتجربة قراءة أغنى بالألوان.",
    "safari.note":
      "بعد فتح الصفحة في Safari يعمل الموقع بشكل طبيعي ويبقى هذا الإشعار مخفيًا.",
    "safari.btn": "الفتح باستخدام Safari",
  },
  hi: {
    "safari.title": "GuardLine से अपना WhatsApp सुरक्षित रखें",
    "safari.body":
      "GuardLine खाता चोरी पहले रोकने में मदद करता है—और लॉक होने पर तेज़ी से वापस पाने में भी।",
    "safari.point1": "30 लंबी गाइड: कोड, 2FA PIN, लिंक डिवाइस, फ़िशिंग और रिकवरी",
    "safari.point2": "अनुशंसित सुरक्षा टूल + स्पष्ट चरण चेकलिस्ट",
    "safari.point3": "20 विश्व स्कैम अलर्ट ताकि नई चालें जल्दी पहचानें",
    "safari.help":
      "Safari में खोलें—नियंत्रण सहज और रंग समृद्ध, गाइड पढ़ना आसान।",
    "safari.note":
      "Safari में खुलने के बाद साइट सामान्य रूप से चलती है और यह सूचना छिपी रहती है।",
    "safari.btn": "Safari से खोलें",
  },
  th: {
    "safari.title": "ปกป้อง WhatsApp ด้วย GuardLine",
    "safari.body":
      "GuardLine ช่วยกันบัญชีถูกยึดก่อนเกิดเหตุ—และกู้คืนเร็วหากคุณถูกล็อกอยู่แล้ว",
    "safari.point1": "คู่มือยาว 30 เรื่อง: รหัส, PIN 2FA, อุปกรณ์ที่เชื่อม, ฟิชชิง และการกู้คืน",
    "safari.point2": "เครื่องมือป้องกันที่แนะนำพร้อมเช็กลิสต์ทีละขั้น",
    "safari.point3": "การแจ้งเตือนสแกมโลก 20 รายการ ให้รู้ทันกลโกงใหม่",
    "safari.help":
      "เปิดใน Safari เพื่อควบคุมลื่นขึ้นและอ่านคู่มือด้วยสีสันที่สมบูรณ์กว่า",
    "safari.note":
      "เมื่อเปิดใน Safari แล้ว เว็บไซต์ทำงานปกติ และการแจ้งเตือนนี้จะถูกซ่อนไว้",
    "safari.btn": "เปิดด้วย Safari",
  },
  vi: {
    "safari.title": "Bảo vệ WhatsApp bằng GuardLine",
    "safari.body":
      "GuardLine giúp chặn chiếm tài khoản trước khi xảy ra—và khôi phục nhanh nếu bạn đã bị khóa.",
    "safari.point1": "30 hướng dẫn dài: mã, PIN 2FA, thiết bị liên kết, lừa đảo và khôi phục",
    "safari.point2": "Công cụ bảo vệ khuyến nghị kèm checklist từng bước",
    "safari.point3": "20 cảnh báo lừa đảo thế giới để nhận ra chiêu mới sớm",
    "safari.help":
      "Mở bằng Safari để thao tác mượt hơn và đọc hướng dẫn với màu sắc đầy đủ hơn.",
    "safari.note":
      "Sau khi mở trong Safari, trang chạy bình thường và thông báo này sẽ được ẩn.",
    "safari.btn": "Mở bằng Safari",
  },
  tr: {
    "safari.title": "WhatsApp’inizi GuardLine ile koruyun",
    "safari.body":
      "GuardLine hesap ele geçirmelerini önceden durdurmanıza—ve kilitliyseniz hızlı kurtarmanıza yardım eder.",
    "safari.point1": "30 uzun rehber: kodlar, 2FA PIN, bağlı cihazlar, oltalama ve kurtarma",
    "safari.point2": "Önerilen koruma araçları ve adım adım kontrol listeleri",
    "safari.point3": "20 dünya dolandırıcılık uyarısıyla yeni numaraları erken tanıyın",
    "safari.help":
      "Safari’de açın: daha akıcı denetim, daha renkli okuma deneyimi.",
    "safari.note":
      "Safari’de açıldıktan sonra site normal çalışır ve bu bildirim gizli kalır.",
    "safari.btn": "Safari ile aç",
  },
  pl: {
    "safari.title": "Chroń WhatsAppa z GuardLine",
    "safari.body":
      "GuardLine pomaga zatrzymać przejęcia konta zanim się zaczną—i szybko odzyskać dostęp, jeśli już jesteś zablokowany.",
    "safari.point1": "30 długich poradników: kody, PIN 2FA, powiązane urządzenia, phishing i odzyskiwanie",
    "safari.point2": "Polecane narzędzia ochrony z czytelnymi checklistami",
    "safari.point3": "20 światowych alertów o oszustwach, by wcześnie rozpoznać nowe sztuczki",
    "safari.help":
      "Otwórz w Safari dla płynniejszej obsługi i bardziej kolornego czytania.",
    "safari.note":
      "Po otwarciu w Safari strona działa normalnie, a ten komunikat pozostaje ukryty.",
    "safari.btn": "Otwórz w Safari",
  },
  nl: {
    "safari.title": "Bescherm je WhatsApp met GuardLine",
    "safari.body":
      "GuardLine helpt overnames te stoppen vóór ze beginnen—en snel te herstellen als je al buitengesloten bent.",
    "safari.point1": "30 lange gidsen: codes, 2FA-PIN, gekoppelde apparaten, phishing & herstel",
    "safari.point2": "Aanbevolen beschermingstools met duidelijke checklists",
    "safari.point3": "20 wereldwijde scam-alerts om nieuwe trucs vroeg te herkennen",
    "safari.help":
      "Open in Safari voor soepelere bediening en een kleurrijker leeservaring.",
    "safari.note":
      "Na openen in Safari werkt de site normaal en blijft dit bericht verborgen.",
    "safari.btn": "Openen met Safari",
  },
  sv: {
    "safari.title": "Skydda WhatsApp med GuardLine",
    "safari.body":
      "GuardLine hjälper dig stoppa kapningar innan de börjar—och återställa snabbt om du redan är utelåst.",
    "safari.point1": "30 långa guider: koder, 2FA-PIN, länkade enheter, nätfiske & återställning",
    "safari.point2": "Rekommenderade skyddsverktyg med tydliga checklistor",
    "safari.point3": "20 världsbedrägerivarningar så du känner igen nya knep tidigt",
    "safari.help":
      "Öppna i Safari för smidigare kontroller och en färgstarkare läsning.",
    "safari.note":
      "När sidan öppnas i Safari fungerar webbplatsen normalt och detta meddelande förblir dolt.",
    "safari.btn": "Öppna med Safari",
  },
  da: {
    "safari.title": "Beskyt din WhatsApp med GuardLine",
    "safari.body":
      "GuardLine hjælper dig med at stoppe kapringer, før de sker—og genoprette hurtigt, hvis du allerede er låst ude.",
    "safari.point1": "30 lange guides: koder, 2FA-PIN, tilknyttede enheder, phishing & genopretning",
    "safari.point2": "Anbefalede beskyttelsesværktøjer med klare checklister",
    "safari.point3": "20 verdenssvindeladvarsler, så du genkender nye tricks tidligt",
    "safari.help":
      "Åbn i Safari for mere flydende betjening og en mere farverig læseoplevelse.",
    "safari.note":
      "Når siden åbnes i Safari, kører webstedet normalt, og denne besked forbliver skjult.",
    "safari.btn": "Åbn med Safari",
  },
  fi: {
    "safari.title": "Suojaa WhatsApp GuardLinella",
    "safari.body":
      "GuardLine auttaa estämään kaappaukset etukäteen—ja palauttamaan tilin nopeasti, jos olet jo lukittu ulos.",
    "safari.point1": "30 pitkää opasta: koodit, 2FA-PIN, linkitetyt laitteet, phishing ja palautus",
    "safari.point2": "Suositellut suojatyökalut selkeillä tarkistuslistoilla",
    "safari.point3": "20 maailman huijaushälytystä, jotta tunnistat uudet keinot ajoissa",
    "safari.help":
      "Avaa Safarissa sujuvampaan ohjaukseen ja värikkäämpään lukukokemukseen.",
    "safari.note":
      "Safarissa avaamisen jälkeen sivusto toimii normaalisti ja tämä ilmoitus pysyy piilossa.",
    "safari.btn": "Avaa Safarilla",
  },
  no: {
    "safari.title": "Beskytt WhatsApp med GuardLine",
    "safari.body":
      "GuardLine hjelper deg å stoppe kapringer før de starter—og gjenopprette raskt hvis du allerede er låst ute.",
    "safari.point1": "30 lange guider: koder, 2FA-PIN, tilknyttede enheter, phishing og gjenoppretting",
    "safari.point2": "Anbefalte beskyttelsesverktøy med tydelige sjekklister",
    "safari.point3": "20 verdenssvindelvarsler slik at du gjenkjenner nye triks tidlig",
    "safari.help":
      "Åpne i Safari for jevnere kontroll og en mer fargerik leseopplevelse.",
    "safari.note":
      "Når siden åpnes i Safari, fungerer nettstedet normalt og denne meldingen forblir skjult.",
    "safari.btn": "Åpne med Safari",
  },
  cs: {
    "safari.title": "Chraňte WhatsApp s GuardLine",
    "safari.body":
      "GuardLine pomáhá zastavit převzetí účtu dřív, než začne—a rychle obnovit přístup, pokud už jste zablokovaní.",
    "safari.point1": "30 dlouhých průvodců: kódy, 2FA PIN, propojená zařízení, phishing a obnova",
    "safari.point2": "Doporučené ochranné nástroje s jasnými checklisty",
    "safari.point3": "20 světových upozornění na podvody, abyste nové triky poznali včas",
    "safari.help":
      "Otevřete v Safari pro plynulejší ovládání a barevnější čtení.",
    "safari.note":
      "Po otevření v Safari web funguje normálně a toto oznámení zůstane skryté.",
    "safari.btn": "Otevřít v Safari",
  },
  el: {
    "safari.title": "Προστατέψτε το WhatsApp με GuardLine",
    "safari.body":
      "Το GuardLine βοηθά να σταματήσετε καταλήψεις λογαριασμού πριν συμβούν—και να ανακτήσετε γρήγορα αν είστε ήδη κλειδωμένοι.",
    "safari.point1": "30 μεγάλοι οδηγοί: κωδικοί, PIN 2FA, συνδεδεμένες συσκευές, phishing και ανάκτηση",
    "safari.point2": "Προτεινόμενα εργαλεία προστασίας με καθαρά βήμα-βήμα checklist",
    "safari.point3": "20 παγκόσμιες ειδοποιήσεις απάτης για να αναγνωρίζετε έγκαιρα νέα κόλπα",
    "safari.help":
      "Ανοίξτε στο Safari για πιο ομαλό χειρισμό και πιο πλούσια χρώματα στην ανάγνωση.",
    "safari.note":
      "Όταν ανοίξει στο Safari, ο ιστότοπος λειτουργεί κανονικά και αυτή η ειδοποίηση παραμένει κρυφή.",
    "safari.btn": "Άνοιγμα με Safari",
  },
  he: {
    "safari.title": "הגנו על הוואטסאפ עם GuardLine",
    "safari.body":
      "GuardLine עוזר לעצור השתלטות על חשבון לפני שהיא מתחילה—ולשחזר במהירות אם כבר ננעלתם.",
    "safari.point1": "30 מדריכים ארוכים: קודים, PIN דו-שלבי, מכשירים מקושרים, פישינג ושחזור",
    "safari.point2": "כלי הגנה מומלצים עם רשימות שלב אחר שלב",
    "safari.point3": "20 התראות הונאה עולמיות כדי לזהות טריקים חדשים מוקדם",
    "safari.help":
      "פתחו ב-Safari לשליטה חלקה יותר וחוויית קריאה צבעונית יותר.",
    "safari.note":
      "לאחר פתיחה ב-Safari האתר פועל כרגיל והודעה זו נשארת מוסתרת.",
    "safari.btn": "פתח עם Safari",
  },
  uk: {
    "safari.title": "Захистіть WhatsApp із GuardLine",
    "safari.body":
      "GuardLine допомагає зупинити захоплення акаунта заздалегідь — і швидко повернути доступ, якщо вас уже заблокували.",
    "safari.point1": "30 довгих гайдів: коди, PIN 2FA, пов’язані пристрої, фішинг і відновлення",
    "safari.point2": "Рекомендовані інструменти захисту з чіткими чеклістами",
    "safari.point3": "20 світових попереджень про шахрайство, щоб раніше впізнавати нові схеми",
    "safari.help":
      "Відкрийте в Safari — керування плавніше, кольори багатші, гайди читати зручніше.",
    "safari.note":
      "Після відкриття в Safari сайт працює нормально, і це повідомлення залишається прихованим.",
    "safari.btn": "Відкрити в Safari",
  },
  ro: {
    "safari.title": "Protejați WhatsApp cu GuardLine",
    "safari.body":
      "GuardLine vă ajută să opriți preluările de cont înainte să înceapă—și să recuperați rapid dacă sunteți deja blocați.",
    "safari.point1": "30 ghiduri lungi: coduri, PIN 2FA, dispozitive conectate, phishing și recuperare",
    "safari.point2": "Instrumente de protecție recomandate cu checklist-uri clare",
    "safari.point3": "20 alerte mondiale de scam ca să recunoașteți din timp trucurile noi",
    "safari.help":
      "Deschideți în Safari pentru controale mai fluide și o lectură mai colorată.",
    "safari.note":
      "După deschiderea în Safari, site-ul rulează normal și acest mesaj rămâne ascuns.",
    "safari.btn": "Deschide cu Safari",
  },
  hu: {
    "safari.title": "Védje WhatsAppját a GuardLine-nal",
    "safari.body":
      "A GuardLine segít megállítani a fiókátvételeket előre—és gyorsan visszakapni a hozzáférést, ha már kizárták.",
    "safari.point1": "30 hosszú útmutató: kódok, 2FA PIN, csatolt eszközök, adathalászat és helyreállítás",
    "safari.point2": "Ajánlott védelmi eszközök világos ellenőrzőlistákkal",
    "safari.point3": "20 világ átverésriasztás, hogy korán felismerje az új trükköket",
    "safari.help":
      "Nyissa meg Safariban a gördülékenyebb vezérlésért és színesebb olvasásért.",
    "safari.note":
      "Safari-ban megnyitva az oldal rendesen fut, és ez az üzenet rejtve marad.",
    "safari.btn": "Megnyitás Safarival",
  },
  bn: {
    "safari.title": "GuardLine দিয়ে WhatsApp সুরক্ষিত রাখুন",
    "safari.body":
      "GuardLine অ্যাকাউন্ট দখল আগেই থামাতে সাহায্য করে—এবং লক হলে দ্রুত ফিরে পেতেও।",
    "safari.point1": "৩০টি দীর্ঘ গাইড: কোড, 2FA PIN, লিংকড ডিভাইস, ফিশিং ও পুনরুদ্ধার",
    "safari.point2": "সুপারিশকৃত সুরক্ষা টুল + পরিষ্কার ধাপ চেকলিস্ট",
    "safari.point3": "২০টি বিশ্ব স্ক্যাম সতর্কতা যাতে নতুন কৌশল আগে চিনতে পারেন",
    "safari.help":
      "Safari-তে খুলুন—নিয়ন্ত্রণ মসৃণ ও রঙ সমৃদ্ধ, গাইড পড়া সহজ।",
    "safari.note":
      "Safari-তে খোলার পর সাইট স্বাভাবিকভাবে চলে এবং এই নোটিশ লুকানো থাকে।",
    "safari.btn": "Safari দিয়ে খুলুন",
  },
  tl: {
    "safari.title": "Protektahan ang WhatsApp mo gamit ang GuardLine",
    "safari.body":
      "Tinutulungan ka ng GuardLine na pigilan ang pagkuha ng account bago ito magsimula—at mabilis makabawi kung naka-lock ka na.",
    "safari.point1": "30 mahabang gabay: codes, 2FA PIN, linked devices, phishing at recovery",
    "safari.point2": "Inirerekomendang protection tools na may malinaw na step-by-step checklist",
    "safari.point3": "20 world scam alerts para maaga mong makilala ang mga bagong dayaan",
    "safari.help":
      "Buksan sa Safari para mas smooth ang controls at mas makulay ang pagbabasa.",
    "safari.note":
      "Kapag nabuksan sa Safari, normal na tumatakbo ang site at mananatiling nakatago ang abisong ito.",
    "safari.btn": "Buksan gamit ang Safari",
  },
  sw: {
    "safari.title": "Linda WhatsApp yako kwa GuardLine",
    "safari.body":
      "GuardLine inakusaidia kuzuia wizi wa akaunti kabla haujafanyika—na kurejesha haraka ikiwa umefungwa nje.",
    "safari.point1": "Mwongozo mrefu 30: misimbo, PIN ya 2FA, vifaa vilivyounganishwa, phishing na urejeshaji",
    "safari.point2": "Zana za ulinzi zinazopendekezwa na orodha za hatua kwa hatua",
    "safari.point3": "Tahadhari 20 za udanganyifu duniani ili utambue mbinu mpya mapema",
    "safari.help":
      "Fungua katika Safari kwa udhibiti laini na usomaji wenye rangi tajiri.",
    "safari.note":
      "Baada ya kufunguliwa katika Safari, tovuti inafanya kazi kawaida na taarifa hii inabaki imefichwa.",
    "safari.btn": "Fungua kwa Safari",
  },
  fa: {
    "safari.title": "واتساپ خود را با GuardLine محافظت کنید",
    "safari.body":
      "GuardLine کمک می‌کند تصاحب حساب را پیش از وقوع متوقف کنید—و اگر قفل شده‌اید سریع بازیابی کنید.",
    "safari.point1": "۳۰ راهنمای بلند: کدها، PIN دوعاملی، دستگاه‌های متصل، فیشینگ و بازیابی",
    "safari.point2": "ابزارهای محافظتی پیشنهادی با چک‌لیست گام‌به‌گام",
    "safari.point3": "۲۰ هشدار کلاهبرداری جهانی تا ترفندهای تازه را زود بشناسید",
    "safari.help":
      "در Safari باز کنید تا کنترل روان‌تر و خواندن رنگین‌تر شود.",
    "safari.note":
      "پس از باز شدن در Safari سایت عادی کار می‌کند و این پیام پنهان می‌ماند.",
    "safari.btn": "باز کردن با Safari",
  },
  ur: {
    "safari.title": "GuardLine سے اپنا WhatsApp محفوظ رکھیں",
    "safari.body":
      "GuardLine اکاؤنٹ ہائی جیک پہلے روکنے میں مدد کرتا ہے—اور لاک ہونے پر تیزی سے واپس پانے میں بھی۔",
    "safari.point1": "۳۰ لمبی گائیڈز: کوڈز، 2FA PIN، لنکڈ ڈیوائسز، فشنگ اور ریکوری",
    "safari.point2": "تجویز کردہ سیکیورٹی ٹولز + واضح مرحلہ وار چیک لسٹ",
    "safari.point3": "۲۰ عالمی اسکیم الرٹس تاکہ نئی چالیں جلد پہچانیں",
    "safari.help":
      "Safari میں کھولیں—کنٹرول ہموار اور رنگ وضح تر، گائیڈ پڑھنا آسان۔",
    "safari.note":
      "Safari میں کھلنے کے بعد سائٹ عام طور پر چلتی ہے اور یہ نوٹس چھپا رہتا ہے۔",
    "safari.btn": "Safari سے کھولیں",
  },
};

function upsertKeys(code, map) {
  const file = join(packsDir, `${code}.mjs`);
  let text = readFileSync(file, "utf8");
  const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

  for (const key of KEYS) {
    const value = map[key] || COPY.en[key];
    const line = `"${key}": "${esc(value)}"`;
    const re = new RegExp(
      `"${key.replaceAll(".", "\\.")}":\\s*"(?:\\\\.|[^"\\\\])*"`
    );
    if (re.test(text)) {
      text = text.replace(re, line);
    } else {
      text = text.replace(/\n\};\s*$/, `,\n  ${line}\n};\n`);
    }
  }
  // clean accidental double commas
  text = text.replace(/",,\n/g, '",\n').replace(/,\s*,\n/g, ",\n");
  writeFileSync(file, text);
}

for (const { code } of languages) {
  if (code === "en") continue;
  upsertKeys(code, COPY[code] || COPY.en);
  console.log("ok", code);
}
console.log("safari keys patched");
