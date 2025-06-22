const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String },
  tipo: { type: String, enum: ['aluno', 'pesquisador'], required: true },
  orcidId: { type: String, unique: true },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;