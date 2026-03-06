# 🚀 Creative Portfolio - Future Roadmap & Ideation

Tài liệu này lưu trữ các ý tưởng phát triển nâng cao cho dự án Creative Portfolio nhằm biến nó thành một trải nghiệm web tương tác (Interactive Web Experience) độc đáo, vượt xa tiêu chuẩn của một trang giới thiệu bản thân thông thường.

---

## 🎨 1. Nâng cấp Trải nghiệm Người Dùng (UX & Sensory Polish)

### 1.1. Spatial UI Sounds (Âm thanh Không gian & Tương tác)
*   **Mô tả:** Thêm các hiệu ứng âm thanh nhỏ (micro-interactions) để tăng cảm giác "phản hồi vật lý" và phong cách Cyberpunk/Sci-Fi.
*   **Ứng dụng thực tế:**
    *   Tiếng `tick` cơ học nhẹ hoặc tiếng `synth` mỏng khi di chuột (hover) qua các link trên Navbar, Project Cards, hoặc Skills.
    *   Tiếng `whoosh` hoặc `warp` khi chuyển cảnh trang (Space Warp effect).
    *   Tiếng gõ bàn phím lách cách (typewriter sound) khi render hiệu ứng chữ trên trang Home (Hero section).
*   **Độ khó:** Dễ - Trung bình (Sử dụng các thư viện như `use-sound` với các file `.mp3` hoặc `.wav` nén nhỏ).

### 1.2. Interactive Theme Matrix (Bảng điều khiển Giao diện Nâng cao)
*   **Mô tả:** Giao quyền cho người dùng tự phối màu "Vibe" của trang web, tận dụng sức mạnh của CSS Variables hiện tại.
*   **Ứng dụng thực tế:**
    *   Thêm một Widget nhỏ ở góc hoặc tích hợp vào `/hub`.
    *   Các preset màu (Ví dụ: `Matrix Green`, `Cyberpunk Yellow/Red`, `Deep Ocean Blue`, `Midnight Purple`). 
    *   Khi chọn, toàn bộ Glow, màu nhấn của chữ, hình học 3D, Gradient và viền phát sáng của trang web sẽ chuyển màu theo (transition mượt mà).
*   **Độ khó:** Dễ.

### 1.3. Terminal Boot Sequence (Màn hình Khởi động OS)
*   **Mô tả:** Thay vì nhảy thẳng vào trang 3D sặc sỡ, người dùng sẽ trải qua một màn hình khởi động ngắn mang phong cách Hệ Điều Hành Hacker.
*   **Ứng dụng thực tế:**
    *   Màn hình giả lập DOS/Terminal (chỉ khoảng 2 - 3 giây) chạy các dòng lệnh loading giả (vd: `[OK] Booting System V2.1...`, `[OK] Establishing neural connection...`, `[WARN] Restricted zone detected...`).
    *   Sau khi chạy xong, hiệu ứng "Vỡ màn hình" hoặc "Reveal" sẽ mở ra giao diện Portfolio 3D hiện tại.
    *   Lưu ý: Cần tùy chọn "Skip" hoặc dùng `sessionStorage` để chỉ hiện 1 lần duy nhất trong một phiên duyệt web, tránh gây phiền hà.
*   **Độ khó:** Trung bình (Cần kiểm soát state tốt để không chặn TTI - Time to Interactive của web).

---

## 💻 2. Nâng cấp Không gian Trưng bày (Showcases & Playgrounds)

### 2.1. Biến `/playground` thành một Web-IDE Thực thụ
*   **Mô tả:** Nâng cấp khu vực Playground hiện tại (đang trống) thành một thư viện Code Snippets tương tác.
*   **Ứng dụng thực tế:**
    *   Tích hợp thư viện như `Sandpack` (của CodeSandbox) để cho phép người xem chạy và sửa React code ngay trên web của bạn.
    *   Ví dụ: Show mã nguồn của chiếc `HolographicCursor`, của `Space Warp Page Transition`, hoặc các component CSS Glassmorphism phức tạp...
    *   Điều này giúp nhấn mạnh kỹ năng "Frontend Specialist" và mang lại giá trị thực tiễn cho cộng đồng dev khi ghé thăm trang của bạn.
*   **Độ khó:** Khó (Cần setup môi trường bundler trực tiếp trên trình duyệt).

---

## 🤖 3. Áp dụng Trí Tuệ Nhân Tạo (AI Integration)

### 3.1. "Giang-Bot": Trợ lý AI Phỏng Vấn (Personal AI Assistant)
*   **Mô tả:** Nhấn mạnh thế mạnh về "AI Solutions" bằng cách nhúng một con chatbot được huấn luyện riêng biệt về hồ sơ của bạn.
*   **Ứng dụng thực tế:**
    *   Sử dụng API của OpenAI (ChatGPT) hoặc Google (Gemini) kết hợp với System Prompt chứa toàn bộ CV, sở thích, tính cách và các dự án của bạn (Retrieval-Augmented Generation cơ bản).
    *   Cung cấp một bong bóng chat nhỏ ở góc dưới trang. Nhà tuyển dụng hoặc khách truy cập có thể hỏi: *"Kể cho tôi nghe về dự án Thesis của Giang"*, *"Giang có kinh nghiệm với Next.js không?"*.
    *   **Đặc biệt:** Lập trình cho Bot trả lời với văn phong thông minh, khiêm tốn hoặc hài hước theo đúng chất của bạn.
*   **Độ khó:** Trung bình - Khó (Cần xử lý API Route (Backend) để giấu API Key an toàn và thiết kế giao diện Chat UI mượt mà).

---

## 🔒 4. Tiện ích và Tối ưu Hóa Hệ thống (Admin & Performance)

### 4.1. Dashboard Quản lý Toàn diện hơn
*   **Mô tả:** Mở rộng CMS (Content Management System) trên `/admin`.
*   **Ứng dụng thực tế:**
    *   Phân tích lượt truy cập (Tích hợp Vercel Analytics hoặc PostHog nhỏ gọn) ngay trong `/admin/dashboard`.
    *   Quản lý file phương tiện (Upload ảnh lên Supabase Storage trực tiếp từ Admin UI thay vì dán link thủ công).

### 4.2. Tối ưu 3D (Level of Detail - LOD)
*   **Mô tả:** Giữ cho trang web luôn chạy ở 60FPS kể cả trên điện thoại cấu hình yếu.
*   **Ứng dụng thực tế:**
    *   Giảm số điểm (vertices) của hình học 3D nếu màn hình là Mobile.
    *   Tat hẳn (unmount) canvas 3D khi thanh cuộn lướt qua khỏi vùng Hero section để giải phóng GPU.
