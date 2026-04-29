import { db } from "@/db";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { posts, users, likes} from "@/db/schema";

export async function POST(req: Request) {
    const body = await req.json();

    const { userId, postId, action, id, repost } = body;

    try {
        if (action === "like") {
            const numUserId = Number(userId);
            const numPostId = Number(postId);

            const existing = await db.select().from(likes).where(
                and(
                    eq(likes.userID, numUserId),
                    eq(likes.postID, numPostId)
                )
            );

            if (existing.length === 0) {
                await db.insert(likes).values({
                    postID: numPostId,
                    userID: numUserId
                });

                await db.update(posts)
                    .set({ likes: sql`${posts.likes} + 1` })
                    .where(eq(posts.id, numPostId));
            }
        } else if (action === "unlike") {
            const numUserId = Number(userId);
            const numPostId = Number(postId);

            await db.delete(likes).where(
                and (
                    eq(likes.userID, numUserId),
                    eq(likes.postID, numPostId)
                )
            );

            await db.update(posts)
                .set({ likes: sql`${posts.likes} - 1` })
                .where(eq(posts.id, numPostId));
        } else if (repost !== undefined) {
            const numPostId = Number(id);
            await db.update(posts)
                .set({ reposts: Number(repost) })
                .where(eq(posts.id, numPostId));
        }
        
        return NextResponse.json({message: "Update successfull"}, {status: 200});
        
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Database error"}, {status: 500});
    }
}