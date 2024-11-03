import { VoteRepository } from "../../domain/repositories/VoteRepository";
import { CatRepository } from "../../domain/repositories/CatRepository";
import { Vote } from "../../domain/entities/Vote";
import logger from "../../utils/logger";

export class VoteForCat {
    constructor(
        private voteRepository: VoteRepository,
        private catRepository: CatRepository
    ) { }

    async execute(catId: string, voterId: string) {
        try {
            const cat = await this.catRepository.findByCatId(catId);
            if (!cat) {
                throw new Error("Cat not found");
            }

            const vote = new Vote();
            vote.cat = cat;
            vote.voterId = voterId;

            const savedVote = await this.voteRepository.save(vote);
            logger.info("Vote saved successfully", { catId, voterId });
            return savedVote;
        } catch (error) {
            logger.error("Failed to save vote", { catId, voterId, error });
            throw error;
        }
    }
}
