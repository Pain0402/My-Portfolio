"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, RotateCw, Check, X, GraduationCap, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getFlashcards, addFlashcard, deleteFlashcardAction, updateFlashcardStatus } from "@/app/actions/hub.action";

type Flashcard = {
    id: string;
    front: string;
    back: string;
    status: 'new' | 'learning' | 'known';
};

export default function Flashcards() {
    const [cards, setCards] = useState<Flashcard[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<'list' | 'study'>('list');

    // New Card Form
    const [newFront, setNewFront] = useState("");
    const [newBack, setNewBack] = useState("");

    // Study Mode State
    const [studyIndex, setStudyIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        setIsLoading(true);
        const data = await getFlashcards();
        setCards(data || []);
        setIsLoading(false);
    };

    const handleAddCard = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFront.trim() || !newBack.trim()) return;

        const optimisticCard: Flashcard = {
            id: Date.now().toString(),
            front: newFront.trim(),
            back: newBack.trim(),
            status: 'new'
        };

        setCards([optimisticCard, ...cards]);
        setNewFront("");
        setNewBack("");

        await addFlashcard(optimisticCard.front, optimisticCard.back);
        fetchCards();
    };

    const handleDelete = async (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        setCards(prev => prev.filter(c => c.id !== id));
        await deleteFlashcardAction(id);
    };

    const handleUpdateStatus = async (id: string, status: Flashcard['status']) => {
        setCards(prev => prev.map(c => c.id === id ? { ...c, status } : c));
        await updateFlashcardStatus(id, status);
    };

    const studyCards = cards.filter(c => c.status !== 'known');
    const currentStudyCard = studyCards[studyIndex];

    const nextStudyCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setStudyIndex(prev => (prev + 1) % studyCards.length);
        }, 150);
    };

    return (
        <div className="w-full flex-1 flex flex-col min-h-0 bg-transparent">
            {/* Header & Modes */}
            <div className="flex justify-between items-center mb-6 shrink-0">
                <div className="flex items-center gap-3 text-amber-500">
                    <GraduationCap size={24} />
                    <h2 className="text-2xl font-bold tracking-wide">English Flashcards</h2>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setView('list')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'list' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' : 'bg-black/20 text-gray-400 border border-white/5 hover:bg-white/5'}`}
                    >
                        Manage
                    </button>
                    <button
                        onClick={() => {
                            setStudyIndex(0);
                            setIsFlipped(false);
                            setView('study');
                        }}
                        disabled={studyCards.length === 0}
                        className={`px-4 py-2 flex items-center gap-2 rounded-xl text-sm font-bold transition-all ${view === 'study' ? 'bg-amber-500 text-black' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/30'} ${studyCards.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <BookOpen size={16} /> Study Mode
                    </button>
                </div>
            </div>

            {/* List View */}
            {view === 'list' && (
                <div className="flex-1 flex flex-col min-h-0 bg-black/20 rounded-2xl border border-white/5 p-6 shadow-inner overflow-hidden">
                    {/* Add Form */}
                    <form onSubmit={handleAddCard} className="flex gap-4 mb-6 shrink-0 flex-wrap sm:flex-nowrap">
                        <input
                            type="text"
                            placeholder="Word (Front)"
                            value={newFront}
                            onChange={(e) => setNewFront(e.target.value)}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50"
                        />
                        <input
                            type="text"
                            placeholder="Meaning (Back)"
                            value={newBack}
                            onChange={(e) => setNewBack(e.target.value)}
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50"
                        />
                        <button type="submit" className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 px-6 py-3 rounded-xl border border-amber-500/30 transition-all font-bold flex items-center gap-2 w-full sm:w-auto justify-center">
                            <Plus size={18} /> Add
                        </button>
                    </form>

                    {/* Cards Grid */}
                    {isLoading ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-lenis-prevent="true">
                            {cards.map(card => (
                                <div key={card.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl group relative overflow-hidden flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-white">{card.front}</h3>
                                        <button onClick={(e) => handleDelete(card.id, e)} className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4 flex-1">{card.back}</p>
                                    <div className="flex gap-2">
                                        {(['new', 'learning', 'known'] as const).map(status => (
                                            <button
                                                key={status}
                                                onClick={() => handleUpdateStatus(card.id, status)}
                                                className={`text-xs px-2 py-1 rounded border capitalize flex-1 text-center transition-all ${card.status === status
                                                    ? status === 'known' ? 'bg-green-500/20 text-green-500 border-green-500/30'
                                                        : status === 'learning' ? 'bg-blue-500/20 text-blue-500 border-blue-500/30'
                                                            : 'bg-white/20 text-white border-white/30'
                                                    : 'bg-transparent text-gray-500 border-white/5 hover:border-white/20 hover:text-gray-300'
                                                    }`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                    {card.status === 'known' && (
                                        <div className="absolute top-0 right-0 w-8 h-8 bg-green-500/20 flex items-center justify-center rounded-bl-2xl">
                                            <Check size={14} className="text-green-500" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {cards.length === 0 && (
                                <div className="col-span-full py-20 text-center text-gray-500">
                                    <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>No flashcards yet. Add some to start learning!</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Study Mode */}
            {view === 'study' && (
                <div className="flex-1 flex flex-col items-center justify-center min-h-0 bg-transparent p-6 relative">
                    {studyCards.length > 0 && currentStudyCard ? (
                        <div className="w-full max-w-lg flex flex-col items-center gap-8">
                            <span className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-4">
                                Card {studyIndex + 1} of {studyCards.length}
                            </span>

                            {/* Flip Card Container */}
                            <div className="relative w-full h-80 group perspective-1000">
                                <motion.div
                                    className="w-full h-full relative"
                                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                                    transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                                    style={{ transformStyle: "preserve-3d" }}
                                    onClick={() => setIsFlipped(!isFlipped)}
                                >
                                    {/* Front */}
                                    <div className="absolute w-full h-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center p-8 cursor-pointer" style={{ backfaceVisibility: "hidden" }}>
                                        <div className="absolute top-6 left-6 opacity-30">
                                            <GraduationCap size={24} className="text-amber-500" />
                                        </div>
                                        <h3 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 text-center leading-tight">
                                            {currentStudyCard.front}
                                        </h3>
                                        <p className="absolute bottom-6 text-sm text-gray-500 uppercase tracking-widest animate-pulse flex items-center gap-2">
                                            <RotateCw size={14} /> Tap to flip
                                        </p>
                                    </div>

                                    {/* Back */}
                                    <div className="absolute w-full h-full rounded-3xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-xl shadow-[0_0_50px_rgba(245,158,11,0.1)] flex flex-col items-center justify-center p-8 cursor-pointer" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                                        <p className="text-3xl text-amber-500 font-medium text-center leading-relaxed">
                                            {currentStudyCard.back}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Actions */}
                            <AnimatePresence>
                                {isFlipped ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-4 w-full"
                                    >
                                        <button
                                            onClick={() => {
                                                handleUpdateStatus(currentStudyCard.id, 'learning');
                                                nextStudyCard();
                                            }}
                                            className="flex-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 py-4 rounded-2xl font-bold flex flex-col items-center transition-all"
                                        >
                                            <X size={24} className="mb-1" /> Again
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleUpdateStatus(currentStudyCard.id, 'known');
                                                nextStudyCard();
                                            }}
                                            className="flex-1 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-500 py-4 rounded-2xl font-bold flex flex-col items-center transition-all"
                                        >
                                            <Check size={24} className="mb-1" /> Got it
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="h-[88px]" /> // Spacer to avoid layout shift jump
                                )}
                            </AnimatePresence>

                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check size={48} className="text-green-500" />
                            </div>
                            <h3 className="text-3xl font-display font-bold text-white mb-4">All Caught Up!</h3>
                            <p className="text-gray-400 mb-8 max-w-sm mx-auto">You've studied all your cards or marked them as known. Add more cards to continue.</p>
                            <button onClick={() => setView('list')} className="bg-white/10 hover:bg-white/20 transition-all font-bold px-8 py-3 outline-none rounded-xl">
                                Back to Manage
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
