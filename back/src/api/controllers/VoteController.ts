import { Request, Response } from "express";
import { TypeormVoteRepository } from "../../infrastructure/repositories/TypeormVoteRepository";
import { VoteForCat } from "../../application/use_cases/VoteForCat";
import { voteSchema } from "../../validations/voteValidation";
import logger from "../../utils/logger";
import { sendSuccess, sendError } from "../../utils/responseHandler";
import { TypeormCatRepository } from "../../infrastructure/repositories/TypeormCatRepository";

const voteRepository = new TypeormVoteRepository();
const catRepository = new TypeormCatRepository();
const voteForCat = new VoteForCat(voteRepository, catRepository); // Pass

export const castVote = async (req: Request, res: Response) => {
    const parseResult = voteSchema.safeParse(req.body);

    if (!parseResult.success) {
        logger.warn("Validation failed for castVote", { errors: parseResult.error.errors });

        const errorMessages = parseResult.error.errors.map(issue => issue.message).join(", ");

        return sendError(res, errorMessages, 400);
    }

    const { catId, voterId } = parseResult.data;

    try {
        const vote = await voteForCat.execute(catId, voterId);
        logger.info("POST /votes - Vote successfully", { catId, voterId });
        return sendSuccess(res, vote, "Vote successfully", 201);
    } catch (error) {
        logger.error("POST /votes - Failed vote", { catId, voterId, error: error instanceof Error ? error.message : error });
        return sendError(res, error instanceof Error ? error.message : "An unknown error occurred", 400);
    }
};
