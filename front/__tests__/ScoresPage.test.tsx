import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ScoresPage from "../src/app/score/page";
import { fetchCatScores } from "../src/services/VoteService";
import { Cat } from "../src/services/CatService";

// Mock de la fonction fetchCatScores
jest.mock("../src/services/VoteService", () => ({
  fetchCatScores: jest.fn(),
}));

describe("ScoresPage Component", () => {
  const mockCats: Cat[] = [
    { catId: "1", name: "Whiskers", url: "/images/whiskers.jpg", score: 120, rank: 1 },
    { catId: "2", name: "Mittens", url: "/images/mittens.jpg", score: 110, rank: 2 },
    { catId: "3", name: "Shadow", url: "/images/shadow.jpg", score: 100, rank: 3 },
    { catId: "4", name: "Tiger", url: "/images/tiger.jpg", score: 90, rank: 4 },
  ];

  beforeEach(() => {
    (fetchCatScores as jest.Mock).mockResolvedValue(mockCats);
  });

  test("fetches and displays cat scores", async () => {
    render(<ScoresPage />);

    // Attendre que les données de chats soient chargées
    await waitFor(() => {
      expect(fetchCatScores).toHaveBeenCalled();
    });

    // Vérifier que les noms des chats apparaissent dans le document
    mockCats.forEach((cat) => {
      expect(screen.getByText(cat.name)).toBeInTheDocument();
      expect(screen.getByText(`Score: ${cat.score} pts`)).toBeInTheDocument();
    });
  });

  test("displays the top 3 cats in the ranking section", async () => {
    render(<ScoresPage />);

    await waitFor(() => {
      // Vérifie que les trois premiers chats sont affichés dans la section du classement
      const topCats = mockCats.slice(0, 3);
      topCats.forEach((cat, index) => {
        const rankNumber = index + 1;
        expect(screen.getByText(rankNumber.toString())).toBeInTheDocument();
        expect(screen.getByText(cat.name)).toBeInTheDocument();
        expect(screen.getByText(`Score: ${cat.score} pts`)).toBeInTheDocument();
        const imageElement = screen.getByAltText(cat.name) as HTMLImageElement;
        expect(imageElement).toBeInTheDocument();
        expect(imageElement.src).toContain(encodeURIComponent(cat.url));
      });
    });
  });

  test("displays remaining cats in the grid", async () => {
    render(<ScoresPage />);

    await waitFor(() => {
      // Vérifie que les chats au-delà du Top 3 sont affichés dans la grille
      const gridCats = mockCats.slice(3);
      gridCats.forEach((cat) => {
        expect(screen.getByText(cat.name)).toBeInTheDocument();
        expect(screen.getByText(`Score: ${cat.score} pts`)).toBeInTheDocument();
        const imageElement = screen.getByAltText(cat.name) as HTMLImageElement;
        expect(imageElement).toBeInTheDocument();
        expect(imageElement.src).toContain(encodeURIComponent(cat.url));
      });
    });
  });

  test("displays an error message if fetching scores fails", async () => {
    // Simule une erreur de fetch
    (fetchCatScores as jest.Mock).mockRejectedValue(new Error("Failed to load scores"));

    render(<ScoresPage />);

    await waitFor(() => {
      const errorMessage = screen.getByText("Failed to load scores. Please try again later.");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
