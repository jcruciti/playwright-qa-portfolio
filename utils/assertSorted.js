import { expect } from '@playwright/test';

export async function expectSortedText(locator, order = 'asc') {
  const values = await locator.allTextContents();

  const normalized = values.map((v) => v.trim());

  const sorted = [...normalized].sort((a, b) =>
    order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
  );

  expect(normalized).toEqual(sorted);
}

export async function expectSortedNumbers(locator, order = 'asc') {
  const rawValues = await locator.allTextContents();

  const prices = rawValues.map((text) => {
    const match = text.match(/\$(\d+\.\d+)/);
    return match ? parseFloat(match[1]) : 0;
  });

  const sorted = [...prices].sort((a, b) => (order === 'asc' ? a - b : b - a));

  expect(prices).toEqual(sorted);
}
