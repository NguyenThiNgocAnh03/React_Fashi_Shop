import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Các state để lưu thông tin form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      showToast("Giỏ hàng của bạn đang trống, không thể đặt hàng!", "danger");
      return;
    }

    // 1. Tạo đối tượng đơn hàng mới
    const orderId = `FASHI-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleString('vi-VN'),
      customer: { name, phone, address },
      items: [...cartItems],
      total: totalPrice,
      status: 'Đang chờ xử lý'
    };

    // 2. Lưu đơn hàng vào cơ sở dữ liệu đơn hàng toàn cục (Single Source of Truth)
    const savedAllOrders = localStorage.getItem('all_orders');
    const allOrders = savedAllOrders ? JSON.parse(savedAllOrders) : [];
    allOrders.unshift({ 
      ...newOrder, 
      userEmail: user ? user.email : 'guest@fashi.com',
      username: user ? user.name : 'guest' 
    });
    localStorage.setItem('all_orders', JSON.stringify(allOrders));

    // 3. Xóa giỏ hàng và chuyển hướng sang trang lịch sử đơn hàng
    clearCart();
    showToast("Đặt hàng thành công! Đơn hàng của bạn đang được xử lý.", "success");
    navigate('/history');
  };

  return (
    <div className="container" style={{ padding: '80px 0', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontWeight: 'bold' }}>Thanh toán</h2>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold' }}>Họ và tên người nhận</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Nhập họ tên người nhận" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
              style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} 
            />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold' }}>Số điện thoại</label>
            <input 
              type="tel" 
              className="form-control" 
              placeholder="Nhập số điện thoại" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required 
              style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} 
            />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold' }}>Địa chỉ giao hàng</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Nhập địa chỉ nhà, phường/xã, quận/huyện..." 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required 
              style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} 
            />
        </div>
        
        {/* Tổng tiền cần thanh toán */}
        <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded" style={{ backgroundColor: '#fff', border: '1px solid #eee' }}>
            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>Tổng thanh toán:</span>
            <span style={{ color: '#e53637', fontWeight: 'bold', fontSize: '20px' }}>{totalPrice.toLocaleString('vi-VN')}đ</span>
        </div>

        <button 
          type="submit"
          className="btn btn-danger w-100 py-3 fw-bold text-uppercase"
          style={{ backgroundColor: '#e53637', border: 'none', color: 'white', borderRadius: '5px', display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px' }}
        >
          XÁC NHẬN ĐẶT HÀNG
        </button>
      </form>
    </div>
  );
}
