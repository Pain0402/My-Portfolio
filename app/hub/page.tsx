"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { PenTool, CheckSquare, Calendar, Shield, Home, Trash2 } from "lucide-react";

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false });

export default function HubPage() {
    const router = useRouter();

    // Notes State
    const [note, setNote] = useState("");

    // Todos State
    const [todos, setTodos] = useState<{ id: string; text: string; completed: boolean }[]>([]);
    const [newTodo, setNewTodo] = useState("");

    // Countdown State
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        // Load from LocalStorage
        const savedNote = localStorage.getItem("giang_hub_note");
        if (savedNote) setNote(savedNote);

        const savedTodos = localStorage.getItem("giang_hub_todos");
        if (savedTodos) setTodos(JSON.parse(savedTodos));

        // Tet Countdown Logic (Target: Feb 6, 2027 - Lunar New Year)
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

    // Save Note
    const handleSaveNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
        localStorage.setItem("giang_hub_note", e.target.value);
    };

    // Add Todo
    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        const updatedTodos = [{ id: Date.now().toString(), text: newTodo, completed: false }, ...todos];
        setTodos(updatedTodos);
        localStorage.setItem("giang_hub_todos", JSON.stringify(updatedTodos));
        setNewTodo("");
    };

    // Toggle Todo
    const toggleTodo = (id: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem("giang_hub_todos", JSON.stringify(updatedTodos));
    };

    // Delete Todo
    const deleteTodo = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        localStorage.setItem("giang_hub_todos", JSON.stringify(updatedTodos));
    };

    return (
        <main className="relative min-h-screen w-full flex flex-col items-center py-20 px-4 sm:px-6 lg:px-8">
            <Scene />

            {/* Header & Navigation */}
            <div className="w-full max-w-6xl mb-12 flex flex-col md:flex-row justify-between items-center gap-6 z-10 glassmorphism p-6 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-xl">
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

            {/* Dashboard Grid */}
            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10">

                {/* Module 1: Countdown Timer */}
                <div className="glassmorphism p-6 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md lg:col-span-3 flex flex-col items-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[var(--accent-cyan)]/10 rounded-full blur-3xl group-hover:bg-[var(--accent-cyan)]/20 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[var(--accent-purple)]/10 rounded-full blur-3xl group-hover:bg-[var(--accent-purple)]/20 transition-all duration-700"></div>

                    <div className="flex items-center justify-center gap-3 mb-6 relative z-10 text-[var(--accent-cyan)]">
                        <Calendar size={28} />
                        <h2 className="text-2xl font-bold tracking-widest uppercase">Tết 2027 Countdown</h2>
                    </div>

                    <div className="flex gap-4 sm:gap-8 relative z-10">
                        {Object.entries(timeLeft).map(([unit, value]) => (
                            <div key={unit} className="flex flex-col items-center">
                                <div className="w-20 h-24 sm:w-24 sm:h-28 glassmorphism bg-black/40 border border-white/10 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,245,212,0.1)]">
                                    <span className="text-4xl sm:text-5xl font-display font-bold text-white tracking-widest">
                                        {String(value).padStart(2, '0')}
                                    </span>
                                </div>
                                <span className="text-gray-400 mt-3 uppercase text-xs sm:text-sm tracking-[0.2em]">{unit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Module 2: Quick Notes */}
                <div className="glassmorphism p-6 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md flex flex-col lg:col-span-2">
                    <div className="flex items-center gap-3 mb-4 text-[var(--accent-purple)]">
                        <PenTool size={22} />
                        <h2 className="text-xl font-bold tracking-wide">Quick Notes</h2>
                    </div>
                    <textarea
                        value={note}
                        onChange={handleSaveNote}
                        placeholder="Write something down before you forget..."
                        className="w-full flex-grow min-h-[250px] bg-black/30 border border-white/10 rounded-xl p-4 text-gray-300 focus:outline-none focus:border-[var(--accent-purple)]/50 focus:ring-1 focus:ring-[var(--accent-purple)]/50 transition-all resize-none shadow-inner"
                    />
                </div>

                {/* Module 3: To-Do List */}
                <div className="glassmorphism p-6 rounded-2xl border border-[var(--glass-border)] bg-[rgba(255,255,255,0.05)] backdrop-blur-md flex flex-col">
                    <div className="flex items-center gap-3 mb-4 text-[var(--accent-pink)]">
                        <CheckSquare size={22} />
                        <h2 className="text-xl font-bold tracking-wide">Plan & Tasks</h2>
                    </div>

                    <form onSubmit={handleAddTodo} className="mb-4">
                        <input
                            type="text"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                            placeholder="Thêm kế hoạch mới..."
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-[var(--accent-pink)]/50 transition-all"
                        />
                    </form>

                    <div className="flex-grow overflow-y-auto pr-2 space-y-2 max-h-[250px] custom-scrollbar">
                        {todos.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-gray-500 text-sm italic">
                                Chán thế, không có việc gì à?
                            </div>
                        ) : (
                            todos.map((todo) => (
                                <div
                                    key={todo.id}
                                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${todo.completed
                                        ? 'bg-white/5 border-white/5 opacity-50'
                                        : 'bg-black/40 border-white/10 hover:border-[var(--accent-pink)]/30'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden cursor-pointer flex-grow" onClick={() => toggleTodo(todo.id)}>
                                        <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border ${todo.completed ? 'bg-[var(--accent-pink)] border-[var(--accent-pink)] text-black' : 'border-white/30'}`}>
                                            {todo.completed && <CheckSquare size={12} />}
                                        </div>
                                        <span className={`text-sm truncate ${todo.completed ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                                            {todo.text}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="ml-2 text-gray-500 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
}
