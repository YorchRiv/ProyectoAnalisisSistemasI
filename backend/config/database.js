const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mejicanos145', // Cambia esto según tu configuración
  database: 'encuestas'
});

connection.connect((error) => {
  if (error) {
    console.error('Error conectando a la base de datos:', error);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

module.exports = connection.promise();
