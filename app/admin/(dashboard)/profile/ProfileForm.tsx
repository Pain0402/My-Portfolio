"use client";

import { ProfileData, updateProfile } from "@/app/actions/profile.action";
import { uploadMedia } from "@/app/actions/projects.action";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Save, Upload, ImageIcon, User, Sparkles, Gamepad2, Rocket } from "lucide-react";

interface ProfileFormProps {
    profile: ProfileData;
}

export default function ProfileForm({ profile }: ProfileFormProps) {
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [portraitUrl, setPortraitUrl] = useState(profile.portrait_url || "");
    const formRef = useRef<HTMLFormElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            const url = await uploadMedia(formData);
            setPortraitUrl(url);
            toast.success("Portrait uploaded!");
        } catch (err) {
            toast.error("Upload failed: " + (err as Error).message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setLoading(true);
        try {
            const formData = new FormData(formRef.current);
            formData.set("portrait_url", portraitUrl);
            await updateProfile(formData);
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Update failed: " + (err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
            {/* Portrait + Name Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Portrait Upload */}
                <div className="lg:col-span-1">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-4">
                            <ImageIcon className="w-4 h-4 text-[var(--accent-cyan)]" />
                            Portrait Image
                        </label>

                        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gray-800/50 border border-white/10 mb-4 group">
                            {portraitUrl ? (
                                <img
                                    src={portraitUrl}
                                    alt="Portrait"
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                                    <User className="w-12 h-12 mb-2 opacity-30" />
                                    <p className="text-xs">No portrait yet</p>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <label className="cursor-pointer px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-sm hover:bg-white/20 transition-colors flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    {uploading ? "Uploading..." : "Upload"}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                        </div>

                        {portraitUrl && (
                            <input
                                type="text"
                                value={portraitUrl}
                                readOnly
                                className="w-full text-xs font-mono bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-gray-400 truncate"
                            />
                        )}
                    </div>
                </div>

                {/* Name + Bio */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                            <User className="w-4 h-4 text-[var(--accent-cyan)]" />
                            Display Name
                        </label>
                        <input
                            name="display_name"
                            defaultValue={profile.display_name}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)]/30 transition-all"
                            placeholder="Your display name"
                            required
                        />
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                            <Sparkles className="w-4 h-4 text-[var(--accent-pink)]" />
                            Bio / Introduction
                        </label>
                        <textarea
                            name="bio"
                            defaultValue={profile.bio}
                            rows={3}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent-pink)] focus:ring-1 focus:ring-[var(--accent-pink)]/30 transition-all resize-none"
                            placeholder="A short intro about yourself..."
                            required
                        />
                        <p className="text-xs text-gray-500 mt-2">This appears as the main quote in the About section.</p>
                    </div>
                </div>
            </div>

            {/* Content Cards */}
            <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                        <Sparkles className="w-4 h-4 text-[var(--accent-cyan)]" />
                        Core Strengths
                    </label>
                    <textarea
                        name="core_strengths"
                        defaultValue={profile.core_strengths}
                        rows={4}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent-cyan)] focus:ring-1 focus:ring-[var(--accent-cyan)]/30 transition-all resize-none"
                        placeholder="Describe your core technical strengths..."
                        required
                    />
                    <p className="text-xs text-gray-500 mt-2">Supports **markdown bold** syntax for highlighting keywords.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                        <Gamepad2 className="w-4 h-4 text-[var(--accent-pink)]" />
                        Beyond Coding
                    </label>
                    <textarea
                        name="beyond_coding"
                        defaultValue={profile.beyond_coding}
                        rows={4}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent-pink)] focus:ring-1 focus:ring-[var(--accent-pink)]/30 transition-all resize-none"
                        placeholder="What do you do outside of coding?"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-2">Supports **markdown bold** syntax for highlighting keywords.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-3">
                        <Rocket className="w-4 h-4 text-[var(--accent-purple)]" />
                        Future Vision
                    </label>
                    <textarea
                        name="future_vision"
                        defaultValue={profile.future_vision}
                        rows={4}
                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent-purple)] focus:ring-1 focus:ring-[var(--accent-purple)]/30 transition-all resize-none"
                        placeholder="What are your career goals and future plans?"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-2">Supports **markdown bold** syntax for highlighting keywords.</p>
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 bg-[var(--accent-cyan)] text-black font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(76,201,240,0.3)]"
                >
                    <Save className="w-5 h-5" />
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    );
}
