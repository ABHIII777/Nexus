import { User, MapPin, Calendar, Link as LinkIcon, Edit2, Camera, MoreHorizontal, CheckCircle } from "lucide-react";

export default function ProfilePage() {
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
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-secondary border-4 border-background shadow-xl ring-2 ring-primary/20">
            <User className="h-16 w-16 text-muted-foreground" />
          </div>
          <button className="mb-2 flex items-center gap-2 rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10">
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Dummy89
              </h1>
              <CheckCircle className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              @Dummy89
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground max-w-lg">
            Welcome to my profile! This is a short bio about me. Passionate about building modern web applications and exploring new technologies.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> Somewhere
            </span>
            <span className="flex items-center gap-1">
              <LinkIcon className="h-4 w-4 text-primary" />
              <span className="text-primary hover:underline cursor-pointer transition">example.com</span>
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
          <PostCard
            name="Dummy89"
            handle="@Dummy89"
            text="Just joined Nexus! Excited to connect with everyone 🎉"
          />
          <PostCard
            name="Dummy89"
            handle="@Dummy89"
            text="Working on something cool today... Stay tuned for more updates! 🚀"
          />
          <PostCard
            name="Dummy89"
            handle="@Dummy89"
            text="This is a great platform for sharing ideas! The UI feels so fast and fluid."
          />
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

function PostCard({ name, handle, text }: { name: string; handle: string; text: string }) {
  return (
    <div className="rounded-2xl p-4 bg-secondary/30 border border-border/50 transition-all hover:bg-secondary/50 hover:border-primary/20 shadow-sm group">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary border border-border shadow-inner">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </span>
              <CheckCircle className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm text-muted-foreground">
                {handle} · 2h
              </span>
            </div>
          </div>
        </div>
        <button className="rounded-full p-2 text-muted-foreground transition hover:bg-primary/10 hover:text-primary">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90 pl-13">
        {text}
      </p>
    </div>
  );
}

