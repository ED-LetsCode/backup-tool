export interface SSHLoginData {
  server: string;
  username: string;
  password: string;
}

export interface SSH_ServerResponse {
  output: string;
  error: string;
  exitCode: number;
}

export interface Backup {}

export interface SSH_Conversation {
  id: string;
  client: string;
  server: string;
}
