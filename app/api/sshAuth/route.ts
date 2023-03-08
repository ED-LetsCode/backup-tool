import { SSHLoginData } from "@/app/Types/Types";
import { NextResponse } from "next/server";
import SSH from "simple-ssh";

export interface SSH_ServerResponse {
  output: string;
  error: string;
  exitCode: number;
}

export async function POST(request: Request) {
  const sshLoginData: SSHLoginData = await request.json();
  const sshServerResponse = await createSSHConnection(sshLoginData);
  return NextResponse.json(sshServerResponse);
}

async function createSSHConnection(
  sshLoginData: SSHLoginData
): Promise<SSH_ServerResponse> {
  // Create ssh obj with loginData
  const ssh = new SSH({
    host: sshLoginData.server,
    user: sshLoginData.username,
    pass: sshLoginData.password,
  });

  let sshServerResponse: SSH_ServerResponse = {
    output: "",
    error: "",
    exitCode: 0,
  };

  // TODO: Reject doesnt work correct
  return new Promise((resolve, reject) => {
    ssh
      .exec("ls", {
        out: (stdout: string) => {
          sshServerResponse.output = stdout;
        },
        err: (stderr: string) => {
          sshServerResponse.error = stderr;
          console.log(stderr);
          reject(new Error(stderr)); // reject with the error message
        },
        exit: (code: number) => {
          sshServerResponse.exitCode = code;
          ssh.end();
          resolve(sshServerResponse);
        },
      })
      .start();
  });
}
