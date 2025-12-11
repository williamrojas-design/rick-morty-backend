import "reflect-metadata";
import express from "express";
import cors from "cors";
import { sequelize } from "./config/db";
import favoriteRoutes from "./routes/FavoriteRoutes";
import { getCharactersFromAPI, getCharacterById } from "./services/rickMortyService";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/favorites", favoriteRoutes);

app.get("/api/characters", async (req, res) => {
  try {
    const data = await getCharactersFromAPI();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo personajes" });
  }
});

app.get("/api/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const character = await getCharacterById(id);
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el personaje" });
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