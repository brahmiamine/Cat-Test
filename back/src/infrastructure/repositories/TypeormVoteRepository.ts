import { VoteRepository } from "../../domain/repositories/VoteRepository";
import { Vote } from "../../domain/entities/Vote";
import { AppDataSource } from "../database/data-source";

export class TypeormVoteRepository implements VoteRepository {
    private repository = AppDataSource.getRepository(Vote);

    async findByCatAndVoter(catId: string, voterId: string): Promise<Vote | null> {
        return this.repository.findOne({
            where: {
                cat: { catId },
                voterId,
            },
            relations: ["cat"],
        });
    }


    async save(vote: Vote): Promise<Vote> {
        return this.repository.save(vote);
    }
}
