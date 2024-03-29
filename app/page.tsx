"use client";

import React, { ChangeEvent, useState } from "react";
import ConnectionInput from "./Components/ConnectionInput";
import Backup from "./Components/Backup";
import CommandLine from "./Components/CommandLine";
import TitleBar from "./Components/TitleBar";
import { SSHLoginData, SSH_Conversation } from "./Types/Types";
import { httpPost } from "./Helpers/HTTPMethods";
import { v4 as uuid } from "uuid";

export default function Home() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);
  const [showCommandLine, setShowCommandLine] = useState<boolean>(false);
  const [sshLoginData, setSSHLoginData] = useState<SSHLoginData>();
  const [backups, setBackups] = useState<string[]>();
  const [sshUserName, setSSHUserName] = useState<string>();
  const [pathToBackupFolder, setPathToBackupFolder] = useState<string>("");
  // Handle change on showCommandLine Button click
  const handleShowCommandLine = () => {
    setShowCommandLine((prevState) => !prevState);
  };

  const changePathToBackupFolder = (event: ChangeEvent<HTMLInputElement>) => {
    setPathToBackupFolder(event.target.value);
  };

  // Handle submit on buttonClick
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    formData: SSHLoginData
  ) => {
    event.preventDefault();
    setSSHLoginData(formData);

    try {
      const response = await httpPost("/api/sshAuth", formData);
      if (response.status === 404) {
        alert("Can't connect to Server");
        return;
      }
      const { server } = await response.json();
      setSSHUserName(server);
      setUserIsLoggedIn(true);
    } catch (err) {
      console.error(err);
    }
  };

  const getBackups = async () => {
    try {
      const response = await httpPost("/api/sshGetBackups", {
        pathToBackupFolder: pathToBackupFolder,
        sshLoginData,
      });

      const { sshConversation }: { sshConversation: SSH_Conversation } =
        await response.json();

      // TODO: Dirty Solution
      if (
        sshConversation.server.includes("No such file or directory") ||
        sshConversation.server.includes("cannot access")
      ) {
        alert(sshConversation.server);
        return;
      }

      const backupsArr = sshConversation.server
        .split("\n")
        .filter((backup) => backup != "")
        .filter((backup) => backup != "restore.sh")
        .filter((backup) => backup != "backup.sh");

      setBackups(backupsArr);
    } catch (err) {
      console.error(err);
    }
  };

  const createBackup = async () => {
    const response = await httpPost("/api/sshCreateBackup", {
      pathToBackupFolder: pathToBackupFolder,
      sshLoginData,
    });

    const { sshConversation }: { sshConversation: SSH_Conversation } =
      await response.json();

    alert(sshConversation.server);
  };

  const restoreBackup = async (backupName: string) => {
    const response = await httpPost("/api/sshRestoreBackup", {
      backupName: backupName,
      pathToBackupFolder: pathToBackupFolder,
      sshLoginData,
    });

    const { sshConversation }: { sshConversation: SSH_Conversation } =
      await response.json();

    alert(sshConversation.server);
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
                serverUserName={sshUserName}
                getBackups={getBackups}
                changePathToBackupFolder={changePathToBackupFolder}
                pathToBackupFolder={pathToBackupFolder}
                createBackup={createBackup}
              />
              {showCommandLine && <CommandLine />}
              {backups &&
                backups.map((backup) => (
                  <Backup
                    key={uuid()}
                    backup={backup}
                    restoreBackup={restoreBackup}
                  />
                ))}
            </>
          ) : (
            <ConnectionInput handleSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}
