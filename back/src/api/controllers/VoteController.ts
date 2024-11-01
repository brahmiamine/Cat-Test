import { Request, Response } from "express";
import { TypeormVoteRepository } from "../../infrastructure/repositories/TypeormVoteRepository";
import { TypeormCatRepository } from "../../infrastructure/repositories/TypeormCatRepository";
import { VoteForCat } from "../../application/use_cases/VoteForCat";
import { voteSchema } from "../../validations/voteValidation";
import logger from "../../utils/logger";

const catRepository = new TypeormCatRepository();
const voteRepository = new TypeormVoteRepository();
const voteForCat = new VoteForCat(voteRepository);

export const castVote = async (req: Request, res: Response) => {
    const parseResult = voteSchema.safeParse(req.body);
    if (!parseResult.success) {
        logger.warn("Validation failed for castVote", { errors: parseResult.error.errors });
        return res.status(400).json({ errors: parseResult.error.errors });
    }

    const { catId, voterId } = parseResult.data;

    try {
        const vote = await voteForCat.execute(catId, voterId);
        logger.info("POST /votes - Vote cast successfully", { catId, voterId });
        res.status(201).json(vote);
    } catch (error) {
        if (error instanceof Error) {
            logger.error("POST /votes - Failed to cast vote", { catId, voterId, error: error.message });
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};
