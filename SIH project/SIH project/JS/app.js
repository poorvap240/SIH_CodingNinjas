// ============ LIVE CLOCK ============
function updateClock() {
  const el = document.getElementById('clock');
  if (el) el.textContent = new Date().toLocaleTimeString('en-IN', { hour12:false });
}
setInterval(updateClock, 1000);
updateClock();

// ============ TOAST ============
window.showToast = function(msg, color) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.borderLeftColor = color || 'var(--green)';
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2500);
};

// ============ NAVIGATION HELPER ============
// Determine if we're in root or /pages/
window.ROOT = window.location.pathname.includes('/pages/') ? '../' : './';

// ============ METRIC UPDATER (dashboard only) ============
function updateLiveMetrics() {
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  const setBar = (id, pct) => { const el = document.getElementById(id); if (el) el.style.width = Math.min(100,pct)+'%'; };

  if (!document.getElementById('mRainfall')) return;

  const rain = (35 + Math.random()*20).toFixed(1);
  const soil = (30 + Math.random()*10).toFixed(1);
  const tilt = (1.5 + Math.random()*3).toFixed(1);
  const pore = (10 + Math.random()*6).toFixed(1);

  set('mRainfall', `${rain} <span class="metric-unit">mm/hr</span>`);
  set('mSoil',     `${soil} <span class="metric-unit">% VMC</span>`);
  set('mTilt',     `${tilt} <span class="metric-unit">°</span>`);
  set('mPore',     `${pore} <span class="metric-unit">kPa</span>`);

  setBar('bRainfall', rain/60*100);
  setBar('bSoil',     soil/40*100);
  setBar('bTilt',     tilt/6*100);
  setBar('bPore',     pore/18*100);
}
setInterval(updateLiveMetrics, 3000);

// ============ TOGGLE SWITCHES (settings page) ============
document.addEventListener('click', e => {
  if (e.target.classList.contains('switch')) {
    e.target.classList.toggle('on');
    const label = e.target.closest('.toggle')?.querySelector('.toggle-label')?.textContent || 'Setting';
    showToast(`${label} ${e.target.classList.contains('on') ? 'enabled' : 'disabled'}`);
  }
});

// ============ MODAL HELPERS ============
window.openModal = function(id) {
  document.getElementById(id)?.classList.add('open');
};
window.closeModal = function(id) {
  document.getElementById(id)?.classList.remove('open');
};
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-backdrop')) {
    e.target.classList.remove('open');
  }
});

// ============ DYNAMIC SIDEBAR NODE LIST ============
document.addEventListener('DOMContentLoaded', () => {
  const nodeList = document.getElementById('sidebarNodes');
  if (!nodeList || !window.EWS_DATA) return;
  nodeList.innerHTML = window.EWS_DATA.nodes.map(n => `
    <a class="node-item" href="${ROOT}pages/sensor-detail.html?id=${n.id}">
      <span>${n.id}</span>
      <span class="node-badge ${n.risk==='critical'?'badge-red':n.risk==='moderate'?'badge-amber':'badge-green'}">
        ${n.risk[0].toUpperCase()+n.risk.slice(1)}
      </span>
    </a>
  `).join('');
});