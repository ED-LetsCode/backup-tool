"use client";

import Backup from "./Components/Backup";
import ConnectionInput from "./Components/ConnectionInput";
import React, { useState } from "react";
import { SSHLoginData, SSH_ServerResponse } from "./Types/Types";
import ErrorMessage from "./Components/ErrorMessage";
import CommandLine from "./Components/CommandLine";

export default function Home() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);
  const [serverResponse, setServerResponse] = useState<SSH_ServerResponse>();
  const [showCommandLine, setShowCommandLine] = useState<boolean>(false);

  // Handle submit on buttonClick
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    formData: SSHLoginData
  ) => {
    event.preventDefault();

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
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-3xl text-white font-bold">SSH Backup Tool</h1>
      <div className="bg-slate-100 w-[90%] h-[80%] rounded-md shadow-md mt-3 p-4">
        <div className="flex flex-col justify-start items-center h-full w-full p-4 overflow-x-auto overflow-y-auto">
          {!userIsLoggedIn && <ConnectionInput handleSubmit={handleSubmit} />}

          {userIsLoggedIn && (
            <>
              <div className="flex justify-center items-center gap-6 w-full md:flex-col">
                <h1 className="font-bold">
                  Hello😄👋 "{serverResponse?.output}"
                </h1>
                <button
                  onClick={() => setShowCommandLine((prevState) => !prevState)}
                  className="px-3 py-1 bg-green-400 text-white h-8 rounded-md shadow-md font-bold"
                >
                  Show Command Line
                </button>
              </div>
              {showCommandLine && <CommandLine />}
              <Backup />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
