"use client";

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import { Bold, Italic, Strikethrough, List, Code, CheckSquare } from 'lucide-react'
import './Tiptap.css'

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null
    }

    return (
        <div className="flex flex-wrap gap-1 p-2 bg-black/50 border-b border-white/10 backdrop-blur-xl sticky top-0 z-20">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-1.5 rounded-md transition-colors ${editor.isActive('bold') ? 'bg-[var(--accent-cyan)] text-black' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
            >
                <Bold size={16} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-1.5 rounded-md transition-colors ${editor.isActive('italic') ? 'bg-[var(--accent-cyan)] text-black' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
            >
                <Italic size={16} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`p-1.5 rounded-md transition-colors ${editor.isActive('strike') ? 'bg-[var(--accent-cyan)] text-black' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
            >
                <Strikethrough size={16} />
            </button>
            <div className="w-px h-6 bg-white/10 mx-1 self-center" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-1.5 rounded-md transition-colors ${editor.isActive('bulletList') ? 'bg-[var(--accent-purple)] text-white shadow-[0_0_10px_rgba(114,9,183,0.5)]' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
            >
                <List size={16} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                className={`p-1.5 rounded-md transition-colors ${editor.isActive('taskList') ? 'bg-[var(--accent-purple)] text-white shadow-[0_0_10px_rgba(114,9,183,0.5)]' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
            >
                <CheckSquare size={16} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-1.5 rounded-md transition-colors ${editor.isActive('codeBlock') ? 'bg-[var(--accent-pink)] text-white shadow-[0_0_10px_rgba(247,37,133,0.5)]' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}
            >
                <Code size={16} />
            </button>
        </div>
    )
}

export default function TipTapEditor({ content, onChange }: { content: string, onChange: (content: string) => void }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
        ],
        content: content || '<p></p>',
        editorProps: {
            attributes: {
                class: 'tiptap-editor-custom focus:outline-none outline-none min-h-[400px] text-gray-200 text-base lg:text-lg',
            },
        },
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    return (
        <div className="flex flex-col h-full w-full">
            <MenuBar editor={editor} />
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
