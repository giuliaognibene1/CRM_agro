// --- DATI ---
let clienti = JSON.parse(localStorage.getItem("clienti")) || [];

// Salva
function salvaClienti() {
  localStorage.setItem("clienti", JSON.stringify(clienti));
}

// --- POPOLA SELECT CLIENTI ORDINATI ALFABETICAMENTE ---
function caricaClientiSelect() {
  const select = document.getElementById("clienteTicket");
  if(!select) return;
  select.innerHTML = '<option value="">-- Seleziona cliente --</option>';

  // Ordina clienti in ordine alfabetico sul nome
  const clientiOrdinati = [...clienti].sort((a, b) =>
    a.nome.localeCompare(b.nome, 'it', { sensitivity: 'base' })
  );

  clientiOrdinati.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.nome;
    select.appendChild(opt);
  });
}


// --- AGGIUNGI TICKET ---
function aggiungiTicket() {
  const clienteId = parseInt(document.getElementById("clienteTicket").value);
  const titolo = document.getElementById("titoloTicket").value.trim();
  const descrizione = document.getElementById("descrizioneTicket").value.trim();
  const priorita = document.getElementById("prioritaTicket").value;

  if (!clienteId) return alert("Seleziona un cliente");
  if (!titolo) return alert("Titolo obbligatorio");

  const cliente = clienti.find(c => c.id === clienteId);
  if (!cliente) return;

  cliente.ticket.push({
    titolo,
    descrizione,
    priorita,
    stato: "Aperto",
    dataApertura: new Date().toLocaleDateString(),
    dataChiusura: ""
  });

  salvaClienti();

  document.getElementById("titoloTicket").value = "";
  document.getElementById("descrizioneTicket").value = "";
  document.getElementById("prioritaTicket").value = "Normale";

  mostraTicket(clienteId);
}

// --- MOSTRA TICKET ---
function mostraTicket(clienteId) {
  const cliente = clienti.find(c => c.id === clienteId);
  if (!cliente) return;

  const tbodyAttivi = document.getElementById("tabellaTicketAttivi");
  const tbodyArchiviati = document.getElementById("tabellaTicketArchiviati");

  tbodyAttivi.innerHTML = "";
  tbodyArchiviati.innerHTML = "";

  // TICKET ATTIVI
  cliente.ticket.forEach((t, index) => {
    const riga = document.createElement("tr");
    riga.innerHTML = `
      <td class="col-cliente">${cliente.nome}</td>
      <td class="col-titolo">${t.titolo}</td>
      <td class="col-descrizione">${t.descrizione}</td>
      <td class="col-data">${t.dataApertura}</td>
      <td class="col-azione">
        <button onclick="chiudiTicket(${cliente.id}, ${index})">✅</button>
      </td>
    `;
    tbodyAttivi.appendChild(riga);
  });

  // TICKET ARCHIVIATI
  cliente.archiviati.forEach(t => {
    const riga = document.createElement("tr");
    riga.innerHTML = `
      <td class="col-cliente">${cliente.nome}</td>
      <td class="col-titolo">${t.titolo}</td>
      <td class="col-descrizione">${t.descrizione}</td>
      <td class="col-data">${t.dataApertura}</td>
      <td class="col-data">${t.dataChiusura}</td>
    `;
    tbodyArchiviati.appendChild(riga);
  });
}

// --- CHIUDI (ARCHIVIA) ---
function chiudiTicket(clienteId, index) {
  const cliente = clienti.find(c => c.id === clienteId);
  if (!cliente) return;

  const ticket = cliente.ticket[index];
  ticket.stato = "Chiuso";
  ticket.dataChiusura = new Date().toLocaleDateString();

  cliente.archiviati.push(ticket);
  cliente.ticket.splice(index, 1);

  salvaClienti();
  mostraTicket(clienteId);
}

// --- CAMBIO CLIENTE ---
document.addEventListener("DOMContentLoaded", () => {
  caricaClientiSelect();

  document.getElementById("clienteTicket").addEventListener("change", function () {
    if (this.value) mostraTicket(parseInt(this.value));
  });
});
