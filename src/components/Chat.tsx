import { useState, useEffect, useRef } from "react";

interface Message {
  sender: "user" | "agent";
  content: string;
}

interface ChatProps {
  agentName: string;
  onBack: () => void;
}

export default function Chat({ agentName, onBack }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", content: input }]);
      setInput("");
      // Simulate agent response (replace with actual AI logic later)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "agent", content: `${agentName} response to: ${input}` },
        ]);
      }, 1000);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="rpgui-container framed-golden p-4 flex justify-between items-center">
        <h2 className="rpgui-header text-xl">{agentName}</h2>
        <button className="rpgui-button" type="button" onClick={onBack}>
          <span>Back</span>
        </button>
      </div>
      <div className="rpgui-container framed flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`rpgui-container framed-grey inline-block max-w-[80%] p-3 ${
                message.sender === "user" ? "bg-blue-900" : "bg-green-900"
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="rpgui-container framed-golden p-4 flex">
        <input
          type="text"
          className="rpgui-input flex-grow mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message here..."
        />
        <button className="rpgui-button" type="button" onClick={handleSend}>
          <span>Send</span>
        </button>
      </div>
    </div>
  );
}
