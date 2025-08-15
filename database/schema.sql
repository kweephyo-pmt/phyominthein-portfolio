-- Comments table schema for Neon PostgreSQL
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    avatar VARCHAR(10) DEFAULT NULL,
    photo TEXT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_pinned BOOLEAN DEFAULT FALSE,
    ip_address INET DEFAULT NULL,
    user_agent TEXT DEFAULT NULL
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_is_pinned ON comments(is_pinned);

-- Insert some sample data (optional)
INSERT INTO comments (name, message, avatar) VALUES 
('John Doe', 'Great portfolio! Love the design and animations.', 'J'),
('Sarah Smith', 'Your projects are really impressive. Keep up the good work!', 'S'),
('Mike Johnson', 'The contact form works perfectly. Nice implementation!', 'M')
ON CONFLICT DO NOTHING;
