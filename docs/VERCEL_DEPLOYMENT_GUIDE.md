# Hướng Dẫn Deploy Dự Án Lên Vercel

Chào bạn! Vercel là nền tảng tốt nhất để deploy các ứng dụng Next.js. Vì dự án của bạn đã có sẵn trên GitHub (`Pain0402/My-Portfolio`), quá trình deploy sẽ cực kỳ đơn giản và tự động hóa.

Dưới đây là 2 cách để deploy: Giao diện Web (Khuyên dùng) và dòng lệnh (CLI).

---

## Cách 1: Sử Dụng Vercel Dashboard (Khuyên Dùng)

Đây là cách trực quan nhất và giúp bạn dễ dàng quản lý dự án sau này.

### Bước 1: Đăng ký/Đăng nhập Vercel
1.  Truy cập [vercel.com](https://vercel.com).
2.  Nhấn **Sign Up** và chọn **Continue with GitHub**.
3.  Cấp quyền cho Vercel truy cập vào tài khoản GitHub của bạn.

### Bước 2: Import Dự Án
1.  Tại trang Dashboard, nhấn nút **Add New...** (góc trên bên phải) -> chọn **Project**.
2.  Trong danh sách "Import Git Repository", tìm repo **My-Portfolio** của bạn.
3.  Nhấn nút **Import** bên cạnh tên repo.

### Bước 3: Cấu Hình Project
Vercel sẽ tự động phát hiện đây là dự án Next.js. Bạn thường **không cần thay đổi gì cả**.
*   **Framework Preset:** Next.js (Mặc định).
*   **Root Directory:** `./` (Mặc định).
*   **Build Command:** `next build` (Mặc định).
*   **Environment Variables:** Dự án hiện tại không dùng biến môi trường nào (như API Key), nên cứ để trống.

### Bước 4: Deploy
1.  Nhấn nút **Deploy**.
2.  Chờ khoảng 1-2 phút để Vercel build và deploy.
3.  Khi hoàn tất, màn hình sẽ hiện dòng chữ "Congratulations!" và pháo hoa chúc mừng. 🎆
4.  Nhấn vào ảnh chụp màn hình preview để truy cập website của bạn qua đường dẫn dạng `https://my-portfolio-xyz.vercel.app`.

### Bước 5: Cập Nhật Sau Này
Từ giờ, mỗi khi bạn `git push` code mới lên branch `main` trên GitHub, Vercel sẽ **tự động** build và cập nhật website của bạn trong vòng vài phút mà bạn không cần làm gì thêm!

---

## Cách 2: Sử Dụng Vercel CLI (Dành Cho Power User)

Nếu bạn thích làm việc với dòng lệnh (CMD/Terminal).

1.  Mở terminal tại thư mục dự án (`d:\SUPER_PROJECT\creative-portfolio`).
2.  Cài đặt Vercel CLI (nếu chưa có):
    ```bash
    npm i -g vercel
    ```
3.  Đăng nhập vào Vercel:
    ```bash
    vercel login
    ```
    (Chọn Login with GitHub và làm theo hướng dẫn trên trình duyệt).
4.  Chạy lệnh deploy:
    ```bash
    vercel
    ```
5.  Trả lời các câu hỏi setup (nhấn Enter để chọn mặc định cho tất cả):
    *   Set up and deploy? **Y**
    *   Which scope? (Chọn tài khoản của bạn)
    *   Link to existing project? **N**
    *   Project name? **creative-portfolio** (hoặc tên tùy thích)
    *   In which directory? **./**
    *   Want to modify settings? **N**

6.  Sau khi chạy xong, terminal sẽ trả về đường dẫn **Production** (ví dụ: `https://creative-portfolio.vercel.app`).

---

## Một Số Lưu Ý Quan Trọng

### 1. Custom Domain (Tên Miền Riêng)
Nếu bạn có tên miền riêng (ví dụ: `giangtran.dev`), vào **Settings -> Domains** trên Vercel Dashboard để thêm vào miễn phí.

### 2. Analytics & Speed Insights
Vercel cung cấp sẵn công cụ đo lường tốc độ web. Bạn có thể bật chúng trong tab **Analytics** và **Speed Insights** để theo dõi hiệu năng thực tế của người dùng.

### 3. Khắc phục lỗi Build (nếu có)
Nếu quá trình deploy bị lỗi, hãy vào tab **Logs** trên Vercel Dashboard để xem chi tiết.
*   **Lỗi thường gặp:** Linter (ESLint) báo lỗi chặn build.
*   **Cách sửa nhanh:** Vào `next.config.js` (hoặc `next.config.ts`) thêm dòng sau để bỏ qua ESLint khi build (chỉ dùng khi gấp):
    ```javascript
    eslint: {
        ignoreDuringBuilds: true,
    },
    ```

Chúc bạn deploy thành công và có một portfolio thật ấn tượng! 🚀
