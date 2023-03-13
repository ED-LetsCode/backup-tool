import { NextResponse } from "next/server";
import { SSHLoginData } from "@/app/Types/Types";
import { SSHConnection } from "@/app/Helpers/SSHConnection";

interface Req {
  backupName: string;
  pathToBackupFolder: string;
  sshLoginData: SSHLoginData;
}

export async function POST(request: Request) {
  try {
    const req: Req = await request.json();

    const sshConversation = await SSHConnection.sendCommand(
      `${req.pathToBackupFolder}/restore.sh ${req.backupName}`,
      req.sshLoginData
    );
    return NextResponse.json({ status: 200, sshConversation: sshConversation });
  } catch (err) {
    return NextResponse.json("Not found", { status: 404 });
  }
}
