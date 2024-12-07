import Head from "next/head";
import { ReactNode, useEffect } from "react";

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
          {children}
        </div>
      </div>
    </>
  );
}
