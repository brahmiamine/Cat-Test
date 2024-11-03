import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LikeButton from "../src/components/ui/LikeButton";

describe("LikeButton Component", () => {
  test("renders with default label", () => {
    render(<LikeButton onClick={() => {}} />);
    const buttonElement = screen.getByText("J'aime");
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders with custom label", () => {
    render(<LikeButton onClick={() => {}} label="Vote" />);
    const buttonElement = screen.getByText("Vote");
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const onClickMock = jest.fn();
    render(<LikeButton onClick={onClickMock} />);
    const buttonElement = screen.getByText("J'aime");

    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
