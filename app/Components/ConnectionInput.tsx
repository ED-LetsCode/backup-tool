"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(
      `/api/sshAuth?server=${formData.server}&username=${formData.username}&password=${formData.password}`
    );
    console.log(formData);
    setFormData(emptyFormDataObj);
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="flex justify-center items-center bg-slate-200 w-full h-auto p-4 rounded-md shadow-md overflow-x-auto mb-3 "
    >
      {/* SSH Server */}
      <label htmlFor="server" className="font-bold">
        Server
      </label>
      <input
        type="text"
        name="server"
        id="server"
        className="ml-3 p-2 h-8 rounded-md shadow-md"
        onChange={handleChange}
      />

      {/* SSH Username */}
      <label htmlFor="username" className="ml-5 font-bold">
        SSH Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        className="ml-3 p-2 h-8 rounded-md shadow-md"
        onChange={handleChange}
      />

      {/* SSH Password */}
      <label htmlFor="password" className="ml-5 font-bold">
        SSH Password
      </label>
      <input
        type="text"
        name="password"
        id="password"
        className="ml-3 p-2 h-8 rounded-md shadow-md"
        onChange={handleChange}
      />

      <button className="ml-5 px-3 py-1 bg-green-400 h-8 rounded-md shadow-md text-white font-bold">
        Connect SSH
      </button>
    </form>
  );
}
