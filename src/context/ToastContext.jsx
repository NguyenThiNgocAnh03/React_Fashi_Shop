import { createContext, useState, useContext, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    // Tự động tắt sau 3 giây
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const closeToast = () => setToast(null);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            minWidth: '300px',
            padding: '16px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'between',
            backgroundColor: toast.type === 'success' ? '#28a745' : toast.type === 'danger' ? '#dc3545' : '#ffc107',
            animation: 'slideIn 0.3s ease-out forwards',
          }}
        >
          <span style={{ flexGrow: 1, marginRight: '10px' }}>
            {toast.type === 'success' ? '✅' : toast.type === 'danger' ? '❌' : '⚠️'} {toast.message}
          </span>
          <button 
            onClick={closeToast}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              padding: '0 5px'
            }}
          >
            ×
          </button>
          
          <style>{`
            @keyframes slideIn {
              from {
                transform: translateX(120%);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
