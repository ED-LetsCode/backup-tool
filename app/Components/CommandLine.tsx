import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Conversation from "./Conversation";

interface Conversation {
  id: string;
  client: string;
  server: string;
}

export default function CommandLine() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: uuid(),
      client: "pwd",
      server: "home/user/eb",
    },
    {
      id: uuid(),
      client: "pwd",
      server: "home/user/",
    },
  ]);
  const [command, setCommand] = useState<string>("");

  const sendCommand = async () => {
    // const res = await fetch("/api/sshCommands", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(command),
    // });

    setCommand("");
  };

  return (
    <div className="flex-col justify-center items-center bg-slate-200 w-full h-auto p-4 rounded-md shadow-md mt-4">
      <h1 className="font-bold text-sm">Command Line</h1>
      <input
        type="text"
        name="server"
        id="server"
        className="p-2 h-8 rounded-md shadow-md w-full mt-1"
        onChange={(event) => setCommand(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && sendCommand()}
        value={command}
      />

      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
}
