"use client";

import React, { useState } from "react";
import ConnectionInput from "./Components/ConnectionInput";
import Backup from "./Components/Backup";
import CommandLine from "./Components/CommandLine";
import TitleBar from "./Components/TitleBar";
import { SSHLoginData, SSH_ServerResponse } from "./Types/Types";

export default function Home() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(true);
  const [serverResponse, setServerResponse] = useState<SSH_ServerResponse>();
  const [showCommandLine, setShowCommandLine] = useState<boolean>(false);

  // Handle change on showCommandLine Button click
  const handleShowCommandLine = () => {
    setShowCommandLine((prevState) => !prevState);
  };

  // Handle submit on buttonClick
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    formData: SSHLoginData
  ) => {
    event.preventDefault();

    try {
      const res = await fetch("/api/sshAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 404) {
        alert("Can't connect to Server");
        return;
      }

      setServerResponse(await res.json());
      setUserIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-3xl text-white font-bold">SSH Backup Tool</h1>
      <div className="bg-slate-100 w-[90%] h-[80%] rounded-md shadow-md mt-3 p-4">
        <div className="flex flex-col justify-start items-center h-full w-full p-4 overflow-x-auto overflow-y-auto">
          {/* If user is logged in show components else show login form*/}
          {userIsLoggedIn ? (
            <>
              <TitleBar
                handleShowCommandLine={handleShowCommandLine}
                showCommandLine={showCommandLine}
                serverUserName={serverResponse?.output}
              />
              {showCommandLine && <CommandLine />}
              <Backup />
            </>
          ) : (
            <ConnectionInput handleSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}
