// src/js/bracket.js - Renderizado del Cuadro Eliminatorio / Bracket Deportivo

export function renderBracket(bracketData, onMatchClick) {
  const container = document.getElementById('bracket-container');

  if (!bracketData || Object.keys(bracketData).length === 0) {
    container.innerHTML = `
      <div class="bracket-empty">
        <div class="empty-icon-wrap">
          <span class="empty-icon">⚽</span>
          <span class="empty-glow"></span>
        </div>
        <h3>El torneo aún no ha comenzado</h3>
        <p>Presiona el botón <strong>"Generar Sorteo y Bracket"</strong> para armar los emparejamientos oficiales y dar inicio al campeonato.</p>
      </div>
    `;
    return;
  }

  const roundKeys = Object.keys(bracketData).sort((a, b) => {
    const order = { 'Cuartos de Final': 1, 'Semifinal': 2, 'Gran Final': 3 };
    return (order[a] || 99) - (order[b] || 99);
  });

  let html = '<div class="bracket-tree">';

  roundKeys.forEach((roundTitle) => {
    const matches = bracketData[roundTitle];
    const isFinalRound = roundTitle === 'Gran Final';

    html += `
      <div class="bracket-round ${isFinalRound ? 'round-grand-final' : ''}">
        <div class="round-title-badge">
          <span class="round-icon">${isFinalRound ? '🏆' : '⚽'}</span>
          <span class="round-title">${roundTitle}</span>
        </div>
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
        <div class="bracket-match-card ${isFinalRound ? 'is-final' : ''} ${isPlayed ? 'card-played' : 'card-pending'}" data-match-id="${m.id}" title="Haz clic para registrar o ver el marcador">
          ${isFinalRound ? '<div class="final-trophy-watermark">🏆</div>' : ''}
          <div class="match-header-bar">
            <span class="match-number-tag">PARTIDO #${m.id}</span>
            <span class="status-pill ${isPlayed ? 'status-played' : 'status-pending'}">
              ${isPlayed ? '✅ FINALIZADO' : '⏳ POR JUGAR'}
            </span>
          </div>

          <div class="match-team-row ${isWinner1 ? 'winner' : ''}">
            <div class="team-badge-name">
              <span class="team-crest-shield" style="border-color: ${team1Color}; box-shadow: 0 0 8px ${team1Color}66;">
                <span class="team-dot" style="background-color: ${team1Color};"></span>
              </span>
              <span class="team-title-text ${!m.equipo1_id ? 'tbd' : ''}">${team1Name}</span>
            </div>
            <div class="score-wrapper">
              ${isWinner1 ? '<span class="winner-icon">⚽</span>' : ''}
              <span class="score-badge ${isWinner1 ? 'winner-score' : ''}">${score1}</span>
            </div>
          </div>

          <div class="match-team-row ${isWinner2 ? 'winner' : ''}">
            <div class="team-badge-name">
              <span class="team-crest-shield" style="border-color: ${team2Color}; box-shadow: 0 0 8px ${team2Color}66;">
                <span class="team-dot" style="background-color: ${team2Color};"></span>
              </span>
              <span class="team-title-text ${!m.equipo2_id ? 'tbd' : ''}">${team2Name}</span>
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

          <div class="bracket-card-hover-cue">
            <span>${isPlayed ? '✏️ Ver / Editar Marcador' : '⚡ Cargar Marcador'}</span>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  });

  html += '</div>';
  container.innerHTML = html;

  const cards = container.querySelectorAll('.bracket-match-card');
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const matchId = card.getAttribute('data-match-id');
      if (onMatchClick && matchId) {
        onMatchClick(matchId);
      }
    });
  });
}
