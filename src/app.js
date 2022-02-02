const Verificacao = (numero) => Validar(numero) === 'valido' && ParoImpar(numero) === 'par' ? true : false
const Validar = (numero) => numero < 4 || numero > 14 ? 'invalido' : 'valido'
const ParoImpar = (numero) => numero % 2 === 0 ? 'par' : 'impar'

let condicao = false

Inicio()

function Inicio() {

    while (condicao == false) {

        let numeroDeCartas = prompt('Quantas cartas ?')

        if (Verificacao(numeroDeCartas)) {
            condicao = true;
        }

        console.log(condicao)

    }
}

