# Tài Liệu Nguyên Tắc Thiết Kế (Design Principles) - Portfolio Sáng Tạo 2025

"Thiết kế không chỉ là thị giác, nó là trải nghiệm."

## 1. Minimalistic Maximalism (Tối Giản nhưng Táo Bạo)
*   **Không gian âm (Negative Space):** Cho phép các yếu tố quan trọng "dễ thở". Sử dụng lề rộng (margin/padding lớn).
*   **Typography:** Sử dụng kiểu chữ sans-serif hiện đại với biến thể *Display* (lớn, đậm) cho các tiêu đề để tạo tác động mạnh. Body Text giữ ở mức trung bình để giữ sự rõ ràng.
*   **Lý thuyết:** Khi thông tin ít, kiểu chữ lớn và khoảng trắng sẽ khiến thiết kế sang trọng hơn.

## 2. Dynamic Gradients & Glassmorphism (Gradient Sống Động & Mờ Ảo)
Xu hướng thiết kế 2024-2025 xoay quanh việc sử dụng gradient động và chất liệu kính mờ (frosted glass).

### 2.1 Gradient
*   **Fluid:** Gradient không nên tĩnh (static). Sử dụng animation để chuyển màu nhẹ nhàng hoặc dùng mesh gradient (gradient lưới) để tạo chiều sâu.
*   **Phối màu:** Sử dụng cặp màu đối lập hoặc tương đồng có độ bão hòa cao (high saturation).
    *   *Ví dụ:* Deep Purple (`#7C3AED`) fading to Cyber Pink (`#EC4899`).
    *   *Noise Texture:* Thêm một lớp noise grain nhẹ (opacity 3-5%) lên trên gradient để tạo cảm giác thực tế (tactile feel).

### 2.2 Glassmorphism (Kính Mờ)
*   **Backdrop Filter:** Sử dụng `backdrop-filter: blur(10px)` kết hợp với nền bán trong suốt (`bg-opacity-20` hoặc `rgba(255, 255, 255, 0.1)`) để tạo hiệu ứng kính mờ.
*   **Border:** Viền mỏng (`1px solid rgba(255, 255, 255, 0.2)`) giúp khối kính nổi bật trên nền tối.
*   **Shadow:** Đổ bóng nhẹ nhưng lan tỏa (`box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37)`) tạo cảm giác lơ lửng.

## 3. Motion Meaning (Chuyển Động Có Ý Nghĩa)
Đừng thêm hiệu ứng chỉ để "làm màu". Mọi chuyển động phải phục vụ mục đích dẫn dắt người dùng.

*   **Micro-interactions:**
    *   *Hover:* Nút bấm phóng to nhẹ (`scale-105`), đổi màu viền, hoặc tạo hiệu ứng glow khi trỏ chuột vào card dự án.
    *   *Click:* Tạo phản hồi xúc giác (visual feedback) ngay lập tức.
*   **Smooth Scrolling:** Sử dụng thư viện như Lenis để cuộn trang mượt mà, giúp các hiệu ứng Parallax (cuộn song song) hoạt động tự nhiên nhất.
*   **Timing:** Chuyển động nhanh gọn (300ms - 500ms), sử dụng easing function (như `ease-out-expo`) để cảm giác mượt mà nhưng vẫn dứt khoát.

## 4. Typography Scale (Hệ Thống Phông Chữ)
*   **Display (H1):** `TEXT-6XL` đến `TEXT-9XL`, `font-bold` hoặc `font-black`. Dùng cho Hero Title.
*   **Heading (H2-H3):** `TEXT-3XL` đến `TEXT-5XL`, `font-semibold`. Dùng cho tiêu đề section.
*   **Body:** `TEXT-LG` hoặc `TEXT-XL`, `font-normal` hoặc `font-light`. Dùng cho nội dung dài.
*   **Utility/Caption:** `TEXT-SM` hoặc `TEXT-XS`, `uppercase`, `tracking-widest`. Dùng cho tag, meta info.

## 5. Visual Hierarchy (Phân Cấp Thị Giác)
*   **Tương phản (Contrast):** Yếu tố quan trọng nhất phải có độ tương phản cao nhất.
*   **Kích thước (Size):** Lớn hơn = Quan trọng hơn.
*   **Màu sắc (Color):** Màu chính (Primary) dùng cho hành động chính (CTA).

---
*Áp dụng các nguyên tắc này một cách nhất quán sẽ tạo nên sự chuyên nghiệp và "chuẩn chỉ" cho portfolio của bạn.*
