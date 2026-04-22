// ─── ELEMENTOS ───────────────────────────────────────────────
const screenStart = document.getElementById('screen-start');
const screenGame  = document.getElementById('screen-game');
const screenEnd   = document.getElementById('screen-end');
const btnStart    = document.getElementById('btn-start');
const btnRestart  = document.getElementById('btn-restart');
const scoreDisplay  = document.getElementById('score-display');
const timerDisplay  = document.getElementById('timer-display');
const finalScoreText = document.getElementById('final-score-text');
const finalMessage   = document.getElementById('final-message');
const gameArea       = document.getElementById('game-area');

// ─── ESTADO ──────────────────────────────────────────────────
let score = 0;
let timeLeft = 0;
let spawnInterval = null;
let timerInterval = null;
let gameTimeout   = null;
let active = false;

// ─── PARTÍCULAS AMBIENTE ─────────────────────────────────────
const particlesContainer = document.getElementById('particles-container');

function spawnParticle() {
  const p = document.createElement('div');
  p.classList.add('particle');
  p.style.left   = Math.random() * 100 + 'vw';
  p.style.bottom = Math.random() * 30 + 'px';
  p.style.width  = (Math.random() * 3 + 1) + 'px';
  p.style.height = p.style.width;
  p.style.animationDuration = (Math.random() * 3 + 2) + 's';
  p.style.animationDelay    = (Math.random() * 2) + 's';
  particlesContainer.appendChild(p);
  setTimeout(() => p.remove(), 6000);
}

setInterval(spawnParticle, 300);

// ─── TELAS ───────────────────────────────────────────────────
function showScreen(screen) {
  [screenStart, screenGame, screenEnd].forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

// ─── INÍCIO ──────────────────────────────────────────────────
function startGame() {
  score     = 0;
  active    = true;
  timeLeft  = Math.floor(Math.random() * 11) + 10; // 10–20s

  scoreDisplay.textContent = '0';
  timerDisplay.textContent = timeLeft;
  timerDisplay.classList.remove('urgent');
  gameArea.innerHTML = '';

  showScreen(screenGame);

  // spawn interval: 500–1000ms
  const spawnRate = () => Math.floor(Math.random() * 501) + 500;

  function scheduleSpawn() {
    if (!active) return;
    spawnMask();
    spawnInterval = setTimeout(scheduleSpawn, spawnRate());
  }
  scheduleSpawn();

  // timer countdown
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 5) {
      timerDisplay.classList.add('urgent');
    }

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

// ─── SPAWN MÁSCARA ───────────────────────────────────────────
function spawnMask() {
  if (!active) return;

  const size   = Math.floor(Math.random() * 41) + 80; // 80–120px
  const area   = gameArea.getBoundingClientRect();
  const maxX   = area.width  - size - 10;
  const maxY   = area.height - size - 10;
  const x      = Math.floor(Math.random() * maxX) + 5;
  const y      = Math.floor(Math.random() * maxY) + 5;

  const mask = document.createElement('div');
  mask.classList.add('mask-enemy');
  mask.style.width  = size + 'px';
  mask.style.height = size + 'px';
  mask.style.left   = x + 'px';
  mask.style.top    = y + 'px';

  const img = document.createElement('img');
  img.src = 'mask_yami.png';
  img.alt = 'Yami Mask';
  mask.appendChild(img);

  // desaparece automaticamente após 900–1600ms
  const lifetime = Math.floor(Math.random() * 701) + 900;
  const autoRemove = setTimeout(() => {
    if (mask.parentNode) {
      mask.classList.add('vanish');
      setTimeout(() => mask.remove(), 300);
    }
  }, lifetime);

  // clique
  mask.addEventListener('click', (e) => {
    if (!active) return;
    clearTimeout(autoRemove);

    score++;
    scoreDisplay.textContent = score;

    // bump
    scoreDisplay.classList.remove('bump');
    void scoreDisplay.offsetWidth; // reflow
    scoreDisplay.classList.add('bump');
    setTimeout(() => scoreDisplay.classList.remove('bump'), 150);

    // pop flutuante
    spawnScorePop(e.clientX, e.clientY);

    // animação de acerto
    mask.classList.add('clicked');
    setTimeout(() => mask.remove(), 250);
  });

  gameArea.appendChild(mask);
}

// ─── SCORE POP ───────────────────────────────────────────────
function spawnScorePop(cx, cy) {
  const pop = document.createElement('div');
  pop.classList.add('score-pop');
  pop.textContent = '+1';

  // posição relativa ao game-area
  const areaRect = gameArea.getBoundingClientRect();
  pop.style.left = (cx - areaRect.left - 15) + 'px';
  pop.style.top  = (cy - areaRect.top  - 20) + 'px';

  gameArea.appendChild(pop);
  setTimeout(() => pop.remove(), 800);
}

// ─── FIM ─────────────────────────────────────────────────────
function endGame() {
  active = false;
  clearTimeout(spawnInterval);
  clearInterval(timerInterval);

  // remove todas as máscaras
  gameArea.querySelectorAll('.mask-enemy').forEach(m => {
    m.classList.add('vanish');
    setTimeout(() => m.remove(), 300);
  });

  setTimeout(() => {
    finalScoreText.innerHTML = `${score} <span>pontos</span>`;
    finalMessage.textContent = getMessage(score);
    showScreen(screenEnd);
  }, 400);
}

function getMessage(s) {
  if (s === 0)  return 'A máscara foi mais rápida que você…';
  if (s <= 3)   return 'As sombras ainda dominam este lugar.';
  if (s <= 7)   return 'Você pertence ao crepúsculo.';
  if (s <= 12)  return 'Caçador habilidoso das sombras!';
  return '⛩ Mestre da Caçada! Yami se curva diante de você. ⛩';
}

// ─── BOTÕES ──────────────────────────────────────────────────
btnStart.addEventListener('click', startGame);
btnRestart.addEventListener('click', () => {
  gameArea.innerHTML = '';
  showScreen(screenStart);
});
