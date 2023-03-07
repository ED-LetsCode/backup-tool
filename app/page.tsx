import ConnectionInput from "./Components/ConnectionInput";

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-3xl text-white font-bold">SSH Backup Tool</h1>
      <div className="bg-slate-100 w-[90%] h-[80%] rounded-md shadow-md mt-3 p-4">
        <div className="flex flex-col justify-start items-center h-full w-full p-4 overflow-x-auto overflow-y-auto">
          <ConnectionInput />

          <div className="bg-slate-200 h-16 w-full mt-3 rounded-md shadow-md flex justify-around items-center">
            <h1>Database:</h1>
            <p>07.03.2023-22:02.02</p>

            <h1>Website:</h1>
            <p>05.03.2023-12:02.02</p>
            <button className="px-3 py-1 bg-green-400 h-8 rounded-md shadow-md text-white font-bold">
              Restore
            </button>
          </div>

          <div className="bg-slate-200 h-16 w-full mt-3 rounded-md shadow-md flex justify-around items-center">
            <h1>Database:</h1>
            <p>07.03.2023-22:02.02</p>

            <h1>Website:</h1>
            <p>05.03.2023-12:02.02</p>
            <button className="px-3 py-1 bg-green-400 h-8 rounded-md shadow-md text-white font-bold">
              Restore
            </button>
          </div>

          <div className="bg-slate-200 h-16 w-full mt-3 rounded-md shadow-md flex justify-around items-center">
            <h1>Database:</h1>
            <p>07.03.2023-22:02.02</p>

            <h1>Website:</h1>
            <p>05.03.2023-12:02.02</p>
            <button className="px-3 py-1 bg-green-400 h-8 rounded-md shadow-md text-white font-bold">
              Restore
            </button>
          </div>

          <div className="bg-slate-200 h-16 w-full mt-3 rounded-md shadow-md flex justify-around items-center">
            <h1>Database:</h1>
            <p>07.03.2023-22:02.02</p>

            <h1>Website:</h1>
            <p>05.03.2023-12:02.02</p>
            <button className="px-3 py-1 bg-green-400 h-8 rounded-md shadow-md text-white font-bold">
              Restore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
