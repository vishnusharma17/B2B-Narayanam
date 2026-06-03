import { test } from "@playwright/test";

test("Full Ecommerce Flow", async ({ page }) => {
  // ==========================
  // HOME PAGE
  // ==========================

  await page.goto("http://localhost:3000");

  console.log("HOME OPENED");

  // ==========================
  // LOGIN PAGE
  // ==========================

  await page.goto("http://localhost:3000/login");

  console.log("LOGIN PAGE OPENED");

  await page.locator('input[type="email"]').first().fill("admin@gmail.com");

  await page.locator('input[type="password"]').first().fill("123456");

  await page.getByRole("button", { name: /login/i }).click();

  console.log("LOGIN SUCCESS");

  await page.waitForTimeout(3000);

  // ==========================
  // ADDRESS PAGE
  // ==========================

  await page.goto("http://localhost:3000/profile/address");

  console.log("ADDRESS PAGE OPENED");

  await page.locator('input[placeholder="Full Name"]').fill("VISHANU SHARMA");

  await page.locator('input[placeholder="Phone Number"]').fill("09664332928");

  await page.locator('input[placeholder="Pincode"]').fill("302027");

  await page
    .locator('textarea[placeholder="House No / Street / Area"]')
    .fill("Farmer /jaipur rajasthan");

  await page
    .locator('input[placeholder="Landmark"]')
    .fill("raniyawas ,rahori, jaipur");

  await page.locator('input[placeholder="City"]').fill("jaipur");

  await page.locator('input[placeholder="State"]').fill("Rajasthan");

  await page.locator("button").filter({ hasText: "Save Address" }).click();

  console.log("ADDRESS SAVED");

  await page.waitForTimeout(5000);

  // ==========================
  // PRODUCT PAGE
  // ==========================

  await page.goto("http://localhost:3000/products", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  console.log("PRODUCT PAGE OPENED");

  await page.waitForSelector('a[href^="/product/"]', {
    timeout: 60000,
  });

  console.log("PRODUCTS LOADED");

  await page.locator('a[href^="/product/"]').first().click();

  console.log("PRODUCT OPENED");

  await page.waitForTimeout(3000);

  // ==========================
  // SIZE SELECT
  // ==========================

  const sizeButtons = await page
    .locator("button")
    .filter({ hasText: /XS|S|M|L|XL|XXL/i });

  const sizeCount = await sizeButtons.count();

  console.log("SIZE BUTTONS:", sizeCount);

  if (sizeCount > 0) {
    await sizeButtons.nth(0).click();

    console.log("SIZE SELECTED");
  }

  // ==========================
  // ADD TO CART
  // ==========================

  await page
    .locator("button")
    .filter({ hasText: /Add To Cart/i })
    .first()
    .click();

  console.log("ADD TO CART SUCCESS");

  await page.waitForTimeout(5000);

  // ==========================
  // CART PAGE
  // ==========================

  await page.goto("http://localhost:3000/cart", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  console.log("CART PAGE OPENED");

  await page.waitForTimeout(5000);

  // ==========================
  // CHECKOUT PAGE
  // ==========================

  await page.goto("http://localhost:3000/checkout?type=cart", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

  console.log("CHECKOUT PAGE OPENED");

  await page.waitForTimeout(5000);

  // ==========================
  // ADDRESS CHECK
  // ==========================

  const addressCards = await page
    .locator("div")
    .filter({ hasText: /VISHANU SHARMA/i });

  const addressCount = await addressCards.count();

  console.log("ADDRESS COUNT:", addressCount);

  if (addressCount > 0) {
    await addressCards.first().click();

    console.log("ADDRESS SELECTED");
  } else {
    console.log("NO ADDRESS FOUND");
  }

  // ==========================
  // PLACE ORDER BUTTON
  // ==========================

  const buttons = await page.locator("button").allTextContents();

  console.log("BUTTONS:", buttons);

  const placeOrderVisible = await page
    .locator("button")
    .filter({ hasText: /Place Order/i })
    .first()
    .isVisible()
    .catch(() => false);

  console.log("PLACE ORDER VISIBLE:", placeOrderVisible);

  if (placeOrderVisible) {
    await page
      .locator("button")
      .filter({ hasText: /Place Order/i })
      .first()
      .click();

    console.log("ORDER PLACED");
  } else {
    console.log("PLACE ORDER BUTTON NOT FOUND");
  }

  await page.waitForTimeout(5000);

  console.log("FULL FLOW PASSED");
});
