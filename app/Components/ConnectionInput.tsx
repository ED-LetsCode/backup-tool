"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SSH_ServerResponse } from "../api/sshAuth/route";

export interface SSHLoginData {
  server: string;
  username: string;
  password: string;
}

export default function ConnectionInput() {
  // Empty form data object
  const emptyFormDataObj: SSHLoginData = {
    server: "",
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState<SSHLoginData>(emptyFormDataObj);

  // Handle userinput onChange
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle submit on buttonClick
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/sshAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(await res.json());
    } catch (error) {
      console.error(error);
    }

    // setFormData(emptyFormDataObj);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center xl:flex-col bg-slate-200 w-full h-auto p-4 rounded-md shadow-md"
    >
      {/* SSH Server */}
      <label htmlFor="server" className="font-bold">
        Server
      </label>
      <input
        type="text"
        name="server"
        id="server"
        className="ml-3 mt-1 p-2 h-8 rounded-md shadow-md"
        onChange={handleChange}
      />

      {/* SSH Username */}
      <label htmlFor="username" className="ml-5 font-bold xl:mt-2">
        SSH Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        className="ml-3 mt-1 p-2 h-8 rounded-md shadow-md"
        onChange={handleChange}
      />

      {/* SSH Password */}
      <label htmlFor="password" className="ml-5 font-bold xl:mt-2">
        SSH Key/Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="ml-3 mt-1 p-2 h-8 rounded-md shadow-md"
        onChange={handleChange}
      />

      <button className="ml-5 px-3 py-1 bg-green-400 h-8 rounded-md shadow-md text-white font-bold xl:mt-3">
        Connect
      </button>
    </form>
  );
}
