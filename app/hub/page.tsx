"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Home, Trash2, ArrowRight, CheckSquare, LayoutDashboard, FileText, CheckCircle, GraduationCap, Shield, Headphones } from "lucide-react";
import { getNote, updateNote, getTodos, addTodo, updateTodoStatus, deleteTodoAction } from "@/app/actions/hub.action";
import DailyQuote from "@/components/hub/DailyQuote";
import LofiPlayer from "@/components/hub/LofiPlayer";
import { YearProgress } from "@/components/ui/YearProgress";
import NotesBoard from "@/components/hub/NotesBoard";

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

type Todo = { id: string; title: string; status: string; position: number };

export default function HubPage() {
    const router = useRouter();

    // Tabs State
    const [activeTab, setActiveTab] = useState<'dashboard' | 'notes' | 'tasks' | 'english' | 'music'>('dashboard');

    // Notes State
    const [note, setNote] = useState("");

    // Todos State
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [isFetchingTodos, setIsFetchingTodos] = useState(true);

    useEffect(() => {
        // Fetch Note from DB
        getNote().then(data => setNote(data?.content || ""));

        // Fetch Todos from DB
        getTodos().then(data => {
            setTodos(data as Todo[]);
            setIsFetchingTodos(false);
        });
    }, []);

    // Set initial note raw data
    // Used to just be a string, but debounce is handled in the child now
    // Actually we keep `note` as the rawData to pass down to NotesBoard.

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
        <main className="relative h-screen w-full flex flex-col items-center pt-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <Scene />

            {/* Tab Navigation (fixed top) */}
            <div className="w-full max-w-[1400px] mb-4 z-50 glassmorphism p-2 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-xl flex flex-wrap justify-center sm:justify-start gap-2 shrink-0">
                {[
                    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'var(--accent-cyan)' },
                    { id: 'notes', label: 'Advanced Notes', icon: FileText, color: 'var(--accent-purple)' },
                    { id: 'tasks', label: 'Action Plan', icon: CheckSquare, color: 'var(--accent-pink)' },
                    { id: 'english', label: 'Flashcards', icon: GraduationCap, color: '#f59e0b' },
                    { id: 'music', label: 'Music Station', icon: Headphones, color: '#10b981' },
                ].map((tab) => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`flex items-center gap-2 px-6 py-3.5 text-sm font-bold tracking-wide transition-all rounded-xl relative overflow-hidden group ${isActive ? 'bg-white/10 text-white shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            <Icon size={18} className={`transition-colors duration-300`} style={{ color: isActive ? tab.color : 'inherit' }} />
                            <span>{tab.label}</span>

                            {/* Active ambient glow */}
                            {isActive && (
                                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `linear-gradient(135deg, ${tab.color}40, transparent)` }}></div>
                            )}
                            {isActive && (
                                <div className="absolute inset-x-0 bottom-0 h-[2px] opacity-70" style={{ backgroundColor: tab.color, boxShadow: `0 -2px 10px ${tab.color}` }}></div>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Main Content Area (fills remaining height, scrolls internally) */}
            <div className="w-full max-w-[1400px] z-10 flex-1 flex flex-col overflow-hidden">

                {/* 1. Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="animate-fade-in-up flex flex-col w-full flex-1 gap-8 min-h-0 overflow-y-auto custom-scrollbar pb-8" data-lenis-prevent="true">
                        {/* Header & Navigation */}
                        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 glassmorphism p-6 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-xl">
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
                                    onClick={() => router.push('/admin/dashboard')}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent-pink)]/30 hover:border-[var(--accent-pink)] bg-[var(--accent-pink)]/10 hover:bg-[var(--accent-pink)]/20 transition-all text-[var(--accent-pink)] text-sm font-medium tracking-wide"
                                >
                                    <Shield size={16} /> Admin Portal
                                </button>
                            </div>
                        </div>

                        {/* Daily Quote / Terminal */}
                        <DailyQuote />

                        <YearProgress className="w-full h-auto p-6 md:p-8" />
                    </div>
                )}

                {/* 2. Notes Tab */}
                {activeTab === 'notes' && (
                    <div className="animate-fade-in-up glassmorphism flex-1 p-6 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md flex flex-col overflow-hidden">
                        <NotesBoard rawData={note} />
                    </div>
                )}

                {/* 3. Tasks Tab (Kanban) */}
                {activeTab === 'tasks' && (
                    <div className="animate-fade-in-up glassmorphism flex-1 p-6 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md flex flex-col overflow-hidden">
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
                                    <div className="flex-grow min-h-0 overflow-y-auto pr-2 space-y-3 custom-scrollbar" data-lenis-prevent="true">
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
                                    <div className="flex-grow min-h-0 overflow-y-auto pr-2 space-y-3 custom-scrollbar" data-lenis-prevent="true">
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
                                    <div className="flex-grow min-h-0 overflow-y-auto pr-2 space-y-3 custom-scrollbar" data-lenis-prevent="true">
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
                )}

                {/* 4. English Learning Tab */}
                {activeTab === 'english' && (
                    <div className="animate-fade-in-up glassmorphism p-6 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md flex flex-col items-center justify-center flex-1 overflow-y-auto custom-scrollbar">
                        <div className="text-amber-500 mb-6 bg-amber-500/10 p-4 rounded-full">
                            <GraduationCap size={48} />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white mb-2">English Flashcards</h2>
                        <p className="text-gray-400 max-w-md text-center">
                            Master new vocabulary with interactive spaced repetition flashcards. The features for adding words and daily training are coming soon in Phase 2!
                        </p>
                        <button disabled className="mt-8 px-8 py-3 bg-amber-500/50 text-white font-bold rounded-xl cursor-not-allowed border border-amber-500/50 opacity-50">
                            Development In Progress
                        </button>
                    </div>
                )}

                {/* 5. Music Tab */}
                <div className={`${activeTab === 'music' ? 'flex animate-fade-in-up' : 'hidden'} flex-col w-full flex-1 min-h-0`}>
                    <LofiPlayer />
                </div>

            </div>
        </main>
    );
}
