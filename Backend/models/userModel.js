import connection from '../database.js';

const getUserByEmail = (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  return new Promise((resolve, reject) => {
    connection.execute(query, [email], (err, results) => {
      if (err) {
        console.error('Erreur lors de la requête :', err);
        return reject(err); 
      }
      resolve(results[0]);
    });
  });
};


// Créer un nouvel utilisateur
const createUser = async (id,name, email, hashedPassword) => {
const query = 'INSERT INTO users (id,name, email, password) VALUES ( ?, ? , ?, ?)';

const values = [id, name , email , hashedPassword];
connection.execute(query, values, (err, results) => {
  if (err) {
    console.error('Erreur lors de l\'insertion :', err);
    return;
  }

  console.log('Nouvel utilisateur ajouté, ID :', results.insertId);
});

};

export default { getUserByEmail, createUser };
