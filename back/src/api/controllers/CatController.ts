import { Request, Response } from "express";
import { TypeormCatRepository } from "../../infrastructure/repositories/TypeormCatRepository";
import { GetCatsWithScores } from "../../application/use_cases/GetCatsWithScores";
import logger from "../../utils/logger";

const catRepository = new TypeormCatRepository();
const getCatsWithScores = new GetCatsWithScores(catRepository);

export const getAllCats = async (req: Request, res: Response) => {
    try {
        const cats = await getCatsWithScores.execute();
        logger.info("GET /cats - Cats retrieved successfully");
        res.json(cats);
    } catch (error) {
        logger.error("GET /cats - Failed to retrieve cats", error);
        res.status(500).json({ error: "Failed to retrieve cats" });
    }
};
