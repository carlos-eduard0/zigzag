const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const connection = require('../database/connection');

module.exports = {
    async index(req, res){
        const indexUser = await connection('users')
        .select('*');

        return res.status(200).json({indexUser});
    },

    async create(req, res) {
        try {
            const { nome, email, estado, senha, confirma_senha } = req.body;
            const id = uuid();
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(senha, salt);

            if (senha !== confirma_senha || senha.length < 8) {
               return res.send({ message: "Verifique suas senhas" });
            }
            else {
                const user = await connection('users')
                    .select('id')
                    .where('email', email)
                    .first();

                if (!user) {
                    await connection('users').insert({
                        id,
                        nome,
                        email,
                        estado,
                        senha: hash
                    });

                    return res.send({ message: 'Usuário cadastrado com sucesso!', id });
                }
                else {
                    return res.send({ message: "Este usuário já está cadastrado, tente novamente!" });
                }
            }

        } catch (error) {
            return res.send({ message: "Ops! algo deu errado" });
        }

    },
    async update(req, res) {
        try {
            const id_user = req.headers.authorization;
            const { nome, email, estado } = req.body;
          
            await connection('users')
                .where('id', id_user)
                .update({
                    nome,
                    email,
                    estado,
                });
            return res.status(200).json({ message: "Sucesso!" })
        } catch (error) {
            return res.status(400).json(error);
        };
    },
}