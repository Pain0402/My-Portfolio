# Admin Dashboard - Implementation Plan

## 1. Phân Tích (Analysis)
**Mục tiêu:** Xây dựng một trang quản trị bảo mật (Admin Dashboard) ngay trong dự án Next.js hiện tại để quản lý nội dung Portfolio (Projects, Skills, Profile).
**Công nghệ chốt:**
*   **Database & Storage:** Supabase (PostgreSQL + Buckets).
*   **Authentication:** Supabase Auth (OAuth 2.0 với GitHub).
*   **Frontend:** Next.js App Router, TailwindCSS, Glassmorphism UI.
*   **Nhập liệu:** Form nhập liệu văn bản thông thường (sẽ nâng cấp Rich Text sau).

**Biện pháp Bảo mật:**
*   Route `/admin/*` được bảo vệ bằng Next.js Middleware.
*   Chỉ cho phép duy nhất 1 Email cụ thể (tài khoản GitHub của chính chủ) được cấp quyền truy cập.

## 2. Kế Hoạch Các Bước (Planning)

### Giai đoạn 1: Thiết Lập Môi Trường (Setup Supabase & GitHub) -> *Bạn cần làm*
1.  Tạo tài khoản và dự án mới trên Supabase.
2.  Thiết lập GitHub OAuth App và cấu hình trong Supabase Auth.
3.  Tạo Database Tables (`projects`, `skills`, `profile`) và Storage Bucket (`portfolio-media`).
4.  Điền các biến môi trường (`.env.local`) vào dự án.

### Giai đoạn 2: Tích Hợp Supabase & Authentication vào Code 
1.  Cài đặt thư viện `@supabase/ssr` và `@supabase/supabase-js`.
2.  Tạo các utility function kết nối Supabase (Client, Server, Middleware).
3.  Xây dựng trang Login (`/admin/login`) với nút "Login with GitHub".
4.  Viết Middleware kiểm tra Session và xác thực Admin Email.

### Giai đoạn 3: Phát Triển Giao Diện Admin (UI/UX)
1.  Xây dựng Admin Layout (`/admin/layout.tsx`) với Sidebar (điều hướng) và Header.
2.  Tạo các trang quản lý List (Danh sách Projects/Skills) với Data Table UI (hiệu ứng Glassmorphism).
3.  Xây dựng các Form thêm/sửa dữ liệu (`/admin/projects/new`, `/admin/projects/[slug]`).

### Giai đoạn 4: Kết Nối Dữ Liệu & Chuyển Đổi Frontend
1.  Tích hợp Server Actions để xử lý Form Submission (Tạo, Cập nhật, Xóa).
2.  Tích hợp logic Upload ảnh/video trực tiếp lên Supabase Storage.
3.  **Chuyển đổi Frontend (Quan trọng):** Cập nhật các component trang chủ (`Projects.tsx`, `Skills.tsx`) và trang chi tiết dự án để Fetch dữ liệu trực tiếp từ Supabase thay vì đọc từ file tĩnh `data/projects.ts` như hiện tại.

## 3. Kiến Trúc Database (Schema Proposal)

**Table: `projects`**
*   `id` (uuid, primary key)
*   `title` (text)
*   `slug` (text, unique)
*   `category` (text)
*   `year` (text)
*   `description` (text)
*   `tech_stack` (text array)
*   `logo_url` (text)
*   `cover_image_url` (text)
*   `repo_url` (text)
*   `demo_url` (text, nullable)
*   `overview` (text)
*   `problem_statement` (text, nullable)
*   `architecture` (text, nullable)
*   `learnings` (text, nullable)
*   `created_at` (timestamp)

**Table: `project_media` (Ảnh/Video trong Project Gallery)**
*   `id` (uuid, pk)
*   `project_id` (uuid, fk -> projects.id)
*   `type` (text - 'image' hoặc 'video')
*   `url` (text)
*   `caption` (text, nullable)

## 4. Tiêu Chí Hoàn Thành (Verification)
*   [ ] Đăng nhập thành công bằng GitHub và bị chặn nếu dùng tài khoản GitHub khác.
*   [ ] Có thể xem, Thêm, Sửa, Xóa một Project từ giao diện Admin.
*   [ ] Upload được ảnh lên Supabase Storage và lấy được URL lưu vào DB.
*   [ ] Trang chủ hiển thị đúng dữ liệu lấy từ Supabase thay vì file local.
