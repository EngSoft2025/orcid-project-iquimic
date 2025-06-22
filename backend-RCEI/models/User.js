const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String },
  tipo: { type: String, enum: ['aluno', 'pesquisador'], required: true },
  orcidId: { type: String, unique: true },
  institution: { type: String },
  department: { type: String },  
  position: { type: String },   
  areas: { type: String },     
  notificationsEnabled: { type: Boolean, default: true },
  darkMode: { type: Boolean, default: false }, 
  publicProfile: { type: Boolean, default: true }, 
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
