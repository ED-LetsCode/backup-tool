"use client";

import React, { useState } from "react";
import { SSHLoginData } from "../Types/Types";

interface PropsType {
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: SSHLoginData
  ) => void;
}

export default function ConnectionInput(props: PropsType) {
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

  return (
    <form
      onSubmit={(event) => props.handleSubmit(event, formData)}
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
        SSH Password
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
