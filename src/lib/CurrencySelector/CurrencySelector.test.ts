// to be implemented
import { afterEach, describe, expect, test } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import CurrencySelector from "./CurrencySelector.svelte";

afterEach(cleanup);

describe("CurrencySelector", () => {
  const props = {
    id: 1,
    currencies: ["EUR", "SEK", "USD"],
    selectedCurrency: "SEK",
  };

  test("should default to selected currency", () => {
    const { getAllByRole } = render(CurrencySelector, { props });
    const [eur, sek, usd] = getAllByRole("option") as HTMLOptionElement[];

    expect(sek.selected).toBe(true);
    expect(eur.selected).toBe(false);
    expect(usd.selected).toBe(false);
  });

  test("should render 3 options", () => {
    const { getAllByRole } = render(CurrencySelector, { props });
    const options = getAllByRole("option") as HTMLOptionElement[];

    expect(options).toHaveLength(3);
  });

  test("should be able to change currency", async () => {
    const { getAllByRole } = render(CurrencySelector, { props });
    const [eur, sek] = getAllByRole("option") as HTMLOptionElement[];

    expect(sek.selected).toBe(true);

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "EUR" }),
    );

    expect(eur.selected).toBe(true);
  });
});
