
 
// import { jwr } from 'jsonwebtoken';   
// const jwr =  require('./js/decode.js');   

//  import { jwt_decode } from './jwt-decode.min.js';     
//global.sesionUser = {} 

function validaUserOtro(usuario,password){   
      (async () => {
            try { 
              // Consulta sin parámetros
              const usuarios = await getUserById(usuario);
              console.table(usuarios);
              return usuario; 
            } catch (error) {
              console.error(' Error en ejecuta :', error);
            }
          })();
}  
/* 
mainWindow = new BrowserWindow({webPreferences: {
      nodeIntegration: true
  }});
  */  

const formulario = document.querySelector('#formulario')
const mensaje = document.querySelector('#mensaje')


formulario.addEventListener('submit', async function(e) { 
   e.preventDefault()
 
   const password  =  document.querySelector('#password').value    
   const usuario     = document.querySelector('#usuario').value
   let roluser;  

   //const  data = validaUser(usuario, password);   
   const url = 'http://localhost:4000/api/auth/login';
          
            const bodyjson = { 
                  user_name: usuario,
                  user_password: password
            };

            console.log(bodyjson); 
        
            const respuesta = await fetch(url, {
                  // mode: 'no-cors',  
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body : JSON.stringify(bodyjson)              
                });
                const data = await respuesta.json();
                console.log(data); 
                 
                if (respuesta.ok) {
                     const sesion = jwt_decode(data.body); 
                     console.log("jwt_decode", jwt_decode(data.body))

                     console.log("data.body", data.body)

                     roluser = sesion.rol_user;   
                      const sesionUser =  { 
                        id: sesion.id, 
                        usuario: sesion.user_name, 
                        roluser: roluser, 
                        id_cliente: sesion.id_cliente || ''  // solo usuario cliente tiene valor.  
                      }
                      sessionStorage.setItem('userData', JSON.stringify(sesionUser));
                      sessionStorage.setItem('token', JSON.stringify(data.body));
                } else {
                                    
                  mensaje.textContent = 'Usuario NO valido, Verifiquelo con el Administrador.';  
                  mensaje.className = 'mensaje-error'
                  return; 
                   
                }
                
            
             if (roluser === 0  || roluser ==='' )  { 
                  mensaje.textContent = 'Usuario NO valido, Verifiquelo con el Administrador.';  
                  mensaje.className = 'mensaje-error'
                  return; 
             }  
   
            if( roluser === 'ADMIN' || roluser === 'AGENTE' ) {
                  //mensaje.textContent = 'contraseña correcta'                                    
                  window.location.href = 'principalAdmin.html'            
            } 
                        
            if ( roluser ===  'CLIENTE' )  {  
                 window.location.href = 'principalUser.html'                                          
            }     

 }); 

 function verificarToken(token){
      return jwt.verify(token, secret);
  };  

 async function validaUser() {  
      // URL de la API
      const url = 'http://localhost:4000/api/auth/login';

      console.log(body); 
  
      const response = await fetch(url, {
              mode: 'no-cors', 
              method: 'post', 
              body: JSON.stringify(body),
              headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json();
  
      console.log(data);
      return (data); 
  
   } ;



