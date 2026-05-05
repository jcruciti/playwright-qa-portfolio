# 🎭 Playwright QA Automation Portfolio

End-to-end test automation project built with **Playwright**, simulating real-world e-commerce user flows.

🔗 Application under test: https://www.saucedemo.com/

---

## 📌 Project Overview

This project was created to demonstrate practical QA Automation skills, including:

* End-to-end testing of critical user journeys
* Scalable architecture using Page Object Model (POM)
* Clean and maintainable test design
* Continuous Integration with GitHub Actions

---

## 🧪 Test Coverage

### 🔐 Authentication

* Valid login
* Invalid login error handling

### 🛍️ Inventory

* Product list validation
* Add/remove items from cart
* Navigation to cart page
* Cart state persistence after page reload
* Cart persistence across user sessions (logout/login)

### 🛒 Cart

* Item count validation vs cart badge
* Product removal
* Navigation between pages

### 💳 Checkout

* Form completion
* Order finalization
* Success message validation

### 🔄 End-to-End Flow

* Complete purchase flow:
  **Login → Add to cart → Checkout → Order confirmation**

---

## 🏗️ Project Structure

```bash
<code>
├── pages              # Page Object Models
├── tests              # Test specs
├── utils              # Helper functions
├── .github/workflows  # CI configuration
├── playwright.config.js
</code>
```

---

## ⚙️ Setup & Installation

```bash
git clone https://github.com/jcruciti/playwright-qa-portfolio.git
cd playwright-qa-portfolio
npm install
npx playwright install
```

---

## ▶️ Running Tests

```bash
npx playwright test
```

### UI Mode

```bash
npx playwright test --ui
```

### Headed Mode

```bash
npx playwright test --headed
```

---

## 📊 Test Reports

```bash
npx playwright show-report
```

---

## 🔧 Best Practices Applied

* Page Object Model (POM)
* Test isolation with `beforeEach`
* Reusable components
* Clear assertions and validations
* Organized test structure
* CI integration (GitHub Actions)

---

## 💡 Technical Highlights

* Dynamic selectors for product interactions
* UI state validation (cart badge vs item list)
* Session persistence testing
* Real user behavior simulation (E2E flow)

---

## 🚧 Work in Progress

This project is actively being improved. Upcoming enhancements include:

* 🔄 Inventory sorting validation (A-Z, Z-A, price)
* 🛒 Extended cart validation (checkout step two)
* 🔍 Git-based validation after each commit (CI improvements)
* 🌐 API testing using Playwright

---

## 📈 Future Improvements

* Advanced reporting (Allure)
* Mocking external services
* Cross-browser test expansion
* Performance testing integration

---

## 👨‍💻 Author

**Jo Cruciti**

---

📌 This project is part of my QA Automation portfolio and is continuously evolving.
