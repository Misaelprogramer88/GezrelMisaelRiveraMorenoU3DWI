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
            <span class="podium-crown">🥈</span>
            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${second.equipo_color}; margin: 0 auto;"></div>
            <h4 class="podium-name">${second.jugador_nombre}</h4>
            <span class="podium-team">${second.equipo_nombre}</span>
            <span class="podium-goals">${second.total_goles} ⚽</span>
          </div>
        `;
      }

      html += `
        <div class="podium-card first">
          <span class="podium-crown">👑 🥇</span>
          <div style="width: 14px; height: 14px; border-radius: 50%; background: ${first.equipo_color}; margin: 0 auto;"></div>
          <h4 class="podium-name">${first.jugador_nombre}</h4>
          <span class="podium-team">${first.equipo_nombre}</span>
          <span class="podium-goals">${first.total_goles} ⚽</span>
        </div>
      `;

      if (third) {
        html += `
          <div class="podium-card third">
            <span class="podium-crown">🥉</span>
            <div style="width: 12px; height: 12px; border-radius: 50%; background: ${third.equipo_color}; margin: 0 auto;"></div>
            <h4 class="podium-name">${third.jugador_nombre}</h4>
            <span class="podium-team">${third.equipo_nombre}</span>
            <span class="podium-goals">${third.total_goles} ⚽</span>
          </div>
        `;
      }

      html += `</div>`;
    }

    html += `
      <table class="leaderboard-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Jugador</th>
            <th>Dorsal</th>
            <th>Equipo</th>
            <th>Posición</th>
            <th style="text-align: right;">Goles Totales</th>
          </tr>
        </thead>
        <tbody>
    `;

    goleadores.forEach((g, idx) => {
      const pos = idx + 1;
      let badgePos = pos;
      if (pos === 1) badgePos = '🥇 1';
      else if (pos === 2) badgePos = '🥈 2';
      else if (pos === 3) badgePos = '🥉 3';

      html += `
        <tr>
          <td><strong>${badgePos}</strong></td>
          <td><strong>${g.jugador_nombre}</strong></td>
          <td><span class="player-dorsal">#${g.jugador_numero}</span></td>
          <td>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span style="width:10px; height:10px; border-radius:50%; background:${g.equipo_color}; display:inline-block;"></span>
              ${g.equipo_nombre}
            </div>
          </td>
          <td><span style="font-size:0.8rem; color:var(--text-muted);">${g.jugador_posicion}</span></td>
          <td style="text-align: right;"><strong style="color:var(--primary-emerald); font-size:1.1rem;">${g.total_goles}</strong></td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;

    container.innerHTML = html;
  } catch (err) {
    console.error('Error al cargar la tabla de goleadores:', err);
  }
}
