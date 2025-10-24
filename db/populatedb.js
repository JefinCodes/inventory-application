const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ) NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 ) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS developers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 255 ) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS game_developers (
    game_id INT REFERENCES games(id) ON DELETE CASCADE,
    developer_id INT REFERENCES developers(id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, developer_id)
);

CREATE TABLE IF NOT EXISTS game_genres (
    game_id INT REFERENCES games(id) ON DELETE CASCADE,
    genre_id INT REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, genre_id)
);

INSERT INTO genres (name) VALUES ('action'), ('adventure'), ('arcade'), ('board'), ('card'), ('casual'), ('educational'), ('role-playing'), ('simulation'), ('strategy'), ('sports')
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();