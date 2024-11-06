const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');


// Rota para listar todos os usuários
router.get('/listar-usuarios', userControllers.listAllUsers);

// Rota para cadastrar um novo usuário
router.post('/cadastrar-usuario', userControllers.insertNewUser);

// Rota para buscar um usuário pelo ID
router.get('/usuario/:id', userControllers.getUserById);

// Rota para atualizar um usuário pelo ID
router.put('/usuario/:id', userControllers.updateUserById);

// Rota para deletar um usuário pelo ID
router.delete('/usuario/:id', userControllers.deleteUserById);


module.exports = router;