// Definir las columnas de la tabla AG-Grid
const token = "Bearer " + sessionStorage.getItem('token');
let usuarioString = sessionStorage.getItem("userData");
let usuarioObj = JSON.parse(usuarioString);

var gridOptions;
var forms = document.querySelectorAll('.needs-validation')
var idUsuario = 0, id_cliente = 0;

function modelUpdated() {
    var model = gridOptions.api.getModel();
    var totalRows = model.getTopLevelNodes().length;
    var processedRows = model.getRowCount();
    var eSpan = document.querySelector('#rowCount');
    eSpan.innerHTML = processedRows.toLocaleString("es-MX") + ' / ' + totalRows.toLocaleString("es-MX");
}

function tipoUsuario() {
    console.log("llego a la funcion TipoUsuario"); 
    console.log(usuarioObj.roluser); 

    const select = document.getElementById("TipoUsuario"); 
    select.innerHTML  =  "";  
    var nuevasOpciones = [];   
    if (usuarioObj.roluser === "ADMIN")  { 
         nuevasOpciones.push (
        { value: "ADMIN", text: "ADMIN" },
        { value: "AGENTE", text: "AGENTE" },
        { value: "CLIENTE", text: "CLIENTE" }
         );
    }
    if (usuarioObj.roluser === "AGENTE")  { 
        console.log("Es agente "); 
         nuevasOpciones.push ( 
            { value: "CLIENTE", text: "CLIENTE" }
         );
    };  
    // Agregar nuevas opciones
    nuevasOpciones.forEach((opcion) => {
      select.innerHTML += `<option value="${opcion.value}">${opcion.text}</option>`; 
    });
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
            console.log("Modifica", params)
            if (params.data.estatus != "B") {
                LimpiarFormulario();
                modal.style.display = "block";
                console.log(params.data.id)
                idUsuario = params.data.id;
                console.log("idUsuario", idUsuario)
                $("#password").val(params.data.user_password);
                $("#nombre_usuario").val(params.data.user_name);
                document.getElementById("nombre_usuario").disabled = true;
                $("#fist_name").val(params.data.firt_name);
                $("#second_name").val(params.data.second_name);
                $("#phone_number").val(params.data.phone_number);
                $("#email").val(params.data.email);
                $("#TipoUsuario").val(params.data.rol_user);                
                id_cliente = params.data.id_cliente;
                $("#nombre_cliente").val(params.data.nom_cliente);
            }

        }
    }, {
        headerName: "",
        width: 50,
        cellRenderer: function (params) {
            if (params.data.estatus != "B")
                return '<a data-toggle="tooltip" title="Click para dar baja usuario" color="#FF0000"><img src="src/img/baja1.png" width="20" height="20" class="gridIcon"></a>'
        },
        onCellClicked: function (params) {
            if (params.data.estatus != "B")
                ConfirmarBaja(params.data.id);
        }
    },
    { headerName: "Usuario", field: "user_name", sortable: true },
    { headerName: "Nombre", field: "firt_name", sortable: true },
    { headerName: "Apellidos", field: "second_name", sortable: true },
    { headerName: "Telefono", field: "phone_number", sortable: true },
    { headerName: "Correo", field: "email", sortable: true },
    { headerName: "Estatus", field: "estatus", sortable: true, maxWidth: 80 },
    { headerName: "Rol", field: "rol_user", sortable: true },
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
    //onModelUpdated: modelUpdated,
};

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('Token no proporcionado');
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(400).send('Token malformado o inválido');
        }
        req.user = decoded;
        next();
    });
}

function loadDataFromApi() {
    let estatus = $("#TipoEstatus").val();

    fetch(`http://srv743626.hstgr.cloud:4000/api/usuarios?id_agente=${usuarioObj.id}&roluser=${usuarioObj.roluser}&estatus=${estatus}`, {
        method: 'GET',
        headers: {
            'Authorization': token.replace(/"/g, ''),  // Incluimos el token en la cabecera de autorización
        }
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

function AgregarUsuario() {
    const postData = {
        id: idUsuario,
        user_name: $("#nombre_usuario").val(),
        user_password: $("#password").val(),
        firt_name: $("#fist_name").val(),
        second_name: $("#second_name").val(),
        phone_number: $("#phone_number").val(),
        email: $("#email").val(),
        estatus: "A",
        rol_user: $("#TipoUsuario").val(),
        id_cliente: id_cliente
    };
    // Realizamos la solicitud POST
 
    fetch('http://srv743626.hstgr.cloud:4000/api/Usuarios', {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json', // Tipo de contenido,
            'Authorization': token.replace(/"/g, '')
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
            alert("Hubo un error al enviar los datos.", error);
        });

}

function validaUsuario() {
    let mensaje = "";

    const postData = {
        user_name: $("#nombre_usuario").val(),
        phone_number: $("#phone_number").val(),
        email: $("#email").val(),
    };

    fetch(`http://srv743626.hstgr.cloud:4000/api/usuarios/validaUsuario`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token.replace(/"/g, ''),  // Incluimos el token en la cabecera de autorización
        },
        body: JSON.stringify(postData) // Convertimos los datos en formato JSON   
    })
        .then(response => response.json())
        .then(data => {
            console.log('Datos obtenidos desde la API:', data.body);

            Object.values(data.body).forEach(valor => {
                console.log("valor.email", valor.email);

                if (valor.user_name === $("#nombre_usuario").val())
                    mensaje = mensaje + "Usuario ya existe ";
                if (valor.email === $("#email").val())
                    mensaje = mensaje + "correo ya existe ";
                if (valor.phone_number === $("#phone_number").val())
                    mensaje = mensaje + "telefono ya existe ";
            });

            if (mensaje == "") {
                AgregarUsuario();
            } else {
                alert(mensaje);
            }
        })
        .catch(error => {
            console.log('Error al obtener los datos de la API:', error);
        });
}

function LimpiarFormulario() {
    $("#nombre_usuario").val("");
    $("#password").val("");
    $("#fist_name").val("");
    $("#second_name").val("");
    $("#phone_number").val("");
    $("#email").val("");
    $("#TipoUsuario").val("");
    idUsuario == 0;
    document.getElementById("nombre_usuario").disabled = false;
}

function ConfirmarBaja(idUsuario) {
    let resultado = confirm("¿Estás seguro de dar de baja al usuario?");
    if (resultado) {
        const postData = {
            id: idUsuario
        };

        fetch('http://srv743626.hstgr.cloud:4000/api/Usuarios', {
            method: 'PUT', // Método HTTP
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token.replace(/"/g, '')
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
    const url = `http://srv743626.hstgr.cloud:4000/api/clientes/autocomplete?query=${query}&id_agente=${usuarioObj.id}&roluser=${usuarioObj.roluser}`;

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
            document.getElementById('nombre_cliente').value = suggestion.nom_cliente;
            id_cliente = suggestion.id
            clearSuggestions();
        });
        suggestionContainer.appendChild(div);
    });
}

function clearSuggestions() {
    const suggestionContainer = document.getElementById('autocomplete-suggestions');
    suggestionContainer.innerHTML = ''; // Limpiar todas las sugerencias
}

const gridDiv = document.querySelector("#tblUsuarios");
gridApi = agGrid.createGrid(gridDiv, gridOptions)

var modal = document.getElementById("myModal-usuario");
const btnNuevoUser = document.getElementById("btnNuevoUser");
var span = document.getElementById("modalclose");
const myFormNuevoUsuario = document.getElementById('myFormNuevoUsuario');

// Agregar un event listener con parámetros
btnNuevoUser.addEventListener("click", function () {
    modal.style.display = "block";
    tipoUsuario();  

});

span.onclick = function () {
    modal.style.display = "none";
    LimpiarFormulario();
}


const formulario = document.getElementById('myFormNuevoUsuario');
const btnGuardarUsuarios = document.getElementById('btnGuardarUsuarios');
// Escuchar el evento de envío del formulario
btnGuardarUsuarios.addEventListener('click', function (event) {
    // Evitar el envío si el formulario no es válido

    if (!formulario.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Añadir o quitar clases de Bootstrap para mostrar los errores visualmente
    formulario.classList.add('was-validated');
    if (formulario.checkValidity()) {
        if (idUsuario === 0)
            validaUsuario();
        else {
            AgregarUsuario();
   
        }
    }
});

const selectElement = document.getElementById('TipoEstatus');
selectElement.addEventListener('change', function () {
    loadDataFromApi();
});

$(function () {
    // Loop over them and prevent submission
    /*
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        console.log("valido", form.checkValidity())
                        event.preventDefault()
                        event.stopPropagation();
    
                    }
                    if (form.checkValidity())
                        AgregarUsuario();
                    form.classList.add('was-validated')
                }, false)
            })
                */
}) 