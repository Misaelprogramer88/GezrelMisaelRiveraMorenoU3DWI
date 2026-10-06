// src/js/teams.js - Gestión visual de Equipos y Plantillas de Jugadores

import { fetchApi } from './api.js';

export async function renderTeamsView(onTeamsUpdated) {
  const container = document.getElementById('teams-grid-container');

  try {
    const res = await fetchApi('equipos.php');
    if (res.status !== 'success') return;

    const equipos = res.data || [];

    if (equipos.length === 0) {
      container.innerHTML = `
        <div class="glass-panel text-center" style="grid-column: 1 / -1; padding: 3rem;">
          <h3>No hay equipos registrados</h3>
          <p class="text-muted">Presiona el botón "Registrar Nuevo Equipo" para agregar clubes al torneo.</p>
        </div>
      `;
      return;
    }

    let html = '';
    equipos.forEach((eq) => {
      const players = eq.jugadores || [];

      html += `
        <div class="team-card" data-team-id="${eq.id}">
          <div class="team-card-header">
            <div class="team-card-title">
              <div class="team-icon-circle" style="background-color: ${eq.color_hex}">🛡️</div>
              <div>
                <h3>${eq.nombre}</h3>
                <span style="font-size:0.75rem; color: var(--text-muted);">${players.length} jugadores inscritos</span>
              </div>
            </div>
            <button class="btn btn-sm btn-outline-danger btn-delete-team" data-team-id="${eq.id}">🗑️</button>
          </div>

          <div class="player-list-scroll">
            ${players.length === 0 ? '<p style="font-size:0.8rem; color:var(--text-muted); padding:0.5rem 0;">Sin jugadores registrados</p>' : ''}
            ${players.map(p => `
              <div class="player-item-row">
                <div>
                  <span class="player-dorsal">#${p.numero}</span>
                  <strong>${p.nombre}</strong>
                </div>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <span style="font-size:0.75rem; color:var(--text-muted);">${p.posicion}</span>
                  <button class="btn-remove-row btn-delete-player" data-player-id="${p.id}">&times;</button>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="team-card-footer">
            <button class="btn btn-sm btn-outline-emerald btn-add-player" data-team-id="${eq.id}" data-team-name="${eq.nombre}">
              ➕ Agregar Jugador
            </button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.btn-delete-team').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const tId = btn.getAttribute('data-team-id');
        if (confirm('¿Estás seguro de eliminar este equipo?')) {
          await fetchApi(`equipos.php?id=${tId}`, { method: 'DELETE' });
          renderTeamsView(onTeamsUpdated);
          if (onTeamsUpdated) onTeamsUpdated();
        }
      });
    });

    container.querySelectorAll('.btn-delete-player').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const pId = btn.getAttribute('data-player-id');
        if (confirm('¿Eliminar jugador?')) {
          await fetchApi(`jugadores.php?id=${pId}`, { method: 'DELETE' });
          renderTeamsView(onTeamsUpdated);
          if (onTeamsUpdated) onTeamsUpdated();
        }
      });
    });

    container.querySelectorAll('.btn-add-player').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tId = btn.getAttribute('data-team-id');
        const tName = btn.getAttribute('data-team-name');
        openAddPlayerModal(tId, tName, () => {
          renderTeamsView(onTeamsUpdated);
          if (onTeamsUpdated) onTeamsUpdated();
        });
      });
    });

  } catch (err) {
    console.error('Error al cargar equipos:', err);
  }
}

export function initTeamModals(onTeamsUpdated) {
  const modalTeam = document.getElementById('modal-team');
  const btnOpenTeam = document.getElementById('btn-open-add-team');
  const btnCloseTeam = document.getElementById('btn-close-team-modal');
  const btnCancelTeam = document.getElementById('btn-cancel-team-modal');
  const formTeam = document.getElementById('form-add-team');

  const containerInitialPlayers = document.getElementById('initial-players-container');
  const btnAddPlayerRow = document.getElementById('btn-add-player-row');

  btnOpenTeam.addEventListener('click', () => {
    containerInitialPlayers.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      addInitialPlayerInputRow();
    }
    modalTeam.classList.remove('hidden');
  });

  const hideModalTeam = () => modalTeam.classList.add('hidden');
  btnCloseTeam.addEventListener('click', hideModalTeam);
  btnCancelTeam.addEventListener('click', hideModalTeam);

  btnAddPlayerRow.addEventListener('click', () => {
    addInitialPlayerInputRow();
  });

  formTeam.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('t-nombre').value.trim();
    const color_hex = document.getElementById('t-color').value;
    const escudo_icon = document.getElementById('t-escudo').value;

    const jugadores = [];
    containerInitialPlayers.querySelectorAll('.initial-player-row').forEach((row) => {
      const pNombre = row.querySelector('.p-name').value.trim();
      const pNum = parseInt(row.querySelector('.p-num').value || '0', 10);
      const pPos = row.querySelector('.p-pos').value;

      if (pNombre) {
        jugadores.push({ nombre: pNombre, numero: pNum, posicion: pPos });
      }
    });

    try {
      const res = await fetchApi('equipos.php', {
        method: 'POST',
        body: JSON.stringify({ nombre, color_hex, escudo_icon, jugadores })
      });

      if (res.status === 'success') {
        hideModalTeam();
        formTeam.reset();
        renderTeamsView(onTeamsUpdated);
        if (onTeamsUpdated) onTeamsUpdated();
      }
    } catch (err) {
      alert('Error al guardar equipo: ' + err.message);
    }
  });

  const modalPlayer = document.getElementById('modal-player');
  const btnClosePlayer = document.getElementById('btn-close-player-modal');
  const btnCancelPlayer = document.getElementById('btn-cancel-player-modal');
  const formPlayer = document.getElementById('form-add-single-player');

  const hideModalPlayer = () => modalPlayer.classList.add('hidden');
  btnClosePlayer.addEventListener('click', hideModalPlayer);
  btnCancelPlayer.addEventListener('click', hideModalPlayer);

  formPlayer.addEventListener('submit', async (e) => {
    e.preventDefault();
    const equipoId = parseInt(document.getElementById('p-team-id').value, 10);
    const nombre = document.getElementById('p-nombre').value.trim();
    const numero = parseInt(document.getElementById('p-numero').value || '10', 10);
    const posicion = document.getElementById('p-posicion').value;

    try {
      const res = await fetchApi('jugadores.php', {
        method: 'POST',
        body: JSON.stringify({ equipo_id: equipoId, nombre, numero, posicion })
      });

      if (res.status === 'success') {
        hideModalPlayer();
        formPlayer.reset();
        if (window._onPlayerAddedCallback) window._onPlayerAddedCallback();
      }
    } catch (err) {
      alert('Error al agregar jugador: ' + err.message);
    }
  });
}

function addInitialPlayerInputRow() {
  const container = document.getElementById('initial-players-container');
  const row = document.createElement('div');
  row.className = 'initial-player-row form-row';
  row.style.marginBottom = '0.5rem';
  row.innerHTML = `
    <input type="text" class="form-input p-name" placeholder="Nombre jugador" />
    <div style="display:flex; gap:0.5rem;">
      <input type="number" class="form-input p-num" placeholder="#" min="1" max="99" style="width:70px;" />
      <select class="form-input p-pos" style="flex:1;">
        <option value="Delantero">Delantero</option>
        <option value="Medio">Medio</option>
        <option value="Defensa">Defensa</option>
        <option value="Portero">Portero</option>
      </select>
    </div>
  `;
  container.appendChild(row);
}

function openAddPlayerModal(teamId, teamName, callback) {
  const modal = document.getElementById('modal-player');
  document.getElementById('p-team-id').value = teamId;
  document.getElementById('modal-player-team-title').textContent = `Agregar Jugador a ${teamName}`;
  document.getElementById('p-nombre').value = '';
  window._onPlayerAddedCallback = callback;
  modal.classList.remove('hidden');
}
