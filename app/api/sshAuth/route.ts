// import {
//   ClientServerCommunication,
//   SSHLoginData,
//   SSH_ServerResponse,
// } from "@/app/Types/Types";
// import { NextResponse } from "next/server";
// import SSH from "simple-ssh";
// // import { getSSH, initializeSSHConnection } from "@/app/Helpers/SSH";
// import { Client } from "ssh2";

import { NextResponse } from "next/server";
import { Client } from "ssh2";
import { SSHLoginData } from "@/app/Types/Types";
// import { sshConnection, setSSHConnection } from "@/app/Helpers/SSH";

interface SSHConnection {
  conn: Client;
  stream: any;
}

export let sshConnection: SSHConnection;

export async function POST(request: Request) {
  try {
    const sshLoginData: SSHLoginData = await request.json();
    const sshServerResponse = await createSSHConnection(sshLoginData);
    return NextResponse.json({ status: 200, message: "Login was succesfull" });
  } catch (err) {
    console.log(err);
    return new NextResponse("Login failed", { status: 401 });
  }
}

async function createSSHConnection(
  sshLoginData: SSHLoginData
): Promise<SSHConnection> {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn
      .on("ready", () => {
        console.log("Client :: ready");
        conn.shell((err, stream) => {
          if (err) {
            reject(err);
            return;
          }
          // Send the command to the server
          stream.write("whoami\n");

          resolve({ conn, stream });
        });
      })
      .on("error", (err) => {
        reject(err);
      })
      .connect({
        host: sshLoginData.server,
        port: 22,
        username: sshLoginData.username,
        password: sshLoginData.password,
      });
  });
}

// V2 -------------
// let sshConnection: SSHConnection;

// export async function POST(request: Request) {
//   try {
//     const sshLoginData: SSHLoginData = await request.json();
//     const sshServerResponse = await createSSHConnection(sshLoginData);
//     console.log(sshServerResponse);
//     return NextResponse.json({ server: "", username: "", password: "" });
//   } catch (err) {
//     console.log(err);
//     return new NextResponse("Login failed", { status: 401 });
//   }
// }

// async function createSSHConnection(
//   sshLoginData: SSHLoginData
// ): Promise<SSHConnection> {
//   return new Promise((resolve, reject) => {
//     const conn = new Client();
//     conn
//       .on("ready", () => {
//         console.log("Client :: ready");
//         conn.shell((err, stream) => {
//           if (err) {
//             reject(err);
//             return;
//           }
//           // Send the command to the server
//           stream.write("whoami\n");

//           sshConnection = { conn, stream };
//           resolve(sshConnection);
//         });
//       })
//       .on("error", (err) => {
//         reject(err);
//       })
//       .connect({
//         host: sshLoginData.server,
//         port: 22,
//         username: sshLoginData.username,
//         password: sshLoginData.password,
//       });
//   });
// }

// export async function sendCommand(
//   request: Request
// ): Promise<ClientServerCommunication> {
//   const communication: ClientServerCommunication = await request.json();
//   const sshServerResponse = await sendSSHCommand(communication);
//   return sshServerResponse;
// }

// async function sendSSHCommand(
//   communication: ClientServerCommunication
// ): Promise<ClientServerCommunication> {
//   return new Promise((resolve, reject) => {
//     sshConnection.stream.write(`${communication.client}\n`);
//     sshConnection.stream
//       .on("data", (data: string) => {
//         console.log("OUTPUT: " + data);
//         communication.server = data;
//       })
//       .stderr.on("data", (data: string) => {
//         console.log("STDERR: " + data);
//         communication.server = data;
//       })
//       .on("close", (code: number, signal: any) => {
//         console.log("Stream :: close :: code: " + code + ", signal: " + signal);
//         resolve(communication);
//       });
//   });
// }

//  V1-----------------------------
// export let sshConnection: SSHConnection;

// export async function POST(request: Request) {
//   try {
//     const sshLoginData: SSHLoginData = await request.json();
//     const sshServerResponse = await createSSHConnection(sshLoginData);
//     console.log(sshServerResponse);
//     // return NextResponse.json(sshServerResponse);
//     return NextResponse.json({ server: "", username: "", password: "" });
//   } catch (err) {
//     return new NextResponse("Not found", { status: 404 });
//   }
// }

// interface SSHConnection {
//   conn: Client;
//   stream: any;
// }

// async function createSSHConnection(
//   sshLoginData: SSHLoginData
// ): Promise<SSHConnection> {
//   return new Promise((resolve, reject) => {
//     const conn = new Client();
//     conn
//       .on("ready", () => {
//         console.log("Client :: ready");
//         conn.shell((err, stream) => {
//           if (err) {
//             reject(err);
//             return;
//           }

//           // Send the command to the server
//           stream.write("whoami\n");
//           sshConnection = { conn, stream };
//           resolve(sshConnection);
//         });
//       })
//       .on("error", (err) => {
//         reject(err);
//       })
//       .connect({
//         host: sshLoginData.server,
//         port: 22,
//         username: sshLoginData.username,
//         password: sshLoginData.password,
//       });
//   });
// }

// async function createSSHConnection(
//   sshLoginData: SSHLoginData
// ): Promise<SSH_ServerResponse> {
//   // Create ssh obj with loginData
//   await initializeSSHConnection(sshLoginData);
//   const ssh = getSSH();
//   let sshServerResponse: SSH_ServerResponse = {
//     output: "",
//     error: "",
//     exitCode: 0,
//   };

//   return new Promise((resolve, reject) => {
//     // If an error occurs when connecting to the server, the promise should be rejected
//     ssh.on("error", (err: string) => {
//       ssh.end();
//       reject(err);
//     });

//     // Connect to the server and retrieve all necessary data
//     ssh
//       .exec("whoami", {
//         out: (stdout: string) => {
//           // Split by every line break
//           sshServerResponse.output = stdout;
//           resolve(sshServerResponse);
//         },
//         err: (stderr: string) => {
//           sshServerResponse.error = stderr;
//         },
//         // exit: (code: number) => {S
//         //   sshServerResponse.exitCode = code;
//         //   resolve(sshServerResponse);
//         // },
//       })
//       .start();
//   });
// }
