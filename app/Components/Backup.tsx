export default function Backup() {
  return (
    <div className="bg-slate-200 h-auto w-full mt-4 rounded-md shadow-md flex justify-around items-center md:flex-col py-4">
      <h1 className="font-bold">Database:</h1>
      <p>07.03.2023-22:02.02</p>

      <h1 className="md:mt-2 font-bold">Website:</h1>
      <p>05.03.2023-12:02.02</p>
      <button className="px-3 py-1 bg-green-400 h-8 rounded-md shadow-md text-white font-bold md:mt-2">
        Restore Backup
      </button>
    </div>
  );
}
