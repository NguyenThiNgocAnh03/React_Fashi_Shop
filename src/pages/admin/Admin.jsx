import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { resetChatSession } from '../../components/chatbot/geminiService.js';

export function Admin() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Kiểm tra quyền Admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      showToast("Bạn không có quyền truy cập trang quản trị!", "danger");
      navigate('/');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [productsList, setProductsList] = useState([]);

  // Bộ lọc đơn hàng
  const [orderFilter, setOrderFilter] = useState('all');

  // Chế độ Edit sản phẩm (null: Thêm mới, number: ID sản phẩm đang sửa)
  const [editingProductId, setEditingProductId] = useState(null);

  // Form Product State
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Sweaters',
    gender: 'Unisex',
    price: '',
    color: '',
    image: '/img/products/product-1.jpg',
    status: 'In Stock',
    sizes: 'S, M, L',
    description: '',
    heightMin: 150,
    heightMax: 180,
    weightMin: 45,
    weightMax: 80
  });

  // Tải dữ liệu từ localStorage và lắng nghe thay đổi liên tab
  useEffect(() => {
    const loadOrdersAndProducts = () => {
      // Đọc all_orders hiện tại
      const savedOrders = localStorage.getItem('all_orders');
      let ordersList = [];
      try {
        ordersList = savedOrders ? JSON.parse(savedOrders) : [];
      } catch (e) {
        console.error("Lỗi đọc all_orders:", e);
      }

      try {
        // Tự động quét toàn bộ localStorage để tìm các đơn hàng bị sót (từ tài khoản cũ hoặc guest)
        const fallbackOrders = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('orders_')) {
            try {
              const userSaved = JSON.parse(localStorage.getItem(key));
              if (Array.isArray(userSaved)) {
                userSaved.forEach(o => {
                  if (o && o.id) {
                    // Nếu đơn hàng chưa tồn tại trong danh sách all_orders, hãy nhập nó vào
                    if (!ordersList.some(existing => existing.id === o.id)) {
                      fallbackOrders.push({
                        ...o,
                        userEmail: key === 'orders_undefined' ? 'guest@fashi.com' : key.replace('orders_', '')
                      });
                    }
                  }
                });
              }
            } catch (e) {
              console.error("Lỗi đồng bộ đơn hàng từ key: " + key, e);
            }
          }
        }

        if (fallbackOrders.length > 0) {
          ordersList = [...ordersList, ...fallbackOrders];
        }

        // Sắp xếp an toàn tuyệt đối bằng cách ép kiểu id thành String
        ordersList.sort((a, b) => {
          const idA = a && a.id ? String(a.id) : '';
          const idB = b && b.id ? String(b.id) : '';
          return idB.localeCompare(idA);
        });

        localStorage.setItem('all_orders', JSON.stringify(ordersList));
      } catch (err) {
        console.error("Lỗi hệ thống trong quá trình quét đơn hàng:", err);
      }

      setOrders(ordersList);

      // Sản phẩm
      const savedProds = localStorage.getItem('products');
      if (savedProds) {
        setProductsList(JSON.parse(savedProds));
      }
    };

    // Tải dữ liệu lần đầu
    loadOrdersAndProducts();

    // Lắng nghe thay đổi của localStorage từ các tab khác
    const handleStorageChange = (e) => {
      if (e.key === 'all_orders' || e.key === 'products') {
        loadOrdersAndProducts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Xử lý đổi trạng thái đơn hàng
  const handleStatusChange = (orderId, userEmail, newStatus) => {
    // 1. Cập nhật trong all_orders
    const updatedAll = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedAll);
    localStorage.setItem('all_orders', JSON.stringify(updatedAll));

    // 2. Cập nhật trong orders_${userEmail} của user đó (hoặc orders_undefined nếu là guest)
    if (userEmail) {
      const userOrdersKey = userEmail === 'guest@fashi.com' ? 'orders_undefined' : `orders_${userEmail}`;
      const userSavedOrders = localStorage.getItem(userOrdersKey);
      if (userSavedOrders) {
        const userOrders = JSON.parse(userSavedOrders);
        const updatedUserOrders = userOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        );
        localStorage.setItem(userOrdersKey, JSON.stringify(updatedUserOrders));
      }
    }
    showToast(`Cập nhật trạng thái đơn hàng #${orderId} thành "${newStatus}" thành công!`, "success");
  };

  // Xử lý nạp dữ liệu sản phẩm vào form để Sửa
  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      category: product.category,
      gender: product.gender,
      price: product.price,
      color: product.color,
      image: product.image,
      status: product.status,
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : product.sizes,
      description: product.description,
      heightMin: product.specs?.height?.min ?? 150,
      heightMax: product.specs?.height?.max ?? 180,
      weightMin: product.specs?.weight?.min ?? 45,
      weightMax: product.specs?.weight?.max ?? 80
    });
  };

  // Hủy bỏ chế độ sửa, quay về thêm mới
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      category: 'Sweaters',
      gender: 'Unisex',
      price: '',
      color: '',
      image: '/img/products/product-1.jpg',
      status: 'In Stock',
      sizes: 'S, M, L',
      description: '',
      heightMin: 150,
      heightMax: 180,
      weightMin: 45,
      weightMax: 80
    });
  };

  // Xử lý gửi Form (Thêm mới hoặc Lưu cập nhật)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      showToast("Vui lòng nhập tên và giá sản phẩm!", "warning");
      return;
    }

    const priceNum = parseInt(productForm.price);
    const sizesArr = productForm.sizes.split(',').map(s => s.trim()).filter(s => s);

    if (editingProductId !== null) {
      // --- CHẾ ĐỘ CẬP NHẬT (UPDATE) ---
      const updatedProds = productsList.map(p => {
        if (p.id === editingProductId) {
          return {
            ...p,
            name: productForm.name,
            category: productForm.category,
            gender: productForm.gender,
            price: priceNum,
            color: productForm.color || "Multi",
            image: productForm.image,
            status: productForm.status,
            sizes: sizesArr,
            specs: {
              height: { min: parseInt(productForm.heightMin), max: parseInt(productForm.heightMax) },
              weight: { min: parseInt(productForm.weightMin), max: parseInt(productForm.weightMax) }
            },
            description: productForm.description || "Mô tả đang cập nhật.",
            tags: [productForm.category.toLowerCase(), productForm.gender.toLowerCase(), (productForm.color || '').toLowerCase()]
          };
        }
        return p;
      });

      setProductsList(updatedProds);
      localStorage.setItem('products', JSON.stringify(updatedProds));
      resetChatSession();
      showToast(`Đã cập nhật sản phẩm ID #${editingProductId} thành công!`, "success");
      handleCancelEdit();
    } else {
      // --- CHẾ ĐỘ THÊM MỚI (CREATE) ---
      const nextId = productsList.length > 0 ? Math.max(...productsList.map(p => p.id)) + 1 : 1;
      const newProd = {
        id: nextId,
        name: productForm.name,
        category: productForm.category,
        gender: productForm.gender,
        price: priceNum,
        currency: "VND",
        image: productForm.image,
        color: productForm.color || "Multi",
        status: productForm.status,
        sizes: sizesArr,
        specs: {
          height: { min: parseInt(productForm.heightMin), max: parseInt(productForm.heightMax) },
          weight: { min: parseInt(productForm.weightMin), max: parseInt(productForm.weightMax) }
        },
        description: productForm.description || "Mô tả đang cập nhật.",
        tags: [productForm.category.toLowerCase(), productForm.gender.toLowerCase(), (productForm.color || '').toLowerCase()]
      };

      const updatedProds = [...productsList, newProd];
      setProductsList(updatedProds);
      localStorage.setItem('products', JSON.stringify(updatedProds));
      resetChatSession();
      showToast(`Đã thêm sản phẩm "${productForm.name}" thành công!`, "success");
      handleCancelEdit();
    }
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      const updatedProds = productsList.filter(p => p.id !== productId);
      setProductsList(updatedProds);
      localStorage.setItem('products', JSON.stringify(updatedProds));

      resetChatSession();
      showToast("Đã xóa sản phẩm thành công!", "success");
    }
  };

  // Lọc danh sách đơn hàng theo trạng thái
  const filteredOrders = orders.filter(order => {
    if (orderFilter === 'all') return true;
    return order.status === orderFilter;
  });

  if (!user || user.role !== 'admin') {
    return <div className="container py-5 text-center">Đang xác thực quyền Admin...</div>;
  }

  return (
    <div className="container py-5">
      {/* Header trang Admin */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold text-dark mb-0">🛡️ Hệ Thống Quản Trị Cửa Hàng (Admin Panel)</h2>
          <p className="text-muted mb-0">Bảo mật hệ thống chuẩn, cập nhật thông tin sản phẩm và duyệt đơn hàng trực quan</p>
        </div>
        <span className="badge bg-danger px-3 py-2 fs-6">Admin: {user.name}</span>
      </div>

      {/* Tabs Switcher */}
      <ul className="nav nav-pills mb-4 gap-2">
        <li className="nav-item">
          <button
            className={`nav-link px-4 py-2 fw-bold ${activeTab === 'orders' ? 'active bg-danger text-white' : 'btn-outline-secondary text-dark border'}`}
            onClick={() => setActiveTab('orders')}
          >
            📋 Duyệt & Quản lý đơn hàng ({orders.length})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link px-4 py-2 fw-bold ${activeTab === 'products' ? 'active bg-danger text-white' : 'btn-outline-secondary text-dark border'}`}
            onClick={() => setActiveTab('products')}
          >
            👕 Quản lý kho sản phẩm ({productsList.length})
          </button>
        </li>
      </ul>

      {/* Tab 1: Duyệt Đơn hàng */}
      {activeTab === 'orders' && (
        <div>
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <h4 className="fw-bold mb-0 text-dark">Danh sách đơn hàng cần phê duyệt</h4>

            {/* Bộ lọc trạng thái đơn */}
            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold text-secondary" style={{ fontSize: '14px' }}>Bộ lọc đơn:</span>
              <select
                className="form-select form-select-sm w-auto"
                value={orderFilter}
                onChange={(e) => setOrderFilter(e.target.value)}
              >
                <option value="all">Tất cả đơn hàng</option>
                <option value="Đang chờ xử lý">⏳ Đang chờ xử lý</option>
                <option value="Đang giao hàng">🚚 Đang giao hàng</option>
                <option value="Đã giao hàng">✅ Đã giao hàng</option>
                <option value="Đã hủy">❌ Đã hủy</option>
              </select>
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="alert alert-info text-center py-4">Không tìm thấy đơn hàng nào phù hợp với bộ lọc.</div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {filteredOrders.map((order) => (
                <div key={order.id} className="card border shadow-sm" style={{ borderRadius: '10px' }}>
                  <div className="card-header bg-light d-flex justify-content-between align-items-center py-3 px-4">
                    <div>
                      <span className="fw-bold text-dark fs-5">Mã đơn hàng: #{order.id}</span>
                      <div className="text-muted" style={{ fontSize: '12px' }}>Ngày tạo: {order.date}</div>
                      <div className="text-primary fw-bold" style={{ fontSize: '12px' }}>Tài khoản khách: {order.userEmail}</div>
                    </div>

                    {/* Hành động phê duyệt đơn hàng */}
                    <div className="d-flex align-items-center gap-2">
                      <span className="fw-bold text-secondary" style={{ fontSize: '13px' }}>Phê duyệt:</span>
                      <select
                        className={`form-select form-select-sm d-inline-block w-auto fw-bold ${order.status === 'Đã giao hàng' ? 'text-success' :
                          order.status === 'Đang giao hàng' ? 'text-primary' :
                            order.status === 'Đã hủy' ? 'text-danger' : 'text-warning'
                          }`}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, order.userEmail, e.target.value)}
                      >
                        <option value="Đang chờ xử lý">⏳ Đang chờ xử lý</option>
                        <option value="Đang giao hàng">🚚 Đang giao hàng</option>
                        <option value="Đã giao hàng">✅ Đã giao hàng</option>
                        <option value="Đã hủy">❌ Đã hủy</option>
                      </select>
                    </div>
                  </div>

                  <div className="card-body p-4">
                    {/* Chi tiết khách nhận */}
                    <div className="p-3 bg-light rounded mb-3 border" style={{ fontSize: '13px' }}>
                      <h6 className="fw-bold text-dark mb-2">📍 Thông tin nhận hàng:</h6>
                      <div className="row">
                        <div className="col-md-4"><b>Người nhận:</b> {order.customer?.name}</div>
                        <div className="col-md-4"><b>Số điện thoại:</b> {order.customer?.phone}</div>
                        <div className="col-md-4 text-truncate"><b>Địa chỉ:</b> {order.customer?.address}</div>
                      </div>
                    </div>

                    {/* Bảng kê hàng hóa */}
                    <div className="table-responsive">
                      <table className="table table-sm align-middle text-center mb-0" style={{ fontSize: '13px' }}>
                        <thead className="table-light">
                          <tr>
                            <th>Ảnh</th>
                            <th className="text-start">Tên sản phẩm</th>
                            <th>Màu sắc</th>
                            <th>Kích cỡ</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items?.map((item) => (
                            <tr key={`${item.id}-${item.selectedSize}`}>
                              <td>
                                <img src={item.image} alt={item.name} style={{ width: '35px', height: '35px', objectFit: 'cover', borderRadius: '4px' }} />
                              </td>
                              <td className="text-start fw-bold">{item.name}</td>
                              <td>{item.color}</td>
                              <td>
                                <span className="badge bg-light text-dark border px-2 py-1">{item.selectedSize || 'Free Size'}</span>
                              </td>
                              <td>{item.price.toLocaleString('vi-VN')}đ</td>
                              <td>{item.quantity}</td>
                              <td className="fw-bold text-danger">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-3 mt-3 border-top">
                      <span className="fw-bold text-secondary">Tổng doanh thu đơn hàng:</span>
                      <span className="fw-bold text-danger fs-4">{(order.total ?? 0).toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Quản lý Sản phẩm CRUD */}
      {activeTab === 'products' && (
        <div className="row">
          {/* Danh sách sản phẩm bên trái */}
          <div className="col-lg-8">
            <div className="card p-3 shadow-sm border mb-4">
              <h4 className="fw-bold mb-3 text-dark">Danh sách hàng hóa trong kho</h4>
              <div className="table-responsive bg-white rounded border">
                <table className="table align-middle text-center mb-0" style={{ fontSize: '13px' }}>
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Ảnh</th>
                      <th className="text-start">Tên sản phẩm</th>
                      <th>Phân loại</th>
                      <th>Giá bán</th>
                      <th>Trạng thái kho</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsList.map((product) => (
                      <tr key={product.id}>
                        <td className="text-muted fw-bold">#{product.id}</td>
                        <td>
                          <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        </td>
                        <td className="text-start">
                          <div className="fw-bold text-dark">{product.name}</div>
                          <small className="text-muted">{product.gender} | Màu: {product.color} | Size: {Array.isArray(product.sizes) ? product.sizes.join('/') : product.sizes}</small>
                        </td>
                        <td>{product.category}</td>
                        <td className="fw-bold text-danger">{product.price.toLocaleString('vi-VN')}đ</td>
                        <td>
                          <span className={`badge ${product.status === 'In Stock' ? 'bg-success' :
                            product.status === 'Sale' ? 'bg-warning text-dark' : 'bg-secondary'
                            }`}>
                            {product.status === 'In Stock' ? 'Còn hàng' :
                              product.status === 'Sale' ? 'Giảm giá' : 'Hết hàng'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex justify-content-center gap-1">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEditClick(product)}
                              title="Sửa thông tin"
                            >
                              ✏️ Sửa
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteProduct(product.id)}
                              title="Xóa sản phẩm"
                            >
                              🗑️ Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Form thêm/sửa sản phẩm bên phải */}
          <div className="col-lg-4">
            <div className="card p-4 border shadow-sm position-sticky" style={{ backgroundColor: '#fdfdfd', top: '20px' }}>
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <h5 className="fw-bold text-dark mb-0">
                  {editingProductId !== null ? `✏️ Sửa sản phẩm #${editingProductId}` : '➕ Thêm sản phẩm mới'}
                </h5>
                {editingProductId !== null && (
                  <button className="btn btn-sm btn-outline-secondary" onClick={handleCancelEdit}>Hủy</button>
                )}
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Tên sản phẩm *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="VD: Pink Lace-Up Sweater"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label fw-bold">Phân loại</label>
                    <select
                      className="form-select"
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    >
                      <option value="Sweaters">Sweaters</option>
                      <option value="Dresses">Dresses</option>
                      <option value="Pants">Pants</option>
                      <option value="Backpacks">Backpacks</option>
                      <option value="Shoes">Shoes</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold">Đối tượng</label>
                    <select
                      className="form-select"
                      value={productForm.gender}
                      onChange={(e) => setProductForm({ ...productForm, gender: e.target.value })}
                    >
                      <option value="Women">Nữ (Women)</option>
                      <option value="Men">Nam (Men)</option>
                      <option value="Unisex">Cả hai (Unisex)</option>
                    </select>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label fw-bold">Giá bán (đ) *</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="VD: 320000"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold">Màu sắc</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="VD: Pink"
                      value={productForm.color}
                      onChange={(e) => setProductForm({ ...productForm, color: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Đường dẫn hình ảnh</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="VD: /img/products/product-2.jpg"
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label fw-bold">Trạng thái kho</label>
                    <select
                      className="form-select"
                      value={productForm.status}
                      onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                    >
                      <option value="In Stock">Còn hàng</option>
                      <option value="Out of Stock">Hết hàng</option>
                      <option value="Sale">Giảm giá</option>
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label fw-bold">Danh sách Size</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="VD: S, M, L"
                      value={productForm.sizes}
                      onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                    />
                  </div>
                </div>

                {/* Thông số Specs dành cho AI tư vấn */}
                <div className="mb-3 p-3 bg-light rounded border">
                  <h6 className="fw-bold mb-2" style={{ fontSize: '13px' }}>📐 Phù hợp Chiều cao / Cân nặng (cho AI):</h6>
                  <div className="row g-2 mb-2">
                    <div className="col-6">
                      <small className="text-muted">Cao Min (cm)</small>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={productForm.heightMin}
                        onChange={(e) => setProductForm({ ...productForm, heightMin: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Cao Max (cm)</small>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={productForm.heightMax}
                        onChange={(e) => setProductForm({ ...productForm, heightMax: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-6">
                      <small className="text-muted">Nặng Min (kg)</small>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={productForm.weightMin}
                        onChange={(e) => setProductForm({ ...productForm, weightMin: e.target.value })}
                      />
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Nặng Max (kg)</small>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        value={productForm.weightMax}
                        onChange={(e) => setProductForm({ ...productForm, weightMax: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Mô tả sản phẩm</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Nhập mô tả chi tiết sản phẩm..."
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-danger w-100 py-2 fw-bold text-uppercase"
                  style={{ backgroundColor: '#e53637', border: 'none' }}
                >
                  {editingProductId !== null ? '💾 Lưu thay đổi' : '➕ Thêm sản phẩm'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
