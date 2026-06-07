import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export function History() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  // Tải danh sách đơn hàng của người dùng từ cơ sở dữ liệu đơn hàng toàn cục
  useEffect(() => {
    const loadUserOrders = () => {
      if (user) {
        const savedAllOrders = localStorage.getItem('all_orders');
        const allOrders = savedAllOrders ? JSON.parse(savedAllOrders) : [];
        
        // Lấy email và username hiện tại (fallback về guest nếu là tài khoản cũ chưa có email)
        const currentUserEmail = user.email || 'guest@fashi.com';
        const currentUsername = user.name || 'guest';
        
        const userOrders = allOrders.filter(order => 
          order.userEmail === currentUserEmail || 
          (order.username && order.username === currentUsername)
        );
        setOrders(userOrders);
      }
    };

    loadUserOrders();

    const handleStorageChange = (e) => {
      if (e.key === 'all_orders') {
        loadUserOrders();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [user]);

  if (orders.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Lịch sử mua hàng</h2>
        <p style={{ color: '#777', margin: '20px 0' }}>Bạn chưa đặt bất kỳ đơn hàng nào.</p>
        <Link to="/" className="btn btn-danger" style={{ backgroundColor: '#e53637', border: 'none', padding: '10px 25px', fontWeight: 'bold' }}>
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '50px 0', maxWidth: '800px' }}>
      <div className="text-center mb-5">
        <h2 style={{ color: '#28a745', fontWeight: 'bold' }}>🎉 Đặt hàng thành công!</h2>
        <p style={{ color: '#555', marginTop: '10px' }}>Cảm ơn bạn đã mua sắm tại cửa hàng. Đơn hàng của bạn đang được xử lý.</p>
      </div>

      <h3 className="fw-bold mb-4 text-dark" style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Danh sách đơn hàng đã đặt:
      </h3>

      {/* Hiển thị danh sách các đơn hàng thực tế */}
      <div className="d-flex flex-column gap-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="card shadow-sm border" 
            style={{ borderRadius: '10px', overflow: 'hidden', backgroundColor: '#fff' }}
          >
            {/* Header của Đơn hàng */}
            <div 
              className="card-header d-flex justify-content-between align-items-center py-3 px-4" 
              style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #eee' }}
            >
              <div>
                <span className="fw-bold text-dark" style={{ fontSize: '16px' }}>Đơn hàng #{order.id}</span>
                <div className="text-muted" style={{ fontSize: '12px' }}>Thời gian đặt: {order.date}</div>
              </div>
              <div className="d-flex flex-column align-items-end">
                <span 
                  className="badge bg-warning text-dark px-3 py-2 fw-bold" 
                  style={{ borderRadius: '20px', fontSize: '13px' }}
                >
                  {order.status}
                </span>
                <small className="text-muted mt-1" style={{ fontSize: '10px' }}>*Hệ thống/Admin xử lý</small>
              </div>
            </div>

            {/* Body của Đơn hàng */}
            <div className="card-body p-4">
              {/* Thông tin giao hàng */}
              <div className="mb-3 p-3 rounded" style={{ backgroundColor: '#f9f9f9', fontSize: '14px' }}>
                <h6 className="fw-bold text-dark mb-2">📍 Thông tin nhận hàng:</h6>
                <div><b>Người nhận:</b> {order.customer.name}</div>
                <div><b>Số điện thoại:</b> {order.customer.phone}</div>
                <div><b>Địa chỉ giao hàng:</b> {order.customer.address}</div>
              </div>

              {/* Danh sách sản phẩm của đơn hàng */}
              <div className="d-flex flex-column gap-2 mb-3">
                {order.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="d-flex align-items-center justify-content-between p-2 border-bottom"
                    style={{ fontSize: '14px' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img 
                        src={item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/${item.image}`} 
                        alt={item.name} 
                        style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} 
                      />
                      <div>
                        <div className="fw-bold text-dark">{item.name}</div>
                        <small className="text-muted">Màu: {item.color} | Size: {item.selectedSize || 'Free Size'}</small>
                      </div>
                    </div>
                    <div className="text-end">
                      <div>{item.price.toLocaleString('vi-VN')}đ x {item.quantity}</div>
                      <div className="fw-bold text-danger">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tổng cộng đơn hàng */}
              <div className="d-flex justify-content-between align-items-center mt-3 pt-3" style={{ borderTop: '2px dashed #eee' }}>
                <span className="fw-bold" style={{ fontSize: '16px' }}>Tổng thanh toán:</span>
                <span className="fw-bold text-danger" style={{ fontSize: '20px' }}>{order.total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ghi chú vai trò xử lý trạng thái */}
      <div 
        className="alert alert-info mt-4 p-3 d-flex align-items-start gap-2" 
        style={{ fontSize: '13px', borderRadius: '8px', lineHeight: '1.5' }}
      >
        <span>💡</span>
        <div>
          <b>Ghi chú về Trạng thái đơn hàng:</b> Trạng thái "Đang chờ xử lý" là trạng thái giả định ban đầu. Trong một hệ thống thực tế (Production), trạng thái này sẽ do <b>Nhân viên kho hàng / Admin cửa hàng</b> thay đổi trên Trang quản trị (Admin Dashboard) sau khi đối chiếu hóa đơn thanh toán hoặc hoàn thành việc gói hàng.
        </div>
      </div>

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-outline-dark px-4 py-2" style={{ fontWeight: 'bold' }}>
          Quay lại trang chủ mua sắm
        </Link>
      </div>
    </div>
  );
}
