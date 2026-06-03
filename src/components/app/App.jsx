import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Header} from '../header/Header.jsx'
import { BreadSection } from '../bread_crumber/Bread.jsx';
import { Footer } from '../footer/Footer.jsx';
import {PartnerLogo} from '../partner/Partner.jsx';
import {ShopPage} from '../../pages/shop/Shop.jsx';
import {Chatbot} from '../chatbot/Chatbot.jsx';
import {ProductDetail} from '../../pages/product/ProductDetail.jsx';
import {Cart} from '../../pages/cart/Cart.jsx';
import {Checkout} from '../../pages/checkout/Checkout.jsx';
import {History} from '../../pages/history/History.jsx';
import { AuthProvider } from '../../context/AuthContext.jsx';
import { ProtectedRoute } from '../ProtectedRoute.jsx';
import { Login } from '../../pages/auth/Login.jsx';
import { Register } from '../../pages/auth/Register.jsx';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <BreadSection />
          
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          </Routes>

          <PartnerLogo />
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}