import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

interface Connections {
  twitter: boolean;
  telegram: boolean;
  discord: boolean;
  reddit: boolean;
}

interface NewAgent {
  name: string;
  image: string;
  abilities: string[];
  balance: number;
  attack: number;
  defense: number;
  connections: Connections;
}

export default function CreateAgent() {
  const router = useRouter();
  const [newAgent, setNewAgent] = useState<NewAgent>({
    name: "",
    image: "/robot-head.png",
    abilities: [""],
    balance: 0,
    attack: 50,
    defense: 50,
    connections: {
      twitter: false,
      telegram: false,
      discord: false,
      reddit: false,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAgent({ ...newAgent, [name]: value });
  };

  const handleAbilityChange = (index: number, value: string) => {
    const newAbilities = [...newAgent.abilities];
    newAbilities[index] = value;
    setNewAgent({ ...newAgent, abilities: newAbilities });
  };

  const addAbility = () => {
    setNewAgent({ ...newAgent, abilities: [...newAgent.abilities, ""] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend or state management
    console.log("New Agent:", newAgent);
    // Redirect to home page or agent list page
    router.push("/");
  };

  const handleConnectionChange = (connectionName: keyof Connections) => {
    setNewAgent({
      ...newAgent,
      connections: {
        ...newAgent.connections,
        [connectionName]: !newAgent.connections[connectionName],
      },
    });
  };

  return (
    <Layout>
      <div className="flex p-4 gap-32">
        <div className="w-1/2 ">
          <div className="flex flex-col gap-4 w-1/2 rpgui-container framed-golden">
            <div className="flex justify-center">
              <div className="h-32 w-32 rounded-full bg-red-500"></div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea id="description" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="abilities">Ability</label>
              <select className="rpgui-dropdown p-1">
                <option value="influencer">Influencer</option>
                <option value="analyst">Analyst</option>
                <option value="trader">Trader</option>
                <option value="investor">Investor</option>
              </select>
            </div>
            <div className="flex flex-col gap-0 mt-2">
              <label htmlFor="degeneracy">Degeneracy</label>
              <input
                className="rpgui-slider golden"
                type="range"
                min="0"
                max="10"
                value="8"
              ></input>
            </div>
            <div className="flex flex-col gap-0 mt-2">
              <label htmlFor="connection">Connections</label>
              <div className="flex items-center gap-2">
                <input
                  className="rpgui-checkbox"
                  type="checkbox"
                  checked={newAgent.connections.twitter}
                  onChange={() => handleConnectionChange("twitter")}
                />
                <label>Twitter</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="rpgui-checkbox"
                  type="checkbox"
                  checked={newAgent.connections.telegram}
                  onChange={() => handleConnectionChange("telegram")}
                />
                <label>Telegram</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="rpgui-checkbox"
                  type="checkbox"
                  checked={newAgent.connections.discord}
                  onChange={() => handleConnectionChange("discord")}
                />
                <label>Discord</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="rpgui-checkbox"
                  type="checkbox"
                  checked={newAgent.connections.reddit}
                  onChange={() => handleConnectionChange("reddit")}
                />
                <label>Reddit</label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 ml-32">
          <div className="flex flex-col gap-4 w-2/5 rpgui-container framed-golden-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Character File</label>
              <textarea id="description" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">OpenAI API Key</label>
              <input type="password" id="name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Twitter Username</label>
              <input type="password" id="name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Twitter Password</label>
              <input type="password" id="name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Twitter Email</label>
              <input type="password" id="name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Telegram Bot Token</label>
              <input type="password" id="name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Discord Application ID</label>
              <input type="password" id="name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Discord API Token</label>
              <input type="password" id="name" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Reddit API Token</label>
              <input type="password" id="name" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
