import { Request, Response } from "express";
import { TypeormCatRepository } from "../../infrastructure/repositories/TypeormCatRepository";
import { GetCatsWithScores } from "../../application/use_cases/GetCatsWithScores";
import logger from "../../utils/logger";
import { sendSuccess, sendError } from "../../utils/responseHandler";

const catRepository = new TypeormCatRepository();
const getCatsWithScores = new GetCatsWithScores(catRepository);

export const getAllCats = async (req: Request, res: Response) => {
    try {
        const cats = await getCatsWithScores.execute();
        logger.info("GET /cats - Cats retrieved successfully");

        return sendSuccess(res, cats, "Cats retrieved successfully");
    } catch (error) {
        logger.error("GET /cats - Failed to retrieve cats", { error: error instanceof Error ? error.message : error });

        return sendError(res, error instanceof Error ? error.message : "Failed to retrieve cats", 500);
    }
};
