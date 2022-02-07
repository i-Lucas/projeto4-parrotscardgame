const check = (n) => n % 2 != 0 || n > max || n < min ? true : false

// cronômetro
let cronometro = document.querySelector('.cronometro')
let intervalo = null;

// estatísticas
let tempoTotal = 0, totalJogadas = 0;

// verificar movimentos mínimos (especial)
let movimentosMinimos = 0, CartasProFim = 0; 

// cartas
let arrayCartas = [];
let min = 4, max = 14

let msg = `Com quantas cartas queres jogar ? [Min: ${min} Max: ${max}]`

window.onload = () => {

  ObterCartas()
  function ObterCartas() {

    let numero = prompt(msg)
    while (check(numero)) {
      numero = prompt(msg)
    }
    MontarCartas(numero)
  }

  function MontarCartas(numero) {

    let identificador = ['html5', 'css', 'JS', 'csharp', 'python', 'typescript', 'php']
    let cartas = numero / 2; // by Felipe :T

    CartasProFim = numero;
    movimentosMinimos = cartas;

    for (let i = 0; i < cartas; i++) {

      arrayCartas.push(`
      <div class="memory-card" data-identifier="card" data-carta="${identificador[i]}">
        <img class="front-face" src="img/${identificador[i]}.png" alt="${identificador[i]}" data-identifier="front-face"/>
        <img class="back-face" src="img/parrot.png" alt="The parrot" data-identifier="back-face"/>
      </div>  `)

      arrayCartas.push(`
      <div class="memory-card" data-identifier="card" data-carta="${identificador[i]}">
        <img class="front-face" src="img/${identificador[i]}.png" alt="${identificador[i]}" data-identifier="front-face"/>
        <img class="back-face" src="img/parrot.png" alt="The parot" data-identifier="back-face"/>
      </div>  `)
    }

    const mesa = document.querySelector('section')
    for (let i = 0; i < numero; i++) {
      mesa.innerHTML += arrayCartas[i]
    }
  }

  let naoPodeVirar = false, cartaVirada = false;
  let primeiraCarta, segundaCarta;

  const cartas = document.querySelectorAll('.memory-card');
  // loop para habilitar onclick nas cartas da mesa
  const HabilitarCartas = () => cartas.forEach(card => card.addEventListener('click', VirarCarta));

  Embaralhar(cartas)
  HabilitarCartas()

  function Embaralhar(cartas) {

    cronometro.innerHTML += 0
    intervalo = setInterval(AtualizarCronometro, 1000)

    cartas.forEach(cartas => {
      cartas.style.order = Math.floor(Math.random() * 12);
    })
  }

  function VirarCarta() {

    if (naoPodeVirar) return;
    if (this === primeiraCarta) return;

    this.classList.add('flip');

    if (!cartaVirada) {
      cartaVirada = true;
      primeiraCarta = this;
      return;
    }

    segundaCarta = this;
    VerificarCartasIguais();
  }

  function VerificarCartasIguais() {

    let igual = primeiraCarta.dataset.carta === segundaCarta.dataset.carta;
    if (igual) {
      DesabilitarCartas();
      CartasProFim -= 2;
    }
    else {
      DesvirarCarta();
    }

    totalJogadas++
  }

  function DesabilitarCartas() {

    primeiraCarta.removeEventListener('click', VirarCarta);
    segundaCarta.removeEventListener('click', VirarCarta);
    ResetarCartas();
  }

  function DesvirarCarta() {

    naoPodeVirar = true;

    setTimeout(() => {
      primeiraCarta.classList.remove('flip');
      segundaCarta.classList.remove('flip');
      ResetarCartas();
    }, 1000);
  }

  function ResetarCartas() {

    [cartaVirada, naoPodeVirar] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
  }

  function VerificarFimDoJogo() {

    if (CartasProFim === 0) {
      // é preciso ganhar sem errar nenhum movimento com no mínimo 8 cartas para liberar o especial
      if (totalJogadas >= 4 && totalJogadas === movimentosMinimos) {
        const h1 = document.querySelector('h1')
        h1.innerHTML = `PARABÉNS !!!`
        SoltarRojao()
        clearInterval(intervalo)
      }
      else
        BaterPalmas()
      clearInterval(intervalo)
    }
  }

  function AtualizarCronometro() {
    VerificarFimDoJogo()
    cronometro.innerHTML = parseInt(cronometro.innerHTML) + 1
    tempoTotal++;
  }

  function BaterPalmas() {
    const pag = document.querySelector('head')
    pag.innerHTML += `<audio src="ogg/palmas.ogg" autoplay>`
    // pra dar tempo do som tocar !
    setTimeout(MostrarResultados, 2500)
  }

  function SoltarRojao() {
    const pag = document.querySelector('head')
    pag.innerHTML += `<audio src="ogg/fogos.ogg" autoplay>`
    // pra dar tempo do som tocar !
    setTimeout(MostrarResultados, 2500)
  }

  function MostrarResultados() {
    alert(`Você ganhou em ${totalJogadas} jogadas!`)
    let resposta = prompt(`Fim do jogo ! Você terminou em ${tempoTotal} segundos ! Deseja jogar novamente ? digite [sim ou nao]`).toUpperCase();
    let respondeu = false;

    while (respondeu == false) {
      if (resposta == 'SIM') {
        respondeu = true;
        // Recarrega a página atual sem usar o cache
        return document.location.reload(true);
      } else if (resposta == 'NAO') {
        return undefined
      }
      resposta = prompt(`Deseja jogar novamente ? responda [sim ou nao]`).toUpperCase();
    }
  }

}

