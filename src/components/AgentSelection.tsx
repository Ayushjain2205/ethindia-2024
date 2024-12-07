import { useState } from "react";

interface Agent {
  id: string;
  name: string;
  description: string;
}

const agents: Agent[] = [
  {
    id: "twitter",
    name: "Twitter Analyzer",
    description: "Analyzes Twitter trends and sentiments",
  },
  {
    id: "wallet",
    name: "Wallet Analyzer",
    description: "Examines cryptocurrency wallet activities",
  },
  {
    id: "dex",
    name: "DEX Agent",
    description: "Provides insights on decentralized exchanges",
  },
];

interface AgentSelectionProps {
  onSelectAgent: (agent: Agent) => void;
}

export default function AgentSelection({ onSelectAgent }: AgentSelectionProps) {
  return (
    <div className="rpgui-container framed-golden agent-selection">
      <h2 className="rpgui-header">Select an AI Agent</h2>
      <div className="agent-list">
        {agents.map((agent) => (
          <div key={agent.id} className="agent-item">
            <button
              className="rpgui-button"
              type="button"
              onClick={() => onSelectAgent(agent)}
            >
              <span>{agent.name}</span>
            </button>
            <p className="agent-description">{agent.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
