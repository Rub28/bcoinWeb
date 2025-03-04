// app.js
require('dotenv').config();

const express = require('express');
const app = express();

const port = process.env.DB_PORT || 3000;
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASSWORD;

console.log(dbHost);
console.log(dbUser); 
console.log(dbPass); 



app.get('/', (req, res) => {
  res.send(`Servidor corriendo en el puerto ${port}`);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log(`Conectando a la base de datos en ${dbHost} con el usuario ${dbUser}`);
});

