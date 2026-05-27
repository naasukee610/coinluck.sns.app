/* =============================================
   COIN LUCK SNS運用管理アプリ
   ============================================= */

// =============================================
// CONFIG
// =============================================

const STATUSES = ['撮影中', 'ゆっきー', 'せい', 'ともちん', '投稿', '広告', '完了'];

const STATUS_STYLE = {
  '撮影中':   { bg: '#F2EFEC', text: '#7A7068', border: '#C8C0B8' },
  'ゆっきー': { bg: '#EAF0FA', text: '#3A5E8F', border: '#AABFDC' },
  'せい':     { bg: '#EDE6F5', text: '#6B4E94', border: '#C4B0DC' },
  'ともちん': { bg: '#F8EBDA', text: '#C97A3A', border: '#E2BF96' },
  '投稿':     { bg: '#E8F2E8', text: '#2E7040', border: '#98C898' },
  '広告':     { bg: '#F5E8E8', text: '#A84040', border: '#DCA8A8' },
  '完了':     { bg: '#E6EFF0', text: '#2B6B72', border: '#90BFC4' },
};

const STORES = ['仙台', '岐阜', '札幌', '広島', '東京', '福岡'];

const PLATFORMS = [
  { id: 'tiktok_jp',    name: 'TikTok JP',    icon: '🎵' },
  { id: 'instagram_jp', name: 'Instagram JP', icon: '📸' },
  { id: 'youtube_jp',   name: 'YouTube JP',   icon: '▶️' },
  { id: 'instagram_en', name: 'Instagram EN', icon: '🌏📸' },
  { id: 'tiktok_en',    name: 'TikTok EN',    icon: '🌏🎵' },
  { id: 'youtube_en',   name: 'YouTube EN',   icon: '🌏▶️' },
];

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

// =============================================
// STATE
// =============================================

const state = {
  tasks:         [],
  links:         [],
  reels:         [],
  activeTab:     'home',
  statusFilter:  'all',
  videoSubTab:   'reels',
  editingTaskId: null,
  editingLinkId: null,
};

// =============================================
// STORAGE
// =============================================

function initReels() {
  return MONTHLY_REELS.map(m => ({
    id: uid(),
    productionMonth: m.productionMonth,
    postMonth: m.postMonth,
    videos: m.videos.map(v => ({ id: uid(), title: v.title, note: v.note || '' })),
  }));
}

function loadState() {
  try {
    const raw = localStorage.getItem('coinluck_v1');
    if (raw) {
      const saved = JSON.parse(raw);
      state.tasks = saved.tasks || [];
      state.links = saved.links || [];
      state.reels = saved.reels && saved.reels.length ? saved.reels : initReels();
    } else {
      state.reels = initReels();
    }
  } catch (_) {
    state.reels = initReels();
  }
}

function saveState() {
  try {
    localStorage.setItem('coinluck_v1', JSON.stringify({
      tasks: state.tasks,
      links: state.links,
      reels: state.reels,
    }));
  } catch (_) {}
}

// =============================================
// UTILITIES
// =============================================

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
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
  return p ? `${p.icon} ${p.name}` : id;
}

function statusBadge(status) {
  const s = STATUS_STYLE[status] || { bg: '#eee', text: '#666', border: '#ccc' };
  return `<span class="status-badge" style="background:${s.bg};color:${s.text};border:1.5px solid ${s.border};">${esc(status)}</span>`;
}

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('is-hidden');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.add('is-hidden'), 2200);
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(
    ()  => showToast('コピーしました！'),
    ()  => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); showToast('コピーしました！'); } catch (_) {}
      document.body.removeChild(ta);
    }
  );
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
  ({ home: renderHome, status: renderStatus, videos: renderVideos,
     posts: renderPosts, links: renderLinks })[tab]?.();
}

// Exposed to inline onclick
function goToStatus(filter) {
  state.statusFilter = filter;
  navigate('status');
}

// =============================================
// HOME
// =============================================

function renderHome() {
  const now = new Date();
  const dateEl = document.getElementById('today-date');
  if (dateEl) {
    dateEl.innerHTML = `<div class="date-day">${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日（${DAY_NAMES[now.getDay()]}曜日）</div>`;
  }

  const counts = Object.fromEntries(STATUSES.map(s => [s, 0]));
  state.tasks.forEach(t => { if (counts[t.status] !== undefined) counts[t.status]++; });

  const todayItems = DAILY_SCHEDULE[now.getDay()] || [];
  const dayName = DAY_NAMES[now.getDay()];

  const scheduleHTML = todayItems.length
    ? todayItems.map(item => {
        const rule = POSTING_RULES[item.platform];
        return `
          <div class="schedule-item${item.highlight ? ' is-highlight' : ''}">
            <div class="schedule-platform-icon">${rule.icon}</div>
            <div class="schedule-info">
              <div class="schedule-name" style="color:${rule.color}">${rule.name}</div>
              <div class="schedule-note">${esc(item.note)}</div>
            </div>
            ${item.highlight ? '<span class="highlight-star">⭐</span>' : ''}
          </div>`;
      }).join('')
    : `<div class="schedule-empty">
         <div class="empty-icon">😌</div>
         <div class="empty-text">今日は予定投稿なし</div>
         <div class="empty-sub">（緊急の場合を除く）</div>
       </div>`;

  const pipelineHTML = STATUSES.map(s => {
    const st = STATUS_STYLE[s];
    return `<div class="pipeline-item"
              style="background:${st.bg};border-color:${st.border};"
              onclick="goToStatus('${s}')">
              <div class="pipeline-count" style="color:${st.text}">${counts[s]}</div>
              <div class="pipeline-label" style="color:${st.text}">${esc(s)}</div>
            </div>`;
  }).join('');

  const rulesHTML = Object.entries(POSTING_RULES).map(([id, rule]) => `
    <div class="rules-row">
      <div class="rules-row-header" onclick="toggleRule('${id}')">
        <span>${rule.icon} ${rule.name}</span>
        <span class="rules-chevron" id="rchev-${id}">▼</span>
      </div>
      <div class="rules-body is-hidden" id="rbody-${id}">
        ${rule.rules.map(r => `<div class="rule-item">・${esc(r)}</div>`).join('')}
      </div>
    </div>`).join('');

  document.getElementById('home-content').innerHTML = `
    <div class="card" id="home-schedule-card">
      <div class="card-title">📅 今日の投稿ガイド（${dayName}曜日）</div>
      ${scheduleHTML}
    </div>
    <div class="card" id="home-pipeline-card">
      <div class="card-title">📊 タスク進捗（タップで絞り込み）</div>
      <div class="pipeline-grid">${pipelineHTML}</div>
    </div>
    <div class="card" id="home-rules-card">
      <div class="card-title">📋 投稿ルール参照</div>
      ${rulesHTML}
    </div>`;
}

function toggleRule(id) {
  const body  = document.getElementById(`rbody-${id}`);
  const chev  = document.getElementById(`rchev-${id}`);
  if (!body) return;
  body.classList.toggle('is-hidden');
  chev.textContent = body.classList.contains('is-hidden') ? '▼' : '▲';
}

// =============================================
// STATUS PAGE
// =============================================

function renderStatus() {
  renderStatusFilters();
  renderTaskCards();
}

function renderStatusFilters() {
  const cnts = { all: state.tasks.length };
  STATUSES.forEach(s => cnts[s] = state.tasks.filter(t => t.status === s).length);

  document.getElementById('status-filters').innerHTML =
    `<button class="filter-chip${state.statusFilter === 'all' ? ' is-active' : ''}"
       onclick="setFilter('all')">
       すべて <span class="chip-count">${cnts.all}</span>
     </button>` +
    STATUSES.map(s =>
      `<button class="filter-chip${state.statusFilter === s ? ' is-active' : ''}"
         onclick="setFilter('${s}')">
         ${esc(s)} <span class="chip-count">${cnts[s]}</span>
       </button>`
    ).join('');
}

function setFilter(f) {
  state.statusFilter = f;
  renderStatusFilters();
  renderTaskCards();
}

function renderTaskCards() {
  const list = state.statusFilter === 'all'
    ? [...state.tasks].sort((a, b) => STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status))
    : state.tasks.filter(t => t.status === state.statusFilter);

  const el = document.getElementById('status-content');

  if (!list.length) {
    el.innerHTML = `<div class="empty-state">
      <span class="empty-icon">📭</span>
      <div class="empty-label">タスクがありません</div>
      <div class="empty-hint">＋ボタンからタスクを追加してください</div>
    </div>`;
    return;
  }

  el.innerHTML = list.map(task => {
    const st   = STATUS_STYLE[task.status] || {};
    const next = getNextStatus(task.status);
    const platforms = task.platforms || [];

    return `
      <div class="task-card" style="border-left-color:${st.border || '#E5E7EB'}"
           onclick="openEditTask('${task.id}')">
        <div class="task-card-top">
          <div class="task-title">${esc(task.title)}</div>
          ${statusBadge(task.status)}
        </div>
        <div class="task-meta">
          ${task.store    ? `<span class="meta-chip">📍 ${esc(task.store)}</span>`    : ''}
          ${task.assignee ? `<span class="meta-chip">👤 ${esc(task.assignee)}</span>` : ''}
          ${platforms.map(p => `<span class="meta-chip">${platformLabel(p)}</span>`).join('')}
        </div>
        ${task.notes ? `<div class="task-notes-preview">${esc(task.notes)}</div>` : ''}
        <div class="task-card-footer" onclick="event.stopPropagation()">
          <span class="task-updated">${task.updatedAt ? '更新: ' + formatShortDate(task.updatedAt) : ''}</span>
          ${next
            ? `<button class="advance-btn" onclick="advanceTask('${task.id}');event.stopPropagation()">→ ${esc(next)}</button>`
            : `<span class="done-chip">✓ 完了</span>`}
        </div>
      </div>`;
  }).join('');
}

function advanceTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  const next = getNextStatus(task.status);
  if (!next) return;
  task.status    = next;
  task.updatedAt = new Date().toISOString();
  saveState();
  renderStatus();
  if (state.activeTab === 'home') renderHome();
  showToast(`→ ${next} に進みました`);
}

// =============================================
// VIDEO PAGE
// =============================================

function renderVideos() {
  const el  = document.getElementById('video-content');
  const tab = state.videoSubTab;

  if (tab === 'reels') {
    if (!state.reels.length) {
      el.innerHTML = `<div class="empty-state">
        <span class="empty-icon">🎬</span>
        <div class="empty-label">リールがありません</div>
        <div class="empty-hint">右上の「＋月追加」からリールを追加してください</div>
      </div>`;
      return;
    }
    el.innerHTML = state.reels.map(m => `
      <div class="month-section">
        <div class="month-header">
          <span class="month-badge-prod">制作: ${esc(m.productionMonth)}</span>
          <span class="month-arrow">→</span>
          <span class="month-badge-post">投稿: ${esc(m.postMonth)}</span>
        </div>
        ${m.videos.map((v, i) => `
          <div class="video-item">
            <div class="video-num">${CIRCLED[i] || (i + 1)}</div>
            <div class="video-info">
              <div class="video-title">${esc(v.title)}</div>
              ${v.note ? `<div class="video-note">📌 ${esc(v.note)}</div>` : ''}
            </div>
            <div class="video-actions">
              <button class="video-action-btn"
                onclick="openEditVideoModal('${m.id}','${v.id}');event.stopPropagation()"
                title="編集">✏️</button>
              <button class="video-action-btn video-delete-btn"
                onclick="deleteVideoItem('${m.id}','${v.id}');event.stopPropagation()"
                title="削除">🗑️</button>
            </div>
          </div>`).join('')}
      </div>`).join('');
  } else {
    const isJp = tab === 'youtube-jp';
    el.innerHTML = `
      <div class="todo-card">
        <div class="todo-icon">${isJp ? '▶️' : '🌏▶️'}</div>
        <div class="todo-title">${isJp ? 'YouTube（日本語）' : '英語YouTube'} 過去投稿リスト</div>
        <div class="todo-sub">TODO：実際のリストをここに追加してください</div>
      </div>`;
  }
}

// =============================================
// POSTS PAGE
// =============================================

function renderPosts() {
  const el = document.getElementById('posts-content');

  if (!state.tasks.length) {
    el.innerHTML = `<div class="empty-state">
      <span class="empty-icon">📱</span>
      <div class="empty-label">投稿タスクがありません</div>
      <div class="empty-hint">＋ボタンからタスクを追加してください</div>
    </div>`;
    return;
  }

  const byPlatform = {};
  PLATFORMS.forEach(p => byPlatform[p.id] = []);

  state.tasks.forEach(task => {
    (task.platforms || []).forEach(pid => {
      if (byPlatform[pid]) byPlatform[pid].push(task);
    });
  });

  el.innerHTML = PLATFORMS.map(platform => {
    const tasks = byPlatform[platform.id];
    if (!tasks.length) return '';
    const rule = POSTING_RULES[platform.id];

    return `<div class="card post-platform-section">
      <div class="card-title" style="color:${rule.color}">${rule.icon} ${rule.name} （${tasks.length}件）</div>
      ${tasks.map(task => `
        <div class="post-task-row" onclick="openEditTask('${task.id}')">
          <div class="post-task-info">
            <div class="post-task-title">${esc(task.title)}</div>
            ${task.store ? `<div class="post-task-store">📍 ${esc(task.store)}</div>` : ''}
          </div>
          ${statusBadge(task.status)}
        </div>`).join('')}
    </div>`;
  }).join('');
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

  const cats = {};
  state.links.forEach(link => {
    const c = link.category || 'その他';
    (cats[c] = cats[c] || []).push(link);
  });

  el.innerHTML = Object.entries(cats).map(([cat, links]) => `
    <div class="link-category-group">
      <div class="link-cat-title">${esc(cat)}</div>
      ${links.map(link => `
        <div class="link-item" onclick="openEditLink('${link.id}')">
          <div class="link-type-icon">${link.type === 'text' ? '📝' : '🔗'}</div>
          <div class="link-info">
            <div class="link-label">${esc(link.label)}</div>
            <div class="link-preview">${esc(link.content)}</div>
          </div>
          <button class="copy-btn" onclick="copyText(${JSON.stringify(link.content)});event.stopPropagation()">コピー</button>
        </div>`).join('')}
    </div>`).join('');
}

// =============================================
// TASK MODAL
// =============================================

function initTaskFormElements() {
  const storeEl = document.getElementById('task-store');
  storeEl.innerHTML = '<option value="">未選択</option>' +
    STORES.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('');

  const assigneeEl = document.getElementById('task-assignee');
  assigneeEl.innerHTML = '<option value="">未選択</option>' +
    TEAM.map(m => `<option value="${esc(m.name)}">${m.emoji} ${esc(m.name)}（${esc(m.role)}）</option>`).join('');

  document.getElementById('platform-grid').innerHTML =
    PLATFORMS.map(p =>
      `<div class="platform-chip" data-platform="${p.id}" onclick="togglePlatform('${p.id}')">
         ${p.icon} ${p.name}
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
  document.getElementById('modal-title').textContent = 'タスク追加';
  document.getElementById('task-id').value    = '';
  document.getElementById('task-title').value = '';
  document.getElementById('task-store').value = '';
  document.getElementById('task-assignee').value = '';
  document.getElementById('task-notes').value = '';
  document.getElementById('delete-task-btn').classList.add('is-hidden');
  document.querySelectorAll('.platform-chip').forEach(c => c.classList.remove('is-selected'));
  selectStatusChip('撮影中');
  document.getElementById('task-modal').classList.remove('is-hidden');
  setTimeout(() => document.getElementById('task-title').focus(), 100);
}

function openEditTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  state.editingTaskId = id;
  document.getElementById('modal-title').textContent      = 'タスク編集';
  document.getElementById('task-id').value                = id;
  document.getElementById('task-title').value             = task.title || '';
  document.getElementById('task-store').value             = task.store || '';
  document.getElementById('task-assignee').value          = task.assignee || '';
  document.getElementById('task-notes').value             = task.notes || '';
  document.getElementById('delete-task-btn').classList.remove('is-hidden');
  document.querySelectorAll('.platform-chip').forEach(c => {
    c.classList.toggle('is-selected', (task.platforms || []).includes(c.dataset.platform));
  });
  selectStatusChip(task.status);
  document.getElementById('task-modal').classList.remove('is-hidden');
}

function closeTaskModal() {
  document.getElementById('task-modal').classList.add('is-hidden');
  state.editingTaskId = null;
}

function togglePlatform(id) {
  document.querySelector(`.platform-chip[data-platform="${id}"]`)?.classList.toggle('is-selected');
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
  const status = selectedChip ? selectedChip.dataset.status : '撮影中';

  const data = {
    title,
    store:     document.getElementById('task-store').value,
    assignee:  document.getElementById('task-assignee').value,
    platforms,
    status,
    notes:     document.getElementById('task-notes').value.trim(),
    updatedAt: new Date().toISOString(),
  };

  if (state.editingTaskId) {
    const i = state.tasks.findIndex(t => t.id === state.editingTaskId);
    if (i !== -1) state.tasks[i] = { ...state.tasks[i], ...data };
    showToast('タスクを更新しました');
  } else {
    state.tasks.unshift({ id: uid(), createdAt: new Date().toISOString(), ...data });
    showToast('タスクを追加しました');
  }

  saveState();
  closeTaskModal();
  refreshCurrentTab();
}

function onDeleteTask() {
  if (!state.editingTaskId) return;
  if (!confirm('このタスクを削除しますか？')) return;
  state.tasks = state.tasks.filter(t => t.id !== state.editingTaskId);
  saveState();
  closeTaskModal();
  refreshCurrentTab();
  showToast('タスクを削除しました');
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

function openAddReelModal() {
  document.getElementById('reel-modal-title').textContent = '月リール追加';
  document.getElementById('reel-mode').value    = 'add';
  document.getElementById('reel-group-id').value = '';
  document.getElementById('reel-video-id').value = '';
  document.getElementById('reel-prod-month').value = '';
  document.getElementById('reel-post-month').value = '';
  document.getElementById('reel-title-1').value  = '';
  document.getElementById('reel-note-1').value   = '';
  document.getElementById('reel-title-2').value  = '';
  document.getElementById('reel-note-2').value   = '';
  document.getElementById('reel-gen-tasks').checked = true;
  document.getElementById('reel-label-1').textContent = 'リール① タイトル';

  document.getElementById('reel-month-section').classList.remove('is-hidden');
  document.getElementById('reel-video2-section').classList.remove('is-hidden');
  document.getElementById('reel-task-gen-section').classList.remove('is-hidden');
  document.getElementById('delete-reel-btn').classList.add('is-hidden');
  document.getElementById('reel-submit-btn').textContent = '追加';

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
  document.getElementById('reel-label-1').textContent = 'タイトル';

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

function generateTasksForVideo(videoTitle, circledNum, prodMonth, postMonth) {
  STORES.forEach(store => {
    state.tasks.unshift({
      id:        uid(),
      title:     `${store}${circledNum}${videoTitle}`,
      store:     store,
      assignee:  '',
      platforms: [],
      status:    '撮影中',
      notes:     `制作: ${prodMonth} / 投稿: ${postMonth}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  });
}

function onSaveReel(e) {
  e.preventDefault();
  const mode = document.getElementById('reel-mode').value;

  if (mode === 'add') {
    const prodMonth = document.getElementById('reel-prod-month').value.trim();
    const postMonth = document.getElementById('reel-post-month').value.trim();
    const title1    = document.getElementById('reel-title-1').value.trim();
    const note1     = document.getElementById('reel-note-1').value.trim();
    const title2    = document.getElementById('reel-title-2').value.trim();
    const note2     = document.getElementById('reel-note-2').value.trim();
    const genTasks  = document.getElementById('reel-gen-tasks').checked;

    if (!prodMonth || !postMonth) {
      showToast('制作月・投稿月を入力してください');
      return;
    }
    if (!title1 && !title2) {
      showToast('リール①か②のタイトルを入力してください');
      return;
    }

    const videos = [];
    if (title1) videos.push({ id: uid(), title: title1, note: note1 });
    if (title2) videos.push({ id: uid(), title: title2, note: note2 });

    state.reels.push({ id: uid(), productionMonth: prodMonth, postMonth, videos });

    if (genTasks) {
      videos.forEach((v, i) => {
        generateTasksForVideo(v.title, CIRCLED[i] || `${i + 1}`, prodMonth, postMonth);
      });
      showToast(`追加しました（${videos.length * STORES.length}件のタスクを生成）`);
    } else {
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

    video.title = title;
    video.note  = note;
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
  if (!confirm(`「${video?.title}」を削除しますか？`)) return;

  group.videos = group.videos.filter(v => v.id !== videoId);
  if (!group.videos.length) state.reels = state.reels.filter(m => m.id !== groupId);

  saveState();
  closeReelModal();
  renderVideos();
  showToast('リールを削除しました');
}

function deleteVideoItem(groupId, videoId) {
  const group = state.reels.find(m => m.id === groupId);
  const video = group?.videos.find(v => v.id === videoId);
  if (!video) return;
  if (!confirm(`「${video.title}」を削除しますか？`)) return;

  group.videos = group.videos.filter(v => v.id !== videoId);
  if (!group.videos.length) state.reels = state.reels.filter(m => m.id !== groupId);

  saveState();
  renderVideos();
  showToast('リールを削除しました');
}

// =============================================
// HELPERS
// =============================================

function refreshCurrentTab() {
  ({ home: renderHome, status: renderStatus, videos: renderVideos,
     posts: renderPosts, links: renderLinks })[state.activeTab]?.();
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
  document.getElementById('add-reel-btn').addEventListener('click', openAddReelModal);
  document.getElementById('close-reel-modal').addEventListener('click', closeReelModal);
  document.getElementById('reel-modal-backdrop').addEventListener('click', closeReelModal);
  document.getElementById('reel-form').addEventListener('submit', onSaveReel);
  document.getElementById('delete-reel-btn').addEventListener('click', onDeleteReel);
}

// =============================================
// INIT
// =============================================

function init() {
  loadState();
  initTaskFormElements();
  setupEvents();
  navigate('home');
}

document.addEventListener('DOMContentLoaded', init);
