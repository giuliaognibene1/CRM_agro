// --- CALENDARIO ---
const oggi = new Date();
let meseSelezionato = oggi.getMonth();
let annoSelezionato = oggi.getFullYear();
let eventi = JSON.parse(localStorage.getItem("eventi")) || [];
let dataSelezionata = null;

// Mostra calendario
function cambiaMese(delta){
  meseSelezionato += delta;
  if(meseSelezionato > 11){ meseSelezionato = 0; annoSelezionato++; }
  if(meseSelezionato < 0){ meseSelezionato = 11; annoSelezionato--; }
  mostraCalendario();
}

function mostraCalendario(){
  const meseAnno = document.getElementById("meseAnno");
  const griglia = document.getElementById("grigliaGiorni");
  griglia.innerHTML = "";
  const mesi = ["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];
  meseAnno.textContent = `${mesi[meseSelezionato]} ${annoSelezionato}`;

  const primoGiorno = new Date(annoSelezionato, meseSelezionato, 1).getDay();
  const giorniMese = new Date(annoSelezionato, meseSelezionato+1, 0).getDate();

  let offset = primoGiorno===0 ? 6 : primoGiorno-1;
  for(let i=0;i<offset;i++){
    const vuoto = document.createElement("div");
    vuoto.style.width = "14.28%";
    vuoto.style.height = "80px";
    griglia.appendChild(vuoto);
  }

  for(let g=1; g<=giorniMese; g++){
    const div = document.createElement("div");
    div.textContent = g;
    div.style.width = "14.28%";
    div.style.height = "80px";
    div.style.border = "1px solid #ddd";
    div.style.boxSizing = "border-box";
    div.style.textAlign = "center";
    div.style.lineHeight = "80px";
    div.style.cursor = "pointer";

    const dataStr = new Date(annoSelezionato, meseSelezionato, g);
    if(dataStr.toDateString() === oggi.toDateString()){
      div.style.background = "#44bd32";
      div.style.color = "white";
      div.style.fontWeight = "bold";
    }

    div.onclick = () => selezionaGiorno(dataStr);
    griglia.appendChild(div);
  }
}

// Seleziona un giorno
function selezionaGiorno(data){
  dataSelezionata = data;
  document.getElementById("dataSelezionata").textContent = data.toLocaleDateString();
  mostraEventiGiorno();
}

// Mostra eventi del giorno selezionato
function mostraEventiGiorno(){
  const lista = document.getElementById("listaEventi");
  lista.innerHTML = "";
  if(!dataSelezionata) return;
  const dataStr = dataSelezionata.toLocaleDateString();
  const eventiDelGiorno = eventi.filter(e => e.data === dataStr);
  eventiDelGiorno.forEach(e=>{
    const li = document.createElement("li");
    li.textContent = `${e.titolo} ${e.ticketTitolo ? "(Ticket: "+e.ticketTitolo+")" : ""}`;
    lista.appendChild(li);
  });
}

// Aggiungi evento
function aggiungiEvento(){
  if(!dataSelezionata) return alert("Seleziona un giorno!");
  const titolo = document.getElementById("titoloEvento").value;
  const ticketSelect = document.getElementById("ticketEvento");
  const ticketTitolo = ticketSelect.value;
  if(!titolo) return alert("Titolo evento obbligatorio!");
  eventi.push({ data: dataSelezionata.toLocaleDateString(), titolo, ticketTitolo });
  localStorage.setItem("eventi", JSON.stringify(eventi));
  document.getElementById("titoloEvento").value="";
  ticketSelect.value="";
  mostraEventiGiorno();
}

// Inizializzazione
mostraCalendario();
