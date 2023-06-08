const db = require('../config/connection');

function getUserById(id, callback) {
  console.log(id);
  const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';
  db.query(query, [id], callback);
}

function login(usuario, password, callback) {
  const query = 'SELECT * FROM usuarios WHERE usuario = ? AND password = ?';
  db.query(query, [usuario, password], (error, results) => {
    if (error) {
      console.error('Error al realizar el inicio de sesión: ', error);
      callback(error, null);
    } else if (results.length === 0) {
      callback(false, null);
    } else {
      const user = {
        id: results[0].id_usuario,
        nombre: results[0].nombre,
        correo: results[0].correo
      };
      callback(null, user);
    }
  });
}

function createUser(user, callback) {
  const query = 'INSERT INTO usuarios (nombre, usuario, password, correo, telefono, id_nivel, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [user.nombre, user.usuario, user.password, user.correo, user.telefono, 2, user.tipo_usuario];

  db.query(query, values, (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      // Aquí puedes devolver el ID del usuario recién insertado o cualquier otro valor que desees
      callback(null, result.insertId);
    }
  });
}

module.exports = {
  getUserById,
  login,
  createUser,
};
