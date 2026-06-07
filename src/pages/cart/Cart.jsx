import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

export function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Giỏ hàng của bạn</h2>
        <p style={{ margin: '20px 0', color: '#777' }}>Hiện tại giỏ hàng đang trống.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
          <Link to="/" style={{ backgroundColor: '#e53637', color: 'white', padding: '10px 25px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Quay lại cửa hàng</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '50px 0' }}>
      <h2 style={{ marginBottom: '30px', fontWeight: 'bold', color: '#252525' }}>Giỏ hàng của bạn</h2>
      
      <div className="row">
        {/* Bảng danh sách sản phẩm */}
        <div className="col-lg-8">
          <div className="table-responsive">
            <table className="table table-bordered align-middle text-center" style={{ backgroundColor: '#fff' }}>
              <thead style={{ backgroundColor: '#f3f3f3', color: '#252525' }}>
                <tr>
                  <th style={{ width: '100px' }}>Hình ảnh</th>
                  <th className="text-start">Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                  <th style={{ width: '70px' }}>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={`${item.id}-${item.selectedSize}`}>
                    <td>
                      <img 
                        src={item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/${item.image}`} 
                        alt={item.name} 
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                      />
                    </td>
                    <td className="text-start">
                      <h6 className="mb-0 fw-bold" style={{ color: '#252525' }}>{item.name}</h6>
                      <small className="text-muted">{item.category}</small>
                      <div className="text-muted mt-1" style={{ fontSize: '12px' }}>
                        Size: <span className="badge bg-light text-dark border px-2 py-1 fw-bold">{item.selectedSize}</span>
                      </div>
                    </td>
                    <td>{item.price.toLocaleString('vi-VN')}đ</td>
                    <td>
                      <div className="d-flex align-items-center justify-content-center gap-2">
                        <button 
                          className="btn btn-sm btn-outline-secondary px-2 py-0" 
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="fw-bold" style={{ minWidth: '24px' }}>{item.quantity}</span>
                        <button 
                          className="btn btn-sm btn-outline-secondary px-2 py-0" 
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="fw-bold text-danger">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-danger border-0" 
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        title="Xóa sản phẩm"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-start mt-3">
            <Link to="/" className="btn btn-outline-dark" style={{ fontWeight: 'bold' }}>
              ← Tiếp tục mua sắm
            </Link>
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card border-0 p-4" style={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h5 className="fw-bold mb-4" style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>Tóm tắt đơn hàng</h5>
            <div className="d-flex justify-content-between mb-3" style={{ fontSize: '16px' }}>
              <span>Tổng số lượng:</span>
              <span className="fw-bold">{cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} sản phẩm</span>
            </div>
            <div className="d-flex justify-content-between mb-4" style={{ fontSize: '18px' }}>
              <span>Tổng cộng:</span>
              <span className="fw-bold text-danger" style={{ fontSize: '20px' }}>{totalPrice.toLocaleString('vi-VN')}đ</span>
            </div>
            <Link 
              to="/checkout" 
              className="btn btn-danger w-100 py-3 fw-bold text-uppercase" 
              style={{ backgroundColor: '#e53637', border: 'none', borderRadius: '4px', letterSpacing: '1px' }}
            >
              Tiến hành thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
