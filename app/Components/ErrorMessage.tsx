export default function errorMessage({
  errorMessage,
}: {
  errorMessage: string | null;
}) {
  return (
    <div className="flex justify-center items-center xl:flex-col bg-slate-200 w-full h-auto p-4 rounded-md shadow-md mt-4">
      <h1 className="font-bold text-red-500">Error Message</h1>
      <p>{errorMessage}</p>
    </div>
  );
}
