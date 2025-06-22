
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

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
    return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
};

// Função para login de usuário
const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao realizar login' });
  }
};

// Função para autenticação via ORCID
const orcidLogin = async (req, res) => {
  const { code } = req.body;

  try {
    // Troca o código pelo token de acesso
    const tokenRes = await axios.post('https://orcid.org/oauth/token', null, {
      params: {
        client_id: process.env.ORCID_CLIENT_ID,
        client_secret: process.env.ORCID_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.ORCID_REDIRECT_URI,
      },
      headers: { Accept: 'application/json' },
    });

    const { access_token, orcid } = tokenRes.data;

    // Busca informações do usuário utilizando o token
    const personRes = await axios.get(`https://pub.orcid.org/v3.0/${orcid}/person`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        Accept: 'application/json',
      },
    });

    const given = personRes.data?.name?.['given-names']?.value || '';
    const family = personRes.data?.name?.['family-name']?.value || '';

    let user = await User.findOne({ orcidId: orcid });
    if (!user) {
      user = new User({
        nome: `${given} ${family}`.trim(),
        orcidId: orcid,
        tipo: 'pesquisador',
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login ORCID bem-sucedido', token });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao autenticar via ORCID' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  orcidLogin,
};