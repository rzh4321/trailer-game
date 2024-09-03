import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom"; // for the "toBeInTheDocument" and other matchers
import Home from "@/app/page";
import { prettyDOM } from "@testing-library/react";
import { CategoryProvider } from "@/hooks/CategoryContext";
import { act } from "react-dom/test-utils";

global.setImmediate =
  global.setImmediate ||
  ((fn: any, ...args: any) => setTimeout(fn, 0, ...args));
global.clearImmediate = global.clearImmediate || clearTimeout;
// Declare fetch as a mock function
// const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
// global.fetch = mockFetch;
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        dbCategories: [
          {
            id: 1,
            name: "Highest_critic",
            criticScore: 100,
            audienceScore: 100,
          },
          {
            id: 2,
            name: "Lowest_critic",
            criticScore: 0,
            audienceScore: 0,
          },
        ],
        avgCritic: 0,
        avgAudience: 0,
      }),
  }),
) as jest.Mock;

window.scrollTo = jest.fn();

describe("Home Page", () => {
  // Each test runs on the home page
  beforeEach(async () => {
    (global.fetch as jest.Mock).mockClear();
    await act(async () => {
      render(
        <CategoryProvider>
          <Home />
        </CategoryProvider>,
      );
    });
  });

  describe("Categories", () => {
    it("should render categories correctly on initial load", async () => {
      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(
          "/api/categories",
          expect.objectContaining({
            cache: "no-store",
          }),
        );
        const categoryElements = screen.getAllByText("Highest Critic");
        expect(categoryElements.length).toBe(2);
      });
    });
  });

  describe("Filters", () => {
    it("should not render any checkboxes initially", async () => {
      // No checkbox buttons are present initially
      await waitFor(() => {
        const checkboxButtons = screen.queryAllByRole("checkbox");
        expect(checkboxButtons.length).toBe(0);
      });
    });

    it("should not any render radio buttons initially", async () => {
      // No radio buttons are present initially
      await waitFor(() => {
        const radioButtons = screen.queryAllByRole("radio");
        expect(radioButtons.length).toBe(0);
      });
    });

    it("should render the filter buttons initially", async () => {
      await waitFor(() => {
        // console.log('Full document HTML:', prettyDOM(document.body, 100000));
        const sortButton = screen.getByText("SORT");
        expect(sortButton).toBeInTheDocument();

        const audienceScoreButton = screen.getByText("AUDIENCE SCORE");
        expect(audienceScoreButton).toBeInTheDocument();
      });
    });

    it("should open modal with 5 radio buttons and their labels when the SORT button is clicked", async () => {
      await waitFor(() => {
        // Click the SORT button
        const sortButton = screen.getByText("SORT");
        fireEvent.click(sortButton);

        const expectedLabels = [
          /A.*Z/i, // Match 'A' followed by any characters and then 'Z'. Need this because im using an arrow icon
          "TOMATOMETER® (HIGHEST)",
          "TOMATOMETER® (LOWEST)",
          "AUDIENCE SCORE (HIGHEST)",
          "AUDIENCE SCORE (LOWEST)",
        ];

        expectedLabels.forEach((labelText) => {
          const radioButton = screen.getByRole("radio", { name: labelText });
          expect(radioButton).toBeInTheDocument();
        });
      });
    });

    it("should open modal with 2 checkboxes and their labels when the AUDIENCE SCORE button is clicked", async () => {
      await waitFor(() => {
        // Click the AUDIENCE SCORE button
        const audienceScoreButton = screen.getByText("AUDIENCE SCORE");
        fireEvent.click(audienceScoreButton);

        // Check presence of checkboxes
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(2);

        // Check presence of FRESH label and its content
        const freshLabel = screen.getByText("FRESH");
        expect(freshLabel).toBeInTheDocument();
        const freshDescription = screen.getByText(
          /At least 60% of reviews for a movie or TV show are positive./i,
        );
        expect(freshDescription).toBeInTheDocument();

        // Check presence of the ROTTEN label and its content
        const rottenLabel = screen.getByText("ROTTEN");
        expect(rottenLabel).toBeInTheDocument();
        const rottenDescription = screen.getByText(
          /Less than 60% of reviews for a movie or TV show are positive./i,
        );
        expect(rottenDescription).toBeInTheDocument();
      });
    });

    it("should open modal with 3 checkboxes and their labels when the TOMATOMETER® button is clicked", async () => {
      await waitFor(() => {
        // Click the TOMATOMETER® button
        const tomatometerButton = screen.getByText("TOMATOMETER®");
        fireEvent.click(tomatometerButton);

        const expectedLabels = ["CERTIFIED FRESH", "FRESH", "ROTTEN"];

        const expectedDescriptions = [
          /A special distinction awarded to the best reviewed movies./i,
          /At least 60% of reviews for a movie are positive./i,
          /Less than 60% of reviews for a movie are positive./i,
        ];

        // Check presence of checkboxes
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(3);

        expectedLabels.forEach((labelText, index) => {
          // there should be two spans with text CERTIFIED FRESH
          if (labelText === "CERTIFIED FRESH") {
            const spans = screen.getAllByText(labelText);
            expect(spans.length).toBe(2);
          } else {
            const desc = screen.getByText(labelText);
            expect(desc).toBeInTheDocument();
          }
          const description = screen.getByText(expectedDescriptions[index]);
          expect(description).toBeInTheDocument();
        });
      });
    });

    it("should correctly filter the categories", async () => {
      // Click the AUDIENCE SCORE button
      const audienceScoreButton = await screen.findByRole("button", {
        name: /AUDIENCE SCORE/i,
      });
      expect(audienceScoreButton).toBeInTheDocument();

      fireEvent.click(audienceScoreButton);

      // Check the ROTTEN checkbox
      const freshCheckbox = await screen.findByRole("checkbox", {
        name: /ROTTEN/i,
      });
      fireEvent.click(freshCheckbox);

      // Wait for the DOM to update
      await waitFor(() => {
        console.log("Full document HTML:", prettyDOM(document.body, 100000));

        const divs = screen.queryAllByText("Lowest Critic");
        expect(divs.length).toBe(2);
      });
    });
  });
});
