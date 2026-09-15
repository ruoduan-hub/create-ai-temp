import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CounterCard } from "@/presentation/components/counter-card";

describe("CounterCard", () => {
  it("允许用户增加计数", () => {
    render(<CounterCard />);
    const value = screen.getByText("0");

    fireEvent.click(screen.getByRole("button", { name: "增加计数" }));

    expect(value).toHaveTextContent("1");
  });
});
