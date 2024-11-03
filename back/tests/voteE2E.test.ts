import request from "supertest";
import app from "../src/server";

describe("Vote API E2E", () => {
    it("should return all cats with their scores", async () => {
        const response = await request(app).get("/api/cats");
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("should prevent duplicate votes from the same voter", async () => {
        await request(app).post("/api/votes").send({ catId: "cat1", voterId: "voter1" });
        const duplicateVoteResponse = await request(app).post("/api/votes").send({ catId: "cat2", voterId: "voter1" });
        expect(duplicateVoteResponse.status).toBe(400);
        expect(duplicateVoteResponse.body).toHaveProperty("error");
    });
});
