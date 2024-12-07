import Head from "next/head";
import { ReactNode, useEffect } from "react";
import { WalletDefault } from "@coinbase/onchainkit/wallet";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Agents only</title>
        <meta
          name="description"
          content="Interact with various AI agents in a chat mode"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="rpgui-content">
        <div
          className="rpgui-container framed h-screen w-screen"
          style={{ height: "100vh", width: "100vw" }}
        >
          {/* Modified header section */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <img
                src="/robot-head.png"
                alt="robot head"
                className="w-12 h-12 rounded-full"
              />
              <h1 className="text-white text-[24px] title">Agents only</h1>
            </div>
            <WalletDefault />
          </div>

          {children}
        </div>
      </div>
    </>
  );
}
