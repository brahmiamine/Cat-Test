import { Vote } from "../entities/Vote";

export interface VoteRepository {
    findByCatAndVoter(catId: string, voterId: string): Promise<Vote | null>;
    save(vote: Vote): Promise<Vote>;
}
