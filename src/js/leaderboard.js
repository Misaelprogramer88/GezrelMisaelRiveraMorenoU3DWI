// src/js/leaderboard.js - Tabla de Máximos Goleadores (Pichichi)

import { fetchApi } from './api.js';

export async function renderLeaderboardView() {
  const container = document.getElementById('pichichi-container');

  try {
    const res = await fetchApi('goleadores.php');
    if (res.status !== 'success') return;

    const goleadores = res.data || [];

    if (goleadores.length === 0) {
      container.innerHTML = `
        <div class="text-center" style="padding: 3rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">⚽</div>
          <h3>Aún no hay goles registrados</h3>
          <p class="text-muted">Conforme se jueguen los partidos y se anoten goles, aparecerá el ranking del Pichichi.</p>
        </div>
      `;
      return;
    }

    const first = goleadores[0] || null;
    const second = goleadores[1] || null;
    const third = goleadores[2] || null;

    let html = '';

    if (first) {
      html += `<div class="podium-container">`;

      if (second) {
        html += `
          <div class="podium-card second">
            <div class="podium-rank-tag">#2 PLATA</div>
            <span class="podium-crown">🥈</span>
            <div class="podium-avatar-circle" style="border-color: ${second.equipo_color}; box-shadow: 0 0 12px ${second.equipo_color}66;">
              <span class="podium-dorsal">#${second.jugador_numero}</span>
            </div>
            <h4 class="podium-name">${second.jugador_nombre}</h4>
            <span class="podium-team" style="color: ${second.equipo_color};">${second.equipo_nombre}</span>
            <span class="podium-goals">${second.total_goles} ⚽</span>
          </div>
        `;
      }

      html += `
        <div class="podium-card first">
          <div class="podium-rank-tag gold-tag">👑 #1 BOTA DE ORO</div>
          <span class="podium-crown">🥇</span>
          <div class="podium-avatar-circle gold-circle" style="border-color: #ffb703; box-shadow: 0 0 20px rgba(255, 183, 3, 0.6);">
            <span class="podium-dorsal">#${first.jugador_numero}</span>
          </div>
          <h4 class="podium-name">${first.jugador_nombre}</h4>
          <span class="podium-team" style="color: ${first.equipo_color}; font-weight:700;">${first.equipo_nombre}</span>
          <span class="podium-goals gold-goals">${first.total_goles} ⚽</span>
        </div>
      `;

      if (third) {
        html += `
          <div class="podium-card third">
            <div class="podium-rank-tag">#3 BRONCE</div>
            <span class="podium-crown">🥉</span>
            <div class="podium-avatar-circle" style="border-color: ${third.equipo_color}; box-shadow: 0 0 12px ${third.equipo_color}66;">
              <span class="podium-dorsal">#${third.jugador_numero}</span>
            </div>
            <h4 class="podium-name">${third.jugador_nombre}</h4>
            <span class="podium-team" style="color: ${third.equipo_color};">${third.equipo_nombre}</span>
            <span class="podium-goals">${third.total_goles} ⚽</span>
          </div>
        `;
      }

      html += `</div>`;
    }

    html += `
      <div class="table-responsive">
        <table class="leaderboard-table sporty-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Jugador</th>
              <th>Dorsal</th>
              <th>Club</th>
              <th>Demarcación</th>
              <th style="text-align: right;">Goles Totales</th>
            </tr>
          </thead>
          <tbody>
    `;

    goleadores.forEach((g, idx) => {
      const pos = idx + 1;
      let badgePos = `<span class="rank-num">${pos}</span>`;
      if (pos === 1) badgePos = '<span class="rank-medal gold">🥇 1</span>';
      else if (pos === 2) badgePos = '<span class="rank-medal silver">🥈 2</span>';
      else if (pos === 3) badgePos = '<span class="rank-medal bronze">🥉 3</span>';

      const posBadge = {
        'Delantero': '<span class="pos-badge pos-del">⚡ DEL</span>',
        'Medio': '<span class="pos-badge pos-med">⚙️ MED</span>',
        'Defensa': '<span class="pos-badge pos-def">🛡️ DEF</span>',
        'Portero': '<span class="pos-badge pos-por">🧤 POR</span>'
      }[g.jugador_posicion] || `<span class="pos-badge">${g.jugador_posicion}</span>`;

      html += `
        <tr class="${pos <= 3 ? 'top-scorer-row' : ''}">
          <td>${badgePos}</td>
          <td><strong class="player-table-name">${g.jugador_nombre}</strong></td>
          <td><span class="player-dorsal">#${g.jugador_numero}</span></td>
          <td>
            <div class="team-cell-wrap">
              <span class="team-dot" style="background:${g.equipo_color}; box-shadow: 0 0 6px ${g.equipo_color};"></span>
              <span>${g.equipo_nombre}</span>
            </div>
          </td>
          <td>${posBadge}</td>
          <td style="text-align: right;">
            <span class="goals-count-badge">⚽ <strong>${g.total_goles}</strong></span>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  } catch (err) {
    console.error('Error al cargar la tabla de goleadores:', err);
  }
}
