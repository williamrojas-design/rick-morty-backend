import { Router, Request, Response } from "express";
import { Favorite } from "../models/Favorite";

const router = Router();
const HARDCODED_USER_ID = 1;

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Gestión de personajes favoritos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         userId:
 *           type: integer
 *         rickMortyCharId:
 *           type: integer
 */

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Obtiene los IDs de los personajes favoritos del usuario
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: Lista de IDs favoritos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: integer
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const favorites = await Favorite.findAll({
      where: { userId: HARDCODED_USER_ID },
      attributes: ["rickMortyCharId"],
    });

    const ids = favorites.map((fav) => fav.rickMortyCharId);

    res.json(ids);
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({ message: "Error al obtener favoritos" });
  }
});

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Agrega un personaje a favoritos
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rickMortyCharId
 *             properties:
 *               rickMortyCharId:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Favorito agregado correctamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", async (req: Request, res: Response) => {
  const { rickMortyCharId } = req.body;

  if (!rickMortyCharId) {
    return res.status(400).json({ message: "rickMortyCharId requerido" });
  }

  try {
    const fav = await Favorite.create({
      userId: HARDCODED_USER_ID,
      rickMortyCharId,
    });

    res.status(201).json({
      message: "Agregado a favoritos",
      favorito: fav,
    });
  } catch (error) {
    console.error("Error al agregar favorito:", error);
    res.status(500).json({ message: "Error al agregar favorito" });
  }
});

/**
 * @swagger
 * /api/favorites/{charId}:
 *   delete:
 *     summary: Elimina un personaje de favoritos
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: charId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eliminado correctamente
 *       404:
 *         description: Favorito no encontrado
 */
router.delete("/:charId", async (req: Request, res: Response) => {
  const { charId } = req.params;

  try {
    const deletedCount = await Favorite.destroy({
      where: { userId: HARDCODED_USER_ID, rickMortyCharId: charId },
    });

    if (deletedCount > 0) {
      res.json({ message: "Eliminado de favoritos" });
    } else {
      res.status(404).json({ message: "No se encontró el favorito" });
    }
  } catch (error) {
    console.error("Error al eliminar favorito:", error);
    res.status(500).json({ message: "Error al eliminar favorito" });
  }
});

export default router;
