// --- DATI CLIENTI ---
let clienti = JSON.parse(localStorage.getItem("clienti")) || [];

// --- UTILITY PER ORDINAMENTO CLIENTI ---
function ordinaClientiPerNome(clientiArray) {
  return [...clientiArray].sort((a, b) =>
    a.nome.localeCompare(b.nome, 'it', { sensitivity: 'base' })
  );
}

// --- ORDINA TICKET ATTIVI PER CLIENTE E DATA ---
function ordinaTicket(ticketArray) {
  return ticketArray.sort((a, b) => {
    const dataA = new Date(a.dataApertura);
    const dataB = new Date(b.dataApertura);
    return dataA - dataB; // dal più vecchio al più recente
  });
}

// --- POPOLA LA TABELLA DEI TICKET ATTIVI ---
function mostraTicketAttivi() {
  const tbody = document.querySelector("#tabellaTicketAttivi tbody");
  if(!tbody) return;
  tbody.innerHTML = "";

  // creiamo una lista di tutti i ticket attivi con riferimento al cliente
  let tuttiTicket = [];
  ordinaClientiPerNome(clienti).forEach(c => {
    c.ticket.forEach(t => {
      tuttiTicket.push({
        cliente: c.nome,
        titolo: t.titolo,
        descrizione: t.descrizione,
        dataApertura: t.dataApertura
      });
    });
  });

  // ordiniamo per data apertura (puoi cambiare per più recenti prima se vuoi)
  tuttiTicket = ordinaTicket(tuttiTicket);

  // popola la tabella
  tuttiTicket.forEach(t => {
    const riga = document.createElement("tr");
    riga.innerHTML = `
      <td>${t.cliente}</td>
      <td>${t.titolo}</td>
      <td>${t.descrizione}</td>
      <td>${t.dataApertura}</td>
    `;
    tbody.appendChild(riga);
  });
}

// --- CALENDARIO MINI QUADRATO ---
function creaMiniCalendario() {
  const container = document.getElementById("miniCalendario");
  if(!container) return;

  const oggi = new Date();
  const mese = oggi.toLocaleString('it-IT', { month: 'long' });
  const anno = oggi.getFullYear();
  const primoGiorno = new Date(anno, oggi.getMonth(), 1).getDay(); // 0=domenica
  const giorniNelMese = new Date(anno, oggi.getMonth() + 1, 0).getDate();

  // Header con mese
  let html = `<div class="cal-header">${mese} ${anno}</div>`;

  // Giorni della settimana
  const giorniSettimana = ['D', 'L', 'M', 'M', 'G', 'V', 'S'];
  html += `<div class="cal-days">`;
  giorniSettimana.forEach(g => html += `<div class="cal-cell cal-day">${g}</div>`);
  html += `</div>`;

  // Griglia giorni
  html += `<div class="cal-grid">`;

  // spazi vuoti prima del primo giorno
  let offset = primoGiorno === 0 ? 6 : primoGiorno - 1;
  for(let i=0; i<offset; i++) {
    html += `<div class="cal-cell empty"></div>`;
  }

  // giorni del mese
  for(let d=1; d<=giorniNelMese; d++) {
    const isOggi = d === oggi.getDate() ? 'today' : '';
    html += `<div class="cal-cell ${isOggi}">${d}</div>`;
  }

  html += `</div>`; // fine griglia

  container.innerHTML = html;
}

// --- INIZIALIZZAZIONE ---
document.addEventListener("DOMContentLoaded", () => {
  mostraTicketAttivi();
  creaMiniCalendario();
});
