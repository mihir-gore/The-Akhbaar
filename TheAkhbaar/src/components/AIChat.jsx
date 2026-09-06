import { useState } from "react";
import { X, Sparkles, Send } from "lucide-react";
import axios from "axios";

const AIChat = ({ articles }) => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I am your AI news assistant.\n Ask me anything about today's news.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const question = input;
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: question,
      },
    ]);

    setInput("");

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/ai/chat`, {
        question,
      });
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I am unable to answer that question at the moment.",
        },
      ]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = async (text) => {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/ai/chat`, {
        question: text,
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.answer },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I am unable to answer that question.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "🔥 What's trending today?",
    "📰 Summarize today's top news",
    "💻 Latest technology news",
    "📈 Business highlights",
    "🏏 Sports updates",
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-white shadow-xl hover:scale-105 transition-all"
      >
        <Sparkles size={20} />
        Ask AI
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/30">
          <div className="m-6 h-[650px] w-[400px] rounded-3xl bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-lg font-bold dark:text-white text-blue-600 ">
                  AI News Assistant ✨
                </h2>
                <p className="text-sm text-gray-500 dark:text-white">
                  Ask anything about today's news
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 h-[500px] space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[85%] rounded-2xl dark:text-white p-4 whitespace-pre-line ${
                    message.role === "assistant"
                      ? "bg-slate-100 dark:bg-slate-800"
                      : "ml-auto bg-blue-600 text-white"
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {messages.length === 1 && (
                <div className="mt-6">
                  <p className="mb-3 text-sm font-semibold text-gray-500 dark:text-white">
                    Suggested Questions
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {suggestions.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(item)}
                        className="rounded-full border border-slate-300 dark:text-white dark:border-slate-700 px-4 py-2 text-sm hover:bg-blue-600 hover:text-white transition-all"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {loading && (
                <div className="flex items-center gap-2 max-w-fit rounded-2xl bg-slate-100 dark:bg-slate-800 px-4 py-3">
                  <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"></span>

                  <span
                    className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: "0.15s" }}
                  ></span>

                  <span
                    className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  ></span>
                </div>
              )}
            </div>
            <div className="border-t p-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask something..."
                  value={input}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 rounded-xl border px-4 py-3 outline-none dark:text-white dark:bg-slate-800"
                />

                <button
                  disabled={loading}
                  onClick={handleSend}
                  className="rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
