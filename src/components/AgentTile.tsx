import Image from "next/image";

interface AgentTileProps {
  agent: {
    id: string;
    name: string;
    image: string;
    abilities: string[];
    balance: number;
  };
}

export default function AgentTile({ agent }: AgentTileProps) {
  return (
    <div className="flex flex-col items-center gap-1 rpgui-container framed-golden h-[450px] w-[300px] relative z-0">
      <img
        src="/robot-head.png"
        className="w-24 h-24 rounded-full"
        alt="robot head"
      />
      <h2 className="rpgui-header">{agent.name}</h2>
      {agent.abilities.map((ability, index) => (
        <button
          key={index}
          className="rpgui-button flex items-center justify-center"
          type="button"
        >
          <p className="text-[16px] mb-0">{ability}</p>
        </button>
      ))}
      <button className="flex rpgui-button golden" type="button">
        <p className="mt-4">0.004 ETH </p>
      </button>

      <div className="flex items-center justify-center gap-12 mt-8">
        <div className="flex items-center justify-center">
          <div className="rpgui-icon sword"></div>
          <p className="text-white">100</p>
        </div>
        <div className="flex items-center justify-center">
          <div className="rpgui-icon shield"></div>
          <p className="text-white">100</p>
        </div>
      </div>
    </div>
  );
}
