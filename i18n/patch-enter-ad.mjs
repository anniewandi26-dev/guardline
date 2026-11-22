/** Offline patch enter.lead / enter.lead.meta for all packs */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { languages } from "./languages.mjs";

const packsDir = join(dirname(fileURLToPath(import.meta.url)), "packs");

const EN_LEAD =
  "Don't wait until your WhatsApp is stolen. Learn the 4 moves that stop most takeovers: never share the 6-digit code, turn on a two-step PIN today, kick out unknown linked devices weekly, and follow the recovery playbook if you get locked out.";
const EN_META =
  "Free practical handbook · step-by-step protection · live scam alerts from around the world";

const COPY = {
  en: { lead: EN_LEAD, meta: EN_META },
  "zh-CN": {
    lead: "别等 WhatsApp 被盗才后悔。四步就能挡住大多数盗号：验证码永不外传、今天就开启两步验证 PIN、每周踢掉陌生关联设备、被锁也能按急救流程夺回号码。",
    meta: "免费实用手册 · 一步步照做守号 · 同步全球诈骗通报",
  },
  "zh-TW": {
    lead: "別等 WhatsApp 被盜才後悔。四步就能擋住大多數盜號：驗證碼絕不外傳、今天就開啟兩步驟驗證 PIN、每週踢掉陌生已連結裝置、被鎖也能依急救流程奪回號碼。",
    meta: "免費實用手冊 · 一步步照做守號 · 同步全球詐騙通報",
  },
  ms: {
    lead: "Jangan tunggu WhatsApp anda dicuri. Pelajari 4 langkah yang menghentikan kebanyakan rampasan: jangan kongsi kod 6 digit, hidupkan PIN dua langkah hari ini, buang peranti dipautkan yang tidak dikenali setiap minggu, dan ikut panduan pemulihan jika anda dikunci.",
    meta: "Buku panduan percuma · perlindungan langkah demi langkah · amaran penipuan dunia sebenar",
  },
  id: {
    lead: "Jangan tunggu WhatsApp Anda dicuri. Pelajari 4 langkah yang menghentikan sebagian besar pembajakan: jangan bagikan kode 6 digit, aktifkan PIN dua langkah hari ini, keluarkan perangkat tertaut asing setiap minggu, dan ikuti panduan pemulihan jika terkunci.",
    meta: "Panduan praktis gratis · perlindungan langkah demi langkah · peringatan penipuan dunia nyata",
  },
  ja: {
    lead: "WhatsAppが盗まれるまで待たないで。乗っ取りの大半を止める4つの行動を学びましょう：6桁コードは絶対に共有しない、今すぐ2段階認証PINをオン、毎週未知のリンク済み端末を削除、ロックされたら復旧手順に従う。",
    meta: "無料の実践ハンドブック · 手順どおりに守る · 世界の詐欺アラートを同期",
  },
  ko: {
    lead: "WhatsApp이 도난당할 때까지 기다리지 마세요. 대부분의 탈취를 막는 4가지 방법: 6자리 코드 절대 공유 금지, 오늘 2단계 PIN 켜기, 매주 모르는 연결 기기 제거, 잠기면 복구 가이드 따르기.",
    meta: "무료 실용 핸드북 · 단계별 보호 · 전 세계 사기 경보 동기화",
  },
  es: {
    lead: "No esperes a que te roben el WhatsApp. Aprende las 4 acciones que detienen la mayoría de los robos: nunca compartas el código de 6 dígitos, activa hoy el PIN de verificación en dos pasos, expulsa cada semana dispositivos vinculados desconocidos y sigue la guía de recuperación si te bloquean.",
    meta: "Manual práctico gratis · protección paso a paso · alertas de estafas del mundo real",
  },
  fr: {
    lead: "N’attendez pas que votre WhatsApp soit volé. Apprenez les 4 gestes qui stoppent la plupart des prises de contrôle : ne partagez jamais le code à 6 chiffres, activez dès aujourd’hui le PIN en deux étapes, expulsez chaque semaine les appareils liés inconnus, et suivez le guide de récupération si vous êtes bloqué.",
    meta: "Manuel pratique gratuit · protection pas à pas · alertes arnaques du monde entier",
  },
  de: {
    lead: "Warten Sie nicht, bis Ihr WhatsApp gestohlen wird. Lernen Sie die 4 Schritte, die die meisten Übernahmen stoppen: den 6-stelligen Code nie teilen, den Zwei-Schritt-PIN heute aktivieren, unbekannte verknüpfte Geräte wöchentlich entfernen und bei Sperre dem Wiederherstellungsleitfaden folgen.",
    meta: "Kostenloses Praxis-Handbuch · Schutz Schritt für Schritt · echte Betrugswarnungen weltweit",
  },
  "pt-BR": {
    lead: "Não espere o WhatsApp ser roubado. Aprenda as 4 ações que param a maioria das invasões: nunca compartilhe o código de 6 dígitos, ative hoje o PIN de verificação em duas etapas, remova semanalmente dispositivos vinculados desconhecidos e siga o guia de recuperação se ficar bloqueado.",
    meta: "Manual prático grátis · proteção passo a passo · alertas reais de golpes no mundo",
  },
  "pt-PT": {
    lead: "Não espere que o WhatsApp seja roubado. Aprenda as 4 ações que param a maioria das tomadas de conta: nunca partilhe o código de 6 dígitos, ative hoje o PIN de verificação em duas etapas, remova semanalmente dispositivos ligados desconhecidos e siga o guia de recuperação se ficar bloqueado.",
    meta: "Manual prático gratuito · proteção passo a passo · alertas reais de burlas no mundo",
  },
  it: {
    lead: "Non aspettare che ti rubino WhatsApp. Impara le 4 mosse che fermano la maggior parte dei furti: non condividere mai il codice a 6 cifre, attiva oggi il PIN di verifica in due passaggi, rimuovi ogni settimana i dispositivi collegati sconosciuti e segui la guida di recupero se vieni bloccato.",
    meta: "Manuale pratico gratuito · protezione passo dopo passo · avvisi truffe dal mondo reale",
  },
  ru: {
    lead: "Не ждите, пока у вас украдут WhatsApp. Изучите 4 шага, которые останавливают большинство захватов: никогда не сообщайте 6-значный код, включите сегодня PIN двухэтапной проверки, еженедельно удаляйте неизвестные связанные устройства и следуйте инструкции по восстановлению, если вас заблокировали.",
    meta: "Бесплатное практическое руководство · защита шаг за шагом · живые предупреждения о мошенничестве",
  },
  ar: {
    lead: "لا تنتظر حتى يُسرق واتسابك. تعلّم 4 خطوات توقف معظم عمليات الاختراق: لا تشارك رمز الـ 6 أرقام أبدًا، فعّل اليوم رمز التحقق بخطوتين، اطرد الأجهزة المرتبطة المجهولة أسبوعيًا، واتبع دليل الاسترداد إذا تم قفلك.",
    meta: "دليل عملي مجاني · حماية خطوة بخطوة · تنبيهات احتيال من حول العالم",
  },
  hi: {
    lead: "WhatsApp चोरी होने तक इंतज़ार न करें। ज़्यादातर हैक रोकने वाले 4 कदम सीखें: 6 अंकों का कोड कभी साझा न करें, आज ही दो-चरण PIN चालू करें, हर हफ़्ते अज्ञात लिंक डिवाइस हटाएँ, और लॉक होने पर रिकवरी गाइड अपनाएँ।",
    meta: "मुफ़्त व्यावहारिक हैंडबुक · कदम-दर-कदम सुरक्षा · दुनिया भर की स्कैम चेतावनियाँ",
  },
  th: {
    lead: "อย่ารอให้ WhatsApp ถูกขโมย เรียนรู้ 4 วิธีที่หยุดการแฮกส่วนใหญ่: อย่าแชร์รหัส 6 หลัก เปิด PIN ยืนยัน 2 ขั้นตอนวันนี้ ถอดอุปกรณ์ที่เชื่อมโยงที่ไม่รู้จักทุกสัปดาห์ และทำตามคู่มือกู้คืนหากถูกล็อก",
    meta: "คู่มือใช้งานฟรี · ป้องกันทีละขั้นตอน · การแจ้งเตือนสแกมทั่วโลก",
  },
  vi: {
    lead: "Đừng đợi đến khi WhatsApp bị chiếm. Học 4 bước chặn hầu hết vụ chiếm đoạt: không bao giờ chia sẻ mã 6 số, bật PIN xác minh hai bước hôm nay, mỗi tuần gỡ thiết bị liên kết lạ, và làm theo hướng dẫn khôi phục nếu bị khóa.",
    meta: "Sổ tay thực hành miễn phí · bảo vệ từng bước · cảnh báo lừa đảo toàn cầu",
  },
  tr: {
    lead: "WhatsApp’iniz çalınana kadar beklemeyin. Çoğu ele geçirmeyi durduran 4 adımı öğrenin: 6 haneli kodu asla paylaşmayın, iki adımlı PIN’i bugün açın, her hafta bilinmeyen bağlı cihazları çıkarın ve kilitlenirseniz kurtarma rehberini izleyin.",
    meta: "Ücretsiz pratik el kitabı · adım adım koruma · dünyadan canlı dolandırıcılık uyarıları",
  },
  pl: {
    lead: "Nie czekaj, aż ktoś ukradnie Ci WhatsAppa. Poznaj 4 kroki, które powstrzymują większość przejęć: nigdy nie udostępniaj 6-cyfrowego kodu, włącz dziś PIN weryfikacji dwuetapowej, co tydzień usuwaj nieznane powiązane urządzenia i postępuj według przewodnika odzyskiwania, jeśli zostaniesz zablokowany.",
    meta: "Darmowy praktyczny podręcznik · ochrona krok po kroku · żywe alerty o oszustwach ze świata",
  },
  nl: {
    lead: "Wacht niet tot je WhatsApp gestolen wordt. Leer de 4 stappen die de meeste overnames stoppen: deel de 6-cijferige code nooit, zet vandaag de tweestaps-PIN aan, verwijder wekelijks onbekende gekoppelde apparaten, en volg de herstelgids als je buitengesloten bent.",
    meta: "Gratis praktisch handboek · bescherming stap voor stap · live scam-alerts wereldwijd",
  },
  sv: {
    lead: "Vänta inte tills ditt WhatsApp stjäls. Lär dig de 4 stegen som stoppar de flesta kapningar: dela aldrig den 6-siffriga koden, slå på tvåstegs-PIN idag, sparka okända länkade enheter varje vecka och följ återställningsguiden om du låses ute.",
    meta: "Gratis praktisk handbok · skydd steg för steg · live bedrägerivarningar från världen",
  },
  da: {
    lead: "Vent ikke, til din WhatsApp bliver stjålet. Lær de 4 trin, der stopper de fleste kapringer: del aldrig den 6-cifrede kode, slå totrins-PIN til i dag, fjern ukendte tilknyttede enheder hver uge, og følg genopretningsguiden, hvis du bliver låst ude.",
    meta: "Gratis praktisk håndbog · beskyttelse trin for trin · live svindeladvarsler fra verden",
  },
  fi: {
    lead: "Älä odota, kunnes WhatsApp varastetaan. Opi 4 askelta, jotka estävät useimmat kaappaukset: älä koskaan jaa 6-numeroista koodia, ota kaksivaiheinen PIN käyttöön tänään, poista tuntemattomat linkitetyt laitteet viikoittain ja noudata palautusopasta, jos sinut lukitaan ulos.",
    meta: "Ilmainen käytännön käsikirja · suojaus askel askeleelta · live-huijaushälytyksiä ympäri maailmaa",
  },
  no: {
    lead: "Ikke vent til WhatsApp blir stjålet. Lær de 4 stegene som stopper de fleste kapringer: aldri del den 6-sifrede koden, slå på totrinns-PIN i dag, fjern ukjente tilknyttede enheter hver uke, og følg gjenopprettingsguiden hvis du blir låst ute.",
    meta: "Gratis praktisk håndbok · beskyttelse steg for steg · live svindelvarsler fra verden",
  },
  cs: {
    lead: "Nečekejte, až vám ukradnou WhatsApp. Naučte se 4 kroky, které zastaví většinu převzetí: nikdy nesdílejte 6místný kód, ještě dnes zapněte PIN dvoufázového ověření, každý týden odstraňte neznámá propojená zařízení a při zablokování postupujte podle průvodce obnovením.",
    meta: "Bezplatná praktická příručka · ochrana krok za krokem · živá upozornění na podvody ze světa",
  },
  el: {
    lead: "Μην περιμένετε να κλαπεί το WhatsApp σας. Μάθετε τις 4 κινήσεις που σταματούν τις περισσότερες καταλήψεις: μην κοινοποιείτε ποτέ τον 6ψήφιο κωδικό, ενεργοποιήστε σήμερα το PIN επαλήθευσης δύο βημάτων, αφαιρείτε κάθε εβδομάδα άγνωστες συνδεδεμένες συσκευές και ακολουθήστε τον οδηγό ανάκτησης αν κλειδωθείτε.",
    meta: "Δωρεάν πρακτικό εγχειρίδιο · προστασία βήμα-βήμα · ζωντανές ειδοποιήσεις απάτης από τον κόσμο",
  },
  he: {
    lead: "אל תחכו עד שיגנבו לכם את הוואטסאפ. למדו 4 צעדים שעוצרים את רוב ההשתלטויות: לעולם אל תשתפו את הקוד בן 6 הספרות, הפעילו היום PIN לאימות דו-שלבי, הסירו מדי שבוע מכשירים מקושרים לא מוכרים, ופעלו לפי מדריך השחזור אם ננעלתם.",
    meta: "מדריך מעשי בחינם · הגנה שלב אחר שלב · התראות הונאה חיות מהעולם",
  },
  uk: {
    lead: "Не чекайте, поки у вас викрадуть WhatsApp. Вивчіть 4 кроки, що зупиняють більшість захоплень: ніколи не повідомляйте 6-значний код, увімкніть сьогодні PIN двокрокової перевірки, щотижня видаляйте невідомі пов’язані пристрої й дотримуйтесь інструкції з відновлення, якщо вас заблокували.",
    meta: "Безкоштовний практичний довідник · захист крок за кроком · живі попередження про шахрайство зі світу",
  },
  ro: {
    lead: "Nu așteptați până când WhatsApp vă este furat. Învățați cele 4 mișcări care opresc majoritatea preluărilor: nu partajați niciodată codul de 6 cifre, activați azi PIN-ul de verificare în doi pași, eliminați săptămânal dispozitivele conectate necunoscute și urmați ghidul de recuperare dacă sunteți blocați.",
    meta: "Manual practic gratuit · protecție pas cu pas · alerte de scam din lumea reală",
  },
  hu: {
    lead: "Ne várja meg, amíg ellopják a WhatsAppját. Tanulja meg a 4 lépést, amely a legtöbb átvételt megállítja: soha ne ossza meg a 6 számjegyű kódot, kapcsolja be ma a kétlépéses PIN-t, hetente távolítsa el az ismeretlen csatolt eszközöket, és kövesse a helyreállítási útmutatót, ha kizárják.",
    meta: "Ingyenes gyakorlati kézikönyv · lépésről lépésre védelem · élő átverésriasztások a világból",
  },
  bn: {
    lead: "WhatsApp চুরি হওয়া পর্যন্ত অপেক্ষা করবেন না। বেশিরভাগ দখল থামানোর ৪টি ধাপ শিখুন: ৬-সংখ্যার কোড কখনও শেয়ার করবেন না, আজই দুই-ধাপের PIN চালু করুন, প্রতি সপ্তাহে অজানা লিংকড ডিভাইস সরিয়ে দিন, এবং লক হলে পুনরুদ্ধার গাইড অনুসরণ করুন।",
    meta: "বিনামূল্যের ব্যবহারিক হ্যান্ডবুক · ধাপে ধাপে সুরক্ষা · বিশ্বের লাইভ স্ক্যাম সতর্কতা",
  },
  tl: {
    lead: "Huwag maghintay na manakaw ang WhatsApp mo. Alamin ang 4 na hakbang na pumipigil sa karamihan ng pagkuha: huwag kailanman ibahagi ang 6-digit code, i-on ngayon ang two-step PIN, tanggalin linggu-linggo ang hindi kilalang naka-link na device, at sundin ang recovery guide kung ma-lock ka.",
    meta: "Libreng praktikal na handbook · proteksyon hakbang-hakbang · live scam alerts mula sa mundo",
  },
  sw: {
    lead: "Usisubiri WhatsApp yako iibwe. Jifunze hatua 4 zinazozuia wizi mwingi: usishiriki kamwe msimbo wa tarakimu 6, washa PIN ya hatua mbili leo, ondoa kila wiki vifaa vilivyounganishwa visivyojulikana, na fuata mwongozo wa urejeshaji ukifungwa nje.",
    meta: "Kitabu cha bure cha vitendo · ulinzi hatua kwa hatua · tahadhari za udanganyifu duniani",
  },
  fa: {
    lead: "منتظر دزدیده شدن واتساپ نمانید. ۴ حرکت که بیشتر تصاحب‌ها را متوقف می‌کند یاد بگیرید: هرگز کد ۶ رقمی را به اشتراک نگذارید، امروز PIN تأیید دو مرحله‌ای را روشن کنید، هر هفته دستگاه‌های متصل ناشناس را بیرون بیندازید، و اگر قفل شدید راهنمای بازیابی را دنبال کنید.",
    meta: "راهنمای عملی رایگان · محافظت گام‌به‌گام · هشدارهای زنده کلاهبرداری از سراسر جهان",
  },
  ur: {
    lead: "اس وقت تک انتظار نہ کریں جب تک آپ کا WhatsApp چوری ہو جائے۔ زیادہ تر ہائی جیک روکنے والے ۴ اقدامات سیکھیں: ۶ ہندسوں کا کوڈ کبھی شیئر نہ کریں، آج ہی دو مرحلہ PIN آن کریں، ہر ہفتے نامعلوم لنکڈ ڈیوائسز ہٹائیں، اور لاک ہونے پر ریکوری گائیڈ پر عمل کریں۔",
    meta: "مفت عملی ہینڈ بک · قدم بہ قدم تحفظ · دنیا بھر سے لائیو اسکیم الرٹس",
  },
};

function patchPackFile(code, lead, meta) {
  const file = join(packsDir, `${code}.mjs`);
  let text = readFileSync(file, "utf8");
  const esc = (s) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  text = text.replace(
    /"enter\.lead":\s*(?:"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)/,
    `"enter.lead": "${esc(lead)}"`
  );
  text = text.replace(
    /"enter\.lead\.meta":\s*(?:"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)/,
    `"enter.lead.meta": "${esc(meta)}"`
  );
  writeFileSync(file, text);
}

for (const { code } of languages) {
  if (code === "en") continue;
  const c = COPY[code] || COPY.en;
  patchPackFile(code, c.lead, c.meta);
  console.log("ok", code);
}
console.log("done");
