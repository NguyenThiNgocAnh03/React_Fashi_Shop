import { Link, useNavigate } from 'react-router-dom';
import { products } from '../../data/products.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './ShopPage.css';

export function ShopPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    return (
        <section className="product-shop spad">
  <div className="container">
    <div className="row">
      <div className="col-lg-12 order-1 order-lg-2">
        <div className="product-list">
          <div className="row">
            {products.map((product) => (
              <div className="col-lg-4 col-sm-6" key={product.id}>
                <div className="product-item">
                  <div className="pi-pic">
                    <img src={product.image} alt={product.name} />
                    {product.id === 1 || product.id === 7 ? <div className="sale pp-sale">Sale</div> : null}
                    <div className="icon">
                      <i className="icon_heart_alt" />
                    </div>
                    <ul>
                      <li className="w-icon active">
                        <Link to={user ? "/cart" : "/login"} onClick={(e) => {
                            if(!user) {
                                e.preventDefault();
                                alert('Vui lòng đăng nhập để sử dụng giỏ hàng!');
                                navigate('/login');
                            }
                        }}>
                          <i className="icon_bag_alt" />
                        </Link>
                      </li>
                      <li className="quick-view">
                        <Link to={`/product/${product.id}`}>+ Xem chi tiết</Link>
                      </li>
                      <li className="w-icon">
                        <a href="#">
                          <i className="fa fa-random" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="pi-text">
                    <div className="catagory-name">{product.category}</div>
                    <Link to={`/product/${product.id}`}>
                      <h5>{product.name}</h5>
                    </Link>
                   <div className="product-price">{product.price.toLocaleString('vi-VN')}đ</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    );
}