const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const connection = require('../database/connection');
module.exports = {
    async index(req, res){
        const indexUser = await connection('users')
        .select('*');

        return res.status(200).json(indexUser);
    },
    async create(req, res) {
        try {
            const { nome, email, estado, senha, confirma_senha } = req.body;
            const id = uuid();
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(senha, salt);

            if (senha !== confirma_senha || senha.length < 8) {
                res.status(400).json({ error: "Verifique suas senhas" });
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