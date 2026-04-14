import { Sidebar } from "@/components/social/sidebar"
import { Feed } from "@/components/social/feed"
import { TrendingSidebar } from "@/components/social/trending-sidebar"

export default function FeedPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 ml-20 lg:ml-64">
        <Feed />
        {/* <TrendingSidebar /> */}
      </div>
    </div>
  )
}
