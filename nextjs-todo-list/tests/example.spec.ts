import { test, expect } from '@playwright/test';

test('check link', async ({ page }) => {
  await page.goto('http://localhost:3000/todolist');
});

test ('add todo', async ({ page }) => {
  await page.goto('http://localhost:3000/todolist');
  await page.getByRole('textbox').fill('example value');
  await page.getByRole('button', { name: 'Add' }).click();
  //await browser.close();
});

test ('completed todo', async ({ page }) => {
  await page.goto('http://localhost:3000/todolist');
  await page.getByRole('textbox').fill('example value');
  await page.getByRole('button', { name: 'Add' }).click();
  //await expect(page.locator('#checkboxes')).toBeVisible()
  await page.getByRole('checkbox').setChecked(true);
  //await new Promise(r => setTimeout(r, 4000));

});

test ('delete todo', async ({ page }) => {
  await page.goto('http://localhost:3000/todolist');
  await page.getByRole('textbox').fill('example value');
  await page.getByRole('button', { name: 'Add' }).click();
  //await new Promise(r => setTimeout(r, 4000));
  await page.getByRole('button', { name: 'Delete' }).click();
});

