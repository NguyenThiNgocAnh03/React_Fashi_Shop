import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../../data/products.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('products');
    const list = saved ? JSON.parse(saved) : products;
    const found = list.find(p => p.id === parseInt(id));
    setProduct(found || null);
    if (found) {
      setSelectedSize((found.sizes && found.sizes[0]) || 'Free Size');
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Đang tải sản phẩm...</div>;
  }

  // Nếu không tìm thấy sản phẩm (ID bậy hoặc không tồn tại)
  if (!product) {
    return (
      <div className="container" style={{ padding: '50px 0', textAlign: 'center' }}>
        <h2>Sản phẩm không tồn tại</h2>
        <Link to="/">Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <section className="product-details spad">
      <div className="container" style={{ padding: '50px 0' }}>
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap' }}>
          
          {/* Bên trái: Hình ảnh sản phẩm */}
          <div className="col-lg-6" style={{ width: '50%', padding: '15px', position: 'relative' }}>
            <img 
              src={product.image.startsWith('http') || product.image.startsWith('/') ? product.image : `/${product.image}`} 
              alt={product.name} 
              style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
            />
            {/* Hiển thị nhãn Sale góc ảnh nếu status là Sale */}
            {product.status === "Sale" && (
              <div style={{ position: 'absolute', top: '25px', left: '25px', background: '#e53637', color: '#fff', padding: '4px 12px', fontSize: '12px', fontWeight: 'bold', borderRadius: '4px' }}>
                SALE
              </div>
            )}
          </div>
          
          {/* Bên phải: Thông tin chi tiết sản phẩm */}
          <div className="col-lg-6" style={{ width: '50%', padding: '15px' }}>
            <div className="product-details-text">
              <span style={{ fontSize: '12px', color: '#b2b2b2', textTransform: 'uppercase', letterSpacing: '2px' }}>
                {product.category}
              </span>
              
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '5px', marginBottom: '10px', color: '#252525' }}>
                {product.name}
              </h2>
              
              <div className="pd-desc">
                {/* 1. ĐÃ SỬA: Định dạng giá tiền chuẩn VNĐ theo dữ liệu mới (Ví dụ: 350.000đ) */}
                <h3 style={{ color: '#e53637', fontWeight: 'bold', margin: '15px 0', fontSize: '28px' }}>
                  {product.price.toLocaleString('vi-VN')}đ
                </h3>
                
                {/* 2. ĐÃ SỬA: Hiển thị các thông số động từ file data mới */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', fontSize: '15px', color: '#666', lineHeight: '2' }}>
                  <li><b>Màu sắc (Color):</b> {product.color}</li>
                  <li><b>Trạng thái (Status):</b> {product.status === "In Stock" ? "Còn hàng" : "Đang giảm giá (Sale)"}</li>
                </ul>
                
                {/* 3. ĐÃ SỬA: Đổ dữ liệu description chi tiết của từng món đồ */}
                <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#555', borderTop: '1px solid #ebeebe', paddingTop: '15px' }}>
                  {product.description}
                </p>
              </div>
              
              {/* Chọn kích cỡ */}
              <div style={{ marginTop: '25px', marginBottom: '20px' }}>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#252525', display: 'block', marginBottom: '10px' }}>
                  Chọn Kích Cỡ (Size):
                </span>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          padding: '10px 20px',
                          border: selectedSize === size ? '2px solid #e53637' : '1px solid #ddd',
                          backgroundColor: selectedSize === size ? '#e53637' : '#fff',
                          color: selectedSize === size ? '#fff' : '#252525',
                          borderRadius: '4px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          minWidth: '55px',
                          textAlign: 'center'
                        }}
                      >
                        {size}
                      </button>
                    ))
                  ) : (
                    <button
                      disabled
                      style={{
                        padding: '10px 20px',
                        border: '1px solid #ddd',
                        backgroundColor: '#f5f5f5',
                        color: '#888',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}
                    >
                      Free Size
                    </button>
                  )}
                </div>
              </div>
              
              {/* Nút Thêm vào giỏ hàng */}
              <div className="quantity" style={{ marginTop: '30px' }}>
                <Link 
                  to={user ? "/cart" : "/login"} 
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      showToast('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!', 'warning');
                      navigate('/login');
                    } else {
                      addToCart(product, 1, selectedSize);
                      showToast(`Đã thêm sản phẩm (Size: ${selectedSize}) vào giỏ hàng!`, 'success');
                    }
                  }} 
                  style={{ backgroundColor: '#e53637', color: 'white', padding: '15px 30px', textDecoration: 'none', display: 'inline-block', borderRadius: '5px', fontWeight: 'bold', fontSize: '16px', letterSpacing: '1px' }}
                >
                  THÊM VÀO GIỎ HÀNG
                </Link>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}