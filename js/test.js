const sizes = [12, 14.2, 18.6, 20.8, 25.2, 27.4, 31.8, 34, 38.4, 40.6, 45];

const data = [
  ['TRAVI', 'TRAVE 6,60', [2,2,4,4,6,6,8,8,10,10,12]],
  ['TRAVI', 'TRAVE 5,40', [2,0,2,0,2,0,2,0,2,0,2]],
  ['TRAVI', 'TRAVE 7,6', [0,2,0,2,0,2,0,2,0,2,0]],
  ['CENTINE', 'TUBO 101', [12,14,18,20,24,26,30,32,36,38,42]],
  ['CENTINE', 'VITE 16X40', [48,56,72,80,96,104,120,128,144,152,168]],
  ['CENTINE', 'CAVALLOTTO ZINCATO', [54,63,81,90,108,117,135,144,162,171,198]],
  ['CENTINE', 'VITE 10X25', [108,126,162,180,216,234,270,288,324,342,378]],
  ['CENTINE', 'DADO 10', [108,126,162,180,216,234,270,288,324,342,378]],
  ['CENTINE', 'TUBO 48', [23,23,32,32,41,45,50,54,59,63,72]],
  ['CENTINE', 'BAIONETTA X TUBO 48', [18,18,27,27,36,36,45,45,54,54,63]],
  ['LAMIERA', 'LAMIERA CURVA 6,60', [34,40,52,58,70,76,88,94,106,112,124]],
  ['LAMIERA', 'LAMIERA CURVA 3,00', [17,20,26,29,35,38,44,47,53,56,62]],
  ['LAMIERA', 'GRONDAIA LAMIERA 2.5', [2,0,2,0,2,0,2,0,2,0,2]],
  ['LAMIERA', 'GRONDAIA LAMIERA 1.4', [0,2,0,2,0,2,0,2,0,2,0]],
  ['LAMIERA', 'GRONDAIA LAMIERA 3.3', [6,8,10,12,14,16,18,20,22,24,26]],
  ['LAMIERA', 'TASSELLO X GRONDAIA', [15,15,21,21,27,30,33,36,39,42,48]],
  ['LAMIERA', 'STAFFE LAMIERA', [171,198,252,279,333,360,414,441,495,522,576]],
  ['LAMIERA', 'VITE 6X80', [188,217,277,306,366,396,455,485,544,574,633]],
  ['LAMIERA', 'DADO 6', [188,217,288,306,366,396,455,485,544,574,633]],
  ['GRONDAIA', 'GRONDA SAGOMATA 5 M', [6,6,8,9,11,12,13,14,16,17,0]],
  ['GRONDAIA', 'TASSELLO X GRONDAIA', [24,24,32,36,44,46,52,56,64,68,0]],
  ['GRONDAIA', 'TAPPO TESTA GRONDA', [4,4,4,4,4,4,4,4,4,4,4]],
  ['GRONDAIA', 'IMBOCCHI PIANI D80', [2,2,6,6,6,6,8,8,8,8,0]],
  ['GRONDAIA', 'GRONDA PIANA 4 M', [0,8,10,11,13,14,17,18,20,21,0]],
  ['GRONDAIA', 'TUBO D100 3 M', [6,8,11,12,15,17,20,21,24,25,0]],
  ['GRONDAIA', 'COLLARE + TASSELLO D100', [6,8,12,12,16,18,20,22,24,26,0]],
  ['GRONDAIA', 'CURVA D80', [2,2,2,6,4,4,6,6,6,6,0]]
];

const done = {};
const sel = document.getElementById('size');

sizes.forEach(s => {
  let o = document.createElement('option');
  o.value = s;
  o.textContent = s + ' m';
  sel.appendChild(o);
});

sel.onchange = render;


function render() {
  let i = sizes.indexOf(Number(sel.value));
  let list = document.getElementById('list');
  list.innerHTML = '';

  let t = 0, r = 0;

  // 1. raggruppo per categoria
  let grouped = {};

  data.forEach(x => {
    let cat = x[0];
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(x);
  });

  // 2. render per categoria
  Object.keys(grouped).forEach(cat => {

    // titolo categoria
    let title = document.createElement('div');
    title.textContent = cat;
    title.className = 'cat-title';
    list.appendChild(title);

    // separatore
    let sep = document.createElement('div');
    sep.className = 'cat-sep';
    list.appendChild(sep);

    grouped[cat].forEach(x => {
      let q = x[2][i];
      if (!q) return;

      t++;

      let k = x[1] + '_' + i;
      if (done[k]) r++;

      let d = document.createElement('div');
      d.className = 'material-row';

      d.innerHTML =
        '<div></div>' +
        '<div>' + x[1] + '</div>' +
        '<div>Qta: ' + q + '</div>';

      let b = document.createElement('button');
      b.textContent = done[k] ? 'PRONTO' : 'Segna pronto';
      b.className = done[k] ? 'btn-ready' : 'btn-pending';

      b.onclick = () => {
        done[k] = !done[k];
        render();
      };

      d.appendChild(b);
      list.appendChild(d);
    });
  });

  document.getElementById('count').textContent =
    ' Preparati ' + r + '/' + t;
}

sel.value = sizes[0];
render();
