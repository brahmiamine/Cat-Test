import { CatRepository } from "../../domain/repositories/CatRepository";
import logger from "../../utils/logger";

export class GetCatsWithScores {
    constructor(private catRepository: CatRepository) { }

    async execute() {
        try {
            const cats = await this.catRepository.findAll();
            logger.info("Fetched cats with scores successfully.", { count: cats.length });
            return cats;
        } catch (error) {
            logger.error("Failed to fetch cats with scores", error);
            throw error;
        }
    }
}
