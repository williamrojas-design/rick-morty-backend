import { Router, Request, Response } from "express";
import { Favorite } from "../models/Favorite";

const router = Router();

const HARDCODED_USER_ID = 1;

router.get("/", async (_req: Request, res: Response) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: HARDCODED_USER_ID },
      attributes: ['rickMortyCharId'] 
    });

    const ids = favorites.map(fav => fav.rickMortyCharId);
    
    res.json(ids);
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ message: "Error al obtener favoritos" });
  }
});


router.post("/", async (req: Request, res: Response) => {
  try {
    const { charId } = req.body;

    if (!charId) {
      res.status(400).json({ message: "El campo 'charId' es obligatorio" });
      return; 
    }

    console.log(`Intentando guardar favorito -> Usuario: ${HARDCODED_USER_ID}, Personaje: ${charId}`);

    const [fav, created] = await Favorite.findOrCreate({
      where: { 
        userId: HARDCODED_USER_ID, 
        rickMortyCharId: charId 
      }
    });

    if (created) {
      console.log("Favorito guardado exitosamente en BD.");
      res.status(201).json({ message: "Añadido a favoritos", data: fav });
    } else {
      console.log("ℹEl personaje ya estaba en favoritos.");
      res.status(200).json({ message: "Ya existe en favoritos" });
    }

  } catch (error) {
    console.error("ERROR CRÍTICO AL GUARDAR FAVORITO:", error);
    res.status(500).json({ message: "Error interno al guardar favorito", error });
  }
});


router.delete("/:charId", async (req: Request, res: Response) => {
  try {
    const { charId } = req.params;

    console.log(`Intentando eliminar favorito -> Usuario: ${HARDCODED_USER_ID}, Personaje: ${charId}`);

    const deletedCount = await Favorite.destroy({
      where: { 
        userId: HARDCODED_USER_ID, 
        rickMortyCharId: charId 
      }
    });

    if (deletedCount > 0) {
      console.log("✅ Favorito eliminado.");
      res.json({ message: "Eliminado de favoritos" });
    } else {
      console.log("⚠️ No se encontró el favorito para eliminar.");
      res.status(404).json({ message: "No se encontró el favorito" });
    }

  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    res.status(500).json({ message: "Error al eliminar favorito" });
  }
});

export default router;