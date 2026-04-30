// Função que é ativada quando o usuário clica no article
function virarCard(elemento_clicado) {
    
    // O classList.toggle funciona como um interruptor de luz (liga/desliga):
    // - Se o card NÃO tem a classe 'girou', ele adiciona (virando o card).
    // - Se o card JÁ TEM a classe 'girou', ele remove (desvirando o card).
    elemento_clicado.classList.toggle('girou');
    
}

const dadosKwamis = {
    tikki: { nome: "Tikki", conceito: "Criação", joia: "Brincos", portador: "Marinette", cor: "#ff0033", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Tikki-1.webp" },
    plagg: { nome: "Plagg", conceito: "Destruição", joia: "Anel", portador: "Adrien", cor: "#33ff33", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Plagg.webp" },
    nooroo: { nome: "Nooroo", conceito: "Transmissão", joia: "Broche", portador: "Gabriel Agreste", cor: "#b366ff", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Nooroo.webp" },
    duusu: { nome: "Duusu", conceito: "Emoção", joia: "Broche de Pavão", portador: "Nathalie", cor: "#3366ff", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Duusu.webp" },
    wayzz: { nome: "Wayzz", conceito: "Proteção", joia: "Pulseira", portador: "Nino / Mestre Fu", cor: "#33cc33", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Wayzz.webp" },
    trixx: { nome: "Trixx", conceito: "Ilusão", joia: "Colar", portador: "Alya", cor: "#ff6600", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Trixx.webp" },
    pollen: { nome: "Pollen", conceito: "Submissão", joia: "Pente", portador: "Chloé / Zoé", cor: "#ffcc00", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Pollen.webp" },
    sass: { nome: "Sass", conceito: "Intuição", joia: "Pulseira de Cobra", portador: "Luka", cor: "#00cccc", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/SAAS.webp" },
    fluff: { nome: "Fluff", conceito: "Evolução", joia: "Relógio de Bolso", portador: "Alix", cor: "#99ccff", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Fluff.webp" },
    longg: { nome: "Longg", conceito: "Perfeição", joia: "Gargantilha", portador: "Kagami", cor: "#cc0000", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Longg.webp" },
    kaalki: { nome: "Kaalki", conceito: "Migração", joia: "Óculos", portador: "Max", cor: "#cc9966", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Kaalki.webp" },
    daizzi: { nome: "Daizzi", conceito: "Jubilação", joia: "Tornozeleira", portador: "Rose", cor: "#ff99cc", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Daizzi.webp" },
    roaar: { nome: "Roaar", conceito: "Exaltação", joia: "Anel de Dedo", portador: "Juleka", cor: "#cc00cc", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Roarr.webp" },
    xuppu: { nome: "Xuppu", conceito: "Derisão", joia: "Tiara", portador: "Kim", cor: "#ff9933", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Xuppu.webp" },
    mullo: { nome: "Mullo", conceito: "Multiplicação", joia: "Colar de Rato", portador: "Mylène", cor: "#ff6699", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Mullo.webp" },
    ziggy: { nome: "Ziggy", conceito: "Paixão", joia: "Presilhas", portador: "Nathaniel", cor: "#cccccc", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Ziggi.webp" },
    orikko: { nome: "Orikko", conceito: "Pretensões", joia: "Anel de Polegar", portador: "Marc", cor: "#ff9900", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Orikko.webp" },
    barkk: { nome: "Barkk", conceito: "Adoração", joia: "Coleira", portador: "Sabrina", cor: "#cc6600", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Barkk.webp" },
    stompp: { nome: "Stompp", conceito: "Determinação", joia: "Piercing de Nariz", portador: "Ivan", cor: "#3366cc", img: "https://www.miraculousladybug.com/wp-content/uploads/2024/03/Stompp.webp" }
};

function mostrarKwami(id) {
    const display = document.getElementById('display-kwami');
    const kwami = dadosKwamis[id];
    //Envia a cor do Kwami para o CSS
    document.documentElement.style.setProperty('--cor-kwami', kwami.cor);

    // Injeta o HTML novo dentro do display
    // FIX: removido kwami.comida — campo não existe no objeto dadosKwamis
    display.innerHTML = `
        <img src="${kwami.img}" alt="${kwami.nome}" class="kwami-animado">
        <div class="kwami-info">
            <h3>${kwami.nome}</h3>
            <p><strong>Conceito:</strong> ${kwami.conceito}</p>
            <p><strong>Joia:</strong> ${kwami.joia}</p>
            <p><strong>Portador:</strong> ${kwami.portador}</p>
        </div>
    `;

    // Marca o botão clicado como ativo e remove dos outros
    document.querySelectorAll('.kwami-menu button').forEach(btn => btn.classList.remove('ativo'));
    const btnAtivo = document.querySelector(`.kwami-menu button[onclick="mostrarKwami('${id}')"]`);
    if (btnAtivo) btnAtivo.classList.add('ativo');

    // Reinicia a animação de fade-in
    display.classList.remove('fade-in');
    void display.offsetWidth; // Truque para resetar animação CSS
    display.classList.add('fade-in');
}

// Banco de dados dos Miraculous
const dadosMiraculous = {
    'joaninha': { nome: "Miraculous da Joaninha", joia: "Brincos", conceito: "Criação", kwami: "Tikki", arma: "Ioiô", cor: "#ff0033", img: "https://static.wikia.nocookie.net/miraculousladybug/images/1/12/Miraculous_da_Joaninha_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260106145433&path-prefix=pt-br" },
    'gato': { nome: "Miraculous do Gato", joia: "Anel", conceito: "Destruição", kwami: "Plagg", arma: "Bastão", cor: "#33ff33", img: "https://static.wikia.nocookie.net/miraculousladybug/images/6/69/Miraculous_do_Gato_-_Carregado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20260401163749&path-prefix=pt-br" },
    'borboleta': { nome: "Miraculous da Borboleta", joia: "Broche", conceito: "Transmissão", kwami: "Nooroo", arma: "Bengala", cor: "#b366ff", img: "https://static.wikia.nocookie.net/miraculousladybug/images/4/42/Miraculous_da_Borboleta_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260108174715&path-prefix=pt-br" },
    'pavão': { nome: "Miraculous do Pavão", joia: "Broche", conceito: "Emoção", kwami: "Duusu", arma: "Leque", cor: "#3366ff", img: "https://static.wikia.nocookie.net/miraculousladybug/images/2/24/Miraculous_do_Pav%C3%A3o_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260114152536&path-prefix=pt-br" },
    'tartaruga': { nome: "Miraculous da Tartaruga", joia: "Pulseira", conceito: "Proteção", kwami: "Wayzz", arma: "Escudo", cor: "#33cc33", img: "https://static.wikia.nocookie.net/miraculousladybug/images/6/63/Miraculous_da_Tartaruga_-_Carregado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20251014101234&path-prefix=pt-br" },
    'raposa': { nome: "Miraculous da Raposa", joia: "Colar", conceito: "Ilusão", kwami: "Trixx", arma: "Flauta", cor: "#ff6600", img: "https://static.wikia.nocookie.net/miraculousladybug/images/d/d1/Miraculous_da_Raposa_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260112144832&path-prefix=pt-br" },
    'abelha': { nome: "Miraculous da Abelha", joia: "Pente de Cabelo", conceito: "Submissão", kwami: "Pollen", arma: "Pião", cor: "#ffcc00", img: "https://static.wikia.nocookie.net/miraculousladybug/images/e/e7/Miraculous_da_Abelha_%28ativado%29.png/revision/latest/scale-to-width-down/1000?cb=20260113153239&path-prefix=pt-br" },
    'rato': { nome: "Miraculous do Rato", joia: "Colar com Medalhão", conceito: "Multiplicação", kwami: "Mullo", arma: "Corda de Pular", cor: "#ff6699", img: "https://static.wikia.nocookie.net/miraculousladybug/images/7/72/Miraculous_do_Rato_%28ativado%29.png/revision/latest/scale-to-width-down/1000?cb=20260115162049&path-prefix=pt-br" },
    'boi': { nome: "Miraculous do Boi", joia: "Piercing de Nariz", conceito: "Determinação", kwami: "Stompp", arma: "Martelo", cor: "#3366cc", img: "https://pbs.twimg.com/media/GxcGlPZWgAEmczh.jpg" },
    'tigre': { nome: "Miraculous do Tigre", joia: "Pulseira de Panjas", conceito: "Exaltação", kwami: "Roaar", arma: "Boleadeira", cor: "#cc00cc", img: "https://preview.redd.it/miraculous-of-the-tiger-the-power-of-elation-v0-zszndkb1wgoe1.png?width=1080&crop=smart&auto=webp&s=5ef152519b0822e292542e4f1f4ee652da4dd6ec" },
    'coelho': { nome: "Miraculous do Coelho", joia: "Relógio de Bolso", conceito: "Evolução", kwami: "Fluff", arma: "Guarda-chuva", cor: "#99ccff", img: "https://static.wikia.nocookie.net/miraculousladybug/images/a/ab/Miraculous_do_Coelho_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260121191903&path-prefix=pt-br" },
    'dragão': { nome: "Miraculous do Dragão", joia: "Gargantilha", conceito: "Perfeição", kwami: "Longg", arma: "Espada", cor: "#cc0000", img: "https://static.wikia.nocookie.net/miraculousladybug/images/d/dc/Miraculous_do_Drag%C3%A3o_-_Carregado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20260326193855&path-prefix=pt-br" },
    'cobra': { nome: "Miraculous da Cobra", joia: "Pulseira (Ouroboros)", conceito: "Intuição", kwami: "Sass", arma: "Lira", cor: "#00cccc", img: "https://static.wikia.nocookie.net/miraculousladybug/images/0/0d/Miraculous_da_Cobra_-_Carregado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20251014101939&path-prefix=pt-br" },
    'cavalo': { nome: "Miraculous do Cavalo", joia: "Óculos", conceito: "Migração", kwami: "Kaalki", arma: "Ferradura/Bumerangue", cor: "#cc9966", img: "https://static.wikia.nocookie.net/miraculousladybug/images/3/3a/Miraculous_do_Cavalo_-_Carregado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20251014102322&path-prefix=pt-br" },
    'cabra': { nome: "Miraculous da Cabra", joia: "Presilhas de Cabelo", conceito: "Paixão", kwami: "Ziggy", arma: "Pincel", cor: "#cccccc", img: "https://static.wikia.nocookie.net/miraculousladybug/images/2/24/Miraculous_da_Cabra_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260131000838&path-prefix=pt-br" },
    'macaco': { nome: "Miraculous do Macaco", joia: "Tiara", conceito: "Derisão", kwami: "Xuppu", arma: "Bastão Ruyi Jingu Bang", cor: "#ff9933", img: "https://static.wikia.nocookie.net/miraculousladybug/images/e/ef/Miraculous_do_Macaco_-_Camuflado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20260330233644&path-prefix=pt-br" },
    'galo': { nome: "Miraculous do Galo", joia: "Anel de Polegar", conceito: "Pretensão", kwami: "Orikko", arma: "Pena", cor: "#ff9900", img: "https://static.wikia.nocookie.net/miraculousladybug/images/1/16/Miraculous_do_Galo_-_Carregado_%28A2%29.png/revision/latest/scale-to-width-down/1000?cb=20260131175803&path-prefix=pt-br" },
    'cachorro': { nome: "Miraculous do Cachorro", joia: "Coleira", conceito: "Adoração", kwami: "Barkk", arma: "Bola", cor: "#cc6600", img: "https://static.wikia.nocookie.net/miraculousladybug/images/b/be/Miraculous_do_Cachorro_%28carregado%29.png/revision/latest/scale-to-width-down/1000?cb=20260131212320&path-prefix=pt-br" },
    'porco': { nome: "Miraculous do Porco", joia: "Tornozeleira de Pérolas", conceito: "Jubilação", kwami: "Daizzi", arma: "Pandeiro", cor: "#ff99cc", img: "https://static.wikia.nocookie.net/miraculousladybug/images/4/47/Miraculous_do_Porco_%28ativado%29.png/revision/latest/scale-to-width-down/1000?cb=20260201135024&path-prefix=pt-br" }
};

// Função para injetar os dados no HTML
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
            <p><strong>Kwami Guardião:</strong> ${miraculous.kwami}</p>
            <p><strong>Arma:</strong> ${miraculous.arma}</p>
        </div>
    `;
    
    // Reinicia a animação de fade-in
    display.classList.remove('fade-in');
    void display.offsetWidth; // Truque para resetar animação CSS
    display.classList.add('fade-in');
}

// Função para rolar o carrossel de temporadas
function moverCarrossel(direcao) {
    const track = document.getElementById('track-temporadas');
    // Calcula o tamanho de um card (300px) + o gap (20px) = 320px
    const tamanhoRolagem = 320; 
    
    // Se a direção for -1 rola pra esquerda, se for 1 rola pra direita
    track.scrollBy({
        left: tamanhoRolagem * direcao,
        behavior: 'smooth' // Faz a rolagem ser suave e não de soco
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