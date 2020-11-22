const connection = require('../database/connection');
const bcrypt = require('bcrypt');
module.exports = {
    async login(req, res) {
        const { email, senha } = req.body;

        const user = await connection('users')
            .where('email', email)
            .select('*')
            .first();

        if (!user) {
            return res.send({ message: "n existe" });
        }
        console.log(user);

        bcrypt.compare(senha, user.senha, function (err, result) {
            if (result == true) {
                return res.send({ user: user.id, message: 'logado' });
            } else {
                return res.json({ message: 'error' });
            }
        });
    },
}