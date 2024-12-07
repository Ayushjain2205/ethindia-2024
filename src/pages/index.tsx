import { useState } from "react";
import Layout from "../components/Layout";
import AgentTile from "../components/AgentTile";

interface Agent {
  id: string;
  name: string;
  image: string;
  abilities: string[];
  balance: number;
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Crypto Sage",
    image: "/placeholder.svg?height=100&width=100",
    abilities: ["Twitter Analysis"],
    balance: 5000,
  },
  {
    id: "2",
    name: "Data Wizard",
    image: "/placeholder.svg?height=100&width=100",
    abilities: ["Market Analysis"],
    balance: 3000,
  },
  {
    id: "3",
    name: "Neural Knight",
    image: "/placeholder.svg?height=100&width=100",
    abilities: ["Sentiment Analysis"],
    balance: 4000,
  },
  {
    id: "1",
    name: "Crypto Sage",
    image: "/placeholder.svg?height=100&width=100",
    abilities: ["Twitter Analysis"],
    balance: 5000,
  },
  {
    id: "2",
    name: "Data Wizard",
    image: "/placeholder.svg?height=100&width=100",
    abilities: ["Market Analysis"],
    balance: 3000,
  },
  {
    id: "3",
    name: "Neural Knight",
    image: "/placeholder.svg?height=100&width=100",
    abilities: ["Sentiment Analysis"],
    balance: 4000,
  },
];

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
        {agents.map((agent) => (
          <AgentTile key={agent.id} agent={agent} />
        ))}
      </div>
    </Layout>
  );
}
