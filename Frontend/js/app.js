// ============================================================
//  app.js — API layer connecting Frontend to Express backend
//  All functions call the real MongoDB backend via fetch().
// ============================================================

// Auto-detect: use live backend on GitHub Pages, localhost in development
const IS_GITHUB_PAGES = window.location.hostname.includes('github.io');
const API_BASE = IS_GITHUB_PAGES
  ? 'https://YOUR_RENDER_APP.onrender.com/api/tasks'  // ← replace after Render deploy
  : 'http://localhost:5000/api/tasks';

// ── Helpers ──────────────────────────────────────────────────

function formatDate(dateStr) {
  if (!dateStr) return 'No due date';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function isOverdue(dateStr) {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date(new Date().toDateString());
}

// ── API Calls ─────────────────────────────────────────────────

async function getAllTasks(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const url    = params ? `${API_BASE}?${params}` : API_BASE;
  const res    = await fetch(url);
  const json   = await res.json();
  return json.data || [];
}

async function getTaskById(id) {
  const res  = await fetch(`${API_BASE}/${id}`);
  const json = await res.json();
  return json.data || null;
}

async function createTask(data) {
  const res  = await fetch(API_BASE, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

async function updateTask(id, changes) {
  const res  = await fetch(`${API_BASE}/${id}`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(changes)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json.data;
}

async function deleteTask(id) {
  const res  = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  const json = await res.json();
  if (!json.success) throw new Error(json.message);
  return json;
}

async function completeTask(id) {
  return updateTask(id, { status: 'completed' });
}

async function reopenTask(id) {
  return updateTask(id, { status: 'pending' });
}

// ── Toast Notification ────────────────────────────────────────

function showToast(message, type = 'default') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type}`;
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Badge Helpers ─────────────────────────────────────────────

function priorityBadge(priority) {
  const p = (priority || 'medium').toLowerCase();
  return `<span class="badge badge-${p}">${priority}</span>`;
}

function statusBadge(status) {
  return `<span class="badge badge-${status}">${status}</span>`;
}

// ── Active Nav Link ───────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  let currentPage = window.location.pathname.split('/').pop();
  if (!currentPage || currentPage === '') currentPage = 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});
