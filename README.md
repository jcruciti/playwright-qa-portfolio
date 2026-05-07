# 🎭 Playwright QA Automation Portfolio

End-to-end test automation project built with **Playwright** using the **Page Object Model (POM)** architecture to simulate real-world e-commerce user flows.

🔗 Application under test: https://www.saucedemo.com/

---

# 📌 Project Overview

This project was created to demonstrate practical QA Automation skills including:

- End-to-end testing
- Functional UI validation
- Scalable automation architecture
- Page Object Model implementation
- Dynamic test data generation
- Maintainable test design
- Session and state validation
- Continuous Integration readiness

---

# 🧪 Test Coverage

## 🔐 Authentication

- Successful login validation
- Invalid login validation
- Error message validation

## 🛍️ Inventory

- Product list validation
- Add product to cart
- Remove product from cart
- Cart persistence after reload
- Cart persistence after logout/login
- Product sorting validation:
  - A → Z
  - Z → A
  - Low → High price
  - High → Low price

## 🛒 Cart

- Cart badge validation
- Item quantity validation
- Product removal validation
- Empty cart validation
- Navigation between pages

## 💳 Checkout

- Checkout flow validation
- Required fields validation
- Price subtotal validation
- Navigation between checkout steps
- Order completion validation
- Success message validation

## 🔄 End-to-End Flow

Complete purchase flow:

Login → Add product → Cart → Checkout → Order confirmation

---

# 🏗️ Project Structure

```bash
<code>
# 🏗️ Project Structure

```bash
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
│   │   └── login.spec.js
│   │
│   ├── cart/
│   │   └── cart.spec.js
│   │
│   ├── checkout/
│   │   ├── checkout.spec.js
│   │   └── completePurchase.spec.js
│   │
│   ├── inventory.spec.js
│   └── example.spec.js
│
├── utils/
│   ├── assertSorted.js
│   ├── basicTest.js
│   └── userFactory.js
│
├── playwright-report/
├── test-results/
│
├── .env
├── .eslintignore
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
│
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```
```
</code>
---

# ⚙️ Setup & Installation

Clone the repository:

```bash
git clone https://github.com/jcruciti/playwright-qa-portfolio.git
```

Access the project folder:

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

Create a `.env` file in the root directory:

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

Run a specific test file:

```bash
npx playwright test tests/checkout/checkout.spec.js
```

---

# 📊 Test Reports

Generate and open the Playwright HTML report:

```bash
npx playwright show-report
```

Reports are automatically generated in:

```bash
playwright-report/
```

---

# 🏗️ Design Patterns & Best Practices

## ✅ Page Object Model (POM)

The framework uses the Page Object Model pattern to improve:

- Scalability
- Maintainability
- Readability
- Code reuse

Each page contains:
- Locators
- Page actions
- Reusable methods

Example:

```js
async login(username, password) {
  await this.page.fill(this.usernameInput, username);
  await this.page.fill(this.passwordInput, password);
  await this.page.click(this.loginButton);
}
```

---

# 🎲 Dynamic Test Data

Dynamic test users are generated using Faker.js:

```js
const defaultUser = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  postalCode: faker.location.zipCode(),
};
```

This helps avoid hardcoded test data and improves test reliability.

---

# 🔧 Best Practices Applied

- Page Object Model (POM)
- Test isolation using `beforeEach`
- Reusable page components
- Clear assertions and validations
- Organized test structure
- Dynamic test data generation
- Environment variable management
- Readable and maintainable code

---

# 💡 Technical Highlights

- Dynamic selectors for product interactions
- Cart badge vs item quantity validation
- Session persistence testing
- Sorting validation utilities
- UI subtotal calculation validation
- Complete E2E purchase flow simulation

---

# 🚧 Future Improvements

- GitHub Actions CI pipeline
- Allure reporting integration
- Cross-browser execution strategy
- API testing integration
- Docker support
- Visual regression testing
- Retry and flaky test handling

---

# 👨‍💻 Author

**Gabriel Cruciti**

QA Automation Portfolio Project

---

📌 This project is part of my QA Automation portfolio and is continuously evolving.
