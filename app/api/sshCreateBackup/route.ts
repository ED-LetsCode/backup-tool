import { NextResponse } from "next/server";
import { SSHLoginData } from "@/app/Types/Types";
import { SSHConnection } from "@/app/Helpers/SSHConnection";

interface Req {
  pathToBackupFolder: string;
  sshLoginData: SSHLoginData;
}

export async function POST(request: Request) {
  try {
    const req: Req = await request.json();

    const sshConversation = await SSHConnection.sendCommand(
      `${req.pathToBackupFolder}/backup.sh`,
      req.sshLoginData
    );
    return NextResponse.json({ status: 200, sshConversation: sshConversation });
  } catch (err) {
    return NextResponse.json("Not found", { status: 404 });
  }
}
