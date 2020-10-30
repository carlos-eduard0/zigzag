const crypto = require('crypto');
const bcrypt = require('bcrypt');
const connection = require('../database/connection');
module.exports = {
    async create(req, res) {
        try {
            const { nome, email, estado, senha, confirma_senha } = req.body;
            const id = crypto.randomBytes(4).toString('HEX');

            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(senha, salt);

            if (senha !== confirma_senha) {
                res.status(400).json({ message: "Suas senhas não conferem!" });
            }
            if (senha.length < 8) {
                res.status(400).json({ message: "Senha muita curta, mínimo 8 caracteres" });
            }
            else {
                const user = await connection('users')
                    .select('id')
                    .where('id', id)
                    .first();

                if (!user) {
                    await connection('users').insert({
                        id,
                        nome,
                        email,
                        estado,
                        senha: hash
                    });

                    return res.status(200).json({ message: 'Usuário cadastrado com sucesso!', id });
                }
                else {
                    return res.status(400).json({ message: "Este usuário já está cadastrado, tente novamente!" });
                }
            }

        } catch (error) {
            return res.status(400).json({ message: "Ops! algo deu errado" });
        }

    }
}