/**
 * ============================================================
 * POKÉDEX — script.js
 * Autor: Pokédex App
 * Descrição: Lógica principal da Pokédex. Consome a PokéAPI,
 *            exibe cards, permite busca por nome/ID, filtragem
 *            por tipo e exibe modal com detalhes.
 * ============================================================
 */

/* ============================================================
   CONSTANTES E ESTADO GLOBAL
   ============================================================ */

const API_BASE = 'https://pokeapi.co/api/v2';

/** Quantidade de Pokémons carregados na listagem inicial */
const INITIAL_LOAD = 60;

/** Nomes traduzidos dos stats para exibição */
const STAT_LABELS = {
  hp:              'HP',
  attack:          'Ataque',
  defense:         'Defesa',
  'special-attack':  'Sp.Atk',
  'special-defense': 'Sp.Def',
  speed:           'Vel',
};

/** Classe CSS para a barra de cada stat */
const STAT_CLASS = {
  hp:              'stat-hp',
  attack:          'stat-atk',
  defense:         'stat-def',
  'special-attack':  'stat-spatk',
  'special-defense': 'stat-spdef',
  speed:           'stat-speed',
};

/**
 * Estado da aplicação.
 * allPokemon  → lista completa carregada da API (dados básicos + tipos)
 * filtered    → subconjunto exibido após filtros
 * currentType → tipo selecionado no select
 */
const state = {
  allPokemon:  [],
  filtered:    [],
  currentType: 'all',
};

/* ============================================================
   REFERÊNCIAS AO DOM
   ============================================================ */
const grid        = document.getElementById('pokemon-grid');
const loader      = document.getElementById('loader');
const errorBox    = document.getElementById('error-msg');
const errorText   = document.getElementById('error-text');
const errorDismiss= document.getElementById('error-dismiss');
const searchInput = document.getElementById('search-input');
const searchBtn   = document.getElementById('search-btn');
const clearBtn    = document.getElementById('clear-btn');
const typeSelect  = document.getElementById('type-select');
const counter     = document.getElementById('counter');

// Modal
const modalOverlay = document.getElementById('modal-overlay');
const modalClose   = document.getElementById('modal-close');
const modalNumber  = document.getElementById('modal-number');
const modalName    = document.getElementById('modal-name');
const modalTypes   = document.getElementById('modal-types');
const modalImgFront= document.getElementById('modal-img-front');
const modalImgBack = document.getElementById('modal-img-back');
const modalHeight  = document.getElementById('modal-height');
const modalWeight  = document.getElementById('modal-weight');
const modalAbil    = document.getElementById('modal-abilities');
const modalStatBars= document.getElementById('modal-stat-bars');

/* ============================================================
   FUNÇÕES DE UI — LOADER / ERRO
   ============================================================ */

/** Exibe o loader e oculta o grid */
function showLoader() {
  loader.hidden = false;
  grid.style.display = 'none';
}

/** Oculta o loader e mostra o grid */
function hideLoader() {
  loader.hidden = true;
  grid.style.display = '';
}

/** Exibe mensagem de erro */
function showError(msg) {
  errorText.textContent = msg;
  errorBox.hidden = false;
}

/** Oculta mensagem de erro */
function hideError() {
  errorBox.hidden = true;
}

/* ============================================================
   FUNÇÕES DE BUSCA NA API
   ============================================================ */

/**
 * Busca dados básicos de um Pokémon pelo nome ou ID.
 * @param {string|number} nameOrId
 * @returns {Promise<Object>} Dados do Pokémon
 */
async function fetchPokemon(nameOrId) {
  const res = await fetch(`${API_BASE}/pokemon/${nameOrId}`);
  if (!res.ok) throw new Error(`Pokémon "${nameOrId}" não encontrado.`);
  return res.json();
}

/**
 * Busca a lista inicial de Pokémons (apenas nome + URL).
 * Em seguida, para cada um, busca os dados completos em paralelo.
 * @param {number} limit
 * @returns {Promise<Object[]>}
 */
async function fetchInitialList(limit = INITIAL_LOAD) {
  const res = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=0`);
  if (!res.ok) throw new Error('Não foi possível carregar a lista de Pokémons.');
  const data = await res.json();

  // Busca detalhes de todos em paralelo (mais rápido que sequencial)
  const details = await Promise.all(
    data.results.map(p => fetchPokemon(p.name))
  );
  return details;
}

/**
 * Busca todos os tipos disponíveis na API para popular o <select>.
 * @returns {Promise<string[]>} Lista de nomes de tipos
 */
async function fetchTypes() {
  const res = await fetch(`${API_BASE}/type`);
  const data = await res.json();
  // Exclui tipos internos que não têm Pokémons associados
  return data.results
    .map(t => t.name)
    .filter(t => !['unknown', 'shadow'].includes(t));
}

/* ============================================================
   FUNÇÕES DE RENDERIZAÇÃO
   ============================================================ */

/**
 * Retorna o HTML de um badge de tipo.
 * @param {string} type
 * @returns {string}
 */
function typeBadgeHTML(type) {
  return `<span class="type-badge type-${type}">${type}</span>`;
}

/**
 * Cria e retorna o elemento <article> de um card de Pokémon.
 * @param {Object} pokemon — dados da PokéAPI
 * @param {number} animDelay — atraso da animação de entrada (ms)
 * @returns {HTMLElement}
 */
function createCard(pokemon, animDelay = 0) {
  const types  = pokemon.types.map(t => t.type.name);
  const sprite = pokemon.sprites.other?.['official-artwork']?.front_default
               || pokemon.sprites.front_default;
  const number = String(pokemon.id).padStart(3, '0');

  // Cor de destaque baseada no primeiro tipo
  const accentVar = `var(--type-${types[0]}, var(--red))`;

  const article = document.createElement('article');
  article.className = 'card';
  article.dataset.id = pokemon.id;
  article.style.setProperty('--card-accent', accentVar);
  article.style.setProperty('--card-glow', `color-mix(in srgb, ${accentVar} 40%, transparent)`);
  article.style.animationDelay = `${animDelay}ms`;

  article.innerHTML = `
    <span class="card__number">#${number}</span>
    <div class="card__img-wrap">
      <img
        class="card__img"
        src="${sprite}"
        alt="${pokemon.name}"
        loading="lazy"
      />
    </div>
    <h2 class="card__name">${pokemon.name}</h2>
    <div class="card__types">
      ${types.map(typeBadgeHTML).join('')}
    </div>
  `;

  // Clique → abre modal
  article.addEventListener('click', () => openModal(pokemon.id));

  return article;
}

/**
 * Renderiza a lista de Pokémons no grid.
 * @param {Object[]} pokemonList
 */
function renderGrid(pokemonList) {
  grid.innerHTML = '';

  if (pokemonList.length === 0) {
    grid.innerHTML = `
      <p style="grid-column:1/-1; text-align:center; color:var(--text-muted);
                font-family:var(--font-pixel); font-size:.6rem; padding:3rem;">
        Nenhum Pokémon encontrado.
      </p>`;
    updateCounter(0);
    return;
  }

  // Adiciona cards com stagger na animação
  pokemonList.forEach((poke, i) => {
    const delay = Math.min(i * 40, 800); // máximo 800ms de atraso
    grid.appendChild(createCard(poke, delay));
  });

  updateCounter(pokemonList.length);
}

/** Atualiza o contador de resultados */
function updateCounter(n) {
  counter.textContent = `${n} Pokémon${n !== 1 ? 's' : ''}`;
}

/**
 * Popula o <select> de tipos com as opções da API.
 * @param {string[]} types
 */
function populateTypeSelect(types) {
  types.sort().forEach(type => {
    const opt = document.createElement('option');
    opt.value = type;
    // Capitaliza primeira letra para exibição
    opt.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    typeSelect.appendChild(opt);
  });
}

/* ============================================================
   FILTRO POR TIPO
   ============================================================ */

/**
 * Aplica o filtro de tipo sobre state.allPokemon e renderiza.
 * @param {string} type — 'all' ou nome do tipo
 */
function applyTypeFilter(type) {
  state.currentType = type;

  if (type === 'all') {
    state.filtered = [...state.allPokemon];
  } else {
    state.filtered = state.allPokemon.filter(p =>
      p.types.some(t => t.type.name === type)
    );
  }

  renderGrid(state.filtered);
}

/* ============================================================
   BUSCA
   ============================================================ */

/**
 * Executa busca por nome ou ID.
 * Se encontrar, exibe só esse Pokémon.
 * Se o campo estiver vazio, reseta para a lista completa (com filtro).
 */
async function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();

  // Campo vazio → volta à lista completa
  if (!query) {
    hideError();
    applyTypeFilter(state.currentType);
    return;
  }

  showLoader();
  hideError();

  try {
    const pokemon = await fetchPokemon(query);

    // Se há filtro de tipo ativo, verifica se o resultado bate
    if (
      state.currentType !== 'all' &&
      !pokemon.types.some(t => t.type.name === state.currentType)
    ) {
      showError(`"${pokemon.name}" não é do tipo "${state.currentType}".`);
      renderGrid([]);
    } else {
      renderGrid([pokemon]);
    }

  } catch (err) {
    showError(`Pokémon "${query}" não encontrado. Tente outro nome ou número.`);
    renderGrid([]);
  } finally {
    hideLoader();
  }
}

/* ============================================================
   MODAL DE DETALHES
   ============================================================ */

/**
 * Busca dados completos e abre o modal de detalhes de um Pokémon.
 * @param {number} id
 */
async function openModal(id) {
  try {
    const poke = await fetchPokemon(id);
    fillModal(poke);
    modalOverlay.hidden = false;
    document.body.style.overflow = 'hidden';

    // Aguarda um frame para as barras animarem corretamente
    requestAnimationFrame(() => {
      requestAnimationFrame(() => animateStatBars());
    });

  } catch (err) {
    showError('Não foi possível carregar os detalhes do Pokémon.');
  }
}

/**
 * Preenche o modal com os dados do Pokémon.
 * @param {Object} poke
 */
function fillModal(poke) {
  const types = poke.types.map(t => t.type.name);
  const number = String(poke.id).padStart(3, '0');

  modalNumber.textContent = `#${number}`;
  modalName.textContent   = poke.name;

  // Tipos
  modalTypes.innerHTML = types.map(typeBadgeHTML).join('');

  // Sprites
  const front = poke.sprites.other?.['official-artwork']?.front_default
              || poke.sprites.front_default;
  const back  = poke.sprites.back_default
              || poke.sprites.front_default;

  modalImgFront.src = front;
  modalImgFront.alt = poke.name;
  modalImgBack.src  = back;
  modalImgBack.alt  = `${poke.name} (costas)`;

  // Infos básicas
  modalHeight.textContent  = `${(poke.height  / 10).toFixed(1)} m`;
  modalWeight.textContent  = `${(poke.weight  / 10).toFixed(1)} kg`;
  modalAbil.textContent    = poke.abilities
    .filter(a => !a.is_hidden)
    .map(a => a.ability.name)
    .join(', ');

  // Barras de stats
  modalStatBars.innerHTML = poke.stats.map(s => {
    const key    = s.stat.name;
    const label  = STAT_LABELS[key] || key;
    const cls    = STAT_CLASS[key]  || 'stat-hp';
    const val    = s.base_stat;
    const pct    = Math.min((val / 255) * 100, 100);

    return `
      <div class="stat-row">
        <span class="stat-row__name">${label}</span>
        <span class="stat-row__val">${val}</span>
        <div class="stat-row__bar">
          <div class="stat-row__fill ${cls}" data-width="${pct}%" style="width:0"></div>
        </div>
      </div>`;
  }).join('');

  // Cor de destaque do header do modal baseada no tipo
  modalOverlay.querySelector('.modal__header').style.setProperty(
    'border-bottom-color',
    `var(--type-${types[0]}, var(--red))`
  );
}

/** Anima as barras de stats do modal (largura de 0 → valor real) */
function animateStatBars() {
  document.querySelectorAll('.stat-row__fill').forEach(bar => {
    bar.style.width = bar.dataset.width;
  });
}

/** Fecha o modal */
function closeModal() {
  modalOverlay.hidden = true;
  document.body.style.overflow = '';
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */

// Busca ao clicar no botão
searchBtn.addEventListener('click', handleSearch);

// Busca ao pressionar Enter no input
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

// Mostra/oculta botão de limpar conforme o input tem conteúdo
searchInput.addEventListener('input', () => {
  clearBtn.classList.toggle('visible', searchInput.value.length > 0);
});

// Limpa o input e volta à lista completa
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  clearBtn.classList.remove('visible');
  hideError();
  applyTypeFilter(state.currentType);
});

// Filtro por tipo
typeSelect.addEventListener('change', () => {
  // Limpa busca ao mudar o tipo
  searchInput.value = '';
  clearBtn.classList.remove('visible');
  hideError();
  applyTypeFilter(typeSelect.value);
});

// Fechar modal
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

// Fechar modal com Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modalOverlay.hidden) closeModal();
});

// Dispensar erro
errorDismiss.addEventListener('click', hideError);

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */

/**
 * Ponto de entrada da aplicação.
 * Carrega a lista inicial de Pokémons e os tipos disponíveis.
 */
async function init() {
  showLoader();

  try {
    // Carrega lista inicial e tipos em paralelo
    const [pokemonList, types] = await Promise.all([
      fetchInitialList(INITIAL_LOAD),
      fetchTypes(),
    ]);

    state.allPokemon = pokemonList;
    state.filtered   = [...pokemonList];

    populateTypeSelect(types);
    renderGrid(state.filtered);

  } catch (err) {
    showError('Erro ao carregar os Pokémons. Verifique sua conexão e recarregue a página.');
    grid.innerHTML = '';
  } finally {
    hideLoader();
  }
}

// Inicia a aplicação
init();
