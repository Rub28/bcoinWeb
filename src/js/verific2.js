/* 
formulario.addEventListener('valida',  async function(e) { 
      e.preventDefault(); 
*/ 

const boton =  document.getElementById("b-valida");  

boton.addEventListener("click", function() { verifica() } );  

async function  verifica() {  
      /* 
      const password = document.querySelector('#password').value;
      //const usuario = document.querySelector('#usuario').value;

      console.log(password); 
      console.log(usuario);   
            */ 
      const url = 'http://localhost:4000/api/auth/login';
      const bodyJson = {
            user_name: "Richar",
            user_password: "123richar"
          };

      try {
            fetch(url, {
                  mode:'no-cors',  
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json', // Especifica que el cuerpo es en formato JSON
                  },
                  body: JSON.stringify(bodyJson), // Convertir el objeto JavaScript a una cadena JSON
                })
                  .then(respuesta => response.json())  // Parsear la respuesta JSON
                  .then(data => console.log('Éxito:', data))
                  .catch((error) => console.error('Error:', error));


        if (!respuesta.ok) throw new Error('Credenciales incorrectas');
        const data = await respuesta.json();
    
        // Maneja la respuesta del servidor aquí
        if (data.usuario) {
          window.location.href = 'principal.html';
        } else {
          alert('Acceso denegado');
        }
    
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    };