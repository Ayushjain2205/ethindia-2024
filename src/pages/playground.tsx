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
  name: "Tate",
  image: "/robot-head.png",
  abilities: ["Twitter Analysis", "Market Prediction"],
  balance: 0.004,
  attack: 100,
  defense: 100,
  description: "A master of cryptocurrency trends and market analysis.",
};

const agent2: Agent = {
  id: "2",
  name: "Eliza",
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

  return <div className="font-bold text-lg">thinking{dots}</div>;
};

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentlyTyping, setCurrentlyTyping] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentlyTyping]);

  const handleConversation = async () => {
    if (!messages.length) {
      setMessages([]);
    }
    setIsStarted(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: messages.length
            ? messages[messages.length - 1].content
            : "What is zero?",
          turns: 4,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const messages = chunk.split("\n\n");

        for (const message of messages) {
          if (message.trim()) {
            try {
              const data = JSON.parse(message);
              if (data.error) {
                console.error("Stream error:", data.error);
                continue;
              }

              // Show typing indicator
              setCurrentlyTyping(data.agent);
              await new Promise((resolve) => setTimeout(resolve, 1000));

              // Add message
              setCurrentlyTyping(null);
              setMessages((prev) => [
                ...prev,
                {
                  sender: data.agent,
                  content: data.message,
                },
              ]);

              // Wait for a moment before processing the next message
              await new Promise((resolve) => setTimeout(resolve, 1000));
            } catch (e) {
              console.error("Error parsing message:", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsStarted(false);
      setCurrentlyTyping(null);
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
          {!isStarted && (
            <div className="items-center justify-center">
              <button
                onClick={handleConversation}
                className="rpgui-button"
                type="button"
              >
                {messages.length
                  ? "Continue Conversation"
                  : "Start Conversation"}
              </button>
            </div>
          )}
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
                    msg.sender === "tate"
                      ? "justify-start"
                      : msg.sender === "eliza"
                      ? "justify-end"
                      : "justify-center"
                  }`}
                >
                  <div
                    className={`p-4 rounded shadow-md ${
                      msg.sender === "chatbot"
                        ? "bg-blue-100 w-full mx-8"
                        : "bg-white w-3/4"
                    }`}
                  >
                    <div className="font-bold mb-1">
                      {msg.sender === "chatbot" ? "CDP Agent" : msg.sender}
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {currentlyTyping && (
                <div
                  className={`flex ${
                    currentlyTyping === "tate"
                      ? "justify-start"
                      : currentlyTyping === "eliza"
                      ? "justify-end"
                      : "justify-center"
                  }`}
                >
                  <div
                    className={`p-4 rounded shadow-md ${
                      currentlyTyping === "chatbot"
                        ? "bg-blue-100 w-full mx-8"
                        : "bg-white w-3/4"
                    }`}
                  >
                    <div className="font-bold mb-1">
                      {currentlyTyping === "chatbot"
                        ? "CDP Agent"
                        : currentlyTyping}
                    </div>
                    <LoadingDots />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
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
          <h2 className="rpgui-header text-white">{agent2.name}</h2>
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
