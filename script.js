'use strict';

// Fake hacker mayhem: everything is contained inside this one webpage.
const $ = id => document.getElementById(id);
const popupLayer = $('popupLayer');
const wordsLayer = $('floatingWords');
const terminalLines = $('terminalLines');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const isNarrow = () => window.innerWidth < 700;
const rand = (min, max) => min + Math.random() * (max - min);
const pick = items => items[Math.floor(Math.random() * items.length)];

const WINDOW_TEXT = [
  ['ERROR_0xASPEN.exe', 'MODDED BY ASPEN!', 'GORILLA SYSTEM OVERRIDDEN', '⚠', '#ff3157'],
  ['MONKEY_ALERT.exe', 'ASPEN WAS HERE!', 'THE BANANAS HAVE BEEN MODDED', '!', '#6fff36'],
  ['CRITICAL_MONKEY_ERROR', 'MONKEY.EXE STOPPED', 'REASON: TOO MUCH ASPEN', '✖', '#ff305b'],
  ['WARNING_777.exe', 'MODDED BY ASPEN', 'THIS IS GETTING RIDICULOUS', '⚠', '#ffce23'],
  ['ASPN_SYSTEM32.exe', 'ERROR: 999% ASPEN', 'MONKEY DIMENSION COLLAPSING', '☣', '#e24dff'],
  ['GHOST_MONKEY.exe', 'ASPEN HAS ARRIVED', 'THERE IS NO ESCAPE FROM THE MEME', '✖', '#47fafa'],
  ['BANANA_DRIVER.sys', 'BANANA ACCESS DENIED', 'ASPEN OWNS ALL THE BANANAS', '!', '#ff3157'],
  ['MONKEY_OS.exe', 'MODDED BY ASPEN!', 'MONKEY TAKEOVER COMPLETE', '⚠', '#ffce23']
];
const TERMINAL_LINES = [
  'detected: terrified purple monke',
  'booting ASPEN_OVERRIDE.exe ... OK',
  'banana firewall bypassed ... (pretend)',
  'installing 999 fake bananas ... OK',
  'MODDED BY ASPEN // MONKEY MODE ON',
  'synchronizing 20 audio layers at five-second offsets',
  'WARNING: extreme monkey energy detected',
  'gorilla status: screaming internally',
  'modded by aspen: LEGENDARY',
  'reticulating monkey splines ... OK',
  'the hacker monkey has entered orbit'
];

let popupsMade = 0;
let highestZ = 100;
const MAX_POPUPS = () => isNarrow() ? 15 : 24;
const POPUP_RATE_MS = () => isNarrow() ? 320 : 220;

function removeWindow(el) {
  if (!el || el.classList.contains('leave')) return;
  el.classList.add('leave');
  setTimeout(() => el.remove(), 155);
}

function enableDrag(win, grip) {
  let dragging = false;
  let dx = 0;
  let dy = 0;
  grip.addEventListener('pointerdown', event => {
    if (event.target.closest('button')) return;
    dragging = true;
    const rect = win.getBoundingClientRect();
    dx = event.clientX - rect.left;
    dy = event.clientY - rect.top;
    win.style.transform = 'none';
    win.style.zIndex = String(++highestZ);
    grip.setPointerCapture(event.pointerId);
  });
  grip.addEventListener('pointermove', event => {
    if (!dragging) return;
    const x = Math.max(0, Math.min(window.innerWidth - win.offsetWidth, event.clientX - dx));
    const y = Math.max(0, Math.min(window.innerHeight - win.offsetHeight, event.clientY - dy));
    win.style.left = `${x}px`;
    win.style.top = `${y}px`;
  });
  grip.addEventListener('pointerup', () => dragging = false);
  grip.addEventListener('pointercancel', () => dragging = false);
}

function newPopup() {
  if (document.hidden) return;
  const [title, message, extra, symbol, color] = pick(WINDOW_TEXT);
  const win = document.createElement('div');
  win.className = 'fake-window';
  win.style.setProperty('--popup-color', color);
  win.style.setProperty('--angle', `${rand(-5, 5).toFixed(2)}deg`);
  win.style.zIndex = String(++highestZ);
  const width = isNarrow() ? 210 : 280;
  const x = rand(8, Math.max(10, window.innerWidth - width - 12));
  const y = rand(65, Math.max(78, window.innerHeight - 200));
  win.style.left = `${x}px`;
  win.style.top = `${y}px`;
  win.innerHTML = `
    <div class="window-top"><span class="window-title"></span><button type="button" class="window-close" aria-label="Close fake alert">×</button></div>
    <div class="window-body"><div class="window-icon"></div><div class="window-message"></div></div>
    <div class="window-bottom"><button class="window-ok" type="button">OK</button></div>`;
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
  while (popupLayer.children.length > MAX_POPUPS()) popupLayer.firstElementChild.remove();
}

function spawnWords() {
  wordsLayer.replaceChildren();
  const count = isNarrow() ? 23 : 44;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'float-word';
    el.textContent = pick(['MODDED BY ASPEN', 'ASPEN WAS HERE', '⚠ ASPEN ⚠', 'MONKEY OVERRIDE', 'MODDED BY ASPEN']);
    el.style.left = `${rand(-8, 90)}%`;
    el.style.top = `${rand(9, 94)}%`;
    el.style.fontSize = `${rand(11, 24)}px`;
    el.style.setProperty('--rotate', `${rand(-20, 20)}deg`);
    el.style.setProperty('--speed', `${rand(2.3, 6.5)}s`);
    el.style.setProperty('--opacity', `${rand(.22, .59).toFixed(2)}`);
    wordsLayer.appendChild(el);
  }
}

function terminalTick() {
  if (document.hidden) return;
  const line = document.createElement('div');
  const prompt = document.createElement('span');
  prompt.className = 'prompt';
  prompt.textContent = '> ';
  line.append(prompt, document.createTextNode(pick(TERMINAL_LINES)));
  terminalLines.appendChild(line);
  while (terminalLines.childElementCount > 4) terminalLines.firstElementChild.remove();
}

function titleTick() {
  if (document.hidden) return;
  document.title = pick([
    '⚠ MODDED BY ASPEN ⚠',
    '⛔ MODDED BY ASPEN ⛔',
    '🐒 MODDED BY ASPEN 🐒',
    '!!! MODDED BY ASPEN !!!'
  ]);
}

// Build two *identical* ticker segments, each wider than the viewport.
// We scroll exactly one segment width, so the yellow strip wraps seamlessly.
function buildTicker() {
  const track = $('marqueeTrack');
  track.replaceChildren();
  const first = document.createElement('span');
  first.className = 'marquee-copy';
  track.appendChild(first);
  const phrase = '⚠ MODDED BY ASPEN ⚠ MONKEY MAYHEM ⚠ MODDED BY ASPEN ⚠ ASPEN WAS HERE ⚠ ';
  const minWidth = Math.max(window.innerWidth + 250, 1000);
  while (first.getBoundingClientRect().width < minWidth && first.childElementCount < 50) {
    const piece = document.createElement('span');
    piece.textContent = phrase;
    first.appendChild(piece);
  }
  const second = first.cloneNode(true);
  second.setAttribute('aria-hidden', 'true');
  track.appendChild(second);
  const distance = first.getBoundingClientRect().width;
  track.style.setProperty('--ticker-distance', `${distance}px`);
  track.style.setProperty('--ticker-duration', `${Math.max(7, distance / 150)}s`);
}

// Canvas matrix rain.
const canvas = $('matrix');
const ctx = canvas.getContext('2d', { alpha: true });
let drops = [];
let columns = 0;
let lastFrame = 0;
function resizeMatrix() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  columns = Math.ceil(window.innerWidth / 19);
  drops = Array.from({ length: columns }, () => rand(-35, 0));
}
function matrixFrame(time) {
  requestAnimationFrame(matrixFrame);
  if (document.hidden || reducedMotion.matches || time - lastFrame < 90) return;
  lastFrame = time;
  ctx.fillStyle = 'rgba(0,0,0,.10)';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.font = 'bold 13px monospace';
  for (let i = 0; i < columns; i++) {
    ctx.fillStyle = Math.random() < .06 ? '#ff3055' : '#57ff3e';
    ctx.fillText(Math.random() < .5 ? '0' : '1', i * 19, drops[i] * 19);
    if (drops[i] * 19 > window.innerHeight && Math.random() > .976) drops[i] = 0;
    drops[i] += .33;
  }
}

// Attempt autoplay as soon as the site loads. A synthetic click cannot
// unlock restricted autoplay; the first real user gesture will unlock it.
// A single decoded MP3 powers 20 looping layers, starting 5 seconds apart.
let audioContext = null;
let audioBuffer = null;
let audioPlaying = false;
let audioMissing = false;
const LAYER_COUNT = 20;
const LAYER_DELAY = 5; // seconds between each of the 20 looping layers
const LAYER_GAIN = 1; // each layer feeds the compressor at 100% volume

function startAudioIfReady() {
  if (!audioContext || !audioBuffer || audioPlaying || audioContext.state !== 'running') return;
  const compressor = audioContext.createDynamicsCompressor();
  // Strong compression controls the peaks when all 20 layers overlap.
  compressor.threshold.value = -14;
  compressor.knee.value = 4;
  compressor.ratio.value = 20;
  compressor.attack.value = .003;
  compressor.release.value = .18;
  const masterGain = audioContext.createGain();
  masterGain.gain.value = 1; // 100% output level
  compressor.connect(masterGain);
  masterGain.connect(audioContext.destination);
  const begin = audioContext.currentTime + .06;
  for (let i = 0; i < LAYER_COUNT; i++) {
    const source = audioContext.createBufferSource();
    const gain = audioContext.createGain();
    source.buffer = audioBuffer;
    source.loop = true;
    gain.gain.value = LAYER_GAIN;
    source.connect(gain);
    gain.connect(compressor);
    source.start(begin + i * LAYER_DELAY);
  }
  audioPlaying = true;
  document.removeEventListener('pointerdown', unlockAudio, true);
  document.removeEventListener('touchstart', unlockAudio, true);
  document.removeEventListener('keydown', unlockAudio, true);
  document.removeEventListener('click', unlockAudio, true);
}

function unlockAudio() {
  if (audioMissing || !audioContext || audioPlaying) return;
  // Crucial: resume() is called synchronously during a user gesture.
  audioContext.resume().then(startAudioIfReady).catch(() => {});
}

function preloadAndStartAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    audioContext = new AudioContextClass();
  } catch (_) {
    return;
  }
  document.addEventListener('pointerdown', unlockAudio, true);
  document.addEventListener('touchstart', unlockAudio, { passive: true, capture: true });
  document.addEventListener('keydown', unlockAudio, true);
  document.addEventListener('click', unlockAudio, true);
  fetch('./audio/audio.mp3')
    .then(response => {
      if (!response.ok) throw Error('audio/audio.mp3 was not found');
      return response.arrayBuffer();
    })
    .then(data => audioContext.decodeAudioData(data))
    .then(buffer => {
      audioBuffer = buffer;
      startAudioIfReady();
    })
    .catch(error => {
      audioMissing = true;
      console.info('[MODDED BY ASPEN] Add audio/audio.mp3 to enable the soundtrack.', error.message);
    });
  // Start immediately in browsers with autoplay permission; otherwise a real
  // click, tap, or key press unlocks audio (simulated clicks cannot do this).
  audioContext.resume().then(startAudioIfReady).catch(() => {});
}

// Fast fake window spam, with a bounded count so the page stays responsive.
function startChaos() {
  const firstWave = isNarrow() ? 5 : 8;
  for (let i = 0; i < firstWave; i++) newPopup();
  setInterval(newPopup, POPUP_RATE_MS());
  setInterval(terminalTick, 950);
  setInterval(titleTick, 610);
}

window.addEventListener('resize', () => {
  resizeMatrix();
  spawnWords();
  buildTicker();
});
resizeMatrix();
spawnWords();
buildTicker();
requestAnimationFrame(matrixFrame);
startChaos();
preloadAndStartAudio();
