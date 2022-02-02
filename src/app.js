const verificar = (numero) => numero < 4 || numero > 14 ? true : false
const par = (numero) => numero % 2 === 0 ? true : false // par retorna true

const numeroDeCartas = prompt('Quantas cartas ?')
const condicao = false

seila(numeroDeCartas)

function seila(numero) {    

    while(condicao == false) {
   
        if(verificar(numero) == false && par(numero) == true ) { // true tru
            
            alert('DEU CERTO')
            condicao = true
        }
        else 
        alert('DEU ERRADO')
        condicao = false
    }
}

