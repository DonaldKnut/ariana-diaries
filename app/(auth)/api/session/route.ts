import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../authOptions/authOptions";
import { Readable } from "stream";
import type { IncomingMessage, ServerResponse } from "http";

async function readableStreamToArray(
  stream: ReadableStream<Uint8Array>
): Promise<Uint8Array[]> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  return chunks;
}

export async function GET(req: NextRequest) {
  try {
    const { headers, body, method, url } = req;

    let readableBody: Readable | null = null;
    if (body) {
      const chunks = await readableStreamToArray(body);
      readableBody = Readable.from(chunks);
    }

    const request = {
      headers: Object.fromEntries(headers.entries()),
      body: readableBody,
      method,
      url,
      query: {},
      cookies: {},
    } as unknown as IncomingMessage & { cookies: Record<string, string> };

    const response = {} as ServerResponse<IncomingMessage>;

    const session = await getServerSession(request, response, authOptions);

    if (session) {
      return NextResponse.json(session);
    } else {
      return NextResponse.json(
        { message: "No session found" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error fetching session:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
