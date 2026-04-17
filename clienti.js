// --- CLIENTI ---

function aggiungiCliente() {
  const nome = document.getElementById("nome").value.trim().toUpperCase();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const telefono = document.getElementById("telefono").value.trim();
  const indirizzo = document.getElementById("indirizzo").value.trim().toUpperCase();
  const partitaIva = document.getElementById("partitaIva").value.trim().toUpperCase();
  const note = document.getElementById("note").value.trim();

  if(!nome || !email || !indirizzo || !partitaIva)
    return alert("Nome, Email, Indirizzo e P.IVA/C.F. obbligatori!");

  // Controllo univocità P.IVA / C.F.
  if(clienti.some(c => c.partitaIva === partitaIva)) {
    return alert("Esiste già un cliente con questa P.IVA / C.F.");
  }

  clienti.push({
    id: Date.now(),
    nome,
    email,
    telefono,
    indirizzo,
    partitaIva,
    note,
    ticket: [],
    archiviati: []
  });

  salvaClienti();

  // reset input
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("indirizzo").value = "";
  document.getElementById("partitaIva").value = "";
  document.getElementById("note").value = "";

  mostraClienti();
}

function rimuoviCliente(index) {
  if(confirm("Eliminare questo cliente?")) {
    clienti.splice(index, 1);
    salvaClienti();
    mostraClienti();
  }
}

function filtraClienti() {
  const filtro = document.getElementById("cerca").value.toLowerCase();
  mostraClienti(filtro);
}

function mostraClienti(filtro = "") {
  const tbody = document.getElementById("tabellaClienti");
  if(!tbody) return;

  tbody.innerHTML = "";

  // Ordina clienti alfabeticamente sul nome
  const clientiOrdinati = [...clienti].sort((a, b) =>
    a.nome.localeCompare(b.nome, 'it', { sensitivity: 'base' })
  );

  clientiOrdinati.forEach((c, i) => {
    if(c.nome.toLowerCase().includes(filtro) || c.email.toLowerCase().includes(filtro)) {
      const riga = document.createElement("tr");
      riga.innerHTML = `
        <td>${c.nome}</td>
        <td>${c.email}</td>
        <td>${c.telefono}</td>
        <td>${c.indirizzo}</td>
        <td>${c.note}</td>
        <td>${c.ticket.length}</td>
        <td>
          <button onclick="entraTicket(${c.id})">Gestisci Ticket</button>
          <button class="btn-delete" onclick="rimuoviCliente(${i})">❌</button>
        </td>`;
      tbody.appendChild(riga);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  mostraClienti();
});
