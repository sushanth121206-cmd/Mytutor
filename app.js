/* ============================================================
   MY TUTOR — app.js
   Handles: login validation, navigation, all dashboard pages
   ============================================================ */

'use strict';

// ===== DEMO CREDENTIALS =====
const CREDS = {
  faculty: { phone: '9876543210', email: 'faculty@mytutor.com', pass: 'faculty123' },
  parent:  { phone: '9876543210', email: 'parent@mytutor.com',  pass: 'parent123'  },
};

// ===== DATA =====
const students = [
  { id:'TMS001', name:'Aarav Sharma',  class:'Grade 9-A',  parent:'Rajesh Sharma', phone:'9876543210', status:'Active',  joined:'2024-06-12' },
  { id:'TMS002', name:'Priya Patel',   class:'Grade 8-B',  parent:'Meena Patel',   phone:'8765432109', status:'Active',  joined:'2024-07-01' },
  { id:'TMS003', name:'Rohan Verma',   class:'Grade 10-A', parent:'Suresh Verma',  phone:'7654321098', status:'Pending', joined:'2025-01-15' },
  { id:'TMS004', name:'Sneha Reddy',   class:'Grade 7-C',  parent:'Anita Reddy',   phone:'6543210987', status:'Active',  joined:'2024-08-20' },
  { id:'TMS005', name:'Arjun Nair',    class:'Grade 11-A', parent:'Krishnan Nair', phone:'9543210987', status:'Active',  joined:'2024-06-05' },
  { id:'TMS006', name:'Divya Singh',   class:'Grade 6-A',  parent:'Manoj Singh',   phone:'8432109876', status:'Waitlisted', joined:'2025-02-10' },
];

const exams = [
  { subject:'Mathematics',   class:'Grade 9-A',  date:'2026-03-22', room:'Room 201', status:'Scheduled', duration:90,  marks:100, color:'#1e8fc4' },
  { subject:'Science',       class:'Grade 8-B',  date:'2026-03-24', room:'Room 105', status:'Scheduled', duration:90,  marks:100, color:'#2ea8a0' },
  { subject:'English',       class:'Grade 10-A', date:'2026-03-25', room:'Room 302', status:'Scheduled', duration:60,  marks:80,  color:'#7a9e5b' },
  { subject:'Social Studies',class:'Grade 7-C',  date:'2026-03-27', room:'Room 203', status:'Upcoming',  duration:60,  marks:80,  color:'#e07b39' },
  { subject:'Computer Sci.', class:'Grade 11-A', date:'2026-03-28', room:'Lab 1',    status:'Upcoming',  duration:120, marks:100, color:'#7050a8' },
];

const results = [
  { student:'Aarav Sharma', subject:'Mathematics', score:'87/100', grade:'A',  remarks:'Excellent work' },
  { student:'Priya Patel',  subject:'Science',      score:'92/100', grade:'A+', remarks:'Outstanding' },
  { student:'Rohan Verma',  subject:'English',      score:'74/80',  grade:'A',  remarks:'Good effort' },
  { student:'Sneha Reddy',  subject:'Mathematics',  score:'65/100', grade:'B',  remarks:'Needs improvement' },
  { student:'Arjun Nair',   subject:'Science',      score:'95/100', grade:'A+', remarks:'Exceptional' },
  { student:'Kiran Rao',    subject:'Soc. Studies', score:'71/80',  grade:'A',  remarks:'Very good' },
];

const invoices = [
  { id:'INV-2026-001', student:'Aarav Sharma', amount:'₹8,500', due:'2026-03-31', status:'Paid' },
  { id:'INV-2026-002', student:'Priya Patel',  amount:'₹7,200', due:'2026-03-31', status:'Paid' },
  { id:'INV-2026-003', student:'Rohan Verma',  amount:'₹9,100', due:'2026-03-31', status:'Pending' },
  { id:'INV-2026-004', student:'Sneha Reddy',  amount:'₹6,800', due:'2026-03-31', status:'Paid' },
  { id:'INV-2026-005', student:'Arjun Nair',   amount:'₹10,200',due:'2026-03-31', status:'Overdue' },
  { id:'INV-2026-006', student:'Divya Singh',  amount:'₹5,500', due:'2026-03-31', status:'Pending' },
  { id:'INV-2026-007', student:'Kiran Rao',    amount:'₹8,500', due:'2026-03-31', status:'Paid' },
  { id:'INV-2026-008', student:'Meera Joshi',  amount:'₹7,200', due:'2026-03-31', status:'Paid' },
];

const classStu = {
  'Grade 6-A': ['Divya Singh','Anjali Desai','Rahul Mehta','Pooja Iyer','Vikram Nair','Sita Ram'],
  'Grade 7-B': ['Sneha Reddy','Nisha Gupta','Amit Verma','Lakshmi K','Ravi Teja','Preethi S'],
  'Grade 8-C': ['Priya Patel','Meera Joshi','Suresh D','Kavya Reddy','Harish K','Bhavana M'],
  'Grade 9-A': ['Aarav Sharma','Kiran Rao','Deepak N','Ananya P','Siddharth V','Keerthi S'],
};

const ttData = {
  days:  ['Monday','Tuesday','Wednesday','Thursday','Friday'],
  slots: ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM'],
  grid: [
    ['math','science','lang','free','math','science','lang'],
    ['science','math','free','lang','science','lang','math'],
    ['lang','free','math','science','lang','math','free'],
    ['free','lang','science','math','free','lang','science'],
    ['math','science','lang','free','math','free','lang'],
  ],
};
const subjLabel = { math:'Mathematics', science:'Science', lang:'English', free:'' };

let attState = {};
let attDate  = new Date();
let stuList  = [...students];

// ============================================================
// HELPERS
// ============================================================
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function toast(msg, color) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  if (color) t.style.borderLeftColor = color;
  t.classList.add('show');
  setTimeout(() => { t.classList.remove('show'); t.style.borderLeftColor = ''; }, 3200);
}

function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function badge(status) {
  const map = { Active:'badge-sky', Paid:'badge-green', Pending:'badge-amber', Overdue:'badge-red', Waitlisted:'badge-teal', Scheduled:'badge-sky', Upcoming:'badge-amber' };
  return `<span class="badge ${map[status]||'badge-sky'}">${status}</span>`;
}

function initials(name) { return name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase(); }

function setDate(elId) {
  const d = new Date();
  const el = document.getElementById(elId);
  if (el) el.textContent = d.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
}

// ============================================================
// VALIDATION HELPERS
// ============================================================
const isValidPhone = v => /^[6-9]\d{9}$/.test(v);
const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function setInputState(wrapId, hintId, ok, msg) {
  const wrap = document.querySelector(`#${wrapId} .input-wrap`) || document.getElementById(wrapId);
  const hint = document.getElementById(hintId);
  if (wrap) {
    wrap.classList.toggle('error',   !ok && msg !== '');
    wrap.classList.toggle('success', ok);
  }
  if (hint) {
    hint.textContent  = msg;
    hint.className    = 'input-hint ' + (ok ? 'ok' : (msg ? 'err' : ''));
  }
}

// ============================================================
// SCREEN TRANSITIONS
// ============================================================
document.getElementById('gotoFaculty').addEventListener('click', () => show('screen-faculty'));
document.getElementById('gotoParent').addEventListener('click',  () => show('screen-parent'));
document.getElementById('backFromFaculty').addEventListener('click', () => show('screen-role'));
document.getElementById('backFromParent').addEventListener('click',  () => show('screen-role'));

// ============================================================
// LIVE VALIDATION — FACULTY FORM
// ============================================================
const fPhone = document.getElementById('fPhone');
const fEmail = document.getElementById('fEmail');
const fPass  = document.getElementById('fPass');

fPhone.addEventListener('input', function() {
  this.value = this.value.replace(/\D/g,'').slice(0,10);
  if (!this.value) return setInputState('fPhoneGroup','fPhoneHint', false,'');
  setInputState('fPhoneGroup','fPhoneHint',
    isValidPhone(this.value),
    isValidPhone(this.value) ? '✓ Valid phone number' : this.value.length < 10 ? `${10-this.value.length} more digit(s) needed` : 'Phone must start with 6–9 and be 10 digits');
});

fEmail.addEventListener('input', function() {
  if (!this.value) return setInputState('fEmailGroup','fEmailHint', false,'');
  setInputState('fEmailGroup','fEmailHint',
    isValidEmail(this.value),
    isValidEmail(this.value) ? '✓ Valid email address' : 'Enter a valid email like name@domain.com');
});

fPass.addEventListener('input', function() {
  if (!this.value) return setInputState('fPassGroup','fPassHint', false,'');
  setInputState('fPassGroup','fPassHint',
    this.value.length >= 6,
    this.value.length >= 6 ? '✓ Password looks good' : `${6-this.value.length} more character(s) needed`);
});

document.getElementById('fEye').addEventListener('click', function() {
  fPass.type = fPass.type === 'password' ? 'text' : 'password';
  this.textContent = fPass.type === 'password' ? '👁' : '🔒';
});

// ============================================================
// LIVE VALIDATION — PARENT FORM
// ============================================================
const pPhone = document.getElementById('pPhone');
const pEmail = document.getElementById('pEmail');
const pPass  = document.getElementById('pPass');

pPhone.addEventListener('input', function() {
  this.value = this.value.replace(/\D/g,'').slice(0,10);
  if (!this.value) return setInputState('pPhoneGroup','pPhoneHint', false,'');
  setInputState('pPhoneGroup','pPhoneHint',
    isValidPhone(this.value),
    isValidPhone(this.value) ? '✓ Valid phone number' : this.value.length < 10 ? `${10-this.value.length} more digit(s) needed` : 'Must start with 6–9 and be 10 digits');
});

pEmail.addEventListener('input', function() {
  if (!this.value) return setInputState('pEmailGroup','pEmailHint', false,'');
  setInputState('pEmailGroup','pEmailHint',
    isValidEmail(this.value),
    isValidEmail(this.value) ? '✓ Valid email address' : 'Enter a valid email like name@domain.com');
});

pPass.addEventListener('input', function() {
  if (!this.value) return setInputState('pPassGroup','pPassHint', false,'');
  setInputState('pPassGroup','pPassHint',
    this.value.length >= 6,
    this.value.length >= 6 ? '✓ Password looks good' : `${6-this.value.length} more character(s) needed`);
});

document.getElementById('pEye').addEventListener('click', function() {
  pPass.type = pPass.type === 'password' ? 'text' : 'password';
  this.textContent = pPass.type === 'password' ? '👁' : '🔒';
});

// ============================================================
// LOGIN SUBMIT — FACULTY
// ============================================================
document.getElementById('fLoginBtn').addEventListener('click', function() {
  const phone = fPhone.value.trim();
  const email = fEmail.value.trim();
  const pass  = fPass.value;
  const errEl = document.getElementById('fError');
  errEl.textContent = '';

  let ok = true;
  if (!isValidPhone(phone)) { setInputState('fPhoneGroup','fPhoneHint', false, 'Please enter a valid 10-digit phone number'); ok=false; }
  if (!isValidEmail(email)) { setInputState('fEmailGroup','fEmailHint', false, 'Please enter a valid email address'); ok=false; }
  if (pass.length < 6)      { setInputState('fPassGroup','fPassHint',   false, 'Password must be at least 6 characters'); ok=false; }
  if (!ok) return;

  if (phone !== CREDS.faculty.phone || email !== CREDS.faculty.email || pass !== CREDS.faculty.pass) {
    errEl.textContent = '❌ Incorrect credentials. Please check and try again.';
    return;
  }

  this.textContent = '✓ Signing in…';
  setTimeout(() => {
    this.innerHTML = '<span>Sign In as Faculty</span><span class="btn-arrow">→</span>';
    document.getElementById('suName').textContent = 'Faculty Admin';
    document.getElementById('suRole').textContent = 'Faculty';
    document.getElementById('suAvatar').textContent = 'FA';
    document.getElementById('userChip').textContent = 'FA';
    setDate('pageDate');
    setDate('pPageDate');
    initDashboard();
    show('screen-dashboard');
    toast('✓ Welcome back, Faculty Admin!');
  }, 700);
});

// ============================================================
// LOGIN SUBMIT — PARENT
// ============================================================
document.getElementById('pLoginBtn').addEventListener('click', function() {
  const phone = pPhone.value.trim();
  const email = pEmail.value.trim();
  const pass  = pPass.value;
  const errEl = document.getElementById('pError');
  errEl.textContent = '';

  let ok = true;
  if (!isValidPhone(phone)) { setInputState('pPhoneGroup','pPhoneHint', false, 'Please enter a valid 10-digit phone number'); ok=false; }
  if (!isValidEmail(email)) { setInputState('pEmailGroup','pEmailHint', false, 'Please enter a valid email address'); ok=false; }
  if (pass.length < 6)      { setInputState('pPassGroup','pPassHint',   false, 'Password must be at least 6 characters'); ok=false; }
  if (!ok) return;

  if (phone !== CREDS.parent.phone || email !== CREDS.parent.email || pass !== CREDS.parent.pass) {
    errEl.textContent = '❌ Incorrect credentials. Please check and try again.';
    return;
  }

  this.textContent = '✓ Signing in…';
  setTimeout(() => {
    this.innerHTML = '<span>Sign In as Parent</span><span class="btn-arrow">→</span>';
    setDate('pPageDate');
    initDashboard();
    show('screen-parent-dash');
    toast('✓ Welcome! Here\'s Aarav\'s dashboard.', '#2ea8a0');
  }, 700);
});

// ============================================================
// LOGOUT — with confirmation popup
// ============================================================
let logoutTarget = 'screen-role';

function showLogoutPopup(target) {
  logoutTarget = target;
  openModal('logoutModal');
}

document.getElementById('logoutBtn').addEventListener('click',  () => showLogoutPopup('screen-role'));
document.getElementById('pLogoutBtn').addEventListener('click', () => showLogoutPopup('screen-role'));
document.getElementById('closeLogout').addEventListener('click',  () => closeModal('logoutModal'));
document.getElementById('cancelLogout').addEventListener('click', () => closeModal('logoutModal'));
document.getElementById('confirmLogout').addEventListener('click', () => {
  closeModal('logoutModal');
  show(logoutTarget);
  toast('✓ You have been logged out successfully.');
});
document.getElementById('logoutModal').addEventListener('click', function(e){ if(e.target===this) closeModal('logoutModal'); });

// ============================================================
// FACULTY SIDEBAR NAVIGATION
// ============================================================
document.querySelectorAll('#screen-dashboard .nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const pg = item.dataset.page;
    document.querySelectorAll('#screen-dashboard .nav-item').forEach(n=>n.classList.remove('active'));
    item.classList.add('active');
    document.querySelectorAll('#screen-dashboard .page').forEach(p=>p.classList.remove('active'));
    document.getElementById('page-'+pg).classList.add('active');
    document.getElementById('pageHeading').textContent = item.querySelector('.nl').textContent;
    if (pg === 'attendance') renderAttendance();
    if (pg === 'schedule')   renderTimetable();
  });
});

// ============================================================
// PARENT SIDEBAR NAVIGATION — fixed
// ============================================================
const parentPageNames = { overview:'Overview', attendance:'Attendance', results:'Results', fees:'Fee Status', schedule:'Schedule' };

document.querySelectorAll('#screen-parent-dash .nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const pg = item.dataset.pdash;
    document.querySelectorAll('#screen-parent-dash .nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    document.querySelectorAll('#screen-parent-dash .page').forEach(p => p.classList.remove('active'));
    const pageEl = document.getElementById('pdash-' + pg);
    if (pageEl) pageEl.classList.add('active');
    const headingEl = document.getElementById('pPageHeading');
    if (headingEl) headingEl.textContent = parentPageNames[pg] || pg;
  });
});

// Sidebar collapse
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
});
document.getElementById('psidebarToggle').addEventListener('click', () => {
  document.getElementById('psidebar').classList.toggle('collapsed');
});

// ============================================================
// COUNTER ANIMATION
// ============================================================
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseInt(el.dataset.target);
    let cur = 0;
    const step = Math.ceil(target/50);
    const t = setInterval(() => {
      cur = Math.min(cur+step, target);
      el.textContent = cur.toLocaleString('en-IN');
      if (cur >= target) clearInterval(t);
    }, 28);
  });
}

// ============================================================
// ATTENDANCE CHART (Canvas)
// ============================================================
function drawAttChart() {
  const canvas = document.getElementById('attChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 500;
  const H = 160;
  canvas.width  = W * devicePixelRatio;
  canvas.height = H * devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);

  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const present = [91,88,95,90,86,77,82];
  const absent  = [9, 12, 5, 10,14,23,18];
  const padL=36, padR=16, padT=10, padB=28;
  const cW = W-padL-padR, cH = H-padT-padB;
  const bW = cW/days.length, bi = bW*0.35;

  ctx.clearRect(0,0,W,H);

  [0,25,50,75,100].forEach(v => {
    const y = padT + cH - (v/100)*cH;
    ctx.strokeStyle='rgba(78,184,232,0.12)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(padL+cW,y); ctx.stroke();
    ctx.fillStyle='rgba(13,59,94,0.35)'; ctx.font=`10px Fira Mono, monospace`;
    ctx.textAlign='right'; ctx.fillText(v+'%', padL-5, y+3);
  });

  days.forEach((day,i) => {
    const x = padL + i*bW + bW/2;

    const pH = (present[i]/100)*cH;
    const g1 = ctx.createLinearGradient(0, padT+cH-pH, 0, padT+cH);
    g1.addColorStop(0,'rgba(30,143,196,0.85)'); g1.addColorStop(1,'rgba(30,143,196,0.3)');
    ctx.fillStyle = g1;
    ctx.beginPath();
    ctx.roundRect(x-bi-2, padT+cH-pH, bi, pH, [5,5,0,0]);
    ctx.fill();

    const aH = (absent[i]/100)*cH;
    const g2 = ctx.createLinearGradient(0, padT+cH-aH, 0, padT+cH);
    g2.addColorStop(0,'rgba(224,123,57,0.85)'); g2.addColorStop(1,'rgba(224,123,57,0.3)');
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.roundRect(x+2, padT+cH-aH, bi, aH, [5,5,0,0]);
    ctx.fill();

    ctx.fillStyle='rgba(13,59,94,0.5)'; ctx.font=`10px Nunito, sans-serif`; ctx.textAlign='center';
    ctx.fillText(day, x, padT+cH+16);
  });
}

// ============================================================
// FEE DONUT CHART (Canvas)
// ============================================================
function drawFeeDonut() {
  const canvas = document.getElementById('feeChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const S = 130;
  canvas.width = S*devicePixelRatio; canvas.height = S*devicePixelRatio;
  ctx.scale(devicePixelRatio, devicePixelRatio);

  const data = [
    { label:'Collected', pct:87, color:'#1e8fc4' },
    { label:'Pending',   pct:9,  color:'#e07b39' },
    { label:'Overdue',   pct:4,  color:'#e05c5c' },
  ];
  const cx=S/2, cy=S/2, R=50, inn=32;
  let ang = -Math.PI/2;

  data.forEach(d => {
    const arc = (d.pct/100)*2*Math.PI;
    ctx.beginPath();
    ctx.arc(cx,cy,R,ang,ang+arc);
    ctx.arc(cx,cy,inn,ang+arc,ang,true);
    ctx.closePath();
    ctx.fillStyle = d.color;
    ctx.fill();
    ang += arc;
  });

  ctx.fillStyle='#0d3b5e'; ctx.font=`bold 14px Playfair Display, serif`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.fillText('87%', cx, cy);

  const leg = document.getElementById('donutLegend');
  leg.innerHTML = data.map(d=>`
    <div class="dl-item">
      <span class="dl-dot" style="background:${d.color}"></span>
      <span class="dl-lbl">${d.label}</span>
      <span class="dl-pct">${d.pct}%</span>
    </div>
  `).join('');
}

// ============================================================
// RECENT ENROLLMENTS
// ============================================================
function renderRecentEnroll() {
  const el = document.getElementById('recentEnroll');
  el.innerHTML = students.slice(0,6).map(s=>`
    <li class="enr-item">
      <div class="enr-av">${initials(s.name)}</div>
      <div>
        <div class="enr-name">${s.name}</div>
        <div class="enr-class">${s.class}</div>
      </div>
      ${badge(s.status)}
      <span class="enr-time">${s.joined}</span>
    </li>
  `).join('');
}

// ============================================================
// DASHBOARD EXAM TABLE
// ============================================================
function renderDashExams() {
  const tbody = document.querySelector('#dashExamTable tbody');
  tbody.innerHTML = exams.slice(0,5).map(e=>`
    <tr>
      <td><span style="color:${e.color};font-weight:700">${e.subject}</span></td>
      <td>${e.class}</td>
      <td style="font-family:var(--font-m);font-size:0.78rem">${e.date}</td>
      <td>${e.room}</td>
      <td>${badge(e.status)}</td>
    </tr>
  `).join('');
}

// ============================================================
// ENROLLMENT TABLE
// ============================================================
function renderEnrollTable(data) {
  const tbody = document.getElementById('enrollBody');
  tbody.innerHTML = data.map(s=>`
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:0.6rem">
          <div class="enr-av">${initials(s.name)}</div>
          <div><div class="enr-name">${s.name}</div><div style="font-family:var(--font-m);font-size:0.7rem;color:var(--text-dim)">${s.id}</div></div>
        </div>
      </td>
      <td>${s.class}</td>
      <td>${s.parent}</td>
      <td style="font-family:var(--font-m);font-size:0.78rem">${s.phone}</td>
      <td style="font-family:var(--font-m);font-size:0.78rem">${s.joined}</td>
      <td>${badge(s.status)}</td>
      <td><button class="btn-sm">View</button></td>
    </tr>
  `).join('');
}

// ============================================================
// EXAM GRID
// ============================================================
function renderExamGrid() {
  const el = document.getElementById('examGrid');
  el.innerHTML = exams.map(e=>`
    <div class="exam-card" style="--ec:${e.color}">
      <div class="exam-subj">${e.subject}</div>
      <div class="exam-meta">
        <span class="em-tag">📚 ${e.class}</span>
        <span class="em-tag">🏫 ${e.room}</span>
        <span class="em-tag">⏱ ${e.duration} min</span>
        <span class="em-tag">✦ ${e.marks} marks</span>
      </div>
      <div class="exam-foot">
        <span style="font-family:var(--font-m);font-size:0.75rem;color:var(--text-muted)">${e.date}</span>
        ${badge(e.status)}
      </div>
    </div>
  `).join('');
}

// ============================================================
// RESULTS TABLE
// ============================================================
function renderResults() {
  const tbody = document.getElementById('resultsBody');
  tbody.innerHTML = results.map(r=>`
    <tr>
      <td>${r.student}</td>
      <td>${r.subject}</td>
      <td style="font-family:var(--font-m);font-weight:700">${r.score}</td>
      <td>${badge(r.grade.includes('+') ? 'Paid' : r.grade === 'B' ? 'Pending' : 'Active')}<span style="margin-left:4px;font-weight:700;color:var(--navy)">${r.grade}</span></td>
      <td style="color:var(--text-muted)">${r.remarks}</td>
    </tr>
  `).join('');
}

// ============================================================
// FINANCE TABLE
// ============================================================
function renderFinTable() {
  const tbody = document.getElementById('finBody');
  tbody.innerHTML = invoices.map(inv=>`
    <tr>
      <td style="font-family:var(--font-m);font-size:0.78rem">${inv.id}</td>
      <td>${inv.student}</td>
      <td style="font-weight:700;color:var(--navy)">${inv.amount}</td>
      <td style="font-family:var(--font-m);font-size:0.78rem">${inv.due}</td>
      <td>${badge(inv.status)}</td>
      <td style="display:flex;gap:4px">
        <button class="btn-sm">View</button>
        ${inv.status !== 'Paid' ? `<button class="btn-sm" style="color:var(--green-acc);border-color:var(--green-acc)" onclick="markPaid(this,'${inv.id}')">Mark Paid</button>` : ''}
      </td>
    </tr>
  `).join('');
}
window.markPaid = function(btn, id) {
  const inv = invoices.find(i=>i.id===id);
  if (inv) { inv.status='Paid'; renderFinTable(); toast('✓ Payment marked as paid!'); }
};

// ============================================================
// ATTENDANCE
// ============================================================
function fmtDate(d) {
  return d.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
}

function renderAttendance() {
  document.getElementById('attDate').textContent = fmtDate(attDate);
  const cls = document.getElementById('classSelect').value;
  const list = classStu[cls] || [];
  if (!attState[cls]) attState[cls]={};
  list.forEach(s => { if (!attState[cls][s]) attState[cls][s]='present'; });

  document.getElementById('attGrid').innerHTML = list.map((s,i)=>{
    const st = attState[cls][s];
    return `
      <div class="att-card ${st}">
        <div>
          <div class="att-name">${s}</div>
          <div class="att-id">TMS${String(i+1).padStart(3,'0')}</div>
        </div>
        <div class="att-controls-wrap">
          <button class="att-btn ${st==='present'?'ap':''}" onclick="setAtt('${cls}','${s}','present')">P</button>
          <button class="att-btn ${st==='absent'?'aa':''}"  onclick="setAtt('${cls}','${s}','absent')">A</button>
          <button class="att-btn ${st==='late'?'al':''}"    onclick="setAtt('${cls}','${s}','late')">L</button>
        </div>
      </div>`;
  }).join('');

  const counts = {present:0,absent:0,late:0};
  list.forEach(s => counts[attState[cls][s]]++);
  document.getElementById('attSummary').innerHTML = `
    <div class="att-sum"><span class="att-dot" style="background:#7acd7a"></span>
      <span class="att-count" style="color:#2e7d2e">${counts.present}</span>
      <span style="color:var(--text-muted);margin-left:4px">Present</span></div>
    <div class="att-sum"><span class="att-dot" style="background:#e07070"></span>
      <span class="att-count" style="color:#b02020">${counts.absent}</span>
      <span style="color:var(--text-muted);margin-left:4px">Absent</span></div>
    <div class="att-sum"><span class="att-dot" style="background:var(--amber)"></span>
      <span class="att-count" style="color:var(--amber)">${counts.late}</span>
      <span style="color:var(--text-muted);margin-left:4px">Late</span></div>
    <div style="margin-left:auto;font-size:0.78rem;color:var(--text-muted);font-weight:600">Total: ${list.length} students</div>
  `;
}

window.setAtt = function(cls, student, status) {
  attState[cls][student] = status;
  renderAttendance();
};

document.getElementById('prevDay').addEventListener('click', ()=>{ attDate.setDate(attDate.getDate()-1); renderAttendance(); });
document.getElementById('nextDay').addEventListener('click', ()=>{ attDate.setDate(attDate.getDate()+1); renderAttendance(); });
document.getElementById('classSelect').addEventListener('change', renderAttendance);
document.getElementById('saveAtt').addEventListener('click', ()=>toast('✓ Attendance saved successfully!'));

// ============================================================
// TIMETABLE
// ============================================================
function renderTimetable() {
  const el = document.getElementById('ttWrap');
  let html = '<div class="ttg">';
  html += '<div class="ttc tth">Time</div>';
  ttData.days.forEach(d => { html+=`<div class="ttc tth">${d}</div>`; });
  ttData.slots.forEach((slot,si)=>{
    html+=`<div class="ttc ttt">${slot}</div>`;
    ttData.days.forEach((_,di)=>{
      const c = ttData.grid[di][si];
      const name = subjLabel[c];
      html+=`<div class="ttc">${name ? `<span class="tt-pill tt-${c}">${name}</span>` : `<span class="tt-free">—</span>`}</div>`;
    });
  });
  html += '</div>';
  el.innerHTML = html;
}

// ============================================================
// STUDENTS GRID
// ============================================================
function renderStudents(data) {
  document.getElementById('studentGrid').innerHTML = data.map(s=>`
    <div class="sc">
      <div class="sc-av">${initials(s.name)}</div>
      <div class="sc-name">${s.name}</div>
      <div class="sc-id">${s.id}</div>
      <div class="sc-class">${s.class}</div>
      ${badge(s.status)}
    </div>
  `).join('');
}

document.getElementById('studentSearch').addEventListener('input', function() {
  const q = this.value.toLowerCase();
  renderStudents(stuList.filter(s=>s.name.toLowerCase().includes(q)||s.id.toLowerCase().includes(q)||s.class.toLowerCase().includes(q)));
});

// ============================================================
// MODALS — ENROLLMENT
// ============================================================
document.getElementById('openEnrollModal').addEventListener('click', ()=>openModal('enrollModal'));
document.getElementById('closeEnroll').addEventListener('click', ()=>closeModal('enrollModal'));
document.getElementById('cancelEnroll').addEventListener('click', ()=>closeModal('enrollModal'));
document.getElementById('enrollModal').addEventListener('click', function(e){ if(e.target===this) closeModal('enrollModal'); });

const ePhoneI = document.getElementById('ePhoneI');
const eEmailI = document.getElementById('eEmailI');

ePhoneI.addEventListener('input', function(){
  this.value = this.value.replace(/\D/g,'').slice(0,10);
  const h = document.getElementById('ePhoneHint');
  if (!this.value) { h.textContent=''; return; }
  h.className = 'field-hint ' + (isValidPhone(this.value)?'ok':'e');
  h.textContent = isValidPhone(this.value) ? '✓ Valid 10-digit number' : this.value.length<10?`${10-this.value.length} more digit(s) needed`:'Must start with 6–9';
});

eEmailI.addEventListener('input', function(){
  const h = document.getElementById('eEmailHint');
  if (!this.value) { h.textContent=''; return; }
  h.className = 'field-hint ' + (isValidEmail(this.value)?'ok':'e');
  h.textContent = isValidEmail(this.value) ? '✓ Valid email address' : 'Enter a valid email like name@domain.com';
});

document.getElementById('submitEnroll').addEventListener('click', ()=>{
  const name   = document.getElementById('eNameI').value.trim();
  const cls    = document.getElementById('eClassI').value;
  const sect   = document.getElementById('eSectionI').value;
  const parent = document.getElementById('eParentI').value.trim();
  const phone  = ePhoneI.value.trim();
  const email  = eEmailI.value.trim();

  if (!name || !parent) { toast('⚠ Please fill in all required fields.'); return; }
  if (!isValidPhone(phone)) { toast('⚠ Phone must be exactly 10 digits starting with 6–9.'); return; }
  if (!isValidEmail(email)) { toast('⚠ Please enter a valid email address.'); return; }

  const newId = 'TMS' + String(students.length+1).padStart(3,'0');
  const s = { id:newId, name, class:`${cls}-${sect}`, parent, phone, status:'Pending', joined:new Date().toISOString().split('T')[0] };
  students.unshift(s);
  stuList = [...students];
  renderEnrollTable(students);
  renderRecentEnroll();
  renderStudents(stuList);
  closeModal('enrollModal');
  ['eNameI','eParentI','eEmailI','eMedI'].forEach(id=>{ document.getElementById(id).value=''; });
  ePhoneI.value='';
  toast(`✓ ${name} enrolled successfully as ${newId}!`);
});

// ============================================================
// MODALS — EXAM
// ============================================================
document.getElementById('openExamModal').addEventListener('click', ()=>openModal('examModal'));
document.getElementById('closeExam').addEventListener('click', ()=>closeModal('examModal'));
document.getElementById('cancelExam').addEventListener('click', ()=>closeModal('examModal'));
document.getElementById('examModal').addEventListener('click', function(e){ if(e.target===this) closeModal('examModal'); });

document.getElementById('submitExam').addEventListener('click', ()=>{
  const subj  = document.getElementById('exSubI').value.trim();
  const cls   = document.getElementById('exClassI').value;
  const date  = document.getElementById('exDateI').value;
  const room  = document.getElementById('exRoomI').value.trim();
  const dur   = document.getElementById('exDurI').value;
  const marks = document.getElementById('exMarksI').value;

  if (!subj||!date||!room) { toast('⚠ Please fill in all required fields.'); return; }

  const colors=['#1e8fc4','#2ea8a0','#7a9e5b','#e07b39','#7050a8'];
  exams.unshift({ subject:subj, class:cls, date, room, status:'Scheduled', duration:parseInt(dur), marks:parseInt(marks), color:colors[exams.length%colors.length] });
  renderExamGrid();
  renderDashExams();
  closeModal('examModal');
  ['exSubI','exRoomI'].forEach(id=>{ document.getElementById(id).value=''; });
  toast(`✓ ${subj} exam scheduled for ${date}!`);
});

// Invoice button
document.getElementById('genInvoice').addEventListener('click', ()=>toast('✓ Invoice generated and emailed to parent!'));

// Global search
document.getElementById('globalSearch').addEventListener('input', function(){
  const q=this.value.toLowerCase();
  if (q.length<2) return;
  const f=stuList.filter(s=>s.name.toLowerCase().includes(q));
  if (f.length) toast(`🔍 Found ${f.length} student(s) matching "${this.value}"`);
});

// Notifications
document.getElementById('notifBtn').addEventListener('click', ()=>toast('📬 3 fee reminders sent · 2 absence alerts dispatched'));

// ============================================================
// INIT
// ============================================================
function initDashboard() {
  animateCounters();
  renderRecentEnroll();
  renderDashExams();
  renderEnrollTable(students);
  renderExamGrid();
  renderResults();
  renderFinTable();
  renderAttendance();
  renderTimetable();
  renderStudents(stuList);
  setTimeout(()=>{ drawAttChart(); drawFeeDonut(); }, 120);
}

window.addEventListener('resize', ()=>{
  if (document.getElementById('screen-dashboard').classList.contains('active')) {
    drawAttChart(); drawFeeDonut();
  }
});
