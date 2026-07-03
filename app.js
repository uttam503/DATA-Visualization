/* ==============================================
   Acadex — Full Application Logic
   ============================================== */

const SUBJECTS = ['Mathematics', 'Science', 'English', 'History', 'Computer Science'];
const SUB_SHORT = ['Math', 'Sci', 'Eng', 'His', 'CS'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const PASS = 35;
const C = { emerald: '#10b981', amber: '#f59e0b', cyan: '#06b6d4', orange: '#f97316', violet: '#a78bfa', rose: '#f43f5e' };

let S = []; // students array
let charts = {};
let currentPage = 'overview';

/* ============ EMBEDDED DATA ============ */
const DATA = [
    { name: "Arjun Mehta", roll: "2024-001", subjects: { Mathematics: 88, Science: 92, English: 76, History: 81, "Computer Science": 95 }, monthlyPerformance: [72, 75, 78, 80, 82, 85, 83, 86, 88, 90, 87, 89] },
    { name: "Priya Sharma", roll: "2024-002", subjects: { Mathematics: 95, Science: 89, English: 91, History: 78, "Computer Science": 90 }, monthlyPerformance: [80, 82, 84, 86, 85, 88, 90, 89, 91, 92, 93, 94] },
    { name: "Rahul Verma", roll: "2024-003", subjects: { Mathematics: 62, Science: 58, English: 71, History: 65, "Computer Science": 70 }, monthlyPerformance: [55, 58, 60, 59, 62, 64, 63, 66, 65, 67, 68, 65] },
    { name: "Sneha Kulkarni", roll: "2024-004", subjects: { Mathematics: 91, Science: 94, English: 88, History: 85, "Computer Science": 97 }, monthlyPerformance: [82, 84, 86, 88, 90, 89, 91, 93, 92, 94, 95, 93] },
    { name: "Vikram Singh", roll: "2024-005", subjects: { Mathematics: 45, Science: 38, English: 52, History: 48, "Computer Science": 55 }, monthlyPerformance: [38, 40, 42, 41, 44, 45, 43, 47, 46, 48, 50, 48] },
    { name: "Ananya Reddy", roll: "2024-006", subjects: { Mathematics: 78, Science: 82, English: 90, History: 88, "Computer Science": 76 }, monthlyPerformance: [70, 72, 74, 76, 78, 80, 79, 82, 83, 84, 82, 83] },
    { name: "Karthik Nair", roll: "2024-007", subjects: { Mathematics: 83, Science: 79, English: 65, History: 72, "Computer Science": 88 }, monthlyPerformance: [68, 70, 72, 74, 75, 77, 78, 80, 79, 81, 82, 81] },
    { name: "Meera Joshi", roll: "2024-008", subjects: { Mathematics: 32, Science: 28, English: 45, History: 40, "Computer Science": 35 }, monthlyPerformance: [25, 28, 30, 29, 32, 33, 31, 34, 33, 35, 36, 34] },
    { name: "Aditya Gupta", roll: "2024-009", subjects: { Mathematics: 74, Science: 71, English: 68, History: 75, "Computer Science": 80 }, monthlyPerformance: [60, 62, 64, 66, 68, 70, 69, 72, 73, 74, 73, 74] },
    { name: "Ishita Patel", roll: "2024-010", subjects: { Mathematics: 96, Science: 98, English: 93, History: 90, "Computer Science": 99 }, monthlyPerformance: [88, 90, 91, 93, 94, 95, 94, 96, 97, 98, 97, 97] },
    { name: "Rohan Das", roll: "2024-011", subjects: { Mathematics: 55, Science: 60, English: 48, History: 52, "Computer Science": 58 }, monthlyPerformance: [42, 45, 47, 49, 50, 52, 51, 54, 53, 55, 56, 55] },
    { name: "Divya Iyer", roll: "2024-012", subjects: { Mathematics: 87, Science: 85, English: 82, History: 79, "Computer Science": 91 }, monthlyPerformance: [74, 76, 78, 80, 81, 83, 82, 85, 86, 87, 86, 86] },
    { name: "Aman Tiwari", roll: "2024-013", subjects: { Mathematics: 68, Science: 72, English: 60, History: 64, "Computer Science": 70 }, monthlyPerformance: [55, 57, 59, 61, 63, 65, 64, 67, 66, 68, 69, 68] },
    { name: "Kavya Menon", roll: "2024-014", subjects: { Mathematics: 92, Science: 90, English: 95, History: 87, "Computer Science": 93 }, monthlyPerformance: [82, 84, 86, 88, 89, 91, 90, 92, 93, 91, 92, 92] },
    { name: "Suresh Kumar", roll: "2024-015", subjects: { Mathematics: 40, Science: 35, English: 50, History: 42, "Computer Science": 38 }, monthlyPerformance: [30, 33, 35, 34, 37, 38, 36, 39, 38, 40, 41, 39] },
    { name: "Nisha Agarwal", roll: "2024-016", subjects: { Mathematics: 80, Science: 77, English: 85, History: 82, "Computer Science": 84 }, monthlyPerformance: [68, 70, 72, 74, 76, 78, 77, 79, 80, 81, 80, 81] },
    { name: "Deepak Choudhary", roll: "2024-017", subjects: { Mathematics: 58, Science: 55, English: 62, History: 58, "Computer Science": 63 }, monthlyPerformance: [45, 47, 49, 51, 53, 55, 54, 57, 56, 58, 59, 58] },
    { name: "Pooja Ranganathan", roll: "2024-018", subjects: { Mathematics: 89, Science: 93, English: 86, History: 84, "Computer Science": 96 }, monthlyPerformance: [78, 80, 82, 84, 85, 87, 86, 89, 90, 91, 90, 90] },
    { name: "Harsh Kapoor", roll: "2024-019", subjects: { Mathematics: 72, Science: 68, English: 74, History: 70, "Computer Science": 75 }, monthlyPerformance: [58, 60, 62, 64, 66, 68, 67, 70, 71, 72, 71, 72] },
    { name: "Tanvi Deshmukh", roll: "2024-020", subjects: { Mathematics: 85, Science: 88, English: 92, History: 86, "Computer Science": 89 }, monthlyPerformance: [74, 76, 78, 80, 82, 83, 82, 85, 86, 87, 86, 86] },
    { name: "Manish Yadav", roll: "2024-021", subjects: { Mathematics: 48, Science: 42, English: 55, History: 50, "Computer Science": 46 }, monthlyPerformance: [35, 38, 40, 39, 42, 44, 43, 46, 45, 47, 48, 46] },
    { name: "Shruti Bhatt", roll: "2024-022", subjects: { Mathematics: 93, Science: 91, English: 89, History: 92, "Computer Science": 94 }, monthlyPerformance: [83, 85, 87, 88, 90, 91, 90, 92, 93, 92, 93, 93] },
    { name: "Nikhil Pandey", roll: "2024-023", subjects: { Mathematics: 66, Science: 70, English: 58, History: 63, "Computer Science": 72 }, monthlyPerformance: [52, 54, 56, 58, 60, 62, 61, 64, 65, 66, 65, 66] },
    { name: "Ritu Saxena", roll: "2024-024", subjects: { Mathematics: 81, Science: 84, English: 78, History: 80, "Computer Science": 86 }, monthlyPerformance: [68, 70, 72, 74, 76, 78, 77, 80, 81, 82, 81, 82] },
    { name: "Sanjay Mishra", roll: "2024-025", subjects: { Mathematics: 36, Science: 30, English: 42, History: 38, "Computer Science": 32 }, monthlyPerformance: [22, 25, 28, 27, 30, 32, 30, 33, 32, 34, 35, 33] }
];

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
    S = DATA;
    setupSidebar();
    setupNavigation();
    setupSearch();
    setupTheme();
    setupStudentList();
    setupReportSearch();
    bootOverview();
    bootSubjects();
    document.getElementById('settingRecords').textContent = S.length + ' students loaded';
});

/* ============ HELPERS ============ */
function esc(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function initials(name) { return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(); }
function getTotal(st) { return SUBJECTS.reduce((t, s) => t + (st.subjects[s] || 0), 0); }
function getPct(st) { return ((getTotal(st) / (SUBJECTS.length * 100)) * 100).toFixed(1); }
function isPass(st) { return SUBJECTS.every(s => (st.subjects[s] || 0) >= PASS); }
function getGrade(pct) { pct = parseFloat(pct); if (pct >= 90) return 'a1'; if (pct >= 80) return 'a2'; if (pct >= 70) return 'b1'; if (pct >= 60) return 'b2'; return 'c1'; }
function gradeLabel(g) { return g.toUpperCase(); }
function pctColor(p) { p = parseFloat(p); if (p >= 90) return 'var(--ok)'; if (p >= 80) return 'var(--accent)'; if (p >= 70) return 'var(--info)'; if (p >= 60) return 'var(--warn)'; return 'var(--err)'; }
function countUp(id, target, dur, isFloat) {
    const el = document.getElementById(id); if (!el) return;
    const t0 = performance.now();
    (function step(now) {
        const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = isFloat ? (target * e).toFixed(1) : Math.round(target * e);
        if (p < 1) requestAnimationFrame(step);
    })(t0);
}
function destroyCharts() { Object.values(charts).forEach(c => { if (c && c.destroy) c.destroy(); }); charts = {}; }

/* ============ SIDEBAR ============ */
function setupSidebar() {
    const sb = document.getElementById('sidebar'), ov = document.getElementById('sidebarOverlay'), btn = document.getElementById('hamburgerBtn');
    btn.addEventListener('click', () => { sb.classList.toggle('open'); ov.classList.toggle('show'); });
    ov.addEventListener('click', () => { sb.classList.remove('open'); ov.classList.remove('show'); });
}

/* ============ NAVIGATION ============ */
function setupNavigation() {
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.dataset.page;
            navigateTo(page);
            // Close mobile sidebar
            document.getElementById('sidebar').classList.remove('open');
            document.getElementById('sidebarOverlay').classList.remove('show');
        });
    });
}

function navigateTo(page) {
    currentPage = page;
    document.querySelectorAll('.nav-item[data-page]').forEach(n => n.classList.toggle('active', n.dataset.page === page));
    document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + page));
    const titles = { overview: 'Performance Overview', students: 'All Students', subjects: 'Subject Analysis', reports: 'Grade Reports', settings: 'Settings' };
    document.getElementById('pageTitle').textContent = titles[page] || page;
    document.getElementById('breadcrumbCurrent').textContent = titles[page] || page;
    // Reboot charts if switching to overview (canvas resize issue)
    if (page === 'overview') { setTimeout(() => bootOverview(), 50); }
    if (page === 'subjects') { setTimeout(() => bootSubjects(), 50); }
}

/* ============ SEARCH ============ */
function setupSearch() {
    const input = document.getElementById('globalSearch');
    const clear = document.getElementById('searchClear');
    const drop = document.getElementById('searchDrop');
    const head = document.getElementById('searchDropHead');
    const list = document.getElementById('searchDropList');
    let timer;

    document.addEventListener('keydown', e => {
        if (e.key === '/' && document.activeElement !== input) { e.preventDefault(); input.focus(); }
        if (e.key === 'Escape') { input.blur(); closeDrop(); }
    });

    input.addEventListener('input', () => {
        clearTimeout(timer);
        const q = input.value.trim();
        clear.classList.toggle('vis', q.length > 0);
        timer = setTimeout(() => {
            if (!q) { closeDrop(); return; }
            const results = S.filter(s => s.name.toLowerCase().includes(q.toLowerCase()) || s.roll.toLowerCase().includes(q.toLowerCase()));
            head.textContent = results.length + ' result' + (results.length !== 1 ? 's' : '');
            if (!results.length) {
                list.innerHTML = '<div class="s-drop-empty">No students found</div>';
            } else {
                list.innerHTML = results.map(st => {
                    const tot = getTotal(st);
                    return `<div class="s-drop-item" data-roll="${esc(st.roll)}">
            <div class="s-drop-av">${initials(st.name)}</div>
            <div style="flex:1;min-width:0">
              <div class="s-drop-name">${hl(st.name, q)}</div>
              <div class="s-drop-meta">${esc(st.roll)} · ${isPass(st) ? 'Pass' : 'Fail'}</div>
            </div>
            <div class="s-drop-score">${tot}</div>
          </div>`;
                }).join('');
                list.querySelectorAll('.s-drop-item').forEach(el => {
                    el.addEventListener('click', () => {
                        const st = S.find(s => s.roll === el.dataset.roll);
                        if (st) { navigateTo('students'); setTimeout(() => showStudentDetail(st), 60); }
                        closeDrop(); input.value = ''; clear.classList.remove('vis');
                    });
                });
            }
            drop.classList.add('open');
        }, 200);
    });
    clear.addEventListener('click', () => { input.value = ''; clear.classList.remove('vis'); closeDrop(); input.focus(); });
    document.addEventListener('click', e => { if (!document.getElementById('tbSearch').contains(e.target)) closeDrop(); });
    function closeDrop() { drop.classList.remove('open'); }
}

function hl(text, q) {
    const safe = esc(text), qs = esc(q);
    if (!qs) return safe;
    return safe.replace(new RegExp(`(${qs.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'), '<mark>$1</mark>');
}

/* ============ THEME ============ */
function setupTheme() {
    const toggle = document.getElementById('themeToggle');
    const opts = toggle.querySelectorAll('.theme-opt');
    // Load saved
    const saved = localStorage.getItem('acadex-theme') || 'dark';
    applyTheme(saved);
    opts.forEach(o => o.classList.toggle('active', o.dataset.val === saved));
    opts.forEach(o => {
        o.addEventListener('click', () => {
            const val = o.dataset.val;
            applyTheme(val);
            opts.forEach(x => x.classList.toggle('active', x.dataset.val === val));
            localStorage.setItem('acadex-theme', val);
            // Reboot charts with new theme colors
            if (currentPage === 'overview') setTimeout(() => bootOverview(), 100);
            if (currentPage === 'subjects') setTimeout(() => bootSubjects(), 100);
        });
    });
}

function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    Chart.defaults.color = t === 'light' ? '#6b7280' : '#55555f';
    Chart.defaults.borderColor = t === 'light' ? '#e4e7eb' : '#1a1a20';
}

/* ============ OVERVIEW PAGE ============ */
function bootOverview() {
    const d = analyze();
    renderMetrics(d);
    renderBarChart(d);
    renderLineChart(d);
    renderDoughnutChart(d);
    renderRadarChart(d);
    renderHBarChart(d);
    renderOverviewTable();
}

function analyze() {
    let passed = 0, failed = 0, markSum = 0, markCount = 0;
    const subSums = {}, subCounts = {}, monthSums = new Array(12).fill(0);
    const dist = { '90-100': 0, '80-89': 0, '70-79': 0, '60-69': 0, '50-59': 0, 'Below 50': 0 };
    SUBJECTS.forEach(s => { subSums[s] = 0; subCounts[s] = 0; });
    S.forEach(st => {
        let total = 0, fail = false;
        SUBJECTS.forEach(sub => { const m = st.subjects[sub] || 0; subSums[sub] += m; subCounts[sub]++; total += m; if (m < PASS) fail = true; });
        markSum += total; markCount += SUBJECTS.length;
        fail ? failed++ : passed++;
        const avg = total / SUBJECTS.length;
        if (avg >= 90) dist['90-100']++; else if (avg >= 80) dist['80-89']++; else if (avg >= 70) dist['70-79']++; else if (avg >= 60) dist['60-69']++; else if (avg >= 50) dist['50-59']++; else dist['Below 50']++;
        if (st.monthlyPerformance) st.monthlyPerformance.forEach((v, i) => { monthSums[i] += v; });
    });
    const n = S.length, avgMarks = markCount ? +(markSum / markCount).toFixed(1) : 0;
    const subAvgs = {}; SUBJECTS.forEach(s => { subAvgs[s] = subCounts[s] ? +(subSums[s] / subCounts[s]).toFixed(1) : 0; });
    const monthAvgs = monthSums.map(s => n ? +(s / n).toFixed(1) : 0);
    const h1 = monthAvgs.slice(0, 6).reduce((a, b) => a + b, 0) / 6;
    const h2 = monthAvgs.slice(6, 12).reduce((a, b) => a + b, 0) / 6;
    const trend = h1 > 0 ? +(((h2 - h1) / h1) * 100).toFixed(1) : 0;
    return { n, passed, failed, avgMarks, subAvgs, monthAvgs, dist, trend };
}

function renderMetrics(d) {
    countUp('oTotal', d.n, 600, false);
    countUp('oPassed', d.passed, 700, false);
    countUp('oFailed', d.failed, 500, false);
    countUp('oAvg', d.avgMarks, 800, true);
    setTrend('oPassedT', d.trend); setTrend('oFailedT', -d.trend); setTrend('oAvgT', d.trend);
    const pp = d.n ? ((d.passed / d.n) * 100).toFixed(0) : 0;
    const fp = d.n ? ((d.failed / d.n) * 100).toFixed(0) : 0;
    setTimeout(() => {
        document.getElementById('oPassBar').style.width = pp + '%';
        document.getElementById('oFailBar').style.width = fp + '%';
        document.getElementById('oPassPct').textContent = pp + '% pass rate';
        document.getElementById('oFailPct').textContent = fp + '% fail rate';
    }, 100);
}

function setTrend(id, pct) {
    const el = document.getElementById(id); if (!el) return;
    const a = Math.abs(pct);
    if (a < 0.1) { el.className = 'm-trend neutral'; el.innerHTML = '<i class="fa-solid fa-minus"></i> stable'; }
    else { const dir = pct >= 0 ? 'up' : 'down'; el.className = 'm-trend ' + dir; el.innerHTML = `<i class="fa-solid fa-arrow-${pct >= 0 ? 'up' : 'down'}"></i> ${a}%`; }
}

/* Chart defaults */
function setChartDefaults() {
    Chart.defaults.font.family = "'Plus Jakarta Sans',sans-serif";
    Chart.defaults.font.size = 11;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.pointStyleWidth = 8;
    Chart.defaults.plugins.legend.labels.padding = 14;
    Chart.defaults.plugins.tooltip.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--c-tip').trim() || '#1c1c22';
    Chart.defaults.plugins.tooltip.borderColor = getComputedStyle(document.documentElement).getPropertyValue('--c-tip-b').trim() || '#2a2a33';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
    Chart.defaults.plugins.tooltip.titleColor = '#ededf0';
    Chart.defaults.plugins.tooltip.bodyColor = '#8b8b96';
    Chart.defaults.plugins.tooltip.cornerRadius = 8;
    Chart.defaults.plugins.tooltip.padding = 10;
}

function renderBarChart(d) {
    destroyCharts(); setChartDefaults();
    const colors = [C.emerald, C.amber, C.cyan, C.orange, C.violet];
    charts.bar = new Chart(document.getElementById('cBar'), {
        type: 'bar',
        data: { labels: SUBJECTS.map(s => s.length > 10 ? s.slice(0, 9) + '…' : s), datasets: [{ label: 'Average', data: SUBJECTS.map(s => d.subAvgs[s]), backgroundColor: colors.map(c => c + '99'), borderColor: colors, borderWidth: 1.5, borderRadius: 6, borderSkipped: false, maxBarThickness: 56 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => `Avg: ${c.parsed.y}` } } }, scales: { y: { beginAtZero: true, max: 100, grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--c-grid').trim() || '#14141a' }, ticks: { stepSize: 25 } }, x: { grid: { display: false } } }, animation: { duration: 1000, easing: 'easeOutQuart' } }
    });
}

function renderLineChart(d) {
    const ctx = document.getElementById('cLine').getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 0, 250);
    g.addColorStop(0, 'rgba(16,185,129,0.15)'); g.addColorStop(1, 'rgba(16,185,129,0.0)');
    charts.line = new Chart(ctx, {
        type: 'line',
        data: { labels: MONTHS, datasets: [{ label: 'Class Avg', data: d.monthAvgs, borderColor: C.emerald, backgroundColor: g, borderWidth: 2.5, fill: true, tension: .35, pointRadius: 0, pointHoverRadius: 6, pointHoverBackgroundColor: '#fff', pointHoverBorderColor: C.emerald, pointHoverBorderWidth: 2.5 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false, callbacks: { label: c => `Avg: ${c.parsed.y}` } } }, scales: { y: { grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--c-grid').trim() || '#14141a' } }, x: { grid: { display: false } } }, interaction: { intersect: false, mode: 'index' }, animation: { duration: 1200, easing: 'easeOutQuart' } }
    });
}

function renderDoughnutChart(d) {
    charts.doughnut = new Chart(document.getElementById('cDoughnut'), {
        type: 'doughnut',
        data: { labels: ['Passed', 'Failed'], datasets: [{ data: [d.passed, d.failed], backgroundColor: [C.emerald + 'BB', C.rose + 'BB'], borderColor: [getComputedStyle(document.documentElement).getPropertyValue('--bg-surface').trim() || '#111114', getComputedStyle(document.documentElement).getPropertyValue('--bg-surface').trim() || '#111114'], borderWidth: 3, hoverOffset: 6 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: '72%', plugins: { legend: { position: 'bottom', labels: { padding: 16, font: { size: 12, weight: '500' } } }, tooltip: { callbacks: { label: c => { const t = c.dataset.data.reduce((a, b) => a + b, 0); return `${c.label}: ${c.parsed} (${t ? ((c.parsed / t) * 100).toFixed(0) : 0}%)`; } } } }, animation: { duration: 1200, easing: 'easeOutQuart' } },
        plugins: [{ id: 'centerText', afterDraw(chart) { const { ctx: c, width: w, height: h } = chart; const t = chart.data.datasets[0].data.reduce((a, b) => a + b, 0); const p = t ? ((chart.data.datasets[0].data[0] / t) * 100).toFixed(0) : 0; c.save(); c.textAlign = 'center'; c.textBaseline = 'middle'; const cx = w / 2, cy = h / 2 - 14; c.font = "800 24px 'Plus Jakarta Sans'"; c.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--t1').trim() || '#ededf0'; c.fillText(p + '%', cx, cy); c.font = "500 9px 'Plus Jakarta Sans'"; c.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--t3').trim() || '#55555f'; c.fillText('PASS RATE', cx, cy + 18); c.restore(); } }]
    });
}

function renderRadarChart(d) {
    charts.radar = new Chart(document.getElementById('cRadar'), {
        type: 'radar',
        data: { labels: SUB_SHORT, datasets: [{ label: 'Class Avg', data: SUBJECTS.map(s => d.subAvgs[s]), backgroundColor: 'rgba(16,185,129,0.12)', borderColor: C.emerald, borderWidth: 2, pointBackgroundColor: C.emerald, pointBorderColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-surface').trim() || '#111114', pointBorderWidth: 2, pointRadius: 4, pointHoverRadius: 6 }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { r: { beginAtZero: true, max: 100, ticks: { display: false }, grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--border-s').trim() || '#18181d' }, angleLines: { color: getComputedStyle(document.documentElement).getPropertyValue('--border-s').trim() || '#18181d' }, pointLabels: { font: { size: 11, weight: '500' }, color: getComputedStyle(document.documentElement).getPropertyValue('--t2').trim() || '#8b8b96' } } }, animation: { duration: 1000, easing: 'easeOutQuart' } }
    });
}

function renderHBarChart(d) {
    const labels = Object.keys(d.dist), data = Object.values(d.dist);
    const colors = [C.emerald, C.cyan, C.amber, C.orange, C.rose, '#7f1d1d'];
    charts.hbar = new Chart(document.getElementById('cHBar'), {
        type: 'bar',
        data: { labels, datasets: [{ label: 'Students', data, backgroundColor: colors.map(c => c + '88'), borderColor: colors, borderWidth: 1.5, borderRadius: 5, borderSkipped: false, maxBarThickness: 26 }] },
        options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => `${c.parsed.x} student${c.parsed.x !== 1 ? 's' : ''}` } } }, scales: { x: { beginAtZero: true, grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--c-grid').trim() || '#14141a' }, ticks: { stepSize: 2 } }, y: { grid: { display: false } } }, animation: { duration: 1000, easing: 'easeOutQuart' } }
    });
}

function renderOverviewTable() {
    const ranked = S.map(st => { const t = getTotal(st), p = getPct(st); return { ...st, total: t, pct: p, grade: getGrade(p) }; }).sort((a, b) => b.total - a.total).slice(0, 10);
    const tb = document.getElementById('oTableBody');
    tb.innerHTML = ranked.map((st, i) => {
        const r = i + 1, rc = r === 1 ? 'gold' : r === 2 ? 'silver' : r === 3 ? 'bronze' : '';
        return `<tr>
      <td class="td-rank ${rc}">${r}</td>
      <td><div style="display:flex;align-items:center;gap:10px"><div style="width:28px;height:28px;background:var(--bg-active);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:var(--t3);flex-shrink:0">${initials(st.name)}</div><span class="td-name">${esc(st.name)}</span></div></td>
      <td class="td-roll">${esc(st.roll)}</td>
      ${SUBJECTS.map(sub => { const m = st.subjects[sub] || 0; return `<td class="td-mark ${m < PASS ? 'low' : ''}">${m}</td>`; }).join('')}
      <td class="td-total">${st.total}</td>
      <td class="td-pct" style="color:${pctColor(st.pct)}">${st.pct}%</td>
      <td style="text-align:center"><span class="grade-badge ${st.grade}">${gradeLabel(st.grade)}</span></td>
    </tr>`;
    }).join('');
}

/* ============ STUDENTS PAGE ============ */
function setupStudentList() {
    const filter = document.getElementById('stuFilter');
    const list = document.getElementById('stuList');
    const count = document.getElementById('stuCount');

    function render(filterText) {
        const q = (filterText || '').toLowerCase();
        const filtered = q ? S.filter(s => s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q)) : S;
        count.textContent = filtered.length + ' student' + (filtered.length !== 1 ? 's' : '');
        list.innerHTML = filtered.map(st => {
            const tot = getTotal(st);
            return `<div class="stu-item" data-roll="${esc(st.roll)}">
        <div class="stu-item-av">${initials(st.name)}</div>
        <div class="stu-item-info"><div class="stu-item-name">${esc(st.name)}</div><div class="stu-item-roll">${esc(st.roll)}</div></div>
        <div class="stu-item-score">${tot}</div>
      </div>`;
        }).join('');
        list.querySelectorAll('.stu-item').forEach(el => {
            el.addEventListener('click', () => {
                list.querySelectorAll('.stu-item').forEach(x => x.classList.remove('active'));
                el.classList.add('active');
                const st = S.find(s => s.roll === el.dataset.roll);
                if (st) showStudentDetail(st);
            });
        });
    }
    render('');
    filter.addEventListener('input', () => render(filter.value));
}

function showStudentDetail(st) {
    const panel = document.getElementById('stuDetail');
    const total = getTotal(st), pct = getPct(st), pass = isPass(st), grade = getGrade(pct);
    const color = [C.emerald, C.amber, C.cyan, C.orange, C.violet];

    panel.innerHTML = `
    <div class="sd-header">
      <div class="sd-avatar">${initials(st.name)}</div>
      <div><div class="sd-name">${esc(st.name)}</div><div class="sd-roll">${esc(st.roll)}</div></div>
    </div>
    <div class="sd-stats">
      <div class="sd-stat"><div class="sd-stat-label">Total Marks</div><div class="sd-stat-val">${total} / 500</div></div>
      <div class="sd-stat"><div class="sd-stat-label">Percentage</div><div class="sd-stat-val" style="color:${pctColor(pct)}">${pct}%</div></div>
      <div class="sd-stat"><div class="sd-stat-label">Result</div><div class="sd-stat-val ${pass ? 'pass' : 'fail'}">${pass ? 'PASS' : 'FAIL'}</div></div>
    </div>
    <div class="sd-section">
      <div class="sd-section-title">Subject Marks</div>
      <div class="sd-marks-grid">
        ${SUBJECTS.map((sub, i) => {
        const m = st.subjects[sub] || 0, low = m < PASS;
        return `<div class="sd-mark-card ${low ? 'low' : ''}">
            <div class="sd-mark-sub">${SUB_SHORT[i]}</div>
            <div class="sd-mark-val ${low ? 'low' : ''}">${m}</div>
            <div class="sd-mark-bar"><div class="sd-mark-bar-fill" style="width:${m}%;background:${low ? 'var(--err)' : color[i]}"></div></div>
          </div>`;
    }).join('')}
      </div>
    </div>
    <div class="sd-section">
      <div class="sd-section-title">Monthly Performance</div>
    </div>
    <div class="sd-chart-wrap"><canvas id="sdLineChart"></canvas></div>
    <div class="sd-section" style="padding-top:0">
      <div class="sd-section-title">Grade</div>
      <div style="display:flex;align-items:center;gap:10px">
        <span class="grade-badge ${grade}" style="font-size:12px;padding:5px 16px">${gradeLabel(grade)}</span>
        <span style="font-size:12px;color:var(--t3)">${pct >= 90 ? 'Outstanding' : pct >= 80 ? 'Excellent' : pct >= 70 ? 'Good' : pct >= 60 ? 'Average' : 'Below Average'}</span>
      </div>
    </div>
  `;

    // Render mini line chart
    if (st.monthlyPerformance) {
        const ctx = document.getElementById('sdLineChart').getContext('2d');
        const g = ctx.createLinearGradient(0, 0, 0, 180);
        g.addColorStop(0, 'rgba(16,185,129,0.15)'); g.addColorStop(1, 'rgba(16,185,129,0.0)');
        new Chart(ctx, {
            type: 'line',
            data: { labels: MONTHS, datasets: [{ data: st.monthlyPerformance, borderColor: C.emerald, backgroundColor: g, borderWidth: 2, fill: true, tension: .35, pointRadius: 3, pointBackgroundColor: C.emerald, pointBorderColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-surface').trim() || '#111114', pointBorderWidth: 2 }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } }, scales: { y: { grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--c-grid').trim() || '#14141a' } }, x: { grid: { display: false } } }, interaction: { intersect: false, mode: 'index' } }
        });
    }
}

/* ============ SUBJECTS PAGE ============ */
function bootSubjects() {
    const grid = document.getElementById('subjGrid');
    const colors = [C.emerald, C.amber, C.cyan, C.orange, C.violet];
    grid.innerHTML = SUBJECTS.map((sub, idx) => {
        const marks = S.map(st => st.subjects[sub] || 0).sort((a, b) => b - a);
        const avg = (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(1);
        const top5 = marks.slice(0, 5);
        const topStudents = S.map(st => ({ name: st.name, mark: st.subjects[sub] || 0 })).sort((a, b) => b.mark - a.mark).slice(0, 3);
        return `<div class="subj-card">
      <div class="subj-card-head">
        <div class="subj-card-title"><span class="subj-dot" style="background:${colors[idx]}"></span>${esc(sub)}</div>
        <span class="subj-card-avg">Avg: ${avg}</span>
      </div>
      <div class="subj-card-chart"><canvas id="subjChart${idx}"></canvas></div>
      <div class="subj-card-top">
        <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:var(--t3);margin-bottom:6px">Top Performers</div>
        ${topStudents.map((ts, i) => `<div class="subj-top-item">
          <span class="subj-top-rank ${i === 0 ? 'r1' : i === 1 ? 'r2' : i === 2 ? 'r3' : ''}">${i + 1}</span>
          <span class="subj-top-name">${esc(ts.name)}</span>
          <span class="subj-top-score">${ts.mark}</span>
        </div>`).join('')}
      </div>
    </div>`;
    }).join('');

    // Render mini distribution charts
    SUBJECTS.forEach((sub, idx) => {
        const marks = S.map(st => st.subjects[sub] || 0);
        const bins = { '90-100': 0, '80-89': 0, '70-79': 0, '60-69': 0, '50-59': 0, 'Below 50': 0 };
        marks.forEach(m => { const a = m; if (a >= 90) bins['90-100']++; else if (a >= 80) bins['80-89']++; else if (a >= 70) bins['70-79']++; else if (a >= 60) bins['60-69']++; else if (a >= 50) bins['50-59']++; else bins['Below 50']++; });
        const colors2 = [C.emerald, C.cyan, C.amber, C.orange, C.rose, '#7f1d1d'];
        new Chart(document.getElementById('subjChart' + idx), {
            type: 'bar',
            data: { labels: Object.keys(bins), datasets: [{ data: Object.values(bins), backgroundColor: colors2.map(c => c + '77'), borderColor: colors2, borderWidth: 1, borderRadius: 3, borderSkipped: false }] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => c.parsed.y + ' students' } } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 2 }, grid: { color: getComputedStyle(document.documentElement).getPropertyValue('--c-grid').trim() || '#14141a' } }, x: { grid: { display: false }, ticks: { font: { size: 9 } } } } }
        });
    });
}

/* ============ REPORTS PAGE ============ */
function setupReportSearch() {
    const input = document.getElementById('reportSearch');
    const results = document.getElementById('reportResults');

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (!q) { results.innerHTML = ''; return; }
        const filtered = S.filter(s => s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q));
        results.innerHTML = filtered.map(st => `<div class="report-result-item" data-roll="${esc(st.roll)}">
      <div class="report-result-av">${initials(st.name)}</div>
      <div><div class="report-result-name">${esc(st.name)}</div><div class="report-result-roll">${esc(st.roll)}</div></div>
    </div>`).join('');
        results.querySelectorAll('.report-result-item').forEach(el => {
            el.addEventListener('click', () => {
                const st = S.find(s => s.roll === el.dataset.roll);
                if (st) generateReport(st);
            });
        });
    });
}

function generateReport(st) {
    const panel = document.getElementById('reportCard');
    const total = getTotal(st), pct = getPct(st), pass = isPass(st), grade = getGrade(pct);
    const remark = pct >= 90 ? 'Outstanding Performance' : pct >= 80 ? 'Excellent Work' : pct >= 70 ? 'Good Effort' : pct >= 60 ? 'Satisfactory' : 'Needs Improvement';

    panel.innerHTML = `
    <div class="rc-header">
      <div class="rc-school">Acadex Public School</div>
      <div class="rc-title">Academic Report Card</div>
      <div class="rc-sub">Annual Examination 2024–25 · Class X-A</div>
    </div>
    <div class="rc-student">
      <div class="rc-stu-av">${initials(st.name)}</div>
      <div style="text-align:left">
        <div class="rc-stu-name">${esc(st.name)}</div>
        <div class="rc-stu-roll">${esc(st.roll)}</div>
      </div>
    </div>
    <div class="rc-table">
      <table class="rc-dtable">
        <thead><tr><th>Subject</th><th style="text-align:center">Max Marks</th><th style="text-align:center">Marks Obtained</th><th style="text-align:center">Grade</th></tr></thead>
        <tbody>
          ${SUBJECTS.map((sub, i) => {
        const m = st.subjects[sub] || 0, g = getGrade((m / 100) * 100);
        return `<tr><td>${esc(sub)}</td><td style="text-align:center">100</td><td style="text-align:center" class="rc-mark ${m < PASS ? 'low' : ''}">${m}</td><td style="text-align:center" class="rc-grade" style="color:${pctColor((m / 100) * 100)}">${gradeLabel(g)}</td></tr>`;
    }).join('')}
          <tr class="rc-total-row"><td>Total</td><td style="text-align:center">500</td><td style="text-align:center">${total}</td><td style="text-align:center">${gradeLabel(grade)}</td></tr>
        </tbody>
      </table>
    </div>
    <div class="rc-footer">
      <div class="rc-footer-stat"><div class="rc-footer-label">Percentage</div><div class="rc-footer-val" style="color:${pctColor(pct)}">${pct}%</div></div>
      <div class="rc-footer-stat"><div class="rc-footer-label">Grade</div><div class="rc-footer-val">${gradeLabel(grade)}</div></div>
      <div class="rc-footer-stat"><div class="rc-footer-label">Remark</div><div class="rc-footer-val" style="font-size:13px;font-weight:600">${remark}</div></div>
    </div>
    <div class="rc-result ${pass ? 'pass' : 'fail'}">
      <i class="fa-solid ${pass ? 'fa-circle-check' : 'fa-circle-xmark'}" style="margin-right:6px"></i>
      ${pass ? 'PASSED — Promoted to next class' : 'FAILED — Requires improvement'}
    </div>
    <div style="padding:0 28px 24px;display:flex;justify-content:space-between;font-size:11px;color:var(--t3)">
      <div><div style="font-weight:600;color:var(--t2);margin-bottom:2px">Class Teacher</div><div style="border-top:1px solid var(--border-d);padding-top:4px;width:140px;text-align:center">Signature</div></div>
      <div><div style="font-weight:600;color:var(--t2);margin-bottom:2px">Principal</div><div style="border-top:1px solid var(--border-d);padding-top:4px;width:140px;text-align:center">Signature</div></div>
    </div>
  `;
}

/* ============ INIT ============ */
function boot() {
    S = DATA;
    setupSidebar();
    setupNavigation();
    setupSearch();
    setupTheme();
    setupStudentList();
    setupReportSearch();
    bootOverview();
    bootSubjects();
    document.getElementById('settingRecords').textContent = S.length + ' students loaded';
}