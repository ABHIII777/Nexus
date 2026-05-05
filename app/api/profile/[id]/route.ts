import { db } from "@/db";
import { likes, users, posts } from "@/db/schema"
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { searchParams } = new URL(req.url);
    const tabParams = searchParams.get("tab");
    const { id } = await params;
    const userID = Number(id);

    const validTabs = ["posts", "likes", "comments", "bookmarks", "reposts"] as const;
    const tabs = validTabs.includes(tabParams as any) ? tabParams : "posts"

    let data;

    switch (tabs) {
        
        case "posts":
            data = await db.query.users.findFirst({
                where: (users, { eq, and }) => eq(users.id, userID),
                with: {
                    posts: true
                }
            })
            break;

        case "likes":
            data = await db.query.users.findFirst({
                where: (users, { eq, and }) => eq(users.id, userID),
                with: {
                    likes: {
                        with: {
                            post: {
                                with: {
                                    author: true
                                }
                            }
                        }
                    }
                }

            })
            break;

        case "reposts":
            data = await db.query.users.findFirst({
                where: (users, {eq}) => eq(users.id, userID),
                with: {
                    reposts: {
                        with: {
                            post: {
                                with: {
                                    author: true
                                }
                            }
                        }
                    }
                }
            })
            console.log(data)
            break;

        }
        
    return NextResponse.json(data)
}