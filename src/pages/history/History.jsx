import { Link } from 'react-router-dom';

export function History() {
  return (
    <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
      <h2 style={{ color: '#28a745', marginBottom: '20px' }}>🎉 Chúc mừng! Đặt hàng thành công!</h2>
      <p style={{ color: '#555', marginBottom: '40px' }}>Cảm ơn bạn đã mua sắm tại cửa hàng. Đơn hàng của bạn đang được xử lý.</p>
      
      <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: '0 auto 30px auto', textAlign: 'left' }}>
        <h4 style={{ marginBottom: '15px' }}>Lịch sử đơn hàng:</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '10px 0', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
                <span>Đơn hàng #001</span>
                <span style={{ color: '#e53637', fontWeight: 'bold' }}>Đang chờ xử lý</span>
            </li>
        </ul>
      </div>

      <Link to="/" style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 25px', textDecoration: 'none', borderRadius: '5px' }}>Về lại trang chủ</Link>
    </div>
  );
}
