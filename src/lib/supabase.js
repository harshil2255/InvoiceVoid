import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Export a dummy client if env vars are missing so the UI doesn't crash during development
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_project_url_here') 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
