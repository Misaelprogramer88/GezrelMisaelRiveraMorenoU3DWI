// src/js/matches.js - Calendario de partidos y Modal de registro de resultados

import { fetchApi } from './api.js';

let currentMatchData = null;
let currentTeam1Players = [];
let currentTeam2Players = [];

export function renderMatchesList(bracketData, filter = 'all', onMatchClick) {
  const container = document.getElementById('matches-list-container');

  if (!bracketData || Object.keys(bracketData).length === 0) {
    container.innerHTML = `
      <div class="glass-panel text-center padding-2">
        <p class="text-muted">No hay partidos programados en este momento.</p>
      </div>
    `;
    return;
  }

  let html = '';
  const roundKeys = Object.keys(bracketData).sort((a, b) => {
    const order = { 'Cuartos de Final': 1, 'Semifinal': 2, 'Gran Final': 3 };
    return (order[a] || 99) - (order[b] || 99);
  });

  roundKeys.forEach((roundTitle) => {
    let matches = bracketData[roundTitle];

    if (filter === 'pendiente') {
      matches = matches.filter((m) => m.estado === 'pendiente');
    } else if (filter === 'jugado') {
      matches = matches.filter((m) => m.estado === 'jugado');
    }

    if (matches.length === 0) return;

    html += `
      <div class="round-group">
        <h3 class="round-group-title">🏆 ${roundTitle}</h3>
        <div class="matches-cards-grid">
    `;

    matches.forEach((m) => {
      const isPlayed = m.estado === 'jugado';
      const isWinner1 = isPlayed && m.ganador_id == m.equipo1_id && m.equipo1_id;
      const isWinner2 = isPlayed && m.ganador_id == m.equipo2_id && m.equipo2_id;

      const team1Name = m.equipo1_nombre || 'Por Definir';
      const team2Name = m.equipo2_nombre || 'Por Definir';

      const team1Color = m.equipo1_color || '#475569';
      const team2Color = m.equipo2_color || '#475569';

      const score1 = isPlayed ? m.goles_equipo1 : '-';
      const score2 = isPlayed ? m.goles_equipo2 : '-';

      const showPenalties = isPlayed && m.penales_equipo1 !== null && m.penales_equipo2 !== null;

      html += `
        <div class="bracket-match-card match-fixture-card ${isPlayed ? 'card-played' : 'card-pending'}" data-match-id="${m.id}">
          <div class="match-header-bar">
            <span class="match-number-tag">PARTIDO #${m.id} • ${roundTitle}</span>
            <span class="status-pill ${isPlayed ? 'status-played' : 'status-pending'}">
              ${isPlayed ? '✅ FINALIZADO' : '⏳ POR JUGAR'}
            </span>
          </div>

          <div class="match-team-row ${isWinner1 ? 'winner' : ''}">
            <div class="team-badge-name">
              <span class="team-crest-shield" style="border-color: ${team1Color}; box-shadow: 0 0 8px ${team1Color}66;">
                <span class="team-dot" style="background-color: ${team1Color}"></span>
              </span>
              <span class="team-title-text">${team1Name}</span>
            </div>
            <div class="score-wrapper">
              ${isWinner1 ? '<span class="winner-icon">⚽</span>' : ''}
              <span class="score-badge ${isWinner1 ? 'winner-score' : ''}">${score1}</span>
            </div>
          </div>

          <div class="match-team-row ${isWinner2 ? 'winner' : ''}">
            <div class="team-badge-name">
              <span class="team-crest-shield" style="border-color: ${team2Color}; box-shadow: 0 0 8px ${team2Color}66;">
                <span class="team-dot" style="background-color: ${team2Color}"></span>
              </span>
              <span class="team-title-text">${team2Name}</span>
            </div>
            <div class="score-wrapper">
              ${isWinner2 ? '<span class="winner-icon">⚽</span>' : ''}
              <span class="score-badge ${isWinner2 ? 'winner-score' : ''}">${score2}</span>
            </div>
          </div>

          ${showPenalties ? `
            <div class="penalties-note">
              🎯 Penales: <strong>${m.penales_equipo1} - ${m.penales_equipo2}</strong>
            </div>
          ` : ''}

          <div class="fixture-card-footer">
            <button class="btn btn-sm ${isPlayed ? 'btn-outline' : 'btn-emerald'} btn-sporty w-full">
              ${isPlayed ? '✏️ Ver / Modificar Marcador Oficial' : '⚽ Registrar Marcador y Goleadores'}
            </button>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  if (!html) {
    html = `<div class="glass-panel text-center" style="padding:2rem;"><p class="text-muted">No se encontraron partidos para el filtro seleccionado.</p></div>`;
  }

  container.innerHTML = html;

  const matchCards = container.querySelectorAll('.bracket-match-card');
  matchCards.forEach((card) => {
    card.addEventListener('click', () => {
      const matchId = card.getAttribute('data-match-id');
      if (onMatchClick && matchId) {
        onMatchClick(matchId);
      }
    });
  });
}

export function initMatchModal(onResultSaved) {
  const modal = document.getElementById('modal-match');
  const btnClose = document.getElementById('btn-close-match-modal');
  const btnCancel = document.getElementById('btn-cancel-match-modal');
  const form = document.getElementById('form-match-result');

  const g1Input = document.getElementById('m-team1-goals');
  const g2Input = document.getElementById('m-team2-goals');
  const penaltiesBox = document.getElementById('penalties-box');
  const btnAddScorer = document.getElementById('btn-add-scorer-row');

  const hideModal = () => modal.classList.add('hidden');

  btnClose.addEventListener('click', hideModal);
  btnCancel.addEventListener('click', hideModal);

  const checkPenaltiesNeeded = () => {
    const g1 = parseInt(g1Input.value || '0', 10);
    const g2 = parseInt(g2Input.value || '0', 10);
    if (g1 === g2) {
      penaltiesBox.classList.remove('hidden');
    } else {
      penaltiesBox.classList.add('hidden');
    }
  };

  g1Input.addEventListener('input', checkPenaltiesNeeded);
  g2Input.addEventListener('input', checkPenaltiesNeeded);

  btnAddScorer.addEventListener('click', () => {
    addScorerRow();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const matchId = document.getElementById('match-id').value;
    const g1 = parseInt(g1Input.value || '0', 10);
    const g2 = parseInt(g2Input.value || '0', 10);
    const p1Input = document.getElementById('m-team1-penalties').value;
    const p2Input = document.getElementById('m-team2-penalties').value;

    const penales1 = (g1 === g2 && p1Input !== '') ? parseInt(p1Input, 10) : null;
    const penales2 = (g1 === g2 && p2Input !== '') ? parseInt(p2Input, 10) : null;

    const goleadores = [];
    const scorerRows = document.querySelectorAll('.scorer-row');
    scorerRows.forEach((row) => {
      const selectJ = row.querySelector('.select-jugador');
      const minInput = row.querySelector('.input-minuto');
      const typeSelect = row.querySelector('.select-tipo');

      if (selectJ && selectJ.value) {
        const optionSelected = selectJ.options[selectJ.selectedIndex];
        const equipoId = optionSelected.getAttribute('data-equipo-id');

        goleadores.push({
          jugador_id: parseInt(selectJ.value, 10),
          equipo_id: parseInt(equipoId, 10),
          minuto: parseInt(minInput.value || '0', 10),
          tipo: typeSelect.value
        });
      }
    });

    try {
      const resp = await fetchApi('partidos.php', {
        method: 'POST',
        body: JSON.stringify({
          action: 'guardar_resultado',
          partido_id: parseInt(matchId, 10),
          goles_equipo1: g1,
          goles_equipo2: g2,
          penales_equipo1: penales1,
          penales_equipo2: penales2,
          goleadores
        })
      });

      if (resp.status === 'success') {
        hideModal();
        if (onResultSaved) onResultSaved(resp);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    }
  });
}

export async function openMatchResultModal(matchId) {
  const modal = document.getElementById('modal-match');
  try {
    const res = await fetchApi(`partidos.php?id=${matchId}`);
    if (res.status !== 'success') return;

    currentMatchData = res.data;
    const m = currentMatchData;

    if (!m.equipo1_id || !m.equipo2_id) {
      alert('No se puede cargar resultado de este partido hasta que estén definidos ambos equipos.');
      return;
    }

    document.getElementById('match-id').value = m.id;
    document.getElementById('modal-match-title').textContent = `Partido #${m.id} - ${m.fase_nombre}`;

    document.getElementById('m-team1-name').textContent = m.equipo1_nombre;
    document.getElementById('m-team2-name').textContent = m.equipo2_nombre;

    document.getElementById('m-team1-badge').style.color = m.equipo1_color || '#00ff87';
    document.getElementById('m-team2-badge').style.color = m.equipo2_color || '#00d2ff';

    document.getElementById('m-team1-goals').value = m.goles_equipo1 !== null ? m.goles_equipo1 : 0;
    document.getElementById('m-team2-goals').value = m.goles_equipo2 !== null ? m.goles_equipo2 : 0;

    document.getElementById('m-team1-penalties').value = m.penales_equipo1 !== null ? m.penales_equipo1 : '';
    document.getElementById('m-team2-penalties').value = m.penales_equipo2 !== null ? m.penales_equipo2 : '';

    document.getElementById('lbl-penal1').textContent = `Penales ${m.equipo1_nombre}`;
    document.getElementById('lbl-penal2').textContent = `Penales ${m.equipo2_nombre}`;

    const resEq1 = await fetchApi(`jugadores.php?equipo_id=${m.equipo1_id}`);
    const resEq2 = await fetchApi(`jugadores.php?equipo_id=${m.equipo2_id}`);

    currentTeam1Players = resEq1.data || [];
    currentTeam2Players = resEq2.data || [];

    const scorersContainer = document.getElementById('scorers-list');
    scorersContainer.innerHTML = '';

    if (m.goles_registrados && m.goles_registrados.length > 0) {
      m.goles_registrados.forEach((g) => {
        addScorerRow(g.jugador_id, g.minuto, g.tipo);
      });
    }

    const g1 = parseInt(document.getElementById('m-team1-goals').value, 10);
    const g2 = parseInt(document.getElementById('m-team2-goals').value, 10);
    if (g1 === g2) {
      document.getElementById('penalties-box').classList.remove('hidden');
    } else {
      document.getElementById('penalties-box').classList.add('hidden');
    }

    modal.classList.remove('hidden');
  } catch (e) {
    alert('Error al abrir el partido: ' + e.message);
  }
}

function addScorerRow(selectedJugadorId = null, minuto = 0, tipo = 'normal') {
  const container = document.getElementById('scorers-list');

  let optionsHtml = '<option value="">-- Seleccionar Jugador --</option>';

  if (currentMatchData) {
    optionsHtml += `<optgroup label="${currentMatchData.equipo1_nombre}">`;
    currentTeam1Players.forEach((j) => {
      const isSel = selectedJugadorId == j.id ? 'selected' : '';
      optionsHtml += `<option value="${j.id}" data-equipo-id="${currentMatchData.equipo1_id}" ${isSel}>#${j.numero} ${j.nombre}</option>`;
    });
    optionsHtml += `</optgroup>`;

    optionsHtml += `<optgroup label="${currentMatchData.equipo2_nombre}">`;
    currentTeam2Players.forEach((j) => {
      const isSel = selectedJugadorId == j.id ? 'selected' : '';
      optionsHtml += `<option value="${j.id}" data-equipo-id="${currentMatchData.equipo2_id}" ${isSel}>#${j.numero} ${j.nombre}</option>`;
    });
    optionsHtml += `</optgroup>`;
  }

  const row = document.createElement('div');
  row.className = 'scorer-row';
  row.innerHTML = `
    <select class="form-input select-jugador">${optionsHtml}</select>
    <input type="number" class="form-input input-minuto" min="1" max="120" placeholder="Min" value="${minuto || ''}" />
    <select class="form-input select-tipo">
      <option value="normal" ${tipo === 'normal' ? 'selected' : ''}>Gol Normal</option>
      <option value="penal" ${tipo === 'penal' ? 'selected' : ''}>Penal</option>
      <option value="autogol" ${tipo === 'autogol' ? 'selected' : ''}>Autogol</option>
    </select>
    <button type="button" class="btn-remove-row">&times;</button>
  `;

  row.querySelector('.btn-remove-row').addEventListener('click', () => {
    row.remove();
  });

  container.appendChild(row);
}
