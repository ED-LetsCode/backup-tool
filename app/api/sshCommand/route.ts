import { getSSH } from "@/app/Helpers/SSH";
import { SSH_Conversation } from "@/app/Types/Types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(getSSH());
  // const conversation: SSH_Conversation = await request.json();
  // const testconversation = await sendCommandsToServer(conversation);
  // console.log(testconversation);
  return new NextResponse("Sucess", { status: 200 });
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
