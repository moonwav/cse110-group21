import { DatabaseSync } from "node:sqlite";
import { openDatabase, isInDatabase, findInDatabase, addToDatabase } from "../data/database";
import express from 'express';

const app = express();
app.use(express.json());

const db = openDatabase();

app.get('/api/players', (req, res) => {
    const query = db.prepare('SELECT * FROM players');
    const rows = query.all();
    res.json(rows);
});

app.post('/api/players', (req, res) => {
    const { name } = req.body;
    const insert = db.prepare('INSERT INTO players (name) VALUES (?)');
    insert.run(name);
    res.status(201).json({ status: 'created' });
});

app.listen(3001, () => console.log("Server running on port 3001"));
