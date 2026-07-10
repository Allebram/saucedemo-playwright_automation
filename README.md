# 🧪 SauceDemo E2E Test Suite

Automated end-to-end tests for the SauceDemo checkout flow using **Playwright** following the **Page Object Model (POM)** design pattern.

---

# 🚀 Installation & Running the Test Suite

## 1. Clone the repository

```bash
git clone <your-repo-url>
cd <repo-folder>
```

## 2. Install dependencies

```bash
npm install
```

## 3. Install Playwright browsers

```bash
npx playwright install
```

## 4. Run the test suite

### Headless mode

```bash
npx playwright test
```

### Headed mode

```bash
npx playwright test --headed
```

### View the HTML report

```bash
npx playwright show-report
```

---

# 🛠️ Tooling Choices

| Tool | Reason |
|------|--------|
| **Playwright** | Provides reliable end-to-end testing with built-in auto-waiting, cross-browser support, and powerful locators. |
| **Page Object Model (POM)** | Improves maintainability by separating page interactions from test logic and promoting code reuse. |
| **dotenv** | Keeps sensitive credentials out of the source code by loading them from environment variables. *(For this assessment, the `.env` file is included for demonstration purposes only.)* |
| **Node.js** | Serves as the runtime environment that executes the Playwright automation code. |

### Why Playwright?

Playwright was chosen over Selenium and Cypress because it offers:

- Automatic waiting for elements to become actionable.
- Reliable locator strategies using attributes such as `data-test`.
- Cross-browser support with a single API for Chromium, Firefox, and WebKit.
- Fast and stable execution suitable for end-to-end testing.

---

# 📂 Project Structure

```text
playwright-saucedemo-automation/
│
├── page_objects/
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── ShoppingCartPage.js
│   └── CheckoutPage.js
│
├── tests/
│   └── saucedemo.spec.js
│
├── .env
├── package.json
└── README.md
```

---

# 🔒 Environment Variables

Create a `.env` file in the project root.

```env
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
```

> **Note:** In a production project, the `.env` file should never be committed to GitHub. It is included in this repository solely for the purpose of this assessment.

---

# 💡 What I Would Add or Improve With More Time

Given additional time, I would:

- Add a detailed assertion to the cart whenever you add or remove a product.
- Remove the `.env` file from version control and manage credentials securely using environment variables.

---

# 🤖 AI Tooling Usage

### Where I used AI

- Add visuals to the README.md
- Generated the initial Page Object Model (POM) structure.
- Reviewed the completed automation code for potential bugs and inconsistencies.

### What I accepted

- The overall Page Object structure.
- Method naming conventions.
- Suggestions for improving code readability.

### What I changed

- Removed a leftover `page.pause()` statement that would have caused the test to hang during CI execution.

---

# ✅ Tech Stack

- JavaScript
- Playwright
- Node.js
- dotenv
- Page Object Model (POM)