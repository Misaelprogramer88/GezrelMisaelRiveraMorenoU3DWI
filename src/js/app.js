// src/js/app.js - Controlador principal de Torneo Relámpago

import confetti from 'canvas-confetti';
import { fetchApi } from './api.js';
import { renderBracket } from './bracket.js';
import { renderMatchesList, initMatchModal, openMatchResultModal } from './matches.js';
import { renderTeamsView, initTeamModals } from './teams.js';
import { renderLeaderboardView } from './leaderboard.js';

let tournamentState = null;
let activeTab = 'dashboard';
let matchFilter = 'all';

export function initApp() {
  setupNavigation();
  setupTournamentActions();

  initMatchModal(() => {
    showToast('¡Resultado guardado y avance de bracket actualizado!');
    refreshAllData();
  });

  initTeamModals(() => {
    showToast('¡Equipo/Jugador guardado con éxito!');
    refreshAllData();
  });

  document.querySelectorAll('.btn-filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      matchFilter = btn.getAttribute('data-filter');
      if (tournamentState && tournamentState.bracket) {
        renderMatchesList(tournamentState.bracket, matchFilter, (mId) => openMatchResultModal(mId));
      }
    });
  });

  refreshAllData();
}

async function refreshAllData() {
  try {
    const res = await fetchApi('torneo.php');
    if (res.status !== 'success') return;

    tournamentState = res;
    updateStatusHeader(res.torneo, res.total_equipos);
    updateDashboardStats(res);

    renderBracket(res.bracket, (mId) => openMatchResultModal(mId));
    renderMatchesList(res.bracket, matchFilter, (mId) => openMatchResultModal(mId));
    renderTeamsView(() => refreshAllData());
    renderLeaderboardView();

    if (res.torneo && res.torneo.estado === 'finalizado' && res.torneo.campeon_nombre) {
      showChampionBanner(res.torneo.campeon_nombre);
    } else {
      hideChampionBanner();
    }
  } catch (err) {
    console.error('Error al cargar datos del torneo:', err);
    showToast('Error al conectar con la API de PHP en XAMPP. Verifica que Apache y MySQL estén corriendo en XAMPP.', true);
  }
}

function updateStatusHeader(torneo, totalEquipos) {
  const badge = document.getElementById('tournament-badge');
  const text = document.getElementById('tournament-status-text');

  if (!torneo) return;

  badge.className = 'badge';

  if (torneo.estado === 'registro') {
    badge.classList.add('badge-registro');
    text.textContent = `🟢 Registro Abierto (${totalEquipos} Equipos)`;
  } else if (torneo.estado === 'en_curso') {
    badge.classList.add('badge-en-curso');
    text.textContent = '⚡ Torneo En Curso (Eliminatoria Directa)';
  } else if (torneo.estado === 'finalizado') {
    badge.classList.add('badge-finalizado');
    text.textContent = `🏆 Torneo Finalizado - Campeón: ${torneo.campeon_nombre || ''}`;
  }
}

function updateDashboardStats(res) {
  document.getElementById('stat-equipos').textContent = res.total_equipos || 0;

  let totalMatches = 0;
  let playedMatches = 0;

  if (res.bracket) {
    Object.values(res.bracket).forEach(roundMatches => {
      roundMatches.forEach(m => {
        totalMatches++;
        if (m.estado === 'jugado') playedMatches++;
      });
    });
  }

  document.getElementById('stat-partidos').textContent = totalMatches;
  document.getElementById('stat-jugados').textContent = playedMatches;

  fetchApi('goleadores.php').then(resp => {
    if (resp.data && resp.data.length > 0) {
      const top = resp.data[0];
      document.getElementById('stat-pichichi').textContent = `${top.jugador_nombre} (${top.total_goles} ⚽)`;
    } else {
      document.getElementById('stat-pichichi').textContent = '-';
    }
  }).catch(() => {});
}

function setupNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      activeTab = tab.getAttribute('data-tab');

      document.querySelectorAll('.tab-view').forEach(view => view.classList.remove('active'));
      const activeView = document.getElementById(`view-${activeTab}`);
      if (activeView) activeView.classList.add('active');
    });
  });
}

function setupTournamentActions() {
  const btnStartHeader = document.getElementById('btn-start-tournament');
  const btnStartDash = document.getElementById('btn-draw-dash');
  const btnReset = document.getElementById('btn-reset-tournament');

  const startTournamentHandler = async () => {
    if (confirm('¿Deseas realizar el sorteo aleatorio y generar las llaves del torneo?')) {
      try {
        const res = await fetchApi('torneo.php', {
          method: 'POST',
          body: JSON.stringify({ action: 'iniciar' })
        });

        if (res.status === 'success') {
          showToast(res.message);
          document.querySelector('.nav-tab[data-tab="bracket"]').click();
          refreshAllData();
        }
      } catch (err) {
        showToast(err.message, true);
      }
    }
  };

  btnStartHeader.addEventListener('click', startTournamentHandler);
  btnStartDash.addEventListener('click', startTournamentHandler);

  btnReset.addEventListener('click', async () => {
    if (confirm('⚠️ ¿Estás seguro de reiniciar el torneo? Se limpiarán los partidos y goles actuales.')) {
      try {
        const res = await fetchApi('torneo.php', {
          method: 'POST',
          body: JSON.stringify({ action: 'reiniciar' })
        });
        if (res.status === 'success') {
          showToast('Torneo reiniciado correctamente');
          refreshAllData();
        }
      } catch (err) {
        showToast(err.message, true);
      }
    }
  });
}

function showChampionBanner(campeonNombre) {
  const banner = document.getElementById('champion-banner');
  const nameEl = document.getElementById('champion-name');

  if (nameEl) nameEl.textContent = campeonNombre;
  banner.classList.remove('hidden');

  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 }
  });
}

function hideChampionBanner() {
  const banner = document.getElementById('champion-banner');
  banner.classList.add('hidden');
}

export function showToast(message, isError = false) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'toast-error' : ''}`;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}
