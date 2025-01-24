---

### App Description

#### General Structure
- A simple web application with three pages.
- Uses `HashRouter` from the `react-router-dom` library to support nested routes and work on GitHub Pages.
- All pages are wrapped in a `CardWrapper` component, which centers the content in a card layout.

#### Stripe Integration
- The following libraries are used for Stripe integration:
  - `@stripe/react-stripe-js`
  - `@stripe/stripe-js`

---

### App Pages

#### **1. Payment Creation Page**

- **Purpose**: Input the amount (`amount` in USD) and create a payment through the backend.
- **User Actions**:
  1. Input the amount.
  2. Click the "Submit" button.
- **Workflow**:
  - The entered amount in USD is converted into cents.
  - Data in the format `{ amount: number, country: string }` (where:
    - `amount` — the amount in cents.
    - `country` — a test string for metadata)
      is sent to the backend endpoint:  
      **`POST baseurl/api/payment/create`**,  
      where `baseurl` is read from the `.env` variable `REACT_APP_BACKEND_BASE_URL`.
  - On a successful request, the app redirects to the next page using `useNavigate` from `react-router-dom`.

---

#### **2. Payment Details Page**

- **Purpose**: Select the payment method and process the payment through Stripe.
- **Stripe Components**:
  - Wrapper: `Elements`.
  - Main Component: `PaymentElement`.
- **Validation**: Each field is validated as implemented in Stripe Elements.
- **Workflow**:
  - After completing the form fields, a request is made using `stripe.confirmPayment` with the following parameters:
    - `confirmParams`: An object with the key `return_url`, which specifies the URL for redirecting after completing the payment.
  - The response includes:
    - On successful payment — an automatic redirect to `return_url`.
    - On failure — an error object, which is used to display additional information in the UI.

---

#### **3. Payment Completion Page**

- **Purpose**: Display the status of a successful payment.
- **Content**: A simple message confirming that the payment was successful!

---

### Additional Notes

- Ensure the `.env` file includes valid `REACT_APP_BACKEND_BASE_URL` and `REACT_APP_STRIPE_PUB_KEY` values.
- When testing in the Stripe sandbox, verify the `Elements` configuration and error handling during `stripe.confirmPayment`.
- For test credit cards in Stripe, use [official test cards](https://stripe.com/docs/testing).

---

```

```
