import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

export function Header() {
  const { user, logout } = useAuth();
  const { cartItems, removeFromCart, totalCount, totalPrice } = useCart();
  return (<header className="header-section">
  <div className="header-top">
    <div className="container">
      <div className="ht-left">
        <div className="mail-service">
          <i className=" fa fa-envelope" />
          hello.colorlib@gmail.com
        </div>
        <div className="phone-service">
          <i className=" fa fa-phone" />
          +65 11.188.888
        </div>
      </div>
      <div className="ht-right" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px', height: '100%' }}>
        <div className="top-social" style={{ float: 'none', padding: 0, display: 'flex', gap: '15px' }}>
          <a href="#" style={{ color: '#252525' }}><i className="ti-facebook" /></a>
          <a href="#" style={{ color: '#252525' }}><i className="ti-twitter-alt" /></a>
          <a href="#" style={{ color: '#252525' }}><i className="ti-linkedin" /></a>
          <a href="#" style={{ color: '#252525' }}><i className="ti-pinterest" /></a>
        </div>
        <div className="lan-selector" style={{ float: 'none', margin: 0 }}>
          <select
            className="language_drop"
            name="countries"
            id="countries"
            style={{ width: '120px', padding: '2px 5px' }}
          >
            <option value="en" data-title="English">English</option>
            <option value="vi" data-title="Vietnamese">Tiếng Việt</option>
          </select>
        </div>
        {user && user.role === 'admin' && (
          <Link to="/admin" className="login-panel" style={{ float: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', color: '#e53637', textDecoration: 'none', fontWeight: 'bold', marginRight: '10px' }}>
            <i className="fa fa-cog" />
            Trang Admin
          </Link>
        )}
        {user ? (
          <Link to="#" onClick={logout} className="login-panel" style={{ float: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', color: '#252525', textDecoration: 'none', fontWeight: 'bold' }}>
            <img src={user.avatar || 'https://ui-avatars.com/api/?name=User'} alt="Avatar" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
            <span>{user.name} <span style={{ color: '#e53637', fontSize: '12px', fontWeight: 'normal' }}>(Thoát)</span></span>
          </Link>
        ) : (
          <Link to="/login" className="login-panel" style={{ float: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', color: '#252525', textDecoration: 'none', fontWeight: 'bold' }}>
            <i className="fa fa-user" />
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  </div>
  <div className="container">
    <div className="inner-header">
      <div className="row">
        <div className="col-lg-2 col-md-2">
          <div className="logo">
            <a href="#">
              <img src="img/logo.png" alt="" />
            </a>
          </div>
        </div>
        <div className="col-lg-7 col-md-7">
          <div className="advanced-search">
            <button type="button" className="category-btn">
              All Categories
            </button>
            <form action="#" className="input-group">
              <input type="text" placeholder="What do you need?" />
              <button type="button">
                <i className="ti-search" />
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-3 text-right col-md-3">
          <ul className="nav-right">
            <li className="heart-icon">
              <a href="#">
                <i className="icon_heart_alt" />
                <span>1</span>
              </a>
            </li>
            <li className="cart-icon">
              <Link to="/cart">
                <i className="icon_bag_alt" />
                <span>{totalCount}</span>
              </Link>
              <div className="cart-hover">
                {cartItems.length > 0 ? (
                  <>
                    <div className="select-items" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                      <table>
                        <tbody>
                          {cartItems.map((item) => (
                            <tr key={item.id}>
                              <td className="si-pic">
                                <img 
                                  src={item.image.startsWith('http') || item.image.startsWith('/') ? item.image : `/${item.image}`} 
                                  alt={item.name} 
                                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                              </td>
                              <td className="si-text">
                                <div className="product-selected">
                                  <p>{item.price.toLocaleString('vi-VN')}đ x {item.quantity}</p>
                                  <h6>{item.name}</h6>
                                </div>
                              </td>
                              <td className="si-close" onClick={() => removeFromCart(item.id)} style={{ cursor: 'pointer' }}>
                                <i className="ti-close" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="select-total">
                      <span>Tổng cộng:</span>
                      <h5>{totalPrice.toLocaleString('vi-VN')}đ</h5>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-3 text-muted">Giỏ hàng trống</div>
                )}
                <div className="select-button">
                  <Link to="/cart" className="primary-btn view-card">
                    GIỎ HÀNG
                  </Link>
                  <Link to="/checkout" className="primary-btn checkout-btn">
                    THANH TOÁN
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div className="nav-item">
    <div className="container">
      <div className="nav-depart">
        <div className="depart-btn">
          <i className="ti-menu" />
          <span>All departments</span>
          <ul className="depart-hover">
            <li className="active">
              <a href="#">Women’s Clothing</a>
            </li>
            <li>
              <a href="#">Men’s Clothing</a>
            </li>
            <li>
              <a href="#">Underwear</a>
            </li>
            <li>
              <a href="#">Kid's Clothing</a>
            </li>
            <li>
              <a href="#">Brand Fashion</a>
            </li>
            <li>
              <a href="#">Accessories/Shoes</a>
            </li>
            <li>
              <a href="#">Luxury Brands</a>
            </li>
            <li>
              <a href="#">Brand Outdoor Apparel</a>
            </li>
          </ul>
        </div>
      </div>
      <nav className="nav-menu mobile-menu">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">Collection</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Pages</a>
          </li>
        </ul>
      </nav>
      <div id="mobile-menu-wrap" />
    </div>
  </div>
</header>
)
  }