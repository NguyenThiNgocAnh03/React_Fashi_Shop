import { MessageList } from './MessageList.jsx';
import { useChatbot } from './useChatbot.js';
import './Chatbot.css';

export function Chatbot() {
  const {
    isOpen,
    messages,
    inputValue,
    isLoading,
    messagesEndRef,
    quickReplies,
    setInputValue,
    toggleChat,
    handleFormSubmit,
    handleQuickReplyClick,
    handleClearChat
  } = useChatbot();

  return (
    <div className="chatbot-container position-fixed" style={{ bottom: '20px', right: '20px', zIndex: 1050 }}>
      {/* Nút bấm để mở hộp thoại chat */}
      {!isOpen && (
        <button
          className="btn btn-danger rounded-circle p-0 d-flex align-items-center justify-content-center shadow-lg"
          onClick={toggleChat}
          style={{ width: '55px', height: '55px', fontSize: '22px' }}
        >
          💬
        </button>
      )}

      {/* Hộp thoại Chatbot */}
      {isOpen && (
        <div
          className="card shadow-lg border-0"
          style={{
            width: '350px',
            height: '450px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Header */}
          <div
            className="card-header bg-danger text-white d-flex justify-content-between align-items-center py-2 px-3 m-0 border-0"
            style={{ flexShrink: 0, height: '45px' }}
          >
            <h6 className="mb-0 fw-bold" style={{ fontSize: '15px', color: '#ffffff' }}>Trợ lý ảo AI Fashi</h6>
            <div className="d-flex gap-2 align-items-center">
              <button
                type="button"
                className="btn btn-link text-white p-0 text-decoration-none text-opacity-75"
                onClick={handleClearChat}
                title="Xóa lịch sử"
                style={{ fontSize: '14px', border: 'none', background: 'none', boxShadow: 'none' }}
              >
                🗑️
              </button>
              <button
                type="button"
                className="btn btn-link text-white p-0 text-decoration-none fw-bold"
                onClick={toggleChat}
                style={{ fontSize: '20px', border: 'none', background: 'none', lineHeight: 1, boxShadow: 'none' }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Body tin nhắn */}
          <div style={{ flexGrow: 1, height: 'calc(450px - 95px)', overflowY: 'auto' }}>
            <MessageList
              messages={messages}
              isLoading={isLoading}
              quickReplies={quickReplies}
              onQuickReplyClick={handleQuickReplyClick}
              messagesEndRef={messagesEndRef}
            />
          </div>

          {/* Form gửi tin nhắn */}
          <form
            className="card-footer bg-white border-top p-2 d-flex gap-2 m-0 align-items-center"
            onSubmit={handleFormSubmit}
            style={{ flexShrink: 0, height: '50px' }}
          >
            <input
              type="text"
              className="form-control form-control-sm border-1"
              placeholder="Nhập câu hỏi của bạn..."
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              disabled={isLoading}
              style={{ fontSize: '13px' }}
            />
            <button
              type="submit"
              className="btn btn-danger btn-sm d-flex align-items-center justify-content-center"
              disabled={isLoading}
              style={{ height: '31px', width: '40px' }}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}