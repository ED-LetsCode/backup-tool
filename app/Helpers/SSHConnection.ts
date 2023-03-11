import SSH from "simple-ssh";
import { SSHLoginData, SSH_Conversation } from "../Types/Types";

export class SSHConnection {
  static async sendCommand(
    command: string,
    sshLoginData: SSHLoginData
  ): Promise<SSH_Conversation> {
    // Create ssh obj with loginData
    const ssh = new SSH({
      host: sshLoginData.server,
      user: sshLoginData.username,
      pass: sshLoginData.password,
    });

    let sshConversation: SSH_Conversation = {
      id: "",
      client: command,
      server: "",
    };

    return new Promise((resolve, reject) => {
      // If an error occurs when connecting to the server, the promise should be rejected
      ssh.on("error", (err: string) => {
        sshConversation.server = err;
        ssh.end();
        reject(sshConversation);
      });

      // Connect to the server and retrieve all necessary data
      ssh
        .exec(command, {
          out: (stdout: string) => {
            // Split by every line break
            sshConversation.server = stdout;
            resolve(sshConversation);
          },
          err: (stderr: string) => {
            sshConversation.server = stderr;
            resolve(sshConversation);
          },
          // exit: (code: number) => {S
          //   sshServerResponse.exitCode = code;
          //   resolve(sshServerResponse);
          // },
        })
        .start();
    });
  }
}
