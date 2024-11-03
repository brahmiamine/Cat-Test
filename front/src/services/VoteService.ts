const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type Cat = {
    id: number;
    rank: number;
    name: string;
    score: number;
    url: string;
};

interface CatData {
    id: number;
    votes: { id: number; voterId: string; createdAt: string }[];
    url: string;
}


export const fetchCatScores = async (): Promise<Cat[]> => {
    const response = await fetch(`${apiUrl}/api/cats`);
    if (!response.ok) {
        throw new Error("Failed to fetch cat scores");
    }
    const data = await response.json();

    const catsWithScores: Cat[] = data.data.map((catData: CatData) => ({
        id: catData.id,
        rank: 0,
        name: `Chat ${catData.id}`,
        score: catData.votes.length,
        url: catData.url,
    }));


    catsWithScores.sort((a, b) => b.score - a.score);

    return catsWithScores.map((cat, index) => ({
        ...cat,
        rank: index + 1,
    }));
};
