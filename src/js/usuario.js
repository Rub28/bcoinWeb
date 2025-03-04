

import jwt  from ('jsonwebtoken'); 
const secret = 'miconstraseña2848330';   //'aes-256-cbc'; 


mainWindow = new BrowserWindow({webPreferences: {
  nodeIntegration: true
}});

// async function validaUser(usuario, password) {  
async function validaUser() {  
    // URL de la API
    const url = 'http://localhost:4000/api/auth/login';

    // Datos a enviar 
              const bodyJson = {
                user_name: "Richar",
                user_password: "123richar"
              };

    console.log(bodyJson); 

    const response = await fetch(url, {
            mode: 'no-cors', 
            method: 'post', 
            body: JSON.stringify(bodyJson),
            headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    
       // Uso
       // const decoficado = decodificarCabecera(data); 
       const decodificado = verificarToken(data.body);  
       console.log("Despues de Decodificar: "); 
       console.log(decodificado.rol_user);  

    return (data); 

 };    

  function verificarToken(token){
      return jwt.verify(token, secret);
  }; 

 module.exports = validaUser(); 

