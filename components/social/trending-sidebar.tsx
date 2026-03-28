"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal, Verified } from "lucide-react"

const trends = [
  { category: "Technology", topic: "#NextJS16", posts: "125K" },
  { category: "Entertainment", topic: "New Movie Release", posts: "89.2K" },
  { category: "Sports", topic: "#WorldCup2026", posts: "234K" },
  { category: "Technology", topic: "AI Revolution", posts: "56.8K" },
  { category: "Business", topic: "#StartupLife", posts: "12.4K" },
]

const suggestedUsers = [
  {
    name: "Tech Daily",
    username: "techdaily",
    avatar: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop",
    verified: true,
  },
  {
    name: "Design Weekly",
    username: "designweekly",
    avatar: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
    verified: true,
  },
  {
    name: "Code Masters",
    username: "codemasters",
    avatar: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=100&h=100&fit=crop",
    verified: false,
  },
]

export function TrendingSidebar() {
  return (
    <aside className="hidden w-80 shrink-0 xl:block pl-6 pr-4">
      <div className="sticky top-0 space-y-4 py-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search Nexus"
            className="rounded-full bg-secondary border-0 pl-10 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {/* Trends */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-foreground">Trends for you</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {trends.map((trend, index) => (
              <div
                key={index}
                className="group flex cursor-pointer items-start justify-between hover:bg-secondary/50 -mx-4 px-4 py-2 transition-colors"
              >
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">{trend.category} · Trending</p>
                  <p className="font-semibold text-foreground">{trend.topic}</p>
                  <p className="text-xs text-muted-foreground">{trend.posts} posts</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 text-muted-foreground"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="link" className="text-primary p-0 h-auto hover:no-underline">
              Show more
            </Button>
          </CardContent>
        </Card>

        {/* Who to follow */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-foreground">Who to follow</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0">
            {suggestedUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center gap-3 hover:bg-secondary/50 -mx-4 px-4 py-2 transition-colors cursor-pointer"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-foreground truncate">{user.name}</p>
                    {user.verified && (
                      <Verified className="h-4 w-4 shrink-0 fill-primary text-primary-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
                </div>
                <Button size="sm" className="rounded-full">
                  Follow
                </Button>
              </div>
            ))}
            <Button variant="link" className="text-primary p-0 h-auto hover:no-underline">
              Show more
            </Button>
          </CardContent>
        </Card>

        {/* Footer links */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 px-4 text-xs text-muted-foreground">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookie Policy</a>
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Ads info</a>
          <span>© 2026 Nexus</span>
        </div>
      </div>
    </aside>
  )
}
