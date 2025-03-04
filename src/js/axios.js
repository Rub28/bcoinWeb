const axios = require('axios');

// URL de la API
const url = 'http://localhost:4000/api/auth/login';

function  validausuario() {  
  // Enviar solicitud POST

  // Datos a enviar
const data = 
        {
          "user_name":"Richar",
          "user_password":"123richar"
        }; 

        const queryString = new URLSearchParams(data).toString();
        
axios.get(`http://localhost:4000/api/auth/login?${queryString}` 
)
  .then((response) => {
    console.log('Respuesta:',  response.data);
  })
  .catch((error) => { 
    console.log( (data));  
    console.error('Error:', error.response?.data || error.message);
  });
}

validausuario();  