// FunÃ§Ã£o que Ã© ativada quando o usuÃ¡rio clica no article
function virarCard(elemento_clicado) {
    
    // O classList.toggle funciona como um interruptor de luz (liga/desliga):
    // - Se o card NÃƒO tem a classe 'girou', ele adiciona (virando o card).
    // - Se o card JÃ TEM a classe 'girou', ele remove (desvirando o card).
    elemento_clicado.classList.toggle('girou');
    
}

const dadosKwamis = {
    tikki: { nome: "Tikki", conceito: "Criação", joia: "Brincos", portador: "Marinette", cor: "#ff0033", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Tikki-1.webp" },
    plagg: { nome: "Plagg", conceito: "Destruição", joia: "Anel", portador: "Adrien", cor: "#33ff33", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Plagg.webp" },
    nooroo: { nome: "Nooroo", conceito: "TransmissÃ£o", joia: "Broche", portador: "Gabriel Agreste", cor: "#b366ff", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Nooroo.webp" },
    duusu: { nome: "Duusu", conceito: "EmoÃ§Ã£o", joia: "Broche de PavÃ£o", portador: "Nathalie", cor: "#3366ff", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Duusu.webp" },
    wayzz: { nome: "Wayzz", conceito: "ProteÃ§Ã£o", joia: "Pulseira", portador: "Nino / Mestre Fu", cor: "#33cc33", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Wayzz.webp" },
    trixx: { nome: "Trixx", conceito: "IlusÃ£o", joia: "Colar", portador: "Alya", cor: "#ff6600", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Trixx.webp" },
    pollen: { nome: "Pollen", conceito: "SubmissÃ£o", joia: "Pente", portador: "ChloÃ© / ZoÃ©", cor: "#ffcc00", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Pollen.webp" },
    sass: { nome: "Sass", conceito: "IntuiÃ§Ã£o", joia: "Pulseira de Cobra", portador: "Luka", cor: "#00cccc", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/SAAS.webp" },
    fluff: { nome: "Fluff", conceito: "EvoluÃ§Ã£o", joia: "RelÃ³gio de Bolso", portador: "Alix", cor: "#99ccff", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Fluff.webp" },
    longg: { nome: "Longg", conceito: "PerfeiÃ§Ã£o", joia: "Gargantilha", portador: "Kagami", cor: "#cc0000", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Longg.webp" },
    kaalki: { nome: "Kaalki", conceito: "MigraÃ§Ã£o", joia: "Ã“culos", portador: "Max", cor: "#cc9966", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Kaalki.webp" },
    daizzi: { nome: "Daizzi", conceito: "JubilaÃ§Ã£o", joia: "Tornozeleira", portador: "Rose", cor: "#ff99cc", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Daizzi.webp" },
    roaar: { nome: "Roaar", conceito: "ExaltaÃ§Ã£o", joia: "Anel de Dedo", portador: "Juleka", cor: "#cc00cc", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Roarr.webp" },
    xuppu: { nome: "Xuppu", conceito: "DerisÃ£o", joia: "Tiara", portador: "Kim", cor: "#ff9933", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Xuppu.webp" },
    mullo: { nome: "Mullo", conceito: "MultiplicaÃ§Ã£o", joia: "Colar de Rato", portador: "MylÃ¨ne", cor: "#ff6699", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Mullo.webp" },
    ziggy: { nome: "Ziggy", conceito: "PaixÃ£o", joia: "Presilhas", portador: "Nathaniel", cor: "#cccccc", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Ziggi.webp" },
    orikko: { nome: "Orikko", conceito: "PretensÃµes", joia: "Anel de Polegar", portador: "Marc", cor: "#ff9900", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Orikko.webp" },
    barkk: { nome: "Barkk", conceito: "AdoraÃ§Ã£o", joia: "Coleira", portador: "Sabrina", cor: "#cc6600", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Barkk.webp" },
    stompp: { nome: "Stompp", conceito: "DeterminaÃ§Ã£o", joia: "Piercing de Nariz", portador: "Ivan", cor: "#3366cc", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Stompp.webp" }
};

function mostrarKwami(id) {
    const display = document.getElementById('display-kwami');
    const kwami = dadosKwamis[id];
    //Envia a cor do Kwami para o CSS
    document.documentElement.style.setProperty('--cor-kwami', kwami.cor);

    // Injeta o HTML novo dentro do display
    // FIX: removido kwami.comida â€” campo nÃ£o existe no objeto dadosKwamis
    display.innerHTML = `
        <img src="${kwami.img}" alt="${kwami.nome}" class="kwami-animado">
        <div class="kwami-info">
            <h3>${kwami.nome}</h3>
            <p><strong>Conceito:</strong> ${kwami.conceito}</p>
            <p><strong>Joia:</strong> ${kwami.joia}</p>
            <p><strong>Portador:</strong> ${kwami.portador}</p>
        </div>
    `;

    // Marca o botÃ£o clicado como ativo e remove dos outros
    document.querySelectorAll('.kwami-menu button').forEach(btn => btn.classList.remove('ativo'));
    const btnAtivo = document.querySelector(`.kwami-menu button[onclick="mostrarKwami('${id}')"]`);
    if (btnAtivo) btnAtivo.classList.add('ativo');

    // Reinicia a animaÃ§Ã£o de fade-in
    display.classList.remove('fade-in');
    void display.offsetWidth; // Truque para resetar animaÃ§Ã£o CSS
    display.classList.add('fade-in');
}

// Banco de dados dos Miraculous
const dadosMiraculous = {
    'joaninha': { nome: "Miraculous da Joaninha", joia: "Brincos", conceito: "Criação", kwami: "Tikki", arma: "IoiÃ´", cor: "#ff0033", img: "https://static.wikia.nocookie.net/miraculousladybug/images/1/12/Miraculous_da_Joaninha_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260106145433&path-prefix=pt-br" },
    'gato': { nome: "Miraculous do Gato", joia: "Anel", conceito: "DestruiÃ§Ã£o", kwami: "Plagg", arma: "BastÃ£o", cor: "#33ff33", img: "https://static.wikia.nocookie.net/miraculousladybug/images/6/69/Miraculous_do_Gato_-_Carregado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20260401163749&path-prefix=pt-br" },
    'borboleta': { nome: "Miraculous da Borboleta", joia: "Broche", conceito: "TransmissÃ£o", kwami: "Nooroo", arma: "Bengala", cor: "#b366ff", img: "https://static.wikia.nocookie.net/miraculousladybug/images/4/42/Miraculous_da_Borboleta_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260108174715&path-prefix=pt-br" },
    'pavÃ£o': { nome: "Miraculous do PavÃ£o", joia: "Broche", conceito: "EmoÃ§Ã£o", kwami: "Duusu", arma: "Leque", cor: "#3366ff", img: "https://static.wikia.nocookie.net/miraculousladybug/images/2/24/Miraculous_do_Pav%C3%A3o_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260114152536&path-prefix=pt-br" },
    'tartaruga': { nome: "Miraculous da Tartaruga", joia: "Pulseira", conceito: "ProteÃ§Ã£o", kwami: "Wayzz", arma: "Escudo", cor: "#33cc33", img: "https://static.wikia.nocookie.net/miraculousladybug/images/6/63/Miraculous_da_Tartaruga_-_Carregado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20251014101234&path-prefix=pt-br" },
    'raposa': { nome: "Miraculous da Raposa", joia: "Colar", conceito: "IlusÃ£o", kwami: "Trixx", arma: "Flauta", cor: "#ff6600", img: "https://static.wikia.nocookie.net/miraculousladybug/images/d/d1/Miraculous_da_Raposa_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260112144832&path-prefix=pt-br" },
    'abelha': { nome: "Miraculous da Abelha", joia: "Pente de Cabelo", conceito: "SubmissÃ£o", kwami: "Pollen", arma: "PiÃ£o", cor: "#ffcc00", img: "https://static.wikia.nocookie.net/miraculousladybug/images/e/e7/Miraculous_da_Abelha_%28ativado%29.png/revision/latest/scale-to-width-down/1000?cb=20260113153239&path-prefix=pt-br" },
    'rato': { nome: "Miraculous do Rato", joia: "Colar com MedalhÃ£o", conceito: "MultiplicaÃ§Ã£o", kwami: "Mullo", arma: "Corda de Pular", cor: "#ff6699", img: "https://static.wikia.nocookie.net/miraculousladybug/images/7/72/Miraculous_do_Rato_%28ativado%29.png/revision/latest/scale-to-width-down/1000?cb=20260115162049&path-prefix=pt-br" },
    'boi': { nome: "Miraculous do Boi", joia: "Piercing de Nariz", conceito: "DeterminaÃ§Ã£o", kwami: "Stompp", arma: "Martelo", cor: "#3366cc", img: "https://pbs.twimg.com/media/GxcGlPZWgAEmczh.jpg" },
    'tigre': { nome: "Miraculous do Tigre", joia: "Pulseira de Panjas", conceito: "ExaltaÃ§Ã£o", kwami: "Roaar", arma: "Boleadeira", cor: "#cc00cc", img: "https://preview.redd.it/miraculous-of-the-tiger-the-power-of-elation-v0-zszndkb1wgoe1.png?width=1080&crop=smart&auto=webp&s=5ef152519b0822e292542e4f1f4ee652da4dd6ec" },
    'coelho': { nome: "Miraculous do Coelho", joia: "RelÃ³gio de Bolso", conceito: "EvoluÃ§Ã£o", kwami: "Fluff", arma: "Guarda-chuva", cor: "#99ccff", img: "https://static.wikia.nocookie.net/miraculousladybug/images/a/ab/Miraculous_do_Coelho_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260121191903&path-prefix=pt-br" },
    'dragÃ£o': { nome: "Miraculous do DragÃ£o", joia: "Gargantilha", conceito: "PerfeiÃ§Ã£o", kwami: "Longg", arma: "Espada", cor: "#cc0000", img: "https://static.wikia.nocookie.net/miraculousladybug/images/d/dc/Miraculous_do_Drag%C3%A3o_-_Carregado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20260326193855&path-prefix=pt-br" },
    'cobra': { nome: "Miraculous da Cobra", joia: "Pulseira (Ouroboros)", conceito: "IntuiÃ§Ã£o", kwami: "Sass", arma: "Lira", cor: "#00cccc", img: "https://static.wikia.nocookie.net/miraculousladybug/images/0/0d/Miraculous_da_Cobra_-_Carregado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20251014101939&path-prefix=pt-br" },
    'cavalo': { nome: "Miraculous do Cavalo", joia: "Ã“culos", conceito: "MigraÃ§Ã£o", kwami: "Kaalki", arma: "Ferradura/Bumerangue", cor: "#cc9966", img: "https://static.wikia.nocookie.net/miraculousladybug/images/3/3a/Miraculous_do_Cavalo_-_Carregado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20251014102322&path-prefix=pt-br" },
    'cabra': { nome: "Miraculous da Cabra", joia: "Presilhas de Cabelo", conceito: "PaixÃ£o", kwami: "Ziggy", arma: "Pincel", cor: "#cccccc", img: "https://static.wikia.nocookie.net/miraculousladybug/images/2/24/Miraculous_da_Cabra_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260131000838&path-prefix=pt-br" },
    'macaco': { nome: "Miraculous do Macaco", joia: "Tiara", conceito: "DerisÃ£o", kwami: "Xuppu", arma: "BastÃ£o Ruyi Jingu Bang", cor: "#ff9933", img: "https://static.wikia.nocookie.net/miraculousladybug/images/e/ef/Miraculous_do_Macaco_-_Camuflado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20260330233644&path-prefix=pt-br" },
    'galo': { nome: "Miraculous do Galo", joia: "Anel de Polegar", conceito: "PretensÃ£o", kwami: "Orikko", arma: "Pena", cor: "#ff9900", img: "https://static.wikia.nocookie.net/miraculousladybug/images/1/16/Miraculous_do_Galo_-_Carregado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20260131175803&path-prefix=pt-br" },
    'cachorro': { nome: "Miraculous do Cachorro", joia: "Coleira", conceito: "AdoraÃ§Ã£o", kwami: "Barkk", arma: "Bola", cor: "#cc6600", img: "https://static.wikia.nocookie.net/miraculousladybug/images/b/be/Miraculous_do_Cachorro_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260131212320&path-prefix=pt-br" },
    'porco': { nome: "Miraculous do Porco", joia: "Tornozeleira de PÃ©rolas", conceito: "JubilaÃ§Ã£o", kwami: "Daizzi", arma: "Pandeiro", cor: "#ff99cc", img: "https://static.wikia.nocookie.net/miraculousladybug/images/4/47/Miraculous_do_Porco_%28ativado%29.png/revision/latest/scale-to-width-down/1000?cb=20260201135024&path-prefix=pt-br" }
};

// FunÃ§Ã£o para injetar os dados no HTML
function mostrarMiraculous(id) {
    const display = document.getElementById('display-miraculous');
    const miraculous = dadosMiraculous[id];
    //Envia a cor do Miraculous para o CSS
    document.documentElement.style.setProperty('--cor-miraculous', miraculous.cor);

    // Injeta o HTML novo dentro do display
    display.innerHTML = `
        <img src="${miraculous.img}" alt="${miraculous.nome}" class="fade-in">
        <div class="miraculous-info">
            <h3>${miraculous.nome}</h3>
            <p><strong>Formato:</strong> ${miraculous.joia}</p>
            <p><strong>Conceito:</strong> ${miraculous.conceito}</p>
            <p><strong>Kwami GuardiÃ£o:</strong> ${miraculous.kwami}</p>
            <p><strong>Arma:</strong> ${miraculous.arma}</p>
        </div>
    `;
    
    // Reinicia a animaÃ§Ã£o de fade-in
    display.classList.remove('fade-in');
    void display.offsetWidth; // Truque para resetar animaÃ§Ã£o CSS
    display.classList.add('fade-in');
}

// FunÃ§Ã£o para rolar o carrossel de temporadas
function moverCarrossel(direcao) {
    const track = document.getElementById('track-temporadas');
    // Calcula o tamanho de um card (300px) + o gap (20px) = 320px
    const tamanhoRolagem = 320; 
    
    // Se a direÃ§Ã£o for -1 rola pra esquerda, se for 1 rola pra direita
    track.scrollBy({
        left: tamanhoRolagem * direcao,
        behavior: 'smooth' // Faz a rolagem ser suave e nÃ£o de soco
    });
}

// EFEITO DO RASTRO DE LUZ ROXA NO CURSOR

document.addEventListener('mousemove', function(evento) {
    if (Math.random() > 0.4) return;

    const yoyo = document.createElement('img');
    yoyo.src = 'ioio_ladybug.png';
    yoyo.classList.add('rastro-yoyo');
    yoyo.style.left = (evento.pageX - 12) + 'px';
    yoyo.style.top  = (evento.pageY - 12) + 'px';

    document.body.appendChild(yoyo);
    setTimeout(() => yoyo.remove(), 600);
});

// =========================================================
// INTEGRAÃ‡ÃƒO COM A API REST, AUTENTICAÃ‡ÃƒO JWT E CRUD
// =========================================================

const API_URL = '/api';

const apiState = {
    token: sessionStorage.getItem('miraculous_token'),
    user: JSON.parse(sessionStorage.getItem('miraculous_user') || 'null'),
    contents: [],
    registerMode: false
};

const apiElements = {
    authDialog: document.getElementById('auth-dialog'),
    authForm: document.getElementById('auth-form'),
    authTitle: document.getElementById('auth-title'),
    authDescription: document.getElementById('auth-description'),
    authError: document.getElementById('auth-error'),
    authSubmit: document.getElementById('auth-submit'),
    toggleAuth: document.getElementById('toggle-auth'),
    nameField: document.getElementById('name-field'),
    name: document.getElementById('auth-name'),
    email: document.getElementById('auth-email'),
    password: document.getElementById('auth-password'),
    grid: document.getElementById('api-content-grid'),
    status: document.getElementById('api-status'),
    welcome: document.getElementById('welcome-message'),
    openAdmin: document.getElementById('open-admin'),
    logout: document.getElementById('logout'),
    adminDialog: document.getElementById('admin-dialog'),
    closeAdmin: document.getElementById('close-admin'),
    contentForm: document.getElementById('content-form'),
    editorTitle: document.getElementById('editor-title'),
    contentError: document.getElementById('content-error'),
    contentId: document.getElementById('content-id'),
    contentTitle: document.getElementById('content-title'),
    contentText: document.getElementById('content-text'),
    contentImage: document.getElementById('content-image'),
    contentOrder: document.getElementById('content-order'),
    cancelEdit: document.getElementById('cancel-edit')
};

async function requestApi(path, options = {}) {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (apiState.token) headers.Authorization = `Bearer ${apiState.token}`;

    const response = await fetch(`${API_URL}${path}`, { ...options, headers });
    const data = await response.json().catch(() => ({}));

    if (response.status === 401 && !path.startsWith('/auth/')) {
        clearApiSession();
        showAuthDialog();
        throw new Error('Sua sessão expirou. Entre novamente.');
    }

    if (!response.ok) {
        const message = Array.isArray(data.message) ? data.message.join(' ') : data.message;
        throw new Error(message || 'Não foi possi­vel concluir a operação.');
    }

    return data;
}

function saveApiSession(data) {
    apiState.token = data.accessToken;
    apiState.user = data.user;
    sessionStorage.setItem('miraculous_token', data.accessToken);
    sessionStorage.setItem('miraculous_user', JSON.stringify(data.user));
    updateApiSessionInterface();
}

function clearApiSession() {
    apiState.token = null;
    apiState.user = null;
    apiState.contents = [];
    sessionStorage.removeItem('miraculous_token');
    sessionStorage.removeItem('miraculous_user');
    updateApiSessionInterface();
    renderApiContents();
}

function updateApiSessionInterface() {
    const authenticated = Boolean(apiState.token);
    apiElements.openAdmin.hidden = !authenticated;
    apiElements.logout.hidden = !authenticated;
    apiElements.welcome.textContent = authenticated
        ? `Olá, ${apiState.user?.name || 'visitante'}. Estes conteúdos vieram do banco de dados.`
        : 'Entre para carregar os conteúdos cadastrados no banco de dados.';
}

function showAuthDialog() {
    if (!apiElements.authDialog.open) apiElements.authDialog.showModal();
}

function setRegisterMode(registerMode) {
    apiState.registerMode = registerMode;
    apiElements.nameField.hidden = !registerMode;
    apiElements.name.required = registerMode;
    apiElements.authTitle.textContent = registerMode ? 'Criar uma conta' : 'Entrar na Wiki';
    apiElements.authDescription.textContent = registerMode
        ? 'Cadastre um usuário para receber seu token de acesso.'
        : 'Faça login para carregar os conteúdos da API.';
    apiElements.authSubmit.textContent = registerMode ? 'Cadastrar' : 'Entrar';
    apiElements.toggleAuth.textContent = registerMode ? 'Já tenho uma conta' : 'Ainda não tenho conta';
    apiElements.authError.textContent = '';
}

async function loadApiContents() {
    if (!apiState.token) {
        showAuthDialog();
        return;
    }

    apiElements.status.textContent = 'Carregando conteúdos...';
    try {
        apiState.contents = await requestApi('/contents');
        renderApiContents();
        apiElements.status.textContent = `${apiState.contents.length} conteúdo(s) carregado(s) da API.`;
    } catch (error) {
        apiElements.status.textContent = error.message;
    }
}

function renderApiContents() {
    apiElements.grid.replaceChildren();

    if (!apiState.contents.length) {
        const empty = document.createElement('div');
        empty.className = 'api-empty-state';
        empty.textContent = apiState.token
            ? 'Nenhum conteÃºdo cadastrado. Abra o painel administrativo para criar o primeiro.'
            : 'FaÃ§a login para visualizar os conteÃºdos protegidos.';
        apiElements.grid.appendChild(empty);
        return;
    }

    apiState.contents.forEach((content) => {
        const article = document.createElement('article');
        article.className = 'api-content-card';

        const image = document.createElement('img');
        image.src = content.image;
        image.alt = `Imagem de ${content.title}`;
        image.loading = 'lazy';
        image.addEventListener('error', () => {
            image.src = 'ioio_ladybug.png';
        }, { once: true });

        const body = document.createElement('div');
        body.className = 'api-card-body';

        const order = document.createElement('span');
        order.className = 'api-order-badge';
        order.textContent = `ORDEM ${content.displayOrder}`;

        const title = document.createElement('h3');
        title.textContent = content.title;

        const text = document.createElement('p');
        text.textContent = content.text;

        const actions = document.createElement('div');
        actions.className = 'api-card-actions';

        const editButton = document.createElement('button');
        editButton.className = 'api-edit-button';
        editButton.type = 'button';
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editApiContent(content));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'api-delete-button';
        deleteButton.type = 'button';
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => deleteApiContent(content));

        actions.append(editButton, deleteButton);
        body.append(order, title, text, actions);
        article.append(image, body);
        apiElements.grid.appendChild(article);
    });
}

function resetContentEditor() {
    apiElements.contentForm.reset();
    apiElements.contentId.value = '';
    apiElements.editorTitle.textContent = 'Novo conteúdo';
    apiElements.contentError.textContent = '';
    apiElements.contentOrder.value = apiState.contents.length
        ? Math.max(...apiState.contents.map((item) => item.displayOrder)) + 1
        : 1;
}

function editApiContent(content) {
    apiElements.contentId.value = content.id;
    apiElements.contentTitle.value = content.title;
    apiElements.contentText.value = content.text;
    apiElements.contentImage.value = content.image;
    apiElements.contentOrder.value = content.displayOrder;
    apiElements.editorTitle.textContent = 'Editar conteúdo';
    apiElements.contentError.textContent = '';
    if (!apiElements.adminDialog.open) apiElements.adminDialog.showModal();
}

async function deleteApiContent(content) {
    if (!confirm(`Deseja excluir ${content.title}?`)) return;

    try {
        await requestApi(`/contents/${content.id}`, { method: 'DELETE' });
        await loadApiContents();
    } catch (error) {
        apiElements.status.textContent = error.message;
    }
}

apiElements.authForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    apiElements.authError.textContent = '';

    const body = {
        ...(apiState.registerMode && { name: apiElements.name.value }),
        email: apiElements.email.value,
        password: apiElements.password.value
    };

    try {
        const route = apiState.registerMode ? '/auth/register' : '/auth/login';
        const data = await requestApi(route, { method: 'POST', body: JSON.stringify(body) });
        saveApiSession(data);
        apiElements.authDialog.close();
        apiElements.authForm.reset();
        await loadApiContents();
    } catch (error) {
        apiElements.authError.textContent = error.message;
    }
});

apiElements.toggleAuth.addEventListener('click', () => setRegisterMode(!apiState.registerMode));

apiElements.logout.addEventListener('click', () => {
    clearApiSession();
    showAuthDialog();
});

apiElements.openAdmin.addEventListener('click', () => {
    resetContentEditor();
    apiElements.adminDialog.showModal();
});

apiElements.closeAdmin.addEventListener('click', () => apiElements.adminDialog.close());
apiElements.cancelEdit.addEventListener('click', resetContentEditor);

apiElements.contentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    apiElements.contentError.textContent = '';

    const id = apiElements.contentId.value;
    const body = {
        title: apiElements.contentTitle.value,
        text: apiElements.contentText.value,
        image: apiElements.contentImage.value,
        displayOrder: Number(apiElements.contentOrder.value)
    };

    try {
        await requestApi(id ? `/contents/${id}` : '/contents', {
            method: id ? 'PATCH' : 'POST',
            body: JSON.stringify(body)
        });
        apiElements.adminDialog.close();
        resetContentEditor();
        await loadApiContents();
    } catch (error) {
        apiElements.contentError.textContent = error.message;
    }
});

updateApiSessionInterface();
renderApiContents();

if (apiState.token) loadApiContents();
else showAuthDialog();