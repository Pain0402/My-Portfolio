import Container from "@/components/ui/Container";
import Link from "next/link";
import { Github, Twitter, Mail, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer id="contact" className="bg-[var(--bg-deep)] border-t border-white/5 py-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-purple)]/50 to-transparent"></div>

            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                            Let's build <br />
                            <span className="text-gradient">something amazing.</span>
                        </h2>
                        <p className="text-gray-400 max-w-md text-lg">
                            Whether you have a project in mind or just want to say hi, I'm always open to new ideas and opportunities.
                        </p>

                        <a
                            href="mailto:tranhuugiang1213@gmail.com"
                            className="mt-8 inline-block text-2xl font-light hover:text-[var(--accent-cyan)] transition-colors border-b border-white/20 hover:border-[var(--accent-cyan)] pb-1"
                        >
                            tranhuugiang1213@gmail.com
                        </a>
                    </div>

                    <div className="flex flex-col md:items-end justify-center space-y-8">
                        <div className="flex gap-6">
                            <Link href="https://github.com/Pain0402" target="_blank" className="p-4 rounded-full glass hover:bg-white/10 transition-colors group">
                                <Github className="text-gray-400 group-hover:text-white transition-colors" />
                            </Link>
                            <Link href="#" className="p-4 rounded-full glass hover:bg-white/10 transition-colors group">
                                <Linkedin className="text-gray-400 group-hover:text-[#0077b5] transition-colors" />
                            </Link>
                            <Link href="#" className="p-4 rounded-full glass hover:bg-white/10 transition-colors group">
                                <Twitter className="text-gray-400 group-hover:text-[#1da1f2] transition-colors" />
                            </Link>
                        </div>

                        <div className="text-right text-gray-500 text-sm font-mono uppercase tracking-widest">
                            <p>&copy; {new Date().getFullYear()} Tran Huu Giang.</p>
                            <p className="mt-2">Designed & Built with <span className="text-red-500">&hearts;</span></p>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
