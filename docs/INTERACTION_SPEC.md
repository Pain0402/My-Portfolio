# Hướng Dẫn Tương Tác & Hiệu Ứng (Interaction Specification) - Portfolio Sáng Tạo 2025

Tài liệu này quy định chi tiết về các hiệu ứng chuyển động và tương tác người dùng. Mục đích là tạo cảm giác "mượt mà" và "phản hồi" (responsive feel).

## 1. Nguyên Tắc Animation
*   **Easing:** Sử dụng `easeOutExpo` hoặc `easeInOutCubic` cho các chuyển động giao diện. Tránh `linear` (quá cứng).
*   **Duration:**
    *   Hover: 0.3s - 0.4s.
    *   Transition trang: 0.8s - 1.2s.
    *   Micro-interaction: 0.1s - 0.2s.

## 2. Hero Section: 3D Scene
*   **Mô tả:** Một vật thể 3D trừu tượng (abstract object) nằm giữa màn hình hoặc lệch phải.
*   **Tương tác:**
    *   **Mouse Move:** Vật thể xoay nhẹ theo hướng chuột di chuyển (Parallax Effect).
    *   **Scroll:** Khi cuộn xuống, vật thể thu nhỏ (scale down) và mờ đi (opacity fade out) hoặc biến đổi hình dạng (morph target).
*   **Công nghệ:** React Three Fiber (`<Canvas>`, `useFrame`, `drei`).

## 3. Navbar & Menu
*   **Sticky Header:** Khi cuộn xuống, Navbar ẩn đi. Khi cuộn lên một chút, Navbar hiện lại (kiểu thông minh - smart hide).
*   **Glassmorphism:** Navbar có nền trong suốt (`bg-black/50`), `backdrop-blur-md`.
*   **Link Hover:** Hiệu ứng gạch chân chạy từ trái sang phải (`width: 0%` -> `100%`).

## 4. Projects Showcase (Gallery)
*   **Layout:** Horizontal Scroll (Cuộn ngang) kết hợp **Skew Scrolling**.
*   **Hiệu ứng:**
    *   Khi cuộn nhanh, các card dự án sẽ nghiêng (skew) theo quán tính. (`skewX` based on scroll velocity).
    *   Hình ảnh bên trong card có hiệu ứng Parallax nhẹ (ảnh di chuyển chậm hơn khung hình).
*   **Công cụ:** Lenis Scroll + GSAP/Framer Motion.

## 5. Skills Grid (Bento)
*   **Entrance Animation:** Các ô (grid item) xuất hiện lần lượt (staggered fade-in) với độ trễ (delay) nhỏ (0.1s mỗi item).
*   **Hover State:**
    *   Nền ô sáng lên (gradient border glow).
    *   Icon bên trong scale lớn (1.1x) hoặc xoay 360 độ.
*   **Click State:** Modal mở rộng từ chính ô đó (layoutId shared transition trong Framer Motion).

## 6. Page Transitions (Chuyển Trang)
*   **Preloader:** Một màn hình tải (loading screen) tối giản với animation logo hoặc thanh tiến trình cách điệu.
*   **Transition:** Trang cũ mờ đi (`opacity: 0`), trang mới trượt lên từ dưới (`y: 100` -> `0`).
*   **Không gian tuyệt đối:** Tránh chớp nháy (layout shift) bằng cách giữ kích thước container cố định.

## 7. Cursor (Con Trỏ Chuột)
*   **Custom Cursor:** Một vòng tròn nhỏ (dot) đi kèm với một vòng tròn lớn hơn (outline) bám theo chuột có độ trễ (lagging).
*   **Interactive States:**
    *   Khi hover vào Link/Button: Vòng tròn lớn phóng to, đổi màu, hoặc hòa trộn (mix-blend-mode: difference).
    *   Khi hover vào Text: Cursor đổi thành thanh dọc (I-beam) cách điệu.

---

**Lưu ý:** Hiệu năng là trên hết. Tắt bớt hiệu ứng nặng (blur, 3D shadows) trên thiết bị di động (`matchMedia('(max-width: 768px)')`).
