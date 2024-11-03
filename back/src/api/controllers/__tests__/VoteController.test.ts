import { Request, Response } from "express";
import { testDataSource } from "../../../config/ormconfig.test";
import { castVote } from "../VoteController";
import { Cat } from "../../../domain/entities/Cat";
import { Vote } from "../../../domain/entities/Vote";

describe("VoteController Integration Test", () => {
    beforeAll(async () => {
        if (!testDataSource.isInitialized) {
            await testDataSource.initialize();
        }
    });

    afterAll(async () => {
        if (testDataSource.isInitialized) {
            await testDataSource.destroy();
        }
    });

    beforeEach(async () => {
        const catRepository = testDataSource.getRepository(Cat);
        const voteRepository = testDataSource.getRepository(Vote);

        await voteRepository.clear();
        await catRepository.clear();

        await catRepository.save([
            { catId: "1", url: "http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg" },
            { catId: "2", url: "http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg" },
        ]);
    });

    it("should cast a vote successfully", async () => {
        const req = {
            body: {
                catId: "1",
                voterId: "unique-voter-id",
            },
        } as Request;

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        await castVote(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: expect.any(Number) }));
    });
});
