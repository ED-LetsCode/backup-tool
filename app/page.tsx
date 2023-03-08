"use client";

import Backup from "./Components/Backup";
import ConnectionInput from "./Components/ConnectionInput";
import React, { useState } from "react";
import { SSHLoginData } from "./Types/Types";

export default function Home() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);

  // Handle submit on buttonClick
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    formData: SSHLoginData
  ) => {
    event.preventDefault();

    // try {
    //   const res = await fetch("/api/sshAuth", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   alert("Can't Connect to Server");

    //   console.log(await res.json());
    // } catch (error) {
    //   console.error(error);
    // }
    console.log(formData);
    setUserIsLoggedIn(true);
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-3xl text-white font-bold">SSH Backup Tool</h1>
      <div className="bg-slate-100 w-[90%] h-[80%] rounded-md shadow-md mt-3 p-4">
        <div className="flex flex-col justify-start items-center h-full w-full p-4 overflow-x-auto overflow-y-auto">
          <ConnectionInput handleSubmit={handleSubmit} />
          {userIsLoggedIn && <Backup />}
        </div>
      </div>
    </div>
  );
}
