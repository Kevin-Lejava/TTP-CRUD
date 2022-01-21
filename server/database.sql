CREATE DATABASE IF NOT EXISTS Videogames;

CREATE TABLE games(
    game_id SERIAL PRIMARY KEY,
    title varchar(255),
    user_id SERIAL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username varchar(255),
    password varchar(255)
);