const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface Cat {
    catId: string;
    url: string;
}


export const fetchCats = async (): Promise<Cat[]> => {
    const response = await fetch(`${apiUrl}/api/cats`);
    if (!response.ok) {
        throw new Error("Failed to fetch cats");
    }
    const data = await response.json();
    return data.data;
};


export const voteForCat = async (catId: string, voterId: string): Promise<void> => {
    const response = await fetch(`${apiUrl}/api/votes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ catId, voterId }),
    });

    if (!response.ok) {
        throw new Error("Failed to vote for cat");
    }
};
