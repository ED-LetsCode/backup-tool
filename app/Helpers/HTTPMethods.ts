export async function httpPost(apiRoute: string, data: any): Promise<Response> {
  return await fetch(apiRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
