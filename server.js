
import express  from "express";
import cors from "cors";
import pg from "pg";


const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "keeperApp",
  password: "Postgres",
  port: 5432,
});

db.connect();

app.get("/api/todolist", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM todolist ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/api/todolist", async (req, res) => {
  const { title, content } = req.body;

  try {
    const result = await db.query("INSERT INTO todolist (title, note) VALUES ($1, $2) RETURNING *", [title, content]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.delete("/api/todolist/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM todolist WHERE id = $1", [id]);
    res.send("Deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});