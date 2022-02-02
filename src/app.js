const Verificacao = (numero) => Validar(numero) === 'valido' && ParoImpar(numero) === 'par' ? true : false;
const Validar = (numero) => numero < 4 || numero > 14 ? 'invalido' : 'valido';
const ParoImpar = (numero) => numero % 2 === 0 ? 'par' : 'impar';
const Embaralhar = () => Math.random() - 0.5;

let condicao = false;

Inicio()

function Inicio() {

    while (condicao == false) {

        let numeroDeCartas = prompt('Com quantas cartas queres jogar ? [Min: 4 Max: 14]')

        if (Verificacao(numeroDeCartas)) {
            condicao = true;
            MontarCartas(numeroDeCartas)

        }
        console.log(condicao)
    }
}

function MontarCartas(numero) {

    const lista = document.querySelector('section')
    let arrayCartas = []

    for (let i = 0; i < numero; i++) {

        arrayCartas.push(`
        <div class="card ${i}">
            <div class="front-face face">Frente</div>
            <div class="back-face face">Verso</div>
        </div> `)

        lista.innerHTML += arrayCartas[i]

        // lista.innerHTML += `
        // <div class="card">
        //     <div class="front-face face">Frente</div>
        //     <div class="back-face face">Verso</div>
        // </div>
        // `
    }

    arrayCartas.sort(Embaralhar);
    console.log(arrayCartas)

}

