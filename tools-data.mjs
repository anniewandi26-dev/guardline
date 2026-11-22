/** GuardLine · 推荐防护软件与工具（仅官方/可信来源） */
export const toolsIntro = {
  title: "推荐下载：降低 WhatsApp 被盗风险的软件与工具",
  lead: "没有「一键防盗神器」。真正有效的是：官方 WhatsApp、系统安全能力、正规防诈 App，再加上两步验证与验证码纪律。本页只推荐可从官方渠道获取的工具，并写清它能做什么、不能做什么。",
};

export const tools = [
  {
    id: "whatsapp-official",
    cover: "images/tools/tool-whatsapp-official.jpg",
    stepsImage: "images/tools/steps-whatsapp-official.jpg",
    stepsCaption: "从官方商店安装，并立刻开启两步验证",
    tier: "必装",
    name: "WhatsApp 官方客户端",
    platforms: "iOS · Android",
    summary: "唯一应安装的即时通讯本体。改装版、增强版、网盘 APK 都是高风险。",
    why: [
      "官方客户端才会持续获得安全更新、诈骗提示与账户恢复能力。",
      "非官方包可能内置后门，端到端加密也救不了「端点已沦陷」。",
      "警方与 Meta 反复提醒：只用官方应用商店中的 WhatsApp。",
    ],
    steps: [
      "iPhone：仅从 App Store 搜索 WhatsApp Messenger 安装/更新。",
      "Android：优先 Google Play；部分地区可用手机厂商官方应用商店中的正式版。",
      "安装后立刻开启两步验证，并检查「已关联的设备」。",
    ],
    links: [
      { label: "WhatsApp 安全中心", href: "https://www.whatsapp.com/security" },
      { label: "Google Play · WhatsApp", href: "https://play.google.com/store/apps/details?id=com.whatsapp" },
    ],
    caution: "不要从群文件、网盘、短链下载所谓 Plus / GB / 防撤回版。",
  },
  {
    id: "whatsapp-desktop",
    cover: "images/tools/tool-whatsapp-desktop.jpg",
    stepsImage: "images/tools/steps-whatsapp-desktop.jpg",
    stepsCaption: "手机关联设备 → 官方扫码 → 用完登出",
    tier: "推荐",
    name: "WhatsApp 桌面版 / 网页版（官方）",
    platforms: "Windows · macOS · 浏览器",
    summary: "方便电脑回复，但必须从官方入口关联；公用电脑用完立刻在手机端登出。",
    why: [
      "官方桌面端比随便搜索到的「Web 登录页」安全得多。",
      "关联设备是静默偷窥的高发入口，正规客户端便于你主动管理会话。",
    ],
    steps: [
      "在手机 WhatsApp → 已关联的设备 → 关联新设备。",
      "电脑打开官方桌面应用，或浏览器手动输入官方网页地址后扫码。",
      "公用设备不要勾选保持登录；用完回手机踢掉会话。",
    ],
    links: [
      { label: "WhatsApp 桌面下载（官网）", href: "https://www.whatsapp.com/download" },
    ],
    caution: "绝不扫描聊天里或陌生网站出示的「登录/投票」二维码。",
  },
  {
    id: "builtin-security",
    cover: "images/tools/tool-builtin-security.jpg",
    stepsImage: "images/tools/steps-builtin-security.jpg",
    stepsCaption: "设置账户两步验证，绑定恢复邮箱",
    tier: "必开",
    name: "WhatsApp 内置安全功能（免费）",
    platforms: "App 内设置",
    summary: "两步验证、诈骗提示（Scam Alert）、应用锁、隐私限制——不需要另装第三方「防盗插件」。",
    why: [
      "两步验证直接提高接管成本，是各国警方通稿里的标准建议。",
      "Scam Alert 可在设备侧提示可疑会话（以你版本是否提供为准）。",
      "应用锁降低「手机已解锁被顺手打开」的风险。",
    ],
    steps: [
      "设置 → 账户 → 两步验证 → 开启，并绑定可登录的邮箱。",
      "设置中查找诈骗提示 / Scam Alert（若有）并打开。",
      "开启应用锁（指纹/面容）；隐私里限制陌生人拉群。",
      "每周检查一次「已关联的设备」。",
    ],
    links: [
      { label: "如何防范可疑消息（帮助中心）", href: "https://faq.whatsapp.com/573786218075805" },
    ],
    caution: "内置功能不能阻止你主动把验证码发给骗子——纪律仍是第一防线。",
  },
  {
    id: "scamshield",
    cover: "images/tools/tool-scamshield.jpg",
    stepsImage: "images/tools/steps-scamshield.jpg",
    stepsCaption: "官方商店下载并开启过滤权限",
    tier: "地区推荐",
    name: "ScamShield（新加坡防诈套件）",
    platforms: "iOS · Android",
    summary: "新加坡政府相关防诈工具：可协助拦截可疑来电/短信，并查验可疑信息。当地用户强烈建议安装。",
    why: [
      "新加坡警方通报 WhatsApp 盗号与冒充借钱案时，常直接建议安装 ScamShield。",
      "可过滤部分诈骗短信与来电，降低「骗码电话/钓鱼短信」到达率。",
      "官网提供查证渠道与预警信息。",
    ],
    steps: [
      "只从官方短链或 App Store / Google Play 安装。",
      "按指引开启通话/短信过滤相关权限。",
      "遇到可疑请求，可结合其查证功能与热线渠道核实。",
    ],
    links: [
      { label: "ScamShield 官网说明", href: "https://www.scamshield.gov.sg/about-scamshield/what-is-scamshield/" },
      { label: "iOS 下载（官方跳转）", href: "https://go.gov.sg/ss-ios" },
      { label: "Android 下载（官方跳转）", href: "https://go.gov.sg/ss-android" },
    ],
    caution: "非新加坡号码/环境可能不适用；不要下载仿冒「ScamShield」山寨包。",
  },
  {
    id: "scameter",
    cover: "images/tools/tool-scameter.jpg",
    stepsImage: "images/tools/steps-scameter.jpg",
    stepsCaption: "官方入口查证可疑链接或账户",
    tier: "地区推荐",
    name: "Scameter / Scameter+（香港防骗视伏器）",
    platforms: "网页 · App（以警方公布为准）",
    summary: "香港警方推广的查骗工具，可用于查证可疑平台、账户等。香港用户建议配合使用。",
    why: [
      "香港「网上账户骑劫」案件中 WhatsApp 占比极高，警方持续呼吁使用官方防骗工具。",
      "转账或点击前先查证，能减少盗号后的二次金钱损失。",
    ],
    steps: [
      "通过香港警方 CyberDefender / 官方公布渠道进入 Scameter。",
      "对陌生收款账户、可疑网站先查再操作。",
      "同时在 WhatsApp 开启两步验证并清查关联设备。",
    ],
    links: [
      { label: "香港政府相关防骗资讯入口", href: "https://www.cyberdefender.hk/" },
    ],
    caution: "查证工具不能替代「不给验证码」；盗号本身仍要靠账户设置与习惯。",
  },
  {
    id: "play-protect",
    cover: "images/tools/tool-play-protect.jpg",
    stepsImage: "images/tools/steps-play-protect.jpg",
    stepsCaption: "开启系统保护并保持更新",
    tier: "推荐",
    name: "Google Play 保护机制 / 系统安全更新",
    platforms: "Android · iOS",
    summary: "让系统与应用商店替你挡住大量恶意安装包，减少木马偷短信、偷屏幕的风险。",
    why: [
      "部分盗号会配合恶意 App 读取通知或辅助操作。",
      "及时系统补丁能缩小已知漏洞窗口。",
    ],
    steps: [
      "Android：开启 Google Play 保护机制；只允许官方商店安装。",
      "iOS/Android：打开自动更新，定期安装系统补丁。",
      "拒绝「允许未知来源安装」的临时诱惑。",
    ],
    links: [
      { label: "Google Play Protect 说明", href: "https://support.google.com/googleplay/answer/2812854" },
    ],
    caution: "系统防护挡不住社工骗码；它是设备层，不是话术层。",
  },
  {
    id: "password-manager",
    cover: "images/tools/tool-password-manager.jpg",
    stepsImage: "images/tools/steps-password-manager.jpg",
    stepsCaption: "用密码库安全保存 PIN",
    tier: "推荐",
    name: "密码管理器（保管两步验证 PIN）",
    platforms: "跨平台",
    summary: "用来安全保存 WhatsApp 两步验证 PIN 与邮箱密码，避免设成弱口令或写在聊天里。",
    why: [
      "许多人因「怕忘记」而设 123456，或把 PIN 发到自己另一个聊天备份——反而更危险。",
      "正规密码管理器可生成并加密保存高强度口令。",
    ],
    steps: [
      "从官方商店安装 Bitwarden、1Password、或系统自带钥匙串/密码等可信产品。",
      "为 WhatsApp 两步验证 PIN 单独建一条记录。",
      "密码管理器本身开启强主密码与生物识别。",
    ],
    links: [
      { label: "Bitwarden 官网", href: "https://bitwarden.com/" },
    ],
    caution: "不要用未知「PIN 保管 App」；更不要把 PIN 存进未加密备忘录云同步到到处。",
  },
  {
    id: "mobile-antivirus",
    cover: "images/tools/tool-mobile-antivirus.jpg",
    stepsImage: "images/tools/steps-mobile-antivirus.jpg",
    stepsCaption: "官方商店安装后全盘扫描",
    tier: "可选",
    name: "正规手机安全软件（防木马，不防骗术）",
    platforms: "Android 为主",
    summary: "若你经常侧载应用或设备环境复杂，可选知名厂商安全套件；它主要防恶意软件，不是防熟人要码。",
    why: [
      "可辅助发现可疑应用、钓鱼站点（能力因产品而异）。",
      "对「短信窃取木马」一类威胁有一定价值。",
    ],
    steps: [
      "只从 Google Play / App Store 安装知名产品（如 Malwarebytes、Bitdefender 等，按你地区可用性选择）。",
      "安装后做一次全盘扫描，复查短信/无障碍权限异常应用。",
      "不要同时堆叠多个互相冲突的安全套件。",
    ],
    links: [
      { label: "Malwarebytes 官网", href: "https://www.malwarebytes.com/" },
    ],
    caution: "任何杀毒都无法阻止你主动交出验证码；也绝不下载「WhatsApp 专杀盗号」无名 APK。",
  },
];

export const toolsAvoid = [
  "名称含「WhatsApp 防盗 / 找回大师 / 破解监视」却要求关闭 Play 保护的安装包",
  "要求你把验证码发给「客服机器人」才能开通防护的工具",
  "收费「代找回账号」并索要远程控制或注册码的服务",
  "来自网盘、Telegram 频道、短视频评论区的神秘 APK",
];
