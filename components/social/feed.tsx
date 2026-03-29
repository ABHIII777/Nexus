"use client"

import { PostCard } from "./post-card"
import { ComposeBox } from "./compose-box"
import { Stories } from "./stories"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PenSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// const posts = [
//   {
//     id: "1",
//     author: {
//       name: "Sarah Chen",
//       username: "sarahchen",
//       avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
//       verified: true,
//     },
//     content: "Just shipped a major update to our design system! 🚀\n\nNew components include:\n• Improved dark mode support\n• Better accessibility features\n• Performance optimizations\n\nCheck it out and let me know what you think!",
//     image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop",
//     // likes: 1243,
//     // comments: 89,
//     // reposts: 156,
//     timestamp: "2h",
//     // isLiked: false,
//     // isBookmarked: false,
//   }
// ]

export function Feed() {

  const [showCompose, setShowCompose] = useState(false);

  return (
    <div className="flex-1 w-full border-x border-border min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-foreground">Home</h1>
        </div>
        <Tabs defaultValue="for-you" className="w-full">
          <TabsList className="w-full h-auto p-0 bg-transparent border-b border-border rounded-none">
            <TabsTrigger
              value="for-you"
              className="flex-1 rounded-none border-b-2 border-transparent py-4 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold"
            >
              For you
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* <Stories /> */}
        {showCompose && <ComposeBox />}
        {/* <ComposeBox /> */}
        {/* <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div> */}

      <Button 
        className="w-auto gap-2 rounded-xl hidden lg:flex fixed top-[92%] left-[72%]"
        size="lg"
        onClick={() => setShowCompose(!showCompose)}
        >
        <PenSquare className="h-5 w-5" />
        <span>New Post</span>
      </Button>
      </div>
    </div>
  )
}
