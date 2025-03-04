// app.js
const  { getUserById }  = require('./server');

(async () => {
  try {
    // Consulta sin parámetros
    const usuarios = await getUserById('rub');
    console.table(usuarios); 
    console.log(usuarios); 

    // Consulta con parámetros (WHERE)
    /* 
    const usuarioId = 5;
    const usuario = await getUserById(
      'SELECT * FROM usuarios WHERE id = ?',
      [usuarioId]
    );
    console.log('Usuario específico:', usuario[0]);
    */
  } catch (error) {
    console.error(' Error en ejecuta :', error);
  }
})(); 


