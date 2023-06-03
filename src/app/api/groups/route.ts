import { NextResponse, NextRequest } from "next/server";
import groups from "./data.json";

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify(groups));
}
