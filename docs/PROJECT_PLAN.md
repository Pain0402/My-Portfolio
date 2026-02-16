# Kế hoạch Dự kiến & Bản Thảo Thiết Kế Chi Tiết - Portfolio Sáng Tạo 2025

## 1. Mục tiêu Dự án
Xây dựng một website portfolio cá nhân đạt chuẩn quốc tế, thể hiện kỹ năng lập trình và gu thẩm mỹ cao cấp của một sinh viên IT tài năng. Website không chỉ là nơi trưng bày dự án mà còn là một trải nghiệm thị giác (scrollytelling experience), khẳng định vị thế "Creative Developer" tương lai.

## 2. Phong cách Thiết kế & Định hướng Mỹ thuật
Dựa trên các từ khóa bạn cung cấp: **Gradient, Glassmorphism, 3D Interactive, Bento Grid, Parallax**.

*   **Chủ đề (Theme):** "Digital Dreamscape" hoặc "Cyberpunk Minimalism". Kết hợp giữa sự sạch sẽ của thiết kế hiện đại và sự phá cách của hiệu ứng neon/gradient.
*   **Màu sắc chủ đạo:**
    *   Nền: Deep Navy (`#0a0f1c`) hoặc Pure Black (`#000000`) để làm nổi bật gradient.
    *   Accent (Điểm nhấn): Neon Purple (`#7b2cbf`), Electric Cyan (`#00f5d4`), Hot Pink (`#f72585`). Sử dụng mesh gradients trôi chảy (fluid gradients) làm nền động.
*   **Typography:**
    *   Tiêu đề (Headings): Font sans-serif đậm, hiện đại như *Clash Display*, *Syne*, hoặc *Space Grotesk*.
    *   Nội dung (Body): Font sạch, dễ đọc như *Inter* hoặc *Outfit*.

## 3. Kiến trúc Thông tin (Sitemap)
Website sẽ là một trang đơn (Single Page App - SPA) với trải nghiệm cuộn liền mạch, hoặc trang đa cấp với chuyển cảnh mượt mà.

1.  **Hero Section (First Impression):**
    *   **Nội dung:** Tên, danh xưng (e.g., "Designing the Digital Future"), nút CTA "Xem dự án".
    *   **Hiệu ứng:** 3D Interactive Scene (Three.js) – Một vật thể trừu tượng thay đổi hình dạng khi di chuyển chuột, hoặc hiệu ứng hạt (particles) bay lượn.
    *   **Background:** Glassmorphism overlay trên nền gradient động.

2.  **About Me (Câu chuyện):**
    *   **Bố cục:** Scrollytelling – chữ chạy đến đâu, hình ảnh/minh họa thay đổi đến đó.
    *   **Hiệu ứng:** Parallax Scrolling nhẹ nhàng cho các khối văn bản.

3.  **Skills & Stack (Bento Grid):**
    *   **Thiết kế:** Sử dụng **Bento Grid** (lưới ô vuông/chữ nhật bo góc) để hiển thị các kỹ năng (React, Three.js, Node.js).
    *   **Tương tác:** Hover vào từng ô sẽ phát sáng (glow effect) hoặc lật thẻ 3D.
    *   **Glassmorphism:** Các ô có độ mờ và viền sáng (inner stroke) đặc trưng.

4.  **Projects Showcase (Gallery):**
    *   **Hiệu ứng chính:** Horizontal Scroll (Cuộn ngang) kết hợp WebGL distortion khi lướt qua các dự án.
    *   **Chi tiết:** Khi click vào dự án, mở Modal w/ shared layout animation (Framer Motion).

5.  **Contact (Kết nối):**
    *   **Form:** Thiết kế tối giản, đặt trên một "tấm kính" mờ ảo.
    *   **Footer:** Footer khổng lồ (Giant Footer trend) với Typography lớn.

## 4. Đề xuất Công nghệ (Tech Stack)
Để đạt được hiệu năng cao nhất và khả năng tùy biến mạnh mẽ:

*   **Framework:** **Next.js 14/15 (App Router)** - Chuẩn mực cho SEO và hiệu năng.
*   **Ngôn ngữ:** TypeScript.
*   **Styling:** **Tailwind CSS v4** (nhanh, linh hoạt) + **CSS Modules** (cho các hiệu ứng phức tạp).
*   **Animation & 3D:**
    *   **Three.js / React Three Fiber (R3F):** Cốt lõi cho 3D và shaders.
    *   **GSAP (GreenSock) hoặc Framer Motion:** Cho các chuyển động DOM, scroll triggers.
    *   **Lenis:** Thư viện smooth scroll cao cấp (cần thiết cho Parallax).
*   **Hosting:** Vercel.

## 5. Lộ trình Thực hiện (Roadmap)
Ước tính thời gian: 4-6 tuần (tùy thời gian rảnh).

*   **Giai đoạn 1: Ideation & Setup (Tuần 1)**
    *   Thiết lập dự án Next.js, cấu hình Tailwind, ESLint.
    *   Xây dựng hệ thống Design Tokens (màu sắc, font, spacing).
    *   Tạo các thành phần cơ bản (Button, Card, Container) theo phong cách Glassmorphism.

*   **Giai đoạn 2: Core 3D & Hero (Tuần 2)**
    *   Lập trình Scene 3D trong R3F.
    *   Tối ưu hóa performance (giảm polygon, texture).
    *   Tích hợp vào Hero section responsive.

*   **Giai đoạn 3: Layout & Content (Tuần 3-4)**
    *   Implement Bento Grid cho phần Skills.
    *   Xây dựng phần Projects với hiệu ứng cuộn ngang hoặc distortion.
    *   Viết nội dung (Content) chuẩn chỉ.

*   **Giai đoạn 4: Polish & Deploy (Tuần 5)**
    *   Thêm Micro-interactions (cursor custom, hover effects).
    *   Tối ưu SEO, Accessibility (dù là portfolio nghệ thuật vẫn cần tiếp cận tốt).
    *   Deploy và kiểm thử đa thiết bị.

---
*Đây là bản kế hoạch sơ bộ. Sau khi bạn xem qua các tài liệu chi tiết đi kèm, chúng ta sẽ chốt phương án cuối cùng.*
