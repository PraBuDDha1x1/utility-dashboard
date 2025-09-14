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

  // --- Draggable state ---
  const chatRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const [position, setPosition] = useState({ x: 20, y: 20 }); // default bottom-right offset

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
      setTimeout(
        () =>
          highlightSequence([
            "#prediction-section",
            "#familySize-input",
            "#appliances-checkboxes",
            "#pastBills-input",
          ]),
        700
      );
    } else if (msgLower.includes("simulate")) {
      const data = {
        familySize: 5,
        appliances: ["Heater", "Washing Machine"],
        pastBills: [140, 160, 150],
      };
      setPrefillData(data);
      navigate("/prediction");
      addBotMessage("Opening Prediction page for lifestyle simulation...");
      setTimeout(
        () =>
          highlightSequence([
            "#prediction-section",
            "#familySize-input",
            "#appliances-checkboxes",
            "#pastBills-input",
          ]),
        700
      );
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

  // --- Dragging handlers ---
  const handleMouseDown = (e) => {
    if (chatRef.current && e.target.closest(".chat-header")) {
      pos.current = {
        offsetX: e.clientX - position.x,
        offsetY: e.clientY - position.y,
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX - pos.current.offsetX,
      y: e.clientY - pos.current.offsetY,
    });
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div>
      {/* Floating Chatbot Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-[120px] right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-110 z-[9999]"
      >
        {isOpen ? "✖" : "💬"}
      </button>

      {/* Draggable Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          onMouseDown={handleMouseDown}
          className="fixed w-80 h-96 bg-white dark:bg-gray-800 border rounded-lg shadow-lg flex flex-col overflow-hidden z-[9998] cursor-move"
          style={{ left: position.x, top: position.y }}
        >
          {/* Header (draggable handle) */}
          <div className="chat-header bg-blue-500 text-white px-3 py-2 flex justify-between items-center">
            <span>Assistant</span>
            <button onClick={toggleChat} className="font-bold">
              ✖
            </button>
          </div>

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

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center animate-pulse">
                  🤖
                </div>
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg flex-1">
                  Typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Send
              </button>
            </form>

            {/* Quick reply buttons */}
            <div className="flex space-x-2 mt-2">
              {quickReplies.map((text, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(text)}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
