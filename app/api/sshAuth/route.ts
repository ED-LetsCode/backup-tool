import { NextResponse } from "next/server";
import { SSHLoginData } from "@/app/Components/ConnectionInput";

import * as ssh2 from "ssh2";

export async function POST(request: Request) {
  const sshLoginData: SSHLoginData = await request.json();
  createSSHConnection(sshLoginData);
  return NextResponse.json({ statusCode: 200 });
}

function createSSHConnection(sshLoginData: SSHLoginData) {
  console.log(sshLoginData);

  // const config: ssh2.ConnectConfig = {
  //   host: sshLoginData.server,
  //   port: 22,
  //   username: sshLoginData.username,
  //   password: sshLoginData.password,
  // };

  // // Create a new SSH client
  // const client = new ssh2.Client();

  // // Connect to the server
  // client.on("ready", () => {
  //   console.log("Connected to server");
  //   // Do something with the SSH connection here
  // });

  // client.connect(config);

  // // Handle errors
  // client.on("error", (err) => {
  //   console.error("Error connecting to server:", err);
  // });
}
