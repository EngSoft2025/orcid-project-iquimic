const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Função para registro de usuário
const registerUser = async (req, res) => {
  const { nome, email, senha, confirmarSenha, tipo } = req.body;

  if (senha !== confirmarSenha) {
    return res.status(400).json({ error: 'As senhas não conferem' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = new User({
      nome,
      email,
      senha: hashedPassword,
      tipo,
    });

    await newUser.save();
    return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar o usuário:', error);
    return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
};

// Função para login de usuário
const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verificar se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Comparar senha
    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Retornar o token com a resposta
    return res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    console.error('Erro no login:', error);  // Adicionando log para depuração
    return res.status(500).json({ error: 'Erro ao realizar login' });
  }
};

// Função para autenticação via ORCID
const orcidLogin = async (req, res) => {
  const { code } = req.body;
  try {
    const tokenRes = await axios.post(`${process.env.ORCID_BASE_URL}/oauth/token`, null, {
      params: {
        client_id: process.env.ORCID_CLIENT_ID,
        client_secret: process.env.ORCID_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.ORCID_REDIRECT_URI,
      },
      headers: { 'Accept': 'application/json' }
    });

    const { access_token, orcid } = tokenRes.data;
    console.log('token', access_token)

    const response = await axios.get(`${process.env.ORCID_API_BASE_URL}/${orcid}/person`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/vnd.orcid+json', // 👈 O header certo
      },
    });

    let user = await User.findOne({ orcidId: orcid });
    if (!user) {
      const given = response.data.name?.['given-names']?.value || '';
      const family = response.data.name?.['family-name']?.value || '';
      const email = response.data.emails?.email?.[0]?.email || '';
      user = await User.findOne({ email: email })
      if (!user) {
        user = new User({
          nome: `${given} ${family}`.trim(),
          orcidId: orcid,
          tipo: 'pesquisador',
          email: email,
        });
        await user.save();
      }
    }

    const token = jwt.sign({ userId: user._id, orcidToken: access_token, orcidId: orcid }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login ORCID bem-sucedido', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao autenticar via ORCID', message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  orcidLogin,
};