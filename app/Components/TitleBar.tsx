interface TitleBarProps {
  handleShowCommandLine: () => void;
  getBackups: () => void;
  showCommandLine: boolean;
  serverUserName?: string;
}

export default function TitleBar({
  handleShowCommandLine,
  getBackups,
  showCommandLine,
  serverUserName,
}: TitleBarProps) {
  return (
    <div className="flex justify-center items-center gap-6 w-full md:flex-col">
      <h1 className="font-bold">Hello😄👋 "{serverUserName}"</h1>
      <button
        className="px-3 py-1 bg-green-400 hover:bg-green-300 text-white h-8 rounded-md shadow-md font-bold"
        onClick={getBackups}
      >
        Get Backups
      </button>
      <button
        onClick={handleShowCommandLine}
        className={`px-3 py-1 bg-green-400 hover:bg-green-300 text-white h-8 rounded-md shadow-md font-bold ${
          showCommandLine && "bg-red-500 hover:bg-red-400"
        }`}
      >
        {showCommandLine ? "Hide Command Line" : "Show Command Line"}
      </button>
    </div>
  );
}
