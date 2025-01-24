// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const PostAnnouncements = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      setMessages([...messages, { text: currentMessage, sender: "Faculty" }]);
      setCurrentMessage(""); 
    }
  };

  return (
    <div className="flex flex-col h-screen bg-cl1">
      <header className="bg-cl4 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Post Announcements</h1>
      </header>

      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="overflow-y-auto mb-4 p-4 bg-cl5 rounded-lg h-96">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`mb-4 ${
                message.sender === "Faculty" ? "text-right" : "text-left"
              }`}
            >
              <p
                className={`inline-block p-2 rounded-lg ${
                  message.sender === "Faculty"
                    ? "bg-cl4 text-white"
                    : "bg-cl2 text-cl5"
                }`}
              >
                {message.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            className="flex-1 border border-cl3 rounded-lg p-2"
            placeholder="Type your message here..."
          />
          <button
            onClick={sendMessage}
            className="bg-cl4 text-white py-2 px-4 rounded-lg hover:bg-cl2 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAnnouncements;
