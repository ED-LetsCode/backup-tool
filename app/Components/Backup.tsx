import { SSHLoginData } from "../Types/Types";

export default function Backup({
  backup,
  restoreBackup,
}: {
  backup: string;
  restoreBackup: (backupName: string) => void;
}) {
  return (
    <div className="bg-slate-200 h-auto w-full mt-4 rounded-md shadow-md flex justify-between items-center md:flex-col p-4">
      <div className="flex">
        <h1 className="font-bold mr-2">Name:</h1>
        <p>{backup}</p>
      </div>

      {/* <h1 className="md:mt-2 font-bold">Website:</h1>
      <p>05.03.2023-12:02.02</p> */}
      <button
        className="px-3 py-1 bg-green-400 hover:bg-green-300 h-8 rounded-md shadow-md text-white font-bold md:mt-2"
        onClick={() => restoreBackup(backup)}
      >
        Restore Backup
      </button>
    </div>
  );
}
