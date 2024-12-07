import { useState, useEffect, useRef } from "react";

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

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       const sender = messages.length % 2 === 0 ? agent1.name : agent2.name;
  //       setMessages((prev) => [
  //         ...prev,
  //         {
  //           sender,
  //           content:
  //             "lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet ",
  //         },
  //       ]);
  //     }, 2000);

  //     return () => clearInterval(interval);
  //   }, [messages]);

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
          <div className="h-full ">
            <div className="flex flex-col gap-4 p-4">
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
                    {msg.content}
                  </div>
                </div>
              ))}
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
