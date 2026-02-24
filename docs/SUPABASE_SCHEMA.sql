-- Chạy đoạn mã này trong mục SQL Editor của Supabase để khởi tạo cơ sở dữ liệu

-- 1. Bảng Projects (Danh sách dự án)
CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  year text NOT NULL,
  description text,
  tech_stack text[] DEFAULT '{}',
  logo_url text,
  cover_image_url text,
  repo_url text,
  demo_url text,
  overview text,
  problem_statement text,
  architecture text,
  learnings text,
  created_at timestamp with time zone DEFAULT now()
);

-- 2. Bảng Skills (Kỹ năng Công nghệ)
CREATE TABLE skills (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL, -- Vd: 'Frontend', 'Backend', 'Tools'
  level text NOT NULL, -- Vd: 'Advanced', 'Intermediate'
  description text,
  icon_url text,
  created_at timestamp with time zone DEFAULT now()
);

-- 3. Cấu hình bảo mật Row Level Security (RLS)
-- Chỉ cho phép người dùng đã đăng nhập (được cấp quyền Admin ở Middleware) mới mượn Token để Thêm/Xóa/Sửa.
-- Người không đăng nhập (Guest) chỉ được Phép Xem (Select).

-- Enable RLS cho Projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cho phép tất cả mọi người được XEM projects" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Chỉ tài khoản đăng nhập được INSERT projects" ON projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Chỉ tài khoản đăng nhập được UPDATE projects" ON projects
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Chỉ tài khoản đăng nhập được DELETE projects" ON projects
    FOR DELETE USING (auth.role() = 'authenticated');

-- Enable RLS cho Skills
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cho phép tất cả mọi người được XEM skills" ON skills
    FOR SELECT USING (true);

CREATE POLICY "Chỉ tài khoản đăng nhập được INSERT skills" ON skills
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Chỉ tài khoản đăng nhập được UPDATE skills" ON skills
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Chỉ tài khoản đăng nhập được DELETE skills" ON skills
    FOR DELETE USING (auth.role() = 'authenticated');


-- 4. Tạo Storage Bucket để chứa ảnh tải lên
insert into storage.buckets (id, name, public) 
values ('portfolio-media', 'portfolio-media', true);

-- Mở quyền RLS cho Storage (Ai cũng xem được ảnh, nhưng chỉ Admin mới được upload)
CREATE POLICY "Public Access" ON storage.objects
    FOR SELECT USING (bucket_id = 'portfolio-media');

CREATE POLICY "Authenticated Tải lên" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Xóa" ON storage.objects
    FOR DELETE USING (bucket_id = 'portfolio-media' AND auth.role() = 'authenticated');
