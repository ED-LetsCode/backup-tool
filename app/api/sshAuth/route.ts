import { NextResponse } from "next/server";
import { SSHLoginData } from "@/app/Types/Types";
import { SSHConnection } from "@/app/Helpers/SSHConnection";

export async function POST(request: Request) {
  try {
    const sshLoginData: SSHLoginData = await request.json();
    const sshConversation = await SSHConnection.sendCommand(
      "whoami",
      sshLoginData
    );

    return NextResponse.json({ status: 200, ...sshConversation });
  } catch (err) {
    return NextResponse.json("Login failed", { status: 404 });
  }
}
