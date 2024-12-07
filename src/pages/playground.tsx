import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface Agent {
  id: string;
  name: string;
  image: string;
  abilities: string[];
  balance: number;
  attack: number;
  defense: number;
  description: string;
}

interface Message {
  sender: string;
  content: string;
}

const agent1: Agent = {
  id: "1",
  name: "Crypto Sage",
  image: "/robot-head.png",
  abilities: ["Twitter Analysis", "Market Prediction"],
  balance: 0.004,
  attack: 100,
  defense: 100,
  description: "A master of cryptocurrency trends and market analysis.",
};

const agent2: Agent = {
  id: "2",
  name: "Data Miner",
  image: "/robot-head.png",
  abilities: ["Pattern Recognition", "Data Extraction"],
  balance: 0.006,
  attack: 80,
  defense: 120,
  description:
    "Specializes in extracting valuable insights from large datasets.",
};

const LoadingDots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <div className="font-bold text-lg">{dots}</div>;
};

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      sender: "User",
      content: inputMessage,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from chatbot");
      }

      const data = await response.json();

      // Add bot messages from responses
      if (data.responses) {
        data.responses.forEach((response: any) => {
          const botMessage: Message = {
            sender: response.type === "agent" ? agent1.name : agent2.name,
            content: response.content,
          };
          setMessages((prev) => [...prev, botMessage]);
        });
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        sender: agent1.name,
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full min-h-screen">
      <div className="w-1/4">
        <div className="flex flex-col gap-4 items-center h-full w-1/4 rpgui-container framed overflow-hidden">
          <img
            src="/robot-head.png"
            className="w-48 h-48 rounded-full mt-6"
            alt="robot head"
          />
          <h2 className="rpgui-header text-white">{agent1.name}</h2>
          <div className="flex gap-4">
            <img src="/x.png" className="w-12 h-12 rounded-md" alt="x" />
            <img
              src="/telegram.png"
              className="w-12 h-12 rounded-md"
              alt="twitter"
            />
            <img
              src="/discord.png"
              className="w-12 h-12 rounded-md"
              alt="discord"
            />
            <img
              src="/reddit.png"
              className="w-12 h-12 rounded-md"
              alt="reddit"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <img src="/wallet.png" className="w-12 h-12" alt="dollar" />
            <p className="text-[16px] text-white mb-0">0xacda...1212</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus nostrum reiciendis, eum nisi, cumque laudantium
          </p>
          <button
            className="rpgui-button flex items-center justify-center"
            type="button"
          >
            <p className="text-[16px] text-white mb-0">Repuation:100</p>
          </button>
          <div className="flex items-center justify-center gap-2">
            <img src="/dollar.png" className="w-12 h-12" alt="dollar" />
            <p className="text-[16px] text-white mb-0">0.004 ETH</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <img src="/frame.png" className="w-12 h-12" alt="nfts" />
            <p className="text-[16px] text-white mb-0">4 NFTs</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <img src="/memecoin.png" className="w-12 h-12" alt="memecoins" />
            <p className="text-[16px] text-white mb-0">10 Memecoins</p>
          </div>
        </div>
      </div>
      <div className="w-2/4">
        <div className="h-full w-1/2 rpgui-container framed-golden overflow-y-auto">
          <div className="h-full flex flex-col">
            <div className="flex-1 flex flex-col gap-4 p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === agent1.name ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className="bg-white p-4 rounded shadow-md"
                    style={{ width: "75%" }}
                  >
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="bg-white p-4 rounded shadow-md"
                    style={{ width: "75%" }}
                  >
                    <LoadingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="Type your message..."
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="rpgui-button"
                  disabled={isLoading}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-1/4">
        <div className="flex flex-col gap-4 items-center h-full w-1/4 rpgui-container framed overflow-hidden">
          <img
            src="/robot-head.png"
            className="w-48 h-48 rounded-full mt-6"
            alt="robot head"
          />
          <h2 className="rpgui-header text-white">{agent1.name}</h2>
          <div className="flex gap-4">
            <img src="/x.png" className="w-12 h-12 rounded-md" alt="x" />
            <img
              src="/telegram.png"
              className="w-12 h-12 rounded-md"
              alt="twitter"
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            <img src="/wallet.png" className="w-12 h-12" alt="dollar" />
            <p className="text-[16px] text-white mb-0">0xacda...1212</p>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus nostrum reiciendis, eum nisi, cumque laudantium
          </p>
          <button
            className="rpgui-button flex items-center justify-center"
            type="button"
          >
            <p className="text-[16px] text-white mb-0">Repuation:100</p>
          </button>
          <div className="flex items-center justify-center gap-2">
            <img src="/dollar.png" className="w-12 h-12" alt="dollar" />
            <p className="text-[16px] text-white mb-0">0.004 ETH</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <img src="/frame.png" className="w-12 h-12" alt="nfts" />
            <p className="text-[16px] text-white mb-0">4 NFTs</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <img src="/memecoin.png" className="w-12 h-12" alt="memecoins" />
            <p className="text-[16px] text-white mb-0">10 Memecoins</p>
          </div>
        </div>
      </div>
    </div>
  );
}
