import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CatCard from "../src/components/vote/CatCard";
import { Cat } from "../src/services/catService";

describe("CatCard Component", () => {
  const mockCat: Cat = {
    catId: "1",
    name: "Whiskers",
    url: "/images/whiskers.jpg",
    score: 50,
  };

  test("displays the cat's name and image correctly", () => {
    render(<CatCard cat={mockCat} side="left" onVote={() => {}} />);

    // Vérifie que le nom du chat est affiché
    const nameElement = screen.getByText("Chat 1");
    expect(nameElement).toBeInTheDocument();

    // Vérifie que l'image du chat est affichée avec le bon alt et le bon src partiel
    const imageElement = screen.getByAltText("Chat left") as HTMLImageElement;
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toContain(encodeURIComponent(mockCat.url));
  });

  test("renders the vote button with the correct text", () => {
    render(<CatCard cat={mockCat} side="left" onVote={() => {}} />);

    // Vérifie que le bouton "J'aime" est affiché
    const buttonElement = screen.getByText("J'aime");
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onVote with the correct arguments when the button is clicked", () => {
    const onVoteMock = jest.fn();
    render(<CatCard cat={mockCat} side="left" onVote={onVoteMock} />);

    // Clic sur le bouton
    const buttonElement = screen.getByText("J'aime");
    fireEvent.click(buttonElement);

    // Vérifie que la fonction onVote a été appelée avec les bons arguments
    expect(onVoteMock).toHaveBeenCalledWith(mockCat.catId, "left");
  });
});
