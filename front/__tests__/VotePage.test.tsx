import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import VotePage from "../src/app/vote/page";
import { fetchCats, voteForCat } from "../src/services/CatService";
import { Cat } from "../src/services/CatService";

// Mock des fonctions pour simuler les appels API
jest.mock("../src/services/CatService");

describe("VotePage Component", () => {
  const mockCats: Cat[] = [
    { catId: "1", name: "Whiskers", url: "/cat1.jpg", score: 50, rank: 1 },
    { catId: "2", name: "Mittens", url: "/cat2.jpg", score: 45, rank: 2 },
    { catId: "3", name: "Shadow", url: "/cat3.jpg", score: 40, rank: 3 },
  ];

  beforeEach(() => {
    // Configure le mock pour `fetchCats`
    (fetchCats as jest.Mock).mockResolvedValue(mockCats);
    // Configure le mock pour `voteForCat`
    (voteForCat as jest.Mock).mockResolvedValue({});
  });

  test("fetches and displays the initial cats", async () => {
    render(<VotePage />);

    // Attendre que les données soient chargées
    await waitFor(() => {
      expect(fetchCats).toHaveBeenCalled();
    });

    // Vérifie que les deux premiers chats sont affichés pour voter
    expect(screen.getByAltText("Chat de gauche")).toBeInTheDocument();
    expect(screen.getByAltText("Chat de droite")).toBeInTheDocument();
  });

  test("allows voting for a cat and moves to the next cat", async () => {
    render(<VotePage />);

    // Attendre que les chats soient affichés
    await waitFor(() => {
      expect(screen.getByAltText("Chat de gauche")).toBeInTheDocument();
    });

    // Simuler un vote pour le chat de gauche
    const leftVoteButton = screen.getAllByText("J'aime")[0];
    fireEvent.click(leftVoteButton);

    // Vérifier que `voteForCat` est appelé avec les bons arguments
    expect(voteForCat).toHaveBeenCalledWith(mockCats[0].catId, expect.any(String));

    // Vérifie que le chat de droite devient le nouveau chat à gauche
    await waitFor(() => {
      expect(screen.getByAltText("Chat de droite")).toBeInTheDocument();
    });
  });

  test("shows and hides the ranking popup when toggled", async () => {
    render(<VotePage />);

    // Ouvrir le popup de classement
    const rankingButton = screen.getByText("Voir le classement des chats");
    fireEvent.click(rankingButton);

    // Vérifie que le popup de classement s'affiche
    await waitFor(() => {
      expect(screen.getByText("Revenir au vote")).toBeInTheDocument();
    });

    // Fermer le popup de classement
    const closeButton = screen.getByText("Revenir au vote");
    fireEvent.click(closeButton);

    // Vérifie que le popup est fermé
    await waitFor(() => {
      expect(screen.queryByText("Revenir au vote")).not.toBeInTheDocument();
    });
  });

  test("displays all cats and shows an alert when all have been shown", async () => {
    render(<VotePage />);

    // Simulez les votes jusqu'à épuiser la liste des chats
    for (let i = 0; i < mockCats.length; i++) {
      const voteButton = screen.getAllByText("J'aime")[0];
      fireEvent.click(voteButton);
    }

    // Vérifiez qu'une alerte est affichée pour indiquer que tous les chats ont été montrés
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Tous les chats ont été affichés et enregistrés !");
    });
  });
});
