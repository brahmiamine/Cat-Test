import { Request, Response } from "express";
import { testDataSource } from "../../../config/ormconfig.test";
import { getAllCats } from "../CatController";
import { Cat } from "../../../domain/entities/Cat";

describe("CatController Integration Test", () => {
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

        await catRepository.clear();

        await catRepository.save([
            { catId: "1", url: "http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg" },
            { catId: "2", url: "http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg" },
        ]);
    });

    it("should return all cats", async () => {
        const req = {} as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        await getAllCats(req, res);

        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.json).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ catId: "1", url: "http://24.media.tumblr.com/tumblr_m82woaL5AD1rro1o5o1_1280.jpg" }),
            expect.objectContaining({ catId: "2", url: "http://24.media.tumblr.com/tumblr_m29a9d62C81r2rj8po1_500.jpg" })
        ]));
    });
});
