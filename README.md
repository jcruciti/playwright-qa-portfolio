# 🎭 Playwright QA Automation Portfolio

End-to-end test automation project built with **Playwright** using the **Page Object Model (POM)** architecture to simulate real-world e-commerce user flows.

🔗 Application under test: https://www.saucedemo.com/

---

# 📌 Project Overview

This project demonstrates real-world QA Automation skills focused on scalable and maintainable test architecture.

Key capabilities demonstrated:

- End-to-end UI testing
- Functional and regression testing
- Page Object Model (POM) architecture
- Test data generation with Faker
- State/session validation
- Sorting and business logic validation
- Checkout calculation verification
- Cross-page navigation flows
- CI/CD-ready structure

---

# 🧪 Test Coverage

## 🔐 Authentication

- Valid login authentication
- Invalid login validation
- Error message handling

## 🛍️ Inventory

- Product listing validation
- Add/remove products from cart
- Cart persistence (reload & session)
- Product sorting validation:
  - A → Z
  - Z → A
  - Price Low → High
  - Price High → Low

## 🛒 Cart

- Cart badge synchronization
- Item quantity validation
- Product removal behavior
- Empty cart validation
- Navigation between cart and inventory

## 💳 Checkout

- Complete checkout workflow
- Required field validation
- Checkout step navigation
- Subtotal calculation validation
- Order completion validation
- Success confirmation message

## 🔄 End-to-End Flow

Full purchase journey:

Login → Add products → Cart → Checkout → Order completion

---

# 📄 Test Case Documentation

All test cases are documented in:

```txt
docs/test-cases/
```

Each test case includes:
- Objective
- Preconditions
- Steps
- Expected results
- Priority
- Traceability to automation tests

---

# 🏗️ Project Structure

```bash
PLAYWRIGHT-QA-PORTFOLIO
│
├── pages/                     # Page Object Model (POM)
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
├── .env
├── playwright.config.js
├── package.json
└── README.md
```

---

# ⚙️ Setup & Installation

Clone the repository:

```bash
git clone https://github.com/jcruciti/playwright-qa-portfolio.git
```

Access project:

```bash
cd playwright-qa-portfolio
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Create `.env` file:

```env
SAUCE_USER=standard_user
SAUCE_PASSWORD=secret_sauce
```

---

# ▶️ Running Tests

Run all tests:

```bash
npx playwright test
```

Run in headed mode:

```bash
npx playwright test --headed
```

Run UI mode:

```bash
npx playwright test --ui
```

Run specific file:

```bash
npx playwright test tests/checkout
```

---

# 📊 Reports

Generate HTML report:

```bash
npx playwright show-report
```

Reports are stored in:

```txt
playwright-report/
```

---

# 🏗️ Architecture & Design Patterns

## ✅ Page Object Model (POM)

This project follows the Page Object Model pattern to ensure:

- Reusability
- Maintainability
- Separation of concerns
- Scalability

Each page contains:
- Locators
- UI actions
- Business interactions

Example:

```js
async login(username, password) {
  await this.page.fill(this.usernameInput, username);
  await this.page.fill(this.passwordInput, password);
  await this.page.click(this.loginButton);
}
```

---

# 🎲 Test Data Strategy

Dynamic test data is generated using Faker.js:

```js
const defaultUser = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode(),
};
```

Benefits:
- Eliminates hardcoded data
- Improves test reliability
- Enables data-driven testing

---

# 🔧 Best Practices Applied

- Page Object Model (POM)
- Test isolation with `beforeEach`
- Reusable components
- Clean assertions
- Environment variable usage
- Modular test design
- Stable selectors strategy
- Maintainable folder structure

---

# 💡 Technical Highlights

- Dynamic product selectors
- Cart vs UI synchronization validation
- Session persistence testing
- Sorting validation utilities
- Checkout subtotal calculation verification
- End-to-end purchase flow automation
- Data-driven validation scenarios

---

# 🚀 CI/CD Ready

Project structure supports integration with:

- GitHub Actions
- Jenkins pipelines
- Docker execution (future-ready)

---

# 📈 Future Improvements

- CI pipeline with GitHub Actions
- Allure reporting integration
- Cross-browser testing expansion
- API testing layer integration
- Visual regression testing
- Docker support
- Flaky test retry strategy
- Test tagging (smoke / regression)

---

# 👨‍💻 Author

**Joe Cruciti**

QA Automation Engineer | Portfolio Project

---

📌 This project is continuously evolving to reflect real-world QA engineering practices and scalable automation architecture.
