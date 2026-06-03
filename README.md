# 🛍️ Fashi Shop - React E-Commerce App

Fashi Shop is a modern, responsive, and interactive e-commerce web application built using **React** and **Vite**. The application features an AI-powered styling and product recommendation assistant integrated directly with **Google Gemini**.

---

## 🌟 Core Features

- 🛍️ **Product Browsing & Details**: Explore store products, filter by categories, view detailed descriptions, sizes, colors, and pricing.
- 🛒 **Shopping Cart & Checkout**: Seamlessly add items to the cart, manage quantities, and proceed to checkout.
- 🔐 **User Authentication**: Secure Login and Registration flow (with session persistence using `localStorage`).
- 📜 **Order History**: Keep track of previous purchases and order details.
- 💬 **Fashi AI Virtual Assistant**:
  - Chatbot integrated with Google Gemini (`gemini-2.5-flash`).
  - Helps users find suitable outfits based on body metrics (height, weight, gender, size).
  - Recommends products using dynamic, interactive cards linking to details.
  - Remembers chat history across pages.

---

## 🛠️ Technology Stack

* **Frontend**: React 19 + Vite
* **Routing**: React Router DOM v7
* **Styling**: Custom CSS + Bootstrap 5 (Responsive Layout)
* **AI Integration**: `@google/generative-ai` (Gemini SDK)
* **State Management**: React Context API (`AuthContext`)

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 2. Clone the Repository
```bash
git clone https://github.com/NguyenThiNgocAnh03/React_Fashi_Shop.git
cd React_Fashi_Shop/my-react-app
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a file named `.env` in the root of the `my-react-app` folder:
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```
> 💡 **Tip:** You can copy the template file to get started:
> ```bash
> cp .env.example .env
> ```
> ⚠️ **Important:** Do NOT commit your `.env` file to Git. It contains sensitive API keys and is ignored by default in `.gitignore`.

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 📂 Project Structure

```text
my-react-app/
├── public/                # Static assets, images, and template files
├── src/
│   ├── assets/            # App assets
│   ├── components/        # Reusable UI components
│   │   ├── chatbot/       # Chatbot UI, hook, and Gemini service integration
│   │   ├── header/        # Navigation and Auth state
│   │   └── footer/        # Footer component
│   ├── context/           # React Context (AuthContext)
│   ├── data/              # Application data (products.js inventory)
│   ├── pages/             # Page components (Home, Shop, Cart, Checkout, Auth, History)
│   ├── App.jsx            # Application routing and main layout
│   └── main.jsx           # App entry point
├── .env.example           # Configuration template file
├── .gitignore             # Git ignore file
└── package.json           # Dependencies and scripts
```

---

## 🤖 AI Chatbot Details

The chatbot utilizes the `@google/generative-ai` SDK to interact with the `gemini-2.5-flash` model.
- **Context Injection**: The system prompt (`src/components/chatbot/geminiService.js`) dynamically feeds the product inventory (`src/data/products.js`) to the Gemini model.
- **Intelligent Recommendations**: The AI parses user metrics (such as weight, height, gender) and returns appropriate product recommendations formatted as clean interactive product card links.
- **Safety**: The API key is securely loaded from environment variables (`import.meta.env.VITE_GEMINI_API_KEY`).
