export function MessageList({ messages, isLoading, quickReplies, onQuickReplyClick, messagesEndRef }) {
  return (
    <div className="chatbot-messages p-3" style={{ background: '#f8f9fa', minHeight: '100%' }}>
      {Array.isArray(messages) && messages.map((msg, index) => {
        const isBot = msg.sender === 'bot';
        return (
          <div 
            key={index} 
            className={`d-flex ${isBot ? 'justify-content-start' : 'justify-content-end'} mb-2`}
          >
            {isBot ? (
              <div 
                className="p-2 rounded-3 shadow-sm bg-white text-dark border"
                style={{ maxWidth: '85%', fontSize: '14px', wordBreak: 'break-word' }}
                dangerouslySetInnerHTML={{ __html: msg.text || '' }}
              />
            ) : (
              <div 
                className="p-2 rounded-3 shadow-sm bg-danger text-white"
                style={{ maxWidth: '85%', fontSize: '14px', wordBreak: 'break-word' }}
              >
                {msg.text}
              </div>
            )}
          </div>
        );
      })}
      
      {/* Vùng hiển thị nút câu hỏi nhanh */}
      {!isLoading && (
        <div className="d-flex flex-wrap gap-1 my-2 ps-1">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onQuickReplyClick(reply.query)}
              className="btn btn-outline-secondary btn-sm rounded-pill py-1 px-2"
              style={{ fontSize: '12px', whiteSpace: 'normal', textAlign: 'left' }}
            >
              {reply.label}
            </button>
          ))}
        </div>
      )}

      {/* Hiệu ứng loading */}
      {isLoading && (
        <div className="d-flex justify-content-start mb-2">
          <div className="p-2 rounded-3 bg-white border text-muted d-flex align-items-center gap-2" style={{ fontSize: '13px' }}>
            <div className="spinner-border spinner-border-sm text-secondary" role="status"></div>
            <span>Fashi AI đang quét dữ liệu...</span>
          </div>
        </div>
      )}
      
      {/* Neo vị trí tự động cuộn xuống */}
      <div ref={messagesEndRef} />
    </div>
  );
}