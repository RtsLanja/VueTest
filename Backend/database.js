import mysql from 'mysql2';

//connexion à la base de données
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '',
  database: "planifyDB",
  port: 3307
})

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err.stack , "\n host" , process.env.DB_HOST);
    return;
  }
  console.log('Connecté à la base de données avec l\'ID', connection.threadId);
});

export default connection;
