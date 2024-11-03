import { Router } from "express";
import { castVote } from "../controllers/VoteController";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

/**
 * @swagger
 * /api/votes:
 *   post:
 *     summary: Cast a vote for a specific cat
 *     tags: [Vote]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catId:
 *                 type: string
 *                 example: "e82"
 *               voterId:
 *                 type: string
 *                 example: "unique-fingerprint-or-ip"
 *     responses:
 *       201:
 *         description: Vote successfully
 *       400:
 *         description: You have already voted
 */
router.post("/", asyncHandler(castVote));

export default router;
