![Playwright](https://img.shields.io/badge/Playwright-E2E-green)
![CI](https://img.shields.io/badge/CI-GitHub_Actions-blue)
![Node](https://img.shields.io/badge/Node.js-20-green)

# 🎭 Playwright QA Automation Portfolio

End-to-end test automation project built with **Playwright** using the **Page Object Model (POM)** architecture to simulate real-world e-commerce user flows.

🔗 Application under test: https://www.saucedemo.com/

---

# 📌 Project Overview

This project demonstrates real-world QA Automation skills focused on scalable and maintainable test architecture.

## Key capabilities demonstrated

- End-to-end UI testing
- Functional and regression testing
- Page Object Model (POM)
- Test data generation with Faker
- 🔐 Session management using Playwright `storageState`
- Cart persistence validation
- Checkout flow validation
- Business logic validation (pricing, totals)
- Cross-browser testing (Chromium, Firefox, WebKit)
- Automated CI pipeline with GitHub Actions
- Secure environment variable management using GitHub Secrets
- Automatic Playwright HTML report artifact generation
- CI/CD-ready structure

---

# 🧪 Test Coverage

## 🔐 Authentication

- Valid login authentication
- Invalid login validation
- Error message handling
- Session management via `storageState`

---

## 🛍️ Inventory

- Product listing validation
- Add/remove products from cart
- Cart badge validation
- Cart persistence across sessions
- Sorting validation:
  - A → Z
  - Z → A
  - Price Low → High
  - Price High → Low

---

## 🛒 Cart

- Cart badge synchronization
- Item quantity validation
- Product removal behavior
- Empty cart validation
- Navigation between cart and inventory

---

## 💳 Checkout

- Complete checkout workflow
- Required field validations
- Checkout step navigation
- Subtotal calculation validation
- Order completion validation
- Success confirmation message

---

# 🔄 End-to-End Flow

```text
Login (via storageState)
→ Add products
→ Cart
→ Checkout
→ Order completion
```

---

# 🏗️ Project Structure

```bash
PLAYWRIGHT-QA-PORTFOLIO
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── pages/
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── InventoryPage.js
│   └── LoginPage.js
│
├── tests/
│   ├── auth/
│   ├── cart/
│   ├── checkout/
│   ├── setup/
│   │   └── auth.setup.js
│   └── inventory.spec.js
│
├── utils/
│   ├── auth/
│   │   └── getAuthState.js
│   ├── assertSorted.js
│   └── userFactory.js
│
├── docs/
│   └── test-cases/
│
├── playwright/.auth/
│   └── user.json
│
├── playwright-report/
├── test-results/
│
├── .env
├── playwright.config.js
├── package.json
└── README.md
```

---

# ⚙️ Setup & Installation

## Clone repository

```bash
git clone https://github.com/jcruciti/playwright-qa-portfolio.git
cd playwright-qa-portfolio
```

---

## Install dependencies

```bash
npm install
npx playwright install
```

---

## Create `.env`

```env
SAUCE_USER=standard_user
SAUCE_PASSWORD=secret_sauce
```

---

# ▶️ Running Tests

## Run all tests

```bash
npx playwright test
```

---

## Run headed mode

```bash
npx playwright test --headed
```

---

## Run Playwright UI Mode

```bash
npx playwright test --ui
```

---

## Run specific folder

```bash
npx playwright test tests/checkout
```

---

# 📊 Reports

## Open HTML report

```bash
npx playwright show-report
```

---

## Report location

```bash
playwright-report/
```

---

# 🏗️ Architecture & Design Patterns

## ✅ Page Object Model (POM)

### Benefits

- Reusability
- Maintainability
- Separation of concerns
- Scalability

---

# 🔐 Authentication Strategy

This project evolved from UI-based login in `beforeEach` to persistent authentication using Playwright `storageState`.

---

## ❌ Legacy Approach

```js
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);
});
```

---

## ✅ Current Approach

Authentication is executed once in a dedicated setup project.

### Storage state configuration

```js
storageState: 'playwright/.auth/user.json';
```

---

## ✅ Benefits

- Faster execution
- More stable tests
- Less UI dependency
- Better CI performance
- Cleaner test isolation

---

# 🎲 Test Data Strategy

```js
const defaultUser = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode(),
};
```

---

# 🔧 Best Practices

- POM architecture
- Centralized authentication via `storageState`
- Test isolation
- Clean assertions
- Environment variables
- Stable selectors
- Modular structure
- Reusable setup architecture
- CI/CD integration

---

# 🏷️ Test Tagging Strategy

This project uses Playwright test tags to support scalable test execution strategies.

## Available tags

- `@smoke`
- `@regression`
- `@checkout`
- `@cart`
- `@inventory`
- `@auth`
- `@e2e`
- `@critical`

---

## Examples

Run smoke tests:

```bash
npx playwright test --grep @smoke
```

Run regression suite:

```bash
npx playwright test --grep @regression
```

Run checkout tests only:

```bash
npx playwright test --grep @checkout
```

---

# 🚀 CI/CD Pipeline

This project uses a multi-suite CI strategy with GitHub Actions, enabling isolated smoke and regression execution workflows.

---

## ✅ Pipeline capabilities

- Automatic execution on `push`
- Automatic execution on `pull_request`
- Cross-browser execution
- Secure credential handling
- HTML report artifact upload
- Linux CI execution

---

## 📄 GitHub Actions Workflow

```yaml
name: Playwright Tests

on:
  push:
    branches:
      - main
      - master

  pull_request:
    branches:
      - main
      - master

jobs:
  test:
    timeout-minutes: 30
    runs-on: ubuntu-latest

    env:
      SAUCE_USER: ${{ secrets.SAUCE_USER }}
      SAUCE_PASSWORD: ${{ secrets.SAUCE_PASSWORD }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload Playwright Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

# 💡 Highlights

- Cart persistence validation
- Session handling via `storageState`
- Checkout flow validation
- Subtotal calculation verification
- Cross-browser execution
- End-to-end automation
- Automated CI execution
- GitHub Actions integration

---

# 🚀 CI/CD Ready

- GitHub Actions compatible
- Jenkins ready
- Docker-ready structure

---

# 📈 Future Improvements

- API testing layer with Playwright API
- Visual regression testing
- Retry strategy for flaky tests
- Matrix execution strategy
- Allure reporting integration

---

# 👨‍💻 Author

Joe Cruciti  
QA Automation Engineer | Portfolio Project
