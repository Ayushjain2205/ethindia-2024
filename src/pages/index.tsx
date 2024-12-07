import { useState } from "react";
import Layout from "../components/Layout";
import AgentSelection from "../components/AgentSelection";
import Chat from "../components/Chat";
import { WalletDefault } from "@coinbase/onchainkit/wallet";

interface Agent {
  id: string;
  name: string;
  description: string;
}

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleSelectAgent = (agent: Agent) => {
    setSelectedAgent(agent);
  };

  const handleBack = () => {
    setSelectedAgent(null);
  };

  return (
    <Layout>
      <WalletDefault />
      <h1 className="rpgui-header">AI Agent Game</h1>
      {selectedAgent ? (
        <Chat agentName={selectedAgent.name} onBack={handleBack} />
      ) : (
        <AgentSelection onSelectAgent={handleSelectAgent} />
      )}
    </Layout>
  );
}
