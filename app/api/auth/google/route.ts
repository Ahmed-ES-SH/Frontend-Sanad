// app/api/auth/google/route.ts
import { redirect } from "next/navigation";

export async function GET() {
  const backendUrl = process.env.API_BASE_URL;

  redirect(`${backendUrl}/api/auth/google`);
}
