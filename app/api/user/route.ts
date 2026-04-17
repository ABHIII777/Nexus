import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const user = await db.select().from(users)

    return NextResponse.json(user);
}
