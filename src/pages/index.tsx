import { useState } from "react";
import Layout from "../components/Layout";
import Image from "next/image";

interface Agent {
  id: string;
  name: string;
  image: string;
  abilities: string[];
  balance: number;
}

const agent: Agent = {
  id: "1",
  name: "Crypto Sage",
  image: "/placeholder.svg?height=100&width=100",
  abilities: [" Analysis"],
  balance: 5000,
};

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center gap-1 rpgui-container framed-golden h-[400px] w-[300px]">
        <img
          src="/robot-head.png"
          className="w-24 h-24 rounded-full"
          alt="robot head"
        />
        <h2 className="rpgui-header">{agent.name}</h2>
        {agent.abilities.map((ability) => (
          <button
            className="rpgui-button flex items-center justify-center"
            type="button"
          >
            <p className="text-[16px] mb-0">{ability}</p>
          </button>
        ))}
        <button className="flex rpgui-button golden" type="button">
          <p className="mt-4">0.004 ETH </p>
        </button>
      </div>
    </Layout>
  );
}
