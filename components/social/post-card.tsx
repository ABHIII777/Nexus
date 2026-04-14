"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
    Heart,
    MessageCircle,
    Repeat2,
    Share,
    Bookmark,
    MoreHorizontal,
    Verified,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface PostProps {
    post: {
        id: string
        author: {
          name: string
          username: string
          avatar: string
          verified?: boolean
        }
        content: string
        // image?: string
        // likes: number
        // comments: number
        // reposts: number
        timestamp: string
        // isLiked?: boolean
        // isBookmarked?: boolean
    }
}

export function PostCard({post}: PostProps) {

    const [user, setUser] = useState<{ name: string } | null>(null);
    const [feedData, setFeedData] = useState<{id: number, name: string, content: string} | null>(null);

    useEffect(() => {
      fetch("/api/feed")
        .then(res => res.json())
        .then(data => setFeedData(data))
    }, [])

    return (
        <Card className="border-border bg-card hover:bg-secondary/30 transition-colors">
            <CardHeader className="flex flex-row items-start gap-4 p-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    {/* <AvatarFallback>{feedData?.name}</AvatarFallback> */}
                    {/* <AvatarFallback>{console.log(user[0]?.name)}</AvatarFallback> */}
                </Avatar>
                <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground hover:underline cursor-pointer">
                            {post.author.name}
                        </span>
                        {post.author.name && (
                            <Verified className="h-4 w-4 fill-primary text-primary-foreground" />
                        )}
                        <span className="text-muted-foreground">@{post.author.name}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-muted-foreground text-sm">{}</span>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>Not interested</DropdownMenuItem>
                        <DropdownMenuItem>Follow @{post.author.name}</DropdownMenuItem>
                        <DropdownMenuItem>Mute @{post.author.name}</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Report post</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="px-4 pb-3">
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">{post.content}</p>
                {/* <p className="text-foreground whitespace-pre-wrap leading-relaxed">{postData?.content}</p> */}
                {/* {post.image && (
          <div className="mt-3 overflow-hidden rounded-xl">
            <img
              // src={post.image}
              alt="Post attachment"
              // className="w-full object-cover max-h-96 hover:opacity-90 transition-opacity cursor-pointer"
              className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
            />
          </div>
        )} */}
            </CardContent>
            {/* <CardFooter className="flex items-center justify-between px-4 pb-4">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{post.comments}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-green-500 hover:bg-green-500/10"
        >
          <Repeat2 className="h-5 w-5" />
          <span>{post.reposts}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2 hover:bg-red-500/10",
            isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
          )}
          onClick={handleLike}
        >
          <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
          <span>{likes}</span>
        </Button>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary hover:bg-primary/10"
          >
            <Share className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "hover:bg-primary/10",
              isBookmarked ? "text-primary" : "text-muted-foreground hover:text-primary"
            )}
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
          </Button>
        </div>
      </CardFooter> */}
        </Card>
    )
}
