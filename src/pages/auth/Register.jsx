import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password) {
      // Fake register process
      login({ name: username, avatar: 'https://ui-avatars.com/api/?name=' + username + '&background=random' });
      navigate('/');
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  return (
    <div className="container" style={{ padding: '80px 0', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Đăng ký tài khoản</h2>
      <form onSubmit={handleRegister} style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold' }}>Tên đăng nhập</label>
            <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <div className="form-group" style={{ marginBottom: '30px' }}>
            <label style={{ fontWeight: 'bold' }}>Mật khẩu</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        <button type="submit" style={{ width: '100%', backgroundColor: '#28a745', color: 'white', padding: '12px 0', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>ĐĂNG KÝ</button>
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
            Đã có tài khoản? <Link to="/login" style={{ color: '#007bff', fontWeight: 'bold' }}>Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
}
