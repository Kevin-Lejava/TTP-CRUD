const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");
const { response } = require("express");
const bcrypt = require('bcrypt');

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

//ROUTES//

//add new user

app.post("/registerusers", async (req, res) => {
    try {
        const { username, password } = req.body;
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            [username, hashedPassword]);

        res.json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//validate user
app.post("/loginusers", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE username =$1", [
            username
        ]);

        if (user.rows.length === 0) {
            res.status(400).json({ error: "Username and/or password is incorrect" })
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            res.status(400).json({ error: "Username and/or password is incorrect" })
        }

        else res.status(200).json({ success: true });

        console.log(req.params);
    } catch (err) {
        console.error(err.message);
    }
});

//add new game
app.post("/games", async (req, res) => {
    try {
        const { title } = req.body;
        const newGame = await pool.query("INSERT INTO games (title) VALUES ($1) RETURNING *",
            [title]);

        res.json(newGame.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//get all games
app.get("/games", async (req, res) => {
    try {
        const allGames = await pool.query("SELECT * FROM games")
        res.json(allGames.rows)

    } catch (err) {
        console.error(err.message);
    }
});

//get a game
app.get("/games/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const game = await pool.query("SELECT * FROM games WHERE game_id =$1", [
            id
        ])
        res.json(game.rows[0])

        console.log(req.params);
    } catch (err) {
        console.error(err.message);
    }
});

//update a game
app.put("/games/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const updateGame = await pool.query("UPDATE games SET title = $1 WHERE game_id = $2",
            [title, id]
        );

        res.json("Game title was updated.")
    } catch {
        console.err(err.message);
    };
});

//delete a game
app.delete("/games/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteGame = await pool.query("DELETE FROM games WHERE game_id = $1",
            [id]
        );

        res.json("Game title was deleted.");
    } catch {
        console.err(err.message);
    };
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});