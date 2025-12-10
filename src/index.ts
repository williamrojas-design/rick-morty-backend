import "reflect-metadata";
import express from "express";
import cors from "cors";
import { sequelize } from "./config/db";
import { getCharactersFromAPI } from "./services/rickMortyService";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/characters", async (req, res) => {
  try {
    const data = await getCharactersFromAPI();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo personajes" });
  }
});

const startServer = async () => {
  try {
    await sequelize.sync({ force: false, alter: true });
    console.log("Database connected & synced");
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();