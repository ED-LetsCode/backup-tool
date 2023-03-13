import { ChangeEvent } from "react";

interface TitleBarProps {
  handleShowCommandLine: () => void;
  getBackups: () => void;
  showCommandLine: boolean;
  serverUserName?: string;
  changePathToBackupFolder: (event: ChangeEvent<HTMLInputElement>) => void;
  pathToBackupFolder: string;
  createBackup: () => void;
}

export default function TitleBar({
  handleShowCommandLine,
  getBackups,
  showCommandLine,
  serverUserName,
  changePathToBackupFolder,
  pathToBackupFolder,
  createBackup,
}: TitleBarProps) {
  return (
    <div className="flex justify-center items-center gap-6 w-full xl:flex-col">
      <h1 className="font-bold">Hello😄👋 "{serverUserName}"</h1>
      <input
        className="px-3 py-1 max-w-[190px] rounded-md shadow-md"
        placeholder="Path to Website folder"
        onChange={changePathToBackupFolder}
        value={pathToBackupFolder}
      ></input>

      <button
        className="px-3 py-1 bg-green-400 hover:bg-green-300 min-w-[190px] text-white h-8 rounded-md shadow-md font-bold"
        onClick={getBackups}
      >
        Get Backups
      </button>
      <button
        className="px-3 py-1 bg-green-400 hover:bg-green-300 min-w-[190px] text-white h-8 rounded-md shadow-md font-bold"
        onClick={createBackup}
      >
        Create Backup
      </button>
      <button
        onClick={handleShowCommandLine}
        className={`px-3 py-1 bg-green-400 hover:bg-green-300 min-w-[190px] text-white h-8 rounded-md shadow-md font-bold ${
          showCommandLine && "bg-red-500 hover:bg-red-400"
        }`}
      >
        {showCommandLine ? "Hide Command Line" : "Show Command Line"}
      </button>
    </div>
  );
}
