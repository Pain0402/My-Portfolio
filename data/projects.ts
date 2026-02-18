export interface Project {
    title: string;
    slug: string;
    category: string;
    year: string;
    description: string;
    techStack: string[];
    logo: string;
    img: string; // Background gradient or image class
    repoUrl: string;
    demoUrl?: string; // Optional
    overview: string; // Detailed overview for the detail page
    problemStatement?: string;
    architecture?: string;
    challenges?: string; // Challenges & Solutions
    learnings?: string;
    media?: { type: 'image' | 'video'; url: string; caption?: string }[];
}

export const projects: Project[] = [
    {
        title: "ComicsVerse",
        category: "Mobile App",
        slug: "comics-reading-application",
        year: "2024",
        description: "A premium, cross-platform mobile application for immersive comics and manga reading experience.",
        techStack: ["Flutter", "Supabase", "Riverpod", "GoRouter"],
        logo: "/projects/logos/comicsverse.png",
        img: "bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900",
        repoUrl: "https://github.com/Pain0402/Comics-Reading-Application",
        overview: "ComicsVerse is a cross-platform mobile application built with Flutter that delivers an immersive comics and manga reading experience. It features dual reading modes (Vertical Scroll & Horizontal Flip), a glassmorphism UI, real-time community interaction, and a personalized discovery feed.",
        problemStatement: "Digital comic readers often suffer from fragmented experiences—apps are either good for Webtoons (vertical) or Manga (horizontal), but rarely both. Additionally, most readers lack real-time social engagement features.",
        architecture: "The app follows a Feature-First Clean Architecture with Riverpod for state management. It connects to Supabase for authentication, real-time database updates (comments/reactions), and storage. The UI is built with Flutter's widget system, utilizing custom render objects for the complex reading engine.",
        challenges: "Implementing a performant dual-mode reading engine was difficult. Synchronizing page states between vertical scroll and horizontal swipe while maintaining 60fps performance required optimizing Flutter's InteractiveViewer and caching strategies. I also handled real-time sync conflict resolution for user comments.",
        learnings: "I mastered advanced Flutter performance optimization techniques and gained deep experience with Supabase's Realtime capabilities. The project also reinforced the importance of separation of concerns in large-scale mobile app architectures.",
        media: [
            { type: "image", url: "https://placehold.co/1920x1080/1e1b4b/FFF?text=ComicsVerse+Home", caption: "Home Screen with Personalized Feed" },
            { type: "image", url: "https://placehold.co/1920x1080/312e81/FFF?text=Reading+Mode", caption: "Immersive Reading Engine" },
            { type: "image", url: "https://placehold.co/1920x1080/4338ca/FFF?text=Community", caption: "Real-time Comments & Discussion" },
        ],
    },
    {
        title: "TechSage",
        category: "AI SaaS Platform",
        slug: "techsage",
        year: "2024",
        description: "Smart document management platform with AI summarization, chat with documents, and quiz generation.",
        techStack: ["Vue.js 3", "Express.js", "PostgreSQL", "LangChain", "Google Gemini"],
        logo: "/projects/logos/techsage.png",
        img: "bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900",
        repoUrl: "https://github.com/Pain0402/TechSage",
        overview: "TechSage addresses the information overload problem by allowing users to quickly digest complex PDF documents. It transforms static files into interactive knowledge bases where users can ask questions, get summaries, and test their understanding.",
        problemStatement: "Students and professionals often struggle to extract key information from lengthy PDF documents efficiently. Existing tools are either too expensive or lack interactive capability like Q&A and quiz generation.",
        architecture: "The system uses a Microservices-inspired architecture. The backend (Express.js) orchestrates AI tasks via LangChain, interfacing with Google Gemini for generation and a vector store for RAG. PostgreSQL handles relational data (users, projects), while the Vue 3 frontend ensures a responsive user experience.",
        challenges: "Integrating reliable RAG (Retrieval-Augmented Generation) was difficult due to 'hallucinations' and token limits. I implemented a chunking strategy and context window management to improve accuracy. Securely handling file uploads and ensuring low-latency AI responses were also key technical hurdles.",
        learnings: "Building TechSage taught me practical applications of LLMs and Vector Databases. I learned how to bridge the gap between deterministic web logic and probabilistic AI outputs, as well as managing long-running async tasks in a Node.js environment.",
        media: [
            { type: "image", url: "https://placehold.co/1920x1080/064e3b/FFF?text=Dashboard", caption: "Project Dashboard" },
            { type: "image", url: "https://placehold.co/1920x1080/065f46/FFF?text=AI+Chat", caption: "Interactive Document Chat" },
            { type: "image", url: "https://placehold.co/1920x1080/047857/FFF?text=Quiz+Gen", caption: "Automatic Quiz Generation" },
        ],
    },
    {
        title: "CoolStyle",
        category: "E-commerce",
        slug: "fashion-ecommerce",
        year: "2024",
        description: "Modern, high-performance fashion e-commerce platform built with .NET 8 and Vue 3.",
        techStack: ["Vue 3", ".NET 8 Web API", "SQL Server", "Tailwind CSS v4", "Docker"],
        logo: "/projects/logos/coolstyle.svg",
        img: "bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900",
        repoUrl: "https://github.com/Pain0402/CoolStyle",
        overview: "CoolStyle is a full-stack fashion e-commerce solution architected with Clean Architecture principles. It features a high-performance .NET 8 Web API backend, a responsive Vue 3 storefront, secure JWT authentication, and a containerized deployment setup using Docker.",
        problemStatement: "Many e-commerce templates are either bloated or lack crucial features like real-time inventory and secure, scalable architecture. CoolStyle aims to provide a production-ready, clean-architecture reference implementation.",
        architecture: "Built on Clean Architecture principles, separating Domain, Application, Infrastructure, and API layers. It uses CQRS (Command Query Responsibility Segregation) pattern for optimized data handling. The application is containerized with Docker for consistent deployment.",
        challenges: "Adopting Clean Architecture in .NET 8 was initially complex due to the boilerplate code, but it paid off in maintainability. Optimizing database performance with EF Core and implementing Redis caching for high-traffic product listings were critical challenges I solved.",
        learnings: "I deepened my understanding of Enterprise Software Architecture, specifically Clean Architecture and DDD (Domain-Driven Design). I also gained hands-on experience with Docker containerization and CI/CD pipelines for .NET applications.",
        media: [
            { type: "image", url: "/projects/screenshots/fashion-ecommerce/homepage.png", caption: "Modern Homepage Design" },
            { type: "image", url: "https://placehold.co/1920x1080/881337/FFF?text=Product+Details", caption: "Product Detail Page" },
            { type: "image", url: "https://placehold.co/1920x1080/9f1239/FFF?text=Checkout", caption: "Streamlined Checkout Process" },
        ],
    },
    {
        title: "CineVerse",
        category: "Web App",
        slug: "cineverse",
        year: "2023",
        description: "Full-stack movie platform with booking management and dynamic database interaction.",
        techStack: ["Vue.js", "Express.js", "PostgreSQL", "Knex.js"],
        logo: "/projects/logos/cineverse.png",
        img: "bg-gradient-to-br from-amber-900 via-orange-900 to-red-900",
        repoUrl: "https://github.com/Pain0402/Cine-Verse",
        overview: "CineVerse is a comprehensive web application for movie enthusiasts, allowing users to explore movies, manage bookings, and interact with a rich database. It demonstrates solid full-stack development skills with a Vue.js frontend and an Express.js/PostgreSQL backend.",
        problemStatement: "Movie booking systems are often complex to manage for admins and cumbersome for users. CineVerse aims to simplify the flow of discovering movies and booking seats through an intuitive UI.",
        architecture: "A classic RESTful MVC architecture. The Express.js backend serves API endpoints consumed by the Vue.js SPA. Data is managed in a normalized PostgreSQL schema, accessed via the Knex.js query builder for flexibility and control.",
        challenges: "Designing the complex relational database schema for movies, showtimes, theaters, and bookings was the main challenge. Handling concurrent seat bookings (preventing double booking) required implementing database transactions and careful locking strategies.",
        learnings: "This project solidifed my foundational knowledge of Relational Database Design (normalization) and Backend API development. I learned to manually write complex SQL queries via Knex and manage user sessions securely.",
        media: [
            { type: "image", url: "https://placehold.co/1920x1080/451a03/FFF?text=Movie+Catalog", caption: "Extensive Movie Catalog" },
            { type: "image", url: "https://placehold.co/1920x1080/7c2d12/FFF?text=Seat+Booking", caption: "Interactive Seat Selection" },
        ],
    },
];
