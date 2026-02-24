# Bản Thiết Kế Chi Tiết: Admin Dashboard (Creative Portfolio)

## 1. Mục Tiêu (Objective)
Xây dựng một trang quản trị (Admin Dashboard) bảo mật, hiện đại và trực quan ngay trên website portfolio. Cho phép chủ sở hữu cập nhật nội dung (thêm/sửa/xóa dự án, cập nhật thông tin cá nhân, thay đổi hình ảnh) mà không cần phải can thiệp trực tiếp vào mã nguồn (code) hay deploy lại thông qua Vercel.

## 2. Ngôn Ngữ Thiết Kế & UI/UX
Tái sử dụng ngôn ngữ thiết kế **Galaxy/Cyberpunk** và **Glassmorphism** của website chính để tạo sự đồng bộ, tuy nhiên được điều chỉnh để phù hợp với một trang quản lý nội dung:
*   **Màu sắc chủ đạo:** Dark theme (Space Black) kết hợp với các điểm nhấn Neon Cyan và Purple.
*   **Hiệu ứng:** Glassmorphism (Kính mờ, viền gradient mỏng) cho các panel và form nhập liệu. 
*   **Layout:** Layout 2 cột cơ bản của dashboard:
    *   **Sidebar (Left):** Menu điều hướng (Dashboard, Projects, Profile, Media, Settings).
    *   **Main Content (Right):** Không gian hiển thị bảng dữ liệu, biểu đồ thống kê cơ bản và form chỉnh sửa.

## 3. Bản Đồ Tuyến Đường (Route Structure)
Các route này sẽ được đặt trong App Router của Next.js, bảo vệ bằng middleware (chỉ phân quyền cho Admin):

*   `/admin` (Trang đăng nhập Admin - Login Page)
*   `/admin/dashboard` (Trang tổng quan: Thống kê số lượng project, lượt xem, v.v.)
*   `/admin/projects` (Danh sách các dự án - Table view)
*   `/admin/projects/new` (Form thêm dự án mới)
*   `/admin/projects/[id]` (Form chỉnh sửa dự án hiện tại)
*   `/admin/profile` (Quản lý thông tin cá nhân: Avatar, Tên, Tiểu sử, Resume)
*   `/admin/skills` (Quản lý kỹ năng trong Tech Arsenal)

## 4. Tính Năng Chi Tiết (Feature Specs)

### 4.1. Xác Thực & Bảo Mật (Authentication & Security)
*   **Đăng nhập tĩnh/Đơn giản:** Vì chỉ có 1 Admin (là bạn), có thể sử dụng Magic Link, Mật khẩu cấp quản trị, hoặc OAuth (GitHub/Google của bạn).
*   **Route Protection:** Sử dụng Next.js Middleware chặn mọi truy cập trái phép vào route `/admin/*`. Nếu chưa đăng nhập, tự động chuyển hướng về `/admin` (Trang Login).

### 4.2. Quản Lý Dự Án (Projects Management)
*   **Danh sách (List):** Hiển thị các dự án dưới dạng bảng (Data Table) với các cột: Tên dự án, Category, Năm, Status, và Thao tác (Edit/Delete).
*   **Thêm/Sửa Tích hợp Markdown (Editor):** 
    *   Form có các trường text thường (Title, Tech Stack, URLs).
    *   Sử dụng Rich Text Editor (như TipTap hoặc MDX Editor) để nhập Problem Statement, Architecture, Learnings để dễ viết format.
*   **Tải ảnh Media:** Chức năng Upload hình ảnh/video qua kéo thả (Drag & drop). Tối ưu hóa ảnh tự động.

### 4.3. Quản Lý Thông Tin Cá Nhân & Skills (Profile & Tech Arsenal)
*   **Profile:** Sửa trực tiếp Avatar (upload), Heading, Tiểu sử (About).
*   **Tech Arsenal:** Bảng quản lý kỹ năng, cho phép thêm công nghệ mới, thay đổi cấp độ (Advanced/Intermediate) hoặc đổi icon.

## 5. Đề Xuất Kiến Trúc Công Nghệ (Tech Stack Proposal)
*   **Frontend UI:** `Next.js App Router`, `TailwindCSS` (có sẵn).
*   **Backend Logic:** `Next.js Server Actions` (giúp xử lý form gọi database trực tiếp mà không cần viết API dư thừa).
*   **Authentication:** `Supabase Auth` hoặc `NextAuth.js` (rất phù hợp để quản lý session an toàn).
*   **Database:** `Supabase (PostgreSQL)` (Hoàn hảo cho Next.js, dùng để lưu trữ dữ liệu Projects, Skills thay vì hardcode file `data/projects.ts` như hiện tại).
*   **Storage (Lưu ảnh):** `Supabase Storage` hoặc `Cloudinary` (Để lưu File ảnh upload từ Dashboard thay vì để trong thư mục `public`).
*   **UI Components:** `radix-ui` hoặc `shadcn/ui` (Để tạo data table, modal, dropdown cho chuẩn xác và nhanh).

## 6. Lộ Trình Triển Khai (Dự Kiến 4 Phase)
Nếu bạn quyết định bắt tay vào làm, chúng ta sẽ đi qua các bước sau:
1.  **Phase 1 - Database Setup:** Chuyển đổi file data tĩnh hiện tại sang Supabase (Tạo bảng Projects, Skills, Profiles).
2.  **Phase 2 - Authentication:** Thiết lập cơ chế Login an toàn và chặn route.
3.  **Phase 3 - UI/UX Development:** Xây dựng giao diện Dashboard tĩnh (Sidebar, List, Form).
4.  **Phase 4 - Integration:** Kết nối form với Database (Server Actions), xử lý tính năng thêm/sửa/xóa và Upload file.

---
*Bản thiết kế này cung cấp cái nhìn tổng quan toàn diện về một CMS (Content Management System) thu nhỏ. Hãy cho tôi biết suy nghĩ của bạn để chốt phương án trước khi code!*
