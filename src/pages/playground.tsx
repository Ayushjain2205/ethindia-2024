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
        <div className="h-full w-1/4 rpgui-container framed overflow-hidden">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus nostrum reiciendis, eum nisi, cumque laudantium
            quidem deserunt omnis tempore architecto rem doloribus eveniet
            dolorum cupiditate ipsa perferendis, doloremque qui suscipit.
          </p>
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
        <div className="h-full w-1/4 rpgui-container framed overflow-hidden">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus nostrum reiciendis, eum nisi, cumque laudantium
            quidem deserunt omnis tempore architecto rem doloribus eveniet
            dolorum cupiditate ipsa perferendis, doloremque qui suscipit.
          </p>
        </div>
      </div>
    </div>
  );
}
