"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { PenTool, Calendar, Shield, Home, Trash2, ArrowRight, Save, CheckCircle, Clock, CheckSquare } from "lucide-react";
import { getNote, updateNote, getTodos, addTodo, updateTodoStatus, deleteTodoAction } from "@/app/actions/hub.action";
import DailyQuote from "@/components/hub/DailyQuote";
import LofiPlayer from "@/components/hub/LofiPlayer";

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

type Todo = { id: string; title: string; status: string; position: number };

export default function HubPage() {
    const router = useRouter();

    // Notes State
    const [note, setNote] = useState("");
    const [isSavingNote, setIsSavingNote] = useState(false);
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Todos State
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [isFetchingTodos, setIsFetchingTodos] = useState(true);

    // Countdown State
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Fetch Note from DB
        getNote().then(data => setNote(data?.content || ""));

        // Fetch Todos from DB
        getTodos().then(data => {
            setTodos(data as Todo[]);
            setIsFetchingTodos(false);
        });

        // Tet Countdown Logic (Target: Feb 6, 2027)
        const tetDate = new Date("2027-02-06T00:00:00+07:00").getTime();
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = tetDate - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Handle Note Change (Auto-save with debounce)
    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setNote(val);

        setIsSavingNote(true);
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

        saveTimeoutRef.current = setTimeout(async () => {
            await updateNote(val);
            setIsSavingNote(false);
        }, 1000);
    };

    // Add Todo
    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        const optimisticTodo: Todo = { id: Date.now().toString(), title: newTodo, status: 'todo', position: 0 };
        setTodos([optimisticTodo, ...todos]);
        setNewTodo("");

        await addTodo(optimisticTodo.title, 'todo');
        // Re-fetch to get real ID from DB
        const freshTodos = await getTodos();
        setTodos(freshTodos as Todo[]);
    };

    // Update Todo Status (Kanban Move)
    const handleMoveTodo = async (id: string, newStatus: string) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
        await updateTodoStatus(id, newStatus);
    };

    // Delete Todo
    const handleDeleteTodo = async (id: string) => {
        setTodos(prev => prev.filter(t => t.id !== id));
        await deleteTodoAction(id);
    };

    // Kanban Columns Filter
    const todoList = todos.filter(t => t.status === 'todo');
    const inProgressList = todos.filter(t => t.status === 'in-progress');
    const doneList = todos.filter(t => t.status === 'done');

    return (
        <main className="relative min-h-screen w-full flex flex-col items-center py-20 px-4 sm:px-6 lg:px-8">
            <Scene />

            {/* Header & Navigation */}
            <div className="w-full max-w-[1400px] mb-8 flex flex-col md:flex-row justify-between items-center gap-6 z-10 glassmorphism p-6 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-xl">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)]">
                        Giang's Secret Vault
                    </h1>
                    <p className="text-gray-400 mt-2 font-light">Your personal space for quick notes, plans, and events.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all text-sm font-medium tracking-wide"
                    >
                        <Home size={16} /> Home
                    </button>
                    <button
                        onClick={() => router.push('/admin/login')}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent-pink)]/30 hover:border-[var(--accent-pink)] bg-[var(--accent-pink)]/10 hover:bg-[var(--accent-pink)]/20 transition-all text-[var(--accent-pink)] text-sm font-medium tracking-wide"
                    >
                        <Shield size={16} /> Admin Portal
                    </button>
                </div>
            </div>

            {/* Daily Quote / Terminal */}
            <DailyQuote />

            {/* Dashboard Grid */}
            <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-4 gap-6 z-10">

                {/* Countdown Timer */}
                <div className="glassmorphism p-6 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md lg:col-span-4 flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[var(--accent-cyan)]/10 rounded-full blur-3xl group-hover:bg-[var(--accent-cyan)]/20 transition-all duration-700 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[var(--accent-purple)]/10 rounded-full blur-3xl group-hover:bg-[var(--accent-purple)]/20 transition-all duration-700 pointer-events-none"></div>

                    <div className="flex items-center gap-4 mb-6 md:mb-0 relative z-10 text-[var(--accent-cyan)]">
                        <div className="p-4 bg-[var(--accent-cyan)]/10 rounded-2xl border border-[var(--accent-cyan)]/20">
                            <Calendar size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold tracking-widest uppercase">Tết 2027 Countdown</h2>
                            <p className="text-gray-400 font-mono text-sm mt-1">Target: Feb 6, 2027</p>
                        </div>
                    </div>

                    <div className="flex gap-3 sm:gap-6 relative z-10">
                        {Object.entries(timeLeft).map(([unit, value]) => (
                            <div key={unit} className="flex flex-col items-center">
                                <div className="w-16 h-20 sm:w-20 sm:h-24 glassmorphism bg-black/40 border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,245,212,0.1)]">
                                    <span className="text-3xl sm:text-4xl font-display font-bold text-white tracking-widest">
                                        {String(value).padStart(2, '0')}
                                    </span>
                                </div>
                                <span className="text-gray-400 mt-2 uppercase text-[10px] sm:text-xs tracking-[0.2em]">{unit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notes Module */}
                <div className="glassmorphism p-6 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md flex flex-col lg:col-span-1 h-[600px]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3 text-[var(--accent-purple)]">
                            <PenTool size={22} />
                            <h2 className="text-xl font-bold tracking-wide">Cloud Notes</h2>
                        </div>
                        {isSavingNote ? (
                            <span className="text-xs flex items-center gap-2 text-gray-400"><Clock size={12} className="animate-spin" /> Saving...</span>
                        ) : (
                            <span className="text-xs flex items-center gap-2 text-green-400"><CheckCircle size={12} /> Saved</span>
                        )}
                    </div>
                    <textarea
                        value={note}
                        onChange={handleNoteChange}
                        placeholder="Write down ideas, snippets, or temporary thoughts..."
                        className="w-full flex-grow bg-black/30 border border-white/10 rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:border-[var(--accent-purple)]/50 focus:ring-1 focus:ring-[var(--accent-purple)]/50 transition-all resize-none shadow-inner"
                    />
                </div>

                {/* Kanban Board Module */}
                <div className="glassmorphism p-6 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md flex flex-col lg:col-span-3 h-[600px]">
                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3 text-[var(--accent-pink)]">
                            <CheckSquare size={22} />
                            <h2 className="text-xl font-bold tracking-wide">Action Plan (Kanban)</h2>
                        </div>
                        <form onSubmit={handleAddTodo} className="flex gap-2 w-full max-w-sm">
                            <input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Add new task..."
                                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-[var(--accent-pink)]/50 transition-all"
                            />
                            <button type="submit" className="bg-[var(--accent-pink)]/10 hover:bg-[var(--accent-pink)]/20 text-[var(--accent-pink)] p-2 rounded-lg border border-[var(--accent-pink)]/30 transition-all shrink-0">
                                <ArrowRight size={20} />
                            </button>
                        </form>
                    </div>

                    {isFetchingTodos ? (
                        <div className="flex-grow flex items-center justify-center text-gray-500">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--accent-pink)]"></div>
                        </div>
                    ) : (

                        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
                            {/* To Do Column */}
                            <div className="flex flex-col bg-black/20 rounded-xl border border-white/5 p-4 overflow-hidden">
                                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 border-b border-white/5 pb-2 flex items-center justify-between">
                                    Backlog
                                    <span className="bg-white/10 px-2 py-0.5 rounded text-xs">{todoList.length}</span>
                                </h3>
                                <div className="flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                    {todoList.map(t => (
                                        <div key={t.id} className="bg-white/5 border border-white/10 p-3 rounded-lg hover:border-[var(--accent-cyan)]/30 transition-all group">
                                            <p className="text-sm text-gray-200 mb-3">{t.title}</p>
                                            <div className="flex justify-between items-center mt-auto">
                                                <button onClick={() => handleDeleteTodo(t.id)} className="text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                                                <button onClick={() => handleMoveTodo(t.id, 'in-progress')} className="text-xs bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] px-2 py-1 rounded hover:bg-[var(--accent-cyan)]/20 transition-all">Start →</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* In Progress Column */}
                            <div className="flex flex-col bg-black/20 rounded-xl border border-white/5 p-4 overflow-hidden">
                                <h3 className="text-sm font-semibold text-[var(--accent-cyan)] uppercase tracking-wider mb-4 border-b border-white/5 pb-2 flex items-center justify-between">
                                    In Progress
                                    <span className="bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] px-2 py-0.5 rounded text-xs">{inProgressList.length}</span>
                                </h3>
                                <div className="flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                    {inProgressList.map(t => (
                                        <div key={t.id} className="bg-[var(--accent-cyan)]/5 border border-[var(--accent-cyan)]/20 p-3 rounded-lg hover:border-[var(--accent-cyan)]/50 transition-all group">
                                            <p className="text-sm text-white mb-3">{t.title}</p>
                                            <div className="flex justify-between items-center mt-auto">
                                                <button onClick={() => handleMoveTodo(t.id, 'todo')} className="text-xs text-gray-400 hover:text-white transition-colors">← Back</button>
                                                <button onClick={() => handleMoveTodo(t.id, 'done')} className="text-xs bg-[var(--accent-pink)]/10 text-[var(--accent-pink)] px-2 py-1 rounded hover:bg-[var(--accent-pink)]/20 transition-all">Done ✔</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Done Column */}
                            <div className="flex flex-col bg-black/20 rounded-xl border border-white/5 p-4 overflow-hidden">
                                <h3 className="text-sm font-semibold text-[var(--accent-pink)] uppercase tracking-wider mb-4 border-b border-white/5 pb-2 flex items-center justify-between">
                                    Completed
                                    <span className="bg-[var(--accent-pink)]/20 text-[var(--accent-pink)] px-2 py-0.5 rounded text-xs">{doneList.length}</span>
                                </h3>
                                <div className="flex-grow overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                    {doneList.map(t => (
                                        <div key={t.id} className="bg-[var(--accent-pink)]/5 border border-[var(--accent-pink)]/20 p-3 rounded-lg opacity-60 hover:opacity-100 transition-all group">
                                            <p className="text-sm text-gray-400 line-through mb-3">{t.title}</p>
                                            <div className="flex justify-between items-center mt-auto">
                                                <button onClick={() => handleMoveTodo(t.id, 'in-progress')} className="text-xs text-gray-400 hover:text-white transition-colors">← Reopen</button>
                                                <button onClick={() => handleDeleteTodo(t.id)} className="text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* Lofi Radio Player */}
            <LofiPlayer />
        </main>
    );
}
