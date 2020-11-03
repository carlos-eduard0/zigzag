const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const slangs = await connection('slang').select('name', 'example', 'explanation', 'state', 'category', 'likes');
        return res.json(slangs);
    },
    async indexSlangsUser(req, res) {
        const id_user = req.headers.authorization;
        const slangs = await connection('slang')
            .select('name', 'example', 'explanation', 'state', 'category', 'likes')
            .where('id_user', id_user);

        return res.json(slangs);
    },
    async create(req, res) {
        const id_user = req.headers.authorization;
        const { name, example, explanation, state, category } = req.body;
        try {
            await connection('slang').insert({
                name,
                example,
                explanation,
                state,
                category,
                likes: 0,
                id_user: id_user,
            });
            return res.status(200).json({ message: "Sucesso!" });
        } catch (error) {
            return res.status(400).json(error);
        };
    },
    async update(req, res) {
        try {
            const id_user = req.headers.authorization;
            const { id } = req.params;
            const { name, example, explanation, state, category } = req.body;

            const indexLikes = await connection('slang')
                .select('likes')
                .where({ id: id, id_user: id_user })
                .first();

            await connection('slang')
                .where({ id: id, id_user: id_user })
                .update({
                    name,
                    example,
                    explanation,
                    state,
                    category,
                    likes: indexLikes.likes,
                    id_user: id_user,
                });
            return res.status(200).json({ message: "Sucesso!" })
        } catch (error) {
            return res.status(400).json(error);
        };
    }
}