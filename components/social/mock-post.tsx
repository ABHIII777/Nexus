"use client"

import { useState, useEffect } from "react"

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
    return (

        <div className="mt-12 pt-8 border-t border-border pb-12">
            <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-2">
                Manage Posts
                <span className="text-sm font-normal text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded-full">{mockPosts.length}</span>
            </h2>
            <div className="space-y-4">
                {mockPosts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-border">
                        No posts to manage.
                    </div>
                ) : (
                    mockPosts.map(post => (
                        <div key={post.id} className="p-4 border border-border rounded-xl bg-secondary/10 hover:bg-secondary/20 transition-colors flex flex-col gap-3 group">
                            {editingPostId === post.id ? (
                                <div className="flex flex-col gap-3">
                                    <Textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        className="resize-none min-h-[100px] text-sm bg-background border-border"
                                        placeholder="Edit your post..."
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            className="px-4 py-1.5 text-xs font-bold bg-secondary text-secondary-foreground rounded-full hover:opacity-90 transition-opacity"
                                            onClick={() => {
                                                setEditingPostId(null);
                                                setEditContent("");
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="px-4 py-1.5 text-xs font-bold bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                                            onClick={() => {
                                                setMockPosts(posts => posts.map(p => p.id === post.id ? { ...p, content: editContent } : p));
                                                setEditingPostId(null);
                                            }}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-start gap-4">
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
                                        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <button
                                                className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded-full"
                                                title="Edit post"
                                                onClick={() => {
                                                    setEditingPostId(post.id);
                                                    setEditContent(post.content);
                                                }}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </button>
                                            <button
                                                className="p-2 text-muted-foreground hover:text-destructive transition-colors hover:bg-destructive/10 rounded-full"
                                                title="Delete post"
                                                onClick={() => setMockPosts(posts => posts.filter(p => p.id !== post.id))}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{post.createdAt}</span>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}