"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, Trash2, Edit3, Save, Clock, HelpCircle, CheckCircle } from "lucide-react";
import TipTapEditor from "./TipTapEditor";
import { format } from "date-fns";
import { updateNote } from "@/app/actions/hub.action";

export interface NoteItem {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    tags: string[];
}

export default function NotesBoard({ rawData }: { rawData: string }) {
    const [notes, setNotes] = useState<NoteItem[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [activeNote, setActiveNote] = useState<NoteItem | null>(null);

    // Load initial data
    useEffect(() => {
        try {
            if (rawData && rawData.trim() !== "" && rawData.startsWith("[")) {
                const parsed = JSON.parse(rawData);
                setNotes(parsed);
            } else if (rawData && rawData.trim() !== "") {
                // Migrate legacy data
                setNotes([{
                    id: Date.now().toString(),
                    title: "Legacy Note",
                    content: `<p>${rawData.replace(/\n/g, '<br>')}</p>`,
                    createdAt: new Date().toISOString(),
                    tags: ["Legacy"]
                }]);
            }
        } catch (e) {
            console.error("Failed to parse notes", e);
        }
    }, [rawData]);

    // Handle Save All
    const saveToDB = async (newState: NoteItem[]) => {
        setIsSaving(true);
        try {
            await updateNote(JSON.stringify(newState));
        } catch (e) {
            console.error(e);
        }
        setIsSaving(false);
    }

    // Modal Actions
    const handleCreateNew = () => {
        setActiveNote({
            id: Date.now().toString(),
            title: "",
            content: "",
            createdAt: new Date().toISOString(),
            tags: ["Draft"]
        });
        setShowModal(true);
    };

    const handleEdit = (note: NoteItem) => {
        setActiveNote(note);
        setShowModal(true);
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newState = notes.filter(n => n.id !== id);
        setNotes(newState);
        await saveToDB(newState);
    }

    const handleSaveActiveNote = async () => {
        if (!activeNote) return;

        // Validation
        const finalNote = { ...activeNote };
        if (!finalNote.title.trim()) {
            finalNote.title = "Untitled Note";
        }

        let newNotes = [...notes];
        const existingIndex = newNotes.findIndex(n => n.id === finalNote.id);
        if (existingIndex >= 0) {
            newNotes[existingIndex] = finalNote;
        } else {
            newNotes = [finalNote, ...newNotes];
        }

        setNotes(newNotes);
        await saveToDB(newNotes);
        setShowModal(false);
        setActiveNote(null);
    };

    return (
        <div className="w-full h-full flex flex-col relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <Edit3 size={24} className="text-[var(--accent-purple)]" />
                    <h2 className="text-xl font-bold tracking-wide text-white">Advanced Notes</h2>
                    <span className="text-xs bg-[var(--accent-purple)]/20 px-2 py-0.5 rounded-full text-[var(--accent-purple)]">{notes.length} Cards</span>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                    {isSaving ? (
                        <span className="text-xs flex items-center gap-1 text-gray-400"><Clock size={12} className="animate-spin" /> Syncing</span>
                    ) : (
                        <span className="text-xs flex items-center gap-1 text-green-400"><CheckCircle size={12} /> Saved</span>
                    )}
                    <button
                        onClick={handleCreateNew}
                        className="bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/80 text-white px-3 py-2 rounded-lg transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(114,9,183,0.5)]"
                    >
                        <Plus size={16} /> <span className="text-sm font-medium mr-1">New Card</span>
                    </button>
                </div>
            </div>

            {notes.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center opacity-50 border border-dashed border-[var(--accent-purple)]/30 rounded-xl p-8 text-center text-[var(--accent-purple)] bg-[var(--accent-purple)]/5">
                    <HelpCircle size={40} className="mb-4" />
                    <p>Your vault is empty.</p>
                    <p className="text-sm mt-1">Click "New Card" to add rich-text notes or tasks.</p>
                </div>
            ) : (
                <div className="columns-1 sm:columns-2 gap-4 space-y-4 flex-1 overflow-y-auto custom-scrollbar pr-2 pb-4">
                    {notes.map(note => (
                        <div
                            key={note.id}
                            onClick={() => handleEdit(note)}
                            className="break-inside-avoid bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[var(--accent-purple)]/50 transition-all cursor-pointer group shadow-lg flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="font-bold text-white text-lg group-hover:text-[var(--accent-purple)] transition-colors pr-4">{note.title}</h3>
                                <button onClick={(e) => handleDelete(note.id, e)} className="text-gray-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Preview snippet max 5 lines */}
                            <div
                                className="text-sm text-gray-400 mb-4 line-clamp-5 prose prose-sm prose-invert tiptap-editor-custom preview-mode"
                                dangerouslySetInnerHTML={{ __html: note.content }}
                            />

                            <div className="flex justify-between items-end border-t border-white/5 pt-3 mt-auto">
                                <div className="flex gap-1 flex-wrap max-w-[70%]">
                                    {note.tags.map(t => (
                                        <span key={t} className="text-[10px] bg-white/10 text-gray-300 px-1.5 py-0.5 rounded-sm">{t}</span>
                                    ))}
                                </div>
                                <span className="text-[10px] text-gray-500 block shrink-0">{format(new Date(note.createdAt), "MMM d, yyyy")}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Editor */}
            {showModal && activeNote && (
                <div className="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 backdrop-blur-md bg-black/80" onClick={() => setShowModal(false)}>
                    <div className="bg-[#0f0f13] border border-white/10 rounded-2xl p-6 w-full max-w-4xl flex flex-col max-h-[90vh] shadow-[0_0_50px_rgba(114,9,183,0.2)] relative overflow-hidden" onClick={e => e.stopPropagation()}>
                        {/* Header */}
                        <div className="flex justify-between items-center mb-6 gap-4">
                            <input
                                type="text"
                                value={activeNote.title}
                                onChange={(e) => setActiveNote({ ...activeNote, title: e.target.value })}
                                placeholder="Untitled Note..."
                                className="bg-transparent border-none text-2xl font-bold text-white focus:outline-none focus:ring-0 placeholder-gray-600 w-full"
                            />
                            <div className="flex items-center gap-2">
                                <button onClick={handleSaveActiveNote} className="bg-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/80 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shrink-0">
                                    <Save size={16} /> Save
                                </button>
                                <button onClick={() => setShowModal(false)} className="bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 p-2 rounded-lg shrink-0 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="flex-1 overflow-hidden bg-black/40 rounded-xl border border-white/5 p-4 custom-scrollbar">
                            <TipTapEditor
                                content={activeNote.content}
                                onChange={(html) => setActiveNote({ ...activeNote, content: html })}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
