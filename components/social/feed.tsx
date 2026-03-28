"use client"

import { PostCard } from "./post-card"
import { ComposeBox } from "./compose-box"
import { Stories } from "./stories"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const posts = [
  {
    id: "1",
    author: {
      name: "Sarah Chen",
      username: "sarahchen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "Just shipped a major update to our design system! 🚀\n\nNew components include:\n• Improved dark mode support\n• Better accessibility features\n• Performance optimizations\n\nCheck it out and let me know what you think!",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop",
    likes: 1243,
    comments: 89,
    reposts: 156,
    timestamp: "2h",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "2",
    author: {
      name: "Mike Rodriguez",
      username: "mikerod",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      verified: false,
    },
    content: "The sunset from my apartment tonight was absolutely incredible. Sometimes you just have to stop and appreciate the little things in life.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    likes: 567,
    comments: 34,
    reposts: 23,
    timestamp: "4h",
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: "3",
    author: {
      name: "Emma Wilson",
      username: "emmawilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "Hot take: The best code is the code you never have to write.\n\nSimplicity should always win over complexity. Your future self will thank you.",
    likes: 2891,
    comments: 234,
    reposts: 512,
    timestamp: "6h",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "4",
    author: {
      name: "Alex Johnson",
      username: "alexj",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      verified: false,
    },
    content: "Started learning Rust this week. The borrow checker is tough but I'm finally starting to understand why it's so powerful for memory safety.\n\nAny tips from experienced Rustaceans?",
    likes: 189,
    comments: 67,
    reposts: 12,
    timestamp: "8h",
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: "5",
    author: {
      name: "Tech Daily",
      username: "techdaily",
      avatar: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "🔥 Breaking: Next.js 16 just dropped with major performance improvements!\n\n• Turbopack is now the default bundler\n• React Compiler support is stable\n• New caching APIs with better DX\n\nFull breakdown in thread 🧵",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    likes: 5672,
    comments: 423,
    reposts: 1234,
    timestamp: "10h",
    isLiked: true,
    isBookmarked: false,
  },
]

export function Feed() {
  return (
    <div className="flex-1 max-w-2xl border-x border-border min-h-screen">
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
            <TabsTrigger
              value="following"
              className="flex-1 rounded-none border-b-2 border-transparent py-4 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold"
            >
              Following
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="p-4">
        <Stories />
        <ComposeBox />
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}
