import SSH from "simple-ssh";
import { SSHLoginData } from "../Types/Types";

let ssh: SSH | null = null;

export function getSSH(): SSH {
  if (!ssh) {
    throw new Error("SSH connection not established");
  }
  console.log("SSH object returned");
  return ssh;
}

export async function initializeSSHConnection(
  sshLoginData: SSHLoginData
): Promise<void> {
  // Create ssh obj with loginData
  ssh = new SSH({
    host: sshLoginData.server,
    user: sshLoginData.username,
    pass: sshLoginData.password,
  });

  console.log("SSH object created:", ssh);
}
