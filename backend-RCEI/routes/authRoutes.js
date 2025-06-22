const express = require('express');
const router = express.Router();
const { registerUser, loginUser, orcidLogin, getUserData, updateUserData } = require('../controllers/authController');

// Rota de registro de usuário
router.post('/register', registerUser);

// Rota de login de usuário
router.post('/login', loginUser);

// Rota de login via ORCID
router.post('/orcid', orcidLogin);

// Rota para obter os dados do usuário autenticado
router.get('/user', getUserData);

// Rota para atualizar os dados do usuário
router.put('/user/settings', updateUserData); 

module.exports = router;