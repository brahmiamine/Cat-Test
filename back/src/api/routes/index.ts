import express from "express";
import { getAllCats } from "../controllers/CatController";
import { castVote } from "../controllers/VoteController";
import { asyncHandler } from "../../utils/asyncHandler";

const router = express.Router();

router.get("/cats", asyncHandler(getAllCats));
router.post("/votes", asyncHandler(castVote));

export default router;


