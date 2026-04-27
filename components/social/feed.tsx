"use client"

import { useEffect } from "react"
import { PostCard } from "./post-card"
import { ComposeBox } from "./compose-box"
import { Stories } from "./stories"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Feed() {
  const [showCompose, setShowCompose] = useState(false);
  const [post, setPost] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/feed")
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.error("Failed to fetch feed:", err));
  }, []);

  return (
    <div className="flex-1 w-full border-x border-border min-h-screen">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md">
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="w-full h-12 p-0 bg-transparent rounded-none border-b border-border/50">
            <TabsTrigger
              value="for-you"
              className="flex-1 h-full rounded-none bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none relative group"
            >
              <span className="relative z-10 font-bold text-sm h-full flex items-center justify-center">
                For you
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full hidden group-data-[state=active]:block shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4">
        {showCompose && <ComposeBox />}
        <div className="space-y-4">
          {post.map((postData) => (
            <PostCard key={postData.id} post={postData} />
          ))}
          {post.length === 0 && (
            <div className="py-20 text-center text-muted-foreground italic">
              Loading your personalized feed...
            </div>
          )}
        </div>

        <Button
          className="flex w-[140px] gap-2 rounded-xl fixed bottom-8 right-8 shadow-2xl shadow-primary/40 hover:scale-105 transition-all z-50 py-6"
          size="lg"
          onClick={() => setShowCompose(!showCompose)}
        >
          <PenSquare className="h-5 w-5" />
          <span className="font-bold">New Post</span>
        </Button>
      </div>
    </div>
  )
}
