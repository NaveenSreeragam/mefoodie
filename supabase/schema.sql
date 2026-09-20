-- mefoodie Supabase Database Schema DDL
-- Run this script in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. RESTAURANTS TABLE
CREATE TABLE IF NOT EXISTS public.restaurants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 4.5,
    review_count INTEGER NOT NULL DEFAULT 0,
    cuisine TEXT[] NOT NULL DEFAULT '{}',
    area TEXT NOT NULL,
    image TEXT NOT NULL,
    avg_price INTEGER NOT NULL DEFAULT 200,
    is_hidden_gem BOOLEAN NOT NULL DEFAULT FALSE,
    bio TEXT,
    address TEXT,
    phone TEXT,
    timings TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. DISHES / MENU ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.dishes (
    id TEXT PRIMARY KEY,
    restaurant_id TEXT REFERENCES public.restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 4.5,
    reviews_count INTEGER NOT NULL DEFAULT 0,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    is_must_try BOOLEAN NOT NULL DEFAULT FALSE,
    description TEXT,
    is_veg BOOLEAN DEFAULT FALSE,
    is_spicy BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. FOOD REVIEWS & COMMUNITY POSTS TABLE
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_handle TEXT NOT NULL,
    user_avatar TEXT NOT NULL,
    restaurant_name TEXT NOT NULL,
    restaurant_id TEXT REFERENCES public.restaurants(id) ON DELETE SET NULL,
    dish_name TEXT NOT NULL,
    image TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    likes_count INTEGER NOT NULL DEFAULT 0,
    comments_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 4. USER PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    handle TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    level TEXT DEFAULT 'Foodie Explorer',
    reviews_count INTEGER DEFAULT 0,
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 5. SAVED CRAVES / BOOKMARKS TABLE
CREATE TABLE IF NOT EXISTS public.saved_craves (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    restaurant_id TEXT REFERENCES public.restaurants(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, restaurant_id)
);

-- INDEXES FOR FAST QUERYING
CREATE INDEX IF NOT EXISTS idx_restaurants_area ON public.restaurants(area);
CREATE INDEX IF NOT EXISTS idx_restaurants_hidden_gem ON public.restaurants(is_hidden_gem);
CREATE INDEX IF NOT EXISTS idx_dishes_restaurant ON public.dishes(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_craves ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS POLICIES
CREATE POLICY "Allow public read access to restaurants" ON public.restaurants FOR SELECT USING (true);
CREATE POLICY "Allow public read access to dishes" ON public.dishes FOR SELECT USING (true);
CREATE POLICY "Allow public read access to posts" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access to user_profiles" ON public.user_profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read access to saved_craves" ON public.saved_craves FOR SELECT USING (true);

-- PUBLIC INSERT POLICIES (FOR FOOD REVIEWS & BOOKMARKS)
CREATE POLICY "Allow public insertion of food reviews" ON public.posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insertion of saved craves" ON public.saved_craves FOR INSERT WITH CHECK (true);
