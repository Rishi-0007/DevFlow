// Force Node.js runtime (instead of Edge)
import { handlers } from "@/auth";

export const runtime = "nodejs";
export const { GET, POST } = handlers;
