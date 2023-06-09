const userService = require('../service/service');

function getUserById(req, res) {
  const { id_user } = req.params;
  console.log(id_user);
  userService.getUserById(id_user, (error, results) => {
    if (error) {
      console.error('Error al obtener el usuario: ', error);
      res.status(500).send('Error al obtener el usuario');
    } else if (results.length === 0) {
      res.status(404).send('Usuario no encontrado');
    } else {
      const user = results[0];
      res.json(user);
    }
  });
}


function login(req, res) {
  const { usuario, password } = req.body;

  // Verificar si el usuario y la contraseña coinciden en la base de datos
  userService.login(usuario, password, (error, user) => {
    if (error) {
      console.error('Error al realizar el inicio de sesión: ', error);
      res.status(500).send('Error al realizar el inicio de sesión');
    } else if (!user) {
      res.status(401).send('Credenciales inválidas');
    } else {
      res.send({
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          name: user.nombre,
          email: user.correo
        }
      });
    }
  });
}


function createUser(req, res) {
  const user = req.body;
  userService.createUser(user, (error, results) => {
      if (error) {
          console.error('Error al crear el usuario', error);
          res.status(500).send('Error al crear el usuario');
      } else {
          res.send('Usuario creado correctamente');
      }
  });
}

module.exports = {
  getUserById,
  login,
  createUser,
};
