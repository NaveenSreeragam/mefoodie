-- mefoodie Seed Data Script for Supabase SQL Editor

-- 1. SEED RESTAURANTS
INSERT INTO public.restaurants (id, name, rating, review_count, cuisine, area, image, avg_price, is_hidden_gem, bio, address, phone, timings, tags)
VALUES
('azad', 'Azad Hotel', 4.8, 1240, ARRAY['Keralite', 'Biriyani', 'South Indian'], 'Trivandrum Fort', 'https://images.unsplash.com/photo-1722698030083-75d1d50cabe4?w=800&fit=crop', 180, false, 'Serving legendary Malabar & Travancore style Biriyani since 1940.', 'Overbridge Jn, Fort, Thiruvananthapuram', '+91 471 247 1234', '11:00 AM - 11:00 PM', ARRAY['Legendary', 'Biriyani', 'AC Restaurant']),
('buhari', 'Buhari Hotel', 4.7, 980, ARRAY['Nadan', 'Chicken Fry', 'Porotta'], 'East Fort', 'https://images.unsplash.com/photo-1515931215890-366d3990cf8d?w=800&fit=crop', 150, false, 'Famous for iconic crispy Kerala fried chicken and layered flaky porottas.', 'East Fort Gate, Thiruvananthapuram', '+91 471 246 5678', '7:00 AM - 12:00 AM', ARRAY['Crispy Fry', 'Late Night', 'Iconic']),
('shawarma_king', 'Shawarma King', 4.6, 650, ARRAY['Arabian', 'Shawarma', 'Fast Food'], 'Palayam', 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&fit=crop', 90, false, 'Trivandrum''s favorite spot for juicy, loaded rumali chicken shawarmas.', 'University College Road, Palayam', '+91 98470 12345', '4:00 PM - 1:00 AM', ARRAY['Late Night Craving', 'Juicy', 'Youth Favorite']),
('sl_bakery', 'SL Bakery & Cafe', 4.9, 2100, ARRAY['Bakery', 'Tea & Snacks', 'Pazham Pori'], 'Statue', 'https://images.unsplash.com/photo-1788621138170-6854f17c9e2e?w=800&fit=crop', 40, true, 'Iconic 60-year old bakery legendary for piping hot crispy Pazham Pori & beef fry.', 'Statue Junction, MG Road, Thiruvananthapuram', '+91 471 233 4455', '6:00 AM - 9:30 PM', ARRAY['Hidden Gem', 'Crispy Pazham Pori', 'Tea Time']),
('chai_chronicles', 'Chai Chronicles', 4.8, 420, ARRAY['Chai', 'Street Food', 'Snacks'], 'Vazhuthacaud', 'https://images.unsplash.com/photo-1760263051331-0e4d3dafc9ff?w=800&fit=crop', 25, true, 'Cozy open-air spot for artisanal kulhad chai, samosas, and evening conversations.', 'Near Womens College, Vazhuthacaud', '+91 94471 99887', '3:00 PM - 11:00 PM', ARRAY['Cozy Vibe', 'Kulhad Chai', 'College Hangout'])
ON CONFLICT (id) DO NOTHING;

-- 2. SEED DISHES
INSERT INTO public.dishes (id, restaurant_id, name, price, rating, reviews_count, image, category, is_must_try, description, is_veg, is_spicy)
VALUES
('d1', 'azad', 'Special Mutton Biriyani', 260, 4.9, 450, 'https://images.unsplash.com/photo-1722698030083-75d1d50cabe4?w=400&fit=crop', 'Biriyani', true, 'Fragrant Kaima rice cooked with tender mutton chunks and secret spice mix.', false, false),
('d2', 'azad', 'Chicken Dum Biriyani', 180, 4.8, 620, 'https://images.unsplash.com/photo-1722698030083-75d1d50cabe4?w=400&fit=crop', 'Biriyani', true, 'Classic Travancore style chicken biriyani served with date pickle and raita.', false, false),
('d3', 'buhari', 'Iconic Kerala Chicken Fry', 140, 4.9, 530, 'https://images.unsplash.com/photo-1515931215890-366d3990cf8d?w=400&fit=crop', 'Chicken', true, 'Marinated in Kashmiri chili, curry leaves, and shallow fried to crispy perfection.', false, true),
('d4', 'buhari', 'Flaky Kerala Porotta (3 Pcs)', 36, 4.8, 890, 'https://images.unsplash.com/photo-1515931215890-366d3990cf8d?w=400&fit=crop', 'South Indian', false, 'Golden multi-layered flaky porottas baked fresh on hot tawa.', true, false),
('d5', 'shawarma_king', 'Full Meat Plate Shawarma', 140, 4.7, 310, 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&fit=crop', 'Arabian', true, 'Pure grilled chicken shredded with garlic toum sauce, no cabbage filler.', false, false),
('d6', 'sl_bakery', 'Crispy Pazham Pori', 12, 4.9, 1200, 'https://images.unsplash.com/photo-1788621138170-6854f17c9e2e?w=400&fit=crop', 'Snacks', true, 'Golden ripe banana fritters fried to crunchy perfection.', true, false),
('d7', 'chai_chronicles', 'Special Ginger Masala Chai', 15, 4.9, 340, 'https://images.unsplash.com/photo-1760263051331-0e4d3dafc9ff?w=400&fit=crop', 'Chai', true, 'Steaming fresh milk tea brewed with cardamom and crushed ginger.', true, false)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED COMMUNITY FOOD POSTS
INSERT INTO public.posts (user_name, user_handle, user_avatar, restaurant_name, dish_name, image, rating, comment, likes_count, comments_count)
VALUES
('Anjali Nair', '@anjalifoodie', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', 'SL Bakery & Cafe', 'Crispy Pazham Pori & Beef Roast', 'https://images.unsplash.com/photo-1788621138170-6854f17c9e2e?w=600&fit=crop', 5, 'Nothing beats 4 PM tea at SL Bakery! The Pazham Pori was piping hot and sweet 🍌☕', 48, 12),
('Rahul Varma', '@rahul_tastes', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', 'Azad Hotel', 'Special Mutton Biriyani', 'https://images.unsplash.com/photo-1722698030083-75d1d50cabe4?w=600&fit=crop', 5, 'Azad Mutton Biriyani never disappoints! Melt in mouth mutton pieces with aromatic rice.', 82, 19),
('Sneha Kumar', '@snehaeats', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop', 'Shawarma King', 'Spicy Chicken Roll', 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&fit=crop', 4, 'Late night cravings sorted 🌯 The spicy version is absolutely 🔥 Pro tip: add extra garlic sauce.', 34, 6);
