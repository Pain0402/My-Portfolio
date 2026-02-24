-- Chạy lệnh này trong SQL Editor của Supabase để thêm 4 Project mẫu

-- Thêm cột background_gradient nếu chưa có
ALTER TABLE projects ADD COLUMN IF NOT EXISTS background_gradient text;

-- Xóa dữ liệu cũ nếu muốn chạy lại (tuỳ chọn)
DELETE FROM projects;

INSERT INTO projects (
  title, 
  slug, 
  category, 
  year, 
  description, 
  tech_stack, 
  logo_url, 
  cover_image_url, 
  repo_url, 
  demo_url, 
  overview, 
  problem_statement, 
  architecture, 
  learnings,
  background_gradient
) VALUES 
(
  'ComicsVerse', 
  'comics-reading-application', 
  'Mobile App', 
  '2024', 
  'A premium, cross-platform mobile application for immersive comics and manga reading experience.', 
  ARRAY['Flutter', 'Supabase', 'Riverpod', 'GoRouter'], 
  '/projects/logos/comicsverse.png', 
  'https://placehold.co/1920x1080/1e1b4b/FFF?text=ComicsVerse+Home', 
  'https://github.com/Pain0402/Comics-Reading-Application', 
  null, 
  'ComicsVerse is a cross-platform mobile application built with Flutter that delivers an immersive comics and manga reading experience. It features dual reading modes (Vertical Scroll & Horizontal Flip), a glassmorphism UI, real-time community interaction, and a personalized discovery feed.', 
  'Digital comic readers often suffer from fragmented experiences—apps are either good for Webtoons (vertical) or Manga (horizontal), but rarely both. Additionally, most readers lack real-time social engagement features.', 
  'The app follows a Feature-First Clean Architecture with Riverpod for state management. It connects to Supabase for authentication, real-time database updates (comments/reactions), and storage. The UI is built with Flutter''s widget system, utilizing custom render objects for the complex reading engine.', 
  'I mastered advanced Flutter performance optimization techniques and gained deep experience with Supabase''s Realtime capabilities. The project also reinforced the importance of separation of concerns in large-scale mobile app architectures.',
  'bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900'
),
(
  'TechSage', 
  'techsage', 
  'AI SaaS Platform', 
  '2024', 
  'Smart document management platform with AI summarization, chat with documents, and quiz generation.', 
  ARRAY['Vue.js 3', 'Express.js', 'PostgreSQL', 'LangChain', 'Google Gemini'], 
  '/projects/logos/techsage.png', 
  'https://placehold.co/1920x1080/064e3b/FFF?text=Dashboard', 
  'https://github.com/Pain0402/TechSage', 
  null, 
  'TechSage addresses the information overload problem by allowing users to quickly digest complex PDF documents. It transforms static files into interactive knowledge bases where users can ask questions, get summaries, and test their understanding.', 
  'Students and professionals often struggle to extract key information from lengthy PDF documents efficiently. Existing tools are either too expensive or lack interactive capability like Q&A and quiz generation.', 
  'The system uses a Microservices-inspired architecture. The backend (Express.js) orchestrates AI tasks via LangChain, interfacing with Google Gemini for generation and a vector store for RAG. PostgreSQL handles relational data (users, projects), while the Vue 3 frontend ensures a responsive user experience.', 
  'Building TechSage taught me practical applications of LLMs and Vector Databases. I learned how to bridge the gap between deterministic web logic and probabilistic AI outputs, as well as managing long-running async tasks in a Node.js environment.',
  'bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900'
),
(
  'CoolStyle', 
  'fashion-ecommerce', 
  'E-commerce', 
  '2024', 
  'Modern, high-performance fashion e-commerce platform built with .NET 8 and Vue 3.', 
  ARRAY['Vue 3', '.NET 8 Web API', 'SQL Server', 'Tailwind CSS v4', 'Docker'], 
  '/projects/logos/coolstyle.svg', 
  '/projects/screenshots/fashion-ecommerce/homepage.png', 
  'https://github.com/Pain0402/CoolStyle', 
  null, 
  'CoolStyle is a full-stack fashion e-commerce solution architected with Clean Architecture principles. It features a high-performance .NET 8 Web API backend, a responsive Vue 3 storefront, secure JWT authentication, and a containerized deployment setup using Docker.', 
  'Many e-commerce templates are either bloated or lack crucial features like real-time inventory and secure, scalable architecture. CoolStyle aims to provide a production-ready, clean-architecture reference implementation.', 
  'Built on Clean Architecture principles, separating Domain, Application, Infrastructure, and API layers. It uses CQRS (Command Query Responsibility Segregation) pattern for optimized data handling. The application is containerized with Docker for consistent deployment.', 
  'I deepened my understanding of Enterprise Software Architecture, specifically Clean Architecture and DDD (Domain-Driven Design). I also gained hands-on experience with Docker containerization and CI/CD pipelines for .NET applications.',
  'bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900'
),
(
  'CineVerse', 
  'cineverse', 
  'Web App', 
  '2023', 
  'Full-stack movie platform with booking management and dynamic database interaction.', 
  ARRAY['Vue.js', 'Express.js', 'PostgreSQL', 'Knex.js'], 
  '/projects/logos/cineverse.png', 
  'https://placehold.co/1920x1080/451a03/FFF?text=Movie+Catalog', 
  'https://github.com/Pain0402/Cine-Verse', 
  null, 
  'CineVerse is a comprehensive web application for movie enthusiasts, allowing users to explore movies, manage bookings, and interact with a rich database. It demonstrates solid full-stack development skills with a Vue.js frontend and an Express.js/PostgreSQL backend.', 
  'Movie booking systems are often complex to manage for admins and cumbersome for users. CineVerse aims to simplify the flow of discovering movies and booking seats through an intuitive UI.', 
  'A classic RESTful MVC architecture. The Express.js backend serves API endpoints consumed by the Vue.js SPA. Data is managed in a normalized PostgreSQL schema, accessed via the Knex.js query builder for flexibility and control.', 
  'This project solidifed my foundational knowledge of Relational Database Design (normalization) and Backend API development. I learned to manually write complex SQL queries via Knex and manage user sessions securely.',
  'bg-gradient-to-br from-amber-900 via-orange-900 to-red-900'
);
