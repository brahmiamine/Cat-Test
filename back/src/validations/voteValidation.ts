import { z } from "zod";

export const voteSchema = z.object({
    catId: z.string().min(1, { message: "catId is required" }),
    voterId: z.string().min(1, { message: "voterId is required" }),
});

export type VoteSchema = z.infer<typeof voteSchema>;
