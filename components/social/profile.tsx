import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, MapPin, Calendar, Link as LinkIcon, Edit2, Camera, MoreHorizontal, CheckCircle, UsersIcon } from "lucide-react";
import { PostCard } from "./post-card";
import { useParams } from "next/navigation";

export default function ProfilePage() {

    const [user, setUser] = useState<any>(null);
    const [currentUserId, setCurrentUserid] = useState<any>(null);

    const router = useRouter();
    const params = useParams();
    const userId = params.id;

    useEffect(() => {
        const fetchMe = async() => {
            try {
                const res = await fetch("/api/user/me");
                if (res.ok ) {
                    const data = await res.json();
                    setCurrentUserid(data.id);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchMe();
    }, []);

    useEffect(() => {
        if (currentUserId && userId && Number(currentUserId) !== Number(userId)) {
            router.push("/profile/" + currentUserId);
        }
    }, [currentUserId, userId, router]);

    useEffect(() => {
        if (userId) {
            fetch(`/api/profile/${userId}`)
                .then(res => res.json())
                .then(data => setUser(data))
                .catch(err => console.error("Fetch error:", err));
        }
    }, [userId]);


    if (!user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-primary animate-pulse font-medium italic">Loading Profile...</div>
            </div>
        );
    }

    const editPageNavigate = () => {
      router.push(`/edit-profile/` + user.id);
    }

  return (
    <div className="min-h-screen bg-background text-foreground border-x border-border">
      {/* Cover / Banner */}
      <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border-b border-border">
        <button className="absolute right-4 bottom-4 flex items-center gap-2 rounded-lg bg-black/50 px-3 py-1.5 text-sm text-primary border border-primary/20 transition hover:bg-black/70 backdrop-blur-sm">
          <Camera className="h-4 w-4" />
          Edit cover
        </button>
      </div>

      {/* Profile header */}
      <div className="mx-auto max-w-2xl px-4">
        <div className="relative -mt-16 flex items-end justify-between">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-secondary border-4 border-background shadow-xl ring-2 ring-primary/20 overflow-hidden">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <User className="h-16 w-16 text-muted-foreground" />
            )}
          </div>
          <button
            className="mb-2 flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
            onClick={editPageNavigate}
            >
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                {user?.name}
              </h1>
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              @{user?.name}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-lg">
            {user?.bio}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {user?.location || "Somewhere"}
            </span>
            <span className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4 text-primary" />
              <span className="text-primary hover:underline cursor-pointer transition">{user?.website || "example.com"}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Joined April 2026
            </span>
          </div>
          <div className="flex gap-6 mt-4 text-sm">
            <button className="hover:underline transition">
              <strong className="text-foreground">128</strong>{" "}
              <span className="text-muted-foreground">Following</span>
            </button>
            <button className="hover:underline transition">
              <strong className="text-foreground">4.2K</strong>{" "}
              <span className="text-muted-foreground">Followers</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-border overflow-x-auto no-scrollbar">
          <div className="flex min-w-max">
            <TabButton label="Posts" active />
            <TabButton label="Replies" />
            <TabButton label="Media" />
            <TabButton label="Likes" />
          </div>
        </div>

        {/* Posts */}
        <div className="mt-4 space-y-4 pb-12">
          {user.posts && user.posts.length > 0 ? (
              user.posts.map((postData: any) => (
                <PostCard
                  key={postData.id}
                  post={{
                      ...postData,
                      author: {
                          name: user.name,
                          avatar: user.avatar,
                          verified: true
                      }
                  }}
                />
              ))
          ) : (
              <div className="py-12 text-center text-muted-foreground border border-dashed border-border rounded-2xl">
                  No posts yet.
              </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`relative px-6 py-4 text-sm font-medium transition-colors hover:bg-secondary/50 ${
        active ? "text-primary font-bold" : "text-muted-foreground"
      }`}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full bg-primary shadow-[0_-2px_8px_rgba(var(--primary),0.3)]" />
      )}
    </button>
  );
}
