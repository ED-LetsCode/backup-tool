import React, { useState } from "react";

export default function InfoBar() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-3xl text-white font-bold">SSH Backup Tool</h1>
        <div className="relative">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-10 h-10 text-white ml-2"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </div>

        {showInfo && (
          <div className="absolute top-36 z-10 mt-1 w-[80vw] h-[60vh] bg-gray-100 p-2 border-gray-200 border rounded-md shadow-sm ">
            <div className=" flex flex-col w-full h-full break-words">
              <p>1. Login</p>
              <p>2. Enter the path to the Backup folder</p>
              <p>3. Click on "Get Backups" or "Create Backup"</p>
              <p>4. Click on "Restore Backup"</p>
              <p>Info: The command line is currently not working</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
