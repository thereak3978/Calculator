const botonesNumero = document.querySelectorAll('.numero')
const display = document.getElementById('display')
const botonesOperacion = document.querySelectorAll('.operacion')
const botonClear = document.getElementById('btnClear')
const botonIgual = document.getElementById('btnIgual')
const botonDelete = document.getElementById('btnBorrar')

let primerNumero= ""
let segundoNumero= ""
let operacion= ""

botonIgual.addEventListener('click', calcular)

function agregarNumeroTeclado(numero) {
    segundoNumero += numero
    display.textContent = Number(segundoNumero).toLocaleString()
    console.log(segundoNumero)
}

document.addEventListener('keydown', (event)=>{
  
    if(event.repeat)
        return 

    if (event.key >= '0' && event.key <= '9') 
        agregarNumeroTeclado(event.key)
    

    if (event.key === 'Enter') 
        calcular()

})

botonesNumero.forEach((boton) => {
    boton.addEventListener('click', () => {

        segundoNumero += boton.textContent
        display.textContent = Number(segundoNumero).toLocaleString()
        console.log(segundoNumero)
        
    })
})


botonesOperacion.forEach((boton) =>{
    boton.addEventListener('click', async () => {
        if (primerNumero !== "" && segundoNumero !== "" && operacion !== "") {
            await calcular()
        }

        if (segundoNumero !== "") {
            primerNumero = segundoNumero
            segundoNumero = ""
        }

        operacion = boton.dataset.op
        console.log(operacion)
    }) 
})

botonClear.addEventListener('click', () => { // ESTO LIMPIA EL DISPLAY :D
    primerNumero = ""
    segundoNumero= ""
    display.textContent = "0"
    operacion = ""
})

async function calcular() {
    console.log("num1:",primerNumero,"num2:",segundoNumero, "op: ",operacion)
    if (segundoNumero === "" || primerNumero === "" || operacion === "") {
    return;
    }
    const datos ={
        num1:Number(primerNumero),
        num2:Number(segundoNumero),
        op: operacion
    }

    const resultado = await window.api.calcular(datos)
    console.log('resultado:', resultado)
    display.textContent = resultado.toLocaleString()
    primerNumero = ""
    segundoNumero = String(resultado) //Segundo numero almacena el resulatado
    operacion = ""
    return resultado
}

botonDelete.addEventListener('click', () =>{
    segundoNumero = segundoNumero.slice(0,-1)

    display.textContent = segundoNumero || "0"
})

    
