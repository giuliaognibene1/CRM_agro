// --- DATI GLOBALI ---
let clienti = JSON.parse(localStorage.getItem("clienti")) || [];
let clienteSelezionato = null;
let mostraArchiviati = false;

// --- SALVATAGGIO ---
function salvaClienti() {
  localStorage.setItem("clienti", JSON.stringify(clienti));
}

// --- FUNZIONI UTILI ---
function toggleArchiviati() {
  mostraArchiviati = !mostraArchiviati;
  if(clienteSelezionato) mostraTicket();
}

// --- NAVIGAZIONE SEZIONI (solo per pagine unificate) ---
function mostraSezione(sezione) {
  document.querySelectorAll('.sezione').forEach(s => s.classList.remove('active'));
  document.getElementById(sezione).classList.add('active');
  document.querySelectorAll('.sidebar li').forEach(li => li.classList.remove('active'));
  document.querySelector(`.sidebar li[onclick="mostraSezione('${sezione}')"]`).classList.add('active');
}
