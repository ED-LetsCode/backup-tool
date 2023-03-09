"use client";

export default function Conversation(props: {
  conversation: {
    client: string;
    server: string;
  };
}) {
  return (
    <div className="border-slate-300 border shadow-sm rounded-md mt-4 p-2">
      <p className="text-justify text-sm break-all">
        <b className="mr-7">You:</b> {props.conversation.client}
      </p>
      <p className="text-justify text-sm break-all">
        <b className="mr-2">Server:</b> {props.conversation.server}
      </p>
    </div>
  );
}
