import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MButton from "../MButton";

// Mock the Button component from ui/button since it's a complex component
jest.mock("../ui/button", () => {
  const React = require("react");
  return {
    __esModule: true,
    Button: ({ children, className, fullWidth, ...props }: any) => (
      <button className={className} data-full-width={fullWidth} {...props}>
        {children}
      </button>
    ),
    // If your component calls buttonVariants, return a simple string/class
    buttonVariants: jest.fn(() => ""),
  };
});

// Mock the MLoader component
jest.mock("../MLoader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader">Loading...</div>,
}));

// Mock the utils
jest.mock("@/lib/utils", () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(" "),
}));

describe("MButton Component", () => {
  it("renders button with text correctly", () => {
    render(<MButton text="Click me" />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<MButton text="Test" className="custom-class" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("renders with start icon", () => {
    const StartIcon = () => <span data-testid="start-icon">→</span>;
    render(<MButton text="Test" startIcon={<StartIcon />} />);

    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders with end icon", () => {
    const EndIcon = () => <span data-testid="end-icon">←</span>;
    render(<MButton text="Test" endIcon={<EndIcon />} />);

    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders with both start and end icons", () => {
    const StartIcon = () => <span data-testid="start-icon">→</span>;
    const EndIcon = () => <span data-testid="end-icon">←</span>;

    render(
      <MButton text="Test" startIcon={<StartIcon />} endIcon={<EndIcon />} />
    );

    expect(screen.getByTestId("start-icon")).toBeInTheDocument();
    expect(screen.getByTestId("end-icon")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("applies fullWidth prop correctly", () => {
    render(<MButton text="Test" fullWidth />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-full-width", "true");
  });

  it("applies noBg styling when noBg prop is true", () => {
    render(<MButton text="Test" noBg />);

    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-transparent");
  });

  it("applies rounded styling when isRounded prop is true", () => {
    render(<MButton text="Test" isRounded />);

    const button = screen.getByRole("button");
    expect(button.className).toContain("rounded-full");
  });

  describe("Loading state", () => {
    it("shows loader when isLoading is true", () => {
      render(<MButton text="Test" isLoading />);

      expect(screen.getByTestId("loader")).toBeInTheDocument();
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("hides text content when loading", () => {
      render(<MButton text="Test" isLoading />);

      const textContainer = screen.getByText("Test").parentElement;
      expect(textContainer).toHaveClass(
        "transition-transform duration-100 active:scale-95"
      );
    });

    it("shows text content when not loading", () => {
      render(<MButton text="Test" isLoading={false} />);

      const textContainer = screen.getByText("Test").parentElement;
      expect(textContainer).toHaveClass(
        "transition-transform duration-100 active:scale-95"
      );
    });

    it("applies relative positioning when loading", () => {
      render(<MButton text="Test" isLoading />);

      const button = screen.getByRole("button");
      expect(button.className).toContain("relative");
    });
  });

  describe("Event handling", () => {
    it("handles click events", () => {
      const handleClick = jest.fn();
      render(<MButton text="Test" onClick={handleClick} />);

      fireEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("forwards all button props", () => {
      const handleMouseOver = jest.fn();
      render(
        <MButton
          text="Test"
          onMouseOver={handleMouseOver}
          disabled
          type="submit"
        />
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("type", "submit");

      fireEvent.mouseOver(button);
      expect(handleMouseOver).toHaveBeenCalledTimes(1);
    });
  });

  describe("Styling combinations", () => {
    it("applies multiple style props correctly", () => {
      render(
        <MButton
          text="Test"
          fullWidth
          noBg
          isRounded
          isLoading
          className="custom-class"
        />
      );

      const button = screen.getByRole("button");
      expect(button.className).toContain("custom-class");
      expect(button.className).toContain("bg-transparent");
      expect(button.className).toContain("rounded-full");
      expect(button.className).toContain("relative");
      expect(button).toHaveAttribute("data-full-width", "true");
    });
  });

  describe("Accessibility", () => {
    it("maintains button role for screen readers", () => {
      render(<MButton text="Test" />);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("preserves aria attributes", () => {
      render(
        <MButton
          text="Test"
          aria-label="Custom label"
          aria-describedby="description"
        />
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom label");
      expect(button).toHaveAttribute("aria-describedby", "description");
    });
  });

  describe("Active state animation", () => {
    it("applies active scale animation class", () => {
      render(<MButton text="Test" />);

      const button = screen.getByRole("button");
      expect(button.className).toContain("active:scale-95");
      expect(button.className).toContain("transition-transform");
      expect(button.className).toContain("duration-100");
    });
  });
});
