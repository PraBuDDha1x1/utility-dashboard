// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext";

export default function Chatbot() {
  const navigate = useNavigate();
  const context = useContext(DashboardContext);
  const setPrefillData = context?.setPrefillData || (() => {});

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Add bot message with typing delay
  const addBotMessage = (text) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "bot", text }]);
      setIsTyping(false);
      scrollToBottom();
    }, 700);
  };

  // Highlight element and scroll
  const highlightElement = (selector, duration = 3500) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.classList.add("flash");
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => el.classList.remove("flash"), duration);
  };

  // Sequentially highlight multiple elements
  const highlightSequence = (selectors, interval = 1500) => {
    selectors.forEach((sel, idx) => {
      setTimeout(() => highlightElement(sel), idx * interval);
    });
  };

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { type: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    scrollToBottom();

    const msgLower = text.toLowerCase();

    // Chatbot actions
    if (msgLower.includes("forecast")) {
      const data = {
        familySize: 4,
        appliances: ["AC", "Fridge"],
        pastBills: [120, 150, 130],
      };
      setPrefillData(data);
      navigate("/prediction");
      addBotMessage("Opening Prediction page with default data...");
      setTimeout(() =>
        highlightSequence([
          "#prediction-section",
          "#familySize-input",
          "#appliances-input",
          "#pastBills-input",
        ])
      , 700);
    } else if (msgLower.includes("simulate")) {
      const data = {
        familySize: 5,
        appliances: ["Heater", "Washing Machine"],
        pastBills: [140, 160, 150],
      };
      setPrefillData(data);
      navigate("/prediction");
      addBotMessage("Opening Prediction page for lifestyle simulation...");
      setTimeout(() =>
        highlightSequence([
          "#prediction-section",
          "#familySize-input",
          "#appliances-input",
          "#pastBills-input",
        ])
      , 700);
    } else if (msgLower.includes("upload")) {
      navigate("/upload");
      addBotMessage("Navigating to Upload page...");
      setTimeout(() => highlightElement("#upload-btn"), 500);
    } else {
      addBotMessage("Try the quick buttons for dashboard actions.");
    }
  };

  const quickReplies = [
    "Forecast next bill",
    "Upload bill",
    "Simulate lifestyle change",
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Chatbot Button */}
      <button
        onClick={toggleChat}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-110"
      >
        {isOpen ? "✖" : "💬"}
      </button>

      {/* Chat Window */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0 pointer-events-none"
        } w-80 h-96 bg-white dark:bg-gray-800 border rounded-lg shadow-lg flex flex-col overflow-hidden mt-2`}
      >
        {/* Messages */}
        <div className="flex-1 p-2 overflow-y-auto space-y-2">
          {messages.map((msg, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              {msg.type === "bot" ? (
                <>
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center animate-pulse">
                    🤖
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg flex-1">
                    {msg.text}
                  </div>
                </>
              ) : (
                <div className="ml-auto flex items-end space-x-2">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                    {msg.text}
                  </div>
                  <div className="w-8 h-8 bg-blue-300 dark:bg-blue-700 rounded-full flex items-center justify-center">
                    🙂
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center animate-pulse">
                🤖
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg animate-pulse">
                Typing...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        <div className="border-t p-2 flex flex-col">
          <div className="flex space-x-1 mb-1 overflow-x-auto">
            {quickReplies.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="bg-gray-200 dark:bg-gray-700 text-sm px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition transform hover:scale-105"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Type a message..."
              className="flex-1 border dark:border-gray-600 p-2 rounded mr-2 bg-gray-100 dark:bg-gray-700"
            />
            <button
              onClick={() => sendMessage(input)}
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
