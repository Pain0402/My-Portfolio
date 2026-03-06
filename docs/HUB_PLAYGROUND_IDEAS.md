# 🎮 Hub & Playground - Project Ideation

Tài liệu này lưu trữ các ý tưởng nâng cấp mang tính "phá cách" dành riêng cho hai khu vực đặc biệt trong dự án Creative Portfolio: Không gian làm việc cá nhân (`/hub`) và Khu vực thử nghiệm công nghệ (`/playground`).

---

## 🔒 1. Khu Vực Secret Vault (`/hub`)
Nơi này đóng vai trò là "Control Room" (Buồng điều khiển) cá nhân, kết hợp giữa năng suất làm việc và thẩm mỹ Hacker/Cyberpunk.

### 🍅 1.1. Chế độ "Deep Work" (Pomodoro & Lights Out)
* **Ý tưởng:** Một bộ đếm thời gian Pomodoro (25/5) tích hợp sẵn.
* **Tương tác:** Khi kích hoạt "Focus Mode", toàn bộ giao diện Hub sẽ tắt đèn (Lights Out), chỉ giữ lại bộ đếm giờ màu đỏ neon, bảng công việc Kanban (những việc đang *In Progress*), và nhạc Lofi.
* **Mục đích:** Trị bệnh trì hoãn, tạo môi trường cực đoan ép người dùng vào sự tập trung tuyệt đối.

### 🎧 1.2. Spotify "Now Playing" Thời Gian Thực
* **Ý tưởng:** Thay thế (hoặc bổ sung) cho Lofi radio tự động bằng API của Spotify rực rỡ.
* **Tương tác:** Fetch API thời gian thực để hiển thị bài hát bạn đang nghe *ngay lúc này* trên bất kỳ thiết bị nào (kèm thanh tua bài, cover album nhấp nháy theo nhịp). 
* **Mục đích:** Tạo ấn tượng mạnh về kỹ năng làm việc với OAuth và Web API bên thứ 3.

### 🕸️ 1.3. Ma trận Kiến thức (Interactive Knowledge Graph)
* **Ý tưởng:** Biến phần "Cloud Notes" thành một bản đồ sao (Node Graph) 3D hoặc 2D.
* **Tương tác:** Giống hệ thống của Obsidian. Thay vì chỉ viết text, các ghi chú có thể link tới nhau thông qua các đường mũi tên. Click vào Node nào, popup ghi chú đó sẽ nảy ra.

### 📈 1.4. Bản đồ Hoạt động GitHub Holographic
* **Ý tưởng:** Kéo biểu đồ "ô vuông xanh lá" (Contribution Graph) dọc cả năm của GitHub về.
* **Tương tác:** Thay vì các ô vuông 2D tẻ nhạt, sử dụng Three.js biến chúng thành các toà nhà cao tầng (Isometric City). Mức đóng góp càng cao, toà nhà càng cao và phát sáng chói lọi hơn.

### 🌦️ 1.5. Màn hình Radar HUD (Weather & SysTime)
* **Ý tưởng:** Đưa thêm yếu tố giao diện Game UI vào.
* **Tương tác:** Một vòng tròn quét radar thời gian thực, hiển thị Nhiệt độ, Độ ẩm tại vị trí của bạn với font chữ màu Monospace xanh lá đậm chất quân sự: `[STATUS: STORM_INBOUND | TEMP: 28C | HUMIDITY: 89%]`.

---

## 🧪 2. Khu Vực Thử Nghiệm (`/playground` - The Game Engine)
Với nền tảng là một thế giới 3D Sandbox sắn có (Spiderman/Robot, nhảy, tương tác), dưới đây là 5 ý tưởng để biến nó thành một **Portfolio Game** thực thụ, nhấn mạnh vào Trải nghiệm Game (Gameplay Experience) và Cơ chế (Mechanics):

### 🎯 2.1. The "Skill" Minigame (Trường bắn Tơ nhện / Lazer)
* **Ý tưởng:** Khai thác tối đa nút `K` (Skill).
* **Cơ chế:** Tạo ra các mục tiêu di động (Target Dummies hoặc các khối hộp lơ lửng) xuất hiện ngẫu nhiên trong khoảng thời gian ngắn trên không trung ở bản đồ Moon Base. Spiderman phải ngắm và nhấn `K` để bắn tơ trúng mục tiêu trước khi chúng biến mất. 
* **Lý do:** Khoe được cơ chế Raycasting (gióng tia) phân giải va chạm tầm xa trong Three.js, cũng như hệ thống Particle (hiệu ứng tia lazer/tơ nhện). Hệ thống tính điểm liên hoàn (Combo) sẽ tạo cảm giác gây nghiện.

### 🏃‍♂️ 2.2. Speedrun Obstacle Course (Đường đua vượt chướng ngại vật)
* **Ý tưởng:** Tập trung vào kỹ năng di chuyển (W,A,S,D + Space/Shift).
* **Cơ chế:** Xây dựng một bản đồ mới dạng hành lang hẹp trên không (Platformer) với vực sâu ở dưới. Các nền tảng di chuyển liên tục, chông nhọn xuất hiện ngẫu nhiên, và những vách đá yêu cầu phải nhảy đúp (Double Jump) hoặc đu tơ nhện. Góc trên màn hình sẽ có một chiếc đồng hồ bấm giờ (Speedrun Timer).
* **Lý do:** Cho thấy khả năng xây dựng Level Design và kiểm soát Vật lý (Trọng lực, Vectơ vận tốc, độ nảy) cực kỳ chính xác. Bạn có thể lưu Kỷ lục (Leaderboard) của người chơi lên Supabase.

### 🧩 2.3. Hệ thống Tương tác Môi trường "Zelda Style"
* **Ý tưởng:** Biến thế giới thành một cỗ máy giải đố.
* **Cơ chế:** Áp dụng hệ thống Vật lý (nhân vật có thể đẩy, kéo các khối hộp). Ví dụ ở `Cube World`, người chơi phải dùng Spiderman đẩy một khối đá nặng che lên miệng giếng phun lửa, hoặc kích hoạt một nút bấm khổng lồ trên sàn để mở ra một cây cầu năng lượng bắt ngang qua sông.
* **Lý do:** Tương tác Môi trường (Environmental Interaction) là đỉnh cao của Game 3D. Nó yêu cầu tính toán va chạm (Collision Detection) và State Management (Quản lý trạng thái tĩnh/động) cực phức tạp.

### 🤖 2.4. Đấu trường Sinh tồn (Horde Survival Mode)
* **Ý tưởng:** Thêm một chút hành động và yếu tố Kẻ thù.
* **Cơ chế:** Ở góc bản đồ `Bruno Room` hoặc `Moon Base`, sẽ có các đợt (Waves) kẻ thù nhỏ dạng quả bóng gai lăn về phía bạn. Bạn điều khiển Robot, phải liên tục di chuyển và né tránh hoặc dẫm lên chúng y hệt cơ chế Mario để tiêu diệt. Môi trường ngày càng chật chội và kẻ thù ngày càng đông. Tồn tại càng lâu, máu càng thấp.
* **Lý do:** Chứng minh kỹ năng về Game Loop (Vòng lặp trò chơi), sinh sản vật thể ngẫu nhiên (Spawning System) và Quản lý Bộ nhớ (Object Pooling) để game không bị giật lag khi có trăm quái vật.

### 🧰 2.5. Xưởng Chế tạo Vũ khí/Phương tiện (The Workbench)
* **Ý tưởng:** Nâng cấp Build Mode thành một chế độ Ráp đồ.
* **Cơ chế:** Thay vì chỉ đặt cây hay hình hộp, bạn có thu thập các mảnh linh kiện rơi ra trên bản đồ ráp lại thành một chiếc ván trượt (Hoverboard). Khi hoàn thành, Spiderman lập tức trèo lên ván trượt thay đổi hoàn toàn cơ chế di chuyển (bay lượn với gia tốc lớn). 
* **Lý do:** Phô diễn tư duy về Hierarchy (hệ thống cha/con của mô hình 3D trong Three.js) và sự linh hoạt trong việc chuyển đổi Component logic (đi bộ vs bay lượn).
