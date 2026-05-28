/* =============================================
   COIN LUCK SNS運用管理アプリ
   ============================================= */

// =============================================
// CONFIG
// =============================================

const STATUSES = ['撮影中', 'ゆっきー', 'せい', 'ともちん', '投稿', '広告', '完了'];

const STATUS_STYLE = {
  '撮影中':  { bg: '#F2EFEC', text: '#7A7068', border: '#C8C0B8' },
  'ゆっきー':{ bg: '#F5ECEE', text: '#8C5468', border: '#CCA8B4' },
  'せい':    { bg: '#E2EDE6', text: '#2D6045', border: '#80AA8E' },
  'ともちん':{ bg: '#F5EDD6', text: '#7A5E1C', border: '#C8A848' },
  '投稿':    { bg: '#EAE6E2', text: '#6B6159', border: '#BCB4AC' },
  '広告':    { bg: '#F2EFEC', text: '#7A7068', border: '#C8C0B8' },
  '完了':    { bg: '#EAE6E2', text: '#6B6159', border: '#BCB4AC' },
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
  tasks:            [],
  links:            [],
  reels:            [],
  notes:            [],
  announcements:    [],
  activeTab:        'home',
  statusFilter:     '撮影中',
  videoSubTab:      'reels',
  editingTaskId:    null,
  editingLinkId:    null,
  editingNoteId:    null,
  editingAnnounceId: null,
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
    order: i,
    createdAt: new Date().toISOString(),
  }));
}

function loadState() {
  try {
    const raw = localStorage.getItem('coinluck_v1');
    if (raw) {
      const saved = JSON.parse(raw);
      state.tasks         = saved.tasks  || [];
      state.links         = saved.links  || [];
      state.reels         = saved.reels  && saved.reels.length
        ? saved.reels.map(r => ({ year: 2026, type: 'monthly', ...r }))
        : initReels();
      state.notes         = saved.notes  && saved.notes.length  ? saved.notes  : initNotes();
      state.announcements = saved.announcements || [];
    } else {
      state.reels = initReels();
      state.notes = initNotes();
    }
  } catch (_) {
    state.reels = initReels();
    state.notes = initNotes();
  }
}

function saveState() {
  try {
    localStorage.setItem('coinluck_v1', JSON.stringify({
      tasks:         state.tasks,
      links:         state.links,
      reels:         state.reels,
      notes:         state.notes,
      announcements: state.announcements,
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

  const announceItems = state.announcements.length
    ? state.announcements.map(a => `
        <div class="announce-item">
          <span class="announce-bullet">📢</span>
          <div class="announce-text">${esc(a.text)}</div>
          <button class="announce-del-btn"
            onclick="deleteAnnouncement('${a.id}');event.stopPropagation()" title="削除">✕</button>
        </div>`).join('')
    : `<div class="announce-empty">お知らせはありません</div>`;

  document.getElementById('home-content').innerHTML = `
    <div class="card" id="home-schedule-card">
      <div class="card-title">📅 今日の投稿ガイド（${dayName}曜日）</div>
      ${scheduleHTML}
    </div>
    <div class="card" id="home-pipeline-card">
      <div class="card-title">📊 タスク進捗（タップで絞り込み）</div>
      <div class="pipeline-grid">${pipelineHTML}</div>
    </div>
    <div class="card" id="home-announce-card">
      <div class="announce-header">
        <div class="card-title" style="margin-bottom:0">📢 お知らせ</div>
        <button class="announce-add-btn" onclick="openAddAnnouncement()">＋ 追加</button>
      </div>
      ${announceItems}
    </div>`;
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
  if (!confirm('このお知らせを削除しますか？')) return;
  state.announcements = state.announcements.filter(a => a.id !== id);
  saveState();
  renderHome();
  showToast('お知らせを削除しました');
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

    return `
      <div class="task-card" data-task-id="${task.id}"
           style="border-left-color:${st.border || '#E5E7EB'}"
           onclick="openEditTask('${task.id}')">
        <div class="task-card-top">
          <div class="task-title">${esc(task.title)}</div>
          <div class="task-card-actions">
            ${statusBadge(task.status)}
            <button class="video-action-btn video-delete-btn"
              onclick="quickDeleteTask('${task.id}');event.stopPropagation()" title="削除">🗑️</button>
          </div>
        </div>
        ${task.notes ? `<div class="task-notes-preview">${esc(task.notes)}</div>` : ''}
        ${next
          ? `<div class="task-card-footer" onclick="event.stopPropagation()">
               <button class="advance-btn" onclick="advanceTask('${task.id}');event.stopPropagation()">→ ${esc(next)}</button>
             </div>`
          : `<div class="task-card-footer" onclick="event.stopPropagation()">
               <span class="done-chip">✓ 完了</span>
             </div>`}
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
  state.statusFilter = next;
  renderStatus();
  if (state.activeTab === 'home') renderHome();
  showToast(`→ ${next} に進みました`);
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

function changeTaskStatus(id, newStatus) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  task.status    = newStatus;
  task.updatedAt = new Date().toISOString();
  state.statusFilter = newStatus;
  saveState();
  renderStatus();
  if (state.activeTab === 'home') renderHome();
  showToast(`→ ${newStatus} に移動しました`);
}

// =============================================
// VIDEO PAGE
// =============================================

function reelCard(m) {
  return `
    <div class="card reel-month-card">
      <div class="reel-month-header">
        <span class="reel-month-name">${esc(m.productionMonth)}リール</span>
        ${m.postMonth ? `<span class="reel-post-hint">投稿: ${esc(m.postMonth)}</span>` : ''}
      </div>
      ${m.videos.map((v, i) => `
        <div class="reel-video-row" onclick="openEditVideoModal('${m.id}','${v.id}')" style="cursor:pointer">
          <span class="reel-num reel-num--${i + 1}">${CIRCLED[i] || (i + 1)}</span>
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

  const pinned   = state.notes.filter(n => n.pinned);
  const unpinned = state.notes.filter(n => !n.pinned);

  const noteHTML = (note) => `
    <div class="note-item${note.pinned ? ' is-pinned' : ''}" data-note-id="${note.id}" draggable="true">
      <div class="note-drag-handle">⠿</div>
      <div class="note-body" onclick="openEditNote('${note.id}')">
        <div class="note-content">${esc(note.content)}</div>
      </div>
      <button class="note-pin-btn"
        onclick="toggleNotePin('${note.id}');event.stopPropagation()"
        title="${note.pinned ? 'ピン解除' : 'ピン留め'}">${note.pinned ? '📌' : '📍'}</button>
    </div>`;

  let html = '';
  if (pinned.length) {
    html += `<div class="notes-section-label">📌 ピン留め</div>`;
    html += pinned.map(noteHTML).join('');
    if (unpinned.length) html += `<div class="notes-section-label" style="margin-top:8px">メモ</div>`;
  }
  html += `<div id="notes-drag-list">${unpinned.map(noteHTML).join('')}</div>`;

  el.innerHTML = html;
  setupNoteDrag();
}

function setupNoteDrag() {
  const list = document.getElementById('notes-drag-list');
  if (!list) return;

  let dragSrc = null;

  list.querySelectorAll('.note-item').forEach(item => {
    item.addEventListener('dragstart', e => {
      dragSrc = item;
      item.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('is-dragging');
      list.querySelectorAll('.note-item').forEach(i => i.classList.remove('drag-over'));
    });
    item.addEventListener('dragover', e => {
      e.preventDefault();
      if (item !== dragSrc) {
        list.querySelectorAll('.note-item').forEach(i => i.classList.remove('drag-over'));
        item.classList.add('drag-over');
      }
    });
    item.addEventListener('drop', e => {
      e.preventDefault();
      if (!dragSrc || dragSrc === item) return;
      reorderNotes(dragSrc.dataset.noteId, item.dataset.noteId);
    });
  });

  // Touch drag (long press)
  let longTimer = null, touchDragItem = null, touchClone = null, touchOffsetY = 0;

  list.querySelectorAll('.note-item').forEach(item => {
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
      list.querySelectorAll('.note-item').forEach(i => i.classList.remove('drag-over'));
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
  });
}

function reorderNotes(srcId, tgtId) {
  const unpinned = state.notes.filter(n => !n.pinned);
  const si = unpinned.findIndex(n => n.id === srcId);
  const ti = unpinned.findIndex(n => n.id === tgtId);
  if (si === -1 || ti === -1) return;
  const [moved] = unpinned.splice(si, 1);
  unpinned.splice(ti, 0, moved);
  state.notes = [...state.notes.filter(n => n.pinned), ...unpinned];
  saveState();
  renderNotes();
}

function toggleNotePin(id) {
  const note = state.notes.find(n => n.id === id);
  if (!note) return;
  note.pinned = !note.pinned;
  saveState();
  renderNotes();
}

function openAddNote() {
  state.editingNoteId = null;
  document.getElementById('note-modal-title').textContent = 'ノート追加';
  document.getElementById('note-id').value      = '';
  document.getElementById('note-content').value = '';
  document.getElementById('note-pinned').checked = false;
  document.getElementById('delete-note-btn').classList.add('is-hidden');
  document.getElementById('note-modal').classList.remove('is-hidden');
  setTimeout(() => document.getElementById('note-content').focus(), 100);
}

function openEditNote(id) {
  const note = state.notes.find(n => n.id === id);
  if (!note) return;
  state.editingNoteId = id;
  document.getElementById('note-modal-title').textContent = 'ノート編集';
  document.getElementById('note-id').value       = id;
  document.getElementById('note-content').value  = note.content;
  document.getElementById('note-pinned').checked = note.pinned;
  document.getElementById('delete-note-btn').classList.remove('is-hidden');
  document.getElementById('note-modal').classList.remove('is-hidden');
}

function closeNoteModal() {
  document.getElementById('note-modal').classList.add('is-hidden');
  state.editingNoteId = null;
}

function onSaveNote(e) {
  e.preventDefault();
  const content = document.getElementById('note-content').value.trim();
  if (!content) return;
  const pinned = document.getElementById('note-pinned').checked;

  if (state.editingNoteId) {
    const note = state.notes.find(n => n.id === state.editingNoteId);
    if (note) { note.content = content; note.pinned = pinned; }
    showToast('ノートを更新しました');
  } else {
    state.notes.push({ id: uid(), content, pinned, createdAt: new Date().toISOString() });
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
  document.getElementById('task-id').value    = '';
  document.getElementById('task-title').value = '';
  document.getElementById('task-store').value = '';
  document.getElementById('task-notes').value = '';
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
  const labels = { monthly: '月リール追加', ec: 'ECリール追加', personal: '個人リール追加' };
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
  document.getElementById('reel-label-1').innerHTML = 'リール① タイトル <span class="required">*</span>';

  document.getElementById('reel-month-section').classList.remove('is-hidden');
  document.getElementById('delete-reel-btn').classList.add('is-hidden');
  document.getElementById('reel-submit-btn').textContent = '追加';

  const isMonthly  = type === 'monthly';
  const isEc       = type === 'ec';
  const isPersonal = type === 'personal';

  document.getElementById('reel-video2-section').classList.toggle('is-hidden', !isMonthly);
  document.getElementById('reel-task-gen-section').classList.toggle('is-hidden', !isMonthly);
  document.getElementById('reel-post-month-group').classList.toggle('is-hidden', !isMonthly);
  document.getElementById('reel-ec-note').classList.toggle('is-hidden', !isEc);
  document.getElementById('reel-personal-store-section').classList.toggle('is-hidden', !isPersonal);

  if (isPersonal) {
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

function generateTasksForVideo(videoTitle, circledNum, prodMonth, postMonth) {
  STORES.forEach(store => {
    state.tasks.unshift({
      id:        uid(),
      title:     `${store}${circledNum}${videoTitle}`,
      store:     store,
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

    const videos = [{ id: uid(), title: title1, note: note1 }];
    if (title2) videos.push({ id: uid(), title: title2, note: note2 });

    state.reels.push({
      id: uid(), year: new Date().getFullYear(), type,
      productionMonth: prodMonth, postMonth, videos,
    });

    if (type === 'monthly') {
      if (genTasks) {
        videos.forEach((v, i) => {
          generateTasksForVideo(v.title, CIRCLED[i] || `${i + 1}`, prodMonth, postMonth);
        });
        showToast(`追加しました（${videos.length * STORES.length}件のタスクを生成）`);
      } else {
        showToast('リールを追加しました');
      }
    } else if (type === 'ec') {
      state.tasks.unshift({
        id: uid(), title: `EC①${title1}`, store: 'EC店',
        platforms: [], status: '撮影中',
        notes: `制作: ${prodMonth}`,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      });
      showToast('ECリールを追加しました（EC店のタスク1件を生成）');
    } else if (type === 'personal') {
      const selectedStores = [...document.querySelectorAll('input[name="personal-store"]:checked')].map(cb => cb.value);
      selectedStores.forEach(store => {
        state.tasks.unshift({
          id: uid(), title: `${store}①${title1}`, store,
          platforms: [], status: '撮影中',
          notes: `制作: ${prodMonth}`,
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        });
      });
      const count = selectedStores.length;
      showToast(count ? `個人リールを追加しました（${count}件のタスクを生成）` : '個人リールを追加しました');
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

function init() {
  loadState();
  saveState(); // persist initial reels so IDs are stable across reloads
  initTaskFormElements();
  setupEvents();
  navigate('home');
}

document.addEventListener('DOMContentLoaded', init);
