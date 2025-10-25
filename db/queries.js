pool = require("./pool");

async function insertGame(name, genres, developers){
    const client = await pool.connect();
    try{
        await client.query('BEGIN');

        const insertGameRes = await client.query(
            'INSERT INTO games (name) VALUES ($1) RETURNING id',
            [name]
        );
        const gameId = insertGameRes.rows[0].id;

        for (const devName of developers) {
            const devRes = await client.query(
                `INSERT INTO developers (username) VALUES ($1)
                ON CONFLICT (username) DO UPDATE SET username = EXCLUDED.username
                RETURNING id`,
                [devName]
            );
            const developerId = devRes.rows[0].id;
            await client.query(
                'INSERT INTO game_developers (game_id, developer_id) VALUES ($1,$2) ON CONFLICT DO NOTHING',
                [gameId, developerId]
            );
        }

        for (const genreName of genres) {
            const genreRes = await client.query(
                `SELECT id FROM genres WHERE name = $1`,
                [genreName]
            );

            if (genreRes.rows.length === 0) {
                throw new Error(`Genre "${genreName}" not found in database.`);
            }

            const genreId = genreRes.rows[0].id;

            await client.query(
                `INSERT INTO game_genres (game_id, genre_id)
                VALUES ($1, $2)
                ON CONFLICT DO NOTHING`,
                [gameId, genreId]
            );
        }

        await client.query('COMMIT');

    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

module.exports = { insertGame };