import { VoteRepository } from "../../domain/repositories/VoteRepository";
import { CatRepository } from "../../domain/repositories/CatRepository";
import { Vote } from "../../domain/entities/Vote";
import logger from "../../utils/logger";

export class VoteForCat {
    constructor(
        private voteRepository: VoteRepository,
    ) { }

    async execute(catId: string, voterId: string) {
        try {
            const vote = new Vote();
            vote.catId = catId;
            vote.voterId = voterId;

            const savedVote = await this.voteRepository.save(vote);
            logger.info("Vote saved successfully", { catId, voterId });
            return savedVote;
        } catch (error) {
            if (error instanceof Error && error.message.includes("duplicate key")) {
                logger.warn("Duplicate voter detected", { voterId });
                throw new Error("You have already voted.");
            }
            logger.error("Failed to save vote", { catId, voterId, error });
            throw error;
        }
    }
}
