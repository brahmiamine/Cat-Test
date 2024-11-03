import React from "react";
import { render, screen } from "@testing-library/react";
import RankingItem from "../src/components/score/RankingItem";
import { Cat } from "../src/services/catService";

describe("RankingItem Component", () => {
  const mockCat: Cat = {
    catId: "1",
    name: "Chat Mignon",
    url: "/cat1.jpg",
    score: 100,
  };

  test("displays the cat image with correct src and alt attributes", () => {
    render(<RankingItem rank={1} cat={mockCat} />);

    const imageElement = screen.getByAltText(mockCat.name) as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();

    // Vérifie que le `src` contient l'URL de l'image (en tenant compte du système d'optimisation de `next/image`)
    expect(imageElement.src).toContain(encodeURIComponent(mockCat.url));
  });

  // Autres tests
});
