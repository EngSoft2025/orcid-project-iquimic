const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    confirmarSenha: { type: String, select: false },
    tipo: { type: String, required: true },
    orcidId: { type: String, unique: true, sparse: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;