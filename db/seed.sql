-- insert sample users
INSERT INTO Users (user_name, email, password) VALUES
  ('JohnDoe', 'john@example.com', 'password1'),
  ('JaneSmith', 'jane@example.com', 'password2'),
  ('MikeJohnson', 'mike@example.com', 'password3');

-- insert sample posts
INSERT INTO Post (post_title, post_content, user_id) VALUES
  ('First Post', 'This is the content of the first post.', 1),
  ('Second Post', 'This is the content of the second post.', 2),
  ('Third Post', 'This is the content of the third post.', 1);

-- insert sample comments
INSERT INTO Comment (comment_content, user_id, post_id) VALUES
  ('Great post!', 2, 1),
  ('Thanks for sharing!', 3, 1),
  ('Nice job!', 1, 2),
  ('Keep up the good work!', 3, 3);