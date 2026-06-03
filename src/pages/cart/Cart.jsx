import { Link } from 'react-router-dom';

export function Cart() {
  return (
    <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
      <h2>Giỏ hàng của bạn</h2>
      <p style={{ margin: '20px 0', color: '#777' }}>Hiện tại giỏ hàng đang trống.</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
        <Link to="/" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 25px', textDecoration: 'none', borderRadius: '5px' }}>Tiếp tục mua sắm</Link>
        <Link to="/checkout" style={{ backgroundColor: '#28a745', color: 'white', padding: '10px 25px', textDecoration: 'none', borderRadius: '5px' }}>Tiến hành thanh toán</Link>
      </div>
    </div>
  );
}
