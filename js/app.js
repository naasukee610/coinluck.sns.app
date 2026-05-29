/* =============================================
   COIN LUCK SNS運用管理アプリ
   ============================================= */

// =============================================
// CONFIG
// =============================================

const STATUSES = ['撮影中', 'ゆっきー', 'せい', 'ともちん', 'な', '投稿', '広告', '完了'];

const STATUS_STYLE = {
  '撮影中':  { bg: '#F2EFEC', text: '#7A7068', border: '#C8C0B8' },
  'ゆっきー':{ bg: '#F5ECEE', text: '#8C5468', border: '#CCA8B4' },
  'せい':    { bg: '#E2EDE6', text: '#2D6045', border: '#80AA8E' },
  'ともちん':{ bg: '#F5EDD6', text: '#7A5E1C', border: '#C8A848' },
  'な':      { bg: '#F2EFEC', text: '#7A7068', border: '#C8C0B8' },
  '投稿':    { bg: '#EAE6E2', text: '#6B6159', border: '#BCB4AC' },
  '広告':    { bg: '#F2EFEC', text: '#7A7068', border: '#C8C0B8' },
  '完了':    { bg: '#EAE6E2', text: '#6B6159', border: '#BCB4AC' },
};

const STATUS_CATEGORIES = {
  'ゆっきー': ['編集', 'サムネイル', '音源'],
  'せい':     ['編集', '音源'],
  'ともちん': ['編集', 'サムネイル', '音源'],
  'な':       ['編集'],
};

const STORES = ['仙台', '岐阜', '札幌', '広島', '東京', '福岡'];

const PLATFORMS = [
  { id: 'tiktok_jp',    name: 'TikTok' },
  { id: 'instagram_jp', name: 'Instagram' },
  { id: 'youtube_jp',   name: 'YouTube' },
  { id: 'tiktok_en',    name: '英TikTok' },
  { id: 'instagram_en', name: '英Instagram' },
  { id: 'youtube_en',   name: '英YouTube' },
];

// 日本の祝日 2024–2026
const JP_HOLIDAYS = {
  '2024-01-01': '元日',
  '2024-01-08': '成人の日',
  '2024-02-11': '建国記念の日',
  '2024-02-12': '建国記念日 振替',
  '2024-02-23': '天皇誕生日',
  '2024-03-20': '春分の日',
  '2024-04-29': '昭和の日',
  '2024-05-03': '憲法記念日',
  '2024-05-04': 'みどりの日',
  '2024-05-05': 'こどもの日',
  '2024-05-06': 'こどもの日 振替',
  '2024-07-15': '海の日',
  '2024-08-11': '山の日',
  '2024-08-12': '山の日 振替',
  '2024-09-16': '敬老の日',
  '2024-09-22': '秋分の日',
  '2024-09-23': '秋分の日 振替',
  '2024-10-14': 'スポーツの日',
  '2024-11-03': '文化の日',
  '2024-11-04': '文化の日 振替',
  '2024-11-23': '勤労感謝の日',
  '2025-01-01': '元日',
  '2025-01-13': '成人の日',
  '2025-02-11': '建国記念の日',
  '2025-02-23': '天皇誕生日',
  '2025-02-24': '天皇誕生日 振替',
  '2025-03-20': '春分の日',
  '2025-04-29': '昭和の日',
  '2025-05-03': '憲法記念日',
  '2025-05-04': 'みどりの日',
  '2025-05-05': 'こどもの日',
  '2025-05-06': 'みどりの日 振替',
  '2025-07-21': '海の日',
  '2025-08-11': '山の日',
  '2025-09-15': '敬老の日',
  '2025-09-23': '秋分の日',
  '2025-10-13': 'スポーツの日',
  '2025-11-03': '文化の日',
  '2025-11-23': '勤労感謝の日',
  '2025-11-24': '勤労感謝の日 振替',
  '2026-01-01': '元日',
  '2026-01-12': '成人の日',
  '2026-02-11': '建国記念の日',
  '2026-02-23': '天皇誕生日',
  '2026-03-20': '春分の日',
  '2026-04-29': '昭和の日',
  '2026-05-03': '憲法記念日',
  '2026-05-04': 'みどりの日',
  '2026-05-05': 'こどもの日',
  '2026-05-06': '憲法記念日 振替',
  '2026-07-20': '海の日',
  '2026-08-11': '山の日',
  '2026-09-21': '敬老の日',
  '2026-09-23': '秋分の日',
  '2026-10-12': 'スポーツの日',
  '2026-11-03': '文化の日',
  '2026-11-23': '勤労感謝の日',
};

// 年間行事（祝日ではない記念日・イベント）
const ANNUAL_EVENTS = {
  '01-07': '七草',
  '02-03': '節分',
  '02-14': 'バレンタイン',
  '03-14': 'ホワイトデー',
  '04-01': 'エイプリルフール',
  '07-07': '七夕',
  '10-31': 'ハロウィン',
  '12-24': 'クリスマスイブ',
  '12-25': 'クリスマス',
  '12-31': '大晦日',
};

const TEAM = [
  { id: 'tomochin', name: 'ともちん', role: 'リーダー', emoji: '👑' },
  { id: 'yukkie',   name: 'ゆっきー',  role: 'PM',       emoji: '📊' },
  { id: 'seisei',   name: 'せいせい',  role: 'クリエイター', emoji: '🎨' },
];

// day: 0=Sun … 6=Sat
const DAILY_SCHEDULE = {
  0: [ // 日曜
    { platform: 'youtube_jp', note: '過去動画アップ' },
    { platform: 'youtube_en', note: '10:00 投稿' },
  ],
  1: [ // 月曜
    { platform: 'youtube_jp', note: '過去動画アップ' },
    { platform: 'youtube_en', note: '10:00 投稿' },
  ],
  2: [ // 火曜
    { platform: 'youtube_jp', note: '過去動画アップ' },
    { platform: 'youtube_en', note: '10:00 投稿' },
  ],
  3: [], // 水曜
  4: [], // 木曜
  5: [ // 金曜 ★ メイン投稿日
    { platform: 'tiktok_jp',    note: 'メイン投稿日', highlight: true },
    { platform: 'instagram_jp', note: '各店舗1本ずつ', highlight: true },
    { platform: 'youtube_jp',   note: 'TikTok同じ動画をアップ' },
  ],
  6: [ // 土曜
    { platform: 'tiktok_jp',    note: '金曜に次ぐ投稿日' },
    { platform: 'instagram_jp', note: '土曜もOK' },
    { platform: 'youtube_jp',   note: 'TikTok同じ動画をアップ' },
    { platform: 'instagram_en', note: 'メイン投稿日', highlight: true },
    { platform: 'tiktok_en',    note: 'メイン投稿日', highlight: true },
    { platform: 'youtube_en',   note: '10:00 投稿' },
  ],
};

const POSTING_RULES = {
  tiktok_jp:    {
    name: 'TikTok（日本語）', icon: '🎵', color: '#FF0050',
    rules: ['金土と祝前日のみ', '日曜は間に合わない時のみ', '祝日当日は日曜扱い（次の日が平日の時）', '1日1本まで'],
  },
  instagram_jp: {
    name: 'Instagram（日本語）', icon: '📸', color: '#E1306C',
    rules: ['基本金曜に更新', '1店舗1日1本まで', '土曜にあげても問題なし'],
  },
  youtube_jp:   {
    name: 'YouTube（日本語）', icon: '▶️', color: '#FF0000',
    rules: ['TikTok更新時に同じ動画をあげる', '月火日に過去動画を上げる', '1日1本'],
  },
  instagram_en: {
    name: '英語Instagram', icon: '📸', color: '#833AB4',
    rules: ['編集完了したタイミングで更新', '基本土曜に投稿'],
  },
  tiktok_en:    {
    name: '英語TikTok', icon: '🎵', color: '#00F2EA',
    rules: ['編集完了したタイミングで更新', '基本土曜に投稿'],
  },
  youtube_en:   {
    name: '英語YouTube', icon: '▶️', color: '#FF0000',
    rules: ['月火土日の10:00で投稿', '投稿スケジュール既にあり'],
  },
};

const MONTHLY_REELS = [
  {
    productionMonth: '4月', postMonth: '5月',
    videos: [
      { id: 'apr-1', title: 'GWスポット',      note: 'GW前に投稿' },
      { id: 'apr-2', title: 'カスタムリング',   note: '' },
    ],
  },
  {
    productionMonth: '5月', postMonth: '6月',
    videos: [
      { id: 'may-1', title: '流行ってる',          note: '' },
      { id: 'may-2', title: 'やりたいことリスト',  note: '' },
    ],
  },
  {
    productionMonth: '6月', postMonth: '7月',
    videos: [
      { id: 'jun-1', title: '夏リング作り', note: '' },
      { id: 'jun-2', title: 'おしゃれ好き', note: '' },
    ],
  },
  {
    productionMonth: '7月', postMonth: '8月',
    videos: [
      { id: 'jul-1', title: '自分で作る',  note: '' },
      { id: 'jul-2', title: 'サマーvlog', note: '' },
    ],
  },
];

const CIRCLED = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
const DAY_NAMES = ['日', '月', '火', '水', '木', '金', '土'];

const PLATFORM_SHORT = {
  tiktok_jp:    'TT',
  instagram_jp: 'IG',
  youtube_jp:   'YT',
  tiktok_en:    '英TT',
  instagram_en: '英IG',
  youtube_en:   '英YT',
};

const DEFAULT_CAL_SCHEDULE = [
  { id: 'dl05', day: 5,  items: ['見本動画撮影'] },
  { id: 'dl10', day: 10, items: ['月リール①編集'] },
  { id: 'dl15', day: 15, items: ['月リール②編集'] },
  { id: 'dl20', day: 20, items: ['来月台本', '見本動画シェア', '再来月動画決定'] },
];

// =============================================
// STATE
// =============================================

const state = {
  tasks:                   [],
  links:                   [],
  reels:                   [],
  notes:                   [],
  announcements:           [],
  noteCategoryOrder:       [],
  linkCategoryOrder:       [],
  activeTab:               'home',
  statusFilter:            '撮影中',
  videoSubTab:             'reels',
  editingTaskId:           null,
  editingLinkId:           null,
  editingNoteId:           null,
  editingAnnounceId:       null,
  calendarYear:            new Date().getFullYear(),
  calendarMonth:           new Date().getMonth(),
  calSchedule:             null,
  _updatedAt:              0,   // unix ms — used for cross-device conflict resolution
};

// drag state shared between desktop and touch handlers
const dragState = { taskId: null, fromStatus: null };

// =============================================
// STORAGE
// =============================================

function initReels() {
  return MONTHLY_REELS.map(m => ({
    id: uid(),
    year: 2026,
    type: 'monthly',
    productionMonth: m.productionMonth,
    postMonth: m.postMonth,
    videos: m.videos.map(v => ({ id: uid(), title: v.title, note: v.note || '' })),
  }));
}

function monthToNum(str) {
  return parseInt(str) || 0; // "4月" → 4, "12月" → 12
}

function initNotes() {
  return Object.entries(POSTING_RULES).map(([, rule], i) => ({
    id: uid(),
    content: `${rule.icon} ${rule.name}\n${rule.rules.map(r => `・${r}`).join('\n')}`,
    pinned: false,
    category: '投稿ルール',
    order: i,
    createdAt: new Date().toISOString(),
  }));
}

function loadState() {
  try {
    const raw = localStorage.getItem('coinluck_v1');
    if (raw) {
      const saved = JSON.parse(raw);
      state.tasks         = (saved.tasks  || []).map(t =>
        t.title?.includes('英語●') ? { ...t, title: t.title.replace(/英語●/g, '英語○') } : t
      );
      state.links         = saved.links  || [];
      state.reels         = saved.reels  && saved.reels.length
        ? saved.reels.map(r => ({ year: 2026, type: 'monthly', ...r }))
        : initReels();
      state.notes         = saved.notes  && saved.notes.length
        ? saved.notes.map(n => ({ category: 'メモ', ...n }))
        : initNotes();
      state.announcements      = saved.announcements      || [];
      state.noteCategoryOrder  = saved.noteCategoryOrder  || [];
      state.linkCategoryOrder  = saved.linkCategoryOrder  || [];
      state.calSchedule        = saved.calSchedule        || JSON.parse(JSON.stringify(DEFAULT_CAL_SCHEDULE));
      state._updatedAt         = saved.updatedAt          || 0;
    } else {
      state.reels      = initReels();
      state.notes      = initNotes();
      state.calSchedule = JSON.parse(JSON.stringify(DEFAULT_CAL_SCHEDULE));
      state._updatedAt  = 0;
    }
  } catch (_) {
    state.reels      = initReels();
    state.notes      = initNotes();
    state.calSchedule = JSON.parse(JSON.stringify(DEFAULT_CAL_SCHEDULE));
    state._updatedAt  = 0;
  }
}

// Prevents write-back loops when applying a Firebase snapshot
let _fbApplying = false;

function buildStateSnapshot() {
  return {
    tasks:             state.tasks,
    links:             state.links,
    reels:             state.reels,
    notes:             state.notes,
    announcements:     state.announcements,
    noteCategoryOrder: state.noteCategoryOrder,
    linkCategoryOrder: state.linkCategoryOrder,
    calSchedule:       state.calSchedule,
    updatedAt:         state._updatedAt,
  };
}

function saveState() {
  // Stamp the time of this user-initiated change
  state._updatedAt = Date.now();
  const data = buildStateSnapshot();
  // Cache locally for offline fallback
  try { localStorage.setItem('coinluck_v1', JSON.stringify(data)); } catch (_) {}
  // Firebase is the source of truth — write every user change
  if (!_fbApplying && typeof FB_REF !== 'undefined') {
    FB_REF.set(data).catch(() => {});
  }
}

// forceApply=true skips timestamp check (used on first Firebase connect)
function applyRemoteState(data, forceApply = false) {
  if (!data) return;
  const remoteTs = data.updatedAt || 0;
  const localTs  = state._updatedAt || 0;

  // If local state is strictly newer than remote, keep local and re-upload to fix Firebase
  if (!forceApply && remoteTs > 0 && localTs > remoteTs) {
    if (typeof FB_REF !== 'undefined') {
      FB_REF.set(buildStateSnapshot()).catch(() => {});
    }
    return;
  }

  state.tasks             = data.tasks             || [];
  state.links             = data.links             || [];
  state.announcements     = data.announcements     || [];
  state.noteCategoryOrder = data.noteCategoryOrder || [];
  state.linkCategoryOrder = data.linkCategoryOrder || [];
  if (data.calSchedule) state.calSchedule = data.calSchedule;
  if (data.reels && data.reels.length) {
    state.reels = data.reels.map(r => ({ year: 2026, type: 'monthly', ...r }));
  }
  if (data.notes && data.notes.length) {
    state.notes = data.notes.map(n => ({ category: 'メモ', ...n }));
  }
  state._updatedAt = remoteTs || localTs;
}

// =============================================
// UTILITIES
// =============================================

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// Returns category array in saved order, with any new categories appended
function getOrderedCats(existingCats, savedOrder) {
  const result = (savedOrder || []).filter(c => existingCats.includes(c));
  existingCats.forEach(c => { if (!result.includes(c)) result.push(c); });
  return result;
}

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatShortDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function getNextStatus(current) {
  const i = STATUSES.indexOf(current);
  return (i >= 0 && i < STATUSES.length - 1) ? STATUSES[i + 1] : null;
}

function platformLabel(id) {
  const p = PLATFORMS.find(x => x.id === id);
  return p ? p.name : id;
}

function statusBadge(status) {
  const s = STATUS_STYLE[status] || { bg: '#eee', text: '#666', border: '#ccc' };
  return `<span class="status-badge" style="background:${s.bg};color:${s.text};border:1.5px solid ${s.border};">${esc(status)}</span>`;
}

function showToast(msg, undoFn) {
  const el = document.getElementById('toast');
  clearTimeout(el._t);
  el.innerHTML = '';
  const msgSpan = document.createElement('span');
  msgSpan.textContent = msg;
  el.appendChild(msgSpan);
  if (undoFn) {
    const btn = document.createElement('button');
    btn.className = 'toast-undo-btn';
    btn.textContent = '元に戻す';
    btn.onclick = () => {
      el.classList.add('is-hidden');
      clearTimeout(el._t);
      undoFn();
    };
    el.appendChild(btn);
  }
  el.classList.remove('is-hidden');
  el._t = setTimeout(() => el.classList.add('is-hidden'), 5000);
}

function copyText(text) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(
      () => showToast('コピーしました！'),
      () => copyFallback(text)
    );
  } else {
    copyFallback(text);
  }
}

function copyFallback(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
  document.body.appendChild(ta);
  ta.focus();
  ta.setSelectionRange(0, ta.value.length); // iOS Safari requires this
  try {
    document.execCommand('copy');
    showToast('コピーしました！');
  } catch (_) {
    showToast('コピーできませんでした');
  }
  document.body.removeChild(ta);
}

function openLinkUrl(id) {
  const link = state.links.find(l => l.id === id);
  if (link && link.content) window.open(link.content, '_blank', 'noopener,noreferrer');
}

function copyLinkContent(id) {
  const link = state.links.find(l => l.id === id);
  if (link) copyText(link.content);
}

// =============================================
// NAVIGATION
// =============================================

function navigate(tab) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn[data-page], .sidebar-btn[data-page]')
    .forEach(b => b.classList.remove('active'));

  const page = document.getElementById(`page-${tab}`);
  if (page) page.classList.add('active');
  document.querySelectorAll(`.nav-btn[data-page="${tab}"], .sidebar-btn[data-page="${tab}"]`)
    .forEach(b => b.classList.add('active'));

  state.activeTab = tab;
  try { localStorage.setItem('coinluck_tab', tab); } catch (_) {}
  ({ home: renderHome, status: renderStatus, videos: renderVideos,
     posts: renderPosts, notes: renderNotes, links: renderLinks })[tab]?.();
}

// Exposed to inline onclick
function goToStatus(filter) {
  state.statusFilter = filter;
  navigate('status');
}

// =============================================
// HOME
// =============================================

function buildTodayTasksHTML() {
  const y = new Date().getFullYear();
  const m = String(new Date().getMonth() + 1).padStart(2, '0');
  const d = String(new Date().getDate()).padStart(2, '0');
  const todayStr = `${y}-${m}-${d}`;

  const todayTasks = state.tasks.filter(t =>
    (t.status === '投稿' || t.status === '広告') && t.postDate === todayStr
  );

  if (!todayTasks.length) {
    return `<div class="today-empty">本日の投稿タスクはありません</div>`;
  }

  const byPlatform = new Map();
  PLATFORMS.forEach(p => byPlatform.set(p.id, []));
  const noPlat = [];

  todayTasks.forEach(task => {
    const pids = (task.platforms || []).filter(pid => PLATFORMS.find(p => p.id === pid));
    if (pids.length) pids.forEach(pid => byPlatform.get(pid)?.push(task));
    else noPlat.push(task);
  });

  const taskCard = t => `<div class="today-task-item">
    <span class="today-task-title">${esc(t.title)}</span>
    <div class="today-task-btns">
      <button class="advance-btn today-advance-btn" onclick="advanceTaskTo('${t.id}','広告');event.stopPropagation()">→ 広告</button>
      <button class="advance-btn today-advance-btn" onclick="advanceTaskTo('${t.id}','完了');event.stopPropagation()">→ 完了</button>
    </div>
  </div>`;

  let html = '';
  PLATFORMS.forEach(platform => {
    const tasks = byPlatform.get(platform.id) || [];
    if (!tasks.length) return;
    html += `<div class="today-platform-group">
      <div class="today-platform-label">${platform.name}</div>
      ${tasks.map(taskCard).join('')}
    </div>`;
  });
  if (noPlat.length) {
    html += `<div class="today-platform-group">
      <div class="today-platform-label">未設定</div>
      ${noPlat.map(taskCard).join('')}
    </div>`;
  }
  return html;
}

function renderHome() {
  const now = new Date();
  const dateEl = document.getElementById('today-date');
  if (dateEl) {
    dateEl.innerHTML = `<div class="date-day">${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日（${DAY_NAMES[now.getDay()]}曜日）</div>`;
  }

  const counts = Object.fromEntries(STATUSES.map(s => [s, 0]));
  state.tasks.forEach(t => { if (counts[t.status] !== undefined) counts[t.status]++; });

  const dayName = DAY_NAMES[now.getDay()];

  const pipelineHTML = STATUSES.map(s => {
    const st = STATUS_STYLE[s];
    return `<div class="pipeline-item"
              style="background:${st.bg};border-color:${st.border};"
              onclick="goToStatus('${s}')">
              <div class="pipeline-count" style="color:${st.text}">${counts[s]}</div>
              <div class="pipeline-label" style="color:${st.text}">${esc(s)}</div>
            </div>`;
  }).join('');

  const announceItems = state.announcements.length
    ? state.announcements.map(a => `
        <div class="announce-item">
          <span class="announce-bullet">✔︎</span>
          <div class="announce-text">${esc(a.text)}</div>
          <button class="announce-del-btn"
            onclick="deleteAnnouncement('${a.id}');event.stopPropagation()" title="削除">✕</button>
        </div>`).join('')
    : `<div class="announce-empty">お知らせはありません</div>`;

  document.getElementById('home-content').innerHTML = `
    <div class="card home-nav-card" id="home-schedule-card" onclick="navigate('posts')" style="cursor:pointer">
      <div class="card-title">📌 本日の投稿リスト（${dayName}曜日）<span class="home-card-arrow">›</span></div>
      ${buildTodayTasksHTML()}
    </div>
    <div class="card" id="home-pipeline-card">
      <div class="card-title">📊 タスク進捗</div>
      <div class="pipeline-grid">${pipelineHTML}</div>
    </div>
    <div class="card" id="home-announce-card">
      <div class="announce-header">
        <div class="card-title" style="margin-bottom:0">📢 お知らせ</div>
        <button class="announce-add-btn" onclick="openAddAnnouncement()">＋ 追加</button>
      </div>
      ${announceItems}
    </div>
    <div class="card" id="home-calendar-card"></div>`;
  renderCalendarView();
}

// =============================================
// CALENDAR (HOME, desktop only)
// =============================================

function isHolidayEveDay(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const next = new Date(d);
  next.setDate(d.getDate() + 1);
  return !!JP_HOLIDAYS[toDateStrLocal(next)];
}

// Effective deadline: go back from target day until Mon/Tue/Fri and not holiday
function getEffectiveDeadline(year, month, day) {
  let d = new Date(year, month, day);
  for (let i = 0; i < 8; i++) {
    const dow = d.getDay();
    const ds  = toDateStrLocal(d);
    if ((dow === 1 || dow === 2 || dow === 5) && !JP_HOLIDAYS[ds]) return d;
    d.setDate(d.getDate() - 1);
  }
  return d;
}

function calPrevMonth() {
  if (state.calendarMonth === 0) { state.calendarYear--;  state.calendarMonth = 11; }
  else state.calendarMonth--;
  renderCalendarView();
}

function calNextMonth() {
  if (state.calendarMonth === 11) { state.calendarYear++; state.calendarMonth = 0; }
  else state.calendarMonth++;
  renderCalendarView();
}

function navigateToPostDate(dateStr) {
  navigate('posts');
  setTimeout(() => {
    const el = document.querySelector(`.post-date-section[data-date="${dateStr}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 150);
}

// =============================================
// SCHEDULE EDIT
// =============================================

let _schedDraft = null;

function openScheduleEdit() {
  _schedDraft = JSON.parse(JSON.stringify(state.calSchedule || DEFAULT_CAL_SCHEDULE));
  renderScheduleEditModal();
  document.getElementById('schedule-edit-modal').classList.remove('is-hidden');
}

function closeScheduleEdit() {
  document.getElementById('schedule-edit-modal').classList.add('is-hidden');
  _schedDraft = null;
}

function renderScheduleEditModal() {
  const el = document.getElementById('schedule-edit-body');
  if (!el) return;
  let html = '';
  _schedDraft.forEach((entry, idx) => {
    html += `<div class="sch-entry">
      <div class="sch-entry-head">
        <span class="sch-entry-title">【${entry.day}日〆切】</span>
        <button class="sch-del-entry" onclick="schedDeleteEntry(${idx})">〆切削除</button>
      </div>
      ${entry.items.map((item, iIdx) => `
        <div class="sch-item-row">
          <span class="sch-item-dot">・</span>
          <input type="text" class="sch-item-input" value="${esc(item)}"
            data-idx="${idx}" data-iidx="${iIdx}"
            oninput="schedUpdateItem(${idx},${iIdx},this.value)"
            placeholder="項目名を入力">
          <button class="sch-item-del" onclick="schedDeleteItem(${idx},${iIdx})">✕</button>
        </div>`).join('')}
      <button class="sch-add-item" onclick="schedAddItem(${idx})">＋ 項目追加</button>
    </div>`;
  });
  el.innerHTML = html;
}

function schedUpdateItem(entryIdx, itemIdx, value) {
  if (_schedDraft[entryIdx]) _schedDraft[entryIdx].items[itemIdx] = value;
}

function schedDeleteItem(entryIdx, itemIdx) {
  _schedDraft[entryIdx].items.splice(itemIdx, 1);
  renderScheduleEditModal();
}

function schedAddItem(entryIdx) {
  _schedDraft[entryIdx].items.push('');
  renderScheduleEditModal();
  const inputs = document.querySelectorAll(`.sch-item-input[data-idx="${entryIdx}"]`);
  if (inputs.length) inputs[inputs.length - 1].focus();
}

function schedDeleteEntry(entryIdx) {
  _schedDraft.splice(entryIdx, 1);
  renderScheduleEditModal();
}

function schedAddEntry() {
  const input = document.getElementById('new-dl-day');
  const day = parseInt(input.value);
  if (!day || day < 1 || day > 31) { input.focus(); return; }
  _schedDraft.push({ id: uid(), day, items: [''] });
  _schedDraft.sort((a, b) => a.day - b.day);
  input.value = '';
  renderScheduleEditModal();
}

function saveScheduleEdit() {
  // Collect latest input values
  document.querySelectorAll('.sch-item-input').forEach(inp => {
    const idx  = parseInt(inp.dataset.idx);
    const iidx = parseInt(inp.dataset.iidx);
    if (_schedDraft[idx]) _schedDraft[idx].items[iidx] = inp.value;
  });
  // Filter empty
  _schedDraft.forEach(e => { e.items = e.items.filter(s => s.trim() !== ''); });
  _schedDraft = _schedDraft.filter(e => e.items.length > 0);
  state.calSchedule = _schedDraft;
  saveState();
  renderCalendarView();
  closeScheduleEdit();
  showToast('スケジュールを保存しました');
}

function renderCalendarView() {
  const el = document.getElementById('home-calendar-card');
  if (!el) return;

  const year  = state.calendarYear;
  const month = state.calendarMonth;
  const todayStr = toDateStrLocal(new Date());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow    = new Date(year, month, 1).getDay(); // 0=Sun
  const startOffset = firstDow === 0 ? 6 : firstDow - 1; // Mon=col0

  const sched = state.calSchedule || DEFAULT_CAL_SCHEDULE;
  const dlDates = {};
  sched.forEach(entry => {
    const ds = toDateStrLocal(getEffectiveDeadline(year, month, entry.day));
    dlDates[ds] = entry;
  });

  const DOW_LABELS   = ['月', '火', '水', '木', '金', '土', '日'];
  const DOW_CLASSES  = ['', '', '', '', '', 'sat', 'sun'];
  const MONTH_NAMES  = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

  const headerHtml = DOW_LABELS.map((d, i) =>
    `<div class="cal-day-header ${DOW_CLASSES[i]}">${d}</div>`
  ).join('');

  let cellsHtml = `<div class="cal-cell empty"></div>`.repeat(startOffset);

  for (let day = 1; day <= daysInMonth; day++) {
    const d       = new Date(year, month, day);
    const ds      = toDateStrLocal(d);
    const dow     = d.getDay(); // 0=Sun
    const holiday = JP_HOLIDAYS[ds];
    const event   = ANNUAL_EVENTS[ds.slice(5)];
    const isSat   = dow === 6;
    const isSun   = dow === 0;
    const isPast  = ds < todayStr;
    const isToday = ds === todayStr;
    const isEve   = isHolidayEveDay(ds);

    let cls = 'cal-cell';
    if (isPast && !isToday) cls += ' past';
    if (isToday)  cls += ' today';
    if (isSat)    cls += ' is-sat';
    if (isSun || holiday) cls += ' is-sun';
    if (holiday)  cls += ' is-holiday';

    // Inline holiday/event next to date number
    let inlineExtra = '';
    if (holiday) inlineExtra = `<span class="cal-holiday-inline">${esc(holiday)}</span>`;
    else if (event) inlineExtra = `<span class="cal-event-inline">${esc(event)}</span>`;

    // Labels (plain text, no backgrounds)
    let labels = '';
    // 更新日: Mon/Tue/Fri/Sat/Sun + holiday eves + holidays
    if (dow === 0 || dow === 1 || dow === 2 || dow === 5 || dow === 6 || isEve || holiday)
      labels += `<span class="cal-label">更新日</span>`;
    // Deadlines from calSchedule
    const dlEntry = dlDates[ds];
    if (dlEntry) {
      labels += `<span class="cal-label cal-deadline">【${dlEntry.day}日〆切】</span>`;
      dlEntry.items.forEach(item => {
        labels += `<span class="cal-label cal-deadline-item">・${esc(item)}</span>`;
      });
    }

    // Tasks with postDate on this day
    const tasks = state.tasks.filter(t =>
      t.postDate === ds && (t.status === '投稿' || t.status === '広告')
    );
    let postsHtml = '';
    if (tasks.length) {
      const pids = new Set();
      tasks.forEach(t => (t.platforms || []).forEach(p => pids.add(p)));
      const chips = [...pids].map(p =>
        `<span class="cal-post-chip">${PLATFORM_SHORT[p] || p}</span>`
      ).join('');
      postsHtml = `<div class="cal-posts">${chips}<span class="cal-post-chip cal-post-total">${tasks.length}件</span></div>`;
    }

    cellsHtml += `<div class="${cls}" onclick="navigateToPostDate('${ds}')">
      <div class="cal-date-row">
        <span class="cal-date-num">${day}</span>${inlineExtra}
      </div>
      <div class="cal-labels">${labels}</div>
      ${postsHtml}
    </div>`;
  }

  const total    = startOffset + daysInMonth;
  const trailing = (7 - total % 7) % 7;
  cellsHtml += `<div class="cal-cell empty"></div>`.repeat(trailing);

  el.innerHTML = `
    <div class="cal-toolbar">
      <div style="display:flex;align-items:center;gap:8px">
        <span class="card-title" style="margin-bottom:0">📅 月間スケジュール</span>
        <button class="cal-edit-btn" onclick="openScheduleEdit()">⚙ 編集</button>
      </div>
      <div class="cal-month-nav">
        <button class="cal-nav-btn" onclick="calPrevMonth()">‹ 前月</button>
        <span class="cal-month-title">${year}年${MONTH_NAMES[month]}</span>
        <button class="cal-nav-btn" onclick="calNextMonth()">翌月 ›</button>
      </div>
    </div>
    <div class="cal-grid">${headerHtml}${cellsHtml}</div>`;
}

// =============================================
// ANNOUNCEMENTS
// =============================================

function openAddAnnouncement() {
  state.editingAnnounceId = null;
  document.getElementById('announce-modal-title').textContent = 'お知らせ追加';
  document.getElementById('announce-id').value   = '';
  document.getElementById('announce-text').value = '';
  document.getElementById('delete-announce-btn').classList.add('is-hidden');
  document.getElementById('announce-modal').classList.remove('is-hidden');
  setTimeout(() => document.getElementById('announce-text').focus(), 100);
}

function closeAnnounceModal() {
  document.getElementById('announce-modal').classList.add('is-hidden');
  state.editingAnnounceId = null;
}

function onSaveAnnouncement(e) {
  e.preventDefault();
  const text = document.getElementById('announce-text').value.trim();
  if (!text) return;
  if (state.editingAnnounceId) {
    const a = state.announcements.find(x => x.id === state.editingAnnounceId);
    if (a) a.text = text;
    showToast('お知らせを更新しました');
  } else {
    state.announcements.unshift({ id: uid(), text, createdAt: new Date().toISOString() });
    showToast('お知らせを追加しました');
  }
  saveState();
  closeAnnounceModal();
  if (state.activeTab === 'home') renderHome();
}

function deleteAnnouncement(id) {
  const ann = state.announcements.find(a => a.id === id);
  if (!ann) return;
  const saved = { ...ann };
  const savedIdx = state.announcements.indexOf(ann);
  state.announcements = state.announcements.filter(a => a.id !== id);
  saveState();
  renderHome();
  showToast('お知らせを削除しました', () => {
    state.announcements.splice(savedIdx, 0, saved);
    saveState();
    renderHome();
  });
}

// =============================================
// STATUS PAGE
// =============================================

function renderStatus() {
  renderStatusFilters();
  renderTaskCards();
  setupTaskDrag();
}

function renderStatusFilters() {
  const cnts = {};
  STATUSES.forEach(s => { cnts[s] = state.tasks.filter(t => t.status === s).length; });

  document.getElementById('status-filters').innerHTML =
    STATUSES.map(s =>
      `<button class="filter-chip${state.statusFilter === s ? ' is-active' : ''}"
         data-status="${s}" onclick="setFilter('${s}')">
         ${esc(s)} <span class="chip-count">${cnts[s]}</span>
       </button>`
    ).join('');
}

function setFilter(f) {
  state.statusFilter = f;
  renderStatus();
}

function renderTaskCards() {
  const list = state.tasks.filter(t => t.status === state.statusFilter);
  const el   = document.getElementById('status-content');
  const isPlatformView = state.statusFilter === '投稿' || state.statusFilter === '広告';
  const isCategoryView = !!STATUS_CATEGORIES[state.statusFilter];
  const isCompleteView = state.statusFilter === '完了';
  el.dataset.view = isPlatformView ? 'platform' : (isCategoryView ? 'category' : (isCompleteView ? 'complete' : 'list'));

  if (!list.length) {
    el.innerHTML = `<div class="empty-state">
      <span class="empty-icon">📭</span>
      <div class="empty-label">タスクがありません</div>
      <div class="empty-hint">＋ボタンからタスクを追加してください</div>
    </div>`;
    return;
  }

  if (isPlatformView) {
    renderStatusPlatformView(list, el);
    return;
  }

  if (isCategoryView) {
    renderStatusCategoryView(list, el);
    return;
  }

  if (isCompleteView) {
    renderStatusCompleteView(list, el);
    return;
  }

  el.innerHTML = list.map(task => {
    const st = STATUS_STYLE[task.status] || {};

    let advBtns = '';
    if (task.status === '完了') {
      advBtns = `<span class="done-chip">✓ 完了</span>`;
    } else if (task.status === 'ゆっきー') {
      advBtns = `<button class="advance-btn" onclick="advanceTaskTo('${task.id}','せい');event.stopPropagation()">→ せい</button>
                 <button class="advance-btn" onclick="advanceTaskTo('${task.id}','ともちん');event.stopPropagation()">→ ともちん</button>`;
    } else {
      const next = getNextStatus(task.status);
      if (next) advBtns = `<button class="advance-btn" onclick="advanceTaskTo('${task.id}','${next}');event.stopPropagation()">→ ${esc(next)}</button>`;
    }

    return `<div class="task-card" data-task-id="${task.id}"
         style="border-left-color:${st.border || '#E5E7EB'}"
         onclick="openEditTask('${task.id}')">
      <div class="task-card-top">
        <div class="task-title">${esc(task.title)}</div>
        <div class="task-card-actions" onclick="event.stopPropagation()">
          ${advBtns}
          <button class="video-action-btn video-delete-btn"
            onclick="quickDeleteTask('${task.id}');event.stopPropagation()" title="削除">🗑️</button>
        </div>
      </div>
      ${task.notes ? `<div class="task-notes-preview">${esc(task.notes)}</div>` : ''}
    </div>`;
  }).join('');
}

function renderStatusPlatformView(list, el) {
  const byPlatform = new Map();
  PLATFORMS.forEach(p => byPlatform.set(p.id, []));
  const noPlatTasks = [];

  list.forEach(task => {
    const pids = (task.platforms || []).filter(pid => PLATFORMS.find(p => p.id === pid));
    if (pids.length) pids.forEach(pid => byPlatform.get(pid)?.push(task));
    else noPlatTasks.push(task);
  });

  const isPost = state.statusFilter === '投稿';

  function spCardHtml(task) {
    const advBtns = isPost
      ? `<button class="advance-btn" onclick="advanceTaskTo('${task.id}','広告');event.stopPropagation()">→ 広告</button>
         <button class="advance-btn" onclick="advanceTaskTo('${task.id}','完了');event.stopPropagation()">→ 完了</button>`
      : `<button class="advance-btn" onclick="advanceTaskTo('${task.id}','完了');event.stopPropagation()">→ 完了</button>`;
    return `<div class="sp-card" data-task-id="${task.id}" draggable="true" onclick="openEditTask('${task.id}')">
      <span class="sp-card-title">${esc(task.title)}</span>
      <div class="sp-card-btns" onclick="event.stopPropagation()">${advBtns}</div>
    </div>`;
  }

  let html = '';
  PLATFORMS.forEach(platform => {
    const tasks = byPlatform.get(platform.id) || [];
    html += `<div class="sp-section" data-platform="${platform.id}">
      <div class="sp-label">${esc(platform.name)}</div>
      <div class="sp-cards">${tasks.map(spCardHtml).join('')}</div>
    </div>`;
  });

  if (noPlatTasks.length) {
    html += `<div class="sp-section" data-platform="__none__">
      <div class="sp-label">未設定</div>
      <div class="sp-cards">${noPlatTasks.map(spCardHtml).join('')}</div>
    </div>`;
  }

  el.innerHTML = html;
  setupStatusPlatformDrag();
}

function renderStatusCompleteView(list, el) {
  const datedTasks   = list.filter(t => t.postDate);
  const undatedTasks = list.filter(t => !t.postDate);

  function doneCardHtml(task) {
    return `<div class="done-task-card" onclick="openEditTask('${task.id}')">
      <span class="done-card-title">${esc(task.title)}</span>
    </div>`;
  }

  const weekMap = new Map();
  datedTasks.forEach(task => {
    const monday  = getMondayOfWeek(task.postDate);
    const weekKey = toDateStrLocal(monday);
    if (!weekMap.has(weekKey)) weekMap.set(weekKey, { weekStart: monday, dates: new Map() });
    const wk = weekMap.get(weekKey);
    if (!wk.dates.has(task.postDate)) wk.dates.set(task.postDate, new Map());
    const dm = wk.dates.get(task.postDate);
    const pids = (task.platforms || []).filter(pid => PLATFORMS.find(p => p.id === pid));
    if (pids.length) {
      pids.forEach(pid => { if (!dm.has(pid)) dm.set(pid, []); dm.get(pid).push(task); });
    } else {
      if (!dm.has('__none__')) dm.set('__none__', []);
      dm.get('__none__').push(task);
    }
  });

  const sortedWeeks = [...weekMap.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  let html = '';

  sortedWeeks.forEach(([weekKey, wkData]) => {
    const sortedDates = [...wkData.dates.entries()].sort((a, b) => b[0].localeCompare(a[0]));
    let datesHtml = '';

    sortedDates.forEach(([dateStr, platformMap]) => {
      let platformsHtml = '';
      PLATFORMS.forEach(platform => {
        const tasks = platformMap.get(platform.id) || [];
        if (!tasks.length) return;
        platformsHtml += `<div class="done-platform-group">
          <div class="post-platform-label">${platform.name}</div>
          ${tasks.map(doneCardHtml).join('')}
        </div>`;
      });
      const noPlatTasks = platformMap.get('__none__') || [];
      if (noPlatTasks.length) {
        platformsHtml += `<div class="done-platform-group">
          <div class="post-platform-label">未設定</div>
          ${noPlatTasks.map(doneCardHtml).join('')}
        </div>`;
      }
      datesHtml += `<div class="post-date-section" data-date="${dateStr}">
        <div class="post-date-label">${formatDateLabel(dateStr)}</div>
        ${platformsHtml}
      </div>`;
    });

    html += `<div class="post-week-group" data-week-start="${weekKey}">
      <div class="post-week-label">${getWeekLabel(wkData.weekStart)}</div>
      ${datesHtml}
    </div>`;
  });

  if (undatedTasks.length) {
    const undatedByPlatform = new Map();
    PLATFORMS.forEach(p => undatedByPlatform.set(p.id, []));
    const noPlat = [];
    undatedTasks.forEach(task => {
      const pids = (task.platforms || []).filter(pid => PLATFORMS.find(p => p.id === pid));
      if (pids.length) pids.forEach(pid => undatedByPlatform.get(pid)?.push(task));
      else noPlat.push(task);
    });
    let undatedHtml = '';
    PLATFORMS.forEach(platform => {
      const tasks = undatedByPlatform.get(platform.id) || [];
      if (!tasks.length) return;
      undatedHtml += `<div class="done-platform-group">
        <div class="post-platform-label">${platform.name}</div>
        ${tasks.map(doneCardHtml).join('')}
      </div>`;
    });
    if (noPlat.length) {
      undatedHtml += `<div class="done-platform-group">
        <div class="post-platform-label">未設定</div>
        ${noPlat.map(doneCardHtml).join('')}
      </div>`;
    }
    if (undatedHtml) {
      html += `<div class="post-week-group post-unassigned-group">
        <div class="post-week-label">未振り分け</div>
        ${undatedHtml}
      </div>`;
    }
  }

  el.innerHTML = html;
}

function renderStatusCategoryView(list, el) {
  const categories = STATUS_CATEGORIES[state.statusFilter] || [];
  const byCat = new Map();
  categories.forEach(c => byCat.set(c, []));
  const firstCat = categories[0];

  list.forEach(task => {
    const cat = (task.category && byCat.has(task.category)) ? task.category : firstCat;
    byCat.get(cat)?.push(task);
  });

  function catCardHtml(task) {
    let advBtns = '';
    if (state.statusFilter === 'ゆっきー') {
      advBtns = `<button class="advance-btn" onclick="advanceTaskTo('${task.id}','せい');event.stopPropagation()">→ せい</button>
                 <button class="advance-btn" onclick="advanceTaskTo('${task.id}','ともちん');event.stopPropagation()">→ ともちん</button>`;
    } else if (state.statusFilter === 'せい') {
      advBtns = `<button class="advance-btn" onclick="advanceTaskTo('${task.id}','ゆっきー');event.stopPropagation()">→ ゆっきー</button>
                 <button class="advance-btn" onclick="advanceTaskTo('${task.id}','ともちん');event.stopPropagation()">→ ともちん</button>`;
    } else if (state.statusFilter === 'ともちん') {
      advBtns = `<button class="advance-btn" onclick="advanceTaskTo('${task.id}','投稿');event.stopPropagation()">→ 投稿</button>
                 <button class="advance-btn" onclick="openCategoryModal('${task.id}','ゆっきー');event.stopPropagation()">→ ゆっきー</button>`;
    } else {
      const next = getNextStatus(state.statusFilter);
      if (next) advBtns = `<button class="advance-btn" onclick="advanceTaskTo('${task.id}','${esc(next)}');event.stopPropagation()">→ ${esc(next)}</button>`;
    }
    return `<div class="sp-card" data-task-id="${task.id}" draggable="true" onclick="openEditTask('${task.id}')">
      <span class="sp-card-title">${esc(task.title)}</span>
      <div class="sp-card-btns" onclick="event.stopPropagation()">${advBtns}</div>
    </div>`;
  }

  let html = '';
  categories.forEach(cat => {
    const tasks = byCat.get(cat) || [];
    html += `<div class="sp-section" data-category="${esc(cat)}">
      <div class="sp-label">${esc(cat)}</div>
      <div class="sp-cards">${tasks.map(catCardHtml).join('')}</div>
    </div>`;
  });

  el.innerHTML = html;
  setupStatusCategoryDrag();
}

function setupStatusCategoryDrag() {
  let dragTaskId = null, dragSrcCat = null;
  let longTimer = null, touchItem = null, touchClone = null, offX = 0, offY = 0;

  const chips = document.querySelectorAll('.filter-chip[data-status]');

  function clearOver() {
    document.querySelectorAll('.sp-card.drag-over, .sp-section.drag-over')
      .forEach(el => el.classList.remove('drag-over'));
  }

  document.querySelectorAll('.sp-card[data-task-id]').forEach(card => {
    const taskId  = card.dataset.taskId;
    const section = card.closest('.sp-section');
    const fromCat = section?.dataset.category || '__none__';

    card.addEventListener('dragstart', e => {
      dragTaskId = taskId; dragSrcCat = fromCat;
      card.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
      chips.forEach(c => c.classList.add('is-drop-target'));
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('is-dragging');
      clearOver();
      chips.forEach(c => c.classList.remove('is-drop-target', 'drag-over'));
      dragTaskId = null;
    });
    card.addEventListener('dragover', e => {
      if (!dragTaskId || taskId === dragTaskId) return;
      e.preventDefault(); clearOver(); card.classList.add('drag-over');
    });
    card.addEventListener('drop', e => {
      e.preventDefault();
      if (!dragTaskId || taskId === dragTaskId) return;
      const toCat = card.closest('.sp-section')?.dataset.category || '__none__';
      clearOver(); handleCategoryDrop(dragTaskId, dragSrcCat, toCat, taskId);
    });

    card.addEventListener('touchstart', e => {
      const touch = e.touches[0];
      longTimer = setTimeout(() => {
        touchItem = card; dragTaskId = taskId; dragSrcCat = fromCat;
        card.classList.add('is-dragging');
        const rect = card.getBoundingClientRect();
        offX = touch.clientX - rect.left; offY = touch.clientY - rect.top;
        touchClone = card.cloneNode(true);
        touchClone.className += ' task-drag-clone';
        touchClone.style.cssText += `;width:${rect.width}px;top:${rect.top}px;left:${rect.left}px;`;
        document.body.appendChild(touchClone);
        chips.forEach(c => c.classList.add('is-drop-target'));
        navigator.vibrate?.(30);
      }, 500);
    }, { passive: true });

    card.addEventListener('touchmove', e => {
      if (!touchItem) { clearTimeout(longTimer); return; }
      e.preventDefault();
      const touch = e.touches[0];
      if (touchClone) {
        touchClone.style.top  = (touch.clientY - offY) + 'px';
        touchClone.style.left = (touch.clientX - offX) + 'px';
      }
      clearOver();
      chips.forEach(c => c.classList.remove('drag-over'));
      const pt = document.elementFromPoint(touch.clientX, touch.clientY);
      const chip  = pt?.closest('.filter-chip[data-status]');
      const tCard = pt?.closest('.sp-card[data-task-id]');
      const sec   = pt?.closest('.sp-section[data-category]');
      if (chip && chip.dataset.status !== state.statusFilter) chip.classList.add('drag-over');
      else if (tCard && tCard !== touchItem) tCard.classList.add('drag-over');
      else if (sec) sec.classList.add('drag-over');
    }, { passive: false });

    card.addEventListener('touchend', e => {
      clearTimeout(longTimer);
      if (!touchItem) return;
      const touch = e.changedTouches[0];
      touchClone?.remove(); touchClone = null;
      touchItem.classList.remove('is-dragging');
      chips.forEach(c => c.classList.remove('is-drop-target', 'drag-over'));
      clearOver();
      const pt    = document.elementFromPoint(touch.clientX, touch.clientY);
      const chip  = pt?.closest('.filter-chip[data-status]');
      const tCard = pt?.closest('.sp-card[data-task-id]');
      const sec   = pt?.closest('.sp-section[data-category]');
      if (chip) {
        const s = chip.dataset.status;
        if (s && s !== state.statusFilter) changeTaskStatus(dragTaskId, s);
      } else if (tCard && tCard !== touchItem) {
        const toCat = tCard.closest('.sp-section')?.dataset.category || '__none__';
        handleCategoryDrop(dragTaskId, dragSrcCat, toCat, tCard.dataset.taskId);
      } else if (sec) {
        handleCategoryDrop(dragTaskId, dragSrcCat, sec.dataset.category, null);
      }
      touchItem = null; dragTaskId = null;
    }, { passive: true });

    card.addEventListener('touchcancel', () => {
      clearTimeout(longTimer);
      touchClone?.remove(); touchClone = null;
      if (touchItem) { touchItem.classList.remove('is-dragging'); touchItem = null; }
      chips.forEach(c => c.classList.remove('is-drop-target', 'drag-over'));
      clearOver(); dragTaskId = null;
    }, { passive: true });
  });

  document.querySelectorAll('.sp-section[data-category]').forEach(section => {
    section.addEventListener('dragover', e => {
      if (!dragTaskId || e.target?.closest('.sp-card[data-task-id]')) return;
      e.preventDefault(); clearOver(); section.classList.add('drag-over');
    });
    section.addEventListener('dragleave', e => {
      if (!e.relatedTarget || !section.contains(e.relatedTarget)) section.classList.remove('drag-over');
    });
    section.addEventListener('drop', e => {
      e.preventDefault();
      if (!dragTaskId) return;
      clearOver(); handleCategoryDrop(dragTaskId, dragSrcCat, section.dataset.category, null);
    });
  });

  chips.forEach(chip => {
    chip.addEventListener('dragover', e => {
      if (!dragTaskId) return;
      const s = chip.dataset.status;
      if (s && s !== state.statusFilter) {
        e.preventDefault();
        chips.forEach(c => c.classList.remove('drag-over'));
        chip.classList.add('drag-over');
      }
    });
    chip.addEventListener('dragleave', () => chip.classList.remove('drag-over'));
    chip.addEventListener('drop', e => {
      e.preventDefault();
      const s = chip.dataset.status;
      if (!dragTaskId || !s || s === state.statusFilter) return;
      changeTaskStatus(dragTaskId, s);
    });
  });
}

function handleCategoryDrop(taskId, fromCat, toCat, insertBeforeTaskId) {
  const task = state.tasks.find(t => t.id === taskId);
  if (!task) return;
  let changed = false;

  if (toCat && toCat !== '__none__' && toCat !== fromCat) {
    task.category  = toCat;
    task.updatedAt = new Date().toISOString();
    changed = true;
  }

  if (insertBeforeTaskId && insertBeforeTaskId !== taskId) {
    const si = state.tasks.findIndex(t => t.id === taskId);
    const ti = state.tasks.findIndex(t => t.id === insertBeforeTaskId);
    if (si !== -1 && ti !== -1 && si !== ti) {
      const [moved] = state.tasks.splice(si, 1);
      state.tasks.splice(state.tasks.findIndex(t => t.id === insertBeforeTaskId), 0, moved);
      if (!changed) task.updatedAt = new Date().toISOString();
      changed = true;
    }
  }

  if (changed) { saveState(); refreshCurrentTab(); }
}

function advanceTaskTo(id, targetStatus, overrideCategory = null) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;

  if (targetStatus === '投稿') {
    const isEnglish = task.title.startsWith('英語○') || task.title.startsWith('英語●');
    const pids = isEnglish
      ? ['tiktok_en', 'instagram_en', 'youtube_en']
      : ['tiktok_jp', 'instagram_jp', 'youtube_jp'];
    const originalIdx = state.tasks.indexOf(task);
    const now = new Date().toISOString();
    const newTasks = pids.map(pid => ({
      id: uid(),
      title: task.title,
      store: task.store || '',
      platforms: [pid],
      status: '投稿',
      postDate: task.postDate || null,
      notes: task.notes || '',
      createdAt: now,
      updatedAt: now,
    }));
    state.tasks.splice(originalIdx, 1, ...newTasks);
    if (state.activeTab === 'status') state.statusFilter = '投稿';
    saveState();
    refreshCurrentTab();
    const newIds = newTasks.map(t => t.id);
    const savedTask = { ...task };
    showToast(`→ 投稿 に進みました`, () => {
      const firstNewIdx = state.tasks.findIndex(t => newIds.includes(t.id));
      state.tasks = state.tasks.filter(t => !newIds.includes(t.id));
      if (firstNewIdx !== -1) state.tasks.splice(firstNewIdx, 0, savedTask);
      if (state.activeTab === 'status') state.statusFilter = savedTask.status;
      saveState();
      refreshCurrentTab();
    });
    return;
  }

  const prevStatus   = task.status;
  const prevUpdated  = task.updatedAt;
  const prevCategory = task.category;
  task.status    = targetStatus;
  task.category  = overrideCategory ?? STATUS_CATEGORIES[targetStatus]?.[0] ?? null;
  task.updatedAt = new Date().toISOString();
  if (state.activeTab === 'status') state.statusFilter = targetStatus;
  saveState();
  refreshCurrentTab();
  showToast(`→ ${targetStatus} に進みました`, () => {
    task.status    = prevStatus;
    task.category  = prevCategory;
    task.updatedAt = prevUpdated;
    if (state.activeTab === 'status') state.statusFilter = prevStatus;
    saveState();
    refreshCurrentTab();
  });
}

function advanceTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  const next = getNextStatus(task.status);
  if (next) advanceTaskTo(id, next);
}

function quickDeleteTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  const savedTask = { ...task };
  const savedIdx  = state.tasks.indexOf(task);
  state.tasks = state.tasks.filter(t => t.id !== id);
  saveState();
  renderStatus();
  showToast(`「${task.title}」を削除しました`, () => {
    state.tasks.splice(savedIdx, 0, savedTask);
    saveState();
    renderStatus();
  });
}

// =============================================
// STATUS DRAG
// =============================================

function setupTaskDrag() {
  if (state.statusFilter === '投稿' || state.statusFilter === '広告') return;
  if (STATUS_CATEGORIES[state.statusFilter]) return;
  const cards = document.querySelectorAll('.task-card[data-task-id]');
  const chips = document.querySelectorAll('.filter-chip[data-status]');

  // ---- Desktop (HTML5 drag) ----
  cards.forEach(card => {
    const id   = card.dataset.taskId;
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;

    card.draggable = true;

    card.addEventListener('dragstart', e => {
      dragState.taskId      = id;
      dragState.fromStatus  = task.status;
      card.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
      chips.forEach(c => c.classList.add('is-drop-target'));
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('is-dragging');
      chips.forEach(c => c.classList.remove('is-drop-target', 'drag-over'));
      cards.forEach(c => c.classList.remove('drag-over'));
      dragState.taskId = null;
    });

    card.addEventListener('dragover', e => {
      if (!dragState.taskId || id === dragState.taskId) return;
      const tTask = state.tasks.find(t => t.id === id);
      if (tTask?.status !== dragState.fromStatus) return;
      e.preventDefault();
      cards.forEach(c => c.classList.remove('drag-over'));
      card.classList.add('drag-over');
    });

    card.addEventListener('drop', e => {
      e.preventDefault();
      if (!dragState.taskId || id === dragState.taskId) return;
      const tTask = state.tasks.find(t => t.id === id);
      if (tTask?.status !== dragState.fromStatus) return;
      reorderTasks(dragState.taskId, id);
    });
  });

  chips.forEach(chip => {
    chip.addEventListener('dragover', e => {
      if (!dragState.taskId) return;
      const s = chip.dataset.status;
      if (s && s !== dragState.fromStatus) {
        e.preventDefault();
        chips.forEach(c => c.classList.remove('drag-over'));
        chip.classList.add('drag-over');
      }
    });
    chip.addEventListener('dragleave', () => chip.classList.remove('drag-over'));
    chip.addEventListener('drop', e => {
      e.preventDefault();
      const s = chip.dataset.status;
      if (!dragState.taskId || !s || s === dragState.fromStatus) return;
      changeTaskStatus(dragState.taskId, s);
    });
  });

  // ---- Mobile (touch long-press drag) ----
  let longTimer = null, touchItem = null, touchClone = null, offX = 0, offY = 0;

  cards.forEach(card => {
    card.addEventListener('touchstart', e => {
      const touch = e.touches[0];
      const id    = card.dataset.taskId;
      const task  = state.tasks.find(t => t.id === id);
      if (!task) return;

      longTimer = setTimeout(() => {
        touchItem            = card;
        dragState.taskId     = id;
        dragState.fromStatus = task.status;

        card.classList.add('is-dragging');
        const rect = card.getBoundingClientRect();
        offX = touch.clientX - rect.left;
        offY = touch.clientY - rect.top;

        touchClone = card.cloneNode(true);
        touchClone.className += ' task-drag-clone';
        touchClone.style.cssText += `;width:${rect.width}px;top:${rect.top}px;left:${rect.left}px;`;
        document.body.appendChild(touchClone);
        chips.forEach(c => c.classList.add('is-drop-target'));
        navigator.vibrate?.(30);
      }, 500);
    }, { passive: true });

    card.addEventListener('touchmove', e => {
      if (!touchItem) { clearTimeout(longTimer); return; }
      e.preventDefault();
      const touch = e.touches[0];
      if (touchClone) {
        touchClone.style.top  = (touch.clientY - offY) + 'px';
        touchClone.style.left = (touch.clientX - offX) + 'px';
      }
      chips.forEach(c => c.classList.remove('drag-over'));
      cards.forEach(c => { if (c !== touchItem) c.classList.remove('drag-over'); });

      const el   = document.elementFromPoint(touch.clientX, touch.clientY);
      const chip = el?.closest('.filter-chip[data-status]');
      const tCard= el?.closest('.task-card[data-task-id]');

      if (chip && chip.dataset.status !== dragState.fromStatus) {
        chip.classList.add('drag-over');
      } else if (tCard && tCard !== touchItem) {
        const tt = state.tasks.find(t => t.id === tCard.dataset.taskId);
        if (tt?.status === dragState.fromStatus) tCard.classList.add('drag-over');
      }
    }, { passive: false });

    card.addEventListener('touchend', e => {
      clearTimeout(longTimer);
      if (!touchItem) return;

      const touch = e.changedTouches[0];
      touchClone?.remove(); touchClone = null;
      touchItem.classList.remove('is-dragging');
      chips.forEach(c => c.classList.remove('is-drop-target', 'drag-over'));
      cards.forEach(c => c.classList.remove('drag-over'));

      const el    = document.elementFromPoint(touch.clientX, touch.clientY);
      const chip  = el?.closest('.filter-chip[data-status]');
      const tCard = el?.closest('.task-card[data-task-id]');

      if (chip) {
        const s = chip.dataset.status;
        if (s && s !== dragState.fromStatus) changeTaskStatus(dragState.taskId, s);
      } else if (tCard && tCard !== touchItem) {
        const tt = state.tasks.find(t => t.id === tCard.dataset.taskId);
        if (tt?.status === dragState.fromStatus) reorderTasks(dragState.taskId, tCard.dataset.taskId);
      }

      touchItem = null;
      dragState.taskId = null;
    }, { passive: true });

    card.addEventListener('touchcancel', () => {
      clearTimeout(longTimer);
      touchClone?.remove(); touchClone = null;
      if (touchItem) { touchItem.classList.remove('is-dragging'); touchItem = null; }
      chips.forEach(c => c.classList.remove('is-drop-target', 'drag-over'));
      cards.forEach(c => c.classList.remove('drag-over'));
      dragState.taskId = null; dragState.fromStatus = null;
    }, { passive: true });
  });
}

function reorderTasks(srcId, tgtId) {
  const si = state.tasks.findIndex(t => t.id === srcId);
  const ti = state.tasks.findIndex(t => t.id === tgtId);
  if (si === -1 || ti === -1) return;
  const [moved] = state.tasks.splice(si, 1);
  state.tasks.splice(ti, 0, moved);
  saveState();
  renderStatus();
}

function setupStatusPlatformDrag() {
  let dragTaskId = null, dragSrcPlatform = null;
  let longTimer = null, touchItem = null, touchClone = null, offX = 0, offY = 0;

  function clearOver() {
    document.querySelectorAll('.sp-card.drag-over').forEach(el => el.classList.remove('drag-over'));
  }

  document.querySelectorAll('.sp-card[data-task-id]').forEach(card => {
    const taskId  = card.dataset.taskId;
    const section = card.closest('.sp-section');
    const fromPlat = section?.dataset.platform || '__none__';

    card.addEventListener('dragstart', e => {
      dragTaskId = taskId; dragSrcPlatform = fromPlat;
      card.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('is-dragging');
      clearOver(); dragTaskId = null;
    });
    card.addEventListener('dragover', e => {
      if (!dragTaskId || taskId === dragTaskId) return;
      if (card.closest('.sp-section')?.dataset.platform !== dragSrcPlatform) return;
      e.preventDefault();
      clearOver(); card.classList.add('drag-over');
    });
    card.addEventListener('drop', e => {
      e.preventDefault();
      if (!dragTaskId || taskId === dragTaskId) return;
      if (card.closest('.sp-section')?.dataset.platform !== dragSrcPlatform) return;
      clearOver(); reorderTasks(dragTaskId, taskId);
    });

    // Touch long-press
    card.addEventListener('touchstart', e => {
      const touch = e.touches[0];
      longTimer = setTimeout(() => {
        touchItem = card; dragTaskId = taskId; dragSrcPlatform = fromPlat;
        card.classList.add('is-dragging');
        const rect = card.getBoundingClientRect();
        offX = touch.clientX - rect.left; offY = touch.clientY - rect.top;
        touchClone = card.cloneNode(true);
        touchClone.className += ' task-drag-clone';
        touchClone.style.cssText += `;width:${rect.width}px;top:${rect.top}px;left:${rect.left}px;`;
        document.body.appendChild(touchClone);
        navigator.vibrate?.(30);
      }, 500);
    }, { passive: true });

    card.addEventListener('touchmove', e => {
      if (!touchItem) { clearTimeout(longTimer); return; }
      e.preventDefault();
      const touch = e.touches[0];
      if (touchClone) {
        touchClone.style.top  = (touch.clientY - offY) + 'px';
        touchClone.style.left = (touch.clientX - offX) + 'px';
      }
      clearOver();
      const tCard = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.sp-card[data-task-id]');
      if (tCard && tCard !== touchItem && tCard.closest('.sp-section')?.dataset.platform === dragSrcPlatform) {
        tCard.classList.add('drag-over');
      }
    }, { passive: false });

    card.addEventListener('touchend', e => {
      clearTimeout(longTimer);
      if (!touchItem) return;
      const touch = e.changedTouches[0];
      touchClone?.remove(); touchClone = null;
      touchItem.classList.remove('is-dragging');
      clearOver();
      const tCard = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.sp-card[data-task-id]');
      if (tCard && tCard !== touchItem && tCard.closest('.sp-section')?.dataset.platform === dragSrcPlatform) {
        reorderTasks(dragTaskId, tCard.dataset.taskId);
      }
      touchItem = null; dragTaskId = null;
    }, { passive: true });

    card.addEventListener('touchcancel', () => {
      clearTimeout(longTimer);
      touchClone?.remove(); touchClone = null;
      if (touchItem) { touchItem.classList.remove('is-dragging'); touchItem = null; }
      clearOver(); dragTaskId = null;
    }, { passive: true });
  });
}

function openCategoryModal(taskId, targetStatus) {
  const cats = STATUS_CATEGORIES[targetStatus] || [];
  const el = document.createElement('div');
  el.className = 'modal';
  el.id = 'cat-select-modal';
  el.innerHTML = `
    <div class="modal-backdrop"></div>
    <div class="modal-sheet cat-select-sheet">
      <div class="cat-select-inner">
        <div class="cat-select-heading">カテゴリーを選択</div>
        <div class="cat-select-btns">
          ${cats.map(cat => `<button class="cat-select-btn" onclick="selectCategoryAndAdvance('${taskId}','${targetStatus}','${esc(cat)}')">${esc(cat)}</button>`).join('')}
        </div>
        <button class="cat-select-cancel" onclick="closeCategoryModal()">キャンセル</button>
      </div>
    </div>`;
  document.body.appendChild(el);
  el.querySelector('.modal-backdrop').addEventListener('click', closeCategoryModal);
}

function closeCategoryModal() {
  document.getElementById('cat-select-modal')?.remove();
}

function selectCategoryAndAdvance(taskId, targetStatus, category) {
  closeCategoryModal();
  advanceTaskTo(taskId, targetStatus, category);
}

function changeTaskStatus(id, newStatus) {
  if (newStatus === '投稿') { advanceTaskTo(id, '投稿'); return; }
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  task.status    = newStatus;
  task.updatedAt = new Date().toISOString();
  saveState();
  renderStatus();
  if (state.activeTab === 'home') renderHome();
  showToast(`→ ${newStatus} に移動しました`);
}

// =============================================
// VIDEO PAGE
// =============================================

function reelCard(m, draggable = false) {
  const isMonthly = m.type === 'monthly';
  return `
    <div class="card reel-month-card" data-reel-id="${m.id}"${draggable ? ' draggable="true"' : ''}>
      ${isMonthly ? `<div class="reel-month-header">
        <span class="reel-month-name">${esc(m.productionMonth)}リール</span>
        ${m.postMonth ? `<span class="reel-post-hint">投稿: ${esc(m.postMonth)}</span>` : ''}
      </div>` : ''}
      ${m.videos.map((v, i) => `
        <div class="reel-video-row" onclick="openEditVideoModal('${m.id}','${v.id}')" style="cursor:pointer">
          <span class="reel-num reel-num--${i + 1}">${m.type === 'monthly' ? (CIRCLED[i] || (i + 1)) : '○'}</span>
          <div class="reel-row-info">
            <div class="reel-row-title">${esc(v.title)}</div>
            ${v.note ? `<div class="reel-row-note">📌 ${esc(v.note)}</div>` : ''}
          </div>
          <div class="reel-row-actions">
            <button class="video-action-btn video-delete-btn"
              onclick="deleteVideoItem('${m.id}','${v.id}');event.stopPropagation()" title="削除">🗑️</button>
          </div>
        </div>`).join('')}
    </div>`;
}

function renderVideos() {
  const el  = document.getElementById('video-content');
  const tab = state.videoSubTab;

  if (tab === 'reels') {
    const addBtn = `<button class="content-add-btn" onclick="openAddReelModal('monthly')">＋ 月リール追加</button>`;
    const items  = state.reels
      .filter(r => r.type === 'monthly')
      .sort((a, b) => b.year !== a.year ? b.year - a.year : monthToNum(b.productionMonth) - monthToNum(a.productionMonth));

    if (!items.length) {
      el.innerHTML = addBtn + `<div class="empty-state">
        <span class="empty-icon">🎬</span>
        <div class="empty-label">月リールがありません</div>
        <div class="empty-hint">「＋月リール追加」から追加してください</div>
      </div>`;
      return;
    }

    let html = addBtn;
    items.forEach((m, i) => {
      const prev = items[i - 1];
      if (!prev || prev.year !== m.year) {
        html += `<div class="year-divider">${m.year}</div>`;
      }
      html += reelCard(m);
    });
    el.innerHTML = html;

  } else if (tab === 'english') {
    const addBtn = `<button class="content-add-btn" onclick="openAddReelModal('english')">＋ 英語リール追加</button>`;
    const items  = state.reels
      .filter(r => r.type === 'english')
      .sort((a, b) => b.year !== a.year ? b.year - a.year : monthToNum(b.productionMonth) - monthToNum(a.productionMonth));

    if (!items.length) {
      el.innerHTML = addBtn + `<div class="empty-state">
        <span class="empty-icon">🌐</span>
        <div class="empty-label">英語リールがありません</div>
        <div class="empty-hint">「＋英語リール追加」から追加してください</div>
      </div>`;
      return;
    }

    let html = addBtn;
    items.forEach((m, i) => {
      const prev = items[i - 1];
      if (!prev || prev.year !== m.year) {
        html += `<div class="year-divider">${m.year}</div>`;
      }
      html += reelCard(m, true);
    });
    el.innerHTML = html;
    setupEnglishReelDrag();

  } else if (tab === 'ec' || tab === 'personal') {
    const label   = tab === 'ec' ? 'ECリール' : '個人リール';
    const addBtn  = `<button class="content-add-btn" onclick="openAddReelModal('${tab}')">＋ ${label}追加</button>`;
    const items   = state.reels
      .filter(r => r.type === tab)
      .sort((a, b) => b.year !== a.year ? b.year - a.year : monthToNum(b.productionMonth) - monthToNum(a.productionMonth));

    if (!items.length) {
      el.innerHTML = addBtn + `<div class="empty-state">
        <span class="empty-icon">🎬</span>
        <div class="empty-label">${label}がありません</div>
        <div class="empty-hint">「＋${label}追加」から追加してください</div>
      </div>`;
      return;
    }

    let ecHtml = addBtn;
    items.forEach((m, i) => {
      const prev = items[i - 1];
      if (!prev || prev.year !== m.year) {
        ecHtml += `<div class="year-divider">${m.year}</div>`;
      }
      ecHtml += reelCard(m);
    });
    el.innerHTML = ecHtml;
  }
}

function reorderReels(srcId, tgtId) {
  const si = state.reels.findIndex(r => r.id === srcId);
  const ti = state.reels.findIndex(r => r.id === tgtId);
  if (si === -1 || ti === -1 || si === ti) return;
  if (state.reels[si].type !== state.reels[ti].type) return;
  const [moved] = state.reels.splice(si, 1);
  state.reels.splice(state.reels.findIndex(r => r.id === tgtId), 0, moved);
  saveState();
  renderVideos();
}

function setupEnglishReelDrag() {
  const cards = () => document.querySelectorAll('.reel-month-card[data-reel-id]');
  let dragSrc = null;
  let longTimer = null, touchDragItem = null, touchClone = null, offX = 0, offY = 0;

  cards().forEach(card => {
    card.addEventListener('dragstart', e => {
      dragSrc = card;
      card.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('is-dragging');
      cards().forEach(c => c.classList.remove('drag-over'));
      dragSrc = null;
    });
    card.addEventListener('dragover', e => {
      if (!dragSrc || card === dragSrc) return;
      e.preventDefault();
      cards().forEach(c => c.classList.remove('drag-over'));
      card.classList.add('drag-over');
    });
    card.addEventListener('drop', e => {
      e.preventDefault();
      if (!dragSrc || dragSrc === card) return;
      reorderReels(dragSrc.dataset.reelId, card.dataset.reelId);
    });

    card.addEventListener('touchstart', e => {
      const t = e.touches[0];
      longTimer = setTimeout(() => {
        touchDragItem = card;
        card.classList.add('is-dragging');
        const rect = card.getBoundingClientRect();
        offX = t.clientX - rect.left; offY = t.clientY - rect.top;
        touchClone = card.cloneNode(true);
        touchClone.className += ' task-drag-clone';
        touchClone.style.cssText += `;width:${rect.width}px;top:${rect.top}px;left:${rect.left}px;`;
        document.body.appendChild(touchClone);
        navigator.vibrate?.(30);
      }, 500);
    }, { passive: true });

    card.addEventListener('touchmove', e => {
      if (!touchDragItem) { clearTimeout(longTimer); return; }
      e.preventDefault();
      const t = e.touches[0];
      if (touchClone) { touchClone.style.top = (t.clientY - offY) + 'px'; touchClone.style.left = (t.clientX - offX) + 'px'; }
      cards().forEach(c => c.classList.remove('drag-over'));
      for (const el of document.querySelectorAll('.reel-month-card[data-reel-id]:not(.is-dragging)')) {
        const r = el.getBoundingClientRect();
        if (t.clientY >= r.top && t.clientY <= r.bottom) { el.classList.add('drag-over'); break; }
      }
    }, { passive: false });

    card.addEventListener('touchend', () => {
      clearTimeout(longTimer);
      if (!touchDragItem) return;
      touchClone?.remove(); touchClone = null;
      touchDragItem.classList.remove('is-dragging');
      const target = document.querySelector('.reel-month-card[data-reel-id].drag-over');
      if (target) reorderReels(touchDragItem.dataset.reelId, target.dataset.reelId);
      touchDragItem = null;
      cards().forEach(c => c.classList.remove('drag-over'));
    }, { passive: true });

    card.addEventListener('touchcancel', () => {
      clearTimeout(longTimer);
      touchClone?.remove(); touchClone = null;
      if (touchDragItem) { touchDragItem.classList.remove('is-dragging'); touchDragItem = null; }
      cards().forEach(c => c.classList.remove('drag-over'));
    }, { passive: true });
  });
}

// =============================================
// POSTS PAGE
// =============================================

function getMondayOfWeek(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const dow = d.getDay();
  const diff = dow === 0 ? -6 : 1 - dow;
  const mon = new Date(d);
  mon.setDate(d.getDate() + diff);
  return mon;
}

function toDateStrLocal(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

function getWeekLabel(monday) {
  const month   = monday.getMonth() + 1;
  const weekNum = Math.ceil(monday.getDate() / 7);
  const sunday  = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const endM = sunday.getMonth() + 1;
  return `${month}月第${weekNum}週　${month}/${monday.getDate()}〜${endM}/${sunday.getDate()}`;
}

function formatDateLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const dow = d.getDay();
  const base = `${d.getMonth()+1}/${d.getDate()}（${DAY_NAMES[dow]}）`;
  const holiday = JP_HOLIDAYS[dateStr];
  const mmdd = dateStr.slice(5);
  const event = ANNUAL_EVENTS[mmdd];
  const isRed = dow === 0 || !!holiday;
  const isSat = dow === 6;
  let html = '';
  if (isRed) {
    html += `<span class="date-holiday">${base}</span>`;
    if (holiday) html += `<span class="date-holiday-name">${esc(holiday)}</span>`;
  } else if (isSat) {
    html += `<span class="date-saturday">${base}</span>`;
  } else {
    html += base;
  }
  if (event && !holiday) html += `<span class="date-event-name">${esc(event)}</span>`;
  return html;
}

function postTaskCardHtml(task, platformId, dateStr) {
  return `<div class="post-task-card" data-task-id="${task.id}" data-from-platform="${platformId}" data-from-date="${dateStr}" draggable="true">
    <div class="post-drag-handle">⠿</div>
    <div class="post-card-title" onclick="openEditTask('${task.id}')">${esc(task.title)}</div>
    <div class="post-card-btns">
      <button class="advance-btn" onclick="advanceTaskTo('${task.id}','広告');event.stopPropagation()">→ 広告</button>
      <button class="advance-btn" onclick="advanceTaskTo('${task.id}','完了');event.stopPropagation()">→ 完了</button>
    </div>
  </div>`;
}

function buildPostsSpecialSection(dateKey, label, tasks, groupClass) {
  const byPlatform = new Map();
  PLATFORMS.forEach(p => byPlatform.set(p.id, []));
  const noPlat = [];
  tasks.forEach(task => {
    const pids = (task.platforms || []).filter(pid => PLATFORMS.find(p => p.id === pid));
    if (pids.length) pids.forEach(pid => byPlatform.get(pid)?.push(task));
    else noPlat.push(task);
  });
  let platformsHtml = '';
  PLATFORMS.forEach(platform => {
    const pts = byPlatform.get(platform.id) || [];
    const isEmpty = !pts.length;
    platformsHtml += `<div class="post-platform-group${isEmpty ? ' is-empty' : ''}" data-platform="${platform.id}" data-date="${dateKey}">
      <div class="post-platform-label">${platform.name}</div>
      ${pts.map(t => postTaskCardHtml(t, platform.id, dateKey)).join('')}
    </div>`;
  });
  if (noPlat.length) {
    platformsHtml += `<div class="post-platform-group" data-platform="__none__" data-date="${dateKey}">
      <div class="post-platform-label">未設定</div>
      ${noPlat.map(t => postTaskCardHtml(t, '__none__', dateKey)).join('')}
    </div>`;
  }
  return `<div class="post-week-group ${groupClass}" data-week-start="${dateKey}">
    <div class="post-week-label">${label}</div>
    ${platformsHtml}
  </div>`;
}

function renderPosts() {
  const el = document.getElementById('posts-content');
  const activeTasks = state.tasks.filter(t => t.status === '投稿');

  if (!activeTasks.length) {
    el.innerHTML = `<div class="empty-state">
      <span class="empty-icon">📌</span>
      <div class="empty-label">投稿中のタスクがありません</div>
      <div class="empty-hint">ステータスが「投稿」になると自動でここに表示されます</div>
    </div>`;
    return;
  }

  const heldTasks    = activeTasks.filter(t => t.postDate === '__hold__');
  const undatedTasks = activeTasks.filter(t => !t.postDate);
  const datedTasks   = activeTasks.filter(t => t.postDate && t.postDate !== '__hold__');

  // Build week → date → platform map
  const weekMap = new Map();
  datedTasks.forEach(task => {
    const monday  = getMondayOfWeek(task.postDate);
    const weekKey = toDateStrLocal(monday);
    if (!weekMap.has(weekKey)) weekMap.set(weekKey, { weekStart: monday, dates: new Map() });
    const wk = weekMap.get(weekKey);
    if (!wk.dates.has(task.postDate)) wk.dates.set(task.postDate, new Map());
    const dm = wk.dates.get(task.postDate);
    const pids = (task.platforms || []).filter(pid => PLATFORMS.find(p => p.id === pid));
    if (pids.length) {
      pids.forEach(pid => { if (!dm.has(pid)) dm.set(pid, []); dm.get(pid).push(task); });
    } else {
      if (!dm.has('__none__')) dm.set('__none__', []);
      dm.get('__none__').push(task);
    }
  });

  // Auto-fill Mon/Tue/Fri/Sat/Sun; Wed/Thu only when holiday; skip past empty days
  const DEFAULT_DAYS = new Set([0, 1, 2, 5, 6]);
  const todayStr = toDateStrLocal(new Date());
  weekMap.forEach(wkData => {
    const monday = wkData.weekStart;
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const dateStr = toDateStrLocal(d);
      if (!wkData.dates.has(dateStr)) {
        if (dateStr >= todayStr && (DEFAULT_DAYS.has(d.getDay()) || JP_HOLIDAYS[dateStr])) {
          wkData.dates.set(dateStr, new Map());
        }
      }
    }
  });

  const sortedWeeks = [...weekMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  let html = '';

  // 1. 未振り分け at top
  if (undatedTasks.length) {
    html += buildPostsSpecialSection('__none__', '未振り分け', undatedTasks, 'post-unassigned-group');
  }

  // 2. Dated weeks
  sortedWeeks.forEach(([weekKey, wkData]) => {
    const sortedDates = [...wkData.dates.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    let datesHtml = '';

    sortedDates.forEach(([dateStr, platformMap]) => {
      let platformsHtml = '';
      PLATFORMS.forEach(platform => {
        const tasks   = platformMap.get(platform.id) || [];
        const isEmpty = !tasks.length;
        platformsHtml += `<div class="post-platform-group${isEmpty ? ' is-empty' : ''}" data-platform="${platform.id}" data-date="${dateStr}">
          <div class="post-platform-label">${platform.name}</div>
          ${tasks.map(t => postTaskCardHtml(t, platform.id, dateStr)).join('')}
        </div>`;
      });
      const noPlatTasks = platformMap.get('__none__') || [];
      if (noPlatTasks.length) {
        platformsHtml += `<div class="post-platform-group" data-platform="__none__" data-date="${dateStr}">
          <div class="post-platform-label">未設定</div>
          ${noPlatTasks.map(t => postTaskCardHtml(t, '__none__', dateStr)).join('')}
        </div>`;
      }
      datesHtml += `<div class="post-date-section" data-date="${dateStr}">
        <div class="post-date-label">${formatDateLabel(dateStr)}</div>
        ${platformsHtml}
      </div>`;
    });

    html += `<div class="post-week-group" data-week-start="${weekKey}">
      <div class="post-week-label">${getWeekLabel(wkData.weekStart)}</div>
      ${datesHtml}
    </div>`;
  });

  // 3. 時期まで保留 at bottom (always visible as drop target)
  html += buildPostsSpecialSection('__hold__', '時期まで保留', heldTasks, 'post-hold-group');

  el.innerHTML = html;
  setupPostsDrag();
}

function advanceTaskStatus(id) {
  advanceTaskTo(id, '広告');
}

function handlePostsDrop(srcCard, targetCard, targetGroup) {
  const taskId      = srcCard.dataset.taskId;
  const fromPlatform = srcCard.dataset.fromPlatform;
  const fromDate    = srcCard.dataset.fromDate;
  const toGroup     = targetCard ? targetCard.closest('.post-platform-group') : targetGroup;
  const toDate      = toGroup?.dataset.date;
  const toPlatform  = toGroup?.dataset.platform;
  const task        = state.tasks.find(t => t.id === taskId);
  if (!task) return;

  let changed = false;

  if (toDate && toDate !== fromDate) {
    task.postDate  = toDate === '__none__' ? null : toDate;
    changed = true;
  }

  if (toPlatform && toPlatform !== fromPlatform && toPlatform !== '__none__') {
    const pids = [...(task.platforms || [])];
    const idx = pids.indexOf(fromPlatform);
    if (idx !== -1) pids.splice(idx, 1);
    if (!pids.includes(toPlatform)) pids.push(toPlatform);
    task.platforms = pids;
    changed = true;
  }

  if (targetCard) {
    const si = state.tasks.findIndex(t => t.id === taskId);
    const ti = state.tasks.findIndex(t => t.id === targetCard.dataset.taskId);
    if (si !== -1 && ti !== -1 && si !== ti) {
      const [moved] = state.tasks.splice(si, 1);
      state.tasks.splice(state.tasks.findIndex(t => t.id === targetCard.dataset.taskId), 0, moved);
      changed = true;
    }
  }

  if (changed) {
    task.updatedAt = new Date().toISOString();
    saveState();
    refreshCurrentTab();
  }
}

function setupPostsDrag() {
  let dragSrc = null;
  let longTimer = null, touchDragItem = null, touchClone = null, offX = 0, offY = 0;

  function clearDragOver() {
    document.querySelectorAll('.post-task-card.drag-over, .post-platform-group.drag-over')
      .forEach(el => el.classList.remove('drag-over'));
  }

  document.querySelectorAll('.post-task-card[data-task-id]').forEach(card => {
    // ---- Desktop ----
    card.addEventListener('dragstart', e => {
      dragSrc = card;
      card.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('is-dragging');
      clearDragOver();
      dragSrc = null;
    });
    card.addEventListener('dragover', e => {
      if (!dragSrc || card === dragSrc) return;
      e.preventDefault();
      clearDragOver();
      card.classList.add('drag-over');
    });
    card.addEventListener('drop', e => {
      e.preventDefault();
      if (!dragSrc || dragSrc === card) return;
      clearDragOver();
      handlePostsDrop(dragSrc, card, null);
    });

    // ---- Touch (long-press) ----
    card.addEventListener('touchstart', e => {
      const t = e.touches[0];
      longTimer = setTimeout(() => {
        touchDragItem = card;
        card.classList.add('is-dragging');
        const rect = card.getBoundingClientRect();
        offX = t.clientX - rect.left; offY = t.clientY - rect.top;
        touchClone = card.cloneNode(true);
        touchClone.className += ' task-drag-clone';
        touchClone.style.cssText += `;width:${rect.width}px;top:${rect.top}px;left:${rect.left}px;`;
        document.body.appendChild(touchClone);
        navigator.vibrate?.(30);
      }, 500);
    }, { passive: true });

    card.addEventListener('touchmove', e => {
      if (!touchDragItem) { clearTimeout(longTimer); return; }
      e.preventDefault();
      const t = e.touches[0];
      if (touchClone) { touchClone.style.top = (t.clientY - offY) + 'px'; touchClone.style.left = (t.clientX - offX) + 'px'; }
      clearDragOver();
      touchClone.style.display = 'none';
      const elUnder = document.elementFromPoint(t.clientX, t.clientY);
      touchClone.style.display = '';
      const tCard  = elUnder?.closest('.post-task-card:not(.is-dragging)');
      const tGroup = elUnder?.closest('.post-platform-group');
      if (tCard)       tCard.classList.add('drag-over');
      else if (tGroup) tGroup.classList.add('drag-over');
    }, { passive: false });

    card.addEventListener('touchend', e => {
      clearTimeout(longTimer);
      if (!touchDragItem) return;
      touchClone?.remove(); touchClone = null;
      touchDragItem.classList.remove('is-dragging');
      const t = e.changedTouches[0];
      const elUnder = document.elementFromPoint(t.clientX, t.clientY);
      const tCard  = elUnder?.closest('.post-task-card:not(.is-dragging)');
      const tGroup = elUnder?.closest('.post-platform-group');
      if (tCard)       handlePostsDrop(touchDragItem, tCard, null);
      else if (tGroup) handlePostsDrop(touchDragItem, null, tGroup);
      touchDragItem = null;
      clearDragOver();
    }, { passive: true });

    card.addEventListener('touchcancel', () => {
      clearTimeout(longTimer);
      touchClone?.remove(); touchClone = null;
      if (touchDragItem) { touchDragItem.classList.remove('is-dragging'); touchDragItem = null; }
      clearDragOver();
    }, { passive: true });
  });

  // Platform groups as drop targets (for empty groups / between cards)
  document.querySelectorAll('.post-platform-group').forEach(group => {
    group.addEventListener('dragover', e => {
      if (!dragSrc || e.target.closest('.post-task-card')) return;
      e.preventDefault();
      clearDragOver();
      group.classList.add('drag-over');
    });
    group.addEventListener('dragleave', e => {
      if (!e.relatedTarget?.closest('.post-platform-group[data-platform="' + group.dataset.platform + '"]')) {
        group.classList.remove('drag-over');
      }
    });
    group.addEventListener('drop', e => {
      if (!dragSrc || e.target.closest('.post-task-card')) return;
      e.preventDefault();
      clearDragOver();
      handlePostsDrop(dragSrc, null, group);
    });
  });
}

// =============================================
// NOTES PAGE
// =============================================

function renderNotes() {
  const el = document.getElementById('notes-content');

  if (!state.notes.length) {
    el.innerHTML = `<div class="empty-state">
      <span class="empty-icon">📓</span>
      <div class="empty-label">ノートがありません</div>
      <div class="empty-hint">右上の「＋追加」からノートを追加してください</div>
    </div>`;
    return;
  }

  let html = '';

  const pinned   = state.notes.filter(n => n.pinned);
  const unpinned = state.notes.filter(n => !n.pinned);

  // Group unpinned notes by category, ordered by state.noteCategoryOrder
  const catMap = {};
  unpinned.forEach(n => {
    const cat = n.category || 'メモ';
    if (!catMap[cat]) catMap[cat] = [];
    catMap[cat].push(n);
  });
  const catOrder = getOrderedCats(Object.keys(catMap), state.noteCategoryOrder);

  const noteHTML = (note) => `
    <div class="note-item${note.pinned ? ' is-pinned' : ''}" data-note-id="${note.id}" draggable="true">
      <div class="note-drag-handle">⠿</div>
      <div class="note-body" onclick="openEditNote('${note.id}')">
        ${note.label ? `<div class="note-label">${esc(note.label)}</div>` : ''}
        <div class="note-content">${esc(note.content)}</div>
      </div>
      <button class="note-pin-btn"
        onclick="toggleNotePin('${note.id}');event.stopPropagation()"
        title="${note.pinned ? 'ピン解除' : 'ピン留め'}">${note.pinned ? '📌' : '📍'}</button>
      <button class="note-del-btn"
        onclick="quickDeleteNote('${note.id}');event.stopPropagation()"
        title="削除">🗑️</button>
    </div>`;

  if (pinned.length) {
    html += `<div class="notes-section-label">📌 ピン留め</div>`;
    html += pinned.map(noteHTML).join('');
  }
  catOrder.forEach((cat, idx) => {
    const mt = (pinned.length || idx > 0) ? 8 : 0;
    html += `<div class="notes-category-block" data-category="${esc(cat)}" style="margin-top:${mt}px">
      <div class="notes-section-label"><span class="cat-drag-handle">⠿</span>${esc(cat)}</div>
      <div class="notes-drag-list" data-category="${esc(cat)}">${catMap[cat].map(noteHTML).join('')}</div>
    </div>`;
  });
  if (!catOrder.length && !pinned.length) {
    html += `<div class="empty-state"><span class="empty-icon">📓</span><div class="empty-label">ノートがありません</div></div>`;
  }

  el.innerHTML = html;
  setupNoteDrag();
  setupNoteCategoryDrag();
}


function setupNoteDrag() {
  document.querySelectorAll('.notes-drag-list').forEach(list => {
    let dragSrc = null;
    let longTimer = null, touchDragItem = null, touchClone = null, touchOffsetY = 0;

    const allItems = () => list.querySelectorAll('.note-item');

    list.querySelectorAll('.note-item').forEach(item => {
      // Desktop drag
      item.addEventListener('dragstart', e => {
        dragSrc = item;
        item.classList.add('is-dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('is-dragging');
        allItems().forEach(i => i.classList.remove('drag-over'));
        dragSrc = null;
      });
      item.addEventListener('dragover', e => {
        if (!dragSrc || item === dragSrc) return;
        e.preventDefault();
        allItems().forEach(i => i.classList.remove('drag-over'));
        item.classList.add('drag-over');
      });
      item.addEventListener('drop', e => {
        e.preventDefault();
        if (!dragSrc || dragSrc === item) return;
        reorderNotes(dragSrc.dataset.noteId, item.dataset.noteId);
      });

      // Touch drag (long press)
      item.addEventListener('touchstart', e => {
        const t = e.touches[0];
        longTimer = setTimeout(() => {
          touchDragItem = item;
          item.classList.add('is-dragging');
          const rect = item.getBoundingClientRect();
          touchOffsetY = t.clientY - rect.top;
          touchClone = item.cloneNode(true);
          touchClone.classList.add('note-drag-clone');
          touchClone.style.cssText += `;width:${rect.width}px;top:${rect.top}px;left:${rect.left}px;`;
          document.body.appendChild(touchClone);
          navigator.vibrate?.(30);
        }, 500);
      }, { passive: true });

      item.addEventListener('touchmove', e => {
        if (!touchDragItem) { clearTimeout(longTimer); return; }
        e.preventDefault();
        const t = e.touches[0];
        if (touchClone) touchClone.style.top = (t.clientY - touchOffsetY) + 'px';
        allItems().forEach(i => i.classList.remove('drag-over'));
        for (const el of list.querySelectorAll('.note-item:not(.is-dragging)')) {
          const r = el.getBoundingClientRect();
          if (t.clientY >= r.top && t.clientY <= r.bottom) { el.classList.add('drag-over'); break; }
        }
      }, { passive: false });

      item.addEventListener('touchend', () => {
        clearTimeout(longTimer);
        if (!touchDragItem) return;
        touchClone?.remove(); touchClone = null;
        touchDragItem.classList.remove('is-dragging');
        const target = list.querySelector('.note-item.drag-over');
        if (target) reorderNotes(touchDragItem.dataset.noteId, target.dataset.noteId);
        touchDragItem = null;
      }, { passive: true });

      item.addEventListener('touchcancel', () => {
        clearTimeout(longTimer);
        touchClone?.remove(); touchClone = null;
        if (touchDragItem) { touchDragItem.classList.remove('is-dragging'); touchDragItem = null; }
        list.querySelectorAll('.note-item').forEach(i => i.classList.remove('drag-over'));
      }, { passive: true });
    });
  });
}

function reorderNotes(srcId, tgtId) {
  const si = state.notes.findIndex(n => n.id === srcId);
  const ti = state.notes.findIndex(n => n.id === tgtId);
  if (si === -1 || ti === -1) return;
  const [moved] = state.notes.splice(si, 1);
  const newTi = state.notes.findIndex(n => n.id === tgtId);
  state.notes.splice(newTi, 0, moved);
  saveState();
  renderNotes();
}

function reorderNoteCategory(srcCat, tgtCat, before) {
  if (srcCat === tgtCat) return;
  const existingCats = [...new Set(state.notes.filter(n => !n.pinned).map(n => n.category || 'メモ'))];
  const allCats = getOrderedCats(existingCats, state.noteCategoryOrder);
  const srcIdx = allCats.indexOf(srcCat);
  if (srcIdx !== -1) allCats.splice(srcIdx, 1);
  let tgtIdx = allCats.indexOf(tgtCat);
  if (!before) tgtIdx++;
  allCats.splice(Math.max(0, tgtIdx), 0, srcCat);
  state.noteCategoryOrder = allCats;
  saveState();
  renderNotes();
}

function setupNoteCategoryDrag() {
  const container = document.getElementById('notes-content');
  const allBlocks = () => Array.from(container.querySelectorAll('.notes-category-block'));
  let dragSrc = null;
  let longTimer = null, touchDragBlock = null, touchClone = null, offY = 0;

  allBlocks().forEach(block => {
    const handle = block.querySelector('.cat-drag-handle');
    if (!handle) return;

    // Desktop: enable draggable only while handle is held
    handle.addEventListener('mousedown', () => { block.draggable = true; });
    handle.addEventListener('mouseup',   () => { setTimeout(() => { block.draggable = false; }, 0); });

    block.addEventListener('dragstart', e => {
      dragSrc = block;
      block.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.stopPropagation();
    });
    block.addEventListener('dragend', () => {
      block.draggable = false;
      block.classList.remove('is-dragging');
      allBlocks().forEach(b => b.classList.remove('drag-over-top', 'drag-over-bot'));
      dragSrc = null;
    });
    block.addEventListener('dragover', e => {
      if (!dragSrc || dragSrc === block) return;
      e.preventDefault();
      e.stopPropagation();
      allBlocks().forEach(b => b.classList.remove('drag-over-top', 'drag-over-bot'));
      const rect = block.getBoundingClientRect();
      block.classList.add(e.clientY < rect.top + rect.height / 2 ? 'drag-over-top' : 'drag-over-bot');
    });
    block.addEventListener('drop', e => {
      e.preventDefault();
      e.stopPropagation();
      if (!dragSrc || dragSrc === block) return;
      const rect = block.getBoundingClientRect();
      reorderNoteCategory(dragSrc.dataset.category, block.dataset.category, e.clientY < rect.top + rect.height / 2);
    });

    // Touch: long press on handle
    handle.addEventListener('touchstart', e => {
      const t = e.touches[0];
      longTimer = setTimeout(() => {
        touchDragBlock = block;
        block.classList.add('is-dragging');
        const rect = block.getBoundingClientRect();
        offY = t.clientY - rect.top;
        touchClone = block.cloneNode(true);
        touchClone.style.cssText = `position:fixed;z-index:500;opacity:0.9;pointer-events:none;width:${rect.width}px;top:${rect.top}px;left:${rect.left}px;box-shadow:0 6px 20px rgba(42,36,32,0.18);border-radius:8px;background:var(--card);`;
        document.body.appendChild(touchClone);
        navigator.vibrate?.(30);
      }, 500);
    }, { passive: true });

    handle.addEventListener('touchmove', e => {
      if (!touchDragBlock) { clearTimeout(longTimer); return; }
      e.preventDefault();
      const t = e.touches[0];
      if (touchClone) touchClone.style.top = (t.clientY - offY) + 'px';
      allBlocks().forEach(b => b.classList.remove('drag-over-top', 'drag-over-bot'));
      for (const b of allBlocks()) {
        if (b === touchDragBlock) continue;
        const r = b.getBoundingClientRect();
        if (t.clientY >= r.top && t.clientY <= r.bottom) {
          b.classList.add(t.clientY < r.top + r.height / 2 ? 'drag-over-top' : 'drag-over-bot');
          break;
        }
      }
    }, { passive: false });

    handle.addEventListener('touchend', () => {
      clearTimeout(longTimer);
      if (!touchDragBlock) return;
      touchClone?.remove(); touchClone = null;
      touchDragBlock.classList.remove('is-dragging');
      const target = container.querySelector('.notes-category-block.drag-over-top, .notes-category-block.drag-over-bot');
      if (target) {
        reorderNoteCategory(
          touchDragBlock.dataset.category, target.dataset.category,
          target.classList.contains('drag-over-top')
        );
      }
      allBlocks().forEach(b => b.classList.remove('drag-over-top', 'drag-over-bot'));
      touchDragBlock = null;
    }, { passive: true });

    handle.addEventListener('touchcancel', () => {
      clearTimeout(longTimer);
      touchClone?.remove(); touchClone = null;
      if (touchDragBlock) { touchDragBlock.classList.remove('is-dragging'); touchDragBlock = null; }
      allBlocks().forEach(b => b.classList.remove('drag-over-top', 'drag-over-bot'));
    }, { passive: true });
  });
}

function quickDeleteNote(id) {
  const note = state.notes.find(n => n.id === id);
  if (!note) return;
  const savedNote = { ...note };
  const savedIdx  = state.notes.indexOf(note);
  state.notes = state.notes.filter(n => n.id !== id);
  saveState();
  renderNotes();
  showToast('ノートを削除しました', () => {
    state.notes.splice(savedIdx, 0, savedNote);
    saveState();
    renderNotes();
  });
}

function toggleNotePin(id) {
  const note = state.notes.find(n => n.id === id);
  if (!note) return;
  note.pinned = !note.pinned;
  saveState();
  renderNotes();
}

function refreshNoteCategoryDatalist() {
  const cats = [...new Set(state.notes.map(n => n.category).filter(Boolean))];
  const dl = document.getElementById('note-category-datalist');
  if (dl) dl.innerHTML = cats.map(c => `<option value="${esc(c)}">`).join('');
}

function openAddNote() {
  state.editingNoteId = null;
  document.getElementById('note-modal-title').textContent = 'ノート追加';
  document.getElementById('note-id').value       = '';
  document.getElementById('note-category').value = '';
  document.getElementById('note-label').value    = '';
  document.getElementById('note-content').value  = '';
  document.getElementById('note-pinned').checked = false;
  document.getElementById('delete-note-btn').classList.add('is-hidden');
  refreshNoteCategoryDatalist();
  document.getElementById('note-modal').classList.remove('is-hidden');
  setTimeout(() => document.getElementById('note-category').focus(), 100);
}

function openEditNote(id) {
  const note = state.notes.find(n => n.id === id);
  if (!note) return;
  state.editingNoteId = id;
  document.getElementById('note-modal-title').textContent = 'ノート編集';
  document.getElementById('note-id').value       = id;
  document.getElementById('note-category').value = note.category || '';
  document.getElementById('note-label').value    = note.label || '';
  document.getElementById('note-content').value  = note.content;
  document.getElementById('note-pinned').checked = note.pinned;
  document.getElementById('delete-note-btn').classList.remove('is-hidden');
  refreshNoteCategoryDatalist();
  document.getElementById('note-modal').classList.remove('is-hidden');
}

function closeNoteModal() {
  document.getElementById('note-modal').classList.add('is-hidden');
  state.editingNoteId = null;
}

function onSaveNote(e) {
  e.preventDefault();
  const content  = document.getElementById('note-content').value.trim();
  if (!content) return;
  const pinned   = document.getElementById('note-pinned').checked;
  const category = document.getElementById('note-category').value.trim() || 'メモ';
  const label    = document.getElementById('note-label').value.trim();

  if (state.editingNoteId) {
    const note = state.notes.find(n => n.id === state.editingNoteId);
    if (note) { note.content = content; note.pinned = pinned; note.category = category; note.label = label; }
    showToast('ノートを更新しました');
  } else {
    state.notes.push({ id: uid(), content, pinned, category, label, createdAt: new Date().toISOString() });
    showToast('ノートを追加しました');
  }
  saveState();
  closeNoteModal();
  renderNotes();
}

function onDeleteNote() {
  if (!state.editingNoteId) return;
  if (!confirm('このノートを削除しますか？')) return;
  state.notes = state.notes.filter(n => n.id !== state.editingNoteId);
  saveState();
  closeNoteModal();
  renderNotes();
  showToast('ノートを削除しました');
}

// =============================================
// LINKS PAGE
// =============================================

function renderLinks() {
  const el = document.getElementById('links-content');

  if (!state.links.length) {
    el.innerHTML = `<div class="empty-state">
      <span class="empty-icon">🔗</span>
      <div class="empty-label">リンク・コピペがありません</div>
      <div class="empty-hint">右上の「＋追加」からリンクを登録してください</div>
    </div>`;
    return;
  }

  // Build category map ordered by state.linkCategoryOrder
  const catMap = {};
  state.links.forEach(link => {
    const c = link.category || 'その他';
    if (!catMap[c]) catMap[c] = [];
    catMap[c].push(link);
  });
  const catOrder = getOrderedCats(Object.keys(catMap), state.linkCategoryOrder);

  el.innerHTML = catOrder.map(cat => `
    <div class="link-category-group" data-category="${esc(cat)}">
      <div class="link-cat-title"><span class="cat-drag-handle">⠿</span>${esc(cat)}</div>
      ${catMap[cat].map(link => `
        <div class="link-item" data-link-id="${link.id}" draggable="true">
          <div class="link-drag-handle">⠿</div>
          <div class="link-type-icon">${link.type === 'text' ? '📝' : '🔗'}</div>
          <div class="link-info" onclick="openEditLink('${link.id}')">
            <div class="link-label">${esc(link.label)}</div>
            <div class="link-preview">${esc(link.content)}</div>
          </div>
          ${link.type === 'link' ? `<button class="open-btn" onclick="openLinkUrl('${link.id}');event.stopPropagation()">開く</button>` : ''}
          <button class="copy-btn" onclick="copyLinkContent('${link.id}')">コピー</button>
        </div>`).join('')}
    </div>`).join('');

  setupLinksDrag();
  setupLinkCategoryDrag();
}

function reorderLinkCategory(srcCat, tgtCat, before) {
  if (srcCat === tgtCat) return;
  const existingCats = [...new Set(state.links.map(l => l.category || 'その他'))];
  const allCats = getOrderedCats(existingCats, state.linkCategoryOrder);
  const srcIdx = allCats.indexOf(srcCat);
  if (srcIdx !== -1) allCats.splice(srcIdx, 1);
  let tgtIdx = allCats.indexOf(tgtCat);
  if (!before) tgtIdx++;
  allCats.splice(Math.max(0, tgtIdx), 0, srcCat);
  state.linkCategoryOrder = allCats;
  saveState();
  renderLinks();
}

function setupLinkCategoryDrag() {
  const container = document.getElementById('links-content');
  const allGroups = () => Array.from(container.querySelectorAll('.link-category-group'));
  let dragSrc = null;
  let longTimer = null, touchDragGroup = null, touchClone = null, offY = 0;

  allGroups().forEach(group => {
    const handle = group.querySelector('.link-cat-title .cat-drag-handle');
    if (!handle) return;

    handle.addEventListener('mousedown', () => { group.draggable = true; });
    handle.addEventListener('mouseup',   () => { setTimeout(() => { group.draggable = false; }, 0); });

    group.addEventListener('dragstart', e => {
      dragSrc = group;
      group.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.stopPropagation();
    });
    group.addEventListener('dragend', () => {
      group.draggable = false;
      group.classList.remove('is-dragging');
      allGroups().forEach(g => g.classList.remove('drag-over-top', 'drag-over-bot'));
      dragSrc = null;
    });
    group.addEventListener('dragover', e => {
      if (!dragSrc || dragSrc === group) return;
      e.preventDefault();
      e.stopPropagation();
      allGroups().forEach(g => g.classList.remove('drag-over-top', 'drag-over-bot'));
      const rect = group.getBoundingClientRect();
      group.classList.add(e.clientY < rect.top + rect.height / 2 ? 'drag-over-top' : 'drag-over-bot');
    });
    group.addEventListener('drop', e => {
      e.preventDefault();
      e.stopPropagation();
      if (!dragSrc || dragSrc === group) return;
      const rect = group.getBoundingClientRect();
      reorderLinkCategory(dragSrc.dataset.category, group.dataset.category, e.clientY < rect.top + rect.height / 2);
    });

    // Touch: long press on handle
    handle.addEventListener('touchstart', e => {
      const t = e.touches[0];
      longTimer = setTimeout(() => {
        touchDragGroup = group;
        group.classList.add('is-dragging');
        const rect = group.getBoundingClientRect();
        offY = t.clientY - rect.top;
        touchClone = group.cloneNode(true);
        touchClone.style.cssText = `position:fixed;z-index:500;opacity:0.9;pointer-events:none;width:${rect.width}px;top:${rect.top}px;left:${rect.left}px;box-shadow:0 6px 20px rgba(42,36,32,0.18);border-radius:8px;background:var(--card);`;
        document.body.appendChild(touchClone);
        navigator.vibrate?.(30);
      }, 500);
    }, { passive: true });

    handle.addEventListener('touchmove', e => {
      if (!touchDragGroup) { clearTimeout(longTimer); return; }
      e.preventDefault();
      const t = e.touches[0];
      if (touchClone) touchClone.style.top = (t.clientY - offY) + 'px';
      allGroups().forEach(g => g.classList.remove('drag-over-top', 'drag-over-bot'));
      for (const g of allGroups()) {
        if (g === touchDragGroup) continue;
        const r = g.getBoundingClientRect();
        if (t.clientY >= r.top && t.clientY <= r.bottom) {
          g.classList.add(t.clientY < r.top + r.height / 2 ? 'drag-over-top' : 'drag-over-bot');
          break;
        }
      }
    }, { passive: false });

    handle.addEventListener('touchend', () => {
      clearTimeout(longTimer);
      if (!touchDragGroup) return;
      touchClone?.remove(); touchClone = null;
      touchDragGroup.classList.remove('is-dragging');
      const target = container.querySelector('.link-category-group.drag-over-top, .link-category-group.drag-over-bot');
      if (target) {
        reorderLinkCategory(
          touchDragGroup.dataset.category, target.dataset.category,
          target.classList.contains('drag-over-top')
        );
      }
      allGroups().forEach(g => g.classList.remove('drag-over-top', 'drag-over-bot'));
      touchDragGroup = null;
    }, { passive: true });

    handle.addEventListener('touchcancel', () => {
      clearTimeout(longTimer);
      touchClone?.remove(); touchClone = null;
      if (touchDragGroup) { touchDragGroup.classList.remove('is-dragging'); touchDragGroup = null; }
      allGroups().forEach(g => g.classList.remove('drag-over-top', 'drag-over-bot'));
    }, { passive: true });
  });
}

function reorderLinks(srcId, tgtId) {
  const si = state.links.findIndex(l => l.id === srcId);
  const ti = state.links.findIndex(l => l.id === tgtId);
  if (si === -1 || ti === -1) return;
  const srcCat = state.links[si].category;
  const tgtCat = state.links[ti].category;
  if (srcCat !== tgtCat) return;
  const [moved] = state.links.splice(si, 1);
  const newTi = state.links.findIndex(l => l.id === tgtId);
  state.links.splice(newTi, 0, moved);
  saveState();
  renderLinks();
}

function setupLinksDrag() {
  document.querySelectorAll('.link-category-group').forEach(group => {
    const items = () => group.querySelectorAll('.link-item[data-link-id]');
    let dragSrc = null;
    let longTimer = null, touchDragItem = null, touchClone = null, offX = 0, offY = 0;

    group.querySelectorAll('.link-item[data-link-id]').forEach(item => {
      // Desktop drag
      item.addEventListener('dragstart', e => {
        dragSrc = item;
        item.classList.add('is-dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('is-dragging');
        items().forEach(i => i.classList.remove('drag-over'));
        dragSrc = null;
      });
      item.addEventListener('dragover', e => {
        if (!dragSrc || item === dragSrc) return;
        e.preventDefault();
        items().forEach(i => i.classList.remove('drag-over'));
        item.classList.add('drag-over');
      });
      item.addEventListener('drop', e => {
        e.preventDefault();
        if (!dragSrc || dragSrc === item) return;
        reorderLinks(dragSrc.dataset.linkId, item.dataset.linkId);
      });

      // Touch drag (long press)
      item.addEventListener('touchstart', e => {
        const t = e.touches[0];
        longTimer = setTimeout(() => {
          touchDragItem = item;
          item.classList.add('is-dragging');
          const rect = item.getBoundingClientRect();
          offX = t.clientX - rect.left; offY = t.clientY - rect.top;
          touchClone = item.cloneNode(true);
          touchClone.className += ' note-drag-clone';
          touchClone.style.cssText += `;width:${rect.width}px;top:${rect.top}px;left:${rect.left}px;`;
          document.body.appendChild(touchClone);
          navigator.vibrate?.(30);
        }, 500);
      }, { passive: true });

      item.addEventListener('touchmove', e => {
        if (!touchDragItem) { clearTimeout(longTimer); return; }
        e.preventDefault();
        const t = e.touches[0];
        if (touchClone) { touchClone.style.top = (t.clientY - offY) + 'px'; touchClone.style.left = (t.clientX - offX) + 'px'; }
        items().forEach(i => i.classList.remove('drag-over'));
        for (const el of group.querySelectorAll('.link-item:not(.is-dragging)')) {
          const r = el.getBoundingClientRect();
          if (t.clientY >= r.top && t.clientY <= r.bottom) { el.classList.add('drag-over'); break; }
        }
      }, { passive: false });

      item.addEventListener('touchend', () => {
        clearTimeout(longTimer);
        if (!touchDragItem) return;
        touchClone?.remove(); touchClone = null;
        touchDragItem.classList.remove('is-dragging');
        const target = group.querySelector('.link-item.drag-over');
        if (target) reorderLinks(touchDragItem.dataset.linkId, target.dataset.linkId);
        touchDragItem = null;
      }, { passive: true });

      item.addEventListener('touchcancel', () => {
        clearTimeout(longTimer);
        touchClone?.remove(); touchClone = null;
        if (touchDragItem) { touchDragItem.classList.remove('is-dragging'); touchDragItem = null; }
        group.querySelectorAll('.link-item').forEach(i => i.classList.remove('drag-over'));
      }, { passive: true });
    });
  });
}

// =============================================
// TASK MODAL
// =============================================

function initTaskFormElements() {
  const storeEl = document.getElementById('task-store');
  storeEl.innerHTML = '<option value="">未選択</option>' +
    STORES.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');

  document.getElementById('platform-grid').innerHTML =
    PLATFORMS.map(p =>
      `<div class="platform-chip" data-platform="${p.id}" onclick="togglePlatform('${p.id}')">
         ${p.name}
       </div>`
    ).join('');

  document.getElementById('status-grid').innerHTML =
    STATUSES.map(s => {
      const st = STATUS_STYLE[s];
      return `<div class="status-chip-option" data-status="${s}"
                   style="border-color:${st.border};color:${st.text};"
                   onclick="selectStatusChip('${s}')">
                ${esc(s)}
              </div>`;
    }).join('');
}

function openAddTaskModal() {
  state.editingTaskId = null;
  document.getElementById('modal-title').textContent = '📝 タスク追加';
  document.getElementById('task-id').value        = '';
  document.getElementById('task-title').value     = '';
  document.getElementById('task-store').value     = '';
  document.getElementById('task-post-date').value    = '';
  document.getElementById('task-post-date').disabled = false;
  document.getElementById('task-hold').checked        = false;
  document.getElementById('task-notes').value         = '';
  document.getElementById('delete-task-btn').classList.add('is-hidden');
  document.getElementById('task-updated-info')?.classList.add('is-hidden');
  document.querySelectorAll('.platform-chip').forEach(c => c.classList.remove('is-selected'));
  clearStatusChips();
  document.getElementById('task-modal').classList.remove('is-hidden');
  setTimeout(() => document.getElementById('task-title').focus(), 100);
}

function openEditTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  state.editingTaskId = id;
  document.getElementById('modal-title').textContent = '📝 タスク追加';
  document.getElementById('task-id').value           = id;
  document.getElementById('task-title').value        = task.title || '';
  document.getElementById('task-store').value        = task.store || '';
  const isHeld = task.postDate === '__hold__';
  document.getElementById('task-post-date').value    = isHeld ? '' : (task.postDate || '');
  document.getElementById('task-post-date').disabled = isHeld;
  document.getElementById('task-hold').checked       = isHeld;
  document.getElementById('task-notes').value        = task.notes || '';
  document.getElementById('delete-task-btn').classList.remove('is-hidden');
  document.querySelectorAll('.platform-chip').forEach(c => {
    c.classList.toggle('is-selected', (task.platforms || []).includes(c.dataset.platform));
  });
  selectStatusChip(task.status);
  const infoEl = document.getElementById('task-updated-info');
  if (infoEl) {
    infoEl.textContent = task.updatedAt ? `更新: ${formatShortDate(task.updatedAt)}` : '';
    infoEl.classList.toggle('is-hidden', !task.updatedAt);
  }
  document.getElementById('task-modal').classList.remove('is-hidden');
}

function closeTaskModal() {
  document.getElementById('task-modal').classList.add('is-hidden');
  state.editingTaskId = null;
}

function togglePlatform(id) {
  document.querySelector(`.platform-chip[data-platform="${id}"]`)?.classList.toggle('is-selected');
}

function clearStatusChips() {
  document.querySelectorAll('.status-chip-option').forEach(c => {
    const st = STATUS_STYLE[c.dataset.status];
    c.style.background  = '';
    c.style.borderColor = st.border;
    c.style.color       = st.text;
    c.style.fontWeight  = '600';
    delete c.dataset.selected;
  });
}

function selectStatusChip(status) {
  document.querySelectorAll('.status-chip-option').forEach(c => {
    const s  = c.dataset.status;
    const st = STATUS_STYLE[s];
    if (s === status) {
      c.style.background   = st.bg;
      c.style.borderColor  = st.border;
      c.style.color        = st.text;
      c.style.fontWeight   = '700';
      c.dataset.selected   = 'true';
    } else {
      c.style.background  = '';
      c.style.borderColor = st.border;
      c.style.color       = st.text;
      c.style.fontWeight  = '600';
      delete c.dataset.selected;
    }
  });
}

function onSaveTask(e) {
  e.preventDefault();
  const title = document.getElementById('task-title').value.trim();
  if (!title) return;

  const platforms = [...document.querySelectorAll('.platform-chip.is-selected')]
    .map(c => c.dataset.platform);

  const selectedChip = document.querySelector('.status-chip-option[data-selected="true"]');
  if (!selectedChip) { showToast('ステータスを選択してください'); return; }
  const status = selectedChip.dataset.status;

  const data = {
    title,
    store:     document.getElementById('task-store').value,
    platforms,
    status,
    postDate:  document.getElementById('task-hold').checked
               ? '__hold__'
               : (document.getElementById('task-post-date').value || null),
    notes:     document.getElementById('task-notes').value.trim(),
    updatedAt: new Date().toISOString(),
  };

  if (state.editingTaskId) {
    const i = state.tasks.findIndex(t => t.id === state.editingTaskId);
    if (i !== -1) state.tasks[i] = { ...state.tasks[i], ...data };
    showToast('タスクを更新しました');
  } else {
    const defaultCat = STATUS_CATEGORIES[status]?.[0] ?? null;
    state.tasks.unshift({ id: uid(), createdAt: new Date().toISOString(), category: defaultCat, ...data });
    showToast('タスクを追加しました');
  }

  saveState();
  closeTaskModal();
  refreshCurrentTab();
}

function onDeleteTask() {
  if (!state.editingTaskId) return;
  const task = state.tasks.find(t => t.id === state.editingTaskId);
  if (!task) return;
  const savedTask = { ...task };
  const savedIdx  = state.tasks.indexOf(task);
  state.tasks = state.tasks.filter(t => t.id !== state.editingTaskId);
  saveState();
  closeTaskModal();
  refreshCurrentTab();
  showToast(`「${savedTask.title}」を削除しました`, () => {
    state.tasks.splice(savedIdx, 0, savedTask);
    saveState();
    refreshCurrentTab();
  });
}

// =============================================
// LINK MODAL
// =============================================

function openAddLinkModal() {
  state.editingLinkId = null;
  document.getElementById('link-modal-title').textContent = 'リンク追加';
  document.getElementById('link-id').value       = '';
  document.getElementById('link-category').value = '';
  document.getElementById('link-label').value    = '';
  document.getElementById('link-content').value  = '';
  document.querySelector('input[name="link-type"][value="link"]').checked = true;
  document.getElementById('delete-link-btn').classList.add('is-hidden');
  refreshCategoryDatalist();
  document.getElementById('link-modal').classList.remove('is-hidden');
  setTimeout(() => document.getElementById('link-label').focus(), 100);
}

function openEditLink(id) {
  const link = state.links.find(l => l.id === id);
  if (!link) return;
  state.editingLinkId = id;
  document.getElementById('link-modal-title').textContent = 'リンク編集';
  document.getElementById('link-id').value       = id;
  document.getElementById('link-category').value = link.category || '';
  document.getElementById('link-label').value    = link.label    || '';
  document.getElementById('link-content').value  = link.content  || '';
  const radio = document.querySelector(`input[name="link-type"][value="${link.type || 'link'}"]`);
  if (radio) radio.checked = true;
  document.getElementById('delete-link-btn').classList.remove('is-hidden');
  refreshCategoryDatalist();
  document.getElementById('link-modal').classList.remove('is-hidden');
}

function closeLinkModal() {
  document.getElementById('link-modal').classList.add('is-hidden');
  state.editingLinkId = null;
}

function refreshCategoryDatalist() {
  const cats = [...new Set(state.links.map(l => l.category).filter(Boolean))];
  document.getElementById('category-datalist').innerHTML =
    cats.map(c => `<option value="${esc(c)}">`).join('');
}

function onSaveLink(e) {
  e.preventDefault();
  const label   = document.getElementById('link-label').value.trim();
  const content = document.getElementById('link-content').value.trim();
  if (!label || !content) return;

  const data = {
    category: document.getElementById('link-category').value.trim() || 'その他',
    label,
    content,
    type:      document.querySelector('input[name="link-type"]:checked')?.value || 'link',
    updatedAt: new Date().toISOString(),
  };

  if (state.editingLinkId) {
    const i = state.links.findIndex(l => l.id === state.editingLinkId);
    if (i !== -1) state.links[i] = { ...state.links[i], ...data };
    showToast('リンクを更新しました');
  } else {
    state.links.push({ id: uid(), createdAt: new Date().toISOString(), ...data });
    showToast('リンクを追加しました');
  }

  saveState();
  closeLinkModal();
  renderLinks();
}

function onDeleteLink() {
  if (!state.editingLinkId) return;
  if (!confirm('このリンクを削除しますか？')) return;
  state.links = state.links.filter(l => l.id !== state.editingLinkId);
  saveState();
  closeLinkModal();
  renderLinks();
  showToast('リンクを削除しました');
}

// =============================================
// REEL MODAL
// =============================================

function openAddReelModal(type = 'monthly') {
  const labels = { monthly: '月リール追加', ec: 'ECリール追加', personal: '個人リール追加', english: '英語リール追加' };
  document.getElementById('reel-modal-title').textContent = labels[type] || '追加';
  document.getElementById('reel-mode').value     = 'add';
  document.getElementById('reel-type').value     = type;
  document.getElementById('reel-group-id').value = '';
  document.getElementById('reel-video-id').value = '';
  document.getElementById('reel-prod-month').value = '';
  document.getElementById('reel-post-month').value = '';
  document.getElementById('reel-title-1').value  = '';
  document.getElementById('reel-note-1').value   = '';
  document.getElementById('reel-title-2').value  = '';
  document.getElementById('reel-note-2').value   = '';
  document.getElementById('reel-gen-tasks').checked = true;
  document.getElementById('reel-label-1').innerHTML = 'タイトル <span class="required">*</span>';

  document.getElementById('reel-month-section').classList.remove('is-hidden');
  document.getElementById('delete-reel-btn').classList.add('is-hidden');
  document.getElementById('reel-submit-btn').textContent = '追加';

  const isMonthly  = type === 'monthly';
  const isEc       = type === 'ec';
  const isPersonal = type === 'personal';
  const isEnglish  = type === 'english';

  document.getElementById('reel-video2-section').classList.toggle('is-hidden', !isMonthly);
  document.getElementById('reel-task-gen-section').classList.toggle('is-hidden', !isMonthly);
  document.getElementById('reel-post-month-group').classList.toggle('is-hidden', !isMonthly);
  document.getElementById('reel-ec-note').classList.toggle('is-hidden', !isEc);
  document.getElementById('reel-personal-store-section').classList.toggle('is-hidden', !(isPersonal || isEnglish));

  if (isPersonal || isEnglish) {
    document.getElementById('store-check-grid').innerHTML = STORES.map(s =>
      `<label class="checkbox-label"><input type="checkbox" name="personal-store" value="${esc(s)}"> ${esc(s)}</label>`
    ).join('');
  }

  document.getElementById('reel-modal').classList.remove('is-hidden');
  setTimeout(() => document.getElementById('reel-prod-month').focus(), 100);
}

function openEditVideoModal(groupId, videoId) {
  const group = state.reels.find(m => m.id === groupId);
  if (!group) return;
  const video = group.videos.find(v => v.id === videoId);
  if (!video) return;
  const idx = group.videos.indexOf(video);

  document.getElementById('reel-modal-title').textContent = `リール${CIRCLED[idx] || (idx + 1)} 編集`;
  document.getElementById('reel-mode').value     = 'edit';
  document.getElementById('reel-group-id').value = groupId;
  document.getElementById('reel-video-id').value = videoId;
  document.getElementById('reel-title-1').value  = video.title;
  document.getElementById('reel-note-1').value   = video.note || '';
  document.getElementById('reel-label-1').innerHTML = 'タイトル <span class="required">*</span>';

  document.getElementById('reel-month-section').classList.add('is-hidden');
  document.getElementById('reel-video2-section').classList.add('is-hidden');
  document.getElementById('reel-task-gen-section').classList.add('is-hidden');
  document.getElementById('delete-reel-btn').classList.remove('is-hidden');
  document.getElementById('reel-submit-btn').textContent = '保存';

  document.getElementById('reel-modal').classList.remove('is-hidden');
  setTimeout(() => document.getElementById('reel-title-1').focus(), 100);
}

function closeReelModal() {
  document.getElementById('reel-modal').classList.add('is-hidden');
}

function generateTasksForVideo(videoId, videoTitle, circledNum, prodMonth, postMonth, initialNote = '') {
  STORES.forEach(store => {
    state.tasks.unshift({
      id:        uid(),
      title:     `${store}${circledNum}${videoTitle}`,
      store:     store,
      platforms: [],
      status:    '撮影中',
      notes:     initialNote,
      videoId:   videoId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  });
}

function onSaveReel(e) {
  e.preventDefault();
  const mode = document.getElementById('reel-mode').value;

  if (mode === 'add') {
    const type      = document.getElementById('reel-type').value || 'monthly';
    const prodMonth = document.getElementById('reel-prod-month').value.trim();
    const postMonth = document.getElementById('reel-post-month').value.trim();
    const title1    = document.getElementById('reel-title-1').value.trim();
    const note1     = document.getElementById('reel-note-1').value.trim();
    const title2    = document.getElementById('reel-title-2').value.trim();
    const note2     = document.getElementById('reel-note-2').value.trim();
    const genTasks  = document.getElementById('reel-gen-tasks').checked;

    if (!prodMonth) { showToast('制作月を選択してください'); return; }
    if (!title1)    { showToast('リール① のタイトルを入力してください'); return; }
    if (type === 'monthly' && !title2) {
      showToast('リール② のタイトルを入力してください'); return;
    }

    if (type === 'monthly') {
      const videos = [{ id: uid(), title: title1, note: note1 }];
      if (title2) videos.push({ id: uid(), title: title2, note: note2 });
      state.reels.push({ id: uid(), year: new Date().getFullYear(), type, productionMonth: prodMonth, postMonth, videos });
      if (genTasks) {
        videos.forEach((v, i) => {
          generateTasksForVideo(v.id, v.title, CIRCLED[i] || `${i + 1}`, prodMonth, postMonth, v.note);
        });
        showToast(`追加しました（${videos.length * STORES.length}件のタスクを生成）`);
      } else {
        showToast('リールを追加しました');
      }
    } else if (type === 'ec') {
      const ecVid = { id: uid(), title: `EC店${title1}`, note: note1 };
      state.reels.push({ id: uid(), year: new Date().getFullYear(), type, productionMonth: prodMonth, postMonth,
        videos: [ecVid] });
      state.tasks.unshift({
        id: uid(), title: `EC○${title1}`, store: 'EC店',
        platforms: [], status: '撮影中', notes: note1,
        videoId: ecVid.id,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      });
      showToast('ECリールを追加しました（EC店のタスク1件を生成）');
    } else if (type === 'personal') {
      const selectedStores = [...document.querySelectorAll('input[name="personal-store"]:checked')].map(cb => cb.value);
      const reelVideos = selectedStores.length
        ? selectedStores.map(s => ({ id: uid(), title: `${s}${title1}`, note: note1 }))
        : [{ id: uid(), title: title1, note: note1 }];
      state.reels.push({ id: uid(), year: new Date().getFullYear(), type, productionMonth: prodMonth, postMonth, videos: reelVideos });
      selectedStores.forEach((store, i) => {
        state.tasks.unshift({
          id: uid(), title: `${store}○${title1}`, store,
          platforms: [], status: '撮影中', notes: note1,
          videoId: reelVideos[i]?.id,
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        });
      });
      const count = selectedStores.length;
      showToast(count ? `個人リールを追加しました（${count}件のタスクを生成）` : '個人リールを追加しました');
    } else if (type === 'english') {
      const selectedStores = [...document.querySelectorAll('input[name="personal-store"]:checked')].map(cb => cb.value);
      // English reels use ONE video shared by all stores; title prefixed with 英語
      const engVid = { id: uid(), title: `英語${title1}`, note: note1 };
      state.reels.push({ id: uid(), year: new Date().getFullYear(), type, productionMonth: prodMonth, postMonth, videos: [engVid] });
      selectedStores.forEach(store => {
        state.tasks.unshift({
          id: uid(), title: `英語○${store}${title1}`, store,
          platforms: [], status: 'ゆっきー', notes: note1,
          videoId: engVid.id,
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        });
      });
      const count = selectedStores.length;
      showToast(count ? `英語リールを追加しました（${count}件のタスクを生成）` : '英語リールを追加しました');
    } else {
      const videos = [{ id: uid(), title: title1, note: note1 }];
      state.reels.push({ id: uid(), year: new Date().getFullYear(), type, productionMonth: prodMonth, postMonth, videos });
      showToast('リールを追加しました');
    }

  } else if (mode === 'edit') {
    const groupId = document.getElementById('reel-group-id').value;
    const videoId = document.getElementById('reel-video-id').value;
    const title   = document.getElementById('reel-title-1').value.trim();
    const note    = document.getElementById('reel-note-1').value.trim();

    if (!title) { showToast('タイトルを入力してください'); return; }

    const group = state.reels.find(m => m.id === groupId);
    const video = group?.videos.find(v => v.id === videoId);
    if (!video) return;

    const prevTitle  = video.title;
    const videoIdx   = group.videos.indexOf(video);
    const circledNum = CIRCLED[videoIdx] || `${videoIdx + 1}`;

    video.title = title;
    video.note  = note;

    // Propagate note to linked tasks.
    // Also retro-links tasks created before videoId was stored (title-pattern match).
    const now = new Date().toISOString();
    state.tasks.forEach(t => {
      let linked = t.videoId === videoId;

      if (!linked && !t.videoId) {
        // Retro-link by title pattern so existing data works too
        if (group.type === 'monthly') {
          linked = STORES.some(s => t.title === `${s}${circledNum}${prevTitle}`);
        } else if (group.type === 'ec') {
          const base = prevTitle.replace(/^EC店/, '');
          linked = t.title === `EC○${base}` || t.title === `EC①${base}`;
        } else if (group.type === 'english') {
          const base = prevTitle.replace(/^英語/, '');
          linked = STORES.some(s => t.title === `英語○${s}${base}`);
        } else if (group.type === 'personal') {
          const matchStore = STORES.find(s => prevTitle.startsWith(s));
          if (matchStore) linked = t.title === `${matchStore}○${prevTitle.slice(matchStore.length)}` || t.title === `${matchStore}①${prevTitle.slice(matchStore.length)}`;
        }
        if (linked) t.videoId = videoId; // persist link for future edits
      }

      if (linked) {
        t.notes     = note;
        t.updatedAt = now;
      }
    });

    showToast('リールを更新しました');
  }

  saveState();
  closeReelModal();
  renderVideos();
}

function onDeleteReel() {
  const groupId = document.getElementById('reel-group-id').value;
  const videoId = document.getElementById('reel-video-id').value;
  const group   = state.reels.find(m => m.id === groupId);
  if (!group) return;
  const video = group.videos.find(v => v.id === videoId);
  if (!video) return;
  const savedTitle    = video.title;
  const savedGroup    = { ...group, videos: [...group.videos] };
  const savedGroupIdx = state.reels.indexOf(group);

  group.videos = group.videos.filter(v => v.id !== videoId);
  if (!group.videos.length) state.reels = state.reels.filter(m => m.id !== groupId);

  saveState();
  closeReelModal();
  renderVideos();
  showToast(`「${savedTitle}」を削除しました`, () => {
    const existing = state.reels.find(m => m.id === groupId);
    if (existing) { existing.videos = savedGroup.videos; }
    else { state.reels.splice(savedGroupIdx, 0, savedGroup); }
    saveState();
    renderVideos();
  });
}

function deleteVideoItem(groupId, videoId) {
  const group = state.reels.find(m => m.id === groupId);
  const video = group?.videos.find(v => v.id === videoId);
  if (!video) return;
  const savedTitle    = video.title;
  const savedGroup    = { ...group, videos: [...group.videos] };
  const savedGroupIdx = state.reels.indexOf(group);

  group.videos = group.videos.filter(v => v.id !== videoId);
  if (!group.videos.length) state.reels = state.reels.filter(m => m.id !== groupId);

  saveState();
  renderVideos();
  showToast(`「${savedTitle}」を削除しました`, () => {
    const existing = state.reels.find(m => m.id === groupId);
    if (existing) { existing.videos = savedGroup.videos; }
    else { state.reels.splice(savedGroupIdx, 0, savedGroup); }
    saveState();
    renderVideos();
  });
}

// =============================================
// HELPERS
// =============================================

function refreshCurrentTab() {
  ({ home: renderHome, status: renderStatus, videos: renderVideos,
     posts: renderPosts, notes: renderNotes, links: renderLinks })[state.activeTab]?.();
}

// =============================================
// EVENT SETUP
// =============================================

function setupEvents() {
  // Bottom nav
  document.querySelectorAll('.nav-btn[data-page]').forEach(btn =>
    btn.addEventListener('click', () => navigate(btn.dataset.page))
  );

  // Sidebar nav
  document.querySelectorAll('.sidebar-btn[data-page]').forEach(btn =>
    btn.addEventListener('click', () => navigate(btn.dataset.page))
  );

  // Open add task (bottom nav + sidebar)
  document.getElementById('open-add-modal').addEventListener('click', openAddTaskModal);
  document.getElementById('sidebar-add-btn')?.addEventListener('click', openAddTaskModal);

  // Task modal
  document.getElementById('close-task-modal').addEventListener('click', closeTaskModal);
  document.getElementById('task-modal-backdrop').addEventListener('click', closeTaskModal);
  document.getElementById('task-hold').addEventListener('change', function() {
    const dateEl = document.getElementById('task-post-date');
    dateEl.disabled = this.checked;
    if (this.checked) dateEl.value = '';
  });
  document.getElementById('task-form').addEventListener('submit', onSaveTask);
  document.getElementById('delete-task-btn').addEventListener('click', onDeleteTask);

  // Link modal
  document.getElementById('add-link-btn').addEventListener('click', openAddLinkModal);
  document.getElementById('close-link-modal').addEventListener('click', closeLinkModal);
  document.getElementById('link-modal-backdrop').addEventListener('click', closeLinkModal);
  document.getElementById('link-form').addEventListener('submit', onSaveLink);
  document.getElementById('delete-link-btn').addEventListener('click', onDeleteLink);

  // Video sub-tabs
  document.querySelectorAll('#video-tabs .tab-btn').forEach(btn =>
    btn.addEventListener('click', () => {
      document.querySelectorAll('#video-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.videoSubTab = btn.dataset.target;
      renderVideos();
    })
  );

  // Reel modal
  document.getElementById('close-reel-modal').addEventListener('click', closeReelModal);
  document.getElementById('reel-modal-backdrop').addEventListener('click', closeReelModal);
  document.getElementById('reel-form').addEventListener('submit', onSaveReel);
  document.getElementById('delete-reel-btn').addEventListener('click', onDeleteReel);

  // 制作月 → 投稿月 自動入力
  const NEXT_MONTH = {
    '1月':'2月','2月':'3月','3月':'4月','4月':'5月','5月':'6月','6月':'7月',
    '7月':'8月','8月':'9月','9月':'10月','10月':'11月','11月':'12月','12月':'1月',
  };
  document.getElementById('reel-prod-month').addEventListener('change', function () {
    document.getElementById('reel-post-month').value = this.value ? (NEXT_MONTH[this.value] || '') : '';
  });

  // Note modal
  document.getElementById('add-note-btn').addEventListener('click', openAddNote);
  document.getElementById('close-note-modal').addEventListener('click', closeNoteModal);
  document.getElementById('note-modal-backdrop').addEventListener('click', closeNoteModal);
  document.getElementById('note-form').addEventListener('submit', onSaveNote);
  document.getElementById('delete-note-btn').addEventListener('click', onDeleteNote);

  // Announce modal
  document.getElementById('close-announce-modal').addEventListener('click', closeAnnounceModal);
  document.getElementById('announce-modal-backdrop').addEventListener('click', closeAnnounceModal);
  document.getElementById('announce-form').addEventListener('submit', onSaveAnnouncement);
}

// =============================================
// INIT
// =============================================

function initDatePicker() {
  if (typeof flatpickr === 'undefined') return;
  flatpickr('#task-post-date', {
    dateFormat: 'Y-m-d',
    locale: {
      firstDayOfWeek: 1,
      weekdays: {
        shorthand: ['日', '月', '火', '水', '木', '金', '土'],
        longhand: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
      },
      months: {
        shorthand: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        longhand: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      },
    },
    onDayCreate(_, __, ___, dayElem) {
      const dateStr = toDateStrLocal(dayElem.dateObj);
      const dow = dayElem.dateObj.getDay();
      const holiday = JP_HOLIDAYS[dateStr];
      const mmdd = dateStr.slice(5);
      const event = ANNUAL_EVENTS[mmdd];
      if (dow === 0 || holiday) {
        dayElem.classList.add('fp-holiday');
      } else if (dow === 6) {
        dayElem.classList.add('fp-saturday');
      }
      if (holiday || event) {
        const dot = document.createElement('span');
        dot.className = holiday ? 'fp-day-dot fp-holiday-dot' : 'fp-day-dot fp-event-dot';
        dot.title = holiday || event;
        dayElem.appendChild(dot);
      }
    },
  });
}

function initFirebaseSync() {
  if (typeof FB_REF === 'undefined') return;

  let firstLoad = true;

  FB_REF.on('value', snapshot => {
    const data = snapshot.val();

    if (firstLoad) {
      firstLoad = false;

      if (data) {
        // Firebase has data — it is the source of truth; always apply on first connect
        _fbApplying = true;
        applyRemoteState(data, true);
        _fbApplying = false;
        try { localStorage.setItem('coinluck_v1', JSON.stringify(buildStateSnapshot())); } catch (_) {}
        refreshCurrentTab();
      } else {
        // Firebase is empty — only seed it once per device (initial migration)
        const alreadySeeded = localStorage.getItem('coinluck_fb_seeded') === '1';
        const localRaw      = localStorage.getItem('coinluck_v1');
        if (!alreadySeeded && localRaw) {
          FB_REF.set(buildStateSnapshot()).then(() => {
            try { localStorage.setItem('coinluck_fb_seeded', '1'); } catch (_) {}
          }).catch(() => {});
        }
        // If already seeded but Firebase is empty (e.g. rules issue), do NOT overwrite
      }
      return;
    }

    // Ongoing remote changes from another device/tab — use timestamp to resolve conflicts
    if (data) {
      _fbApplying = true;
      applyRemoteState(data, false);
      _fbApplying = false;
      try { localStorage.setItem('coinluck_v1', JSON.stringify(buildStateSnapshot())); } catch (_) {}
      refreshCurrentTab();
    }
  }, () => {
    // Firebase offline — silently continue with localStorage cache
  });
}

function init() {
  loadState();
  // Write to localStorage only — do NOT upload to Firebase before sync is established
  try { localStorage.setItem('coinluck_v1', JSON.stringify(buildStateSnapshot())); } catch (_) {}
  initTaskFormElements();
  setupEvents();
  initDatePicker();
  const validTabs = ['home', 'status', 'posts', 'videos', 'notes', 'links'];
  const lastTab   = localStorage.getItem('coinluck_tab') || 'home';
  navigate(validTabs.includes(lastTab) ? lastTab : 'home');
  initFirebaseSync();
}

document.addEventListener('DOMContentLoaded', init);

// Sync across tabs: StorageEvent fires in all OTHER tabs when this tab writes to localStorage
window.addEventListener('storage', e => {
  if (e.key === 'coinluck_v1') {
    loadState();
    refreshCurrentTab();
  }
});

// Prevent pinch/double-tap zoom on iOS (viewport meta alone is ignored by Safari/Chrome on iOS)
document.addEventListener('touchstart',  e => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
document.addEventListener('touchmove',   e => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
document.addEventListener('gesturestart',  e => e.preventDefault(), false);
document.addEventListener('gesturechange', e => e.preventDefault(), false);
document.addEventListener('gestureend',    e => e.preventDefault(), false);

let _lastTap = 0;
document.addEventListener('touchend', e => {
  const now = Date.now();
  if (now - _lastTap < 300) e.preventDefault();
  _lastTap = now;
}, { passive: false });
