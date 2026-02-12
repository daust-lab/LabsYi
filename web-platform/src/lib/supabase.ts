// Supabase configuration and initialization
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types for TypeScript
export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  profile_image?: string;
  bio?: string;
  session_count?: number;
  total_time?: number;
}

export interface Booking {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'active' | 'completed' | 'canceled';
  robot_id?: string;
  session_type?: string;
  created_at: string;
}

export interface Session {
  id: string;
  booking_id: string;
  user_id: string;
  code_files?: any;
  execution_logs?: any;
  video_recordings?: string[];
  results?: any;
  feedback?: string;
  rating?: number;
  created_at: string;
  updated_at: string;
}

export interface CodeRepository {
  id: string;
  user_id: string;
  name: string;
  code: string;
  language: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

// Auth helpers
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

// OAuth providers
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  return { data, error };
}

export async function signInWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });
  return { data, error };
}
