
let usuarioString = sessionStorage.getItem("userData");
let usuarioObj = JSON.parse(usuarioString);

// Obtener el modal

var modal3 = document.getElementById("myModal-movimientos");

// Obtener el botón que abre el modal

var btn3 = document.getElementById("openModal-movimientos");

// Obtener el elemento que cierra el modal

var span3 = document.getElementById("closeModal-movimientos");

// Obtener el formulario
const registerForm = document.getElementById("register-user");


// Cuando el usuario hace clic en el botón, abre el modal
btn3.onclick = function() {  
     console.log(" se quito el modal en btn3 ");   
     getMovs(); 
     //   modal3.style.display = "block"; 

}

// Cuando el usuario hace clic en la 'x', cierra el modal
span3.onclick = function() {
    modal3.style.display = "none";
}

const button = document.getElementById("movimientos");
if (button) {
    button.addEventListener('click', getMovs);
} else {
    console.log('Element not found!');
   
}


function hola() {
    console.log("mensaje de prueba"); 
    alert("Hello!");
  }; 

// Manejar el envío del formulario
registerForm.onsubmit = function (event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    // Obtener los valores del formulario
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
 
    // Validar los datos (puedes agregar más validaciones)
    if (name && email && password) {
        // Mostrar los datos en la consola (puedes enviarlos a un servidor)
        console.log("Nombre:", name);
        console.log("Correo Electrónico:", email);
        console.log("Contraseña:", password);

        // Cerrar el modal después de registrar
        modal.style.display = "none";

        // Limpiar el formulario
        registerForm.reset();

        // Mostrar un mensaje de éxito (opcional)
        alert("Usuario registrado con éxito");
    } else {
        alert("Por favor, complete todos los campos.");
    }
};

// Selecciona todos los inputs con la clase "amount"
const amountInputs = document.querySelectorAll('.amount');

// Función para formatear el importe
function formatAmount(value) {
    // Elimina cualquier carácter que no sea número o punto decimal
    value = value.replace(/[^0-9.]/g, '');

    // Separa la parte entera y la parte decimal
    let parts = value.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1].slice(0,2) : '';

    // Formatea la parte entera con separadores de miles
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combina la parte entera y la parte decimal
    return integerPart + decimalPart;
}

// Aplica la validación y formato a cada input
amountInputs.forEach(input => {
    input.addEventListener('input', function (e) {
        e.target.value = formatAmount(e.target.value);
    });
});

// Cuando el usuario hace clic fuera del modal, cierra el modal
// puede que no sea neceario, se comenta temporal mente 
/* 
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
*/ 
// Obtiene y pinta los movimmientos  round   
/* 
formulario.addEventListener('click', async function(e) { 
    e.preventDefault()
 */ 
  async  function getMovs() {     
    const url = 'http://localhost:4000/api/Movimientos/todosMovimientos'; 
    /* 
    const fechaIni  = document.querySelector('#fechaIni').value    
    const fechaFin  = document.querySelector('#fechaFin').value
    const idcliente = document.querySelector('#idcliente').value
    */  

        console.log(" Dentro de la funcion GetMovs: ", usuarioObj)  
        const bodyjson = { 
            id_agente: usuarioObj.id_cliente,
            roluser: usuarioObj.roluser
        };          

          console.log("Antes de la consulta: ");  
          const respuesta = await fetch(url, {
                // mode: 'no-cors',  
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body : JSON.stringify(bodyjson)              
              });
              const data = await respuesta.json();
              console.log(data.body);  
              console.log(data.body.id);  

              const transacciones = data.body;    //  [...]; // Tu JSON aquí


              const productlist =  document.getElementById("product-list");   
              productlist.innerHTML = '';   
              
              transacciones.forEach((movs) => {
                if (movs.id >= 1) {

                 const productDiv =  document.createElement('div');  
                 productDiv.classList.add('product');  
                 productDiv.setAttribute('data-id', movs.num_round);   


                 const hit = document.createElement('h3'); 
                 hit.textContent =  ` Hit :  ${movs.num_hit}`;     
                 productDiv.appendChild(hit); 

                 const round = document.createElement('h3'); 
                 round.textContent =  `Número de Round :  ${movs.num_round}`;     
                 productDiv.appendChild(round);  

                 const precio = document.createElement('h3');  
                 const numeroTexto = movs.precio_inicial;  
                 const numero = parseFloat(numeroTexto);
                 console.log(numero.toLocaleString("en-US"));  // "1,234,567.89"
                 precio.textContent = `Precio Inicial: ${numero.toLocaleString("en-US")}` 
                 productDiv.appendChild(precio);  

                 const montoiniText  =  movs.monto_entrada; 
                 const MontoIni  = parseFloat(montoiniText);              
                 const monto = document.createElement('p');  
                 monto.textContent  = ` Monto Inversión: ${MontoIni.toLocaleString("en-US")}`;  
                 productDiv.appendChild(monto);  

                 /* 
                 const precioFin = document.createElement('p');  
                 const numeroFinTexto = movs.precio_final;  
                 const numeroFin = parseFloat(numeroFinTexto);
                 console.log(numeroFin.toLocaleString("en-US"));  // "1,234,567.89"
                 precioFin.textContent = `Precio hoy : ${numeroFin.toLocaleString("en-US")}` 
                 productDiv.appendChild(precioFin);  
                 */

                 const utilidad = document.createElement('p');  
                 const utilidadTexto = movs.utilidad_perdida; 
                 const numero1 = parseFloat(utilidadTexto);
                 console.log(numero1.toLocaleString("en-US"));  // "1,234,567.89"
                 utilidad.textContent = ` Rendimiento  : ${numero1.toLocaleString("en-US")}` 
                 productDiv.appendChild(utilidad);  

                  console.log(` id movs: ${movs.id}`); 
                  console.log(` id cliente : ${movs.id_cliente} está activa.`);
                  console.log(` Monto entrada: ${movs.monto_entrada}`);  
             
                  productlist.appendChild(productDiv);   

                }
                 // console.log( "valor de Global: ", global.sesionUser); 
              });


    function PreciBcoin () { 

        const url = 'https://api.coingecko.com/api/v3/simple/price';
        const options = {
          method: 'GET',
          headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-hFfXcXKJGYdXnaBocwehNfcK'}
        };
        
        fetch(url, options)
          .then(res => res.json())
          .then(json => console.log(json))
          .catch(err => console.error(err));
    }   

    }; 