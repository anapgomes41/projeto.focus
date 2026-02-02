// ===== Seletores =====
const html = document.querySelector("html")
const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBt = document.querySelector(".app__card-button--longo")
const botoes = document.querySelectorAll(".app__card-button")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const iniciarOuPausarBt = document.querySelector("#start-pause")
const textoBotao = iniciarOuPausarBt.querySelector("span")
const botaoPlay = document.querySelector(".app__card-primary-butto-icon")
const musicaFocoInput = document.querySelector("#alternar-musica")
const tempoNaTela = document.querySelector("#timer")

// ===== Áudios =====
const musica = new Audio("./sons/calma.mp3")
musica.loop = true
const audioPlay = new Audio("./sons/play.wav")
const audioPause = new Audio("./sons/pause.mp3")
const audioTempoFinalizado = new Audio("./sons/beep.mp3")

// ===== Timer =====
let tempoDecorridoEmSegundos = 1500
let intervaloId = null

// ===== Música =====
musicaFocoInput.addEventListener("change", () => {
    musicaFocoInput.checked ? musica.play() : musica.pause()
})

// ===== Contextos =====
focoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 1500
    mostrarTempo()
    alterarContexto("foco")
    focoBt.classList.add("active")
})

curtoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 300
    mostrarTempo()
    alterarContexto("descanso-curto")
    curtoBt.classList.add("active")
})

longoBt.addEventListener("click", () => {
    tempoDecorridoEmSegundos = 900
    mostrarTempo()
    alterarContexto("descanso-longo")
    longoBt.classList.add("active")
})

function alterarContexto(contexto) {
    botoes.forEach(botao => botao.classList.remove("active"))

    html.setAttribute("data-contexto", contexto)
    banner.setAttribute("src", `/imagens/${contexto}.png`)

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa</strong>
            `
            break

        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break

        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>
            `
            break
    }

    zerar()
}

// ===== Contagem regressiva =====
function contagemRegressiva() {
    if (tempoDecorridoEmSegundos <= 0) {
        audioTempoFinalizado.play()
        zerar()
        return
    }

    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

// ===== Botão iniciar / pausar =====
iniciarOuPausarBt.addEventListener("click", iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        audioPause.play()
        zerar()
        return
    }

    audioPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    textoBotao.textContent = "Pausar"
    botaoPlay.setAttribute("src", "/imagens/pause.png")
}

function zerar() {
    clearInterval(intervaloId)
    intervaloId = null
    textoBotao.textContent = "Começar"
    botaoPlay.setAttribute("src", "/imagens/play_arrow.png")
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    tempoNaTela.innerHTML = `${String(tempo.getMinutes()).padStart(2, "0")}:${String(tempo.getSeconds()).padStart(2, "0")}`
}

mostrarTempo()