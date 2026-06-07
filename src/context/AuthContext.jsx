import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Hàm mã hóa mật khẩu SHA-256 sử dụng Web Crypto API có sẵn trên mọi trình duyệt hiện đại
async function hashPassword(password) {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Khởi tạo bảng người dùng (fashi_users) nếu chưa có
  useEffect(() => {
    const initializeUserDatabase = async () => {
      const savedUsers = localStorage.getItem('fashi_users');
      if (!savedUsers) {
        // Tài khoản admin mặc định: admin / admin123
        const adminHash = await hashPassword('admin123');
        const defaultUsers = [
          {
            username: 'admin',
            email: 'admin@fashi.com',
            passwordHash: adminHash,
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=Admin&background=e53637&color=fff'
          },
          {
            username: 'user1',
            email: 'user1@gmail.com',
            passwordHash: await hashPassword('123456'),
            role: 'user',
            avatar: 'https://ui-avatars.com/api/?name=User1&background=random'
          }
        ];
        localStorage.setItem('fashi_users', JSON.stringify(defaultUsers));
      }
    };
    initializeUserDatabase();
  }, []);

  // Đăng nhập người dùng bằng cách kiểm tra cơ sở dữ liệu
  const loginUser = async (username, password) => {
    const savedUsers = localStorage.getItem('fashi_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Tìm người dùng theo username
    const foundUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!foundUser) {
      return { success: false, message: 'Tên đăng nhập không tồn tại!' };
    }

    // Mã hóa mật khẩu người dùng vừa nhập và so sánh
    const enteredHash = await hashPassword(password);
    if (enteredHash === foundUser.passwordHash) {
      const sessionData = {
        name: foundUser.username,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar
      };
      setUser(sessionData);
      localStorage.setItem('user', JSON.stringify(sessionData));
      return { success: true };
    } else {
      return { success: false, message: 'Mật khẩu không chính xác!' };
    }
  };

  // Đăng ký tài khoản người dùng mới
  const registerUser = async (username, password, email) => {
    const savedUsers = localStorage.getItem('fashi_users');
    const users = savedUsers ? JSON.parse(savedUsers) : [];

    // Kiểm tra xem username hoặc email đã tồn tại chưa
    const isUsernameExists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
    if (isUsernameExists) {
      return { success: false, message: 'Tên đăng nhập này đã được sử dụng!' };
    }

    const isEmailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (isEmailExists) {
      return { success: false, message: 'Email này đã được sử dụng!' };
    }

    // Mã hóa mật khẩu an toàn
    const passwordHash = await hashPassword(password);
    
    // Tạo tài khoản mới
    const newUser = {
      username,
      email,
      passwordHash,
      role: 'user', // Mặc định đăng ký là tài khoản user thường
      avatar: `https://ui-avatars.com/api/?name=${username}&background=random`
    };

    users.push(newUser);
    localStorage.setItem('fashi_users', JSON.stringify(users));

    // Đăng nhập luôn sau khi đăng ký thành công
    const sessionData = {
      name: newUser.username,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar
    };
    setUser(sessionData);
    localStorage.setItem('user', JSON.stringify(sessionData));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
