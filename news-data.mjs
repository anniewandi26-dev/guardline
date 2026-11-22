/** GuardLine · 国际 WhatsApp 被盗/接管相关新闻与通报（公开信息整理） */
export const newsIntro = {
  title: "国际动态：WhatsApp 被盗与账号接管最新观察",
  lead: "以下 20 篇为GuardLine根据各国警方、网络安全机构与公开报道整理的专题稿，聚焦近年 WhatsApp 账号被接管、骗码、假投票与冒充借钱等态势。文中数据与日期来自公开通稿；界面与损失数字可能随后续统计调整，请以原文机构发布为准。",
};

export const news = [
  {
    slug: "01-singapore-spf-2024-06",
    region: "Singapore",
    date: "2024-06-07",
    source: "新加坡警察部队（SPF）",
    sourceUrl: "https://www.police.gov.sg/media-hub/news/2024/06/20240607_police_advisory_on_the_resurgence_of_whatsapp_account_takeover_scams",
    title: "新加坡警方预警：WhatsApp 账号接管骗局再度抬头",
    excerpt: "骗子利用已被盗账号向通讯录要验证码，或以视频通话要求屏幕共享偷看六位码，再冒充事主借钱或骗取银行卡信息。",
    body: `
      <p>2024 年 6 月 7 日，新加坡警察部队发布防诈通告，提醒公众警惕 WhatsApp 账号接管骗局再度活跃。通告指出，骗子在控制受害人账号后，会向其通讯录发送消息，以「借钱」「代买礼品卡」等理由骗取转账；部分案件还会进一步索取银行卡照片与支付 OTP，造成未授权扣款。</p>
      <h2>通报中的两类主要手法</h2>
      <ol>
        <li><strong>熟人骗码：</strong>受害人收到「联系人」消息，声称验证码发错，请帮忙转发六位数。该联系人账号往往已被盗。</li>
        <li><strong>屏幕共享窥码：</strong>骗子伪装成政府或银行人员发起视频通话，要求共享屏幕「核验资料」，再触发 WhatsApp 验证码显示在屏幕上被对方看见。</li>
      </ol>
      <h2>官方建议</h2>
      <ul>
        <li>验证码、银行资料、OTP 绝不外传。</li>
        <li>即使是通讯录好友的异常请求也要警惕。</li>
        <li>对屏幕共享请求先用其他方式核实身份。</li>
        <li>开启两步验证；设置手机锁屏并注意物理接触。</li>
      </ul>
      <div class="callout"><p>GuardLine解读：这则通告把「骗码」与「隔空看码」并列，说明防御不能只盯着「会不会把数字打出来发送」。</p></div>
    `,
  },
  {
    slug: "02-singapore-spf-2026-03",
    region: "Singapore",
    date: "2026-03-12",
    source: "新加坡警察部队（SPF）",
    sourceUrl: "https://www.police.gov.sg/media-hub/news/2026/03/20260312_police_advisory_involving_the_compromise_of_whatsapp_accounts",
    title: "新加坡再发通告：OTP 连环骗导致账号连续失守",
    excerpt: "骗子输入受害人号码触发 OTP，再由已被盗的「熟人」来要码；得手后复制同样话术攻击下一名联系人。",
    body: `
      <p>2026 年 3 月 12 日，SPF 再次就 WhatsApp 账号被入侵发布防诈提醒。流程被写得很清楚：骗子先用受害人手机号尝试登录 → 系统向受害人发送 OTP → 已失守的熟人账号发来消息，谎称「验证码本来是我的，发错到你那里了」→ 受害人交出 OTP 后被踢下线 → 骗子用新账号继续骗下一个人。</p>
      <h2>受害人通常何时察觉</h2>
      <ul>
        <li>自己突然无法登录 WhatsApp；或</li>
        <li>朋友告知「你正在向别人要验证码」。</li>
      </ul>
      <h2>通告强调的加固动作</h2>
      <ul>
        <li>设置 → 已关联的设备：移除不明设备。</li>
        <li>设置 → 账户 → 两步验证：开启。</li>
        <li>配合 ScamShield 等官方防诈工具查证可疑请求。</li>
      </ul>
      <p>通告称当时未汇总到金钱损失，但账号失守本身足以启动下一轮诈骗，社会成本仍然很高。</p>
    `,
  },
  {
    slug: "03-singapore-spf-2026-10",
    region: "Singapore",
    date: "2026-10-21",
    source: "新加坡警察部队（SPF）",
    sourceUrl: "https://www.police.gov.sg/media-hub/news/2026/10/20261021_police_advisory_on_social_media_impersonation_scams",
    title: "盗号后冒充借钱：新加坡两月至少 128 起、损失约 24.9 万新元",
    excerpt: "自 2026 年 9 月以来，骗子接管 WhatsApp 后假冒亲友、同事索取贷款或代付款，警方公布案件量与损失并重申 ScamShield。",
    body: `
      <p>2026 年 10 月 21 日通告显示：自同年 9 月起，至少 128 起案件涉及骗子控制 WhatsApp 后，在社交媒体/即时通讯中冒充事主向联系人借钱或要求「帮忙转账」，累计损失至少约 249,000 新元。</p>
      <h2>常见借口</h2>
      <ul>
        <li>银行转账限额到了，请你代付。</li>
        <li>自己转账不方便，请先借一笔。</li>
        <li>冒充子女，要求支付「AI/交流项目」费用。</li>
      </ul>
      <h2>警方 ADD-CHECK-TELL 框架</h2>
      <ol>
        <li><strong>ADD：</strong>安装 ScamShield，过滤可疑来电与短信。</li>
        <li><strong>CHECK：</strong>用官方渠道核实；对异常转账请求直接打电话问本人。</li>
        <li><strong>TELL：</strong>告知亲友与当局；若已转账立刻联系银行并报警。</li>
      </ol>
      <div class="callout"><p>GuardLine提醒：盗号往往只是第一阶段，第二阶段才是向通讯录「变现」。防盗与防借钱核身要一起做。</p></div>
    `,
  },
  {
    slug: "04-switzerland-ncsc-2026-10",
    region: "Switzerland",
    date: "2026-10-27",
    source: "瑞士国家网络安全中心（NCSC）",
    sourceUrl: "https://www.bacs.admin.ch/en/26w43-en",
    title: "瑞士 NCSC：十月假投票骗案激增，单月逾 50 宗相关报告",
    excerpt: "熟人账号发来「帮小朋友投票」链接，假站收短信码或诱导扫描关联设备二维码，造成接管或静默同步。",
    body: `
      <p>NCSC 在 2026 年第 43 周周报中称，WhatsApp 账号被盗/被入侵报告再度显著上升；仅 10 月就收到 50 多份此类骗局报告，且多起攻击成功。手法核心是「善意投票」：消息来自通讯录中已被控账号，以学校或舞蹈比赛拉票为名，催你快点点开。</p>
      <h2>假站的两条杀招</h2>
      <ol>
        <li>让你输入手机号与「短信验证码」——实为 WhatsApp 注册码，填完等于帮骗子在新设备激活账号。</li>
        <li>展示二维码，诱导用「关联设备」扫描——账号仍可用，但骗子网页端已挂上。</li>
      </ol>
      <h2>机构建议</h2>
      <ul>
        <li>即便熟人拉票也先换渠道核实。</li>
        <li>验证码不外传、不进网页。</li>
        <li>只在自有设备上为官方网页版扫码。</li>
        <li>开启两步验证 PIN。</li>
      </ul>
      <p>NCSC 提醒：域名会不断更换以绕过过滤，不能靠「记住某一个坏网址」一劳永逸。</p>
    `,
  },
  {
    slug: "05-switzerland-ncsc-week21",
    region: "Switzerland",
    date: "2026 (Week 21)",
    source: "瑞士 NCSC",
    sourceUrl: "https://www.bacs.admin.ch/en/26w21-en",
    title: "瑞士春夏已现「假竞赛投票」盗号潮，秋季再度回潮",
    excerpt: "NCSC 早在第 21 周就描述过「为孩子投票」话术；秋季周报显示同类攻击再次扩大，说明话术可长期复用。",
    body: `
      <p>瑞士 NCSC 在春季相关周报中已记录：受害者收到看似熟人的消息，请求为某孩子的比赛投票；点击后落入盗号陷阱并可能失去 WhatsApp 访问权。到了秋季（第 43 周），机构明确写到「这类攻击并不新鲜，但近期报告上升说明它又好用了」。</p>
      <h2>为什么要单独记住这则</h2>
      <p>同一国家、同一机构、前后两季重复预警，证明假投票不是一次性新闻，而是可季节性复燃的「成熟产品」。家庭群与学校群尤其要预设规则：拉票链接默认先核实。</p>
      <h2>给中文用户的迁移意义</h2>
      <p>话术可以本地化成「助力打卡」「抽奖投票」「公益联名」，结构不变：熟人转发 + 短时压力 + 要码或扫码。GuardLine第 04 篇长文即对应该结构。</p>
    `,
  },
  {
    slug: "06-ireland-ncsc-2024-08",
    region: "Ireland",
    date: "2024-08-22",
    source: "爱尔兰国家网络安全中心（NCSC）",
    sourceUrl: "https://ncsc.gov.ie/pdfs/2408200156_WhatsApp_Scam_Advice.pdf",
    title: "爱尔兰 NCSC：验证码骗局升级，商务 WhatsApp 暴露面受关注",
    excerpt: "顾问文件详述骗子如何先控熟人号，再制造紧迫感索要验证码；并提醒商务场景下账号失守可能牵出更多数据风险。",
    body: `
      <p>爱尔兰 NCSC 于 2024 年 8 月发布 WhatsApp 验证码骗局建议书，描述攻击链：取得手机号 → 在登录页输入该号触发真实验证码 → 通过已失守联系人身份联系受害人 → 以紧急协助为由索码 → 得手后接管并继续扩散。</p>
      <h2>特别提醒：商务用途</h2>
      <p>文件强调企业员工用 WhatsApp 处理工作时，账号一旦失守，暴露的不只是私人聊天，还可能包括客户沟通与内部协调信息。这与GuardLine「商务号专题」相互印证：经营号需要更严的设备与 PIN 保管制度。</p>
      <h2>核心句子</h2>
      <p>验证码绝不该分享；WhatsApp 不会主动向你要码，其他任何人也不该要。</p>
    `,
  },
  {
    slug: "07-cayman-rcips-2024",
    region: "Cayman Islands",
    date: "2024-08 / 2024-09",
    source: "开曼群岛皇家警察（RCIPS）",
    sourceUrl: "https://www.rcips.ky/rcips-cybercrime-unit-warns-of-scam-circulating-via-whatsapp-11-july",
    title: "加勒比警方连续预警：伪冒本地来电 + AI 语音模仿助攻盗号",
    excerpt: "RCIPS 称接管骗局持续有人中招；出现伪造本地区号来电，并有报告称骗子使用 AI 模仿语音制造可信度。",
    body: `
      <p>开曼群岛皇家警察在 2024 年多次更新 WhatsApp 账号接管骗局警告。8 月通告回顾经典路径：短信/WhatsApp/电话制造恐慌 → 索取六位验证码 → 账户易主 → 冒充事主诈骗联系人。9 月更新则提到：近期受害者接到看起来像本地（345）号码的电话，实为境外伪造来电显示；有报告称口音特征明显，且存在 AI 深伪音频模仿。</p>
      <h2>警方列明「不要做」的事</h2>
      <ul>
        <li>不要回复可疑消息</li>
        <li>不要打开附件</li>
        <li>不要点击消息中的链接</li>
        <li>不要生成并把 WhatsApp 六位码发给任何人</li>
      </ul>
      <div class="callout"><p>国际趋势观察：电话显示号码可伪造，AI 声音可模仿——「听起来像本地/像本人」不再等于安全。</p></div>
    `,
  },
  {
    slug: "08-trinidad-ttcsirt-2024-11",
    region: "Trinidad and Tobago",
    date: "2024-11-21",
    source: "TTCSIRT",
    sourceUrl: "https://ttcsirt.gov.tt/whatsapp-phishing-campaign-alert/",
    title: "TTCSIRT：品牌大使投票话术钓鱼，得手后改商务资料继续扩散",
    excerpt: "攻击者以「帮我投票当品牌大使」开场骗取验证码；控制账号后可能改为商务资料，再对通讯录二次钓鱼。",
    body: `
      <p>特立尼达和多巴哥网络安全事件响应团队（TTCSIRT）在 2024 年 11 月警告正在发生的 WhatsApp 钓鱼活动。话术示例包括请对方帮忙投票支持自己成为品牌大使，语气礼貌、像朋友拜托。</p>
      <h2>攻击阶段</h2>
      <ol>
        <li>伪装成认识的人请求「帮忙」。</li>
        <li>诱使受害人交出 MFA/验证码。</li>
        <li>完成账号接管。</li>
        <li>可能把资料改成商务形象，提高后续诈骗可信度。</li>
        <li>对受害人通讯录发动下一轮钓鱼。</li>
      </ol>
      <p>该通报提醒我们：界面上的「商务账号」标记并不自动等于可信商家，尤其当对方突然改资料并开始群发奇怪请求时。</p>
    `,
  },
  {
    slug: "09-hongkong-scmp-2024-04",
    region: "Hong Kong",
    date: "2024-04",
    source: "香港警方 / 媒体报道（SCMP 等）",
    sourceUrl: "https://www.scmp.com/news/hong-kong/law-and-crime/article/3259805/hong-kong-police-sound-alarm-over-resurgence-fraudsters-hijacking-whatsapp-accounts",
    title: "香港警示即时通讯骑劫回潮：首季损失超 2000 万港元，九成涉 WhatsApp",
    excerpt: "网络安全及科技罪案调查科公布首季 864 宗账户被骑劫案，损失约 2040 万港元；逾九成涉及 WhatsApp。",
    body: `
      <p>据公开报道，香港警方在 2024 年 4 月前后警示即时通讯账户骑劫骗局回潮：同年第一季度录得 864 宗相关案件，损失约 2040 万港元，其中超过 90% 涉及 WhatsApp。骗子通过钓鱼链接等方式取得关键信息接管账号，再读取通讯录实施诈骗。</p>
      <h2>本地常见后续动作</h2>
      <ul>
        <li>冒充事主向亲友借钱或要求购买点数卡。</li>
        <li>利用过往聊天语气降低怀疑。</li>
      </ul>
      <h2>防御呼应</h2>
      <p>警方一贯建议：开两步验证、检查关联设备、慎点链接、转账前电话核实。香港用户还可配合 Scameter 等官方查骗工具。</p>
    `,
  },
  {
    slug: "10-hongkong-2025-03",
    region: "Hong Kong",
    date: "2025-03 / 2025-04",
    source: "香港警方（公开社交媒体通报）",
    sourceUrl: "https://www.thestandard.com.hk/news/article/300425/HK-warns-of-fraudsters-hijacking-whatsapp-accounts",
    title: "2025 年 3 月单月 93 宗 WhatsApp 骑劫，损失逾千万港元",
    excerpt: "警方提醒尤其提防「海外亲友紧急要钱」；强调登出不明设备、开两步验证、不点可疑链接、不分享验证码。",
    body: `
      <p>2025 年 4 月相关报道援引警方信息：仅 3 月便录得 93 宗 WhatsApp 账户骑劫案，损失超过 1000 万港元。骗子接管后研究聊天记录，模仿语气，再编造医疗或旅行紧急状况逼你转账。</p>
      <h2>警方四条自我保护提示（报道归纳）</h2>
      <ol>
        <li>登出无法识别的关联设备，开启两步验证。</li>
        <li>不要点击 WhatsApp 里的可疑链接。</li>
        <li>绝不分享密码或验证码。</li>
        <li>联系人突然要钱，先打电话核实。</li>
      </ol>
      <p>数字说明：即便整体某些诈骗类别后来有所回落，单月千万级损失仍足以证明威胁未消失。</p>
    `,
  },
  {
    slug: "11-hongkong-2025-deepfake",
    region: "Hong Kong",
    date: "2025",
    source: "香港警方公开案情（媒体报道）",
    sourceUrl: "https://www.hk01.com/%E7%A4%BE%E6%9C%83%E6%96%B0%E8%81%9E/60289703/%E8%A9%90%E9%A8%99-%E9%A6%969%E5%80%8B%E6%9C%883%E8%90%AC%E5%AE%97%E6%B6%89%E6%AC%BE56-4%E5%84%84-%E9%A8%99%E5%BE%92%E9%A8%8E%E5%8A%ABwhatsapp%E5%B8%B3%E6%88%B6%E5%91%83%E8%B5%B01-45%E5%84%84",
    title: "香港巨额个案：骑劫 WhatsApp + 深伪声线，单案涉款约 1.45 亿港元",
    excerpt: "骗徒长期监察聊天，假冒公司人员并用深伪技术模仿声线，诱导受害人转移虚拟资产。",
    body: `
      <p>据 2025 年相关案情披露，香港当年最大型骗案之一涉及 WhatsApp 账户骑劫，涉款约 1.45 亿港元。骗子并非得手后立刻要钱，而是持续观察对话；作案时假冒公司职员，并使用深伪技术模仿其声线，通过语音讯息指示受害人把虚拟资产转入另一钱包。</p>
      <h2>这则新闻为什么重要</h2>
      <ul>
        <li>说明「听起来像同事」可能是合成音频。</li>
        <li>高价值转账需要超出聊天与语音的双人/双渠道确认。</li>
        <li>账户被静默同步（例如关联设备）时，骗子能获得语气与业务上下文。</li>
      </ul>
      <div class="callout"><p>GuardLine对应阅读：AI 语音冒充专题 + 关联设备手册 + 商务号防护。</p></div>
    `,
  },
  {
    slug: "12-uk-actionfraud-code",
    region: "U.K.",
    date: "2023-03-27 (method still used)",
    source: "英国 Action Fraud",
    sourceUrl: "https://www.actionfraud.police.uk/alert/warning-issued-to-whatsapp-users-over-account-takeover-scam",
    title: "英国 Action Fraud：伪装好友索要六位激活码，报告数攀升",
    excerpt: "骗子先控熟人号，再以「验证码发错」为由索码；官方提出 THINK. CALL. 与两步验证建议。",
    body: `
      <p>英国反诈机构 Action Fraud 曾警告：收到逾 60 份与 WhatsApp 账号接管相关的报告。骗子控制你通讯录中某人的账号后，先正常寒暄，同时用你的号码触发六位激活码短信，再谎称码发错请你转发。</p>
      <h2>官方行动建议</h2>
      <ul>
        <li>在 App 内举报并封锁。</li>
        <li>永远不要分享激活码。</li>
        <li><strong>THINK. CALL.</strong>——异常请求先打电话确认。</li>
        <li>设置 → 账户 → 两步验证 → 开启。</li>
      </ul>
      <p>尽管警示发布较早，其描述的攻击模板与 2024–2026 年新加坡、爱尔兰、瑞士通报高度同构，说明这是跨年、跨国的「标准作业程序」。</p>
    `,
  },
  {
    slug: "13-uk-actionfraud-groups",
    region: "U.K.",
    date: "Recent advisories",
    source: "英国 Action Fraud",
    sourceUrl: "https://www.actionfraud.police.uk/whatsappscam",
    title: "社区与宗教群成目标：先骗注册码，再向群友紧急求援",
    excerpt: "Action Fraud 称自当年 1 月起收到 268 份相关报告；骗子渗透大型社区/宗教群，以视频通话注册为名索要一次性密码。",
    body: `
      <p>另一则 Action Fraud 警示聚焦大型社区、校友、工作与宗教 WhatsApp 群。骗子可能先用伪头像/昵称取得信任，再以「加入群视频通话需要一次性密码」为名索要注册码，从而把受害人 WhatsApp 迁到新设备；得手后开启两步验证锁死原机主，并向群友或亲友紧急借钱。</p>
      <h2>为何群环境更危险</h2>
      <ul>
        <li>成员彼此有「互助」文化，紧急求助成功率更高。</li>
        <li>群内昵称与头像容易被模仿。</li>
        <li>一次接管可触达数十上百人。</li>
      </ul>
      <p>管理员应推动全员开两步验证，并规定：群内任何要码、要钱，必须场外核实。</p>
    `,
  },
  {
    slug: "14-malaysia-mcmc-2026-09",
    region: "Malaysia",
    date: "2026-09-25",
    source: "马来西亚通讯及多媒体委员会（MCMC）",
    sourceUrl: "https://www.mcmc.gov.my/skmmgovmy/media/General/pdf2/MEDIA-STATEMENT_MCMC-INVESTIGATING-COMPLAINTS-RELATED-TO-WHATSAPP-ACCOUNTS.pdf",
    title: "MCMC：关注 WhatsApp 被黑/被封投诉，警惕收费「代找回」",
    excerpt: "委员会区分「账号被接管」与「平台封禁」；提醒勿分享验证码与 PIN，勿相信收费恢复中介，应走官方渠道。",
    body: `
      <p>2026 年 9 月 25 日，MCMC 发表媒体声明，称注意到公众对 WhatsApp 账号被入侵、被封锁或无法使用的关切，并已将相关个案转介 Meta 厘清处理。声明特别澄清：账号被不法人士接管后，可能被滥发诈骗/垃圾信息并违反服务条款，进而遭到平台封禁——这是两类相关但不同的问题。</p>
      <h2>给用户的关键提醒</h2>
      <ul>
        <li>通过 WhatsApp 官方渠道恢复或申诉。</li>
        <li>不要分享验证码或安全 PIN。</li>
        <li>开启两步验证，远离可疑链接与不明应用。</li>
        <li>提防以收费、索要个人信息或验证码为条件的「代找回」服务。</li>
      </ul>
      <div class="callout"><p>GuardLine补充：任何让你「先把验证码给他才能找回」的人，都可能是二次行骗。</p></div>
    `,
  },
  {
    slug: "15-india-call-merge",
    region: "India",
    date: "Recent technical reports",
    source: "公开技术/警政访谈报道（如 Indian Express 等）",
    sourceUrl: "https://indianexpress.com/article/technology/how-hackers-take-over-whatsapp-accounts-and-ways-to-stop-them-9887282/",
    title: "印度观察：OTP 钓鱼、SIM 换卡、合并通话听码多线并行",
    excerpt: "报道梳理骗子如何结合社工与电信侧手段接管 WhatsApp，并引用 Meta 建议：永不分享六位码、开启两步验证。",
    body: `
      <p>印度主流科技报道汇总多种接管路径：OTP 钓鱼（假客服/假好友要码）、SIM swapping（号卡被过户后接收短信）、短暂物理接触后关联 WhatsApp Web，以及「合并通话」让受害人在不知情中接通验证语音、旁听 OTP。</p>
      <h2>值得记的红旗</h2>
      <ul>
        <li>未请求却收到 WhatsApp 验证码。</li>
        <li>好友突然要 OTP。</li>
        <li>无故被登出。</li>
        <li>提示号码在新设备注册。</li>
      </ul>
      <h2>防护组合</h2>
      <p>报道与 Meta 回应共同强调：不分享 PIN/验证码、开两步验证、慎合并陌生通话、定期检查关联设备、限制隐私可见范围。对中文读者，这些条目与GuardLine 01–08、17 篇一一对应。</p>
    `,
  },
  {
    slug: "16-eset-linked-devices",
    region: "International (security vendor)",
    date: "Public security blog",
    source: "ESET 等安全研究文章",
    sourceUrl: "https://www.eset.com/blog/en/home-topics/privacy-and-identity-protection/whatsapp-hacked-what-to-do/",
    title: "安全厂商提醒：关联设备静默同步，手机「看起来正常」也已被看光",
    excerpt: "最快自检是打开「已关联的设备」；陌生浏览器会话应立即登出。并强调两步验证要绑定恢复邮箱。",
    body: `
      <p>ESET 等安全文章指出：许多用户以为「没被踢下线就没被盗」。实际上攻击者可能只挂上 WhatsApp Web/桌面会话，实时阅读聊天。30 秒自检方法：设置 → Linked Devices，不认识的一律 Log out。</p>
      <h2>其他妥协信号</h2>
      <ul>
        <li>异常登出后又要登录。</li>
        <li>出现你未发送消息的回复。</li>
        <li>联系人反馈异常索要。</li>
      </ul>
      <h2>恢复邮箱的重要性</h2>
      <p>文章强调两步验证开启时务必添加恢复邮箱——若别人抢先设 PIN，有无邮箱可能决定你是几分钟找回还是等待多日。这与 WhatsApp 帮助中心的夺回说明一致。</p>
    `,
  },
  {
    slug: "17-scamshield-explain",
    region: "Singapore",
    date: "Ongoing",
    source: "ScamShield / Ask.gov.sg",
    sourceUrl: "https://ask.gov.sg/scamshield/questions/cmojwj52s00ct4d01h5oqjqmp",
    title: "ScamShield 图解：WhatsApp 接管四步，以及为何「谁要 OTP 都是诈骗」",
    excerpt: "官方问答把攻击拆成触发 OTP、熟人索码、踢下线、冒充扩散四步，并给出两步验证与关联设备清理指引。",
    body: `
      <p>新加坡 ScamShield 相关问答用极清楚的四步描述接管：1）骗子用你的号登录触发 OTP；2）已被盗的联系人来要你转发；3）你交出后被登出；4）骗子用你的身份重复骗下家。</p>
      <h2>官方原级提醒</h2>
      <p>任何分享 WhatsApp OTP 的请求，不论看起来来自谁，都应视为诈骗。OTP 只属于接收者本人；平台与「客服」都不会这样要码。</p>
      <h2>保护清单</h2>
      <ul>
        <li>永不分享 OTP</li>
        <li>开启两步验证</li>
        <li>审查并移除陌生关联设备</li>
        <li>若被盗，用非 WhatsApp 渠道通知联系人</li>
      </ul>
    `,
  },
  {
    slug: "18-whatsapp-official-security",
    region: "Global (platform)",
    date: "Ongoing",
    source: "WhatsApp Security",
    sourceUrl: "https://www.whatsapp.com/security",
    title: "WhatsApp 官方安全页：两步验证、只用正版、群组控制与举报工具",
    excerpt: "平台重申多层防护与用户可操作开关；明确假冒客户端会带来严重隐私与安全风险。",
    body: `
      <p>WhatsApp 官方安全中心概述其默认隐私、垃圾信息检测、异常接管提示等能力，并给用户可执行清单：开启两步验证、始终使用官方应用、管理群组添加权限、学习识别骗局、善用封锁与举报、必要时重新注册夺回账号。</p>
      <h2>对「下软件防盗」读者的意义</h2>
      <p>官方立场非常明确：先把正版客户端与内置开关用好，而不是寻找来路不明的第三方「防盗插件」。GuardLine工具页的排序也遵循这一原则。</p>
      <h2>举报的价值</h2>
      <p>举报不一定让你立刻拿回损失，但能帮助平台打击滥用账号，降低你的通讯录继续被精准打击的概率。</p>
    `,
  },
  {
    slug: "19-jamaica-cirt",
    region: "Jamaica",
    date: "Public alert",
    source: "Jamaica CIRT",
    sourceUrl: "https://cirt.gov.jm/alert/increased-threat-against-whatsapp-users",
    title: "牙买加 CIRT：钓鱼与劫持并存，强调登出关联设备并重开两步验证",
    excerpt: "警报描述恶意链接与账号劫持风险；若怀疑失守，应清理关联设备、重置两步验证，并向 spam@whatsapp.com 等渠道举报钓鱼（以官方当前指引为准）。",
    body: `
      <p>牙买加网络安全事件响应团队曾发布面向 WhatsApp 用户的威胁上升警报，指出诈骗信息与账号劫持并行。钓鱼可能伪装成正规机构，诱导点击假登录页或交出验证码；劫持成功后可冒充事主、读取联系人并扩散。</p>
      <h2>失守后的技术动作（通报归纳）</h2>
      <ul>
        <li>设置 → Linked Devices：登出全部不明设备。</li>
        <li>重开/重设两步验证。</li>
        <li>向联系人预警。</li>
        <li>按官方说明举报钓鱼样本。</li>
      </ul>
      <p>该警报与欧美、亚洲通稿再次对齐：清理关联设备 + 两步验证是国际通用急救包。</p>
    `,
  },
  {
    slug: "20-meta-scam-accounts-takedown",
    region: "Worldwide",
    date: "H1 2025 disclosures",
    source: "公开报道援引 Meta 数据",
    sourceUrl: "https://gbcode.rthk.hk/TuniS/news.rthk.hk/rthk/en/component/k2/1819282-20250822.htm",
    title: "平台治理侧写：Meta 披露打击诈骗广告与关联诈骗中心的 WhatsApp 账号",
    excerpt: "报道援引：Meta 在 2025 上半年撤销逾 680 万个与诈骗中心相关的 WhatsApp 账号；同时提醒用户端仍需自保。",
    body: `
      <p>在香港等地区就科技罪案召开的公开说明中，有报道援引 Meta 数据：2025 上半年撤销了超过 680 万个与诈骗中心相关的 WhatsApp 账号，并在其他平台清理大量诈骗广告。这说明平台侧在持续打击，但无法替代用户端的两步验证与验证码纪律。</p>
      <h2>阅读这篇的正确姿势</h2>
      <ul>
        <li>不要因为「平台会封号」就放松个人设置。</li>
        <li>被盗号用来群发的账号，可能很快被封，但你的亲友可能在被封前已经完成转账。</li>
        <li>个人能做的最快动作，仍是：不给码、开两步、清设备、要钱先核实。</li>
      </ul>
      <div class="callout"><p>国际新闻合集的结论：从加勒比到西欧、从东南亚到东亚，话术细节不同，结构高度相似。把GuardLine 30 篇长文当成「操作手册」，把本页当成「为什么现在就要做」的证据墙。</p></div>
    `,
  },
];
