import { Link } from 'react-router-dom';

export function Checkout() {
  return (
    <div className="container" style={{ padding: '80px 0', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Thanh toán</h2>
      <form style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold' }}>Họ và tên</label>
            <input type="text" className="form-control" placeholder="Nhập họ tên người nhận" style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
        </div>
        <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold' }}>Số điện thoại</label>
            <input type="text" className="form-control" placeholder="Nhập số điện thoại" style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
        </div>
        <div className="form-group" style={{ marginBottom: '30px' }}>
            <label style={{ fontWeight: 'bold' }}>Địa chỉ giao hàng</label>
            <input type="text" className="form-control" placeholder="Nhập địa chỉ nhà, phường/xã, quận/huyện..." style={{ width: '100%', padding: '10px', marginTop: '5px', border: '1px solid #ddd', borderRadius: '5px' }} />
        </div>
        <Link to="/history" style={{ backgroundColor: '#e53637', color: 'white', padding: '12px 0', textDecoration: 'none', borderRadius: '5px', display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: '16px' }}>XÁC NHẬN ĐẶT HÀNG</Link>
      </form>
    </div>
  );
}
