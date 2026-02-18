"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectMedia {
    type: "image" | "video";
    url: string;
    caption?: string;
}

interface ProjectGalleryProps {
    media: ProjectMedia[];
    projectTitle: string;
}

export default function ProjectGallery({ media, projectTitle }: ProjectGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectedMedia = media[selectedIndex];

    if (!media || media.length === 0) return null;

    return (
        <div className="mb-20 space-y-4">
            {/* Main Preview */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-card border border-white/10 group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedIndex}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        {selectedMedia.type === "video" ? (
                            <div className="w-full h-full flex items-center justify-center bg-black/40 relative">
                                {/* Placeholder for actual video player */}
                                <img
                                    src="https://placehold.co/1920x1080/000000/FFF?text=Video+Thumbnail"
                                    alt="Video Preview"
                                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                                />
                                <div className="z-10 bg-white/10 backdrop-blur-md p-6 rounded-full border border-white/20 hover:scale-110 transition-transform cursor-pointer">
                                    <Play className="w-12 h-12 text-white fill-white" />
                                </div>
                            </div>
                        ) : (
                            <img
                                src={selectedMedia.url}
                                alt={selectedMedia.caption || projectTitle}
                                className="w-full h-full object-cover"
                            />
                        )}

                        {/* Caption Overlay */}
                        {selectedMedia.caption && (
                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                <p className="text-white text-lg font-light tracking-wide">{selectedMedia.caption}</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Thumbnails Strip */}
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-1">
                {media.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className={`relative flex-none w-32 md:w-48 aspect-video rounded-xl overflow-hidden border transition-all duration-300 snap-start group ${selectedIndex === index
                                ? "border-[var(--accent-cyan)] ring-2 ring-[var(--accent-cyan)]/20 scale-105"
                                : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
                            }`}
                    >
                        {item.type === "video" ? (
                            <div className="w-full h-full bg-black/40 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50" />
                                <Play className="w-6 h-6 text-white z-10 fill-white/50" />
                            </div>
                        ) : (
                            <img
                                src={item.url}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        )}
                        {/* Active Indicator Overlay */}
                        {selectedIndex !== index && (
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
