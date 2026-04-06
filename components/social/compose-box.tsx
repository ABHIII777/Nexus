"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Image, Smile, MapPin, CalendarDays, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { users } from "@/db/schema"
import { readRouteCacheEntry } from "next/dist/client/components/segment-cache/cache"

export function ComposeBox() {
  const [content, setContent] = useState("")
  const [authorID, setAuthorID] = useState<{id: number} | null>(null);
  const maxLength = 280

  // useEffect(() => {
  //   fetch("/api/user")
  //   .then(res => res.json())
  //   .then(data => setAuthorID(data))
  // }, []);
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) return

    const userID = JSON.parse(storedUser)

    setAuthorID(userID.id)

  }, [])

  const handleComposePost = async() => {

    // const id = authorID?.id;

    console.log(content, authorID);

    const data = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({content, authorId: authorID})
    });

    const res = await data.json();
    console.log(res);
  }

  return (
    <Card className="border-border bg-card mb-6">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <Textarea
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-24 resize-none border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 p-0"
              maxLength={maxLength}
            />
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <Image className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <Smile className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <BarChart3 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <CalendarDays className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-primary hover:bg-primary/10"
                >
                  <MapPin className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex items-center gap-3">
                {content.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs",
                        content.length > maxLength * 0.9
                          ? "border-destructive text-destructive"
                          : content.length > maxLength * 0.7
                          ? "border-yellow-500 text-yellow-500"
                          : "border-primary text-primary"
                      )}
                    >
                      {maxLength - content.length < 20 && maxLength - content.length}
                    </div>
                  </div>
                )}
                <Button
                  className="rounded-full px-5"
                  disabled={content.length === 0 || content.length > maxLength}
                  onClick={handleComposePost}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
