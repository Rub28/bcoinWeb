
 const a = require('./usuario.js');   
// import  validaUser  from './usuario.js'

function ejecuta() { 
     console.log( " Inicia llamado  de ejecuta " );  
     const data = a.validaUser();   
     console.log(data); 
} 
 ejecuta();  