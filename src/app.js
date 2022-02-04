// retorna true caso as condições forem válidas
const Verificacao = (numero) => Validar(numero) === 'valido' && ParoImpar(numero) === 'par' ? true : false;

// verifica se as condições são válidas
const Validar = (numero) => numero < 4 || numero > 14 ? 'invalido' : 'valido';

// verifica se é par 
const ParoImpar = (numero) => numero % 2 === 0 ? 'par' : 'impar';

let condicao = false;
let arrayCartas = [];

// cronômetro
let cronometro = document.querySelector('.cronometro')
let intervalo = null;

// estatísticas
let tempoTotal = 0;
let totalJogadas = 0;

// verificar o fim do jogo
let CartasProFim = undefined;

// verificar movimentos mínimos (especial)
let movimentosMinimos = undefined;

// após todos elementos do DOM serem carregados
window.onload = () => {

  ObterCartas()
  function ObterCartas() {

    while (condicao == false) {
      let numero = prompt('Com quantas cartas queres jogar ? [Min: 4 Max: 14]')

      if (Verificacao(numero)) {
        MontarCartas(numero)
        condicao = true;
        // console.log(condicao)
      }
    }
  }

  function MontarCartas(numero) {

    let identificador = ['html5', 'css', 'JS', 'csharp', 'python', 'typescript', 'php']
    let cartas = numero / 2; // by Felipe hehe

    // para verificar quantas cartas faltam pro jogo acabar
    CartasProFim = numero;
    // obtém o mínimo de movimentos necessários para terminar o jogo (especial)
    movimentosMinimos = cartas;

    // preenchendo o array com as cartas
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

    // colocando as cartas na mesa
    const mesa = document.querySelector('section')
    for (let i = 0; i < numero; i++) {
      mesa.innerHTML += arrayCartas[i]
    }
  }

  let naoPodeVirar = false;
  let cartaVirada = false;
  let primeiraCarta, segundaCarta;

  // obtendo todas as cartas da mesa
  const cartas = document.querySelectorAll('.memory-card');
  // loop para habilitar onclick nas cartas da mesa
  const HabilitarCartas = () => cartas.forEach(card => card.addEventListener('click', VirarCarta));

  Embaralhar(cartas)
  HabilitarCartas()

  function Embaralhar(cartas) {

    // console.log('Embaralhar Chamado')
    cronometro.innerHTML += 0
    IniciarCronometro()

    cartas.forEach(cartas => {
      cartas.style.order = Math.floor(Math.random() * 12);
    })
  }

  function VirarCarta() {

    // console.log('VirarCarta Chamado')
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
    // igual ? DesabilitarCartas() : DesvirarCarta();
    if (igual) {
      DesabilitarCartas();
      CartasProFim -= 2;
    }
    else {
      DesvirarCarta();
    }

    console.log('Jogadas ++')
    totalJogadas++
  }

  function DesabilitarCartas() {
    // console.log('DesabilitarCartas Chamado')
    primeiraCarta.removeEventListener('click', VirarCarta);
    segundaCarta.removeEventListener('click', VirarCarta);
    ResetarCartas();
  }

  // é chamado se a carta virada for a errada
  function DesvirarCarta() {

    // console.log('DesvirarCarta Chamado');
    naoPodeVirar = true;

    // após 1 segundo desvira a carta
    setTimeout(() => {
      primeiraCarta.classList.remove('flip');
      segundaCarta.classList.remove('flip');
      ResetarCartas();
    }, 1000);
  }

  function ResetarCartas() {

    // console.log('ResetarCartas chamado');
    [cartaVirada, naoPodeVirar] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
  }

  function VerificarFimDoJogo() {
    // console.log('VerificarFimDoJogo Chamado')

    if (CartasProFim === 0) {
      // especial
      if (totalJogadas === movimentosMinimos) {
        const h1 = document.querySelector('h1')
        h1.innerHTML = `VOCÊ É O CARA !!!`
        SoltarRojao()
        PararCronometro()

      }
      else
        BaterPalmas()
      PararCronometro()
    }
  }

  // cronômetro
  function IniciarCronometro() {
    intervalo = setInterval(AtualizarCronometro, 1000)
  }
  function AtualizarCronometro() {
    VerificarFimDoJogo()
    cronometro.innerHTML = parseInt(cronometro.innerHTML) + 1
    tempoTotal++;
  }
  function PararCronometro() {
    clearInterval(intervalo)
  }

  function BaterPalmas() {
    const pag = document.querySelector('head')
    pag.innerHTML += `<audio src="ogg/palmas.ogg" autoplay>`
    // pra dar tempo do som tocar !
    setTimeout(MostrarResultados, 800)
  }

  function SoltarRojao() {
    const pag = document.querySelector('head')
    pag.innerHTML += `<audio src="ogg/fogos.ogg" autoplay>`
    // pra dar tempo do som tocar !
    setTimeout(MostrarResultados, 2500)
  }

  function MostrarResultados() {
    alert(`Você ganhou em ${totalJogadas} jogadas!`)
    let resposta = prompt(`Fim do jogo ! Você terminou em ${tempoTotal} segundos ! Deseja jogar novamente ? (sim ou não)`)
    if (resposta === 'sim' || resposta === 'Sim' || resposta === 'SIM') {
      // Recarrega a página atual sem usar o cache
      document.location.reload(true);
    }
  }

}