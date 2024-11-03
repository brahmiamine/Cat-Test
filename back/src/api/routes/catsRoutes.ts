import { Router } from "express";
import { getAllCats } from "../controllers/CatController";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/cats:
 *   get:
 *     summary: Retrieve a list of all cats with their scores
 *     tags: [Cat]
 *     responses:
 *       200:
 *         description: A list of cats with their scores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   catId:
 *                     type: string
 *                     example: "e82"
 *                   url:
 *                     type: string
 *                     example: "http://example.com/cat.jpg"
 *                   score:
 *                     type: integer
 *                     example: 10
 */
router.get("/cats", asyncHandler(getAllCats));

export default router;
