// Definir las columnas de la tabla AG-Grid
let usuarioString = sessionStorage.getItem("userData");
let usuarioObj = JSON.parse(usuarioString);

var gridOptions;
var forms = document.querySelectorAll('.needs-validation')
var idMovimiento = 0, id_cliente = 0;

function modelUpdated() {
    var model = gridOptions.api.getModel();
    var totalRows = model.getTopLevelNodes().length;
    var processedRows = model.getRowCount();
    var eSpan = document.querySelector('#rowCount');
    eSpan.innerHTML = processedRows.toLocaleString("es-MX") + ' / ' + totalRows.toLocaleString("es-MX");
}

var columnDefs = [
    {
        headerName: "",
        width: 40,
        cellRenderer: function (params) {
            if (params.data.estatus != "B")
                return '<a data-toggle="tooltip" title="Click para editar usuario" color="#FF0000"><img src="src/img/edit2.png" width="30" height="30" class="gridIcon"></a>'
        },
        onCellClicked: function (params) {
            if (params.data.estatus != "B") {
                LimpiarFormulario();
                modal.style.display = "block";
                console.log(params.data.id)
                idMovimiento = params.data.id;
                id_cliente = params.data.id_cliente;
                console.log("idMovimiento", idMovimiento)

                $("#nombre_cliente").val(params.data.nom_cliente);
                $("#monto_entrada").val(params.data.monto_entrada); 
                $("#num_round").val(params.data.num_round); 

                 //  rhm  
                 $("#nombre_cliente").prop("disabled", true); 
                 $("#monto_entrada").prop("disabled", true); 
                 $("#valor_bcoin").prop("disabled", true);                  
                 $("#precio_inicial").prop("disabled", true); 
                 $("#fecha_entrada").prop("disabled", true); 

                $("#num_hit").val(params.data.num_hit);   
                $("#fecha_entrada").val(formatoFecha(params.data.fecha_entrada));

                $("#valor_bcoin").val(params.data.valor_bcoin);
                $("#precio_inicial").val(params.data.precio_inicial);
                $("#precio_final").val(params.data.precio_final);
                $("#monto_salida").val(params.data.monto_salida);
                //if (params.data.fecha_salida != null)
                    $("#fecha_salida").val(formatoFecha(params.data.fecha_salida));
                $("#utilidad_perdida").val(params.data.utilidad_perdida)
                $("#notas").val(params.data.notas)
            }
        }
    }, {
        headerName: "",
        width: 50,
        cellRenderer: function (params) {
            if (params.data.estatus == "A")
                return '<a data-toggle="tooltip" title="Click para dar baja movimiento" color="#FF0000"><img src="src/img/baja1.png" width="20" height="20" class="gridIcon"></a>'
        },
        onCellClicked: function (params) {
            if (params.data.estatus == "A")
                ConfirmarBaja("B", params.data.id);
        }
    },{
        headerName: "",
        width: 50,
        cellRenderer: function (params) {
            if (params.data.estatus == "B")
                return '<a data-toggle="tooltip" title="Click para activar movimiento" color="#FF0000"><img src="src/img/activar.png" width="20" height="20" class="gridIcon"></a>'
        },
        onCellClicked: function (params) {
            if (params.data.estatus == "B")
                ConfirmarBaja("A", params.data.id);
        }
    },
    {headerName: "Nombre Agente", field: "NombreAgente", sortable: true},
    { headerName: "Cliente", field: "nom_cliente", sortable: true },
    { headerName: "Monto entrada", field: "monto_entrada", sortable: true },
    { headerName: "Nùmero round", field: "num_round", sortable: true }, 
    { headerName: "Fecha entrada", field: "fecha_entrada", sortable: true },
    { headerName: "Valor bcoin", field: "valor_bcoin", sortable: true },
    { headerName: "Precio inicial", field: "precio_inicial", sortable: true },
    { headerName: "Precio_final", field: "precio_final", sortable: true }
];

// Configuración de la grilla
gridOptions = {
    columnDefs: columnDefs,
    rowData: null,  // Los datos se cargarán dinámicamente
    onGridReady: function (params) {
        gridOptions.api = params.api;
        gridOptions.columnApi = params.columnApi;
        console.log("Grid Ready - API Disponible")
        loadDataFromApi(); // Cargar l,os datos desde la API cuando el grid esté listo
    },
    rowHeight: 30,
    sideBar: false,
    pagination: false,
    
    suppressColumnMoveAnimation: true,
  
    //onModelUpdated: modelUpdated,
};


function loadDataFromApi() {
    const postData = {
        id_agente: usuarioObj.id,
        roluser: usuarioObj.roluser,
        estatus: $("#TipoEstatus").val()
    }

    fetch('http://localhost:4000/api/movimientos/todosMovimientos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Tipo de contenido
        },
        body: JSON.stringify(postData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Datos obtenidos desde la API:', data.body);
            if (gridApi) {
                gridApi.setGridOption("rowData", data.body); // Establecemos los datos obtenidos
            }
        })
        .catch(error => {
            console.log('Error al obtener los datos de la API:', error);
        });
}

function esMultiplo(a, b) {
    return a % b === 0;
}

function formatoFecha(fechaFormato) {

    let fecha = new Date(fechaFormato);
    let ano = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();
    mes = mes < 10 ? '0' + mes : mes;

    dia = dia < 10 ? '0' + dia : dia;
    return `${ano}-${mes}-${dia}`;
}

function AgregarMovimiento() {
    const __fecha_salida = null;
    if ($("#fecha_salida").val() != "") {
       let __fecha_salida = $("#fecha_salida").val();
    } 
    const postData = {
        id: idMovimiento,
        id_cliente: id_cliente,
        monto_entrada: $("#monto_entrada").val(),
        num_hit: $("#num_hit").val(), 
        fecha_entrada: $("#fecha_entrada").val(),
        valor_bcoin: $("#valor_bcoin").val(),
        precio_inicial: $("#precio_inicial").val(),
        precio_final: $("#precio_final").val() || 0,
        monto_salida: $("#monto_salida").val() || 0, 
      
        fecha_salida: $("#fecha_salida").val() || null, 
        utilidad_perdida: $("#utilidad_perdida").val(),
        estatus: "A", 
        num_round: ($("#monto_entrada").val() / 5000),
        id_agente: usuarioObj.id,
        notas: $("#notas").val()
    };

    console.log("postData", postData)
    // Realizamos la solicitud POST

    fetch('http://localhost:4000/api/movimientos', {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json', // Tipo de contenido
        },
        body: JSON.stringify(postData) // Convertimos los datos en formato JSON
    })
        .then(response => response.json())  // Convertimos la respuesta en JSON
        .then(data => {
            console.log('Respuesta de la API:', data);
            alert("Datos enviados con éxito");
            loadDataFromApi();
            modal.style.display = "none";
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            alert("Hubo un error al enviar los datos.");
        });
}

function LimpiarFormulario() {
    $("#nombre_cliente").val("");
    $("#nombre_cliente").prop("disabled", false); 

    $("#monto_entrada").val(""); 
    $("#monto_entrada").prop("disabled", false); 

    $("#num_hit").val("");   
    $("#valor_bcoin").val("");
    $("#valor_bcoin").prop("disabled", false); 
    $("#precio_inicial").val("");
    $("#precio_inicial").prop("disabled", false); 
    $("#precio_final").val("");
    $("#monto_salida").val("");
    $("#fecha_entrada").val("");
    $("#fecha_entrada").prop("disabled", false); 
    $("#fecha_salida").val("");  
    idMovimiento = 0;
    id_cliente = 0;
    $("#notas").val("");
}

function dev_formato_moneda_peruana(valor) {
    return Number.parseFloat(valor).toFixed(2)
}

const gridDiv = document.querySelector("#tblMovimientos");
gridApi = agGrid.createGrid(gridDiv, gridOptions)

var modal = document.getElementById("myModal-movimientos");
const btnNuevoMovimiento = document.getElementById("btnNuevoMovimiento");
var span = document.getElementById("modalclose");
 
// Agregar un event listener con parámetros
btnNuevoMovimiento.addEventListener("click", function () {
    modal.style.display = "block";
    LimpiarFormulario();   
});

span.onclick = function () {
    modal.style.display = "none";
    LimpiarFormulario();
}

document.getElementById('nombre_cliente').addEventListener('input', function () {
    const query = this.value;
    if (query.length > 0) {
        fetchSuggestions(query);
    } else {
        clearSuggestions();
    }
});

function fetchSuggestions(query) {
    // Asegúrate de reemplazar esta URL con la URL de tu API de autocompletado
    const url = `http://localhost:4000/api/clientes/autocomplete?query=${query}&id_agente=${usuarioObj.id}&roluser=${usuarioObj.roluser}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            showSuggestions(data.body);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function showSuggestions(suggestions) {
    const suggestionContainer = document.getElementById('autocomplete-suggestions');
    suggestionContainer.innerHTML = ''; // Limpiar sugerencias previas

    console.log("suggestions", suggestions)
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.textContent = suggestion.nom_cliente;
        div.addEventListener('click', function () {
            console.log("Elegi un nombre ");   
            document.getElementById('nombre_cliente').value = suggestion.nom_cliente;
            id_cliente = suggestion.id
            clearSuggestions(); 
            gethit();  
            document.getElementById("monto_entrada").focus();
        });
        suggestionContainer.appendChild(div);
        
    });
}

function clearSuggestions() {
    const suggestionContainer = document.getElementById('autocomplete-suggestions');
    suggestionContainer.innerHTML = ''; // Limpiar todas las sugerencias
}

const formulario = document.getElementById('myFormNuevoMovimiento');
const btnGuardarMovimiento = document.getElementById('btnGuardarMovimiento');
// Escuchar el evento de envío del formulario
btnGuardarMovimiento.addEventListener('click', function (event) {
    // Evitar el envío si el formulario no es válido

    if (!formulario.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }

    if (!$("#fecha_entrada").val().trim()) {
        alert("Es necesario registrar la fecha de Entrada. "); 
        return; 
    }

    // limpiamos valores que no van en el registro inicial 
    if (!$("#fecha_salida").val().trim()) {
        $("#fecha_salida").val(null); 
    }
    $("#precio_final").val("");  
    // Añadir o quitar clases de Bootstrap para mostrar los errores visualmente
    formulario.classList.add('was-validated');
    if (formulario.checkValidity()) {
        if (esMultiplo($("#monto_entrada").val(), 5000) == false) {
            alert("solo se aceptan multiplos de 5000")
            return;
        } else {
            AgregarMovimiento();
        }
    }
});

function ConfirmarBaja(estatus, idmovimiento) {
    let mensaje ="";
    if(estatus == "A"){
        mensaje = "¿Estás seguro de dar de activar el movimiento?";
    }
    if(estatus == "B"){
        mensaje = "¿Estás seguro de dar de baja el movimiento?";
    }
    let resultado = confirm(mensaje);
    if (resultado) {
        const postData = {
            id: idmovimiento,
            estatus: estatus
        };

        fetch('http://localhost:4000/api/movimientos', {
            method: 'PUT', // Método HTTP
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': token.replace(/"/g, '')
            },
            body: JSON.stringify(postData) // Convertimos los datos en formato JSON
        })
            .then(response => response.json())  // Convertimos la respuesta en JSON
            .then(data => {
                alert("Datos enviados con éxito");
                loadDataFromApi();
                modal.style.display = "none";
            })
            .catch(error => {
                console.error('Error al enviar los datos:', error);
                alert("Hubo un error al enviar los datos.");
            });
    } else {
        alert("Has cancelado la acción.");
    }
}

const selectElement = document.getElementById('TipoEstatus');
selectElement.addEventListener('change', function () {
    loadDataFromApi();
});

$(function () {

})


async function getPrecioCripto() {
    try {
        const respuesta = await  fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCMXN' )
        const datos = await respuesta.json();  
        console.log(`Precio: ${datos.price} MXN`); 
        return datos;    
        // BTCUSDT  
      } catch (error) {
        console.log('Error:', error.message);
      }        
}; 

 document.getElementById('monto_entrada').addEventListener('blur',  async function () { 

    // Busca precio Bitcoin 
   const datos = await getPrecioCripto(); 
   console.log( "Precio de retorno: ");
   console.log(datos.price); 
   //var valround = 0;  
   const num_round =  $("#monto_entrada").val();  
   console.log (num_round); 
   if  (num_round  % 5000 === 0) {   
       $("#num_round").val(num_round / 5000);   
       $("#valor_bcoin").val(5000 / datos.price);
   }  else {  
       $("#num_round").val(0);   
       //document.getElementById("monto_entrada").focus();  
       alert ("El valor de Monto de entrada no es correcto,  Favor de verificarlo ");      
   }
   $("#precio_inicial").val(datos.price); 
});

document.getElementById('monto_salida').addEventListener('blur',  async function () {
    // Busca precio Bitcoin 
   const datos = await getPrecioCripto(); 
   console.log( "Precio de retorno: ");
   console.log(datos.price); 
   //var valround = 0;  
   const num_round =  $("#monto_salida").val();  
   console.log (num_round); 
   if  (num_round  % 5000 != 0) {       
       alert ("El valor de Monto de Salida no es correcto,  Favor de verificarlo "); 
   }
   $("#precio_final").val(datos.price); 
});


// document.getElementById('nombre_cliente').addEventListener('click',  async  function () { 
async function gethit() {
    // Busca precio Bitcoin 
    const dataQuery =  { 
            id_cliente: id_cliente
        };  
   const Hit = await getNumHit(dataQuery); 
   console.log(" retorno de getNumhit:", Hit); 
   console.log(Hit); 
   $("#num_hit").val(Hit + 1);   
};

  async function getNumHit (query) {

   const url = `http://localhost:4000/api/movimientos/hit/`;
   return fetch(url, 
        {
            method: 'POST', // Método HTTP 
            headers: {
                'Content-Type': 'application/json',             
            },
            body: JSON.stringify(query) // Convertimos los datos en formato JSON
        }
    )
        .then(response => response.json())
        .then(data => { 

            if (!data?.body) {
                console.log("No hay datos en la respuesta para el hit ");
                return 0;
            } 
            console.log(data.body);              
            // return Number(data.body.num_hit);   
            return Number(data.body.num_hit);  
        })
        .catch(error => {
            console.log('Error fetching data:', error); 
            return 0; 
         });  
    
}