import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Tải giỏ hàng khi người dùng thay đổi (đăng nhập/đăng xuất)
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.email}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCartItems([]);
    }
  }, [user]);

  // Lưu giỏ hàng vào localStorage và cập nhật state
  const saveCart = (items) => {
    setCartItems(items);
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(items));
    }
  };

  const addToCart = (product, quantity = 1, selectedSize = null) => {
    if (!user) return false;
    const sizeToUse = selectedSize || (product.sizes && product.sizes[0]) || 'Free Size';
    const existingIndex = cartItems.findIndex(item => 
      item.id === product.id && 
      item.selectedSize === sizeToUse
    );
    let newItems = [...cartItems];
    if (existingIndex > -1) {
      newItems[existingIndex].quantity += quantity;
    } else {
      newItems.push({ ...product, quantity, selectedSize: sizeToUse });
    }
    saveCart(newItems);
    return true;
  };

  const removeFromCart = (productId, selectedSize) => {
    const newItems = cartItems.filter(item => 
      !(item.id === productId && item.selectedSize === selectedSize)
    );
    saveCart(newItems);
  };

  const updateQuantity = (productId, selectedSize, quantity) => {
    const newItems = cartItems.map(item => 
      (item.id === productId && item.selectedSize === selectedSize)
        ? { ...item, quantity: Math.max(1, quantity) } 
        : item
    );
    saveCart(newItems);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalCount, 
      totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
