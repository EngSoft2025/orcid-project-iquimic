const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const orcidRoutes = require('./routes/orcidRoutes');


// Carrega as variáveis de ambiente
dotenv.config();

// Inicializando o app Express
const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB conectado');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api', orcidRoutes);
// Porta do servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});