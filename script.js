'use strict';

// A visual parody, not a real hack. All "windows" are removable HTML elements.
const $ = (id) => document.getElementById(id);
const popupLayer = $('popupLayer');
const wordsLayer = $('floatingWords');
const chaosButton = $('chaosBtn');
const calmButton = $('calmBtn');
const soundButton = $('soundBtn');
const audioStatus = $('audioStatus');
const volumeSlider = $('volumeSlider');
const volumeValue = $('volumeValue');
const terminalLines = $('terminalLines');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const isNarrow = () => window.innerWidth < 700;
const rand = (min, max) => min + Math.random() * (max - min);
const pick = (items) => items[Math.floor(Math.random() * items.length)];

const WINDOW_TEXT = [
  ['ERROR_0xASPEN.exe', 'MODDED BY ASPEN!', 'GORILLA SYSTEM OVERRIDDEN', '⚠', '#ff3157'],
  ['MONKEY_ALERT.exe', 'ASPEN WAS HERE!', 'THE BANANAS HAVE BEEN MODDED', '!', '#6fff36'],
  ['CRITICAL_MONKEY_ERROR', 'MONKEY.EXE STOPPED', 'REASON: TOO MUCH ASPEN', '✖', '#ff305b'],
  ['WARNING_777.exe', 'MODDED BY ASPEN', 'THIS IS GETTING RIDICULOUS', '⚠', '#ffce23'],
  ['ASPN_SYSTEM32.exe', 'ERROR: 999% ASPEN', 'MONKEY DIMENSION COLLAPSING', '☣', '#e24dff'],
  ['GHOST_MONKEY.exe', 'ASPEN HAS ARRIVED', 'THERE IS NO ESCAPE FROM THE MEME', '✖', '#47fafa'],
  ['BANANA_DRIVER.sys', 'BANANA ACCESS DENIED', 'ASPEN OWNS ALL THE BANANAS', '!', '#ff3157']
];
const TERMINAL_LINES = [
  'detected: terrified purple monke',
  'booting ASPEN_OVERRIDE.exe ... OK',
  'banana firewall bypassed ... (pretend)',
  'installing 999 fake bananas ... OK',
  'MODDED BY ASPEN // MONKEY MODE ON',
  'synchronizing 20 chaotic audio layers',
  'WARNING: extremely silly website detected',
  'gorilla status: screaming internally',
  'simulated hack level: LEGENDARY',
  'reticulating monkey splines ... OK',
  'the hacker monkey has entered orbit',
  'this is a joke, no systems were accessed'
];

let popupsMade = 0;
let popupClock = null;
let terminalClock = null;
let titleClock = null;
let calm = false;
let highestZ = 100;
const maxPopups = () => isNarrow() ? 9 : 17;

function removeWindow(el) {
  if (!el || el.classList.contains('leave')) return;
  el.classList.add('leave');
  setTimeout(() => el.remove(), 170);
}

function enableDrag(win, grip) {
  let dragging = false;
  let dx = 0;
  let dy = 0;
  grip.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return;
    dragging = true;
    const rect = win.getBoundingClientRect();
    dx = event.clientX - rect.left;
    dy = event.clientY - rect.top;
    win.style.transform = 'none';
    win.style.zIndex = String(++highestZ);
    grip.setPointerCapture(event.pointerId);
  });
  grip.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const x = Math.max(0, Math.min(window.innerWidth - win.offsetWidth, event.clientX - dx));
    const y = Math.max(0, Math.min(window.innerHeight - win.offsetHeight, event.clientY - dy));
    win.style.left = `${x}px`;
    win.style.top = `${y}px`;
  });
  const stop = () => { dragging = false; };
  grip.addEventListener('pointerup', stop);
  grip.addEventListener('pointercancel', stop);
}

function newPopup() {
  if (calm || document.hidden) return;
  const [title, message, extra, symbol, color] = pick(WINDOW_TEXT);
  const win = document.createElement('div');
  win.className = 'fake-window';
  win.style.setProperty('--popup-color', color);
  win.style.setProperty('--angle', `${rand(-5,5).toFixed(2)}deg`);
  win.style.zIndex = String(++highestZ);
  const width = isNarrow() ? 210 : 280;
  const x = Math.max(5, rand(8, Math.max(10, window.innerWidth - width - 12)));
  const y = Math.max(65, rand(70, Math.max(78, window.innerHeight - 200)));
  win.style.left = `${x}px`;
  win.style.top = `${y}px`;
  win.innerHTML = `
    <div class="window-top"><span class="window-title"></span><button type="button" class="window-close" aria-label="Close fake alert">×</button></div>
    <div class="window-body"><div class="window-icon"></div><div class="window-message"></div></div>
    <div class="window-bottom"><button class="window-ok" type="button">OK</button></div>`;
  // User-facing text is set with textContent, never HTML strings.
  win.querySelector('.window-title').textContent = title;
  win.querySelector('.window-icon').textContent = symbol;
  const msg = win.querySelector('.window-message');
  msg.textContent = message;
  const small = document.createElement('small');
  small.textContent = extra;
  msg.appendChild(small);
  win.querySelectorAll('button').forEach(button => button.addEventListener('click', () => removeWindow(win)));
  enableDrag(win, win.querySelector('.window-top'));
  popupLayer.appendChild(win);
  popupsMade++;
  $('alertStat').textContent = String(popupsMade).padStart(3,'0');
  while (popupLayer.children.length > maxPopups()) popupLayer.firstElementChild.remove();
}

function spawnWords() {
  wordsLayer.replaceChildren();
  const count = isNarrow() ? 20 : 37;
  for(let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'float-word';
    el.textContent = pick(['MODDED BY ASPEN', 'ASPEN WAS HERE', '⚠ ASPEN ⚠', 'MONKEY OVERRIDE', 'MODDED BY ASPEN']);
    el.style.left = `${rand(-8,90)}%`;
    el.style.top = `${rand(9,94)}%`;
    el.style.fontSize = `${rand(11,24)}px`;
    el.style.setProperty('--rotate', `${rand(-20,20)}deg`);
    el.style.setProperty('--speed', `${rand(2.3,6.5)}s`);
    el.style.setProperty('--opacity', `${rand(.22,.59).toFixed(2)}`);
    wordsLayer.appendChild(el);
  }
}

function terminalTick() {
  if (calm || document.hidden) return;
  const line = document.createElement('div');
  const prompt = document.createElement('span');
  prompt.className = 'prompt';
  prompt.textContent = '> ';
  line.append(prompt, document.createTextNode(pick(TERMINAL_LINES)));
  terminalLines.appendChild(line);
  while(terminalLines.childElementCount > 4) terminalLines.firstElementChild.remove();
}

function titleTick() {
  if (calm || document.hidden) return;
  document.title = pick(['⚠ MODDED BY ASPEN ⚠','⛔ MODDED BY ASPEN ⛔','🐒 MODDED BY ASPEN 🐒','!!! MODDED BY ASPEN !!!']);
}

// Canvas matrix rain, intentionally slower than a strobe.
const canvas = $('matrix');
const ctx = canvas.getContext('2d', { alpha: true });
let drops = [];
let columns = 0;
let lastFrame = 0;
function resizeMatrix() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  columns = Math.ceil(window.innerWidth / 19);
  drops = Array.from({length:columns}, () => rand(-35, 0));
}
function matrixFrame(time) {
  requestAnimationFrame(matrixFrame);
  if (calm || document.hidden || reducedMotion.matches || time - lastFrame < 90) return;
  lastFrame = time;
  ctx.fillStyle = 'rgba(0,0,0,.10)';
  ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
  ctx.font = 'bold 13px monospace';
  for(let i=0;i<columns;i++) {
    ctx.fillStyle = Math.random() < .06 ? '#ff3055' : '#57ff3e';
    ctx.fillText(Math.random() < .5 ? '0' : '1',i*19,drops[i]*19);
    if (drops[i]*19 > window.innerHeight && Math.random()>.976) drops[i] = 0;
    drops[i] += .33;
  }
}

// Browser sound needs an actual click. One MP3 is decoded a single time and
// played by 20 staggered, low-volume Web Audio source nodes.
let audioContext = null;
let audioBuffer = null;
let masterGain = null;
let layers = [];
let audioOn = false;
let starting = false;
const LAYER_COUNT = 20;
const LAYER_DELAY = .1; // 100ms stagger per overlapping layer
const LAYER_GAIN = .032; // each of the 20 voices stays quiet

function setSoundUI(state, message) {
  audioOn = state;
  soundButton.classList.toggle('active', state);
  soundButton.setAttribute('aria-pressed', String(state));
  soundButton.textContent = state ? '◖)) MUTE 20X AUDIO' : '◖)) ENABLE AUDIO';
  audioStatus.textContent = message;
}
function applyVolume() {
  volumeValue.textContent = `${volumeSlider.value}%`;
  // Maximum combined nominal level is limited by a compressor and master gain.
  if (masterGain && audioContext) masterGain.gain.setTargetAtTime(Number(volumeSlider.value) / 100, audioContext.currentTime, .04);
}
async function turnOnAudio() {
  if (starting || audioOn) return;
  starting = true;
  soundButton.disabled = true;
  audioStatus.textContent = '♪ Loading audio/audio.mp3 for 20 staggered loops...';
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) throw Error('Web Audio is not supported in this browser.');
    if (!audioContext) audioContext = new AudioContextClass();
    await audioContext.resume();
    if (!audioBuffer) {
      const response = await fetch('./audio/audio.mp3');
      if (!response.ok) throw Error('audio/audio.mp3 not found. Add your MP3 to the audio folder.');
      audioBuffer = await audioContext.decodeAudioData(await response.arrayBuffer());
    }
    const compressor = audioContext.createDynamicsCompressor();
    compressor.threshold.value = -26;
    compressor.knee.value = 14;
    compressor.ratio.value = 10;
    compressor.attack.value = .005;
    compressor.release.value = .2;
    masterGain = audioContext.createGain();
    masterGain.gain.value = Number(volumeSlider.value) / 100;
    compressor.connect(masterGain);
    masterGain.connect(audioContext.destination);
    const startAt = audioContext.currentTime + .06;
    for (let i = 0; i < LAYER_COUNT; i++) {
      const source = audioContext.createBufferSource();
      const gain = audioContext.createGain();
      source.buffer = audioBuffer;
      source.loop = true;
      gain.gain.value = LAYER_GAIN;
      source.connect(gain);
      gain.connect(compressor);
      source.start(startAt + i * LAYER_DELAY);
      layers.push(source);
    }
    setSoundUI(true, '♪ 20 overlapping audio loops active · each starts 0.1 seconds after the previous.');
  } catch (error) {
    stopAudio();
    setSoundUI(false, `♪ ${error.message}`);
  } finally {
    soundButton.disabled = false;
    starting = false;
  }
}
function stopAudio() {
  for (const source of layers) { try { source.stop(); source.disconnect(); } catch (_) {} }
  layers = [];
  if (masterGain) { try { masterGain.disconnect(); } catch (_) {} masterGain = null; }
  setSoundUI(false, '♪ Audio is off. Click ENABLE AUDIO for the 20-layer soundtrack.');
}

function startChaos() {
  calm = false;
  document.body.classList.remove('calm');
  document.body.classList.add('chaos');
  chaosButton.textContent = '⚡ MORE CHAOS!!!';
  $('chaosStat').textContent = 'MAXIMUM';
  if (!popupClock) popupClock = setInterval(newPopup, isNarrow() ? 1150 : 720);
  if (!terminalClock) terminalClock = setInterval(terminalTick, 1200);
  if (!titleClock) titleClock = setInterval(titleTick, 780);
  newPopup();
  newPopup();
  newPopup();
}
function calmDown() {
  calm = true;
  document.body.classList.add('calm');
  document.body.classList.remove('chaos');
  clearInterval(popupClock); popupClock = null;
  clearInterval(terminalClock); terminalClock = null;
  clearInterval(titleClock); titleClock = null;
  popupLayer.replaceChildren();
  $('chaosStat').textContent = 'DISABLED';
  chaosButton.textContent = '⚡ RESTART CHAOS';
  document.title = 'MODDED BY ASPEN — Calm Mode';
  stopAudio();
}

chaosButton.addEventListener('click', startChaos);
calmButton.addEventListener('click', calmDown);
$('panicBtn').addEventListener('click', calmDown);
soundButton.addEventListener('click', () => audioOn ? stopAudio() : turnOnAudio());
volumeSlider.addEventListener('input', applyVolume);
document.addEventListener('keydown', (event) => {
  if(event.key === 'Escape') calmDown();
  if(event.code === 'Space' && event.target === document.body) {event.preventDefault(); startChaos();}
});
window.addEventListener('resize', () => {resizeMatrix();spawnWords();});
window.addEventListener('pagehide', stopAudio);
resizeMatrix();
spawnWords();
requestAnimationFrame(matrixFrame);
if (!reducedMotion.matches) startChaos();
else { calmDown(); audioStatus.textContent = '♪ Reduced-motion preference detected. Click RESTART CHAOS to enable fake alerts.'; }
