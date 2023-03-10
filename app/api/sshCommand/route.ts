// import { getSSH } from "@/app/Helpers/SSH";
import { sshConnection } from "@/app/Helpers/SSH";
import { ClientServerCommunication, SSH_Conversation } from "@/app/Types/Types";
import { NextResponse } from "next/server";
// import { sendCommand } from "../sshAuth/route";

export async function POST(request: Request) {
  let clientServerCommunication: ClientServerCommunication =
    await sendSSHCommand(await request.json());
  console.log(clientServerCommunication);
  // const conversation: SSH_Conversation = await request.json();
  // const testconversation = await sendCommandsToServer(conversation);
  // console.log(testconversation);
  return new NextResponse("Sucess", { status: 200 });
}

export async function sendCommand(
  request: Request
): Promise<ClientServerCommunication> {
  const communication: ClientServerCommunication = await request.json();
  const sshServerResponse = await sendSSHCommand(communication);
  return sshServerResponse;
}

async function sendSSHCommand(
  communication: ClientServerCommunication
): Promise<ClientServerCommunication> {
  return new Promise((resolve, reject) => {
    sshConnection.stream.write(`${communication.client}\n`);
    sshConnection.stream
      .on("data", (data: string) => {
        console.log("OUTPUT: " + data);
        communication.server = data;
      })
      .stderr.on("data", (data: string) => {
        console.log("STDERR: " + data);
        communication.server = data;
      })
      .on("close", (code: number, signal: any) => {
        console.log("Stream :: close :: code: " + code + ", signal: " + signal);
        resolve(communication);
      });
  });
}

// async function sendCommandsToServer(
//   conversation: SSH_Conversation
// ): Promise<SSH_Conversation> {
//   return new Promise((resolve, reject) => {
//     // Connect to the server and retrieve all necessary data
//     ssh
//       .exec(conversation.client, {
//         out: (stdout: string) => {
//           // Split by every line break
//           conversation.server = stdout;
//         },
//         err: (stderr: string) => {
//           conversation.server = stderr;
//         },
//         exit: (code: number) => {
//           resolve(conversation);
//         },
//       })
//       .start();
//   });
// }
