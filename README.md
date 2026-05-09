# 🎭 Playwright QA Automation Portfolio

End-to-end test automation project built with **Playwright** using the **Page Object Model (POM)** architecture to simulate real-world e-commerce user flows.

🔗 Application under test: https://www.saucedemo.com/

---

# 📌 Project Overview

This project demonstrates real-world QA Automation skills focused on scalable and maintainable test architecture.

Key capabilities demonstrated:

- End-to-end UI testing
- Functional and regression testing
- Page Object Model (POM)
- Test data generation with Faker
- 🔐 Session management using Playwright `storageState`
- Cart persistence validation
- Checkout flow validation
- Business logic validation (pricing, totals)
- Cross-browser testing (Chromium, Firefox, WebKit)
- CI/CD-ready structure

---

# 🧪 Test Coverage

## 🔐 Authentication

- Valid login authentication
- Invalid login validation
- Error message handling
- Session management via `storageState` (persistent authenticated context)

## 🛍️ Inventory

- Product listing validation
- Add/remove products from cart
- Cart badge validation
- Cart persistence across sessions
- Sorting validation (A → Z, Z → A, Price Low → High, Price High → Low)

## 🛒 Cart

- Cart badge synchronization
- Item quantity validation
- Product removal behavior
- Empty cart validation
- Navigation between cart and inventory

## 💳 Checkout

- Complete checkout workflow
- Required field validations (First Name, Last Name, Postal Code)
- Checkout step navigation (Step One → Step Two → Complete)
- Subtotal calculation validation
- Order completion validation
- Success confirmation message

---

## 🔄 End-to-End Flow

Login (via `storageState`) → Add products → Cart → Checkout → Order completion

---

# 🏗️ Project Structure

````bash
PLAYWRIGHT-QA-PORTFOLIO
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
│   └── inventory.spec.js
│
├── utils/
│   ├── assertSorted.js
│   ├── userFactory.js
│
├── docs/
│   └── test-cases/
│
├── playwright-report/
├── test-results/
│
├── playwright/.auth/
│   └── user.json
│
├── .env
├── playwright.config.js
├── package.json
└── README.md
```

# ⚙️ Setup & Installation

```bash
git clone https://github.com/jcruciti/playwright-qa-portfolio.git
cd playwright-qa-portfolio
npm install
npx playwright install
```

Create .env:

```bash
SAUCE_USER=standard_user
SAUCE_PASSWORD=secret_sauce
```

▶️ Running Tests

```bash
npx playwright test
npx playwright test --headed
npx playwright test --ui
npx playwright test tests/checkout
```

📊 Reports

```bash
npx playwright show-report
```

Reports:

playwright-report/

🏗️ Architecture & Design Patterns
Page Object Model (POM)

- Reusability
- Maintainability
- Separation of concerns
- Scalability

🔐 Authentication Strategy (Modern Approach)
This project evolved from UI-based login in beforeEach to a persistent authentication strategy using Playwright storageState.
❌ Legacy Approach

test.beforeEach(async ({ page }) => {
const loginPage = new LoginPage(page);

await loginPage.open();
await loginPage.login(process.env.SAUCE_USER, process.env.SAUCE_PASSWORD);
});

✅ Current Approach
Authentication executed once in setup project.
Session persisted via:

storageState: 'playwright/.auth/user.json'

Benefits:

- Faster execution
- More stable tests
- Less UI dependency
- Better CI performance

🎲 Test Data Strategy

const defaultUser = {
firstName: faker.person.firstName(),
lastName: faker.person.lastName(),
postalCode: faker.location.zipCode(),
};

🔧 Best Practices

- POM architecture
- Centralized authentication via storageState
- Test isolation
- Clean assertions
- Environment variables
- Stable selectors
- Modular structure

💡 Highlights

- Cart persistence validation
- Session handling via storageState
- Checkout flow validation
- Subtotal calculation verification
- Cross-browser execution
- End-to-end automation

🚀 CI/CD Ready

- GitHub Actions compatible
- Jenkins ready
- Docker-ready structure

📈 Future Improvements

- GitHub Actions pipeline
- Allure reporting
- API testing layer with Playwright API
- Visual regression testing
- Retry strategy for flaky tests
- Test tagging (smoke/regression)

👨‍💻 Author
Joe Cruciti | QA Automation Engineer | Portfolio Project
````
