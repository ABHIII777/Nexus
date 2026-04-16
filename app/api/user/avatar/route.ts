import { db } from "@/db";
import {users} from "@/db/schema"
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId, avatarUrl} = await req.json();

    // avatar column dropped, will be moved to a different table later
    // await db.update(users).set({avatar: avatarUrl}).where(eq(users.id, userId))

    return NextResponse.json({success: true})
}
