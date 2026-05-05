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
  const values = await locator.allTextContents();

  const numbers = values.map((v) => Number(v.replace(/[^0-9.]/g, '')));

  const sorted = [...numbers].sort((a, b) => (order === 'asc' ? a - b : b - a));

  expect(numbers).toEqual(sorted);
}
