interface TitleBarProps {
  handleShowCommandLine: () => void;
  showCommandLine: boolean;
  serverUserName?: string;
}

export default function TitleBar({
  handleShowCommandLine,
  showCommandLine,
  serverUserName,
}: TitleBarProps) {
  return (
    <div className="flex justify-center items-center gap-6 w-full md:flex-col">
      <h1 className="font-bold">Hello😄👋 "{serverUserName}"</h1>
      <button
        onClick={handleShowCommandLine}
        className={`px-3 py-1 bg-green-400 text-white h-8 rounded-md shadow-md font-bold ${
          showCommandLine && "bg-red-500"
        }`}
      >
        {showCommandLine ? "Hide Command Line" : "Show Command Line"}
      </button>
    </div>
  );
}
