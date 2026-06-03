# Fashi Shop - React E-Commerce Application

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
  - Recommends products using dynamic, interactive cards that link directly to the product detail page.
  - Remembers chat history across pages.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite
- **Routing**: React Router DOM v7
- **Styling**: Vanilla CSS + Bootstrap 5 (responsive design)
- **AI Integration**: `@google/generative-ai` (Gemini SDK)
- **State Management**: React Context API (`AuthContext`)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NguyenThiNgocAnh03/React_Fashi_Shop.git
   cd React_Fashi_Shop/my-react-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of the project (`my-react-app/.env`):
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
   > ⚠️ **Important:** Do NOT commit your `.env` file to GitHub or any public repository. It has already been added to `.gitignore`.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Navigate to `http://localhost:5173/` in your browser.

---

## 📂 Project Structure

```text
my-react-app/
├── public/                # Static assets, images, and legacy CSS/JS templates
├── src/
│   ├── assets/            # React assets
│   ├── components/        # Reusable UI elements
│   │   ├── chatbot/       # Chatbot UI, Custom Hook, & Gemini service integration
│   │   ├── header/        # Navigation bar & authentication status
│   │   └── footer/        # Page footer
│   ├── context/           # React Context (AuthContext)
│   ├── data/              # Application data (products.js inventory)
│   ├── pages/             # Page views (Home, Shop, Cart, Checkout, Auth, History)
│   ├── App.jsx            # Main app router and layout
│   └── main.jsx           # Application entry point
├── .env                   # Local environment variables (ignored by Git)
├── .gitignore             # Git ignored files & folders
└── package.json           # Node dependencies and scripts
```

---

## 🤖 AI Chatbot Details

The chatbot utilizes the `@google/generative-ai` package and queries the `gemini-2.5-flash` model. 
- The system instructions are defined in `src/components/chatbot/geminiService.js`, feeding the complete product catalog context into the model.
- It is trained to parse user requirements (like "Find me a jacket for a 1m75, 70kg male") and recommend the correct item from `src/data/products.js` formatted as a clean, interactive product card link.

---

## 📄 License

This project is open-source. Feel free to use, modify, and distribute as needed.
