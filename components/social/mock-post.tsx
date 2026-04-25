"use client"

import { useState, useEffect } from "react"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { posts } from "@/db/schema"

interface MockProps {
    post: {
        id: string,
        author: {
            name: string,
            username: string,
            avater: string,
            verified?: boolean
        }
        content: string
        image?: string
        like: number
        comments: number
        reposts: number
        timestamp: string
        isLiked?: boolean
        isBookedmared?: boolean
    }
}

export default function MockPosts({ post }: MockProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");
    const [authorID, setAuthorID] = useState<{id: number} | null>(null);
    const maxLength = 200;

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (!storedUser) return

        const userID = JSON.parse(storedUser);

        setAuthorID(userID.id);
    })

    console.log(authorID, editContent);
    
    const handleEdits = async() => {
        try {
            const data = await fetch("/api/posts", {
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ id: post.id, content: editContent })
            });

            if (data.ok) {
                setIsEditing(false);
                // optionally reload or update state to reflect change
                window.location.reload(); 
            } else {
                const res = await data.json();
                console.error("Failed to update:", res);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div className="mt-1 pt-8 border-t border-border pb-12">
            <div className="space-y-4">

                {isEditing ? (
                    <div className="p-4 border-border rounded-xl bg-secondary/20 transition-colors flex flex-col gap-3 group">
                        <div className="flex flex-col gap-3">
                            <Textarea
                                className="resize-none min-h-[100px] text-sm bg-background border-border"
                                placeholder="Edit your post..."
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                maxLength={maxLength}
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    className="px-4 py-1.5 text-xs font-bold bg-secondary text-secondary-foreground rounded-full hover:opacity-90 transition-opacity"
                                    onClick={() => {
                                        setIsEditing(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                                    onClick={handleEdits}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>

                ) : (
                    <div className="p-4 border border-border rounded-xl hover:bg-secondary/5 transition-colors flex flex-col gap-3 group">
                        <div className="flex justify-between items-start gap-4">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => {
                                        setEditContent(post.content);
                                        setIsEditing(true);
                                    }}
                                    className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded-full"
                                    title="Edit post"
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                    className="p-2 text-muted-foreground hover:text-destructive transition-colors hover:bg-destructive/10 rounded-full"
                                    title="Delete Post"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                    </div>
                )}

            </div>
        </div>
    );
}