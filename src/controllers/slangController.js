const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        const slangs = await connection('slang').select('name', 'example', 'explanation', 'state', 'category', 'likes', 'id_user', 'id');
        return res.json(slangs);
    },

    async indexLikes(req, res) {
        const getLikes = await connection('slang').select('likes');
        return res.json(slangs);
    },

    async filter(req, res) {
        try {
            const { name } = req.body;
            console.log(name);

            const filterSlang = await connection('slang')
                .select('*')
                .where('name', 'ilike', `${name}%`);

            return res.status(200).json(filterSlang);
        } catch (error) {
            return res.status(400).json({ error: error })
        }

    },

    async filterState(req, res) {
        try {
            const { state } = req.query;

            const filterState = await connection('slang')
                .select('*')
                .where('state', state);

            return res.status(200).json(filterState);
        } catch (error) {
            return res.status(400).json({ error: error })
        }

    },


    async indexSlangsUser(req, res) {
        const id_user = req.headers.authorization;
        try {
            const slangs = await connection('slang')
                .select('*')
                .where('id_user', id_user);

            return res.json(slangs);
        } catch (error) {
            res.json(error)
        }
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
    },
    async like(req, res) {
        try {
            const { id } = req.params;

            const indexLikes = await connection('slang')
                .select('likes')
                .where('id', id)
                .first();

            indexLikes.likes = indexLikes.likes + 1;

            await connection('slang')
                .where('id', id)
                .update({
                    likes: indexLikes.likes,
                });
            return res.status(200).json(indexLikes.likes);
        } catch (error) {
            return res.status(400).json(error);
        };
    }
}