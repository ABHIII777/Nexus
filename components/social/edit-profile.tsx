"use client"

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, User, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sidebar } from "./sidebar";

export default function EditProfilePage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const initialize = async () => {
            try {
                const meRes = await fetch("/api/user/me");

                if (!meRes.ok) {
                    setIsFetching(false);
                    return;
                }

                const meData = await meRes.ok ? await meRes.json() : null;

                if (!meData.id || !meData) {
                    setIsFetching(false);
                    return;
                }

                setCurrentUserId(meData.id)

                const profileRes = await fetch(`/api/profile/${meData.id}`);
                if (profileRes.ok) {
                    const data = await profileRes.json();
                    setName(data.name || "");
                    setBio(data.bio || "");
                    setLocation(data.location || "");
                    setWebsite(data.website || "");
                    setAvatarPreview(data.avatar || null);
                    setBannerPreview(data.banner || null);
                    setCurrentUserId(meData.id);
                }
            }

            catch (err) {
                console.error(err);
            } finally {
                setIsFetching(false);
            }
        };
        initialize();
    }, []);

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: (url: string | null) => void
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setter(url);
        }
    };

    const handleSave = async () => {
        if (!currentUserId) return;
        setIsLoading(true);

        try {
            let avatarUrl = avatarPreview;


            if (selectedFile) {
                const formData = new FormData();
                formData.append("file", selectedFile);

                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });

                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    avatarUrl = uploadData.url;
                } else {
                    console.error("Upload failed");
                }
            }

            const updateRes = await fetch(`/api/profile/${currentUserId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    bio,
                    location,
                    website,
                    avatar: avatarUrl
                }),
            });

            if (updateRes.ok) {
                const storedUser = localStorage.getItem("user");
                if (storedUser) {
                    const parsed = JSON.parse(storedUser);
                    const updatedUser = { ...parsed, name, avatar: avatarUrl };
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                }

                router.push(`/profile/${currentUserId}`);
                router.refresh();
            } else {
                const error = await updateRes.json();
                alert(error.error || "Failed to update profile");
            }
        } catch (error) {
            console.error("Save error:", error);
            alert("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-background text-foreground border-x border-border max-w-2xl mx-auto">
            <Sidebar />
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
                    disabled={isLoading}
                    className="rounded-full bg-primary px-6 py-1.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center gap-2"
                >
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Save
                </button>
            </div>

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

                <div className="mt-8 space-y-8 pb-12">
                    <FieldGroup label="Name">
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            maxLength={50}
                            placeholder="Your name"
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
                            placeholder="Tell others about yourself"
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
                            placeholder="Add your location"
                            className="border-0 border-b border-border bg-transparent px-0 py-2 text-base focus-visible:ring-0 focus-visible:border-primary rounded-none transition-colors"
                        />
                    </FieldGroup>

                    <FieldGroup label="Website">
                        <Input
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                            maxLength={100}
                            placeholder="Add your website"
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
