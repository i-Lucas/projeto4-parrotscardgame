const Verificacao = (numero) => Validar(numero) === 'valido' && ParoImpar(numero) === 'par' ? true : false;
const Validar = (numero) => numero < 4 || numero > 14 ? 'invalido' : 'valido';
const ParoImpar = (numero) => numero % 2 === 0 ? 'par' : 'impar';
const Embaralhar = () => Math.random() - 0.5;
let arrayCartas = []

let condicao = false;

window.onload = () => {

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

        let cores = ['Amarelo', 'Azul', 'Vermelho', 'Rosa', 'Verde', 'Laranja', 'Cinza']
        let numeroDeCartas = numero / 2;
    
        for (let i = 0; i < numeroDeCartas; i++) {

            arrayCartas.push(`
            <div class="card">
                <div class="back-face face ${cores[i]}">Verso</div>
                <div class="front-face face" onclick="VirarCarta()">Frente</div>
            </div> `)
    
            arrayCartas.push(`
            <div class="card">
                <div class="back-face face ${cores[i]}">Verso</div>
                <div class="front-face face" onclick="VirarCarta()">Frente</div>
            </div> `)
        }
    
        arrayCartas.sort(Embaralhar);
        ColocarCartas(numero)
        console.log(arrayCartas)
    }
    
    function ColocarCartas(numero) {
    
        const lista = document.querySelector('section')
        for (let i = 0; i < numero; i++) {
            lista.innerHTML += arrayCartas[i]
        }
    }

}

// function VirarCarta() {
        
//     const frontFace = document.querySelector('.card')
//     frontFace.classList.toggle('front-face face')
//     console.log(frontFace)

//     // frontFace.classList.add('.front-face')


//     // console.log('carta virada')

// }

// <div class="back-face face ${cores[i]}" onclick="VirarCarta()>Verso</div>