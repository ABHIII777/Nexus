import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const userID = Number(id);

    const userData = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, userID),
        with: {
            posts: true
        }
    })

    return NextResponse.json(userData);
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const userID = Number(id);
    const body = await req.json();
    const { name, bio, website, location, avatar, banner } = body;

    try {
        await db.update(users)
            .set({ name, bio, website, location, avatar, banner })
            .where(eq(users.id, userID));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update edit-profile:", error);
        return NextResponse.json({ error: "Failed to update edit-profile" }, { status: 500 });
    }
}