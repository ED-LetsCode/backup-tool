import { SSHLoginData, SSH_ServerResponse } from "@/app/Types/Types";
import { NextResponse } from "next/server";
import SSH from "simple-ssh";
import { getSSH, initializeSSHConnection } from "@/app/Helpers/SSH";

export async function POST(request: Request) {
  try {
    const sshLoginData: SSHLoginData = await request.json();
    const sshServerResponse = await createSSHConnection(sshLoginData);
    return NextResponse.json(sshServerResponse);
  } catch (err: any) {
    return new NextResponse("Not found", { status: 404 });
  }
}

async function createSSHConnection(
  sshLoginData: SSHLoginData
): Promise<SSH_ServerResponse> {
  // Create ssh obj with loginData
  await initializeSSHConnection(sshLoginData);
  const ssh = getSSH();
  let sshServerResponse: SSH_ServerResponse = {
    output: [],
    error: "",
    exitCode: 0,
  };

  return new Promise((resolve, reject) => {
    // If an error occurs when connecting to the server, the promise should be rejected
    ssh.on("error", (err: string) => {
      ssh.end();
      reject(err);
    });

    // Connect to the server and retrieve all necessary data
    ssh
      .exec("whoami", {
        out: (stdout: string) => {
          // Split by every line break
          sshServerResponse.output = stdout.split("\n");
        },
        err: (stderr: string) => {
          sshServerResponse.error = stderr;
        },
        exit: (code: number) => {
          sshServerResponse.exitCode = code;
          resolve(sshServerResponse);
        },
      })
      .start();
  });
}
