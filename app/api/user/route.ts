import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const user = await db.select().from(users)

    console.log(user);

    // const userID = 5;

    // const user = await db.select().from(users).where(eq(users.id, userID));
    return NextResponse.json(user);
}
