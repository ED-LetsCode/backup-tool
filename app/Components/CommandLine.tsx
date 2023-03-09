import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { SSH_Conversation } from "../Types/Types";
import Conversation from "./Conversation";

export default function CommandLine() {
  const [command, setCommand] = useState<string>("");
  const [conversations, setConversations] = useState<SSH_Conversation[]>([
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

  const sendCommand = async () => {
    const res = await fetch("/api/sshCommand", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: 0, client: command, server: "" }),
    });

    setConversations((prevConversations) => [
      { id: uuid(), client: command, server: "cd" },
      ...prevConversations,
    ]);

    setCommand("");
  };

  return (
    <div className="flex-col justify-center items-center bg-slate-200 w-full h-auto p-4 rounded-md shadow-md mt-4 overflow-x-auto ">
      <h1 className="font-bold text-sm">Command Line</h1>
      <input
        type="text"
        name="server"
        id="server"
        className="p-2 h-10 rounded-md shadow-md w-full mt-1"
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
