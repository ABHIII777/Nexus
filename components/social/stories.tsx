"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"

const stories = [
  {
    id: "add",
    name: "Add Story",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    isAdd: true,
  },
  {
    id: "1",
    name: "Sarah",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    hasNewStory: true,
  },
  {
    id: "2",
    name: "Mike",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    hasNewStory: true,
  },
  {
    id: "3",
    name: "Emma",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    hasNewStory: true,
  },
  {
    id: "4",
    name: "Alex",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    hasNewStory: false,
  },
  {
    id: "5",
    name: "Lisa",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    hasNewStory: true,
  },
  {
    id: "6",
    name: "David",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
    hasNewStory: false,
  },
  {
    id: "7",
    name: "Nina",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    hasNewStory: true,
  },
]

export function Stories() {
  return (
    <div className="mb-6">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 pb-4">
          {stories.map((story) => (
            <button
              key={story.id}
              className="group flex flex-col items-center gap-2"
            >
              <div
                className={`relative rounded-full p-0.5 ${
                  story.hasNewStory
                    ? "bg-gradient-to-tr from-primary to-accent"
                    : story.isAdd
                    ? "bg-border"
                    : "bg-muted"
                }`}
              >
                <div className="rounded-full bg-background p-0.5">
                  <Avatar className="h-16 w-16 transition-transform group-hover:scale-105">
                    <AvatarImage src={story.image} alt={story.name} />
                    <AvatarFallback>{story.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                {story.isAdd && (
                  <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Plus className="h-4 w-4" />
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {story.name}
              </span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
