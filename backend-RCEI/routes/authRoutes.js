const express = require('express');
const router = express.Router();
const { registerUser, loginUser, orcidLogin } = require('../controllers/authController');

// Rota de registro de usuário
router.post('/register', registerUser);

// Rota de login de usuário
router.post('/login', loginUser);

// Rota de login via ORCID
router.post('/orcid', orcidLogin);

module.exports = router;
