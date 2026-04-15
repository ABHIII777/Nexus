"use client"

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Sidebar } from "./sidebar";

export default function EditProfilePage() {
    const router = useRouter();
    const [name, setName] = useState("Dummy89");
    const [bio, setBio] = useState("Welcome to my profile! This is a short bio about me.");
    const [location, setLocation] = useState("Somewhere");
    const [website, setWebsite] = useState("example.com");
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                if (parsed) {
                    setName(parsed.name || "Dummy89");
                    setCurrentUserId(parsed.id);
                }
            } catch (e) {
                console.error("Failed to parse user from local storage", e);
            }
        }
    }, []);

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: (url: string | null) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setter(url);
        }
    };

    const handleSave = () => {
        // Implement save logic here if needed
        if (currentUserId) {
            router.push(`/profile/${currentUserId}`);
        } else {
            router.back();
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground border-x border-border max-w-2xl mx-auto">
            {/* Top bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-full hover:bg-secondary transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h1 className="text-xl font-bold tracking-tight">
                        Edit Profile
                    </h1>
                </div>
                <button
                    onClick={handleSave}
                    className="rounded-full bg-primary px-6 py-1.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 shadow-lg shadow-primary/20"
                >
                    Save
                </button>
            </div>

            <Sidebar />

            {/* Banner upload */}
            <div
                className="relative h-48 md:h-56 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border-b border-border"
                style={{
                    background: bannerPreview
                        ? `url(${bannerPreview}) center/cover no-repeat`
                        : undefined,
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/20 backdrop-blur-[2px]">
                    <button
                        onClick={() => bannerInputRef.current?.click()}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 transition hover:bg-black/80 text-white"
                    >
                        <Camera className="h-5 w-5" />
                    </button>
                    {bannerPreview && (
                        <button
                            onClick={() => setBannerPreview(null)}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 transition hover:bg-black/80 text-white"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>
                <input
                    ref={bannerInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, setBannerPreview)}
                />
            </div>

            {/* Avatar upload */}
            <div className="px-4">
                <div className="relative -mt-16 inline-block">
                    <div
                        className="relative flex h-32 w-32 items-center justify-center rounded-full overflow-hidden cursor-pointer bg-secondary border-4 border-background shadow-xl ring-2 ring-primary/20"
                        onClick={() => avatarInputRef.current?.click()}
                    >
                        {avatarPreview ? (
                            <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                        ) : (
                            <User className="h-16 w-16 text-muted-foreground" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition bg-black/40">
                            <Camera className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageChange(e, setAvatarPreview)}
                    />
                </div>

                {/* Form fields */}
                <div className="mt-8 space-y-8 pb-12">
                    <FieldGroup label="Name">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={50}
                            className="border-0 border-b border-border bg-transparent px-0 py-2 text-base focus-visible:ring-0 focus-visible:border-primary rounded-none transition-colors"
                        />
                        <span className="mt-1 block text-right text-xs text-muted-foreground">
                            {name.length}/50
                        </span>
                    </FieldGroup>

                    <FieldGroup label="Bio">
                        <Textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            maxLength={160}
                            rows={3}
                            className="resize-none border-0 border-b border-border bg-transparent px-0 py-2 text-base focus-visible:ring-0 focus-visible:border-primary rounded-none transition-colors"
                        />
                        <span className="mt-1 block text-right text-xs text-muted-foreground">
                            {bio.length}/160
                        </span>
                    </FieldGroup>

                    <FieldGroup label="Location">
                        <Input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            maxLength={30}
                            className="border-0 border-b border-border bg-transparent px-0 py-2 text-base focus-visible:ring-0 focus-visible:border-primary rounded-none transition-colors"
                        />
                    </FieldGroup>

                    <FieldGroup label="Website">
                        <Input
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            maxLength={100}
                            className="border-0 border-b border-border bg-transparent px-0 py-2 text-base focus-visible:ring-0 focus-visible:border-primary rounded-none transition-colors"
                        />
                    </FieldGroup>
                </div>
            </div>
        </div>
    );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="group">
            <Label className="text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors">
                {label}
            </Label>
            <div className="mt-1">{children}</div>
        </div>
    );
}
