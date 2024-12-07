import { useState } from "react";

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

  const sendMessage = (sender: string) => {
    if (inputMessage.trim()) {
      setMessages([...messages, { sender, content: inputMessage }]);
      setInputMessage("");
    }
  };

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
      <div className="w-2/4 ">
        <div className="h-full w-1/2 rpgui-container framed-golden">
          <div className="rpgui-container framed-golden-2">
            <p>Hello</p>
          </div>
        </div>
      </div>
      <div className="w-1/4 ">
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
