import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/svelte";

import Output from "./Output.svelte";

describe("Output", () => {
  const sum = 11.3;

  test("should render", () => {
    render(Output, { props: { sum } });
    expect(screen.getByText(sum)).toBeDefined();
  });
});
