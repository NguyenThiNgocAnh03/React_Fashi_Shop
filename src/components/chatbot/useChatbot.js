import { useState, useRef, useEffect } from 'react';
import { sendMessageToAI, resetChatSession } from './geminiService';

export const QUICK_REPLIES = [
  { label: " Tìm Áo len & Áo khoác", query: "Shop có những mẫu áo len hoặc áo khoác nào bán chạy vậy?" },
  { label: "Sản phẩm đang SALE", query: "Cho mình xin danh sách các sản phẩm đang được giảm giá (Sale) với!" },
  { label: "Phụ kiện thời trang", query: "Shop có phụ kiện gì hot không? Ví dụ như mũ hay khăn chẳng hạn." }
];

const INITIAL_BOT_MESSAGE = {
  text: 'Xin chào! Mình là trợ lý bán hàng AI của Fashi Shop. Hôm nay shop có rất nhiều ưu đãi mới. Bạn đang cần tìm quần áo hay phụ kiện gì để mình tư vấn và lọc sản phẩm cho bạn nhé! ✨',
  sender: 'bot'
};

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem('chatbot_history');
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Lỗi đọc bộ nhớ tạm:", e);
    }
    return [INITIAL_BOT_MESSAGE];
  });

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sync scroll and update localStorage whenever messages, open status, or loading status changes
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
    localStorage.setItem('chatbot_history', JSON.stringify(messages));
  }, [messages, isOpen, isLoading]);

  /**
   * Helper function to handle sending messages to the AI.
   * Runs the UI state updates and talks to geminiService.
   */
  const handleSend = async (textToSend) => {
    if (!textToSend.trim() || isLoading) return;

    // 1. Immediately append the user message to UI state
    const updatedMessages = [...messages, { text: textToSend, sender: 'user' }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // 2. Call the AI service with the updated message history context
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const botResponse = await sendMessageToAI(apiKey, textToSend, updatedMessages);
      
      // 3. Append the bot's response
      setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error("Lỗi khi kết nối với AI:", error);
      setMessages((prev) => [...prev, { text: "Có lỗi khi tải dữ liệu, bạn thử lại nhé!", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue('');
    handleSend(userMessage);
  };

  const handleQuickReplyClick = (queryText) => {
    handleSend(queryText);
  };

  const handleClearChat = () => {
    if (window.confirm("Bạn có muốn xóa toàn bộ lịch sử đoạn chat này không?")) {
      localStorage.removeItem('chatbot_history');
      resetChatSession();
      setMessages([{
        text: 'Lịch sử đã được làm sạch. Mình có thể giúp gì cho bạn? ✨',
        sender: 'bot'
      }]);
    }
  };

  return {
    isOpen,
    messages,
    inputValue,
    isLoading,
    messagesEndRef,
    quickReplies: QUICK_REPLIES,
    setInputValue,
    toggleChat,
    handleFormSubmit,
    handleQuickReplyClick,
    handleClearChat
  };
}
