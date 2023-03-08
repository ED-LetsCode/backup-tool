import { NextResponse } from "next/server";
import { SSHLoginData } from "@/app/Components/ConnectionInput";

export async function POST(request: Request) {
  const sshLoginData: SSHLoginData = await request.json();
  createSSHConnection(sshLoginData);
  return NextResponse.json({ statusCode: 200 });
}

function createSSHConnection(sshLoginData: SSHLoginData) {
  console.log(sshLoginData);
}
